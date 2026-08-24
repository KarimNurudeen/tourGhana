import Link from 'next/link';
import Image from 'next/image';
import { getHomepage } from '@/lib/api';
import { SectionHeading } from './SectionHeading';
import { FeaturePanel } from './FeaturePanel';
import { RegionTag } from './RegionTag';
import { StaggerReveal } from './StaggerReveal';

export async function Photography() {
  const { photography } = await getHomepage();

  return (
    <section aria-labelledby="photography">
      <span id="photography" className="sr-only">
        Ghana photography
      </span>
      <SectionHeading title="Ghana in Photos" />

      <div className="mt-8">
        <FeaturePanel>
          <StaggerReveal className="grid gap-8 p-6 md:grid-cols-3">
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
                <RegionTag region={story.region} dark />
              </article>
            ))}
          </StaggerReveal>
        </FeaturePanel>
      </div>
    </section>
  );
}
