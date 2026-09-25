import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getRegion, getRegions } from '@/lib/api';
import { RegionText } from '@/components/RegionText';
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
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 py-6 sm:px-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] font-semibold text-neutral-500">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <Link href="/regions" className="hover:text-brand">
            Regions
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-ink">{region.name}</span>
        </nav>

        <h1 className="mt-4 text-[30px] font-black tracking-tight text-ink sm:text-[38px]">
          {region.name}
        </h1>
        <p className="mt-3 text-[16px] text-neutral-600">
          {region.capital ? `Regional capital: ${region.capital}. ` : ''}
          {region.tours.length} featured place{region.tours.length === 1 ? '' : 's'} in this region.
          {region.note ? ` ${region.note}.` : ''}
        </p>

        <div className="mt-8">
          <TourGrid tours={region.tours} />
        </div>

        <div className="mt-10">
          <RegionText
            overview={region.overview}
            attractions={region.attractions}
            festivals={region.festivals}
            wildlife={region.wildlife}
          />
        </div>
      </div>
    </main>
  );
}
