import type { Metadata } from 'next';
import { AccommodationDirectory } from '@/components/AccommodationDirectory';
import { GuideSections } from '@/components/GuideArticle';
import { TourBrowser } from '@/components/TourBrowser';
import { TourGrid } from '@/components/TourGrid';
import { getCategory, getGuidePage } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Where To Stay',
  description: 'Hotels, beach lodges and community guesthouses across Ghana.',
};

type Props = {
  searchParams: Promise<{ q?: string; region?: string; grade?: string; page?: string }>;
};

const h2 =
  "flex items-center gap-2 text-[22px] font-black tracking-tight text-ink before:h-6 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-['']";

export default async function WhereToStayPage({ searchParams }: Props) {
  const { q, region, grade, page } = await searchParams;
  const [category, intro, guide] = await Promise.all([
    getCategory('where-to-stay'),
    getGuidePage('where-to-stay'),
    getGuidePage('accommodation-guide'),
  ]);
  const hotels = category?.tours ?? [];

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed space-y-10 px-3 py-6 sm:px-4">
        <header>
          <h1 className="text-[30px] font-black tracking-tight text-ink sm:text-[38px]">Where To Stay</h1>
          {intro && (
            <div className="mt-3 max-w-3xl space-y-3 text-[16px] leading-relaxed text-neutral-700">
              {intro.sections.flatMap((s) => s.paragraphs).map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          )}
        </header>

        <section aria-label="Featured places to stay" className="space-y-3">
          <h2 className={h2}>Featured places to stay</h2>
          <TourBrowser tours={hotels} viewLabel="View hotel" />
          <div className="pt-2">
            <TourGrid tours={hotels} />
          </div>
        </section>

        {guide && (
          <section aria-label="Accommodation guide" className="space-y-3">
            <h2 className={h2}>{guide.title}</h2>
            <div className="rounded-xl bg-white p-5 shadow-card">
              <GuideSections sections={guide.sections} />
            </div>
          </section>
        )}

        <section id="directory" aria-label="Licensed accommodation directory" className="scroll-mt-32 space-y-3">
          <h2 className={h2}>Licensed accommodation directory</h2>
          <AccommodationDirectory
            basePath="/where-to-stay"
            q={q}
            region={region}
            grade={grade}
            page={Math.max(1, Number(page) || 1)}
          />
        </section>
      </div>
    </main>
  );
}
