import { CategoryGrid } from '@/components/CategoryGrid';
import { ExploreStrip } from '@/components/ExploreStrip';
import { ForYou } from '@/components/ForYou';
import { Hero, type HeroSlide } from '@/components/Hero';
import { HeroBlock } from '@/components/HeroBlock';
import { MostWatched } from '@/components/MostWatched';
import { Photography } from '@/components/Photography';
import { PhotoStrip } from '@/components/PhotoStrip';
import { QuickColumns } from '@/components/QuickColumns';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ShortStories } from '@/components/ShortStories';
import { Sidebar } from '@/components/Sidebar';
import { TopicSection } from '@/components/TopicSection';
import { HERO_ACCOMMODATION_SLUGS, getHomepage, getQuiz, getTours, tourHref } from '@/lib/api';
import { getChannelVideos } from '@/lib/youtube';

export default async function Home() {
  const [channelVideos, homepage, tours, quiz] = await Promise.all([
    getChannelVideos(15),
    getHomepage(),
    getTours(),
    getQuiz(),
  ]);
  const { photoStrip, topicBlocks, historyEvents, historyFeature, mostRead, travelTips } = homepage;

  const [heroVideo, ...restVideos] = channelVideos;
  const shortFilmVideos = restVideos.slice(0, 6);
  const [mostWatchedLead, ...mostWatchedRest] = restVideos.slice(6);
  const mostWatchedMore = mostWatchedRest.slice(0, 3);

  const tourBySlug = new Map(tours.map((t) => [t.slug, t]));
  const heroSlides: HeroSlide[] = HERO_ACCOMMODATION_SLUGS.map((slug) => {
    const tour = tourBySlug.get(slug);
    if (!tour) return null;
    return {
      slug: tour.slug,
      title: tour.name,
      region: tour.region,
      image: tour.image,
      href: tourHref(tour),
    };
  }).filter((s): s is HeroSlide => s !== null);

  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 pt-8">
        <Hero slides={heroSlides} tours={tours} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px] xl:gap-16">
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
          <QuickColumns
            historyEvents={historyEvents}
            historyFeature={historyFeature}
            mostRead={mostRead}
            travelTips={travelTips}
            quizQuestions={quiz}
          />
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
