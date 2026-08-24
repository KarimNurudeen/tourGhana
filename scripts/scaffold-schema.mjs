// One-time scaffold: writes Strapi content-type/component schema files plus
// their boilerplate controller/route/service files. Run once with
// `node scripts/scaffold-schema.mjs` from the repo root, before the first
// `npm run develop` inside strapi/. Safe to re-run — it overwrites, doesn't
// append. Lives outside strapi/ deliberately so Strapi's own dev-server file
// watcher never tries to compile it as part of the Strapi project.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const root = join(repoRoot, 'strapi');

function writeJSON(path, obj) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(obj, null, 2) + '\n');
}

function writeFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

const components = {
  'shared/link': {
    collectionName: 'components_shared_links',
    info: { displayName: 'Link', icon: 'link' },
    options: {},
    attributes: {
      label: { type: 'string', required: true },
      href: { type: 'string', required: true },
    },
  },
  'shared/nav-item': {
    collectionName: 'components_shared_nav_items',
    info: { displayName: 'Nav Item', icon: 'bulletList' },
    options: {},
    attributes: {
      label: { type: 'string', required: true },
      href: { type: 'string' },
      children: {
        type: 'component',
        repeatable: true,
        component: 'shared.link',
      },
    },
  },
  'tour/video': {
    collectionName: 'components_tour_videos',
    info: { displayName: 'Video', icon: 'video' },
    options: {},
    attributes: {
      src: { type: 'string', required: true },
      poster: { type: 'string' },
      caption: { type: 'string' },
    },
  },
  'tour/quick-fact': {
    collectionName: 'components_tour_quick_facts',
    info: { displayName: 'Quick Fact', icon: 'bulletList' },
    options: {},
    attributes: {
      label: { type: 'string', required: true },
      value: { type: 'string', required: true },
    },
  },
  'tour/festival-rule': {
    collectionName: 'components_tour_festival_rules',
    info: { displayName: 'Festival Rule', icon: 'calendar' },
    options: {},
    attributes: {
      month: { type: 'integer', required: true, min: 1, max: 12 },
      weekday: { type: 'integer', required: true, min: 0, max: 6 },
      occurrence: { type: 'integer', required: true, min: 1 },
    },
  },
  'tour/festival-timing': {
    collectionName: 'components_tour_festival_timings',
    info: { displayName: 'Festival Timing', icon: 'calendar' },
    options: {},
    attributes: {
      months: { type: 'json' },
      rule: { type: 'component', repeatable: false, component: 'tour.festival-rule' },
      note: { type: 'text' },
    },
  },
  'tour/coordinates': {
    collectionName: 'components_tour_coordinates',
    info: { displayName: 'Coordinates', icon: 'pinMap' },
    options: {},
    attributes: {
      lat: { type: 'decimal', required: true },
      lng: { type: 'decimal', required: true },
    },
  },
};

for (const [name, schema] of Object.entries(components)) {
  writeJSON(join(root, 'src/components', `${name}.json`), schema);
}

// ---------------------------------------------------------------------------
// Content types
// ---------------------------------------------------------------------------

function coreFiles(singularName, uid) {
  const pascal = singularName
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');
  return {
    controller: `import { factories } from '@strapi/strapi';

export default factories.createCoreController('${uid}');
`,
    route: `import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('${uid}');
`,
    service: `import { factories } from '@strapi/strapi';

export default factories.createCoreService('${uid}');
`,
  };
}

function defineContentType({ singularName, pluralName, displayName, kind = 'collectionType', attributes, draftAndPublish = false }) {
  const uid = `api::${singularName}.${singularName}`;
  const base = join(root, 'src/api', singularName);

  writeJSON(join(base, 'content-types', singularName, 'schema.json'), {
    kind,
    collectionName: pluralName,
    info: {
      singularName,
      pluralName,
      displayName,
      description: '',
    },
    options: {
      draftAndPublish,
    },
    pluginOptions: {},
    attributes,
  });

  const { controller, route, service } = coreFiles(singularName, uid);
  writeFile(join(base, 'controllers', `${singularName}.ts`), controller);
  writeFile(join(base, 'routes', `${singularName}.ts`), route);
  writeFile(join(base, 'services', `${singularName}.ts`), service);
}

// Region
defineContentType({
  singularName: 'region',
  pluralName: 'regions',
  displayName: 'Region',
  attributes: {
    name: { type: 'string', required: true, unique: true },
    slug: { type: 'uid', targetField: 'name', required: true },
  },
});

// Category
defineContentType({
  singularName: 'category',
  pluralName: 'categories',
  displayName: 'Category',
  attributes: {
    name: { type: 'string', required: true, unique: true },
    slug: { type: 'uid', targetField: 'name', required: true },
  },
});

// Tour
defineContentType({
  singularName: 'tour',
  pluralName: 'tours',
  displayName: 'Tour',
  attributes: {
    slug: { type: 'uid', targetField: 'name', required: true },
    name: { type: 'string', required: true },
    headline: { type: 'string', required: true },
    region: { type: 'relation', relation: 'manyToOne', target: 'api::region.region' },
    category: { type: 'relation', relation: 'manyToOne', target: 'api::category.category' },
    summary: { type: 'text', required: true },
    image: { type: 'media', multiple: false, allowedTypes: ['images'] },
    imageCredit: { type: 'string' },
    gallery: { type: 'media', multiple: true, allowedTypes: ['images'] },
    photoCategories: { type: 'json' },
    videos: { type: 'component', repeatable: true, component: 'tour.video' },
    festivalTiming: { type: 'component', repeatable: false, component: 'tour.festival-timing' },
    coordinates: { type: 'component', repeatable: false, component: 'tour.coordinates' },
    overview: { type: 'json' },
    highlights: { type: 'json' },
    quickFacts: { type: 'component', repeatable: true, component: 'tour.quick-fact' },
    gettingThere: { type: 'json' },
    tips: { type: 'json' },
    nearby: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
  },
});

// HistoryEvent
defineContentType({
  singularName: 'history-event',
  pluralName: 'history-events',
  displayName: 'History Event',
  attributes: {
    year: { type: 'string', required: true },
    text: { type: 'text', required: true },
    order: { type: 'integer', default: 0 },
  },
});

// TravelTip
defineContentType({
  singularName: 'travel-tip',
  pluralName: 'travel-tips',
  displayName: 'Travel Tip',
  attributes: {
    label: { type: 'string', required: true },
    detail: { type: 'text', required: true },
    order: { type: 'integer', default: 0 },
  },
});

// QuizQuestion
defineContentType({
  singularName: 'quiz-question',
  pluralName: 'quiz-questions',
  displayName: 'Quiz Question',
  attributes: {
    category: { type: 'string', required: true },
    question: { type: 'text', required: true },
    image: { type: 'relation', relation: 'manyToOne', target: 'api::tour.tour' },
    options: { type: 'json', required: true },
    correctAnswer: { type: 'string', required: true },
  },
});

// TopicBlock
defineContentType({
  singularName: 'topic-block',
  pluralName: 'topic-blocks',
  displayName: 'Topic Block',
  attributes: {
    blockId: { type: 'uid', targetField: 'topic', required: true },
    topic: { type: 'string', required: true },
    links: { type: 'component', repeatable: true, component: 'shared.link' },
    lead: { type: 'relation', relation: 'manyToOne', target: 'api::tour.tour' },
    more: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
    order: { type: 'integer', default: 0 },
  },
});

// CategoryColumn
defineContentType({
  singularName: 'category-column',
  pluralName: 'category-columns',
  displayName: 'Category Column',
  attributes: {
    columnId: { type: 'uid', targetField: 'title', required: true },
    title: { type: 'string', required: true },
    href: { type: 'string', required: true },
    lead: { type: 'relation', relation: 'manyToOne', target: 'api::tour.tour' },
    items: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
    order: { type: 'integer', default: 0 },
  },
});

// Navigation (single type)
defineContentType({
  singularName: 'navigation',
  pluralName: 'navigations',
  displayName: 'Navigation',
  kind: 'singleType',
  attributes: {
    primaryNav: { type: 'component', repeatable: true, component: 'shared.nav-item' },
    tickerLinks: { type: 'component', repeatable: true, component: 'shared.link' },
  },
});

// Homepage (single type)
defineContentType({
  singularName: 'homepage',
  pluralName: 'homepages',
  displayName: 'Homepage',
  kind: 'singleType',
  attributes: {
    heroLead: { type: 'relation', relation: 'oneToOne', target: 'api::tour.tour' },
    heroMore: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
    photoStrip: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
    sidebarFeature: { type: 'relation', relation: 'oneToOne', target: 'api::tour.tour' },
    sidebarStories: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
    latestUpdates: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
    forYouLead: { type: 'relation', relation: 'oneToOne', target: 'api::tour.tour' },
    forYouLeadTitle: { type: 'string' },
    forYouGrid: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
    historyFeature: { type: 'relation', relation: 'oneToOne', target: 'api::tour.tour' },
    historyFeatureTitle: { type: 'string' },
    mostRead: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
    photography: { type: 'relation', relation: 'manyToMany', target: 'api::tour.tour' },
  },
});

console.log('Schema scaffold written. Start Strapi with `npm run develop` to apply it.');
