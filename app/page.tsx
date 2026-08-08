import { CategoryGrid } from '@/components/CategoryGrid';
import { ExploreStrip } from '@/components/ExploreStrip';
import { ForYou } from '@/components/ForYou';
import { HeroBlock } from '@/components/HeroBlock';
import { MostWatched } from '@/components/MostWatched';
import { Photography } from '@/components/Photography';
import { PhotoStrip } from '@/components/PhotoStrip';
import { QuickColumns } from '@/components/QuickColumns';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ShortStories } from '@/components/ShortStories';
import { Sidebar } from '@/components/Sidebar';
import { TopicSection } from '@/components/TopicSection';
import { photoStrip, topicBlocks } from '@/data/stories';
import { getChannelVideos } from '@/lib/youtube';

export default async function Home() {
  const channelVideos = await getChannelVideos(15);
  const [heroVideo, ...restVideos] = channelVideos;
  const shortFilmVideos = restVideos.slice(0, 6);
  const [mostWatchedLead, ...mostWatchedRest] = restVideos.slice(6);
  const mostWatchedMore = mostWatchedRest.slice(0, 3);

  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 pt-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] xl:gap-16">
          <div className="space-y-14">
            <ScrollReveal y={20}>
              <HeroBlock heroVideo={heroVideo} />
            </ScrollReveal>
            <PhotoStrip items={photoStrip} />
            {topicBlocks.map((block) => (
              <ScrollReveal key={block.id}>
                <TopicSection block={block} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <Sidebar />
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-16">
          <ExploreStrip />
        </ScrollReveal>
      </div>

      <ScrollReveal className="mt-14">
        <ShortStories videos={shortFilmVideos} />
      </ScrollReveal>

      <div className="mx-auto max-w-page space-y-16 px-4 py-16">
        {mostWatchedLead && (
          <ScrollReveal>
            <MostWatched lead={mostWatchedLead} more={mostWatchedMore} />
          </ScrollReveal>
        )}
        <ScrollReveal>
          <ForYou />
        </ScrollReveal>
        <ScrollReveal>
          <QuickColumns />
        </ScrollReveal>
        <ScrollReveal>
          <CategoryGrid />
        </ScrollReveal>
        <ScrollReveal>
          <Photography />
        </ScrollReveal>
      </div>
    </main>
  );
}
