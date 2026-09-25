'use client';

import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ScrollBar } from './ScrollBar';

/**
 * One horizontally scrolling row of uniform cards, with a scroll bar beneath.
 * Touch users can also swipe; on wider screens the arrows step the row.
 */
export function CardRow({ label, children }: { label: string; children: React.ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };
  const arrow =
    'absolute top-[42%] z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-black/10 hover:text-brand md:flex';

  return (
    <div>
      <div className="relative">
        <button type="button" aria-label={`Scroll ${label} left`} onClick={() => step(-1)} className={`${arrow} -left-4`}>
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <ul
          ref={track}
          aria-label={label}
          className="no-scrollbar -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-3 px-3 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0">
          {children}
        </ul>
        <button type="button" aria-label={`Scroll ${label} right`} onClick={() => step(1)} className={`${arrow} -right-4`}>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      <ScrollBar target={track} label={label} />
    </div>
  );
}
