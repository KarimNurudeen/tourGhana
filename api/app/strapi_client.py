"""Thin async client for Strapi's REST API, plus the transform layer that
reshapes Strapi's generic entry shape into the plain dicts the frontend's
existing types/content.ts shapes expect (Tour, Story, TaxonomyGroup, ...)."""
from typing import Any, Optional

import httpx

from app.cache import cached
from app.config import settings


def get_client() -> httpx.AsyncClient:
    return httpx.AsyncClient(
        base_url=settings.strapi_url,
        headers={"Authorization": f"Bearer {settings.strapi_api_token}"},
        timeout=15.0,
    )


async def strapi_get(client: httpx.AsyncClient, path: str, params: Optional[dict] = None) -> dict:
    res = await client.get(path, params=params)
    res.raise_for_status()
    return res.json()


def deep_populate(*fields: str) -> dict:
    """`populate[field][populate]=*` for each field — a one-level-deep
    populate of a relation's own relations/media, e.g. so a Homepage's
    `heroLead` Tour relation also comes back with ITS `region`/`image`
    resolved, not just the bare Tour attributes."""
    return {f"populate[{f}][populate]": "*" for f in fields}


# `populate=*` only reaches Tour's own first-level relations/media
# (region, category, image, gallery, nearby) — it does NOT reach into media
# fields nested inside a *component* (videos[].src / videos[].poster), which
# come back with just an id and no url at all under the wildcard. Listing
# every field explicitly, with videos deep-populated, is what actually
# resolves them.
TOUR_POPULATE = {
    "populate[region]": "true",
    "populate[category]": "true",
    "populate[image]": "true",
    "populate[gallery]": "true",
    "populate[nearby]": "true",
    "populate[videos][populate]": "*",
    # Components are omitted entirely unless named here — quickFacts came back
    # as [] and coordinates/festivalTiming as None, so tour pages rendered an
    # empty Quick Facts panel and no map pin. festivalTiming holds a nested
    # `rule` component, hence the deep populate.
    "populate[quickFacts]": "true",
    "populate[coordinates]": "true",
    "populate[festivalTiming][populate]": "*",
}


def media_url(media: Optional[dict]) -> Optional[str]:
    if not media:
        return None
    url = media.get("url")
    if not url:
        return None
    if url.startswith("http://") or url.startswith("https://"):
        return url
    return f"{settings.strapi_url}{url}"


def transform_tour(entry: dict) -> dict:
    """Raw Strapi `tour` entry -> a dict matching types/content.ts's `Tour`."""
    image_media = entry.get("image")
    gallery_media = entry.get("gallery") or []
    image_url = media_url(image_media)
    gallery_urls = [u for m in gallery_media if (u := media_url(m))]

    # `photoCategories` is stored keyed by Strapi media id (see
    # scripts/migrate.ts) since the original src string it was keyed by
    # stops existing once the image lives in Strapi. Resolve ids back to
    # the actual URL being served so the frontend can key off it as before.
    raw_photo_categories = entry.get("photoCategories") or None
    photo_categories = None
    if raw_photo_categories:
        id_to_url: dict[str, str] = {}
        for media in ([image_media] if image_media else []) + gallery_media:
            if media and (u := media_url(media)):
                id_to_url[str(media["id"])] = u
        photo_categories = {
            id_to_url[media_id]: category
            for media_id, category in raw_photo_categories.items()
            if media_id in id_to_url
        }

    region = entry.get("region")
    category = entry.get("category")
    nearby = entry.get("nearby") or []

    raw_videos = entry.get("videos") or []
    videos = [
        {
            "src": media_url(v.get("src")) or "",
            "poster": media_url(v.get("poster")),
            "caption": v.get("caption"),
        }
        for v in raw_videos
        if media_url(v.get("src"))
    ]

    return {
        "slug": entry["slug"],
        "name": entry["name"],
        "headline": entry["headline"],
        "region": region["name"] if region else "",
        "category": category["name"] if category else "",
        "summary": entry["summary"],
        "image": image_url or "",
        "imageCredit": entry.get("imageCredit"),
        "gallery": gallery_urls,
        "photoCategories": photo_categories,
        "videos": videos or None,
        "festivalTiming": entry.get("festivalTiming"),
        "coordinates": entry.get("coordinates"),
        "overview": entry.get("overview") or [],
        "highlights": entry.get("highlights") or [],
        "quickFacts": entry.get("quickFacts") or [],
        "gettingThere": entry.get("gettingThere") or [],
        "tips": entry.get("tips") or [],
        "nearby": [n["slug"] for n in nearby if n.get("slug")],
    }


def tour_to_story(tour_entry: Optional[dict], title_override: Optional[str] = None) -> dict:
    """Raw (nested, populated) Strapi Tour relation -> a `Story`
    ({title, slug, region, image}), matching stories.ts's `fromTour()`
    (title defaults to the tour's headline, same as `fromTour`)."""
    if not tour_entry:
        return {"title": title_override or ""}
    region = tour_entry.get("region")
    return {
        "title": title_override or tour_entry.get("headline", ""),
        "slug": tour_entry.get("slug"),
        "region": region["name"] if region else None,
        "image": media_url(tour_entry.get("image")),
    }


def stories_from(entries: Optional[list[dict]]) -> list[dict]:
    return [tour_to_story(e) for e in (entries or [])]


@cached("all_tours")
async def fetch_all_tours() -> list[dict]:
    async with get_client() as client:
        data = await strapi_get(
            client, "/api/tours", params={**TOUR_POPULATE, "pagination[pageSize]": 100}
        )
    return [transform_tour(e) for e in data["data"]]


async def fetch_tour_by_slug(slug: str, status: Optional[str] = None) -> Optional[dict]:
    """Uncached, direct-to-Strapi lookup — used for preview (`status=draft`),
    where content is per-editor and must never be served from the shared
    all_tours cache."""
    params: dict = {"filters[slug][$eq]": slug, **TOUR_POPULATE}
    if status:
        params["status"] = status
    async with get_client() as client:
        data = await strapi_get(client, "/api/tours", params=params)
    entries = data.get("data") or []
    if not entries:
        return None
    return transform_tour(entries[0])


@cached("all_regions")
async def fetch_all_regions() -> list[dict]:
    async with get_client() as client:
        data = await strapi_get(client, "/api/regions", params={"pagination[pageSize]": 100})
    return data["data"]


@cached("all_categories")
async def fetch_all_categories() -> list[dict]:
    async with get_client() as client:
        data = await strapi_get(client, "/api/categories", params={"pagination[pageSize]": 100})
    return data["data"]
