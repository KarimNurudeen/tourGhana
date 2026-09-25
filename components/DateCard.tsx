import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import type { HistoryEvent } from '@/types/content';

/** A key date: the year, what happened, and where the card leads. */
export function DateCard({ event }: { event: HistoryEvent }) {
  const href = event.href ?? `/history#year-${event.year}`;
  return (
    <li className="w-[72vw] max-w-[290px] shrink-0 snap-start sm:w-[250px]">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-xl border-t-4 border-brand bg-white p-4 shadow-card transition hover:shadow-md active:scale-[0.99]">
        <span className="text-[34px] font-black leading-none tracking-tight text-brand">{event.year}</span>
        <span className="mt-3 line-clamp-4 text-[16px] font-bold leading-snug text-ink">{event.text}</span>
        <span className="mt-auto flex items-center gap-1.5 pt-4 text-[13px] font-extrabold text-neutral-600">
          <span className="min-w-0 truncate">{event.placeName ? `Visit ${event.placeName}` : 'On the timeline'}</span>
          <ArrowRightIcon className="h-4 w-4 shrink-0 text-brand" strokeWidth={3} />
        </span>
      </Link>
    </li>
  );
}
