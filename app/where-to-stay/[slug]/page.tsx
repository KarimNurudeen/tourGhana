import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRightIcon, MapPinIcon } from 'lucide-react';
import { getTour, getTours, slugify, tourHref } from '@/lib/api';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ChamferedCard } from '@/components/ChamferedCard';
import { DirectionsMap } from '@/components/DirectionsMap';
import { HotelPhotoBrowser } from '@/components/HotelPhotoBrowser';
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

  const [nearbyResults, otherHotels] = await Promise.all([
    Promise.all(tour.nearby.map((s) => getTour(s))),
    getTours({ category: 'Where To Stay' }),
  ]);
  const nearbyTours = nearbyResults.filter((t): t is NonNullable<typeof t> => t !== null && t.slug !== tour.slug);
  const moreHotels = otherHotels.filter((t) => t.slug !== tour.slug).slice(0, 4);

  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 pt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-neutral-500">
          <Link href="/" className="hover:text-flagGreen">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <Link href="/where-to-stay" className="hover:text-flagGreen">
            Where To Stay
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">{tour.name}</span>
        </nav>

        <article className="mt-6 border-t border-rule pt-6">
          <p className="text-[13px] font-bold uppercase tracking-wide text-flagRed">
            Where To Stay
          </p>
          <h1 className="mt-3 max-w-4xl text-[38px] font-black leading-[1.05] tracking-tight text-ink sm:text-[46px]">
            {tour.headline}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-neutral-500">
            <MapPinIcon className="h-4 w-4" />
            {tour.region}
          </p>

          <HotelPhotoBrowser
            images={heroImages}
            name={tour.name}
            photoCategories={tour.photoCategories}
          />

          <div className="mt-10">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[21px] font-semibold leading-relaxed text-ink">
                {tour.summary}
              </p>

              <div className="mt-8 space-y-6">
                {tour.overview.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[18px] leading-[1.75] text-neutral-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <ScrollReveal>
              <div className="relative mt-12 overflow-hidden rounded-2xl border border-flagGreen bg-flagGreen p-8 shadow-sm sm:p-10">
                <ChamferedCard
                  cut={56}
                  pointRadius={14}
                  className="card-swing bg-[#0b1220] px-8 py-7 shadow-[0_12px_40px_rgba(0,0,0,0.55)] ring-1 ring-black/40 sm:px-10 sm:py-8">
                  <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-white/50">
                    Quick facts
                  </h2>
                  <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
                    {tour.quickFacts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="text-[11px] font-bold uppercase tracking-wide text-white/50">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-[16px] font-semibold text-white">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </ChamferedCard>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <section aria-labelledby="getting-there" className="mt-12">
                <h2
                  id="getting-there"
                  className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-ink">
                  Getting there
                </h2>
                <div className="mt-5 grid gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <ul className="space-y-4">
                      {tour.gettingThere.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="border-l-2 border-flagGold pl-4 text-[17px] leading-relaxed text-neutral-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

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
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section aria-labelledby="tips" className="mt-12">
                <h2
                  id="tips"
                  className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-ink">
                  Good to know
                </h2>
                <ul className="mt-5 grid gap-3 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
                  {tour.tips.map((tip) => (
                    <li
                      key={tip.slice(0, 40)}
                      className="border-l-4 border-flagGold bg-flagGold/10 px-5 py-4 text-[17px] leading-relaxed text-neutral-700">
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
                    className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-ink">
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

            {nearbyTours.length > 0 && (
              <ScrollReveal>
                <section aria-labelledby="nearby" className="mt-12">
                  <span id="nearby" className="sr-only">
                    Nearby attractions
                  </span>
                  <SectionHeading
                    title="Nearby attractions"
                    href={`/region/${slugify(tour.region)}`}
                  />
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {nearbyTours.map((item) => (
                      <li
                        key={item.slug}
                        className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                        <div className="min-w-0 flex-1">
                          <Link
                            href={tourHref(item)}
                            className="text-[17px] font-bold leading-snug text-ink hover:text-flagGreen">
                            {item.name}
                          </Link>
                          <p className="mt-2 text-[12px] font-bold uppercase tracking-wide text-neutral-500">
                            {item.region}
                          </p>
                        </div>
                        <Link href={tourHref(item)} className="shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={item.image}
                            alt=""
                            width={96}
                            height={64}
                            className="h-16 w-24 object-cover"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>
            )}
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
