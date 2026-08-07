import type { Metadata } from 'next';
import Image from 'next/image';
import { forYouGrid, forYouLead } from '@/data/stories';
import { tourBySlug } from '@/data/tours';
import { Tour } from '@/types/content';
import { TourGrid } from '@/components/TourGrid';

export const metadata: Metadata = {
  title: 'Where To Stay',
  description: 'Hotels, beach lodges and community guesthouses across Ghana.',
};

export default function WhereToStayPage() {
  const tours: Tour[] = forYouGrid
    .map((story) => (story.slug ? tourBySlug[story.slug] : undefined))
    .filter((t): t is Tour => Boolean(t));

  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-white sm:text-[46px]">
          Where To Stay
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-300">
          {forYouLead.title}
        </p>

        {forYouLead.image && (
          <div className="relative mt-8 aspect-[16/7] w-full">
            <Image
              src={forYouLead.image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </div>
        )}

        <div className="mt-10">
          <TourGrid tours={tours} />
        </div>
      </div>
    </main>
  );
}
