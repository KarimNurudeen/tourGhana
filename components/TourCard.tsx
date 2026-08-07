import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@/types/content';
import { RegionTag } from './RegionTag';

type TourCardProps = {
  tour: Tour;
  sizes?: string;
};

export function TourCard({ tour, sizes = '(min-width: 1024px) 25vw, 50vw' }: TourCardProps) {
  return (
    <article>
      <Link href={`/tours/${tour.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </Link>
      <h3 className="mt-3 text-[19px] font-bold leading-snug text-white">
        <Link href={`/tours/${tour.slug}`} className="hover:text-flagGold">
          {tour.name}
        </Link>
      </h3>
      <RegionTag region={tour.region} />
    </article>
  );
}
