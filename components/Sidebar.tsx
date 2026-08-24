import Link from 'next/link';
import Image from 'next/image';
import { getHomepage } from '@/lib/api';
import { SectionHeading } from './SectionHeading';
import { ChamferedCard } from './ChamferedCard';
import { RegionTag } from './RegionTag';

export async function Sidebar() {
  const { latestUpdates, sidebarFeature, sidebarStories } = await getHomepage();

  return (
    <aside aria-label="More from Tour Ghana" className="space-y-10">
      <article>
        <ChamferedCard
          cut={22}
          pointRadius={8}
          className="relative block aspect-[16/10] w-full">
          <Link href={`/tours/${sidebarFeature.slug}`} className="absolute inset-0">
            <Image
              src={sidebarFeature.image!}
              alt={sidebarFeature.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 320px, 100vw"
            />
          </Link>
        </ChamferedCard>
        <h3 className="mt-4 text-[24px] font-black leading-[1.12] tracking-tight text-ink">
          <Link
            href={`/tours/${sidebarFeature.slug}`}
            className="hover:text-flagGreen">
            {sidebarFeature.title}
          </Link>
        </h3>
        <RegionTag region={sidebarFeature.region} />
      </article>

      <ChamferedCard
        cut={28}
        pointRadius={10}
        className="space-y-6 border border-neutral-200 bg-white p-5 shadow-sm">
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
            <h3 className="mt-3 text-[16px] font-bold leading-snug text-ink">
              <Link href={`/tours/${story.slug}`} className="hover:text-flagGreen">
                {story.title}
              </Link>
            </h3>
            <RegionTag region={story.region} />
          </article>
        ))}
      </ChamferedCard>

      <section aria-labelledby="latest-updates">
        <span id="latest-updates" className="sr-only">
          More places to visit
        </span>
        <SectionHeading title="More Places" />
        <ChamferedCard
          cut={28}
          pointRadius={10}
          className="mt-6 space-y-6 border border-neutral-200 bg-white p-5 shadow-sm">
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
              <h3 className="mt-3 text-[16px] font-bold leading-snug text-ink">
                <Link href={`/tours/${story.slug}`} className="hover:text-flagGreen">
                  {story.title}
                </Link>
              </h3>
              <RegionTag region={story.region} />
            </article>
          ))}
        </ChamferedCard>
      </section>
    </aside>
  );
}
