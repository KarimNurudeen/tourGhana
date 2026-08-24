'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Tour } from '@/types/content';
import { tourHref } from '@/lib/tour-utils';

type TourBrowserProps = {
  tours: Tour[];
  viewLabel?: string;
  groupBy?: 'region';
};

export function TourBrowser({ tours, viewLabel = 'View', groupBy = 'region' }: TourBrowserProps) {
  const groups = Array.from(new Set(tours.map((t) => t[groupBy])));
  const tabs = [{ id: 'all', label: 'All' }, ...groups.map((g) => ({ id: g, label: g }))];

  const [activeTab, setActiveTab] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered =
    activeTab === 'all' ? tours : tours.filter((t) => t[groupBy] === activeTab);
  const current = filtered[activeIndex] ?? filtered[0];

  function selectTab(id: string) {
    setActiveTab(id);
    setActiveIndex(0);
  }

  function showPrev() {
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % filtered.length);
  }

  if (tours.length === 0 || !current) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 px-4 py-3 sm:px-5">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          const icon =
            tab.id === 'all'
              ? tours[0].image
              : tours.find((t) => t[groupBy] === tab.id)?.image ?? tours[0].image;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => selectTab(tab.id)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold transition ${
                active
                  ? 'border-ink bg-ink text-white'
                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }`}>
              <span className="relative h-6 w-6 overflow-hidden rounded-full bg-neutral-100">
                <Image src={icon} alt="" fill className="object-cover" />
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="lg:grid lg:h-[70vh] lg:grid-cols-[240px_1fr]">
        <div className="order-2 flex gap-2 overflow-x-auto p-3 lg:order-1 lg:grid lg:h-full lg:auto-rows-min lg:grid-cols-2 lg:gap-2 lg:overflow-y-auto lg:overflow-x-hidden">
          {filtered.map((tour, index) => (
            <button
              key={tour.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={tour.name}
              className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition lg:w-full ${
                index === activeIndex
                  ? 'ring-flagGreen'
                  : 'ring-transparent hover:ring-neutral-300'
              }`}>
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 120px, 96px"
              />
            </button>
          ))}
        </div>

        <div className="relative order-1 aspect-[16/10] overflow-hidden bg-neutral-100 lg:order-2 lg:aspect-auto lg:h-full">
          <Image
            key={current.slug}
            src={current.image}
            alt={current.name}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 70vw, 100vw"
          />

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </>
          )}

          <Link
            href={tourHref(current)}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[13px] font-bold text-ink shadow transition hover:bg-white">
            {viewLabel}
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-white">
            <div>
              <p className="text-[15px] font-bold leading-tight">{current.name}</p>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-white/70">
                {current.region}
              </p>
            </div>
            <span className="text-[12px] font-semibold text-white/70">
              {activeIndex + 1} / {filtered.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
