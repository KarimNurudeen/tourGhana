// Removes specific known-generic filler photos from specific tours' galleries,
// found by auditing every tour after fixing the nine hotels (see
// fix-hotel-galleries.mjs): the original site padded several tours' galleries
// with 1-2 extra photos from the same shared stock pool, on top of an
// otherwise-correct cover. Each removal below was visually checked — the photo
// is real and correctly used as SOMEONE's cover/gallery elsewhere, just wrong
// for this specific tour (a waterfall in Kakum's canopy-walkway gallery, an
// elephant photo in Paga's crocodile-pond gallery, a beach photo duplicated
// into Independence Square and Accra Food).
//
//   node scripts/strip-junk-gallery-photos.mjs
//
// Safe to re-run: removing an id that is already gone is a no-op.
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadEnvFile(path) {
  let text;
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
    if (!(key in process.env)) process.env[key] = trimmed.slice(eq + 1).trim();
  }
}

await loadEnvFile(join(__dirname, '.env'));
const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = process.env.STRAPI_API_TOKEN;
if (!TOKEN) throw new Error('STRAPI_API_TOKEN is not set (scripts/.env)');

async function api(path, options = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${TOKEN}`, ...(options.body ? { 'Content-Type': 'application/json' } : {}) },
  });
  if (!res.ok) throw new Error(`${options.method ?? 'GET'} ${path} -> ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

// slug -> filename fragments to remove from its gallery (cover is untouched).
const REMOVE = {
  'kakum-national-park': ['2a1d0148'], // a waterfall photo; Kakum's own subject is the canopy walkway
  nzulezu: ['2a1d0148'], // same waterfall photo; Nzulezu is a stilt village
  'paga-crocodile-pond': ['38315a0c'], // an elephant photo; Paga's subject is its crocodiles
  'aburi-gardens': ['2a1d0148'], // same waterfall photo, doesn't belong in a garden's gallery
  'independence-square': ['c6550939'], // a beach photo (it's genuinely Labadi Beach's, kept there)
  'accra-food': ['c6550939'], // same beach photo, unrelated to a food guide
};

const res = await api('/api/tours?pagination[pageSize]=100');
const bySlug = new Map(res.data.map((t) => [t.slug, t]));

for (const [slug, fragments] of Object.entries(REMOVE)) {
  const tour = bySlug.get(slug);
  if (!tour) throw new Error(`tour not found: ${slug}`);
  const full = await api(`/api/tours?filters[slug][$eq]=${slug}&populate[gallery]=true&pagination[pageSize]=1`);
  const gallery = full.data[0].gallery ?? [];
  const kept = gallery.filter((g) => !fragments.some((f) => g.url.includes(f) || g.hash?.includes(f)));
  if (kept.length === gallery.length) {
    console.log(`   ${slug}: nothing to remove (already clean)`);
    continue;
  }
  await api(`/api/tours/${tour.documentId}`, { method: 'PUT', body: JSON.stringify({ data: { gallery: kept.map((g) => g.id) } }) });
  console.log(`   ${slug}: gallery ${gallery.length} -> ${kept.length}`);
}
console.log('done');
