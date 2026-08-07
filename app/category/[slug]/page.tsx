import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { categories, categoryBySlug } from '@/data/tours';
import { TourGrid } from '@/components/TourGrid';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug[slug];

  if (!category) {
    return { title: 'Page not found' };
  }

  return {
    title: category.name,
    description: `Explore ${category.name.toLowerCase()} across Ghana.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryBySlug[slug];

  if (!category) {
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
          <span className="text-white">{category.name}</span>
        </nav>

        <h1 className="mt-4 text-[38px] font-black tracking-tight text-white sm:text-[46px]">
          {category.name}
        </h1>
        <p className="mt-3 text-[16px] text-neutral-300">
          {category.tours.length} attraction{category.tours.length === 1 ? '' : 's'} in this category.
        </p>

        <div className="mt-10">
          <TourGrid tours={category.tours} />
        </div>
      </div>
    </main>
  );
}
