import type { Metadata } from 'next';
import Link from 'next/link';
import { getRegions } from '@/lib/api';
import { StaggerReveal } from '@/components/StaggerReveal';

export const metadata: Metadata = {
  title: 'Highlights by Region',
  description: 'Browse Ghana attractions grouped by region.',
};

export default async function RegionsIndexPage() {
  const regions = await getRegions();

  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-ink sm:text-[46px]">
          Highlights by Region
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-600">
          Browse attractions across Ghana&rsquo;s regions, grouped by where they are.
        </p>

        <StaggerReveal
          as="ul"
          className="mt-10 grid gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <li key={region.slug}>
              <Link
                href={`/region/${region.slug}`}
                className="block rounded-lg border border-neutral-200 p-6 transition hover:border-flagRed hover:shadow-md">
                <h2 className="text-[22px] font-black text-flagGreen">{region.name}</h2>
                <p className="mt-2 text-[14px] text-neutral-500">
                  {region.tours.length} attraction{region.tours.length === 1 ? '' : 's'}
                </p>
              </Link>
            </li>
          ))}
        </StaggerReveal>
      </div>
    </main>
  );
}
