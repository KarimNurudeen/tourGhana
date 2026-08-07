'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';

type HeroVideoProps = {
  src: string;
  poster: string;
  caption: string;
};

export function HeroVideo({ src, poster, caption }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  function handlePlay() {
    const video = videoRef.current;
    if (!video) return;

    setPlaying(true);
    video
      .play()
      .then(() => setShowPoster(false))
      .catch(() => {
        // Playback was blocked or failed to start — fall back to the poster
        // rather than leaving a blank video element on screen.
        setPlaying(false);
      });
  }

  return (
    <figure className="relative h-full">
      <div className="group relative aspect-[16/9] w-full overflow-hidden bg-black lg:aspect-auto lg:h-full">
        <video
          ref={videoRef}
          controls={playing}
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          onPause={() => setPlaying(false)}>
          <source src={src} type="video/mp4" />
        </video>

        {showPoster && (
          <Image
            src={poster}
            alt=""
            fill
            className="z-10 object-cover"
            sizes="(min-width: 1024px) 62vw, 100vw"
            priority
          />
        )}

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 z-20 flex h-16 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-flagRed/90 text-white transition group-hover:bg-flagRed">
            <PlayIcon className="h-8 w-8 fill-white" />
          </button>
        )}
      </div>
      <figcaption className="absolute bottom-0 left-0 right-0 z-10 bg-black/70 px-4 py-3 text-[13px] font-semibold text-white">
        {caption}
      </figcaption>
    </figure>
  );
}
