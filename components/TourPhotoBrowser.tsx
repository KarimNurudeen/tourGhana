'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

type TourPhotoBrowserProps = {
  images: string[];
  name: string;
  activeIndex: number | null;
  onClose: () => void;
};

/**
 * Full-screen photo viewer: a top bar, the whole photo (never cropped) in the
 * middle, and a strip of thumbnails along the bottom. Arrow keys, swipes and
 * the on-screen arrows step through; Escape or the X closes it.
 */
export function TourPhotoBrowser({ images, name, activeIndex, onClose }: TourPhotoBrowserProps) {
  const [index, setIndex] = useState(0);
  const activeThumb = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex !== null) setIndex(activeIndex);
  }, [activeIndex]);

  const open = activeIndex !== null;

  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
      if (event.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
    }

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, images.length, onClose]);

  // Keep the current thumbnail centred in the strip.
  useEffect(() => {
    if (open) activeThumb.current?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [index, open]);

  if (!open) return null;

  const showPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setIndex((i) => (i + 1) % images.length);

  const arrow =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photos`}
      className="fixed inset-0 z-[100] flex h-[100dvh] flex-col bg-neutral-950">
      <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <h2 className="min-w-0 truncate text-[17px] font-extrabold text-white sm:text-[20px]">{name}</h2>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-[14px] font-semibold tabular-nums text-white/70">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photos"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        className="relative min-h-0 flex-1"
        onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStart.current;
          touchStart.current = null;
          if (Math.abs(dx) > 50) (dx < 0 ? showNext : showPrev)();
        }}>
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${name} photo ${index + 1}`}
          fill
          priority
          className="object-contain px-2 sm:px-16"
          sizes="100vw"
        />
        {images.length > 1 && (
          <>
            <button type="button" onClick={showPrev} aria-label="Previous photo" className={`${arrow} left-3 sm:left-5`}>
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button type="button" onClick={showNext} aria-label="Next photo" className={`${arrow} right-3 sm:right-5`}>
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
          {images.map((src, i) => (
            <li key={`${src}-${i}`} className="shrink-0">
              <button
                ref={i === index ? activeThumb : undefined}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View photo ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className={`relative block h-16 w-24 overflow-hidden rounded-md ring-2 ring-offset-2 ring-offset-neutral-950 transition sm:h-[72px] sm:w-28 ${
                  i === index ? 'ring-brand' : 'opacity-60 ring-transparent hover:opacity-100'
                }`}>
                <Image src={src} alt="" fill className="object-cover" sizes="112px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
