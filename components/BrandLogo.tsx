import Image from 'next/image';

/**
 * The Tour Ghana logo. The artwork is thin white lights on black, so on the
 * red bars it sits on a small black tile (like an app icon) to stay legible;
 * on dark backgrounds, like the footer, use plain={true}.
 */
export function BrandLogo({
  className = 'h-12',
  plain = false,
  priority = false,
}: {
  className?: string;
  plain?: boolean;
  priority?: boolean;
}) {
  const image = (
    <Image
      src="/logo-lights.png"
      alt="Tour Ghana"
      width={774}
      height={745}
      priority={priority}
      className={`${className} w-auto`}
    />
  );
  if (plain) return image;
  return <span className="inline-flex rounded-xl bg-black p-1.5 shadow-md ring-1 ring-white/25">{image}</span>;
}
