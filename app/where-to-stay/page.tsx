import type { Metadata } from 'next';
import { getCategory, getHomepage } from '@/lib/api';
import { TourBrowser } from '@/components/TourBrowser';
import { TourGrid } from '@/components/TourGrid';

export const metadata: Metadata = {
  title: 'Where To Stay',
  description: 'Hotels, beach lodges and community guesthouses across Ghana.',
};

export default async function WhereToStayPage() {
  const [category, { forYouLead }] = await Promise.all([
    getCategory('where-to-stay'),
    getHomepage(),
  ]);
  const hotels = category?.tours ?? [];

  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-ink sm:text-[46px]">
          Where To Stay
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-600">
          {forYouLead.title}
        </p>

        <TourBrowser tours={hotels} viewLabel="View hotel" />

        <p className="mt-10 text-[13px] font-bold uppercase tracking-wide text-neutral-500">
          {hotels.length} places to stay across Ghana
        </p>
        <div className="mt-4">
          <TourGrid tours={hotels} />
        </div>
      </div>
    </main>
  );
}
