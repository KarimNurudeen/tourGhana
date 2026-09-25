'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';
import type { ChannelVideo } from '@/lib/youtube';
import { CardRow } from './CardRow';
import { VideoLightbox } from './VideoLightbox';

/** Channel videos as a row of the same card size as everything else. */
export function VideoRow({ videos }: { videos: ChannelVideo[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = videos.find((v) => v.id === activeId);
  if (videos.length === 0) return null;

  return (
    <>
      <CardRow label="Videos">
        {videos.map((video) => (
          <li key={video.id} className="w-[72vw] max-w-[290px] shrink-0 snap-start sm:w-[250px]">
            <button
              type="button"
              onClick={() => setActiveId(video.id)}
              className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white text-left shadow-card transition hover:shadow-md">
              <span className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                <Image src={video.thumbnail} alt={video.title} fill className="object-cover" sizes="(min-width: 640px) 250px, 72vw" />
                <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/80 py-0.5 pl-0.5 pr-2 text-[12px] font-bold text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                    <PlayIcon className="h-2.5 w-2.5 translate-x-px fill-black text-black" />
                  </span>
                  {video.duration}
                </span>
              </span>
              <span className="flex flex-1 flex-col p-3.5">
                <span className="line-clamp-3 text-[16px] font-extrabold leading-snug text-ink">{video.title}</span>
              </span>
            </button>
          </li>
        ))}
      </CardRow>
      <VideoLightbox youtubeId={active?.id ?? null} title={active?.title ?? ''} onClose={() => setActiveId(null)} />
    </>
  );
}
