import Link from 'next/link';
import Image from 'next/image';
import { latestUpdates, sidebarFeature, sidebarStories } from '@/data/stories';
import { SectionHeading } from './SectionHeading';
import { RegionTag } from './RegionTag';

export function Sidebar() {
  return (
    <aside aria-label="More from Tour Ghana" className="space-y-10">
      <article>
        <Link href={`/tours/${sidebarFeature.slug}`} className="relative block aspect-[16/10] w-full">
          <Image
            src={sidebarFeature.image!}
            alt={sidebarFeature.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 320px, 100vw"
          />
        </Link>
        <h3 className="mt-4 text-[24px] font-black leading-[1.12] tracking-tight text-white">
          <Link
            href={`/tours/${sidebarFeature.slug}`}
            className="hover:text-flagGold">
            {sidebarFeature.title}
          </Link>
        </h3>
        <RegionTag region={sidebarFeature.region} />
      </article>

      <div className="space-y-6 border-4 border-flagRed bg-flagGreen/25 p-5 backdrop-blur-md">
        {sidebarStories.map((story) => (
          <article key={story.slug}>
            <Link
              href={`/tours/${story.slug}`}
              className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src={story.image!}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 320px, 100vw"
              />
            </Link>
            <h3 className="mt-3 text-[16px] font-bold leading-snug text-white">
              <Link href={`/tours/${story.slug}`} className="hover:text-flagGold">
                {story.title}
              </Link>
            </h3>
            <RegionTag region={story.region} />
          </article>
        ))}
      </div>

      <section aria-labelledby="latest-updates">
        <span id="latest-updates" className="sr-only">
          More places to visit
        </span>
        <SectionHeading title="More Places" />
        <div className="mt-6 space-y-6 border-4 border-flagRed bg-flagGreen/25 p-5 backdrop-blur-md">
          {latestUpdates.map((story) => (
            <article key={story.slug}>
              <Link
                href={`/tours/${story.slug}`}
                className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={story.image!}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 320px, 100vw"
                />
              </Link>
              <h3 className="mt-3 text-[16px] font-bold leading-snug text-white">
                <Link href={`/tours/${story.slug}`} className="hover:text-flagGold">
                  {story.title}
                </Link>
              </h3>
              <RegionTag region={story.region} />
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
}
