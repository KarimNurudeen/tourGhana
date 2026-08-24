import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

type SectionHeadingProps = {
  title: string;
  href?: string;
  light?: boolean;
};

export function SectionHeading({
  title,
  href = '/',
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`border-t ${light ? 'border-white/25' : 'border-rule'}`}>
      <span className="block h-1 w-20 bg-flagRed" />
      <Link
        href={href}
        className={`mt-4 inline-flex items-center gap-1 text-[26px] font-black uppercase leading-none tracking-tight ${
          light ? 'text-white hover:text-flagGold' : 'text-flagGreen transition-opacity hover:opacity-70'}`
        }>
        {title}
        <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
