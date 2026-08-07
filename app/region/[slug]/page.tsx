import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { regions, regionBySlug } from '@/data/tours';
import { TourGrid } from '@/components/TourGrid';

type RegionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = regionBySlug[slug];

  if (!region) {
    return { title: 'Page not found' };
  }

  return {
    title: region.name,
    description: `Explore attractions in ${region.name}, Ghana.`,
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = regionBySlug[slug];

  if (!region) {
    notFound();
  }

  return (
    <main id="main" className="w-full bg-black">
      <div className="mx-auto max-w-page px-4 py-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] font-semibold text-neutral-400">
          <Link href="/" className="hover:text-flagGold">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <Link href="/regions" className="hover:text-flagGold">
            Regions
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-white">{region.name}</span>
        </nav>

        <h1 className="mt-4 text-[38px] font-black tracking-tight text-white sm:text-[46px]">
          {region.name}
        </h1>
        <p className="mt-3 text-[16px] text-neutral-300">
          {region.tours.length} attraction{region.tours.length === 1 ? '' : 's'} in this region.
        </p>

        <div className="mt-10">
          <TourGrid tours={region.tours} />
        </div>
      </div>
    </main>
  );
}
