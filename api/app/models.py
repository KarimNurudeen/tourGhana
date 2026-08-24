"""Pydantic response models mirroring types/content.ts on the Next.js side,
so consuming the API is close to a drop-in replacement for the old
`import { x } from '@/data/tours'` pattern."""
from typing import Optional

from pydantic import BaseModel


class LinkItem(BaseModel):
    label: str
    href: str


class NavItem(BaseModel):
    label: str
    href: Optional[str] = None
    children: list[LinkItem] = []


class Story(BaseModel):
    title: str
    slug: Optional[str] = None
    region: Optional[str] = None
    image: Optional[str] = None


class QuickFact(BaseModel):
    label: str
    value: str


class TourVideo(BaseModel):
    src: str
    poster: Optional[str] = None
    caption: Optional[str] = None


class Coordinates(BaseModel):
    lat: float
    lng: float


class FestivalRule(BaseModel):
    month: int
    weekday: int
    occurrence: int


class FestivalTiming(BaseModel):
    months: list[int] = []
    rule: Optional[FestivalRule] = None
    note: Optional[str] = None


class Tour(BaseModel):
    slug: str
    name: str
    headline: str
    region: str
    category: str
    summary: str
    image: str
    imageCredit: Optional[str] = None
    gallery: list[str] = []
    photoCategories: Optional[dict[str, str]] = None
    videos: Optional[list[TourVideo]] = None
    festivalTiming: Optional[FestivalTiming] = None
    coordinates: Coordinates
    overview: list[str] = []
    highlights: list[str] = []
    quickFacts: list[QuickFact] = []
    gettingThere: list[str] = []
    tips: list[str] = []
    nearby: list[str] = []


class TaxonomyGroup(BaseModel):
    slug: str
    name: str
    tours: list[Tour]


class TopicBlock(BaseModel):
    id: str
    topic: str
    links: list[LinkItem]
    lead: Story
    more: list[Story]


class CategoryColumn(BaseModel):
    id: str
    title: str
    href: str
    lead: Story
    items: list[Story]


class HistoryEvent(BaseModel):
    year: str
    text: str


class TravelTip(BaseModel):
    label: str
    detail: str


class QuizQuestion(BaseModel):
    category: str
    question: str
    image: str
    options: list[str]
    correctAnswer: str


class NavigationResponse(BaseModel):
    primaryNav: list[NavItem]
    tickerLinks: list[LinkItem]


class HomepageResponse(BaseModel):
    heroLead: Story
    heroMore: list[Story]
    photoStrip: list[Story]
    topicBlocks: list[TopicBlock]
    sidebarFeature: Story
    sidebarStories: list[Story]
    latestUpdates: list[Story]
    forYouLead: Story
    forYouGrid: list[Story]
    historyFeature: Story
    historyEvents: list[HistoryEvent]
    mostRead: list[Story]
    travelTips: list[TravelTip]
    categoryColumns: list[CategoryColumn]
    photography: list[Story]
