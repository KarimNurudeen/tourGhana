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
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black shadow-lg lg:aspect-auto lg:h-full">
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
              className="z-10 object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 62vw, 100vw"
              priority
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-flagRed shadow-xl ring-1 ring-black/5 backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-white">
              <PlayIcon className="h-6 w-6 translate-x-0.5 fill-flagRed" />
            </button>
          </>
        )}
      </div>
      <figcaption className="absolute bottom-0 left-0 right-0 z-10 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 text-[13px] font-semibold text-white">
        {caption}
      </figcaption>
    </figure>
  );
}
