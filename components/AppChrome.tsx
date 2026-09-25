'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDownIcon,
  CirclePlayIcon,
  CompassIcon,
  EllipsisVerticalIcon,
  ListIcon,
  MapPinIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import type { LinkItem, NavItem, Tour } from '@/types/content';
import { BrandLogo } from './BrandLogo';
import { SearchOverlay } from './SearchOverlay';

const siteLinks: LinkItem[] = [
  { label: 'About Tour Ghana', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Accessibility Statement', href: '/accessibility' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Advertise With Us', href: '/advertise' },
];

const tabs = [
  { label: 'Explore', href: '/', icon: CompassIcon },
  { label: 'Regions', href: '/regions', icon: MapPinIcon },
  { label: 'Videos', href: '/videos', icon: CirclePlayIcon },
] as const;

type AppChromeProps = {
  primaryNav: NavItem[];
  tickerLinks: LinkItem[];
  tours: Tour[];
};

export function AppChrome({ primaryNav, tickerLinks, tours }: AppChromeProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    setDrawerOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand text-white shadow-md">
        <div className="mx-auto flex h-16 max-w-feed items-center justify-between px-3 sm:px-4">
          {/* Menu button and logo together on the left; search and options on the right. */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Open sections menu"
              onClick={() => setDrawerOpen(true)}
              className="rounded-full p-2 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <MenuIcon className="h-6 w-6" />
            </button>

            <Link href="/" aria-label="Tour Ghana home" className="flex items-center">
              <BrandLogo className="h-11" priority />
            </Link>
          </div>

          <div className="relative flex items-center">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <SearchIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="More options"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full p-2 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <EllipsisVerticalIcon className="h-6 w-6" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <ul className="absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-xl bg-white py-2 text-ink shadow-xl">
                  {siteLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="block px-4 py-3 text-[15px] font-semibold hover:bg-neutral-100">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </header>

      <div
        aria-hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-hidden={!drawerOpen}
        aria-label="Sections"
        className={`fixed inset-y-0 left-0 z-[70] flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex h-16 shrink-0 items-center justify-between bg-brand px-4 text-white">
          <BrandLogo className="h-10" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="rounded-full p-2 hover:bg-white/15">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto py-2">
          {primaryNav.map((item) => (
            <div key={item.label} className="border-b border-neutral-200">
              {item.children && item.children.length > 0 ? (
                <>
                  <button
                    type="button"
                    aria-expanded={openSection === item.label}
                    onClick={() => setOpenSection((s) => (s === item.label ? null : item.label))}
                    className="flex w-full items-center justify-between px-5 py-4 text-[16px] font-extrabold text-ink">
                    {item.label}
                    <ChevronDownIcon
                      className={`h-5 w-5 text-brand transition-transform ${
                        openSection === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openSection === item.label && (
                    <div className="bg-neutral-50 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-8 py-2.5 text-[15px] font-semibold text-neutral-700 hover:text-brand">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href ?? '/'} className="block px-5 py-4 text-[16px] font-extrabold text-ink">
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {tickerLinks.length > 0 && (
            <div className="px-5 py-4">
              <p className="text-[12px] font-extrabold uppercase tracking-wide text-brand">Latest</p>
              <ul className="mt-2 space-y-1">
                {tickerLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="block py-1.5 text-[15px] font-semibold text-neutral-700 hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </aside>

      <nav
        aria-label="Main tabs"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_4px_rgba(0,0,0,0.08)] lg:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-4">
          {tabs.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex flex-col items-center gap-1 py-2.5 text-[13px] font-semibold ${
                    active ? 'text-brand' : 'text-neutral-600'
                  }`}>
                  <Icon className="h-6 w-6" />
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex w-full flex-col items-center gap-1 py-2.5 text-[13px] font-semibold text-neutral-600">
              <ListIcon className="h-6 w-6" />
              Sections
            </button>
          </li>
        </ul>
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} tours={tours} />
    </>
  );
}
