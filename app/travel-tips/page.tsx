import type { Metadata } from 'next';
import { GuideSections } from '@/components/GuideArticle';
import { getGuidePage } from '@/lib/api';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Travel Tips',
  description: 'Practical travel tips for visiting Ghana: getting in, money, health, etiquette and more.',
};

export default async function TravelTipsPage() {
  const [tips, facts] = await Promise.all([getGuidePage('travel-tips'), getGuidePage('travel-facts')]);
  if (!tips) notFound();

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed space-y-6 px-3 py-6 sm:px-4">
        <article className="rounded-xl bg-white p-5 shadow-card sm:p-8">
          <h1 className="text-[30px] font-black leading-tight tracking-tight text-ink sm:text-[38px]">
            {tips.title}
          </h1>
          <div className="mt-6 max-w-3xl">
            <GuideSections sections={tips.sections} />
          </div>
        </article>

        {facts && (
          <article className="rounded-xl bg-white p-5 shadow-card sm:p-8">
            <h2 className="text-[24px] font-black tracking-tight text-ink">{facts.title}</h2>
            <div className="mt-5 max-w-3xl">
              <GuideSections sections={facts.sections} />
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
