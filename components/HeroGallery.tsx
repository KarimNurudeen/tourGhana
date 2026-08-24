'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImagesIcon } from 'lucide-react';
import { PhotoCarousel } from './PhotoCarousel';
import { TourPhotoBrowser } from './TourPhotoBrowser';

type HeroGalleryProps = {
  images: string[];
  alt: string;
};

export function HeroGallery({ images, alt }: HeroGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [main, ...sideImages] = images;

  return (
    <>
      <div className="relative mt-7 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
        <div className="grid gap-3 lg:h-[78vh] lg:grid-cols-[1.7fr_1fr]">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            aria-label="View full-size photo"
            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg lg:aspect-auto lg:h-full">
            <Image
              src={main}
              alt={alt}
              fill
              priority
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </button>

          {sideImages.length > 0 && (
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full">
              <PhotoCarousel
                images={sideImages}
                alt={alt}
                onOpen={(index) => setActiveIndex(index + 1)}
              />
            </div>
          )}
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-ink shadow-md transition hover:bg-neutral-100">
            <ImagesIcon className="h-4 w-4" />
            Show all {images.length} photos
          </button>
        )}
      </div>

      <TourPhotoBrowser
        images={images}
        name={alt}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
