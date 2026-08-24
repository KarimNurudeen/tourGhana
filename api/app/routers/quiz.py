from fastapi import APIRouter

from app.cache import cached
from app.strapi_client import get_client, media_url, strapi_get

router = APIRouter()


@cached("quiz")
async def _quiz_questions() -> list[dict]:
    async with get_client() as client:
        data = await strapi_get(
            client,
            "/api/quiz-questions",
            params={"populate[image][populate]": "image", "pagination[pageSize]": 100},
        )
    questions = []
    for entry in data["data"]:
        tour = entry.get("image")
        questions.append(
            {
                "category": entry["category"],
                "question": entry["question"],
                "image": media_url(tour.get("image")) if tour else None,
                "options": entry.get("options") or [],
                "correctAnswer": entry["correctAnswer"],
            }
        )
    return questions


@router.get("/api/quiz")
async def get_quiz():
    return await _quiz_questions()
