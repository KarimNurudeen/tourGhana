import Link from 'next/link';
import { Quiz } from '@/components/Quiz';
import { DateCard } from '@/components/DateCard';
import { RowCard } from '@/components/RowCard';
import { RowSection, SubSection } from '@/components/HomeGroup';
import { SectionNav } from '@/components/SectionNav';
import { VideoRow } from '@/components/VideoRow';
import { getGuidePages, getHomepage, getQuiz, getRegions, getTours, tourHref } from '@/lib/api';
import { getChannelVideos } from '@/lib/youtube';
import type { GuidePage, Tour } from '@/types/content';

const ATTRACTION_CATEGORIES = ['Forts & Castles', 'Parks & Wildlife', 'Culture & Heritage', 'Coast & Beaches'];
// Order within a mixed row: by kind of place, so the row reads in groups.
const rankOf = (t: Tour) => Math.max(0, ATTRACTION_CATEGORIES.indexOf(t.category));

// Guide pages whose route isn't /guide/<slug>.
const GUIDE_HREF: Record<string, string> = {
  visas: '/visas',
  'travel-tips': '/travel-tips',
  'where-to-stay': '/where-to-stay',
  'tour-operators': '/tour-operators',
  'festivals-in-ghana': '/category/festivals',
  contact: '/contact',
};
const guideHref = (slug: string) => GUIDE_HREF[slug] ?? `/guide/${slug}`;

function excerpt(page: GuidePage): string | undefined {
  const text = page.sections.flatMap((s) => s.paragraphs).find((p) => p && !p.startsWith('- '));
  if (!text) return undefined;
  return text.length > 150 ? `${text.slice(0, 147).trimEnd()}…` : text;
}

export default async function Home() {
  const [channelVideos, homepage, tours, quiz, regions, guidePages] = await Promise.all([
    getChannelVideos(15),
    getHomepage(),
    getTours(),
    getQuiz(),
    getRegions(),
    getGuidePages(),
  ]);
  const { topicBlocks, historyEvents } = homepage;

  const guideBySlug = new Map(guidePages.map((p) => [p.slug, p]));
  const guideCards = (slugs: string[]) =>
    slugs
      .map((slug) => guideBySlug.get(slug))
      .filter((p): p is GuidePage => Boolean(p))
      .map((p) => (
        <RowCard
          key={p.slug}
          title={p.title}
          href={guideHref(p.slug)}
          excerpt={excerpt(p)}
          image={p.image ?? undefined}
          plain={!p.image}
        />
      ));

  const tourCard = (t: Tour) => (
    <RowCard key={t.slug} title={t.name} href={tourHref(t)} image={t.image || undefined} meta={t.region} />
  );
  const byCategory = (...names: string[]) => tours.filter((t) => names.includes(t.category));
  // Places with a photo first, so the start of every row looks finished.
  const withPhotoFirst = (list: Tour[]) => [...list.filter((t) => t.image), ...list.filter((t) => !t.image)];

  // Top Attractions: the curated picks first, then any other attraction with a photo.
  const curatedSlugs = (topicBlocks.find((b) => b.id === 'top-attractions') ?? { lead: {}, more: [] }) as {
    lead: { slug?: string };
    more: { slug?: string }[];
  };
  const curated = [curatedSlugs.lead, ...curatedSlugs.more]
    .map((s) => tours.find((t) => t.slug === s.slug))
    .filter((t): t is Tour => Boolean(t));
  const attractions = byCategory(...ATTRACTION_CATEGORIES);
  const topAttractions = Array.from(
    new Map([...curated, ...withPhotoFirst(attractions)].map((t) => [t.slug, t])).values()
  )
    .slice(0, 12)
    .sort((a, b) => rankOf(a) - rankOf(b));

  const regionCards = regions.map((r) => (
    <RowCard
      key={r.slug}
      title={r.name.replace(/ Region$/, '')}
      href={`/region/${r.slug}`}
      image={r.image ?? undefined}
      plain={!r.image}
     
      meta={[r.capital ? `Capital: ${r.capital}` : null, r.tours.length ? `${r.tours.length} featured` : null]
        .filter(Boolean)
        .join(' · ')}
    />
  ));

  const sections: { id: string; label: string; node: React.ReactNode }[] = [
    {
      id: 'attractions',
      label: 'Top Attractions',
      node: (
        <RowSection id="attractions" title="Tourist Attractions in Ghana" href="/attractions" hrefLabel="All attractions">
          {topAttractions.map(tourCard)}
        </RowSection>
      ),
    },
    {
      id: 'forts',
      label: 'Forts & Castles',
      node: (
        <RowSection id="forts" title="Forts and Castles in Ghana" href="/category/forts-castles">
          {withPhotoFirst(byCategory('Forts & Castles')).map(tourCard)}
        </RowSection>
      ),
    },
    {
      id: 'nature',
      label: 'Nature & Wildlife',
      node: (
        <RowSection id="nature" title="Nature, Wildlife and Coast in Ghana" href="/category/parks-wildlife">
          {withPhotoFirst(byCategory('Parks & Wildlife', 'Coast & Beaches')).sort((a, b) => rankOf(a) - rankOf(b)).map(tourCard)}
        </RowSection>
      ),
    },
    {
      id: 'culture',
      label: 'Culture & Heritage',
      node: (
        <RowSection id="culture" title="Ghana's Culture and Heritage" href="/category/culture-heritage">
          {withPhotoFirst(byCategory('Culture & Heritage')).map(tourCard)}
          {guideCards(['culture-heritage', 'handicrafts', 'heritage-sites', 'ecotourism'])}
        </RowSection>
      ),
    },
    {
      id: 'regions',
      label: 'Regions',
      node: (
        <RowSection id="regions" title="Highlights by Region" href="/regions" hrefLabel="All regions">
          {regionCards}
        </RowSection>
      ),
    },
    {
      id: 'festivals',
      label: 'Festivals',
      node: (
        <RowSection id="festivals" title="Festivals in Ghana" href="/category/festivals" hrefLabel="Festival calendar">
          {byCategory('Festivals').map(tourCard)}
        </RowSection>
      ),
    },
    {
      id: 'events',
      label: 'Special Events',
      node: (
        <RowSection id="events" title="Special Events">
          {guideCards(['panafest', 'emancipation-day', 'chale-wote', 'ghana-music-week', 'paragliding-festival', 'black-history-month'])}
        </RowSection>
      ),
    },
    {
      id: 'stay',
      label: 'Where To Stay',
      node: (
        <RowSection id="stay" title="Where To Stay" href="/where-to-stay" hrefLabel="Hotel directory">
          {byCategory('Where To Stay').map(tourCard)}
        </RowSection>
      ),
    },
    {
      id: 'food',
      label: 'Food & Dining',
      node: (
        <RowSection id="food" title="Food & Dining" href="/category/food-dining">
          {byCategory('Food & Dining').map(tourCard)}
          {guideCards(['cuisine', 'restaurants'])}
        </RowSection>
      ),
    },
    {
      id: 'history',
      label: 'History',
      node: (
        <RowSection id="history" title="History of Ghana" href="/history" hrefLabel="Read the history">
          {historyEvents.map((e) => (
            <DateCard key={e.year} event={e} />
          ))}
        </RowSection>
      ),
    },
    {
      id: 'plan',
      label: 'Plan Your Visit',
      node: (
        <RowSection id="plan" title="Plan Your Visit">
          {guideCards(['welcome-to-ghana', 'visas', 'travel-tips', 'travel-facts', 'accommodation-guide'])}
        </RowSection>
      ),
    },
    {
      id: 'services',
      label: 'Services',
      node: (
        <RowSection id="services" title="Tour Operators & Services">
          {guideCards(['tour-operators', 'airline-ticketing', 'car-rentals', 'recreation', 'contact'])}
        </RowSection>
      ),
    },
    ...(channelVideos.length > 0
      ? [
          {
            id: 'videos',
            label: 'Videos',
            node: (
              <SubSection id="videos" title="Videos" href="/videos" hrefLabel="All videos">
                <VideoRow videos={channelVideos.slice(0, 12)} />
              </SubSection>
            ),
          },
        ]
      : []),
    {
      id: 'quiz',
      label: 'Quiz',
      node: (
        <SubSection id="quiz" title="Test what you know">
          <section aria-label="Quiz" className="rounded-xl bg-white p-5 shadow-card">
            <Quiz questions={quiz} />
          </section>
        </SubSection>
      ),
    },
  ];

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 pb-6 sm:px-4">
        <SectionNav items={sections.map((s) => ({ id: s.id, label: s.label }))} />
        <h1 className="sr-only">Tour Ghana: attractions, regions, festivals and places to stay</h1>
        <div className="mt-5 space-y-9">
          {sections.map((s) => (
            <div key={s.id}>{s.node}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
