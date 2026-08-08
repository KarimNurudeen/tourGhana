import Link from 'next/link';
import Image from 'next/image';
import { featuredRegionLinks, heroLead, heroMore } from '@/data/stories';
import type { ChannelVideo } from '@/lib/youtube';
import { RegionTag } from './RegionTag';
import { HeroVideo } from './HeroVideo';
import { StaggerReveal } from './StaggerReveal';

export function HeroBlock({ heroVideo }: { heroVideo?: ChannelVideo }) {
  return (
    <section aria-labelledby="hero-topic" className="border-t border-rule pt-5">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
        <h2 id="hero-topic" className="text-[15px] font-bold text-white">
          Highlights by Region
        </h2>
        {featuredRegionLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-2 text-[15px] text-white hover:text-flagGold">
            {i === 0 && (
              <span className="h-2 w-2 rounded-full bg-flagRed" aria-hidden />
            )}
            {link.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.55fr]">
        <div>
          <span className="bg-flagRed px-2 py-0.5 text-[11px] font-bold tracking-widest text-white">
            OPEN TO VISITORS
          </span>
          <h3 className="mt-3 text-[30px] font-black leading-[1.08] tracking-tight text-white">
            <Link href={`/tours/${heroLead.slug}`} className="hover:text-flagGold">
              {heroLead.title}
            </Link>
          </h3>
          <RegionTag region={heroLead.region} />

          <div className="mt-6 border-t border-rule pt-4">
            <h4 className="text-[13px] font-bold uppercase tracking-wide text-flagGreen">
              Nearby on this route
            </h4>
            <StaggerReveal className="mt-4 grid grid-cols-2 gap-4 border-4 border-flagRed bg-flagGreen/25 p-4 backdrop-blur-md">
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
                  <RegionTag region={story.region} />
                </article>
              ))}
            </StaggerReveal>
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
