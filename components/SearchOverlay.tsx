'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchIcon, XIcon } from 'lucide-react';
import type { Tour } from '@/types/content';
import { tourHref } from '@/lib/tour-utils';
import { RegionTag } from './RegionTag';

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  tours: Tour[];
};

export function SearchOverlay({ open, onClose, tours }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? tours
        .filter((tour) =>
          [tour.name, tour.headline, tour.summary, tour.region, tour.category]
            .join(' ')
            .toLowerCase()
            .includes(trimmed)
        )
        .slice(0, 8)
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Tour Ghana"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 px-4 pb-10 pt-20 backdrop-blur-sm sm:pt-28">
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl rounded-xl border border-neutral-200 bg-white shadow-lg">
        <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
          <SearchIcon className="h-5 w-5 shrink-0 text-neutral-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search attractions, regions or categories"
            className="w-full bg-transparent text-[17px] text-ink placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 text-neutral-500 transition hover:text-flagGreen">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {trimmed === '' && (
            <p className="px-5 py-8 text-center text-[14px] text-neutral-500">
              Try &ldquo;Cape Coast&rdquo;, &ldquo;Kumasi&rdquo; or &ldquo;festivals&rdquo;.
            </p>
          )}

          {trimmed !== '' && results.length === 0 && (
            <p className="px-5 py-8 text-center text-[14px] text-neutral-500">
              No results for &ldquo;{query}&rdquo;.
            </p>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-neutral-200">
              {results.map((tour) => (
                <li key={tour.slug}>
                  <Link
                    href={tourHref(tour)}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-3 transition hover:bg-neutral-50">
                    <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={tour.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[16px] font-bold text-ink">
                        {tour.name}
                      </p>
                      <RegionTag region={tour.region} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
