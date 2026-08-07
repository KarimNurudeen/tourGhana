import { Tour } from '@/types/content';
import { TourCard } from './TourCard';

type TourGridProps = {
  tours: Tour[];
  columns?: string;
};

export function TourGrid({ tours, columns = 'sm:grid-cols-2 lg:grid-cols-4' }: TourGridProps) {
  if (tours.length === 0) {
    return (
      <p className="text-[16px] text-neutral-300">
        No attractions listed here yet.
      </p>
    );
  }

  return (
    <div className={`grid gap-8 border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md ${columns}`}>
      {tours.map((tour) => (
        <TourCard key={tour.slug} tour={tour} />
      ))}
    </div>
  );
}
