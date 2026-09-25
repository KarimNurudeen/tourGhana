import { Tour } from '@/types/content';
import { tourHref } from '@/lib/tour-utils';
import { FeedCard } from './FeedCard';

type TourCardProps = {
  tour: Tour;
  lead?: boolean;
  kicker?: string;
  priority?: boolean;
};

export function TourCard({ tour, lead, kicker, priority }: TourCardProps) {
  return (
    <FeedCard
      href={tourHref(tour)}
      title={tour.name}
      image={tour.image}
      meta={tour.region}
      lead={lead}
      kicker={kicker}
      priority={priority}
    />
  );
}
