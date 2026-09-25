'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BedDoubleIcon, Building2Icon, ImagesIcon, SparklesIcon, type LucideIcon } from 'lucide-react';
import type { PhotoCategory } from '@/types/content';
import { TourPhotoBrowser } from './TourPhotoBrowser';

type Filter = { id: 'all' | PhotoCategory; label: string; icon: LucideIcon };

const FILTERS: Filter[] = [
  { id: 'all', label: 'All', icon: ImagesIcon },
  { id: 'exterior', label: 'Exterior', icon: Building2Icon },
  { id: 'rooms', label: 'Rooms', icon: BedDoubleIcon },
  { id: 'amenities', label: 'Amenities', icon: SparklesIcon },
];

// A compact gallery shouldn't turn into a wall of photos: past this many, the
// rest sit behind a "show all" button.
const INITIAL_COUNT = 12;

type PhotoGalleryProps = {
  images: string[];
  name: string;
  /** When set (hotels), adds Exterior / Rooms / Amenities filters. */
  photoCategories?: Partial<Record<string, PhotoCategory>>;
  /** Photo credit, shown small at the bottom of the card. */
  credit?: string | null;
};

/** Small thumbnails in a grid; tapping one opens the full-size viewer. */
export function PhotoGallery({ images, name, photoCategories, credit }: PhotoGalleryProps) {
  const [filter, setFilter] = useState<Filter['id']>('all');
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const categorised = photoCategories && Object.keys(photoCategories).length > 0;
  const filters = categorised
    ? FILTERS.filter((f) => f.id === 'all' || images.some((src) => photoCategories![src] === f.id))
    : [];

  const shown = filter === 'all' ? images : images.filter((src) => photoCategories?.[src] === filter);
  const visible = expanded ? shown : shown.slice(0, INITIAL_COUNT);
  const hidden = shown.length - visible.length;

  return (
    <section aria-label={`${name} photos`} className="mt-7 rounded-xl bg-white p-3 shadow-card sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-[16px] font-extrabold text-ink">
          <ImagesIcon className="h-4 w-4 text-brand" />
          Gallery
          <span className="text-[13px] font-bold text-neutral-400">{images.length}</span>
        </h2>
        {filters.length > 2 && (
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilter(f.id);
                  setExpanded(false);
                }}
                aria-pressed={filter === f.id}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-bold transition ${
                  filter === f.id ? 'bg-brand text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}>
                <f.icon className="h-3.5 w-3.5" />
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <ul
        className={
          images.length === 1
            ? 'grid max-w-xl grid-cols-1'
            : 'grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6'
        }>
        {visible.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View photo ${index + 1} of ${shown.length}`}
              className={`group relative block w-full overflow-hidden rounded-lg bg-neutral-200 ${
                images.length === 1 ? 'aspect-[16/10]' : 'aspect-[4/3]'
              }`}>
              <Image
                src={src}
                alt={`${name}, photo ${index + 1}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes={images.length === 1 ? '(min-width: 640px) 576px, 100vw' : '(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 32vw'}
              />
            </button>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-3 w-full rounded-lg bg-neutral-100 py-2.5 text-[14px] font-extrabold text-ink transition hover:bg-neutral-200">
          Show all {shown.length} photos
        </button>
      )}

      {credit && <p className="mt-3 text-[12px] text-neutral-500">{credit}</p>}

      <TourPhotoBrowser images={shown} name={name} activeIndex={openIndex} onClose={() => setOpenIndex(null)} />
    </section>
  );
}
