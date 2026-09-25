import { ChevronDownIcon } from 'lucide-react';
import type { FestivalListing } from '@/types/content';

const card = 'rounded-xl bg-white shadow-card';
const h3 =
  "flex items-center gap-2 text-[18px] font-black tracking-tight text-ink before:h-5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-['']";

/** The festival calendar, month-by-month list and "more festivals", all from Strapi. */
export function FestivalList({ listings }: { listings: FestivalListing[] }) {
  const calendar = listings.filter((l) => l.listType === 'calendar');
  const monthly = listings.filter((l) => l.listType === 'monthly');
  const other = listings.filter((l) => l.listType === 'other');

  const months = Array.from(new Set(monthly.map((l) => l.month)));

  return (
    <div className="space-y-8">
      {calendar.length > 0 && (
        <section aria-label="Festival calendar" className="space-y-3">
          <h3 className={h3}>Festival calendar</h3>
          <ul className={`${card} divide-y divide-neutral-200 overflow-hidden`}>
            {calendar.map((f) => (
              <li key={`${f.month}-${f.name}`} className="flex gap-3 px-4 py-3">
                <span className="w-24 shrink-0 text-[13px] font-extrabold uppercase text-brand">{f.month}</span>
                <span className="min-w-0">
                  <span className="block text-[16px] font-extrabold text-ink">{f.name}</span>
                  {f.place && <span className="block text-[14px] text-neutral-600">{f.place}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {months.length > 0 && (
        <section aria-label="Festivals by month" className="space-y-3">
          <h3 className={h3}>Festivals by month</h3>
          <div className="space-y-2">
            {months.map((month) => (
              <details key={month} className={`group ${card}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-[16px] font-extrabold text-ink [&::-webkit-details-marker]:hidden">
                  {month}
                  <ChevronDownIcon className="h-5 w-5 text-brand transition-transform group-open:rotate-180" />
                </summary>
                <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
                  {monthly
                    .filter((f) => f.month === month)
                    .map((f) => (
                      <li key={f.name} className="px-4 py-3">
                        <p className="text-[16px] font-extrabold text-ink">{f.name}</p>
                        {f.description &&
                          f.description.split('\n\n').map((p) => (
                            <p key={p.slice(0, 40)} className="mt-1 text-[15px] leading-relaxed text-neutral-700">
                              {p}
                            </p>
                          ))}
                      </li>
                    ))}
                </ul>
              </details>
            ))}
          </div>
        </section>
      )}

      {other.length > 0 && (
        <section aria-label="More festivals" className="space-y-3">
          <h3 className={h3}>More festivals to look out for</h3>
          <ul className="flex flex-wrap gap-2">
            {other.map((f) => (
              <li key={f.name} className="rounded-full bg-white px-3 py-1.5 text-[14px] font-bold text-ink shadow-card">
                {f.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-[13px] text-neutral-500">
        Festival dates change from year to year, so confirm them locally before you plan a trip around one.
      </p>
    </div>
  );
}
