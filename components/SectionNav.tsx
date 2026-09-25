'use client';

import { useRef } from 'react';
import { ScrollBar } from './ScrollBar';

/** Sticky, scrollable list of the page's topics; each is an in-page anchor. */
export function SectionNav({ items }: { items: { label: string; id: string }[] }) {
  const list = useRef<HTMLUListElement>(null);
  return (
    <nav
      aria-label="Sections on this page"
      className="sticky top-16 z-40 -mx-3 border-b border-neutral-300 bg-surface/95 backdrop-blur sm:mx-0">
      <ul ref={list} className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-1.5 pt-2.5 sm:px-0">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              className="block rounded-full bg-white px-4 py-1.5 text-[14px] font-extrabold text-ink shadow-card hover:text-brand">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="px-3 pb-2 sm:px-0">
        <ScrollBar target={list} label="Sections" className="mt-0" />
      </div>
    </nav>
  );
}
