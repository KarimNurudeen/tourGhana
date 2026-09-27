// Adds openly licensed photos (from Wikimedia Commons) to places that have none,
// with the photographer and licence saved alongside each image.
//
//   node scripts/seed-images.mjs            # add photos where a target has none
//   node scripts/seed-images.mjs --force    # replace existing photos too
//
// Reads scripts/data/place-images.json. Each entry names a target record, the
// Commons file, its download URL and the credit line to show on the site. The
// image is downloaded, uploaded to Strapi (which stores it on Cloudinary in
// production) and attached to the target's `image` field.
//
// Safe to re-run: a target that already has an image is skipped unless --force.
// Needs STRAPI_URL and STRAPI_API_TOKEN (scripts/.env, or set in the shell to
// point at another Strapi).
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FORCE = process.argv.includes('--force');

// Wikimedia asks automated clients to identify themselves.
const USER_AGENT = 'TourGhanaImageSeeder/1.0 (https://www.tourghana.com; karimnurudeen13@gmail.com)';

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

const manifest = JSON.parse(await readFile(join(__dirname, 'data', 'place-images.json'), 'utf8'));

async function api(path, options = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) throw new Error(`${options.method ?? 'GET'} ${path} -> ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(url) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.ok) {
      const type = res.headers.get('content-type') ?? 'image/jpeg';
      return { blob: new Blob([await res.arrayBuffer()], { type }), type };
    }
    // Commons rate-limits bursts; back off and retry.
    await sleep(1500 * attempt);
  }
  throw new Error(`could not download ${url}`);
}

// How to find each kind of target, and which fields hold its image and credit.
const TARGETS = {
  tours: { find: (t) => `filters[slug][$eq]=${encodeURIComponent(t.slug)}` },
  regions: { find: (t) => `filters[name][$eq]=${encodeURIComponent(t.name)}` },
  'guide-pages': { find: (t) => `filters[slug][$eq]=${encodeURIComponent(t.slug)}` },
  'festival-listings': {
    find: (t) => `filters[name][$eq]=${encodeURIComponent(t.name)}&filters[listType][$eq]=${t.listType ?? 'monthly'}`,
  },
};

async function uploadImage(entry, altText) {
  const { blob, type } = await download(entry.url);
  const ext = type.includes('png') ? 'png' : 'jpg';
  const form = new FormData();
  const t = entry.target;
  const base = (t.heading ?? t.slug ?? t.name ?? 'image').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60);
  form.append('files', blob, `${base}.${ext}`);
  form.append('fileInfo', JSON.stringify({ name: base, alternativeText: altText, caption: entry.credit }));
  const [file] = await api('/api/upload', { method: 'POST', body: form });
  return file.id;
}

// The image to attach: either a fresh upload from Commons, or (for entries with
// "reuse") the photo an existing place already has, so a section that is really
// about a place we already picture doesn't need a second copy.
async function resolveImage(entry, altText) {
  if (entry.reuse) {
    const spec = TARGETS[entry.reuse.collection];
    const found = await api(`/api/${entry.reuse.collection}?${spec.find(entry.reuse)}&populate[image]=true&pagination[pageSize]=1`);
    const source = found.data[0];
    if (!source?.image) throw new Error(`nothing to reuse: ${entry.reuse.collection}/${entry.reuse.slug} has no image`);
    return { id: source.image.id, credit: source.imageCredit ?? null };
  }
  return { id: await uploadImage(entry, altText), credit: entry.credit };
}

let added = 0;
let skipped = 0;
const failed = [];

for (const entry of manifest.images) {
  const { collection, ...target } = entry.target;
  const label = `${collection}/${target.slug ?? target.name}${target.heading ? ` › ${target.heading}` : ''}`;
  try {
    if (entry.clear) {
      const spec = TARGETS[collection];
      const found = await api(`/api/${collection}?${spec.find(target)}&pagination[pageSize]=1`);
      const record = found.data[0];
      if (!record) throw new Error('target not found');
      await api(`/api/${collection}/${record.documentId}`, { method: 'PUT', body: JSON.stringify({ data: { image: null, imageCredit: null } }) });
      added++;
      console.log(`   - cleared ${label} (no verified real photo)`);
      continue;
    }
    if (collection === 'guide-sections') {
      // A section is one item of a guide page's repeatable "sections"; updating
      // it means sending the page's whole list back, ids included.
      const found = await api(
        `/api/guide-pages?filters[slug][$eq]=${encodeURIComponent(target.slug)}&populate[sections][populate][image]=true&pagination[pageSize]=1`
      );
      const page = found.data[0];
      if (!page) throw new Error('page not found');
      const section = page.sections.find((x) => x.heading === target.heading);
      if (!section) throw new Error('section not found');
      if (section.image && !FORCE && !entry.force) {
        skipped++;
        continue;
      }
      const { id, credit } = await resolveImage(entry, target.heading);
      const sections = page.sections.map((x) => ({
        id: x.id,
        heading: x.heading,
        body: x.body,
        imageCredit: x === section ? credit : x.imageCredit ?? null,
        image: x === section ? id : x.image?.id ?? null,
      }));
      await api(`/api/guide-pages/${page.documentId}`, { method: 'PUT', body: JSON.stringify({ data: { sections } }) });
    } else {
      const spec = TARGETS[collection];
      if (!spec) throw new Error(`unknown collection ${collection}`);
      const found = await api(`/api/${collection}?${spec.find(target)}&populate[image]=true&pagination[pageSize]=1`);
      const record = found.data[0];
      if (!record) throw new Error('target not found');
      if (record.image && !FORCE && !entry.force) {
        skipped++;
        continue;
      }
      const { id, credit } = await resolveImage(entry, record.name ?? record.title ?? target.slug ?? target.name);
      await api(`/api/${collection}/${record.documentId}`, {
        method: 'PUT',
        body: JSON.stringify({ data: { image: id, imageCredit: credit } }),
      });
    }
    added++;
    console.log(`   + ${label}`);
    if (!entry.reuse) await sleep(700);
  } catch (err) {
    failed.push(`${label}: ${err.message}`);
    console.log(`   ! ${label}: ${err.message}`);
  }
}

console.log(`\n${added} photos added, ${skipped} skipped (already had one), ${failed.length} failed`);
if (failed.length) process.exitCode = 1;
