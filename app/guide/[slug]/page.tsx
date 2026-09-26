import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { GuideSections } from '@/components/GuideArticle';
import { CardRow } from '@/components/CardRow';
import { ContactLinks } from '@/components/Directory';
import { RowCard } from '@/components/RowCard';
import { getGuidePage, getGuidePages, getTourOperators } from '@/lib/api';
import { tourHref } from '@/lib/tour-utils';

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

const h2 =
  "flex items-center gap-2 text-[20px] font-black tracking-tight text-ink before:h-5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-[''] sm:text-[22px]";

const GROUP_LABEL: Record<string, string> = {
  visiting: 'Visiting',
  touring: 'Touring',
  events: 'Special Events',
  services: 'Services',
  about: 'About Ghana',
};

export async function generateStaticParams() {
  const pages = await getGuidePages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getGuidePage(slug);
  if (!page) return { title: 'Page not found' };
  const first = page.sections[0]?.paragraphs[0];
  return { title: page.title, description: first ? first.slice(0, 160) : undefined };
}

export default async function GuidePageRoute({ params }: GuidePageProps) {
  const { slug } = await params;
  const page = await getGuidePage(slug);
  if (!page) notFound();

  const agents = page.showTravelAgents ? await getTourOperators({ agencyType: 'IATA', pageSize: 6 }) : null;
  const featured = page.featured ?? [];
  const links = page.links ?? [];

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 py-6 sm:px-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-semibold text-neutral-500">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span>{GROUP_LABEL[page.group] ?? 'Guide'}</span>
        </nav>

        <article className="mt-4 rounded-xl bg-white p-5 shadow-card sm:p-8">
          <h1 className="text-[30px] font-black leading-tight tracking-tight text-ink sm:text-[38px]">
            {page.title}
          </h1>
          {page.intro && <p className="mt-3 text-[17px] text-neutral-600">{page.intro}</p>}
          {page.image && (
            <figure className="mt-5">
              <div className="relative aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl bg-neutral-200">
                <Image src={page.image} alt={page.title} fill priority className="object-cover" sizes="(min-width: 768px) 768px, 100vw" />
              </div>
              {page.imageCredit && <figcaption className="mt-1.5 text-[12px] text-neutral-500">{page.imageCredit}</figcaption>}
            </figure>
          )}
          <div className="mt-6 max-w-3xl">
            <GuideSections sections={page.sections} />
          </div>
        </article>

        {featured.length > 0 && (
          <section aria-labelledby="featured" className="mt-8 space-y-3">
            <h2 id="featured" className={h2}>
              {page.featuredHeading ?? 'Places to go'}
            </h2>
            {page.distanceFrom && (
              <p className="-mt-1 text-[13px] text-neutral-500">
                Distances are in a straight line, so allow extra time by road.
              </p>
            )}
            <CardRow label={page.featuredHeading ?? 'Places to go'}>
              {featured.map((place) => (
                <RowCard
                  key={place.slug}
                  title={place.name}
                  href={tourHref(place)}
                  image={place.image || undefined}
                  meta={
                    place.distanceKm !== null && page.distanceFrom
                      ? place.distanceKm === 0
                        ? `In ${page.distanceFrom}`
                        : `${place.distanceKm} km from ${page.distanceFrom.split(',').pop()?.trim()}`
                      : place.region
                  }
                />
              ))}
            </CardRow>
          </section>
        )}

        {agents && agents.items.length > 0 && (
          <section aria-labelledby="agents" className="mt-8 space-y-3">
            <h2 id="agents" className={h2}>
              IATA travel agents
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {agents.items.map((agent) => (
                <li key={`${agent.name}-${agent.location}`} className="rounded-xl bg-white p-4 shadow-card">
                  <p className="text-[17px] font-extrabold leading-snug text-ink">{agent.name}</p>
                  {agent.location && <p className="mt-1 text-[14px] text-neutral-600">{agent.location}</p>}
                  {agent.contact.length > 0 && (
                    <ul className="mt-2 space-y-0.5 break-words text-[14px] text-neutral-700">
                      {agent.contact.slice(0, 4).map((line) => (
                        <li key={line}>
                          <ContactLinks text={line} />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/tour-operators?agencyType=IATA#directory"
              className="inline-flex items-center text-[13px] font-extrabold uppercase tracking-wide text-brand">
              All {agents.total} IATA agents <ChevronRightIcon className="h-4 w-4" strokeWidth={3} />
            </Link>
          </section>
        )}

        {links.length > 0 && (
          <section aria-labelledby="related" className="mt-8 space-y-3">
            <h2 id="related" className={h2}>
              Related
            </h2>
            <ul className="flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-full bg-white px-4 py-2 text-[14px] font-extrabold text-ink shadow-card hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
