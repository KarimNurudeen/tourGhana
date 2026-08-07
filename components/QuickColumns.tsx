'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from 'lucide-react';
import {
  historyEvents,
  historyFeature,
  mostRead,
  travelTips,
} from '@/data/stories';
import { SectionHeading } from './SectionHeading';
import { RegionTag } from './RegionTag';

const quizOptions = [
  'Cape Coast Castle',
  'Elmina Castle',
  'Fort St. Jago',
  'Fort Amsterdam',
];

export function QuickColumns() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section aria-label="Quick reference" className="grid gap-10 lg:grid-cols-4">
      <div className="border-4 border-flagRed bg-flagGreen/25 p-5 backdrop-blur-md">
        <SectionHeading title="Ghana in History" />
        <Link href={`/tours/${historyFeature.slug}`} className="relative mt-6 block aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={historyFeature.image!}
            alt="Independence Arch in Accra"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 100vw"
          />
        </Link>
        <h3 className="mt-4 text-[22px] font-black leading-tight tracking-tight text-white">
          {historyFeature.title}
        </h3>
        <ul className="mt-5 space-y-5 border-l border-white/20 pl-4">
          {historyEvents.map((event) => (
            <li key={event.year} className="relative">
              <span className="absolute -left-[22px] top-1.5 h-2.5 w-2.5 rounded-full bg-flagRed" />
              <p className="text-[16px] font-bold text-white">{event.year}</p>
              <p className="text-[15px] text-neutral-300">{event.text}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/history"
          className="mt-5 inline-flex items-center gap-1 border-b-2 border-flagRed text-[14px] font-bold uppercase tracking-wide text-white hover:border-flagGold hover:text-flagGold">
          History of Ghana <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="border-4 border-flagRed bg-flagGreen/25 p-5 backdrop-blur-md">
        <SectionHeading title="Most Visited" />
        <ol className="mt-6 divide-y divide-white/15 border-t border-white/15">
          {mostRead.map((story, index) => (
            <li key={story.slug} className="flex gap-4 py-5">
              <span className="text-[16px] font-bold text-neutral-400">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/tours/${story.slug}`}
                  className="text-[17px] font-bold leading-snug text-white hover:text-flagGold">
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

      <div className="border-4 border-flagRed bg-flagGreen/25 p-5 backdrop-blur-md">
        <SectionHeading title="Travel Tips" />
        <ul className="mt-6 space-y-3">
          {travelTips.map((tip) => (
            <li key={tip.label} className="border-l-4 border-flagGold bg-flagGold/10 p-4">
              <p className="text-[16px] font-bold text-white">{tip.label}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-neutral-300">
                {tip.detail}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-300">
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

      <div className="border-4 border-flagRed bg-flagGreen/25 p-5 backdrop-blur-md">
        <SectionHeading title="Quiz" />
        <div className="mt-6 flex items-center justify-between text-[15px] font-bold text-white">
          <span>1/10</span>
          <span>{selected ? '1 answered' : '0 answered'}</span>
        </div>
        <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl">
          <Image
            src={historyFeature.image!}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 100vw"
          />
        </div>
        <p className="mt-3 text-[13px] font-semibold uppercase tracking-wide text-flagGold">
          Forts &amp; Castles
        </p>
        <h3 className="mt-2 text-[19px] font-bold leading-snug text-white">
          Which Ghanaian fort, built in 1482, is the oldest European building
          south of the Sahara?
        </h3>
        <ul className="mt-4 space-y-2.5">
          {quizOptions.map((option) => {
            const isSelected = selected === option;
            const isCorrect = option === 'Elmina Castle';
            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => setSelected(option)}
                  aria-pressed={isSelected}
                  className={`w-full border px-4 py-3 text-left text-[16px] transition ${
                    isSelected
                      ? isCorrect
                        ? 'border-flagGreen bg-flagGreen/20 font-semibold text-white'
                        : 'border-flagRed bg-flagRed/20 font-semibold text-white'
                      : 'border-rule text-white hover:border-flagGold'}`
                  }>
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
