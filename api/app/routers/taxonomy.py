from fastapi import APIRouter, HTTPException

from app.cache import cached
from app.strapi_client import fetch_all_categories, fetch_all_regions, fetch_all_tours

router = APIRouter()


@cached("region_groups")
async def _region_groups() -> list[dict]:
    regions = await fetch_all_regions()
    tours = await fetch_all_tours()
    return [
        {
            "slug": r["slug"],
            "name": r["name"],
            "tours": [t for t in tours if t["region"] == r["name"]],
        }
        for r in regions
    ]


@cached("category_groups")
async def _category_groups() -> list[dict]:
    categories = await fetch_all_categories()
    tours = await fetch_all_tours()
    return [
        {
            "slug": c["slug"],
            "name": c["name"],
            "tours": [t for t in tours if t["category"] == c["name"]],
        }
        for c in categories
    ]


@router.get("/api/regions")
async def list_regions():
    return await _region_groups()


@router.get("/api/regions/{slug}")
async def get_region(slug: str):
    for g in await _region_groups():
        if g["slug"] == slug:
            return g
    raise HTTPException(status_code=404, detail="Region not found")


@router.get("/api/categories")
async def list_categories():
    return await _category_groups()


@router.get("/api/categories/{slug}")
async def get_category(slug: str):
    for g in await _category_groups():
        if g["slug"] == slug:
            return g
    raise HTTPException(status_code=404, detail="Category not found")
