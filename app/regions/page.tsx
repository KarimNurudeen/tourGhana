import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getRegions } from '@/lib/api';
import { ChevronRightIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Highlights by Region',
  description: 'Browse Ghana attractions grouped by region.',
};

export default async function RegionsIndexPage() {
  const regions = await getRegions();

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 py-6 sm:px-4">
        <h1 className="text-[30px] font-black tracking-tight text-ink sm:text-[38px]">
          Highlights by Region
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-600">
          Browse attractions across Ghana&rsquo;s regions, grouped by where they are.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {regions.map((region) => (
            <li key={region.slug}>
              <Link
                href={`/region/${region.slug}`}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-card transition hover:shadow-md">
                {region.image && (
                  <span className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
                    <Image src={region.image} alt="" fill className="object-cover" sizes="112px" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[20px] font-extrabold text-ink">{region.name}</span>
                  {region.capital && (
                    <span className="mt-0.5 block text-[14px] text-neutral-500">Capital: {region.capital}</span>
                  )}
                  <span className="mt-1.5 inline-block rounded bg-neutral-200/80 px-2 py-1 text-[12px] font-extrabold uppercase tracking-wide text-brand">
                    {region.tours.length > 0
                      ? `${region.tours.length} featured place${region.tours.length === 1 ? '' : 's'}`
                      : 'Region guide'}
                  </span>
                </span>
                <ChevronRightIcon className="h-6 w-6 shrink-0 text-brand" strokeWidth={3} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
