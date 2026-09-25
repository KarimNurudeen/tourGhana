"""Guide content: written pages, the festival list, and the accommodation and
tour-operator directories. Everything is edited in Strapi; these endpoints
only reshape it for the frontend."""
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.cache import cached
from app.strapi_client import fetch_collection

router = APIRouter()


def _paragraphs(body: Optional[str]) -> list[str]:
    return [p.strip() for p in (body or "").split("\n\n") if p.strip()]


def _page(entry: dict) -> dict:
    return {
        "slug": entry["slug"],
        "title": entry["title"],
        "group": entry.get("group") or "about",
        "intro": entry.get("intro"),
        "sortOrder": entry.get("sortOrder") or 0,
        "sections": [
            {"heading": s.get("heading") or None, "paragraphs": _paragraphs(s.get("body"))}
            for s in (entry.get("sections") or [])
        ],
    }


@cached("guide_pages")
async def _guide_pages() -> list[dict]:
    entries = await fetch_collection(
        "/api/guide-pages", {"populate[sections]": "true", "sort": ["sortOrder:asc", "title:asc"]}
    )
    return [_page(e) for e in entries]


@router.get("/api/guide-pages")
async def list_guide_pages(group: Optional[str] = None):
    pages = await _guide_pages()
    if group:
        pages = [p for p in pages if p["group"] == group]
    return pages


@router.get("/api/guide-pages/{slug}")
async def get_guide_page(slug: str):
    for page in await _guide_pages():
        if page["slug"] == slug:
            return page
    raise HTTPException(status_code=404, detail="Page not found")


@cached("festival_listings")
async def _festival_listings() -> list[dict]:
    entries = await fetch_collection(
        "/api/festival-listings", {"sort": ["monthNumber:asc", "sortOrder:asc"]}
    )
    return [
        {
            "name": e["name"],
            "month": e.get("month") or "",
            "monthNumber": e.get("monthNumber"),
            "place": e.get("place") or None,
            "description": e.get("description") or None,
            "listType": e.get("listType") or "monthly",
        }
        for e in entries
    ]


@router.get("/api/festival-listings")
async def list_festival_listings(listType: Optional[str] = None):
    items = await _festival_listings()
    if listType:
        items = [i for i in items if i["listType"] == listType]
    return items


@cached("accommodation_listings")
async def _accommodation() -> list[dict]:
    entries = await fetch_collection("/api/accommodation-listings", {"sort": ["region:asc", "name:asc"]})
    return [
        {
            "name": e["name"],
            "region": e.get("region") or "",
            "location": e.get("location") or "",
            "phone": e.get("phone") or None,
            "emailWebsite": e.get("emailWebsite") or None,
            "grade": e.get("grade") or "",
        }
        for e in entries
    ]


def _paginate(items: list[dict], page: int, page_size: int) -> dict:
    total = len(items)
    start = (page - 1) * page_size
    return {"items": items[start : start + page_size], "total": total, "page": page, "pageSize": page_size}


def _matches(query: str, *fields: Optional[str]) -> bool:
    haystack = " ".join(f for f in fields if f).lower()
    return all(word in haystack for word in query.lower().split())


@router.get("/api/accommodation")
async def list_accommodation(
    region: Optional[str] = None,
    grade: Optional[str] = None,
    q: Optional[str] = None,
    page: int = Query(1, ge=1),
    pageSize: int = Query(24, ge=1, le=100),
):
    everything = await _accommodation()
    items = everything
    if region:
        items = [i for i in items if i["region"] == region]
    if grade:
        items = [i for i in items if i["grade"] == grade]
    if q and q.strip():
        items = [i for i in items if _matches(q, i["name"], i["location"], i["region"])]
    return {
        **_paginate(items, page, pageSize),
        # Filter choices always reflect the whole directory, not the current
        # result set, so picking a region doesn't hide the other regions.
        "regions": sorted({i["region"] for i in everything if i["region"]}),
        "grades": sorted({i["grade"] for i in everything if i["grade"]}),
    }


@cached("tour_operators")
async def _tour_operators() -> list[dict]:
    entries = await fetch_collection("/api/tour-operators", {"sort": ["name:asc"]})
    return [
        {
            "name": e["name"],
            "category": e.get("category") or "",
            "agencyType": e.get("agencyType") or "",
            "location": e.get("location") or "",
            "postalAddress": e.get("postalAddress") or "",
            "contact": [line for line in (e.get("contact") or "").split("\n") if line.strip()],
        }
        for e in entries
    ]


@router.get("/api/tour-operators")
async def list_tour_operators(
    q: Optional[str] = None,
    agencyType: Optional[str] = None,
    page: int = Query(1, ge=1),
    pageSize: int = Query(24, ge=1, le=100),
):
    everything = await _tour_operators()
    items = everything
    if agencyType:
        items = [i for i in items if i["agencyType"] == agencyType]
    if q and q.strip():
        items = [i for i in items if _matches(q, i["name"], i["location"], i["category"])]
    return {
        **_paginate(items, page, pageSize),
        "agencyTypes": sorted({i["agencyType"] for i in everything if i["agencyType"]}),
    }
