'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

type GalleryLightboxProps = {
  images: string[];
  alt: string;
};

export function GalleryLightbox({ images, alt }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const directionRef = useRef<1 | -1>(1);
  const slideRef = useRef<HTMLDivElement>(null);

  const close = () => setActiveIndex(null);

  function open(index: number) {
    directionRef.current = 1;
    setActiveIndex(index);
  }

  function showPrev() {
    directionRef.current = -1;
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  function showNext() {
    directionRef.current = 1;
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }

  useEffect(() => {
    if (activeIndex === null || !slideRef.current) return;
    const dir = directionRef.current;
    gsap.fromTo(
      slideRef.current,
      { xPercent: dir * 60, opacity: 0, scale: 0.96 },
      { xPercent: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
    );
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
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

  return (
    <>
      <div className="mt-5 grid gap-4 border-4 border-flagRed bg-flagGreen/25 p-4 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => open(index)}
            aria-label={`View image ${index + 1} of ${images.length}`}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={`${alt} gallery image ${index + 1}`}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} gallery`}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/95 p-4">
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <XIcon className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          <div
            onClick={(event) => event.stopPropagation()}
            className="relative h-full max-h-[85vh] w-full max-w-4xl overflow-hidden">
            <div ref={slideRef} className="relative h-full w-full">
              <Image
                src={images[activeIndex]}
                alt={`${alt} gallery image ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[13px] font-semibold text-white/70">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
