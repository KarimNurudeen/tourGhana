import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { CheckIcon, ChevronRightIcon, MapPinIcon } from 'lucide-react';
import { getTour, getTours, slugify, tourHref } from '@/lib/api';
import { QuickFactsPanel } from '@/components/QuickFactsPanel';
import { ReadMore } from '@/components/ReadMore';
import { ScrollReveal } from '@/components/ScrollReveal';
import { DirectionsMap } from '@/components/DirectionsMap';
import { PhotoGallery } from '@/components/PhotoGallery';
import { TourGrid } from '@/components/TourGrid';

type TourPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const tours = await getTours();
  return tours
    .filter((tour) => tour.category !== 'Where To Stay' && tour.category !== 'Festivals')
    .map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return { title: 'Page not found' };
  }

  return {
    title: tour.name,
    description: tour.summary,
  };
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    notFound();
  }

  if (tour.category === 'Where To Stay' || tour.category === 'Festivals') {
    redirect(tourHref(tour));
  }

  const heroImages = Array.from(new Set([tour.image, ...tour.gallery].filter(Boolean)));

  const [nearbyResults, categoryTours] = await Promise.all([
    Promise.all(tour.nearby.map((s) => getTour(s))),
    getTours({ category: tour.category }),
  ]);
  const nearbyTours = nearbyResults.filter((t): t is NonNullable<typeof t> => t !== null && t.slug !== tour.slug);
  const alsoIn = categoryTours.filter((t) => t.slug !== tour.slug).slice(0, 4);

  const card = 'rounded-xl bg-white p-4 shadow-card sm:p-6';
  const h2 =
    "flex items-center gap-2 text-[20px] font-black tracking-tight text-ink before:h-5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-[''] sm:text-[22px]";

  const quickFacts = <QuickFactsPanel facts={tour.quickFacts} variant="stack" />;

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 pb-16 pt-5 sm:px-4 sm:pt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold text-neutral-500">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <Link href={`/category/${slugify(tour.category)}`} className="uppercase tracking-wide hover:text-brand">
            {tour.category}
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">{tour.name}</span>
        </nav>

        <header className="mt-5 sm:mt-6">
          <h1 className="max-w-4xl text-[28px] font-black leading-[1.1] tracking-tight text-ink sm:text-[40px]">
            {tour.headline}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-neutral-500">
            <MapPinIcon className="h-4 w-4" />
            {tour.region}
          </p>
        </header>

        <PhotoGallery images={heroImages} name={tour.name} credit={tour.imageCredit} />

        <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div className="min-w-0 space-y-6 sm:space-y-8">
            <div className={`${card} lg:p-8`}>
              <p className="text-[18px] font-semibold leading-relaxed text-ink sm:text-[20px]">{tour.summary}</p>
              {tour.overview.length > 0 && (
                <div className="mt-5 space-y-4">
                  {tour.overview.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-[16px] leading-[1.75] text-neutral-700 sm:text-[17px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* On phones the facts sit right after the overview; on wide screens they live in the sidebar. */}
            {tour.quickFacts.length > 0 && <div className="lg:hidden">{quickFacts}</div>}

            {tour.sourceText && tour.sourceText.length > 0 && (
              <section aria-labelledby="full-text" className="space-y-3">
                <h2 id="full-text" className={h2}>
                  The full story
                </h2>
                <div className={card}>
                  <ReadMore>
                    <div className="space-y-6">
                      {tour.sourceText.map((section, i) => (
                        <div key={`${section.heading}-${i}`}>
                          {section.heading && <h3 className="text-[18px] font-extrabold text-ink">{section.heading}</h3>}
                          <div className={`${section.heading ? 'mt-2' : ''} space-y-4`}>
                            {section.paragraphs.map((paragraph) => (
                              <p
                                key={paragraph.slice(0, 40)}
                                className="text-[16px] leading-[1.75] text-neutral-700 sm:text-[17px]">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ReadMore>
                </div>
              </section>
            )}

            {tour.highlights.length > 0 && (
              <section aria-labelledby="highlights" className="space-y-3">
                <h2 id="highlights" className={h2}>
                  What to see
                </h2>
                <ul className={`${card} space-y-3`}>
                  {tour.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-brand" />
                      <span className="text-[16px] leading-relaxed text-neutral-700 sm:text-[17px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(tour.gettingThere.length > 0 || tour.coordinates) && (
              <section aria-labelledby="getting-there" className="space-y-3">
                <h2 id="getting-there" className={h2}>
                  Getting there
                </h2>
                <div className={card}>
                  {tour.gettingThere.length > 0 && (
                    <ul className="space-y-4">
                      {tour.gettingThere.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="border-l-2 border-brand pl-4 text-[16px] leading-relaxed text-neutral-700 sm:text-[17px]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {tour.coordinates && (
                    <div className={tour.gettingThere.length > 0 ? 'mt-6' : ''}>
                      <h3 className="text-[15px] font-bold uppercase tracking-wide text-ink">Get directions</h3>
                      <div className="mt-3">
                        <DirectionsMap destination={tour.coordinates} destinationName={tour.name} />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {tour.tips.length > 0 && (
              <section aria-labelledby="tips" className="space-y-3">
                <h2 id="tips" className={h2}>
                  Visitor tips
                </h2>
                <ul className={`${card} space-y-3`}>
                  {tour.tips.map((tip) => (
                    <li
                      key={tip.slice(0, 40)}
                      className="border-l-4 border-brand bg-brand/5 px-4 py-3 text-[16px] leading-relaxed text-neutral-700 sm:px-5 sm:py-4 sm:text-[17px]">
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tour.videos && tour.videos.length > 0 && (
              <section aria-labelledby="watch" className="space-y-3">
                <h2 id="watch" className={h2}>
                  Watch
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {tour.videos.map((video) => (
                    <div key={video.src}>
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={video.poster}
                        className="aspect-video w-full rounded-xl bg-black object-cover shadow-card">
                        <source src={video.src} type="video/mp4" />
                      </video>
                      {video.caption && <p className="mt-2 text-[13px] text-neutral-600">{video.caption}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {tour.quickFacts.length > 0 && <div className="hidden lg:block">{quickFacts}</div>}

            {nearbyTours.length > 0 && (
              <section aria-labelledby="nearby" className="space-y-3">
                <h2 id="nearby" className={h2}>
                  Nearby
                </h2>
                <ul className="divide-y divide-neutral-200 rounded-xl bg-white px-4 shadow-card">
                  {nearbyTours.map((item) => (
                    <li key={item.slug} className="flex items-center gap-4 py-4">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/tours/${item.slug}`}
                          className="text-[16px] font-bold leading-snug text-ink hover:text-brand">
                          {item.name}
                        </Link>
                        <p className="mt-1 text-[12px] font-bold uppercase tracking-wide text-neutral-500">{item.region}</p>
                      </div>
                      {item.image && (
                        <Link href={`/tours/${item.slug}`} className="shrink-0 overflow-hidden rounded-lg">
                          <Image src={item.image} alt="" width={96} height={64} className="h-16 w-24 object-cover" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {alsoIn.length > 0 && (
          <ScrollReveal className="mt-12 sm:mt-16">
            <section aria-labelledby="also-in" className="space-y-4">
              <h2 id="also-in" className={h2}>
                More {tour.category}
              </h2>
              <TourGrid tours={alsoIn} />
            </section>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
