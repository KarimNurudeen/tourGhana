import Link from 'next/link';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';

type FeedCardProps = {
  title: string;
  image?: string;
  /** Red uppercase line above the headline, e.g. "NEW". */
  kicker?: string;
  /** Grey chip with red uppercase text, e.g. the category. */
  chip?: string;
  /** Quiet line under the chip, e.g. the region. */
  meta?: string;
  href?: string;
  onClick?: () => void;
  /** Shows a play badge on the thumbnail; the string is the duration. */
  video?: string | true;
  /** Full-width image on top instead of a right-hand thumbnail. */
  lead?: boolean;
  priority?: boolean;
};

function Thumb({
  image,
  title,
  video,
  className,
  sizes,
  priority,
}: {
  image: string;
  title: string;
  video?: string | true;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <span className={`relative block shrink-0 overflow-hidden bg-neutral-200 ${className}`}>
      <Image src={image} alt={title} fill className="object-cover" sizes={sizes} priority={priority} />
      {video !== undefined && (
        <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/80 py-0.5 pl-0.5 pr-2 text-[12px] font-bold text-white">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
            <PlayIcon className="h-2.5 w-2.5 translate-x-px fill-black text-black" />
          </span>
          {video !== true && video}
        </span>
      )}
    </span>
  );
}

export function FeedCard({
  title,
  image,
  kicker,
  chip,
  meta,
  href,
  onClick,
  video,
  lead = false,
  priority,
}: FeedCardProps) {
  const text = (
    <span className="block min-w-0 flex-1">
      {kicker && (
        <span className="block text-[13px] font-extrabold uppercase tracking-wide text-brand">
          {kicker}
        </span>
      )}
      <span
        className={`block font-extrabold leading-tight text-ink ${
          lead ? 'mt-1 text-[24px]' : 'mt-1 line-clamp-3 text-[19px]'
        }`}>
        {title}
      </span>
      {chip && (
        <span className="mt-2 inline-block rounded bg-neutral-200/80 px-2 py-1 text-[12px] font-extrabold uppercase tracking-wide text-brand">
          {chip}
        </span>
      )}
      {meta && <span className="mt-1.5 block text-[13px] text-neutral-500">{meta}</span>}
    </span>
  );

  const body = lead && image ? (
    <span className="block">
      <Thumb
        image={image}
        title={title}
        video={video}
        className="aspect-[16/10] w-full"
        sizes="(min-width: 1024px) 1000px, 100vw"
        priority={priority}
      />
      <span className="block p-4">{text}</span>
    </span>
  ) : (
    <span className="flex items-start gap-3 p-4">
      {text}
      {image && (
        <Thumb
          image={image}
          title={title}
          video={video}
          className="h-[88px] w-[88px] rounded-lg sm:h-[104px] sm:w-[104px]"
          sizes="104px"
          priority={priority}
        />
      )}
    </span>
  );

  const shell =
    'block w-full overflow-hidden rounded-xl bg-white text-left shadow-card transition active:scale-[0.99] hover:shadow-md';

  return href ? (
    <Link href={href} className={shell}>
      {body}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={shell}>
      {body}
    </button>
  );
}
