'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, type PanInfo } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type PhotoCarouselProps = {
  images: string[];
  alt: string;
  onOpen: (index: number) => void;
};

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 350;

export function PhotoCarousel({ images, alt, onOpen }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  if (images.length === 0) return null;

  function goTo(next: number, dir: 1 | -1) {
    setDirection(dir);
    setIndex((next + images.length) % images.length);
  }

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    const passedThreshold =
      Math.abs(info.offset.x) > SWIPE_DISTANCE ||
      Math.abs(info.velocity.x) > SWIPE_VELOCITY;

    if (!passedThreshold) return;
    if (info.offset.x < 0) goTo(index + 1, 1);
    else goTo(index - 1, -1);
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-100">
      <motion.div
        key={index}
        className="absolute inset-0"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.6}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (!target.closest('button')) onOpen(index);
        }}
        initial={{ opacity: 0, x: direction * 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ cursor: images.length > 1 ? 'grab' : 'pointer' }}
        whileTap={{ cursor: images.length > 1 ? 'grabbing' : 'pointer' }}>
        <Image
          src={images[index]}
          alt={`${alt} photo ${index + 1}`}
          fill
          draggable={false}
          className="pointer-events-none object-cover"
          sizes="(min-width: 1024px) 20vw, 50vw"
        />
      </motion.div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1, -1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1, 1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60">
            <ChevronRightIcon className="h-4 w-4" />
          </button>

          <div className="pointer-events-none absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
