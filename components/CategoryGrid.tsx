import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from 'lucide-react';
import { categoryColumns } from '@/data/stories';
import { RegionTag } from './RegionTag';
import { StaggerReveal } from './StaggerReveal';

export function CategoryGrid() {
  return (
    <section aria-label="Browse Ghana by theme">
    <StaggerReveal className="grid gap-10 lg:grid-cols-4">
      {categoryColumns.map((column) => (
        <div key={column.id} className="border-4 border-flagRed bg-flagGreen/25 p-5 backdrop-blur-md">
          <Link
            href={column.href}
            className="inline-flex items-center gap-1 text-[24px] font-black uppercase leading-none tracking-tight text-white hover:text-flagGold">
            {column.title}
            <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
          </Link>

          <article className="mt-5">
            <Link href={`/tours/${column.lead.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src={column.lead.image!}
                alt={column.lead.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 100vw"
              />
            </Link>
            <h3 className="mt-4 text-[22px] font-black leading-[1.14] tracking-tight text-white">
              <Link
                href={`/tours/${column.lead.slug}`}
                className="hover:text-flagGold">
                {column.lead.title}
              </Link>
            </h3>
            <RegionTag region={column.lead.region} />
          </article>

          <ul className="mt-5 divide-y divide-white/15 border-t border-white/15">
            {column.items.map((item) => (
              <li key={item.slug} className="py-4">
                <Link
                  href={`/tours/${item.slug}`}
                  className="text-[16px] font-semibold leading-snug text-white hover:text-flagGold">
                  {item.title}
                </Link>
                <RegionTag region={item.region} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </StaggerReveal>
    </section>
  );
}
