import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getRegion, getRegions } from '@/lib/api';
import { TourGrid } from '@/components/TourGrid';

type RegionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const regions = await getRegions();
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = await getRegion(slug);

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
  const region = await getRegion(slug);

  if (!region) {
    notFound();
  }

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
          <Link href="/regions" className="hover:text-flagGreen">
            Regions
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">{region.name}</span>
        </nav>

        <h1 className="mt-4 text-[38px] font-black tracking-tight text-ink sm:text-[46px]">
          {region.name}
        </h1>
        <p className="mt-3 text-[16px] text-neutral-600">
          {region.tours.length} attraction{region.tours.length === 1 ? '' : 's'} in this region.
        </p>

        <div className="mt-10">
          <TourGrid tours={region.tours} />
        </div>
      </div>
    </main>
  );
}
