'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';
import { CardRow } from './CardRow';
import { VideoLightbox } from './VideoLightbox';

export type StripVideo = {
  videoId: string;
  title: string;
  channel: string;
  tourName: string;
  tourHref: string;
};

/**
 * A compact row of videos drawn from the places in a home-page section, so
 * videos surface on the home page itself and not only on each place's own
 * page. Renders nothing when there are none.
 */
export function PlaceVideoStrip({ videos, label }: { videos: StripVideo[]; label: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  if (videos.length === 0) return null;
  const active = videos.find((v) => v.videoId === activeId);

  return (
    <div className="pt-1">
      <p className="mb-2 flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-wide text-neutral-500">
        <PlayIcon className="h-3.5 w-3.5 fill-brand text-brand" />
        Watch
      </p>
      <CardRow label={`${label} videos`}>
        {videos.map((video) => (
          <li key={video.videoId} className="w-[62vw] max-w-[230px] shrink-0 snap-start sm:w-[210px]">
            <button
              type="button"
              onClick={() => setActiveId(video.videoId)}
              aria-label={`Play: ${video.title}`}
              className="group flex h-full w-full flex-col overflow-hidden rounded-xl bg-white text-left shadow-card transition hover:shadow-md">
              <span className="relative block aspect-video w-full overflow-hidden bg-neutral-200">
                <Image
                  src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 640px) 210px, 62vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/25">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-lg">
                    <PlayIcon className="h-4 w-4 translate-x-0.5 fill-brand text-brand" />
                  </span>
                </span>
              </span>
              <span className="flex flex-1 flex-col p-3">
                <span className="line-clamp-2 text-[13px] font-extrabold leading-snug text-ink">{video.title}</span>
                <span className="mt-1 truncate text-[11px] font-bold uppercase tracking-wide text-brand">{video.tourName}</span>
              </span>
            </button>
          </li>
        ))}
      </CardRow>

      <VideoLightbox
        youtubeId={active?.videoId ?? null}
        title={active?.title ?? ''}
        tourHref={active?.tourHref}
        onClose={() => setActiveId(null)}
      />
    </div>
  );
}
