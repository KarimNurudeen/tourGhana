from typing import Optional

from fastapi import APIRouter, HTTPException

from app.strapi_client import fetch_all_tours, fetch_tour_by_slug

router = APIRouter()


@router.get("/api/tours")
async def list_tours(region: Optional[str] = None, category: Optional[str] = None):
    tours = await fetch_all_tours()
    if region:
        tours = [t for t in tours if t["region"] == region]
    if category:
        tours = [t for t in tours if t["category"] == category]
    return tours


@router.get("/api/tours/{slug}")
async def get_tour(slug: str, status: Optional[str] = None):
    # `status` (draft/published) comes from Strapi Preview via Next.js Draft
    # Mode — go straight to Strapi, uncached, rather than through the
    # regular published-only cached listing, since draft content must never
    # be shared across requests the way that cache is.
    if status:
        tour = await fetch_tour_by_slug(slug, status=status)
        if not tour:
            raise HTTPException(status_code=404, detail="Tour not found")
        return tour

    tours = await fetch_all_tours()
    for t in tours:
        if t["slug"] == slug:
            return t
    raise HTTPException(status_code=404, detail="Tour not found")
