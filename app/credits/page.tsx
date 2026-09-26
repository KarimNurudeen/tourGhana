import type { Metadata } from 'next';
import { getFestivalListings, getGuidePages, getRegions, getTours } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Photo Credits',
  description: 'Who took the photographs on Tour Ghana, and under which licences they are used.',
};

type Row = { subject: string; credit: string };

export default async function CreditsPage() {
  const [tours, regions, guidePages, festivals] = await Promise.all([
    getTours(),
    getRegions(),
    getGuidePages(),
    getFestivalListings(),
  ]);

  const rows: Row[] = [];
  const add = (subject: string, credit?: string | null, image?: string | null) => {
    if (image && credit) rows.push({ subject, credit });
  };

  for (const t of tours) add(t.name, t.imageCredit, t.image);
  for (const r of regions) add(`${r.name} (region)`, r.imageCredit, r.image);
  for (const p of guidePages) {
    add(p.title, p.imageCredit, p.image);
    for (const s of p.sections) add(`${p.title}: ${s.heading}`, s.imageCredit, s.image);
  }
  for (const f of festivals) add(f.name, f.imageCredit, f.image);

  // One line per distinct (subject, credit); the same photo is reused in places.
  const seen = new Set<string>();
  const unique = rows.filter((r) => {
    const key = `${r.subject}|${r.credit}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  unique.sort((a, b) => a.subject.localeCompare(b.subject));

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 py-6 sm:px-4">
        <article className="rounded-xl bg-white p-5 shadow-card sm:p-8">
          <h1 className="text-[30px] font-black leading-tight tracking-tight text-ink sm:text-[38px]">Photo Credits</h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-neutral-700">
            Many photographs on Tour Ghana come from Wikimedia Commons and are used under the licences shown
            below (CC BY, CC BY-SA, CC0 or public domain). Thank you to the photographers who shared them. Photos
            without a credit here are Tour Ghana&rsquo;s own.
          </p>
          <ul className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
            {unique.map((r) => (
              <li key={`${r.subject}|${r.credit}`} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-6">
                <span className="text-[15px] font-bold text-ink sm:w-1/3">{r.subject}</span>
                <span className="text-[14px] text-neutral-600 sm:flex-1">{r.credit}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </main>
  );
}
