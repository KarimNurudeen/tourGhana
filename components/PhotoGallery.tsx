'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BedDoubleIcon, Building2Icon, ImagesIcon, SparklesIcon, type LucideIcon } from 'lucide-react';
import type { PhotoCategory } from '@/types/content';
import { CardRow } from './CardRow';
import { TourPhotoBrowser } from './TourPhotoBrowser';

type Filter = { id: 'all' | PhotoCategory; label: string; icon: LucideIcon };

const FILTERS: Filter[] = [
  { id: 'all', label: 'All', icon: ImagesIcon },
  { id: 'exterior', label: 'Exterior', icon: Building2Icon },
  { id: 'rooms', label: 'Rooms', icon: BedDoubleIcon },
  { id: 'amenities', label: 'Amenities', icon: SparklesIcon },
];

type PhotoGalleryProps = {
  images: string[];
  name: string;
  /** When set (hotels), adds Exterior / Rooms / Amenities filters. */
  photoCategories?: Partial<Record<string, PhotoCategory>>;
  /** Photo credit, shown small under the strip. */
  credit?: string | null;
};

/**
 * A scrolling strip of photos rather than a packed grid. Every photo is the
 * same size and the next one always peeks in from the edge, so it's obvious
 * there is more to scroll to however many photos a place has. A scroll bar
 * underneath shows how far along you are, each photo says "3 / 16", and a tap
 * opens the full-size viewer.
 */
export function PhotoGallery({ images, name, photoCategories, credit }: PhotoGalleryProps) {
  const [filter, setFilter] = useState<Filter['id']>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const categorised = photoCategories && Object.keys(photoCategories).length > 0;
  const filters = categorised
    ? FILTERS.filter((f) => f.id === 'all' || images.some((src) => photoCategories![src] === f.id))
    : [];

  const shown = filter === 'all' ? images : images.filter((src) => photoCategories?.[src] === filter);
  const single = shown.length === 1;

  return (
    <section aria-label={`${name} photos`} className="mt-7 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-[16px] font-extrabold text-ink">
          <ImagesIcon className="h-4 w-4 text-brand" />
          Photos
          <span className="text-[13px] font-bold text-neutral-400">{images.length}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.length > 2 &&
            filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-bold transition ${
                  filter === f.id ? 'bg-brand text-white' : 'bg-white text-neutral-700 shadow-card hover:text-brand'
                }`}>
                <f.icon className="h-3.5 w-3.5" />
                {f.label}
              </button>
            ))}
          {!single && (
            <button
              type="button"
              onClick={() => setOpenIndex(0)}
              className="rounded-full bg-white px-3 py-1 text-[13px] font-extrabold text-ink shadow-card hover:text-brand">
              View all
            </button>
          )}
        </div>
      </div>

      <CardRow label={`${name} photos`} key={filter}>
        {shown.map((src, index) => (
          <li
            key={src}
            className={`shrink-0 snap-start ${single ? 'w-full max-w-xl' : 'w-[78vw] max-w-[360px] sm:w-[340px]'}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View photo ${index + 1} of ${shown.length}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200 shadow-card">
              <Image
                src={src}
                alt={`${name}, photo ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
                sizes="(min-width: 640px) 340px, 78vw"
              />
              {!single && (
                <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2.5 py-0.5 text-[12px] font-bold tabular-nums text-white">
                  {index + 1} / {shown.length}
                </span>
              )}
            </button>
          </li>
        ))}
      </CardRow>

      {credit && <p className="text-[12px] text-neutral-500">{credit}</p>}

      <TourPhotoBrowser images={shown} name={name} activeIndex={openIndex} onClose={() => setOpenIndex(null)} />
    </section>
  );
}
