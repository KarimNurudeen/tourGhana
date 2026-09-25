import Link from 'next/link';
import Image from 'next/image';
import { MapPinIcon } from 'lucide-react';

type RowCardProps = {
  title: string;
  href: string;
  image?: string;
  meta?: string;
  excerpt?: string;
  /** Text-only card (guides, regions without a photo): no picture block at all. */
  plain?: boolean;
};

/** Uniform card for a CardRow: picture (or a colour block), title, label, place. */
export function RowCard({ title, href, image, meta, excerpt, plain }: RowCardProps) {
  if (plain) {
    return (
      <li className="w-[72vw] max-w-[290px] shrink-0 snap-start sm:w-[250px]">
        <Link
          href={href}
          className="flex h-full flex-col overflow-hidden rounded-xl border-t-4 border-brand bg-white p-4 shadow-card transition hover:shadow-md active:scale-[0.99]">
          <span className="line-clamp-2 text-[18px] font-extrabold leading-snug text-ink">{title}</span>
          {excerpt && <span className="mt-2 line-clamp-5 text-[14px] leading-snug text-neutral-600">{excerpt}</span>}
          {meta && <span className="mt-auto pt-3 text-[13px] text-neutral-500">{meta}</span>}
        </Link>
      </li>
    );
  }

  return (
    <li className="w-[72vw] max-w-[290px] shrink-0 snap-start sm:w-[250px]">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition hover:shadow-md active:scale-[0.99]">
        <span className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-200">
          {image ? (
            <Image src={image} alt={title} fill className="object-cover" sizes="(min-width: 640px) 250px, 72vw" />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-brandDark">
              <MapPinIcon className="h-9 w-9 text-white/70" />
            </span>
          )}
        </span>
        <span className="flex flex-1 flex-col p-3.5">
          <span className="line-clamp-2 text-[17px] font-extrabold leading-snug text-ink">{title}</span>
          {excerpt && <span className="mt-1.5 line-clamp-3 text-[14px] leading-snug text-neutral-600">{excerpt}</span>}
          <span className="mt-auto pt-2.5">
            {meta && <span className="mt-1 block text-[13px] text-neutral-500">{meta}</span>}
          </span>
        </span>
      </Link>
    </li>
  );
}
