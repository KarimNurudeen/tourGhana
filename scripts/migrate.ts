// One-time content migration: reads the existing hardcoded data/*.ts files
// from the Next.js app and pushes everything into a running Strapi instance
// via its REST + Upload APIs. Run with `npx tsx scripts/migrate.ts` from the
// repo root, after `npm run develop` (inside strapi/) has applied the schema
// and an API token exists in scripts/.env.
//
// Lives outside strapi/ deliberately — Strapi's own dev-server file watcher
// recompiles everything under strapi/ as part of its own TS project, and a
// script importing files from outside that project (like ../data/tours)
// breaks that build. Keeping this at the repo root avoids that entirely.
//
// Safe to re-run against a *fresh* Strapi database only — it always creates
// new entries, it doesn't upsert. Wipe strapi/.tmp/data.db first if re-running.
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { tours, regions, categories } from '../data/tours';
import {
  heroLead,
  heroMore,
  photoStrip,
  topicBlocks,
  sidebarFeature,
  sidebarStories,
  latestUpdates,
  forYouLead,
  forYouGrid,
  historyFeature,
  historyEvents,
  mostRead,
  categoryColumns,
  photography,
  travelTips,
} from '../data/stories';
import { primaryNav, tickerLinks } from '../data/navigation';
import { quizQuestions } from '../data/quiz';
import type { Story } from '../types/content';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Tiny manual .env loader — avoids adding a `dotenv` dependency to the repo
// root just for two variables.
async function loadEnvFile(path: string) {
  let text: string;
  try {
    text = await readFile(path, 'utf8');
  } catch {
    return;
  }
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

// Set for real at the top of main(), once the .env file has been read —
// kept as `let` (rather than top-level `await` + `const`) so this file runs
// under tsx's default CJS transform, which doesn't support top-level await.
let STRAPI_URL = 'http://localhost:1337';
let STRAPI_API_TOKEN = '';

const REPO_ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(REPO_ROOT, 'public');

// ---------------------------------------------------------------------------
// Strapi REST helpers
// ---------------------------------------------------------------------------

async function strapiRequest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${options.method ?? 'GET'} ${path} -> ${res.status}: ${text}`);
  }
  return res.json();
}

const uploadCache = new Map<string, number>();

async function uploadImage(src: string | undefined): Promise<number | null> {
  if (!src) return null;
  const cached = uploadCache.get(src);
  if (cached !== undefined) return cached;

  let bytes: Buffer;
  let filename: string;

  try {
    if (src.startsWith('http://') || src.startsWith('https://')) {
      const res = await fetch(src);
      if (!res.ok) {
        console.warn(`  ! fetch failed (${res.status}) for ${src}`);
        return null;
      }
      bytes = Buffer.from(await res.arrayBuffer());
      filename = decodeURIComponent(src.split('/').pop()?.split('?')[0] || `image-${Date.now()}.jpg`);
    } else {
      const localPath = join(PUBLIC_DIR, src.replace(/^\//, ''));
      bytes = await readFile(localPath);
      filename = src.replace(/^\//, '').replace(/\//g, '-');
    }
  } catch (err) {
    console.warn(`  ! could not read ${src}: ${(err as Error).message}`);
    return null;
  }

  const form = new FormData();
  form.append('files', new Blob([bytes]), filename);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
    body: form,
  });
  if (!res.ok) {
    console.warn(`  ! upload failed (${res.status}) for ${src}`);
    return null;
  }
  const [uploaded] = (await res.json()) as { id: number }[];
  uploadCache.set(src, uploaded.id);
  return uploaded.id;
}

function idFor(slug?: string, tourIdBySlug?: Map<string, number>): number | null {
  if (!slug || !tourIdBySlug) return null;
  return tourIdBySlug.get(slug) ?? null;
}

function idsFor(stories: Story[], tourIdBySlug: Map<string, number>): number[] {
  return stories
    .map((s) => (s.slug ? tourIdBySlug.get(s.slug) : undefined))
    .filter((id): id is number => id !== undefined);
}

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

async function main() {
  await loadEnvFile(join(__dirname, '.env'));
  STRAPI_URL = process.env.STRAPI_URL ?? STRAPI_URL;
  STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? '';
  if (!STRAPI_API_TOKEN) {
    throw new Error('STRAPI_API_TOKEN is not set — see scripts/.env');
  }

  console.log(`Migrating into ${STRAPI_URL} ...\n`);

  // 1. Regions & Categories -------------------------------------------------
  console.log(`Creating ${regions.length} regions...`);
  const regionIdByName = new Map<string, number>();
  for (const r of regions) {
    const created = await strapiRequest('/api/regions', {
      method: 'POST',
      body: JSON.stringify({ data: { name: r.name, slug: r.slug } }),
    });
    regionIdByName.set(r.name, created.data.id);
  }

  console.log(`Creating ${categories.length} categories...`);
  const categoryIdByName = new Map<string, number>();
  for (const c of categories) {
    const created = await strapiRequest('/api/categories', {
      method: 'POST',
      body: JSON.stringify({ data: { name: c.name, slug: c.slug } }),
    });
    categoryIdByName.set(c.name, created.data.id);
  }

  // 2. Tours (first pass, no `nearby` yet — self-referencing) ---------------
  console.log(`\nCreating ${tours.length} tours (uploading images as we go)...`);
  const tourIdBySlug = new Map<string, number>();
  // Strapi v5's REST API takes the numeric id as a relation *value*, but
  // requires the string documentId in the URL path for single-entry
  // GET/PUT/DELETE — hence tracking both.
  const tourDocIdBySlug = new Map<string, string>();

  for (const tour of tours) {
    const imageId = await uploadImage(tour.image);
    const galleryIds: number[] = [];
    for (const src of tour.gallery) {
      const id = await uploadImage(src);
      if (id !== null) galleryIds.push(id);
    }

    // `photoCategories` is keyed by the *original* image src string, but
    // that src no longer exists once the image is a Strapi media entry
    // served from a new URL. Re-key by the now-known Strapi media id
    // instead (stable across renames/CDNs) — the API layer resolves ids
    // back to the resolved URL each request, so the frontend's tab
    // filtering by src keeps working against the new hosted images.
    const rekeyedPhotoCategories = tour.photoCategories
      ? Object.fromEntries(
          Object.entries(tour.photoCategories)
            .map(([src, category]) => {
              const mediaId = uploadCache.get(src);
              return mediaId !== undefined ? [String(mediaId), category] : null;
            })
            .filter((entry): entry is [string, string] => entry !== null)
        )
      : null;

    const created = await strapiRequest('/api/tours', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          slug: tour.slug,
          name: tour.name,
          headline: tour.headline,
          region: regionIdByName.get(tour.region) ?? null,
          category: categoryIdByName.get(tour.category) ?? null,
          summary: tour.summary,
          image: imageId,
          imageCredit: tour.imageCredit ?? null,
          gallery: galleryIds,
          photoCategories: rekeyedPhotoCategories,
          videos: tour.videos ?? [],
          festivalTiming: tour.festivalTiming ?? null,
          coordinates: tour.coordinates,
          overview: tour.overview,
          highlights: tour.highlights,
          quickFacts: tour.quickFacts,
          gettingThere: tour.gettingThere,
          tips: tour.tips,
        },
      }),
    });
    tourIdBySlug.set(tour.slug, created.data.id);
    tourDocIdBySlug.set(tour.slug, created.data.documentId);
    console.log(`  + ${tour.slug} (${galleryIds.length} gallery images)`);
  }

  // 3. Wire up `nearby` relations (second pass) ------------------------------
  console.log(`\nWiring up "nearby" relations...`);
  for (const tour of tours) {
    if (!tour.nearby || tour.nearby.length === 0) continue;
    const nearbyIds = tour.nearby
      .map((slug) => tourIdBySlug.get(slug))
      .filter((id): id is number => id !== undefined);
    if (nearbyIds.length === 0) continue;
    const tourDocId = tourDocIdBySlug.get(tour.slug)!;
    await strapiRequest(`/api/tours/${tourDocId}`, {
      method: 'PUT',
      body: JSON.stringify({ data: { nearby: nearbyIds } }),
    });
  }

  // 4. HistoryEvents, TravelTips, QuizQuestions ------------------------------
  console.log(`\nCreating ${historyEvents.length} history events...`);
  for (const [i, e] of historyEvents.entries()) {
    await strapiRequest('/api/history-events', {
      method: 'POST',
      body: JSON.stringify({ data: { year: e.year, text: e.text, order: i } }),
    });
  }

  console.log(`Creating ${travelTips.length} travel tips...`);
  for (const [i, t] of travelTips.entries()) {
    await strapiRequest('/api/travel-tips', {
      method: 'POST',
      body: JSON.stringify({ data: { label: t.label, detail: t.detail, order: i } }),
    });
  }

  console.log(`Creating ${quizQuestions.length} quiz questions...`);
  const tourSlugByImage = new Map(tours.map((t) => [t.image, t.slug]));
  for (const q of quizQuestions) {
    const tourSlug = tourSlugByImage.get(q.image);
    const tourId = tourSlug ? tourIdBySlug.get(tourSlug) : undefined;
    await strapiRequest('/api/quiz-questions', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          category: q.category,
          question: q.question,
          image: tourId ?? null,
          options: q.options,
          correctAnswer: q.correctAnswer,
        },
      }),
    });
  }

  // 5. TopicBlocks & CategoryColumns ------------------------------------------
  console.log(`\nCreating ${topicBlocks.length} topic blocks...`);
  for (const [i, block] of topicBlocks.entries()) {
    await strapiRequest('/api/topic-blocks', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          blockId: block.id,
          topic: block.topic,
          links: block.links,
          lead: idFor(block.lead.slug, tourIdBySlug),
          more: idsFor(block.more, tourIdBySlug),
          order: i,
        },
      }),
    });
  }

  console.log(`Creating ${categoryColumns.length} category columns...`);
  for (const [i, col] of categoryColumns.entries()) {
    await strapiRequest('/api/category-columns', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          columnId: col.id,
          title: col.title,
          href: col.href,
          lead: idFor(col.lead.slug, tourIdBySlug),
          items: idsFor(col.items, tourIdBySlug),
          order: i,
        },
      }),
    });
  }

  // 6. Navigation (single type) ------------------------------------------------
  console.log(`\nSetting navigation...`);
  await strapiRequest('/api/navigation', {
    method: 'PUT',
    body: JSON.stringify({
      data: {
        primaryNav: primaryNav.map((item) => ({
          label: item.label,
          href: item.href ?? null,
          children: item.children ?? [],
        })),
        tickerLinks,
      },
    }),
  });

  // 7. Homepage (single type) ---------------------------------------------------
  console.log(`Setting homepage...`);
  await strapiRequest('/api/homepage', {
    method: 'PUT',
    body: JSON.stringify({
      data: {
        heroLead: idFor(heroLead.slug, tourIdBySlug),
        heroMore: idsFor(heroMore, tourIdBySlug),
        photoStrip: idsFor(photoStrip, tourIdBySlug),
        sidebarFeature: idFor(sidebarFeature.slug, tourIdBySlug),
        sidebarStories: idsFor(sidebarStories, tourIdBySlug),
        latestUpdates: idsFor(latestUpdates, tourIdBySlug),
        forYouLead: idFor(forYouLead.slug, tourIdBySlug),
        forYouLeadTitle: forYouLead.title,
        forYouGrid: idsFor(forYouGrid, tourIdBySlug),
        historyFeature: idFor(historyFeature.slug, tourIdBySlug),
        historyFeatureTitle: historyFeature.title,
        mostRead: idsFor(mostRead, tourIdBySlug),
        photography: idsFor(photography, tourIdBySlug),
      },
    }),
  });

  console.log(`\nDone. ${tourIdBySlug.size} tours, ${uploadCache.size} unique images uploaded.`);
}

main().catch((err) => {
  console.error('\nMigration failed:', err);
  process.exit(1);
});
