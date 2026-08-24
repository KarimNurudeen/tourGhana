'use client';

import Image from 'next/image';
import { StaggerReveal } from './StaggerReveal';
import { LightboxViewer, useGalleryLightbox } from './LightboxViewer';

type GalleryLightboxProps = {
  images: string[];
  alt: string;
};

export function GalleryLightbox({ images, alt }: GalleryLightboxProps) {
  const { activeIndex, directionRef, open, close, showPrev, showNext } =
    useGalleryLightbox(images.length);

  return (
    <>
      <StaggerReveal className="mt-5 grid gap-4 border-4 border-flagRed bg-flagGreen/25 p-4 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-3">
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
      </StaggerReveal>

      <LightboxViewer
        images={images}
        alt={alt}
        activeIndex={activeIndex}
        directionRef={directionRef}
        close={close}
        showPrev={showPrev}
        showNext={showNext}
      />
    </>
  );
}
