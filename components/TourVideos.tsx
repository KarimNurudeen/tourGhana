'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';
import type { TourVideo, YouTubeVideo } from '@/types/content';
import { CardRow } from './CardRow';
import { VideoLightbox } from './VideoLightbox';

const h2 =
  "flex items-center gap-2 text-[20px] font-black tracking-tight text-ink before:h-5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-[''] sm:text-[22px]";

/**
 * A place's videos: any MP4s uploaded to the place come first as players, then
 * the YouTube videos as a row of thumbnails that open in a viewer. Shows
 * nothing when the place has no videos.
 */
export function TourVideos({
  name,
  uploaded = [],
  youtube = [],
}: {
  name: string;
  uploaded?: TourVideo[];
  youtube?: YouTubeVideo[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  if (uploaded.length === 0 && youtube.length === 0) return null;
  const active = youtube.find((v) => v.videoId === activeId);

  return (
    <section aria-labelledby="videos" className="space-y-3">
      <h2 id="videos" className={h2}>
        Videos
        <span className="text-[13px] font-bold text-neutral-400">{uploaded.length + youtube.length}</span>
      </h2>

      {uploaded.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {uploaded.map((video) => (
            <div key={video.src}>
              <video
                controls
                playsInline
                preload="metadata"
                poster={video.poster ?? undefined}
                className="aspect-video w-full rounded-xl bg-black object-cover shadow-card">
                <source src={video.src} type="video/mp4" />
              </video>
              {video.caption && <p className="mt-2 text-[13px] text-neutral-600">{video.caption}</p>}
            </div>
          ))}
        </div>
      )}

      {youtube.length > 0 && (
        <CardRow label={`${name} videos`}>
          {youtube.map((video, index) => (
            <li key={video.videoId} className="w-[72vw] max-w-[290px] shrink-0 snap-start sm:w-[260px]">
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
                    sizes="(min-width: 640px) 260px, 72vw"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/25">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg">
                      <PlayIcon className="h-5 w-5 translate-x-0.5 fill-brand text-brand" />
                    </span>
                  </span>
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2.5 py-0.5 text-[12px] font-bold tabular-nums text-white">
                    {index + 1} / {youtube.length}
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-3.5">
                  <span className="line-clamp-2 text-[15px] font-extrabold leading-snug text-ink">{video.title}</span>
                  {video.channel && <span className="mt-1 text-[12px] text-neutral-500">{video.channel}</span>}
                </span>
              </button>
            </li>
          ))}
        </CardRow>
      )}

      <VideoLightbox youtubeId={active?.videoId ?? null} title={active?.title ?? ''} onClose={() => setActiveId(null)} />
    </section>
  );
}
