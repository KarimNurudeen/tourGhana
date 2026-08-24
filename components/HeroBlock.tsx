import Link from 'next/link';
import Image from 'next/image';
import { MapPinIcon } from 'lucide-react';
import { getHomepage } from '@/lib/api';
import type { ChannelVideo } from '@/lib/youtube';
import { FeaturePanel } from './FeaturePanel';
import { RegionTag } from './RegionTag';
import { HeroVideo } from './HeroVideo';
import { StaggerReveal } from './StaggerReveal';

export async function HeroBlock({ heroVideo }: { heroVideo?: ChannelVideo }) {
  const { heroLead, heroMore } = await getHomepage();

  return (
    <section aria-labelledby="hero-topic" className="border-t border-rule pt-5">
      <span id="hero-topic" className="sr-only">
        Featured story
      </span>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.55fr]">
        <div>
          <Link
            href={`/tours/${heroLead.slug}`}
            className="group relative block min-h-[300px] overflow-hidden rounded-2xl border border-neutral-200 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <Image
              src={heroLead.image!}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

            <div className="relative flex h-full min-h-[252px] flex-col justify-between">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-flagRed px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Open to visitors
              </span>

              <div>
                <h3 className="text-[26px] font-black leading-[1.15] tracking-tight text-white transition group-hover:text-flagGold">
                  {heroLead.title}
                </h3>

                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-white/90 backdrop-blur">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {heroLead.region}
                </span>
              </div>
            </div>
          </Link>

          <div className="mt-6 border-t border-rule pt-4">
            <h4 className="text-[13px] font-bold uppercase tracking-wide text-flagGreen">
              Nearby on this route
            </h4>
            <FeaturePanel>
              <StaggerReveal className="grid grid-cols-2 gap-4 p-4">
                {heroMore.map((story) => (
                  <article key={story.slug}>
                    <Link
                      href={`/tours/${story.slug}`}
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl">
                      <Image
                        src={story.image!}
                        alt={story.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 19vw, 45vw"
                      />
                    </Link>
                    <h5 className="mt-2 line-clamp-2 text-[14px] font-bold leading-snug text-white">
                      <Link href={`/tours/${story.slug}`} className="hover:text-flagGold">
                        {story.title}
                      </Link>
                    </h5>
                    <RegionTag region={story.region} dark />
                  </article>
                ))}
              </StaggerReveal>
            </FeaturePanel>
          </div>
        </div>

        {heroVideo ? (
          <HeroVideo
            videoId={heroVideo.id}
            poster={heroVideo.thumbnail}
            caption={`WATCH: ${heroVideo.title}`}
          />
        ) : (
          <figure className="relative h-full">
            <Link href={`/tours/${heroLead.slug}`} className="block aspect-[16/9] w-full lg:aspect-auto lg:h-full">
              <div className="relative h-full w-full">
                <Image
                  src={heroLead.image!}
                  alt="Cape Coast Castle on the Ghanaian coast at sunset with fishing canoes below"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  priority
                />
              </div>
            </Link>
            <figcaption className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-3 text-[13px] font-semibold text-white">
              {heroLead.title}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
