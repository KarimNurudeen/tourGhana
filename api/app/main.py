from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import homepage, navigation, quiz, taxonomy, tours

app = FastAPI(title="Tour Ghana API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(tours.router)
app.include_router(taxonomy.router)
app.include_router(homepage.router)
app.include_router(navigation.router)
app.include_router(quiz.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
