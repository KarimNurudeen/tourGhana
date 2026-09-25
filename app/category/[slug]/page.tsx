import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getCategories, getCategory } from '@/lib/api';
import { TourGrid } from '@/components/TourGrid';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.filter((c) => c.slug !== 'festivals').map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

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
  const category = await getCategory(slug);

  if (!category) {
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
          <span className="text-ink">{category.name}</span>
        </nav>

        <h1 className="mt-4 text-[30px] font-black tracking-tight text-ink sm:text-[38px]">
          {category.name}
        </h1>
        <p className="mt-3 text-[16px] text-neutral-600">
          {category.tours.length} attraction{category.tours.length === 1 ? '' : 's'} in this category.
        </p>

        <div className="mt-10">
          <TourGrid tours={category.tours} />
        </div>
      </div>
    </main>
  );
}
