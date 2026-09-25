// Loads the guide content scraped from touringghana.com (plus the regional and
// festival reference material) into a running Strapi instance.
//
//   node scripts/seed-content.mjs            # everything
//   node scripts/seed-content.mjs regions guide   # just those steps
//
// Steps: regions, guide, festivals, tours, accommodation, operators, history, history-links,
// coordinates.
//
// Safe to re-run: every record is looked up first (by slug / name) and updated
// or skipped rather than duplicated. Needs a full-access API token in
// scripts/.env (STRAPI_URL, STRAPI_API_TOKEN), same as migrate.ts.
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

const content = JSON.parse(await readFile(join(__dirname, 'data', 'site-content.json'), 'utf8'));

async function api(path, options = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) throw new Error(`${options.method ?? 'GET'} ${path} -> ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.status === 204 ? null : res.json();
}

async function all(collection) {
  const out = [];
  for (let page = 1; ; page++) {
    const res = await api(`/api/${collection}?pagination[page]=${page}&pagination[pageSize]=100`);
    out.push(...res.data);
    if (page >= res.meta.pagination.pageCount) break;
  }
  return out;
}

const create = (collection, data) => api(`/api/${collection}`, { method: 'POST', body: JSON.stringify({ data }) });
const update = (collection, documentId, data) =>
  api(`/api/${collection}/${documentId}`, { method: 'PUT', body: JSON.stringify({ data }) });

// Runs `fn` over `items` with a small worker pool so ~2,500 directory rows
// finish in a minute or two without hammering SQLite.
async function pool(items, size, fn) {
  let next = 0;
  let done = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (next < items.length) {
        const i = next++;
        await fn(items[i], i);
        if (++done % 250 === 0) console.log(`   ${done}/${items.length}`);
      }
    })
  );
}

const steps = process.argv.slice(2);
const run = (name) => steps.length === 0 || steps.includes(name);

// ---------------------------------------------------------------- regions
const regionIds = new Map();
async function loadRegionIds() {
  for (const r of await all('regions')) regionIds.set(r.name, r.documentId);
}

if (run('regions')) {
  console.log('regions…');
  await loadRegionIds();
  for (const region of content.regions) {
    const data = {
      name: region.name,
      capital: region.capital,
      note: region.note,
      overview: region.overview,
      attractions: region.attractions,
      festivals: region.festivals,
      wildlife: region.wildlife,
      sortOrder: region.sortOrder,
    };
    if (regionIds.has(region.name)) {
      await update('regions', regionIds.get(region.name), data);
    } else {
      // Same rule as lib/tour-utils.ts slugify(), which /region/[slug] links use.
      const slug = region.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const res = await create('regions', { ...data, slug });
      regionIds.set(region.name, res.data.documentId);
    }
  }
  console.log(`   ${content.regions.length} regions`);
}

// ---------------------------------------------------------------- guide pages
if (run('guide')) {
  console.log('guide pages…');
  const existing = new Map((await all('guide-pages')).map((p) => [p.slug, p.documentId]));
  for (const page of content.guidePages) {
    const data = {
      title: page.title,
      slug: page.slug,
      group: page.group,
      intro: page.intro ?? null,
      sortOrder: page.order,
      sections: page.sections.map((s) => ({ heading: s.heading || null, body: s.body })),
    };
    if (existing.has(page.slug)) await update('guide-pages', existing.get(page.slug), data);
    else await create('guide-pages', data);
  }
  console.log(`   ${content.guidePages.length} pages`);
}

// ---------------------------------------------------------------- festivals
if (run('festivals')) {
  console.log('festival listings…');
  const key = (f) => `${f.listType}|${f.month}|${f.name}`;
  const existing = new Set((await all('festival-listings')).map(key));
  const todo = content.festivalListings.filter((f) => !existing.has(key(f)));
  await pool(todo, 6, (f) => create('festival-listings', f));
  console.log(`   ${todo.length} created, ${existing.size} already present`);
}

// ---------------------------------------------------------------- tours
if (run('tours')) {
  console.log('tours…');
  if (regionIds.size === 0) await loadRegionIds();
  const categoryIds = new Map((await all('categories')).map((c) => [c.name, c.documentId]));
  const existing = new Map((await all('tours')).map((t) => [t.slug, t.documentId]));

  let created = 0;
  for (const t of content.toursNew) {
    const data = {
      slug: t.slug,
      name: t.name,
      headline: t.name,
      summary: t.summary,
      overview: t.overview,
      highlights: [],
      gettingThere: [],
      tips: [],
      sourceText: t.sourceText,
      region: regionIds.get(t.region),
      category: categoryIds.get(t.category),
    };
    if (!data.region || !data.category) throw new Error(`Missing region/category for ${t.slug}: ${t.region} / ${t.category}`);
    if (existing.has(t.slug)) {
      await update('tours', existing.get(t.slug), data);
    } else {
      await create('tours', data);
      created++;
    }
  }
  let updated = 0;
  for (const t of content.toursUpdate) {
    if (!existing.has(t.slug)) throw new Error(`Expected existing tour ${t.slug}`);
    await update('tours', existing.get(t.slug), { sourceText: t.sourceText });
    updated++;
  }
  console.log(`   ${created} created, ${updated} existing tours given their full source text`);
}

// ---------------------------------------------------------------- directories
if (run('accommodation')) {
  console.log('accommodation directory…');
  const key = (h) => `${h.region}|${h.name}|${h.location}`;
  const existing = new Set((await all('accommodation-listings')).map(key));
  const todo = content.accommodation.filter((h) => !existing.has(key(h)));
  await pool(todo, 8, (h) => create('accommodation-listings', h));
  console.log(`   ${todo.length} created, ${existing.size} already present`);
}

if (run('operators')) {
  console.log('tour operators…');
  const key = (o) => `${o.name}|${o.location}`;
  const existing = new Set((await all('tour-operators')).map(key));
  const todo = content.operators.filter((o) => !existing.has(key(o)));
  await pool(todo, 8, (o) => create('tour-operators', o));
  console.log(`   ${todo.length} created, ${existing.size} already present`);
}

// ---------------------------------------------------------------- history
// Only fills an *empty* history page: the live site's copy is edited in
// Strapi, and re-running this must never overwrite it.
if (run('history')) {
  console.log('history page…');
  let current = null;
  try {
    current = (await api('/api/history-page?populate[sections]=true')).data;
  } catch {
    current = null;
  }
  if (current && (current.sections ?? []).length > 0) {
    console.log('   history page already has content — left as is');
  } else {
    await api('/api/history-page', {
      method: 'PUT',
      body: JSON.stringify({ data: { sections: content.history } }),
    });
    console.log(`   ${content.history.length} sections`);
  }
}

// ---------------------------------------------------------------- history links
// Points a few Key Dates at the place page they relate to. Events without an
// entry here open their own spot on the History page timeline instead.
const EVENT_PLACES = {
  '1482': 'elmina-castle',
  '1701': 'manhyia-palace',
  '1874': 'christiansborg-castle',
  '1957': 'independence-square',
  '1960': 'kwame-nkrumah-mausoleum',
};

if (run('history-links')) {
  console.log('history event links…');
  const tourIds = new Map((await all('tours')).map((t) => [t.slug, t.documentId]));
  let linked = 0;
  for (const event of await all('history-events')) {
    const slug = EVENT_PLACES[event.year];
    if (!slug || !tourIds.has(slug)) continue;
    await update('history-events', event.documentId, { place: tourIds.get(slug) });
    linked++;
  }
  console.log(`   ${linked} events linked to a place`);
}

// ---------------------------------------------------------------- coordinates
// The places loaded from the scrape came without map positions. These are
// APPROXIMATE (town or landmark level, good to a kilometre or two): enough for
// the "nearby" distances and a directions pin near the right place, not for
// precise navigation. Correct any of them in Strapi under Tour > Coordinates.
// Only fills a tour that has no coordinates yet; never overwrites an edit.
const COORDINATES = {
  'lake-bosomtwi': [6.5, -1.407],
  'national-museum': [5.555, -0.205],
  'accra-cultural-centre': [5.551, -0.203],
  'du-bois-memorial-centre': [5.591, -0.172],
  'lake-volta': [6.3, 0.06],
  'cape-three-points': [4.744, -2.093],
  'wechiau-hippo-sanctuary': [10.05, -2.75],
  'bobiri-butterfly-sanctuary': [6.69, -1.34],
  'boti-falls': [6.224, -0.17],
  'fort-metal-cross-dixcove': [4.797, -1.942],
  'fort-william-anomabu': [5.169, -1.11],
  'christiansborg-castle': [5.548, -0.185],
  'fort-patience-apam': [5.283, -0.735],
  'fort-amsterdam-abandze': [5.171, -1.091],
  'fort-good-hope-senya-beraku': [5.402, -0.453],
  'fort-st-jago-elmina': [5.085, -1.351],
  'fort-apollonia-beyin': [5.053, -2.671],
  'fort-batenstein-butre': [4.785, -1.908],
  'fort-orange-sekondi': [4.934, -1.701],
  'fort-st-anthonio-axim': [4.865, -2.24],
  'fort-st-sebastian-shama': [5.005, -1.63],
  'fort-friederichsburg-princess-town': [4.796, -2.134],
};

if (run('coordinates')) {
  console.log('coordinates…');
  const res = await api('/api/tours?pagination[pageSize]=100&populate[coordinates]=true');
  const bySlug = new Map(res.data.map((t) => [t.slug, t]));
  const independence = bySlug.get('independence-square')?.coordinates;
  const targets = { ...COORDINATES };
  // The Mausoleum stands beside Independence Square, so borrow its position.
  if (independence) targets['kwame-nkrumah-mausoleum'] = [independence.lat, independence.lng];
  let set = 0;
  for (const [slug, [lat, lng]] of Object.entries(targets)) {
    const tour = bySlug.get(slug);
    if (!tour || tour.coordinates) continue;
    await update('tours', tour.documentId, { coordinates: { lat, lng } });
    set++;
  }
  console.log(`   ${set} tours given approximate coordinates`);
}

console.log('done');
