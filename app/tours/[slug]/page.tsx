import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { CheckIcon, ChevronRightIcon, MapPinIcon } from 'lucide-react';
import { getTour, getTours, slugify, tourHref } from '@/lib/api';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { DirectionsMap } from '@/components/DirectionsMap';
import { GalleryLightbox } from '@/components/GalleryLightbox';
import { HeroGallery } from '@/components/HeroGallery';
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

  const heroImages = Array.from(new Set([tour.image, ...tour.gallery]));
  const morePhotos = heroImages.slice(5);

  const [nearbyResults, categoryTours] = await Promise.all([
    Promise.all(tour.nearby.map((s) => getTour(s))),
    getTours({ category: tour.category }),
  ]);
  const nearbyTours = nearbyResults.filter((t): t is NonNullable<typeof t> => t !== null && t.slug !== tour.slug);
  const alsoIn = categoryTours.filter((t) => t.slug !== tour.slug).slice(0, 4);

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
          <span className="uppercase tracking-wide">{tour.category}</span>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">{tour.name}</span>
        </nav>

        <article className="mt-6 border-t border-rule pt-6">
          <p className="text-[13px] font-bold uppercase tracking-wide text-flagRed">
            {tour.category}
          </p>
          <h1 className="mt-3 max-w-4xl text-[38px] font-black leading-[1.05] tracking-tight text-ink sm:text-[46px]">
            {tour.headline}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-neutral-500">
            <MapPinIcon className="h-4 w-4" />
            {tour.region}
          </p>

          <HeroGallery images={heroImages} alt={tour.name} />
          <p className="mt-3 text-[13px] text-neutral-500">
            {tour.name}, {tour.region}
            {tour.imageCredit && <> &middot; {tour.imageCredit}</>}
          </p>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px] xl:gap-16">
            <div>
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
                <section aria-labelledby="highlights" className="mt-12">
                  <h2
                    id="highlights"
                    className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-ink">
                    What to see
                  </h2>
                  <ul className="mt-5 space-y-3 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                    {tour.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-flagGreen" />
                        <span className="text-[17px] leading-relaxed text-neutral-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <section aria-labelledby="getting-there" className="mt-12">
                  <h2
                    id="getting-there"
                    className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-ink">
                    Getting there
                  </h2>
                  <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <ul className="space-y-4">
                      {tour.gettingThere.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="border-l-2 border-flagGold pl-4 text-[17px] leading-relaxed text-neutral-700">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
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
                    Visitor tips
                  </h2>
                  <ul className="mt-5 space-y-3 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
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

              {morePhotos.length > 0 && (
                <ScrollReveal>
                  <section aria-labelledby="gallery" className="mt-12">
                    <h2
                      id="gallery"
                      className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-ink">
                      More photos
                    </h2>
                    <GalleryLightbox images={morePhotos} alt={tour.name} />
                  </section>
                </ScrollReveal>
              )}
            </div>

            <aside className="space-y-10">
              <ScrollReveal>
                <div className="border-t-4 border-flagGold bg-flagGold p-6">
                  <h2 className="text-[20px] font-black uppercase tracking-tight text-black">
                    Quick facts
                  </h2>
                  <dl className="mt-4 divide-y divide-black/15">
                    {tour.quickFacts.map((fact) => (
                      <div key={fact.label} className="py-3">
                        <dt className="text-[12px] font-bold uppercase tracking-wide text-black/60">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-[16px] font-semibold text-black">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </ScrollReveal>

              {nearbyTours.length > 0 && (
                <ScrollReveal>
                  <section aria-labelledby="nearby">
                    <span id="nearby" className="sr-only">
                      Nearby
                    </span>
                    <SectionHeading title="Nearby" href={`/region/${slugify(tour.region)}`} />
                    <ul className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                      {nearbyTours.map((item) => (
                        <li key={item.slug} className="flex gap-4 py-5">
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/tours/${item.slug}`}
                              className="text-[17px] font-bold leading-snug text-ink hover:text-flagGreen">
                              {item.name}
                            </Link>
                            <p className="mt-2 text-[12px] font-bold uppercase tracking-wide text-neutral-500">
                              {item.region}
                            </p>
                          </div>
                          <Link href={`/tours/${item.slug}`} className="shrink-0 overflow-hidden rounded-lg">
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
            </aside>
          </div>
        </article>

        {alsoIn.length > 0 && (
          <ScrollReveal className="mt-16 pb-20">
            <section aria-labelledby="also-in">
              <span id="also-in" className="sr-only">
                More in this category
              </span>
              <SectionHeading title={`More ${tour.category}`} href={`/category/${slugify(tour.category)}`} />
              <div className="mt-8">
                <TourGrid tours={alsoIn} />
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
