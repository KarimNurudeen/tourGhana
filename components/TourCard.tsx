import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@/types/content';
import { tourHref } from '@/lib/tour-utils';
import { ChamferedCard } from './ChamferedCard';
import { RegionTag } from './RegionTag';

type TourCardProps = {
  tour: Tour;
  sizes?: string;
};

const CATEGORY_BADGE: Record<string, string> = {
  'Forts & Castles': 'bg-ink text-white',
  'Culture & Heritage': 'bg-flagGold text-black',
  'Parks & Wildlife': 'bg-flagGreen text-white',
  'Coast & Beaches': 'bg-flagRed text-white',
  'Food & Dining': 'bg-flagGold text-black',
  Festivals: 'bg-flagRed text-white',
  'Where To Stay': 'bg-ink text-white',
};

export function TourCard({ tour, sizes = '(min-width: 1024px) 25vw, 50vw' }: TourCardProps) {
  const badgeClass = CATEGORY_BADGE[tour.category] ?? 'bg-flagGreen text-white';
  const href = tourHref(tour);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-flagGreen bg-flagGreen p-3 shadow-sm transition hover:shadow-md">
      <ChamferedCard
        cut={26}
        pointRadius={9}
        className="card-swing-hover flex h-full flex-col bg-[#0b1220] shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/40">
        <Link href={href} className="relative block aspect-[16/10] w-full overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            className="object-cover"
            sizes={sizes}
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeClass}`}>
            {tour.category}
          </span>
        </Link>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-[18px] font-bold leading-snug text-white">
            <Link href={href} className="transition-colors hover:text-flagGold">
              {tour.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-white/70">
            {tour.summary}
          </p>
          <div className="mt-auto pt-3">
            <RegionTag region={tour.region} dark />
          </div>
        </div>
      </ChamferedCard>
    </article>
  );
}
