import { Tour } from '@/types/content';
import { TourCard } from './TourCard';
import { StaggerReveal } from './StaggerReveal';

type TourGridProps = {
  tours: Tour[];
  columns?: string;
};

export function TourGrid({ tours, columns = 'sm:grid-cols-2 lg:grid-cols-4' }: TourGridProps) {
  if (tours.length === 0) {
    return (
      <p className="text-[16px] text-neutral-500">
        No attractions listed here yet.
      </p>
    );
  }

  return (
    <StaggerReveal className={`grid gap-8 ${columns}`}>
      {tours.map((tour) => (
        <TourCard key={tour.slug} tour={tour} />
      ))}
    </StaggerReveal>
  );
}
