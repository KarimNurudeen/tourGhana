"""Which places are "nearby" a given place, worked out from where things are.

This replaces the old hand-picked list stored on each tour in Strapi. That list
drifted badly: it linked places hundreds of kilometres apart, only ever pointed
one way (A listed B but B never listed A), and was empty for anything added
later. Distances don't drift, so they are computed instead.

Rules:
- Places to see (everything except accommodation) come first, nearest first,
  within RADIUS_KM. Each carries its distance so the page can say "12 km away".
  Festivals go after the sights (at most MAX_FESTIVALS), because an event that
  happens to sit at 0 km should not push a castle down the list.
- If a place has no coordinates, or nothing is within the radius, the page falls
  back to other places in the same region ("region" mode) rather than showing
  something far away under a "Nearby" heading.
- Accommodation near a place is a separate short list, so an attraction page can
  say where to stay and a hotel page isn't crowded with other hotels (those are
  shown elsewhere on the page).
"""
import math
from typing import Optional

RADIUS_KM = 80
MAX_PLACES = 6
MAX_STAYS = 3
MAX_FESTIVALS = 2
FESTIVAL_CATEGORY = "Festivals"
STAY_CATEGORY = "Where To Stay"

# Order used when there is no distance to sort by: sights before events and food.
CATEGORY_ORDER = [
    "Forts & Castles",
    "Parks & Wildlife",
    "Culture & Heritage",
    "Coast & Beaches",
    "Festivals",
    "Food & Dining",
]


def distance_km(a: dict, b: dict) -> float:
    """Great-circle distance between two {lat, lng} points (haversine)."""
    earth_radius = 6371.0
    lat1, lat2 = math.radians(a["lat"]), math.radians(b["lat"])
    d_lat = lat2 - lat1
    d_lng = math.radians(b["lng"] - a["lng"])
    h = math.sin(d_lat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(d_lng / 2) ** 2
    return 2 * earth_radius * math.asin(math.sqrt(h))


def _rank(category: str) -> int:
    return CATEGORY_ORDER.index(category) if category in CATEGORY_ORDER else len(CATEGORY_ORDER)


def _summary(tour: dict, km: Optional[float] = None) -> dict:
    return {
        "slug": tour["slug"],
        "name": tour["name"],
        "region": tour["region"],
        "category": tour["category"],
        "image": tour.get("image") or "",
        # Whole kilometres; 0 means "under a kilometre".
        "distanceKm": None if km is None else int(round(km)),
    }


def _within_radius(origin: Optional[dict], pool: list[dict], limit: int) -> list[tuple[float, dict]]:
    if not origin:
        return []
    found = []
    for other in pool:
        coords = other.get("coordinates")
        if not coords:
            continue
        km = distance_km(origin, coords)
        if km <= RADIUS_KM:
            found.append((km, other))
    found.sort(key=lambda pair: (pair[0], pair[1]["name"]))
    return found[:limit]


def compute_nearby(tour: dict, tours: list[dict]) -> dict:
    """Nearby fields for one tour, given every tour."""
    others = [t for t in tours if t["slug"] != tour["slug"]]
    is_stay = tour["category"] == STAY_CATEGORY
    sights = [t for t in others if t["category"] != STAY_CATEGORY]
    stays = [] if is_stay else [t for t in others if t["category"] == STAY_CATEGORY]
    origin = tour.get("coordinates")

    non_festival = [t for t in sights if t["category"] != FESTIVAL_CATEGORY]
    festivals = [t for t in sights if t["category"] == FESTIVAL_CATEGORY]
    near = _within_radius(origin, non_festival, MAX_PLACES) + _within_radius(origin, festivals, MAX_FESTIVALS)
    near = near[:MAX_PLACES]
    if near:
        mode = "distance"
        places = [_summary(t, km) for km, t in near]
    else:
        same_region = [t for t in sights if t["region"] and t["region"] == tour["region"]]
        # Sights with a photo first inside each category, then alphabetical.
        same_region.sort(key=lambda t: (_rank(t["category"]), not t.get("image"), t["name"]))
        places = [_summary(t) for t in same_region[:MAX_PLACES]]
        mode = "region" if places else "none"

    near_stays = _within_radius(origin, stays, MAX_STAYS)
    if near_stays:
        stays_mode = "distance"
        stay_list = [_summary(t, km) for km, t in near_stays]
    else:
        in_region = sorted(
            (t for t in stays if t["region"] and t["region"] == tour["region"]),
            key=lambda t: (not t.get("image"), t["name"]),
        )
        stay_list = [_summary(t) for t in in_region[:MAX_STAYS]]
        stays_mode = "region" if stay_list else "none"

    return {
        "nearby": [p["slug"] for p in places],
        "nearbyMode": mode,
        "nearbyPlaces": places,
        "nearbyStaysMode": stays_mode,
        "nearbyStays": stay_list,
    }
