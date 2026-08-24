'use client';

import { useEffect, useState } from 'react';
import { CalendarDaysIcon } from 'lucide-react';
import { FestivalTiming } from '@/types/content';

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function nextOccurrence(rule: NonNullable<FestivalTiming['rule']>, from: Date): Date {
  let year = from.getFullYear();
  for (let i = 0; i < 3; i++) {
    const candidate = nthWeekdayOfMonth(year, rule.month, rule.weekday, rule.occurrence);
    if (candidate >= stripTime(from)) return candidate;
    year += 1;
  }
  return nthWeekdayOfMonth(year, rule.month, rule.weekday, rule.occurrence);
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, occurrence: number): Date {
  const first = new Date(year, month - 1, 1);
  const firstWeekday = first.getDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  const day = 1 + offset + (occurrence - 1) * 7;
  return new Date(year, month - 1, day);
}

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildMonthGrid(year: number, month: number): (number | null)[][] {
  const first = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startWeekday = first.getDay();

  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

type FestivalCalendarProps = {
  timing: FestivalTiming;
  name: string;
};

export function FestivalCalendar({ timing, name }: FestivalCalendarProps) {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const activeMonths = new Set(timing.months);

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-flagGold px-5 py-4">
        <CalendarDaysIcon className="h-5 w-5 text-black" />
        <h2 className="text-[16px] font-black uppercase tracking-tight text-black">
          When it happens
        </h2>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
          {MONTH_LABELS.map((label, i) => {
            const active = activeMonths.has(i + 1);
            return (
              <div
                key={label}
                className={`rounded-md py-2 text-center text-[12px] font-bold uppercase tracking-wide ${
                  active ? 'bg-flagGreen text-white' : 'bg-neutral-100 text-neutral-400'
                }`}>
                {label}
              </div>
            );
          })}
        </div>

        {timing.rule && today && (
          <MonthGridPreview rule={timing.rule} today={today} name={name} />
        )}

        {timing.note && (
          <p className="mt-5 border-l-4 border-flagGold bg-flagGold/10 px-4 py-3 text-[14px] leading-relaxed text-neutral-700">
            {timing.note}
          </p>
        )}
      </div>
    </div>
  );
}

function MonthGridPreview({
  rule,
  today,
  name,
}: {
  rule: NonNullable<FestivalTiming['rule']>;
  today: Date;
  name: string;
}) {
  const next = nextOccurrence(rule, today);
  const grid = buildMonthGrid(next.getFullYear(), next.getMonth() + 1);
  const monthName = next.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const dateLabel = next.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mt-6 border-t border-rule pt-5">
      <p className="text-[13px] font-bold uppercase tracking-wide text-neutral-500">
        {monthName}
      </p>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_LABELS.map((d, i) => (
          <span key={i} className="text-[11px] font-bold uppercase text-neutral-400">
            {d}
          </span>
        ))}
        {grid.flatMap((week, wi) =>
          week.map((day, di) => {
            const isFestivalDay = day === next.getDate();
            return (
              <span
                key={`${wi}-${di}`}
                className={`flex h-8 items-center justify-center rounded-full text-[13px] ${
                  day === null
                    ? ''
                    : isFestivalDay
                    ? 'bg-flagRed font-bold text-white'
                    : 'text-neutral-600'
                }`}>
                {day ?? ''}
              </span>
            );
          })
        )}
      </div>
      <p className="mt-4 text-[15px] font-semibold text-ink">
        Next likely date: <span className="text-flagRed">{dateLabel}</span>
      </p>
      <p className="mt-1 text-[13px] text-neutral-500">
        Based on {name}’s usual pattern — confirm locally nearer the time.
      </p>
    </div>
  );
}
