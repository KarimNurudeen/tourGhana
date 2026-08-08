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
      <p className="text-[15px] text-white/70">
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
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-flagRed text-white transition group-hover:bg-[#700000]">
                  <PlayIcon className="h-4 w-4 fill-white" />
                </span>
                {video.duration && (
                  <span className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 text-[12px] font-semibold text-white">
                    {video.duration}
                  </span>
                )}
              </div>
              <p className="mt-3 line-clamp-2 text-[16px] font-bold leading-snug text-white group-hover:text-flagGold">
                {video.title}
              </p>
              <p className="mt-1 text-[13px] text-white/60">
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
