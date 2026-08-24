import type { Metadata } from 'next';
import { getChannelVideos } from '@/lib/youtube';
import { VideoGrid } from '@/components/VideoGrid';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch the latest films from the Tour Ghana YouTube channel.',
};

export default async function VideosPage() {
  const videos = await getChannelVideos(50);

  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-ink sm:text-[46px]">
          Videos
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-600">
          The latest films from the Tour Ghana YouTube channel.
        </p>

        <div className="mt-10">
          <VideoGrid videos={videos} />
        </div>
      </div>
    </main>
  );
}
