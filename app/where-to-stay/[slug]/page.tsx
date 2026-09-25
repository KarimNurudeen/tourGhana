import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRightIcon, MapPinIcon } from 'lucide-react';
import { getTour, getTours } from '@/lib/api';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { QuickFactsPanel } from '@/components/QuickFactsPanel';
import { DirectionsMap } from '@/components/DirectionsMap';
import { NearbySection } from '@/components/NearbySection';
import { PhotoGallery } from '@/components/PhotoGallery';
import { TourGrid } from '@/components/TourGrid';

type HotelPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const tours = await getTours({ category: 'Where To Stay' });
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour || tour.category !== 'Where To Stay') {
    return { title: 'Page not found' };
  }

  return {
    title: tour.name,
    description: tour.summary,
  };
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour || tour.category !== 'Where To Stay') {
    notFound();
  }

  const heroImages = Array.from(new Set([tour.image, ...tour.gallery]));

  const otherHotels = await getTours({ category: 'Where To Stay' });
  const moreHotels = otherHotels.filter((t) => t.slug !== tour.slug).slice(0, 4);

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 sm:px-4 pt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-neutral-500">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <Link href="/where-to-stay" className="hover:text-brand">
            Where To Stay
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">{tour.name}</span>
        </nav>

        <article className="mt-6 border-t border-rule pt-6">
          <p className="text-[13px] font-bold uppercase tracking-wide text-brand">
            Where To Stay
          </p>
          <h1 className="mt-3 max-w-4xl text-[30px] font-black leading-[1.08] tracking-tight text-ink sm:text-[40px]">
            {tour.headline}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-neutral-500">
            <MapPinIcon className="h-4 w-4" />
            {tour.region}
          </p>

          <PhotoGallery
            images={heroImages}
            name={tour.name}
            photoCategories={tour.photoCategories}
          />

          <div className="mt-10">
            <div className="rounded-xl bg-white p-4 shadow-card sm:p-6 lg:p-8">
              <p className="text-[18px] font-semibold leading-relaxed text-ink sm:text-[21px]">
                {tour.summary}
              </p>

              <div className="mt-8 space-y-6">
                {tour.overview.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[16px] leading-[1.75] text-neutral-700 sm:text-[18px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <QuickFactsPanel facts={tour.quickFacts} variant="grid" />
            </div>

            <ScrollReveal>
              <section aria-labelledby="getting-there" className="mt-12">
                <h2
                  id="getting-there"
                  className="flex items-center gap-2 text-[22px] font-black tracking-tight text-ink before:h-6 before:w-1.5 before:rounded-full before:bg-brand before:content-['']">
                  Getting there
                </h2>
                <div className="mt-5 grid gap-6 rounded-xl bg-white p-4 shadow-card sm:p-6 lg:p-8 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <ul className="space-y-4">
                      {tour.gettingThere.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="border-l-2 border-brand pl-4 text-[17px] leading-relaxed text-neutral-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tour.coordinates && (
                    <div>
                      <h3 className="text-[15px] font-bold uppercase tracking-wide text-ink">
                        Get directions
                      </h3>
                      <div className="mt-4">
                        <DirectionsMap
                          destination={tour.coordinates}
                          destinationName={tour.name}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section aria-labelledby="tips" className="mt-12">
                <h2
                  id="tips"
                  className="flex items-center gap-2 text-[22px] font-black tracking-tight text-ink before:h-6 before:w-1.5 before:rounded-full before:bg-brand before:content-['']">
                  Good to know
                </h2>
                <ul className="mt-5 grid gap-3 rounded-xl bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
                  {tour.tips.map((tip) => (
                    <li
                      key={tip.slice(0, 40)}
                      className="border-l-4 border-brand bg-brand/5 px-5 py-4 text-[17px] leading-relaxed text-neutral-700">
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            {tour.videos && tour.videos.length > 0 && (
              <ScrollReveal>
                <section aria-labelledby="watch" className="mt-12">
                  <h2
                    id="watch"
                    className="flex items-center gap-2 text-[22px] font-black tracking-tight text-ink before:h-6 before:w-1.5 before:rounded-full before:bg-brand before:content-['']">
                    Watch
                  </h2>
                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    {tour.videos.map((video) => (
                      <div key={video.src}>
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          poster={video.poster}
                          className="aspect-video w-full rounded-2xl bg-black object-cover shadow-lg">
                          <source src={video.src} type="video/mp4" />
                        </video>
                        <p className="mt-3 text-[13px] text-neutral-600">
                          {video.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            )}

            <div className="mt-12 space-y-8">
              <NearbySection places={tour.nearbyPlaces} mode={tour.nearbyMode} region={tour.region} layout="grid" />
            </div>
          </div>
        </article>

        {moreHotels.length > 0 && (
          <ScrollReveal className="mt-16 pb-20">
            <section aria-labelledby="more-hotels">
              <span id="more-hotels" className="sr-only">
                More places to stay
              </span>
              <SectionHeading title="More places to stay" href="/where-to-stay" />
              <div className="mt-8">
                <TourGrid tours={moreHotels} />
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
