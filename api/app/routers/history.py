from fastapi import APIRouter

from app.cache import cached
from app.strapi_client import get_client, media_url, strapi_get

router = APIRouter()


@cached("history_page")
async def _history_page() -> dict:
    async with get_client() as client:
        data = await strapi_get(
            client,
            "/api/history-page",
            params={
                "populate[image]": "true",
                "populate[sections]": "true",
            },
        )
    entry = data["data"] or {}
    return {
        "image": media_url(entry.get("image")),
        "imageCaption": entry.get("imageCaption"),
        "intro": entry.get("intro"),
        # Body copy is edited as plain text in Strapi; blank lines separate
        # paragraphs, which the frontend renders as individual <p> elements.
        "sections": [
            {
                "heading": section.get("heading"),
                "paragraphs": [
                    p.strip() for p in (section.get("body") or "").split("\n\n") if p.strip()
                ],
            }
            for section in (entry.get("sections") or [])
        ],
    }


@router.get("/api/history")
async def get_history_page():
    return await _history_page()
