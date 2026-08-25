import { draftMode } from 'next/headers';
import type {
  CategoryColumn,
  HistoryEvent,
  LinkItem,
  NavItem,
  Story,
  TopicBlock,
  Tour,
} from '@/types/content';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${path} -> ${res.status}`);
  }
  return res.json();
}

export type TaxonomyGroup = {
  slug: string;
  name: string;
  tours: Tour[];
};

export async function getTours(params?: { region?: string; category?: string }): Promise<Tour[]> {
  const search = new URLSearchParams();
  if (params?.region) search.set('region', params.region);
  if (params?.category) search.set('category', params.category);
  const qs = search.toString();
  return apiFetch<Tour[]>(`/api/tours${qs ? `?${qs}` : ''}`);
}

export async function getTour(slug: string): Promise<Tour | null> {
  // In Draft Mode (set by /api/preview, driven by Strapi's Preview button),
  // fetch the tour's draft version straight from the API with no caching —
  // draft content is per-editor and must never be shared across requests
  // the way the normal 60s revalidated cache would.
  const { isEnabled } = await draftMode();

  try {
    if (isEnabled) {
      return await apiFetch<Tour>(`/api/tours/${slug}?status=draft`, { cache: 'no-store' });
    }
    return await apiFetch<Tour>(`/api/tours/${slug}`);
  } catch {
    return null;
  }
}

export async function getRegions(): Promise<TaxonomyGroup[]> {
  return apiFetch<TaxonomyGroup[]>('/api/regions');
}

export async function getRegion(slug: string): Promise<TaxonomyGroup | null> {
  try {
    return await apiFetch<TaxonomyGroup>(`/api/regions/${slug}`);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<TaxonomyGroup[]> {
  return apiFetch<TaxonomyGroup[]>('/api/categories');
}

export async function getCategory(slug: string): Promise<TaxonomyGroup | null> {
  try {
    return await apiFetch<TaxonomyGroup>(`/api/categories/${slug}`);
  } catch {
    return null;
  }
}

export type HomepageData = {
  heroLead: Story;
  heroMore: Story[];
  photoStrip: Story[];
  topicBlocks: TopicBlock[];
  sidebarFeature: Story;
  sidebarStories: Story[];
  latestUpdates: Story[];
  forYouLead: Story;
  forYouGrid: Story[];
  historyFeature: Story;
  historyEvents: HistoryEvent[];
  mostRead: Story[];
  travelTips: { label: string; detail: string }[];
  categoryColumns: CategoryColumn[];
  photography: Story[];
};

export async function getHomepage(): Promise<HomepageData> {
  return apiFetch<HomepageData>('/api/homepage');
}

export type HistoryPageData = {
  image: string | null;
  imageCaption: string | null;
  intro: string | null;
  sections: { heading: string; paragraphs: string[] }[];
};

// Deliberately non-fatal: the three services deploy independently, so this
// endpoint can briefly 404 while the API layer catches up. The page renders
// its Key Dates timeline either way rather than failing the whole build.
export async function getHistoryPage(): Promise<HistoryPageData> {
  try {
    return await apiFetch<HistoryPageData>('/api/history');
  } catch {
    return { image: null, imageCaption: null, intro: null, sections: [] };
  }
}

export type NavigationData = {
  primaryNav: NavItem[];
  tickerLinks: LinkItem[];
};

export async function getNavigation(): Promise<NavigationData> {
  return apiFetch<NavigationData>('/api/navigation');
}

export type QuizQuestion = {
  category: string;
  question: string;
  image: string;
  options: string[];
  correctAnswer: string;
};

export async function getQuiz(): Promise<QuizQuestion[]> {
  return apiFetch<QuizQuestion[]>('/api/quiz');
}

// Re-exported for the many Server Components that already import these
// from '@/lib/api' — see lib/tour-utils.ts for why they live there.
export { tourHref, slugify } from './tour-utils';

// Lives here rather than in components/Hero.tsx (a 'use client' file):
// Next.js turns every export of a client-component module into a client
// reference when imported from server code, including plain data constants
// — so a Server Component importing this from Hero.tsx would get a
// reference placeholder instead of the real array, and `.map()` on it
// throws at runtime instead of failing to type-check.
export const HERO_ACCOMMODATION_SLUGS = [
  'kempinski-hotel-accra',
  'labadi-beach-hotel',
  'coconut-grove-beach-resort-elmina',
  'anomabo-beach-resort',
  'rock-city-hotel-kwahu',
  'villa-monticello-accra',
];
