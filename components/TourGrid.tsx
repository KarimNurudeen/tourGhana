import { Tour } from '@/types/content';
import { TourCard } from './TourCard';

// Attractions first, then events and practical places.
const CATEGORY_ORDER = [
  'Forts & Castles',
  'Parks & Wildlife',
  'Culture & Heritage',
  'Coast & Beaches',
  'Festivals',
  'Food & Dining',
  'Where To Stay',
];
const rank = (category: string) => {
  const i = CATEGORY_ORDER.indexOf(category);
  return i === -1 ? CATEGORY_ORDER.length : i;
};

type TourGridProps = {
  tours: Tour[];
  columns?: string;
};

export function TourGrid({ tours, columns = 'md:grid-cols-2' }: TourGridProps) {
  if (tours.length === 0) {
    return <p className="text-[16px] text-neutral-500">No attractions listed here yet.</p>;
  }

  return (
    <div className={`grid gap-3 ${columns}`}>
      {[...tours]
        .sort((a, b) => rank(a.category) - rank(b.category))
        .map((tour) => (
        <TourCard key={tour.slug} tour={tour} />
      ))}
    </div>
  );
}
