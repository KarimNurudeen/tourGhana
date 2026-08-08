import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkIcon } from 'lucide-react';

const siteLinks = [
  { label: 'About Tour Ghana', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Accessibility Statement', href: '/accessibility' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Advertise With Us', href: '/advertise' },
];

const partnerLinks = [
  'Ghana Tourism Authority',
  'Ghana Immigration Service',
  'Ghana Museums & Monuments Board',
  'Ghana Tourism Federation',
  'Ghana Hotels Association',
  'Tour Operators Union of Ghana',
];

export function Footer() {
  return (
    <footer className="bg-flagGreen py-16 text-white">
      <div className="mx-auto max-w-page px-4">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/tour-ghana-logo.png"
              alt="Tour Ghana"
              width={744}
              height={715}
              className="h-[120px] w-auto"
            />
            <p className="mt-4 text-[17px] font-semibold text-neutral-400">
              The Gateway to Africa
            </p>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-neutral-300">
              Tour Ghana is an independent travel guide to the Republic of
              Ghana, covering attractions, culture and heritage, festivals,
              accommodation and licensed tour operators across all sixteen
              regions.
            </p>
          </div>

          <nav aria-label="From Tour Ghana">
            <h3 className="text-[14px] font-bold uppercase tracking-wide text-neutral-400">
              From Tour Ghana
            </h3>
            <ul className="mt-5 space-y-4">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] font-semibold uppercase tracking-wide hover:text-flagGold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Official partners">
            <h3 className="text-[14px] font-bold uppercase tracking-wide text-neutral-400">
              Official Partners
            </h3>
            <ul className="mt-5 space-y-4">
              {partnerLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold uppercase tracking-wide hover:text-flagGold">
                    {link}
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/20 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-neutral-300">
            Copyright {new Date().getFullYear()} Tour Ghana. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label="Tour Ghana on Twitter"
              className="transition hover:opacity-80">
              <Image src="/social-twitter.png" alt="" width={28} height={28} className="h-7 w-7" />
            </Link>
            <Link
              href="/"
              aria-label="Tour Ghana on Instagram"
              className="transition hover:opacity-80">
              <Image src="/social-instagram.png" alt="" width={28} height={28} className="h-7 w-7" />
            </Link>
            <Link
              href="/"
              aria-label="Tour Ghana on Facebook"
              className="transition hover:opacity-80">
              <Image src="/social-facebook.png" alt="" width={28} height={28} className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
