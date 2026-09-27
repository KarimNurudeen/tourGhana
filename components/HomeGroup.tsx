import Link from 'next/link';
import { CardRow } from './CardRow';
import { ChevronRightIcon } from 'lucide-react';

/** A titled sub-section inside a group, with an optional "see all" link. */
export function SubSection({
  id,
  title,
  href,
  hrefLabel = 'See all',
  children,
}: {
  id?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-label={title} className="scroll-mt-32 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[20px] font-black leading-none tracking-tight text-ink">
          <span className="h-5 w-1.5 rounded-full bg-brand" />
          {title}
        </h3>
        {href && (
          <Link
            href={href}
            className="inline-flex shrink-0 items-center text-[13px] font-extrabold uppercase tracking-wide text-brand">
            {hrefLabel} <ChevronRightIcon className="h-4 w-4" strokeWidth={3} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/** A titled section that is exactly one row of cards. */
export function RowSection({
  id,
  title,
  href,
  hrefLabel,
  blurb,
  children,
  after,
}: {
  id: string;
  title: string;
  href?: string;
  hrefLabel?: string;
  blurb?: string;
  children: React.ReactNode;
  /** Content after the card row but still inside the section, e.g. a video
   * strip — never pass this as `children`, since CardRow renders its
   * children as the <li> items of one <ul> and anything else breaks that. */
  after?: React.ReactNode;
}) {
  return (
    <SubSection id={id} title={title} href={href} hrefLabel={hrefLabel}>
      {blurb && <p className="-mt-1 text-[14px] text-neutral-600">{blurb}</p>}
      <CardRow label={title}>{children}</CardRow>
      {after}
    </SubSection>
  );
}
