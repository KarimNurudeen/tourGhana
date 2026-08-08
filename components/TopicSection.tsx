import Link from 'next/link';
import Image from 'next/image';
import { TopicBlock } from '@/types/content';
import { RegionTag } from './RegionTag';
import { StaggerReveal } from './StaggerReveal';

type TopicSectionProps = {
  block: TopicBlock;
};

export function TopicSection({ block }: TopicSectionProps) {
  return (
    <section
      aria-labelledby={`${block.id}-heading`}
      className="border-t border-rule pt-5">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
        <h2
          id={`${block.id}-heading`}
          className="text-[15px] font-bold text-white">
          {block.topic}
        </h2>
        {block.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[15px] text-white hover:text-flagGold">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.55fr]">
        <div>
          <h3 className="text-[30px] font-black leading-[1.08] tracking-tight text-white">
            <Link href={`/tours/${block.lead.slug}`} className="hover:text-flagGold">
              {block.lead.title}
            </Link>
          </h3>
          <RegionTag region={block.lead.region} />

          <div className="mt-6 border-t border-rule pt-4">
            <h4 className="text-[13px] font-bold uppercase tracking-wide text-flagGreen">
              More in this section
            </h4>
            <StaggerReveal className="mt-4 grid grid-cols-3 gap-3 border-4 border-flagRed bg-flagGreen/25 p-3 backdrop-blur-md">
              {block.more.map((story) => (
                <article key={story.slug}>
                  <Link
                    href={`/tours/${story.slug}`}
                    className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Image
                      src={story.image!}
                      alt={story.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 13vw, 30vw"
                    />
                  </Link>
                  <h5 className="mt-2 line-clamp-2 text-[13px] font-bold leading-snug text-white">
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

        <figure>
          <Link href={`/tours/${block.lead.slug}`} className="relative block aspect-[16/11] w-full">
            <Image
              src={block.lead.image!}
              alt={block.lead.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 62vw, 100vw"
            />
          </Link>
        </figure>
      </div>
    </section>
  );
}
