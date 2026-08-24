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
          <h3 className="text-[28px] font-black leading-[1.1] tracking-tight text-ink">
            {lead.title}
          </h3>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <h4 className="text-[13px] font-bold uppercase tracking-wide text-flagGreen">
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
                    <span className="line-clamp-2 text-[18px] font-bold leading-snug text-ink hover:text-flagGreen">
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
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={lead.thumbnail}
                alt={lead.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
            </div>
            <span className="absolute bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-flagRed shadow-xl backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white">
              <PlayIcon className="h-6 w-6 translate-x-0.5 fill-flagRed" />
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
