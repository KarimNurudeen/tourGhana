'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type FestivalPhotoBrowserProps = {
  images: string[];
  name: string;
};

export function FestivalPhotoBrowser({ images, name }: FestivalPhotoBrowserProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function showPrev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="mt-7 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-4 py-4 sm:px-5">
        <h2 className="text-[20px] font-black text-ink">{name}</h2>
      </div>

      <div className="lg:grid lg:h-[65vh] lg:grid-cols-[240px_1fr]">
        <div className="order-2 flex gap-2 overflow-x-auto p-3 lg:order-1 lg:grid lg:h-full lg:auto-rows-min lg:grid-cols-2 lg:gap-2 lg:overflow-y-auto lg:overflow-x-hidden">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo ${index + 1} of ${images.length}`}
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
            src={images[activeIndex]}
            alt={`${name} photo ${activeIndex + 1}`}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 70vw, 100vw"
          />

          {images.length > 1 && (
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
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
