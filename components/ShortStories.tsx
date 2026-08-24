'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ChannelVideo } from '@/lib/youtube';
import { SectionHeading } from './SectionHeading';
import { VideoLightbox } from './VideoLightbox';

export function ShortStories({ videos }: { videos: ChannelVideo[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const scrollBy = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 400, behavior: 'smooth' });
  };

  const activeVideo = videos.find((video) => video.id === activeId);

  if (videos.length === 0) return null;

  return (
    <section aria-labelledby="short-stories" className="bg-flagGreen py-14">
      <div className="mx-auto max-w-page px-4">
        <div className="flex items-end justify-between gap-6">
          <div className="flex-1">
            <span id="short-stories" className="sr-only">
              Short films
            </span>
            <SectionHeading title="Short Films" href="/videos" light />
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
          {videos.map((video) => (
            <motion.li
              key={video.id}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative w-[240px] shrink-0 snap-start sm:w-[280px]">
              <motion.button
                type="button"
                onClick={() => setActiveId(video.id)}
                whileTap={{ scale: 0.96 }}
                aria-label={`Play: ${video.title}`}
                className="group block w-full text-left">
                <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="line-clamp-2 text-[15px] font-bold leading-snug text-white">
                      {video.title}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-flagRed shadow-md backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white">
                        <PlayIcon className="h-3.5 w-3.5 translate-x-0.5 fill-flagRed" />
                      </span>
                      {video.duration && (
                        <span className="text-[13px] font-semibold text-white">
                          {video.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>

      <VideoLightbox
        youtubeId={activeVideo?.id ?? null}
        title={activeVideo?.title ?? ''}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
