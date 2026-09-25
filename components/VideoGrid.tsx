'use client';

import { useState } from 'react';
import type { ChannelVideo } from '@/lib/youtube';
import { FeedCard } from './FeedCard';
import { VideoLightbox } from './VideoLightbox';

function ago(iso: string): string {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function VideoGrid({ videos }: { videos: ChannelVideo[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeVideo = videos.find((video) => video.id === activeId);

  if (videos.length === 0) {
    return <p className="text-[15px] text-neutral-500">No videos found. Check back soon.</p>;
  }

  return (
    <>
      <ul className="grid gap-3 md:grid-cols-2">
        {videos.map((video) => (
          <li key={video.id}>
            <FeedCard
              onClick={() => setActiveId(video.id)}
              title={video.title}
              image={video.thumbnail}
              video={video.duration || true}
              meta={ago(video.publishedAt)}
            />
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
