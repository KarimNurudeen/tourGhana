import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { getHomepage, getTours } from '@/lib/api';
import { Tour } from '@/types/content';
import { TourCard } from './TourCard';
import { StaggerReveal } from './StaggerReveal';

export async function CategoryGrid() {
  const [{ categoryColumns }, tours] = await Promise.all([getHomepage(), getTours()]);
  const tourBySlug = new Map(tours.map((t) => [t.slug, t]));

  return (
    <section aria-label="Browse Ghana by theme">
    <StaggerReveal className="grid gap-10 lg:grid-cols-4">
      {categoryColumns.map((column) => {
        const columnTours = [column.lead, ...column.items]
          .map((story) => (story.slug ? tourBySlug.get(story.slug) : undefined))
          .filter((t): t is Tour => Boolean(t));

        return (
          <div key={column.id}>
            <Link
              href={column.href}
              className="inline-flex items-center gap-1 text-[20px] font-black uppercase leading-none tracking-tight text-flagGreen transition-opacity hover:opacity-70">
              {column.title}
              <ChevronRightIcon className="h-5 w-5" strokeWidth={2.5} />
            </Link>

            <div className="mt-4 space-y-5">
              {columnTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>
        );
      })}
    </StaggerReveal>
    </section>
  );
}
