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
// Resumable: tours, regions, categories and uploaded media are all looked up
// on the live instance first and skipped if present, so a run interrupted by
// a dropped connection can simply be run again. The sections after the tours
// (history events, travel tips, quiz questions, topic blocks, category
// columns) are *not* guarded that way and will duplicate — if a run dies
// after reaching them, clear those collections before retrying.
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

// Pages through a collection so a resumed run can see everything that
// already exists, not just the first 25 entries.
async function fetchAllEntries(collection: string): Promise<any[]> {
  const all: any[] = [];
  for (let page = 1; ; page++) {
    const res = await strapiRequest(
      `/api/${collection}?pagination[page]=${page}&pagination[pageSize]=100&status=draft`
    );
    all.push(...res.data);
    if (page >= (res.meta?.pagination?.pageCount ?? 1)) break;
  }
  return all;
}

// Strapi checks a component media field against its `allowedTypes`
// ("videos" for videos[].src, "images" for videos[].poster). A Blob built
// without a type reaches Strapi as application/octet-stream and fails that
// check, so derive the type from the extension.
const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  avif: 'image/avif',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
};

function mimeTypeFor(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return MIME_BY_EXT[ext] ?? 'application/octet-stream';
}

// Strapi stores an uploaded file under the name it was sent with, so the
// same derivation doubles as the lookup key when resuming a partial run.
function filenameFor(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return decodeURIComponent(src.split('/').pop()?.split('?')[0] || `image-${Date.now()}.jpg`);
  }
  return src.replace(/^\//, '').replace(/\//g, '-');
}

// Strapi has no upsert, so a re-run after an interrupted migration would
// duplicate everything. These are seeded from the live instance in main()
// and consulted before anything is created.
const mediaIdByFilename = new Map<string, number>();

const uploadCache = new Map<string, number>();

async function uploadMedia(src: string | undefined): Promise<number | null> {
  if (!src) return null;
  const cached = uploadCache.get(src);
  if (cached !== undefined) return cached;

  const filename = filenameFor(src);
  const existingId = mediaIdByFilename.get(filename);
  if (existingId !== undefined) {
    uploadCache.set(src, existingId);
    return existingId;
  }

  let bytes: Buffer;

  try {
    if (src.startsWith('http://') || src.startsWith('https://')) {
      const res = await fetch(src);
      if (!res.ok) {
        console.warn(`  ! fetch failed (${res.status}) for ${src}`);
        return null;
      }
      bytes = Buffer.from(await res.arrayBuffer());
    } else {
      bytes = await readFile(join(PUBLIC_DIR, src.replace(/^\//, '')));
    }
  } catch (err) {
    console.warn(`  ! could not read ${src}: ${(err as Error).message}`);
    return null;
  }

  const form = new FormData();
  form.append('files', new Blob([bytes], { type: mimeTypeFor(filename) }), filename);

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
  mediaIdByFilename.set(filename, uploaded.id);
  uploadCache.set(src, uploaded.id);
  return uploaded.id;
}

// Relations are addressed by documentId, never by the numeric row id. Tours
// have draft & publish enabled, so each one exists as two rows sharing a
// single documentId — a numeric id pins the relation to one version, and a
// relation set from the draft rows comes back empty from the default
// (published) query. documentId resolves to whichever version is being read.
function idFor(slug?: string, tourDocIdBySlug?: Map<string, string>): string | null {
  if (!slug || !tourDocIdBySlug) return null;
  return tourDocIdBySlug.get(slug) ?? null;
}

function idsFor(stories: Story[], tourDocIdBySlug: Map<string, string>): string[] {
  return stories
    .map((s) => (s.slug ? tourDocIdBySlug.get(s.slug) : undefined))
    .filter((id): id is string => id !== undefined);
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

  // 0. Resume support -------------------------------------------------------
  // A migration that dies partway (a dropped connection mid-upload, say)
  // leaves real content behind. Rather than force a full wipe before every
  // retry, load what's already there and skip past it.
  const existingFiles = await strapiRequest('/api/upload/files');
  for (const file of Array.isArray(existingFiles) ? existingFiles : (existingFiles.results ?? [])) {
    mediaIdByFilename.set(file.name, file.id);
  }
  const existingRegions = await fetchAllEntries('regions');
  const existingCategories = await fetchAllEntries('categories');
  const existingTours = await fetchAllEntries('tours');
  if (existingFiles.length || existingTours.length) {
    console.log(
      `Resuming: ${existingTours.length} tours, ${existingRegions.length} regions, ` +
        `${existingCategories.length} categories, ${mediaIdByFilename.size} media already present.\n`
    );
  }

  // 1. Regions & Categories -------------------------------------------------
  console.log(`Creating ${regions.length} regions...`);
  const regionIdByName = new Map<string, number>(
    existingRegions.map((r) => [r.name as string, r.id as number])
  );
  for (const r of regions) {
    if (regionIdByName.has(r.name)) continue;
    const created = await strapiRequest('/api/regions', {
      method: 'POST',
      body: JSON.stringify({ data: { name: r.name, slug: r.slug } }),
    });
    regionIdByName.set(r.name, created.data.id);
  }

  console.log(`Creating ${categories.length} categories...`);
  const categoryIdByName = new Map<string, number>(
    existingCategories.map((c) => [c.name as string, c.id as number])
  );
  for (const c of categories) {
    if (categoryIdByName.has(c.name)) continue;
    const created = await strapiRequest('/api/categories', {
      method: 'POST',
      body: JSON.stringify({ data: { name: c.name, slug: c.slug } }),
    });
    categoryIdByName.set(c.name, created.data.id);
  }

  // 2. Tours (first pass, no `nearby` yet — self-referencing) ---------------
  console.log(`\nCreating ${tours.length} tours (uploading images as we go)...`);
  const tourIdBySlug = new Map<string, number>(
    existingTours.map((t) => [t.slug as string, t.id as number])
  );
  // Strapi v5's REST API takes the numeric id as a relation *value*, but
  // requires the string documentId in the URL path for single-entry
  // GET/PUT/DELETE — hence tracking both.
  const tourDocIdBySlug = new Map<string, string>(
    existingTours.map((t) => [t.slug as string, t.documentId as string])
  );

  for (const tour of tours) {
    if (tourIdBySlug.has(tour.slug)) {
      console.log(`  = ${tour.slug} (already present, skipped)`);
      continue;
    }
    const imageId = await uploadMedia(tour.image);
    const galleryIds: number[] = [];
    for (const src of tour.gallery) {
      const id = await uploadMedia(src);
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

    // videos[].src and videos[].poster are media fields nested in a
    // component, so they need uploading like any other asset — passing the
    // raw Cloudinary URL through makes Strapi reject the whole entry with
    // "Invalid relations".
    const videoComponents: { src: number; poster: number | null; caption: string }[] = [];
    for (const video of tour.videos ?? []) {
      const srcId = await uploadMedia(video.src);
      if (srcId === null) {
        console.warn(`  ! skipping video for ${tour.slug}: ${video.src}`);
        continue;
      }
      videoComponents.push({
        src: srcId,
        poster: await uploadMedia(video.poster),
        caption: video.caption,
      });
    }

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
          videos: videoComponents,
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

  // Strapi v5 keeps a separate row per document version, and the numeric id
  // a POST hands back is not always the one relation validation resolves
  // against — mixing the two produces "relation(s) ... do not exist" on the
  // relations below. Re-reading every tour from one source keeps the ids in
  // a single, consistent space.
  {
    const allTours = await fetchAllEntries('tours');
    tourIdBySlug.clear();
    tourDocIdBySlug.clear();
    for (const t of allTours) {
      tourIdBySlug.set(t.slug, t.id);
      tourDocIdBySlug.set(t.slug, t.documentId);
    }
  }

  // 3. Wire up `nearby` relations (second pass) ------------------------------
  console.log(`\nWiring up "nearby" relations...`);
  for (const tour of tours) {
    if (!tour.nearby || tour.nearby.length === 0) continue;
    const nearbyIds = tour.nearby
      .map((slug) => tourDocIdBySlug.get(slug))
      .filter((id): id is string => id !== undefined);
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
    const tourId = tourSlug ? tourDocIdBySlug.get(tourSlug) : undefined;
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
          lead: idFor(block.lead.slug, tourDocIdBySlug),
          more: idsFor(block.more, tourDocIdBySlug),
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
          lead: idFor(col.lead.slug, tourDocIdBySlug),
          items: idsFor(col.items, tourDocIdBySlug),
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
        heroLead: idFor(heroLead.slug, tourDocIdBySlug),
        heroMore: idsFor(heroMore, tourDocIdBySlug),
        photoStrip: idsFor(photoStrip, tourDocIdBySlug),
        sidebarFeature: idFor(sidebarFeature.slug, tourDocIdBySlug),
        sidebarStories: idsFor(sidebarStories, tourDocIdBySlug),
        latestUpdates: idsFor(latestUpdates, tourDocIdBySlug),
        forYouLead: idFor(forYouLead.slug, tourDocIdBySlug),
        forYouLeadTitle: forYouLead.title,
        forYouGrid: idsFor(forYouGrid, tourDocIdBySlug),
        historyFeature: idFor(historyFeature.slug, tourDocIdBySlug),
        historyFeatureTitle: historyFeature.title,
        mostRead: idsFor(mostRead, tourDocIdBySlug),
        photography: idsFor(photography, tourDocIdBySlug),
      },
    }),
  });

  console.log(`\nDone. ${tourIdBySlug.size} tours, ${uploadCache.size} unique images uploaded.`);
}

main().catch((err) => {
  console.error('\nMigration failed:', err);
  process.exit(1);
});
