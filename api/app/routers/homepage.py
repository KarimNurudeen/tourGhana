from fastapi import APIRouter

from app.cache import cached
from app.strapi_client import deep_populate, get_client, stories_from, strapi_get, tour_to_story

router = APIRouter()

HOMEPAGE_RELATION_FIELDS = [
    "heroLead",
    "heroMore",
    "photoStrip",
    "sidebarFeature",
    "sidebarStories",
    "latestUpdates",
    "forYouLead",
    "forYouGrid",
    "historyFeature",
    "mostRead",
    "photography",
]


@cached("homepage")
async def _homepage_payload() -> dict:
    async with get_client() as client:
        homepage_data = await strapi_get(
            client, "/api/homepage", params=deep_populate(*HOMEPAGE_RELATION_FIELDS)
        )
        topic_blocks_data = await strapi_get(
            client,
            "/api/topic-blocks",
            params={**deep_populate("lead", "more"), "sort": "order:asc", "pagination[pageSize]": 100},
        )
        category_columns_data = await strapi_get(
            client,
            "/api/category-columns",
            params={**deep_populate("lead", "items"), "sort": "order:asc", "pagination[pageSize]": 100},
        )
        history_events_data = await strapi_get(
            client, "/api/history-events", params={"sort": "order:asc", "pagination[pageSize]": 100}
        )
        travel_tips_data = await strapi_get(
            client, "/api/travel-tips", params={"sort": "order:asc", "pagination[pageSize]": 100}
        )

    hp = homepage_data["data"] or {}

    return {
        "heroLead": tour_to_story(hp.get("heroLead")),
        "heroMore": stories_from(hp.get("heroMore")),
        "photoStrip": stories_from(hp.get("photoStrip")),
        "sidebarFeature": tour_to_story(hp.get("sidebarFeature")),
        "sidebarStories": stories_from(hp.get("sidebarStories")),
        "latestUpdates": stories_from(hp.get("latestUpdates")),
        "forYouLead": tour_to_story(hp.get("forYouLead"), hp.get("forYouLeadTitle")),
        "forYouGrid": stories_from(hp.get("forYouGrid")),
        "historyFeature": tour_to_story(hp.get("historyFeature"), hp.get("historyFeatureTitle")),
        "mostRead": stories_from(hp.get("mostRead")),
        "photography": stories_from(hp.get("photography")),
        "topicBlocks": [
            {
                "id": b["blockId"],
                "topic": b["topic"],
                "links": b.get("links") or [],
                "lead": tour_to_story(b.get("lead")),
                "more": stories_from(b.get("more")),
            }
            for b in topic_blocks_data["data"]
        ],
        "categoryColumns": [
            {
                "id": c["columnId"],
                "title": c["title"],
                "href": c["href"],
                "lead": tour_to_story(c.get("lead")),
                "items": stories_from(c.get("items")),
            }
            for c in category_columns_data["data"]
        ],
        "historyEvents": [{"year": e["year"], "text": e["text"]} for e in history_events_data["data"]],
        "travelTips": [{"label": t["label"], "detail": t["detail"]} for t in travel_tips_data["data"]],
    }


@router.get("/api/homepage")
async def get_homepage():
    return await _homepage_payload()
