import type { Metadata } from 'next';
import Image from 'next/image';
import { historyEvents, historyFeature } from '@/data/stories';

export const metadata: Metadata = {
  title: 'History of Ghana',
  description: 'Key moments in the history of Ghana.',
};

export default function HistoryPage() {
  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-white sm:text-[46px]">
          History of Ghana
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-300">
          {historyFeature.title}
        </p>

        {historyFeature.image && (
          <div className="relative mt-8 aspect-[16/7] w-full">
            <Image
              src={historyFeature.image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </div>
        )}

        <div className="mt-10 max-w-2xl border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md">
          <ul className="space-y-8 border-l border-white/20 pl-6">
            {historyEvents.map((event) => (
              <li key={event.year} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-flagRed" />
                <p className="text-[20px] font-bold text-white">{event.year}</p>
                <p className="mt-1 text-[16px] text-neutral-300">{event.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
