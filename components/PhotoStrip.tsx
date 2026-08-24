import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/types/content';
import { StaggerReveal } from './StaggerReveal';

type PhotoStripProps = {
  items: Story[];
};

export function PhotoStrip({ items }: PhotoStripProps) {
  return (
    <StaggerReveal className="grid grid-cols-3 gap-1.5 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm sm:grid-cols-6">
      {items.map((story) => (
        <Link
          key={story.slug}
          href={`/tours/${story.slug}`}
          aria-label={story.title}
          className="group relative block aspect-square overflow-hidden rounded-xl">
          <Image
            src={story.image!}
            alt={story.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 640px) 15vw, 33vw"
          />
        </Link>
      ))}
    </StaggerReveal>
  );
}
