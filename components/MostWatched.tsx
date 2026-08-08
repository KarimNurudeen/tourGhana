'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayIcon } from 'lucide-react';
import type { ChannelVideo } from '@/lib/youtube';
import { SectionHeading } from './SectionHeading';
import { VideoLightbox } from './VideoLightbox';

export function MostWatched({
  lead,
  more,
}: {
  lead: ChannelVideo;
  more: ChannelVideo[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeVideo = [lead, ...more].find((video) => video.id === activeId);

  return (
    <section aria-labelledby="most-watched">
      <span id="most-watched" className="sr-only">
        Most watched films
      </span>
      <SectionHeading title="Most Watched Films" href="/videos" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.55fr]">
        <div>
          <h3 className="text-[28px] font-black leading-[1.1] tracking-tight text-white">
            {lead.title}
          </h3>

          <div className="mt-6 border-4 border-flagRed bg-flagGreen/25 p-4 backdrop-blur-md">
            <h4 className="text-[13px] font-bold uppercase tracking-wide text-white">
              Watch more
            </h4>
            <ul className="mt-4 space-y-5">
              {more.map((video) => (
                <li key={video.id} className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveId(video.id)}
                    aria-label={`Play: ${video.title}`}
                    className="min-w-0 flex-1 text-left">
                    <span className="line-clamp-2 text-[18px] font-bold leading-snug text-white hover:text-flagGold">
                      {video.title}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveId(video.id)}
                    aria-label={`Play: ${video.title}`}
                    className="shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={video.thumbnail}
                      alt=""
                      width={96}
                      height={64}
                      className="h-16 w-24 object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="relative">
          <motion.button
            type="button"
            onClick={() => setActiveId(lead.id)}
            whileTap={{ scale: 0.98 }}
            aria-label={`Play: ${lead.title}`}
            className="group block w-full text-left">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={lead.thumbnail}
                alt={lead.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
            </div>
            <span className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-flagRed text-white transition group-hover:bg-[#700000]">
              <PlayIcon className="h-6 w-6 fill-white" />
            </span>
          </motion.button>
        </figure>
      </div>

      <VideoLightbox
        youtubeId={activeVideo?.id ?? null}
        title={activeVideo?.title ?? ''}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
