import Link from 'next/link';
import Image from 'next/image';
import { getHomepage } from '@/lib/api';
import { SectionHeading } from './SectionHeading';
import { FeaturePanel } from './FeaturePanel';
import { RegionTag } from './RegionTag';
import { StaggerReveal } from './StaggerReveal';

export async function ForYou() {
  const { forYouGrid, forYouLead } = await getHomepage();

  return (
    <section aria-labelledby="where-to-stay">
      <span id="where-to-stay" className="sr-only">
        Where to stay
      </span>
      <SectionHeading title="Where To Stay" href="/where-to-stay" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
        <article>
          <Link href={`/where-to-stay/${forYouLead.slug}`} className="relative block aspect-[16/11] w-full">
            <Image
              src={forYouLead.image!}
              alt="Courtyard of a boutique hotel in Accra at dusk"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
          </Link>
          <h3 className="mt-4 text-[30px] font-black leading-[1.08] tracking-tight text-ink">
            <Link href={`/where-to-stay/${forYouLead.slug}`} className="hover:text-flagGreen">
              {forYouLead.title}
            </Link>
          </h3>
          <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">
            Hotels, beach lodges and community guesthouses listed by region,
            from Accra and Kumasi to the Volta shoreline and the far north.
          </p>
        </article>

        <FeaturePanel>
          <StaggerReveal className="grid gap-x-6 gap-y-8 p-6 sm:grid-cols-2">
            {forYouGrid.map((story) => (
              <article key={story.slug}>
                <Link href={`/where-to-stay/${story.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <Image
                    src={story.image!}
                    alt={story.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 28vw, 50vw"
                  />
                </Link>
                <h3 className="mt-3 text-[18px] font-bold leading-snug text-white">
                  <Link href={`/where-to-stay/${story.slug}`} className="hover:text-flagGold">
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
