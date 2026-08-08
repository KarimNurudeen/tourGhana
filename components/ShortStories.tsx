'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { shortStories } from '@/data/stories';
import { SectionHeading } from './SectionHeading';
import { VideoLightbox } from './VideoLightbox';

export function ShortStories() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const scrollBy = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 400, behavior: 'smooth' });
  };

  const activeStory = shortStories.find((story) => story.slug === activeSlug);

  return (
    <section aria-labelledby="short-stories" className="bg-flagGreen py-14">
      <div className="mx-auto max-w-page px-4">
        <div className="flex items-end justify-between gap-6">
          <div className="flex-1">
            <span id="short-stories" className="sr-only">
              Short films
            </span>
            <SectionHeading title="Short Films" light />
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll short films left"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll short films right"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-flagRed text-white transition hover:bg-[#700000]">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {shortStories.map((story) => (
            <motion.li
              key={story.title}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative w-[240px] shrink-0 snap-start sm:w-[280px]">
              <motion.button
                type="button"
                onClick={() => setActiveSlug(story.slug)}
                whileTap={{ scale: 0.96 }}
                aria-label={`Play: ${story.title}`}
                className="group block w-full text-left">
                <div className="relative aspect-[3/5] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[17px] font-bold leading-snug text-white">
                      {story.title}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-flagRed transition group-hover:bg-[#700000]">
                        <PlayIcon className="h-3.5 w-3.5 fill-white text-white" />
                      </span>
                      <span className="text-[13px] font-semibold text-white">
                        {story.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>

      <VideoLightbox
        youtubeId={activeStory?.youtubeId ?? null}
        title={activeStory?.title ?? ''}
        tourHref={activeStory ? `/tours/${activeStory.slug}` : undefined}
        onClose={() => setActiveSlug(null)}
      />
    </section>
  );
}
