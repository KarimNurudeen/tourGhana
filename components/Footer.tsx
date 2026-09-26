import Link from 'next/link';
import { BrandLogo } from './BrandLogo';

const siteLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Advertise', href: '/advertise' },
  { label: 'Photo credits', href: '/credits' },
];

export function Footer() {
  return (
    <footer className="mt-10 bg-ink py-10 text-white">
      <div className="mx-auto max-w-feed px-4">
        {/* Logo beside the tagline and blurb, not stacked above them. */}
        <div className="flex items-center gap-4 sm:gap-8">
          <BrandLogo className="h-24 shrink-0 sm:h-32" plain />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-neutral-300">The Gateway to Africa</p>
            <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-neutral-400">
              Tour Ghana brings the country&rsquo;s attractions, culture and heritage, festivals,
              accommodation and licensed tour operators together in one place, across all sixteen
              regions.
            </p>
          </div>
        </div>
        <nav aria-label="From Tour Ghana" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-6">
          {siteLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-[14px] font-semibold hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-[13px] text-neutral-500">
          Copyright {new Date().getFullYear()} Tour Ghana. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
