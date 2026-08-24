from fastapi import APIRouter

from app.cache import cached
from app.strapi_client import get_client, strapi_get

router = APIRouter()


@cached("navigation")
async def _navigation() -> dict:
    async with get_client() as client:
        data = await strapi_get(
            client,
            "/api/navigation",
            params={
                "populate[primaryNav][populate]": "children",
                "populate[tickerLinks]": "true",
            },
        )
    entry = data["data"] or {}
    return {
        "primaryNav": entry.get("primaryNav") or [],
        "tickerLinks": entry.get("tickerLinks") or [],
    }


@router.get("/api/navigation")
async def get_navigation():
    return await _navigation()
