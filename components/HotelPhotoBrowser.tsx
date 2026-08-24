'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  BedDoubleIcon,
  Building2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageOffIcon,
  ImagesIcon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react';
import { PhotoCategory } from '@/types/content';

type Tab = {
  id: 'all' | PhotoCategory;
  label: string;
  icon: LucideIcon;
};

const TABS: Tab[] = [
  { id: 'all', label: 'All', icon: ImagesIcon },
  { id: 'exterior', label: 'Exterior', icon: Building2Icon },
  { id: 'rooms', label: 'Rooms', icon: BedDoubleIcon },
  { id: 'amenities', label: 'Amenities', icon: SparklesIcon },
];

type HotelPhotoBrowserProps = {
  images: string[];
  name: string;
  photoCategories?: Partial<Record<string, PhotoCategory>>;
};

export function HotelPhotoBrowser({ images, name, photoCategories }: HotelPhotoBrowserProps) {
  const [activeTab, setActiveTab] = useState<Tab['id']>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  function imagesForTab(tabId: Tab['id']): string[] {
    if (tabId === 'all') return images;
    if (!photoCategories) return tabId === 'exterior' ? images : [];
    return images.filter((src) => photoCategories[src] === tabId);
  }

  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const filteredImages = imagesForTab(activeTab);

  function selectTab(id: Tab['id']) {
    setActiveTab(id);
    setActiveIndex(0);
  }

  function showPrev() {
    setActiveIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length);
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % filteredImages.length);
  }

  return (
    <div className="mt-7 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-4 py-4 sm:px-5">
        <h2 className="text-[20px] font-black text-ink">{name}</h2>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 px-4 py-3 sm:px-5">
        {TABS.map((t) => {
          const active = t.id === activeTab;
          const thumb = imagesForTab(t.id)[0];
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => selectTab(t.id)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold transition ${
                active
                  ? 'border-ink bg-ink text-white'
                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }`}>
              {thumb ? (
                <span className="relative h-6 w-6 overflow-hidden rounded-full bg-neutral-100">
                  <Image src={thumb} alt="" fill className="object-cover" />
                </span>
              ) : (
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    active ? 'bg-white/20' : 'bg-neutral-100'
                  }`}>
                  <t.icon className="h-3.5 w-3.5" />
                </span>
              )}
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="lg:grid lg:h-[70vh] lg:grid-cols-[240px_1fr]">
        {filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-16 text-center text-neutral-500 lg:col-span-2">
            <ImageOffIcon className="h-8 w-8" />
            <p className="text-[15px] font-semibold text-neutral-700">
              No {tab.label.toLowerCase()} photos yet
            </p>
            <p className="text-[13px]">
              Check back soon, or browse all photos of {name}.
            </p>
          </div>
        ) : (
          <>
            <div className="order-2 flex gap-2 overflow-x-auto p-3 lg:order-1 lg:grid lg:h-full lg:auto-rows-min lg:grid-cols-2 lg:gap-2 lg:overflow-y-auto lg:overflow-x-hidden">
              {filteredImages.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View photo ${index + 1} of ${filteredImages.length}`}
                  className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition lg:w-full ${
                    index === activeIndex
                      ? 'ring-flagGreen'
                      : 'ring-transparent hover:ring-neutral-300'
                  }`}>
                  <Image
                    src={src}
                    alt={`${name} photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 120px, 96px"
                  />
                </button>
              ))}
            </div>

            <div className="relative order-1 aspect-[16/10] overflow-hidden bg-neutral-100 lg:order-2 lg:aspect-auto lg:h-full">
              <Image
                src={filteredImages[activeIndex]}
                alt={`${name} photo ${activeIndex + 1}`}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 70vw, 100vw"
              />

              {filteredImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white">
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white">
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-[12px] font-semibold text-white">
                <span>{name}</span>
                <span>
                  {activeIndex + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
