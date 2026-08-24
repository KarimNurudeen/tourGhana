import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { getCategory } from '@/lib/api';
import { TourBrowser } from '@/components/TourBrowser';
import { TourGrid } from '@/components/TourGrid';

export const metadata: Metadata = {
  title: 'Festivals in Ghana',
  description: 'Durbars, chieftaincy rites and street festivals across Ghana, region by region.',
};

export default async function FestivalsPage() {
  const category = await getCategory('festivals');
  const festivals = category?.tours ?? [];

  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 py-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] font-semibold text-neutral-500">
          <Link href="/" className="hover:text-flagGreen">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">Festivals</span>
        </nav>

        <h1 className="mt-4 text-[38px] font-black tracking-tight text-ink sm:text-[46px]">
          Festivals in Ghana
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-600">
          Durbars, chieftaincy rites, harvest thanksgivings and street festivals, from the
          Ga twins ceremony in Accra to the Kobine dance in Ghana's far north.
        </p>

        <TourBrowser tours={festivals} viewLabel="View festival" />

        <p className="mt-10 text-[13px] font-bold uppercase tracking-wide text-neutral-500">
          {festivals.length} festival{festivals.length === 1 ? '' : 's'} across Ghana
        </p>
        <div className="mt-4">
          <TourGrid tours={festivals} />
        </div>
      </div>
    </main>
  );
}
