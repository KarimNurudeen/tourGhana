'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from 'lucide-react';
import type { HistoryEvent, Story } from '@/types/content';
import type { QuizQuestion } from '@/lib/api';
import { SectionHeading } from './SectionHeading';
import { RegionTag } from './RegionTag';
import { Quiz } from './Quiz';
import { StaggerReveal } from './StaggerReveal';

type QuickColumnsProps = {
  historyEvents: HistoryEvent[];
  historyFeature: Story;
  mostRead: Story[];
  travelTips: { label: string; detail: string }[];
  quizQuestions: QuizQuestion[];
};

export function QuickColumns({
  historyEvents,
  historyFeature,
  mostRead,
  travelTips,
  quizQuestions,
}: QuickColumnsProps) {
  return (
    <section aria-label="Quick reference">
    <StaggerReveal className="grid gap-10 lg:grid-cols-4">
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <SectionHeading title="Ghana in History" />
        <Link href={`/tours/${historyFeature.slug}`} className="relative mt-6 block aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={historyFeature.image!}
            alt="Independence Arch in Accra"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 100vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            History
          </span>
        </Link>
        <h3 className="mt-4 text-[22px] font-black leading-tight tracking-tight text-ink">
          {historyFeature.title}
        </h3>
        <ul className="mt-5 space-y-5 border-l border-neutral-200 pl-4">
          {historyEvents.map((event) => (
            <li key={event.year} className="relative">
              <span className="absolute -left-[22px] top-1.5 h-2.5 w-2.5 rounded-full bg-flagRed" />
              <p className="text-[16px] font-bold text-ink">{event.year}</p>
              <p className="text-[15px] text-neutral-600">{event.text}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/history"
          className="mt-5 inline-flex items-center gap-1 border-b-2 border-flagRed text-[14px] font-bold uppercase tracking-wide text-ink hover:border-flagGold hover:text-flagGreen">
          History of Ghana <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <SectionHeading title="Most Visited" />
        <ol className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
          {mostRead.map((story, index) => (
            <li key={story.slug} className="flex gap-4 py-5">
              <span className="text-[16px] font-bold text-neutral-400">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/tours/${story.slug}`}
                  className="text-[17px] font-bold leading-snug text-ink hover:text-flagGreen">
                  {story.title}
                </Link>
                <RegionTag region={story.region} />
              </div>
              <Link href={`/tours/${story.slug}`} className="shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={story.image!}
                  alt=""
                  width={96}
                  height={64}
                  className="h-16 w-24 object-cover"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <SectionHeading title="Travel Tips" />
        <ul className="mt-6 space-y-3">
          {travelTips.map((tip) => (
            <li key={tip.label} className="border-l-4 border-flagGold bg-flagGold/10 p-4">
              <p className="text-[16px] font-bold text-ink">{tip.label}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-neutral-600">
                {tip.detail}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
          Full guidance is in{' '}
          <Link href="/travel-tips" className="font-semibold text-flagRed underline">
            Travel Tips
          </Link>{' '}
          and{' '}
          <Link href="/visas" className="font-semibold text-flagRed underline">
            Visas &amp; Diplomatic Missions
          </Link>
          .
        </p>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <Quiz questions={quizQuestions} />
      </div>
    </StaggerReveal>
    </section>
  );
}
