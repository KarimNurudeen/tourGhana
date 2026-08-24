'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

type TourPhotoBrowserProps = {
  images: string[];
  name: string;
  activeIndex: number | null;
  onClose: () => void;
};

export function TourPhotoBrowser({ images, name, activeIndex, onClose }: TourPhotoBrowserProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (activeIndex !== null) setIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    }

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  if (activeIndex === null) return null;

  function showPrev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function showNext() {
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photos`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[92vh] w-full max-w-6xl overflow-y-auto overflow-x-hidden rounded-2xl bg-white shadow-2xl lg:overflow-hidden">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 sm:px-5">
          <h2 className="text-[20px] font-black text-ink">{name}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photos"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-ink">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="lg:grid lg:h-[65vh] lg:grid-cols-[240px_1fr]">
          <div className="order-2 flex gap-2 overflow-x-auto p-3 lg:order-1 lg:grid lg:h-full lg:auto-rows-min lg:grid-cols-2 lg:gap-2 lg:overflow-y-auto lg:overflow-x-hidden">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View photo ${i + 1} of ${images.length}`}
                className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition lg:w-full ${
                  i === index ? 'ring-flagGreen' : 'ring-transparent hover:ring-neutral-300'
                }`}>
                <Image
                  src={src}
                  alt={`${name} photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 120px, 96px"
                />
              </button>
            ))}
          </div>

          <div className="relative order-1 aspect-[16/10] overflow-hidden bg-neutral-100 lg:order-2 lg:aspect-auto lg:h-full">
            <Image
              src={images[index]}
              alt={`${name} photo ${index + 1}`}
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
                {index + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
