'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

export function useGalleryLightbox(length: number) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const directionRef = useRef<1 | -1>(1);

  const close = () => setActiveIndex(null);

  function open(index: number) {
    directionRef.current = 1;
    setActiveIndex(index);
  }

  function showPrev() {
    directionRef.current = -1;
    setActiveIndex((i) => (i === null ? null : (i - 1 + length) % length));
  }

  function showNext() {
    directionRef.current = 1;
    setActiveIndex((i) => (i === null ? null : (i + 1) % length));
  }

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

  return { activeIndex, directionRef, open, close, showPrev, showNext };
}

type LightboxViewerProps = {
  images: string[];
  alt: string;
  activeIndex: number | null;
  directionRef: React.RefObject<1 | -1>;
  close: () => void;
  showPrev: () => void;
  showNext: () => void;
};

export function LightboxViewer({
  images,
  alt,
  activeIndex,
  directionRef,
  close,
  showPrev,
  showNext,
}: LightboxViewerProps) {
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeIndex === null || !slideRef.current) return;
    const dir = directionRef.current ?? 1;
    gsap.fromTo(
      slideRef.current,
      { xPercent: dir * 60, opacity: 0, scale: 0.96 },
      { xPercent: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  if (activeIndex === null) return null;

  return (
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
  );
}
