// Fixes the same problem seed-images.mjs fixed for tour covers, but for the
// `gallery` field: nine hotels' galleries still held the old shared pool of
// generic filler images (elephants, a crocodile pond, an unrelated hotel
// room) after their cover photo was corrected. This replaces or empties each
// one directly — it's a one-off correction, not part of the general pipeline,
// so it isn't merged into seed-images.mjs.
//
//   node scripts/fix-hotel-galleries.mjs
//
// Safe to re-run: it always sets the gallery to exactly the list below, so
// running it twice has no further effect. Needs STRAPI_URL and
// STRAPI_API_TOKEN (scripts/.env, or set in the shell for another Strapi).
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
const USER_AGENT = 'TourGhanaImageSeeder/1.0 (https://www.tourghana.com; karimnurudeen13@gmail.com)';

async function api(path, options = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) throw new Error(`${options.method ?? 'GET'} ${path} -> ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.status === 204 ? null : res.json();
}

async function upload(url, name, altText, credit) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`download failed ${res.status}: ${url}`);
  const type = res.headers.get('content-type') ?? 'image/jpeg';
  const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
  const blob = new Blob([await res.arrayBuffer()], { type });
  const form = new FormData();
  form.append('files', blob, `${name}.${ext}`);
  form.append('fileInfo', JSON.stringify({ name, alternativeText: altText, caption: credit }));
  const [file] = await api('/api/upload', { method: 'POST', body: form });
  return file.id;
}

// Real, sourced photos to add — a second image per hotel where one was found,
// beyond the one already used as the cover.
const GALLERY = {
  'royal-senchi-resort-akosombo': [
    { url: 'https://theroyalsenchi.com/wp-content/uploads/2023/12/HAS_6770-min.jpg', credit: 'Photo courtesy of The Royal Senchi (theroyalsenchi.com), used with attribution' },
  ],
  'zaina-lodge-mole': [
    { url: 'https://i0.wp.com/zainalodge-ghana.com/wp-content/uploads/2022/06/Conference-Room-Building-1.jpg?resize=1080%2C359&ssl=1', credit: 'Photo courtesy of Zaina Lodge (zainalodge-ghana.com), used with attribution' },
  ],
  'volta-serene-hotel-ho': [
    { url: 'https://voltaserenehotel.com/wp-content/uploads/2023/08/duplex-chalet-1-700x466.webp', credit: 'Photo courtesy of Volta Serene Hotel (voltaserenehotel.com), used with attribution' },
  ],
  'busua-beach-resort': [
    { url: 'https://tt3.ams3.digitaloceanspaces.com/busua/Pool%20Picture.jpg', credit: 'Photo courtesy of Busua Beach Resort (busuabeachresort.net), used with attribution' },
  ],
  'noda-hotel-kumasi': [
    { url: 'https://www.nodahotel.com/images/card1.jpeg', credit: 'Photo courtesy of Noda Hotel (nodahotel.com), used with attribution' },
  ],
  'golden-tulip-kumasi-city': [
    { url: 'https://a.otcdn.com/imglib/hotelphotos/7/8/038/hotel-golden-tulip-kumasi-city-20240608225305037700.webp', credit: 'Photo via Destinia hotel listing, used with attribution' },
  ],
  // No further verified real photo found for these three; empty is honest.
  'sun-city-hotel-tamale': [],
  'royal-park-hotel-bolgatanga': [],
  'upland-hotel-wa': [],
};

const res = await api('/api/tours?pagination[pageSize]=100');
const bySlug = new Map(res.data.map((t) => [t.slug, t]));

for (const [slug, photos] of Object.entries(GALLERY)) {
  const tour = bySlug.get(slug);
  if (!tour) throw new Error(`tour not found: ${slug}`);
  const ids = [];
  for (const [i, p] of photos.entries()) {
    ids.push(await upload(p.url, `${slug}-gallery-${i + 1}`, tour.name, p.credit));
  }
  await api(`/api/tours/${tour.documentId}`, { method: 'PUT', body: JSON.stringify({ data: { gallery: ids } }) });
  console.log(`   ${slug}: gallery set to ${ids.length} photo(s)`);
}
console.log('done');
