// Finds embeddable YouTube videos for each place and writes them to
// scripts/data/place-videos.candidates.json for review (curated picks go in place-videos.json). Nothing is changed in Strapi.
//
//   node scripts/find-videos.mjs             # every place
//   node scripts/find-videos.mjs kakum       # only places whose slug contains "kakum"
//
// Uses the YOUTUBE_API_KEY in .env.local (a search costs 100 of the 10,000
// daily quota units). A video is kept only if it is public, embeddable, between
// 45 seconds and 25 minutes, and its title or channel actually names the place.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const env = Object.fromEntries(
  (await readFile(join(root, '.env.local'), 'utf8'))
    .split('\n')
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
);
const KEY = env.YOUTUBE_API_KEY;
if (!KEY) throw new Error('YOUTUBE_API_KEY missing from .env.local');
const API = env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
const only = process.argv[2];
const MAX_PER_PLACE = 4;

const tours = await (await fetch(`${API}/api/tours`)).json();

const GENERIC = new Set(['ghana', 'national', 'park', 'fort', 'castle', 'beach', 'resort', 'hotel', 'the', 'and', 'of', 'in', 'festival', 'falls', 'lake', 'museum', 'centre', 'center', 'memorial', 'gardens', 'garden', 'sanctuary', 'village', 'stilt', 'harbour', 'square', 'palace', 'kente', 'city', 'accra', 'eating']);
const words = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length >= 3);
// Words a video's title/channel must contain for it to count as being about this place.
function required(name) {
  const w = words(name);
  const distinctive = w.filter((x) => !GENERIC.has(x));
  return distinctive.length ? distinctive.slice(0, 2) : w.slice(0, 2);
}
const seconds = (iso) => {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso ?? '');
  return m ? (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0) : 0;
};
async function yt(path, params) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  for (const [k, v] of Object.entries({ ...params, key: KEY })) url.searchParams.set(k, v);
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(`${path}: ${data.error?.message ?? res.status}`);
  return data;
}

const out = {};
for (const tour of tours) {
  if (only && !tour.slug.includes(only)) continue;
  const isHotel = tour.category === 'Where To Stay';
  const query = `${tour.name.replace(/\(.*?\)/g, '')} ${isHotel ? '' : 'Ghana'}`.trim();
  const need = required(tour.name);
  try {
    const found = await yt('search', { part: 'snippet', q: query, type: 'video', videoEmbeddable: 'true', maxResults: 12, relevanceLanguage: 'en', safeSearch: 'strict' });
    const ids = found.items.map((i) => i.id.videoId).join(',');
    if (!ids) { out[tour.slug] = []; continue; }
    const detail = await yt('videos', { part: 'contentDetails,status,statistics,snippet', id: ids });
    const kept = detail.items
      .filter((v) => v.status?.embeddable && v.status?.privacyStatus === 'public')
      .filter((v) => { const s = seconds(v.contentDetails?.duration); return s >= 45 && s <= 25 * 60; })
      .filter((v) => { const text = words(`${v.snippet.title} ${v.snippet.channelTitle}`); return need.every((n) => text.some((t) => t.includes(n) || n.includes(t))); })
      .map((v) => ({ videoId: v.id, title: v.snippet.title, channel: v.snippet.channelTitle, views: +v.statistics?.viewCount || 0, seconds: seconds(v.contentDetails.duration), published: v.snippet.publishedAt.slice(0, 10) }))
      .sort((a, b) => b.views - a.views)
      .slice(0, MAX_PER_PLACE);
    out[tour.slug] = kept;
    console.log(`${tour.slug.padEnd(38)} ${kept.length} video(s)`);
  } catch (err) {
    console.log(`${tour.slug.padEnd(38)} ERROR ${err.message}`);
    out[tour.slug] = [];
    if (/quota/i.test(err.message)) break;
  }
}
await writeFile(join(root, 'scripts', 'data', 'place-videos.candidates.json'), JSON.stringify({ videos: out }, null, 1));
console.log(`\n${Object.values(out).filter((v) => v.length).length} of ${Object.keys(out).length} places have candidate videos`);
