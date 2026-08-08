import Link from 'next/link';
import Image from 'next/image';
import { photography } from '@/data/stories';
import { SectionHeading } from './SectionHeading';
import { RegionTag } from './RegionTag';
import { StaggerReveal } from './StaggerReveal';

export function Photography() {
  return (
    <section aria-labelledby="photography">
      <span id="photography" className="sr-only">
        Ghana photography
      </span>
      <SectionHeading title="Ghana in Photos" />

      <StaggerReveal className="mt-8 grid gap-8 border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md md:grid-cols-3">
        {photography.map((story) => (
          <article key={story.slug}>
            <Link href={`/tours/${story.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={story.image!}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </Link>
            <h3 className="mt-4 text-[20px] font-bold leading-snug text-white">
              <Link href={`/tours/${story.slug}`} className="hover:text-flagGold">
                {story.title}
              </Link>
            </h3>
            <RegionTag region={story.region} />
          </article>
        ))}
      </StaggerReveal>
    </section>
  );
}
