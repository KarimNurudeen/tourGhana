import type { Metadata } from 'next';
import Link from 'next/link';
import { regions } from '@/data/tours';
import { StaggerReveal } from '@/components/StaggerReveal';

export const metadata: Metadata = {
  title: 'Highlights by Region',
  description: 'Browse Ghana attractions grouped by region.',
};

export default function RegionsIndexPage() {
  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-white sm:text-[46px]">
          Highlights by Region
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-300">
          Browse attractions across Ghana&rsquo;s regions, grouped by where they are.
        </p>

        <StaggerReveal
          as="ul"
          className="mt-10 grid gap-6 border-4 border-flagRed bg-flagGreen/25 p-6 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <li key={region.slug}>
              <Link
                href={`/region/${region.slug}`}
                className="block border border-white/20 p-6 transition hover:border-flagGold">
                <h2 className="text-[22px] font-black text-white">{region.name}</h2>
                <p className="mt-2 text-[14px] text-neutral-400">
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
