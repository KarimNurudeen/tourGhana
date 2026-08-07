import type { Metadata } from 'next';
import { tours } from '@/data/tours';
import { TourGrid } from '@/components/TourGrid';

export const metadata: Metadata = {
  title: 'Top Attractions',
  description: 'Every attraction, festival and heritage site featured on Tour Ghana.',
};

export default function AttractionsPage() {
  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-white sm:text-[46px]">
          Top Attractions
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-300">
          {tours.length} attractions, festivals and heritage sites across Ghana.
        </p>

        <div className="mt-10">
          <TourGrid tours={tours} />
        </div>
      </div>
    </main>
  );
}
