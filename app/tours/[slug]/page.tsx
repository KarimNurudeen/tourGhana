import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckIcon, ChevronRightIcon, MapPinIcon } from 'lucide-react';
import { slugify, tourBySlug, tours } from '@/data/tours';
import { SectionHeading } from '@/components/SectionHeading';
import { ScrollReveal } from '@/components/ScrollReveal';
import { DirectionsMap } from '@/components/DirectionsMap';
import { GalleryLightbox } from '@/components/GalleryLightbox';
import { StaggerReveal } from '@/components/StaggerReveal';

type TourPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = tourBySlug[slug];

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
  const tour = tourBySlug[slug];

  if (!tour) {
    notFound();
  }

  const nearbyTours = tour.nearby
    .map((s) => tourBySlug[s])
    .filter((t) => t && t.slug !== tour.slug);

  const alsoIn = tours
    .filter((t) => t.category === tour.category && t.slug !== tour.slug)
    .slice(0, 4);

  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 pt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-neutral-400">
          <Link href="/" className="hover:text-flagGold">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="uppercase tracking-wide">{tour.category}</span>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-white">{tour.name}</span>
        </nav>

        <article className="mt-6 border-t border-rule pt-6">
          <p className="text-[13px] font-bold uppercase tracking-wide text-flagRed">
            {tour.category}
          </p>
          <h1 className="mt-3 max-w-4xl text-[38px] font-black leading-[1.05] tracking-tight text-white sm:text-[46px]">
            {tour.headline}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-neutral-400">
            <MapPinIcon className="h-4 w-4" />
            {tour.region}
          </p>

          <div className="mt-7 border-4 border-flagRed bg-flagGreen/25 p-3 backdrop-blur-md">
            <div className="relative aspect-[16/8] w-full overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1200px, 100vw"
                priority
              />
            </div>
          </div>
          <p className="mt-3 text-[13px] text-neutral-400">
            {tour.name}, {tour.region}
          </p>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px] xl:gap-16">
            <div>
              <div className="border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md sm:p-8">
                <p className="text-[21px] font-semibold leading-relaxed text-white">
                  {tour.summary}
                </p>

                <div className="mt-8 space-y-6">
                  {tour.overview.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-[18px] leading-[1.75] text-neutral-100">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <ScrollReveal>
                <section aria-labelledby="highlights" className="mt-12">
                  <h2
                    id="highlights"
                    className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-white">
                    What to see
                  </h2>
                  <ul className="mt-5 space-y-3 border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md">
                    {tour.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-flagGold" />
                        <span className="text-[17px] leading-relaxed text-neutral-100">
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
                    className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-white">
                    Getting there
                  </h2>
                  <div className="mt-5 border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md">
                    <ul className="space-y-4">
                      {tour.gettingThere.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="border-l-2 border-flagGold pl-4 text-[17px] leading-relaxed text-neutral-100">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <h3 className="text-[15px] font-bold uppercase tracking-wide text-white">
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
                    className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-white">
                    Visitor tips
                  </h2>
                  <ul className="mt-5 space-y-3 border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md">
                    {tour.tips.map((tip) => (
                      <li
                        key={tip.slice(0, 40)}
                        className="border-l-4 border-flagGold bg-flagGold/10 px-5 py-4 text-[17px] leading-relaxed text-neutral-200">
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
                      className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-white">
                      Watch
                    </h2>
                    <div className="mt-5 grid gap-4 border-4 border-flagRed bg-flagGreen/25 p-4 backdrop-blur-md sm:grid-cols-2">
                      {tour.videos.map((video) => (
                        <div key={video.src}>
                          <video
                            controls
                            playsInline
                            preload="metadata"
                            poster={video.poster}
                            className="aspect-video w-full border-4 border-flagRed bg-black object-cover">
                            <source src={video.src} type="video/mp4" />
                          </video>
                          <p className="mt-2 text-[13px] text-neutral-200">
                            {video.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              )}

              {tour.gallery.length > 1 && (
                <ScrollReveal>
                  <section aria-labelledby="gallery" className="mt-12">
                    <h2
                      id="gallery"
                      className="border-t border-rule pt-5 text-[24px] font-black uppercase tracking-tight text-white">
                      In pictures
                    </h2>
                    <GalleryLightbox images={tour.gallery} alt={tour.name} />
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
                    <ul className="mt-6 divide-y divide-white/15 border-4 border-flagRed bg-flagGreen/25 p-5 backdrop-blur-md">
                      {nearbyTours.map((item) => (
                        <li key={item.slug} className="flex gap-4 py-5">
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/tours/${item.slug}`}
                              className="text-[17px] font-bold leading-snug text-white hover:text-flagGold">
                              {item.name}
                            </Link>
                            <p className="mt-2 text-[12px] font-bold uppercase tracking-wide text-neutral-400">
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
              <StaggerReveal className="mt-8 grid gap-8 border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
                {alsoIn.map((item) => (
                  <article key={item.slug}>
                    <Link href={`/tours/${item.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </Link>
                    <h3 className="mt-3 text-[19px] font-bold leading-snug text-white">
                      <Link
                        href={`/tours/${item.slug}`}
                        className="hover:text-flagGold">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[12px] font-bold uppercase tracking-wide text-neutral-400">
                      {item.region}
                    </p>
                  </article>
                ))}
              </StaggerReveal>
            </section>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
