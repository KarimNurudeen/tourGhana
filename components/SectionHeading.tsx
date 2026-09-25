import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

type SectionHeadingProps = {
  title: string;
  href?: string;
  /** Kept for callers that used the old dark-panel styling. */
  light?: boolean;
};

export function SectionHeading({ title, href, light = false }: SectionHeadingProps) {
  const cls = `flex items-center gap-2 text-[22px] font-black leading-none tracking-tight ${
    light ? 'text-white' : 'text-ink'
  }`;
  const inner = (
    <>
      <span className="h-6 w-1.5 rounded-full bg-brand" />
      {title}
      {href && <ChevronRightIcon className="h-5 w-5 text-brand" strokeWidth={3} />}
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <h2 className={cls}>{inner}</h2>
  );
}
