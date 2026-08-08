'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';

type HeroVideoProps = {
  videoId: string;
  poster: string;
  caption: string;
};

export function HeroVideo({ videoId, poster, caption }: HeroVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="relative h-full">
      <div className="group relative aspect-[16/9] w-full overflow-hidden bg-black lg:aspect-auto lg:h-full">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={caption}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            <Image
              src={poster}
              alt=""
              fill
              className="z-10 object-cover"
              sizes="(min-width: 1024px) 62vw, 100vw"
              priority
            />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 z-20 flex h-16 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-flagRed/90 text-white transition group-hover:bg-flagRed">
              <PlayIcon className="h-8 w-8 fill-white" />
            </button>
          </>
        )}
      </div>
      <figcaption className="absolute bottom-0 left-0 right-0 z-10 bg-black/70 px-4 py-3 text-[13px] font-semibold text-white">
        {caption}
      </figcaption>
    </figure>
  );
}
