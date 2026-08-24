'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';
import type { ChannelVideo } from '@/lib/youtube';
import { VideoLightbox } from './VideoLightbox';

export function VideoGrid({ videos }: { videos: ChannelVideo[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeVideo = videos.find((video) => video.id === activeId);

  if (videos.length === 0) {
    return (
      <p className="text-[15px] text-neutral-500">
        No videos found. Check back soon.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <li key={video.id}>
            <button
              type="button"
              onClick={() => setActiveId(video.id)}
              aria-label={`Play: ${video.title}`}
              className="group block w-full text-left">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/25" />
                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-flagRed shadow-lg backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white">
                  <PlayIcon className="h-5 w-5 translate-x-0.5 fill-flagRed" />
                </span>
                {video.duration && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-2.5 py-0.5 text-[12px] font-semibold text-white">
                    {video.duration}
                  </span>
                )}
              </div>
              <p className="mt-3 line-clamp-2 text-[16px] font-bold leading-snug text-ink group-hover:text-flagGreen">
                {video.title}
              </p>
              <p className="mt-1 text-[13px] text-neutral-500">
                {new Date(video.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <VideoLightbox
        youtubeId={activeVideo?.id ?? null}
        title={activeVideo?.title ?? ''}
        onClose={() => setActiveId(null)}
      />
    </>
  );
}
