import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { GuideSections } from '@/components/GuideArticle';
import { getGuidePage, getGuidePages } from '@/lib/api';

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

const GROUP_LABEL: Record<string, string> = {
  visiting: 'Visiting',
  touring: 'Touring',
  events: 'Special Events',
  services: 'Services',
  about: 'About Ghana',
};

export async function generateStaticParams() {
  const pages = await getGuidePages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getGuidePage(slug);
  if (!page) return { title: 'Page not found' };
  const first = page.sections[0]?.paragraphs[0];
  return { title: page.title, description: first ? first.slice(0, 160) : undefined };
}

export default async function GuidePageRoute({ params }: GuidePageProps) {
  const { slug } = await params;
  const page = await getGuidePage(slug);
  if (!page) notFound();

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed px-3 py-6 sm:px-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-semibold text-neutral-500">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span>{GROUP_LABEL[page.group] ?? 'Guide'}</span>
        </nav>

        <article className="mt-4 rounded-xl bg-white p-5 shadow-card sm:p-8">
          <h1 className="text-[30px] font-black leading-tight tracking-tight text-ink sm:text-[38px]">
            {page.title}
          </h1>
          {page.intro && <p className="mt-3 text-[17px] text-neutral-600">{page.intro}</p>}
          <div className="mt-6 max-w-3xl">
            <GuideSections sections={page.sections} />
          </div>
        </article>
      </div>
    </main>
  );
}
