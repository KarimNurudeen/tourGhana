'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { primaryNav, tickerLinks } from '@/data/navigation';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openDesktopSection, setOpenDesktopSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeDesktopItem = primaryNav.find((item) => item.label === openDesktopSection);

  useEffect(() => {
    if (!openDesktopSection) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopSection(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDesktopSection]);

  useEffect(() => {
    if (!panelRef.current) return;
    const isOpen = Boolean(openDesktopSection);
    gsap.to(panelRef.current, {
      rotationX: isOpen ? 0 : -100,
      autoAlpha: isOpen ? 1 : 0,
      transformPerspective: 1000,
      transformOrigin: 'top center',
      duration: isOpen ? 0.7 : 0.4,
      ease: isOpen ? 'power3.out' : 'power2.in',
    });
  }, [openDesktopSection]);

  return (
    <header className="sticky top-0 z-50 w-full bg-flagGreen text-white">
      <div className="mx-auto max-w-page px-4">
        <div className="flex items-center gap-4 py-2">
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="order-1 rounded p-1 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden">
            {mobileOpen ? (
              <XIcon className="h-8 w-8" />
            ) : (
              <MenuIcon className="h-8 w-8" />
            )}
          </button>

          <Link
            href="/"
            className="order-2 flex shrink-0 items-center gap-2 lg:order-1"
            aria-label="Tour Ghana home">
            <Image
              src="/tour-ghana-globe.png"
              alt=""
              width={272}
              height={273}
              priority
              className="h-12 w-12"
            />
            <span className="text-[24px] font-black leading-none tracking-tight text-black">
              Tour Ghana
            </span>
          </Link>

          <div
            ref={desktopNavRef}
            className="relative order-3 hidden flex-1 lg:block"
            style={{ perspective: 1000 }}>
            <nav aria-label="Primary" className="flex items-center gap-5">
              {primaryNav.map((item) =>
                item.children ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      setOpenDesktopSection((s) =>
                        s === item.label ? null : item.label
                      )
                    }
                    aria-haspopup="true"
                    aria-expanded={openDesktopSection === item.label}
                    className="flex items-center gap-1 py-3 text-[13px] font-bold tracking-wide text-white hover:text-flagGold">
                    {item.label}
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        openDesktopSection === item.label ? 'rotate-180' : ''}`
                      } />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href ?? '/'}
                    className="py-3 text-[13px] font-bold tracking-wide text-white hover:text-flagGold">
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div
              ref={panelRef}
              className="invisible absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 origin-top border-4 border-flagRed bg-flagGreen/25 opacity-0 shadow-xl backdrop-blur-md">
              <div className="grid grid-cols-3 gap-1 px-10 py-8 sm:grid-cols-4 md:grid-cols-5">
                {activeDesktopItem?.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setOpenDesktopSection(null)}
                    className="block px-4 py-2.5 text-center text-[15px] font-semibold text-white hover:bg-black/20 hover:text-flagGold">
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="order-4 ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search Tour Ghana"
              className="hover:text-flagGold">
              <SearchIcon className="h-7 w-7" />
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-6 overflow-x-auto pb-2.5 lg:flex">
          <span className="bg-flagRed px-2 py-0.5 text-[11px] font-bold tracking-widest">
            NOW
          </span>
          {tickerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-[14px] font-semibold hover:text-flagGold">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`
        }
      />

      <div
        aria-hidden={!mobileOpen}
        className={`fixed left-0 top-0 z-50 max-h-[75vh] w-72 max-w-[80vw] transform overflow-y-auto border-4 border-flagRed bg-flagGreen/25 shadow-xl backdrop-blur-md transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'}`
        }>
        <nav aria-label="Mobile" className="px-4 py-4">
          {primaryNav.map((item) => (
            <div key={item.label} className="border-b border-white/10">
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenSection((s) =>
                        s === item.label ? null : item.label
                      )
                    }
                    aria-expanded={openSection === item.label}
                    className="flex w-full items-center justify-between py-3 text-sm font-bold tracking-wide">
                    {item.label}
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${
                        openSection === item.label ? 'rotate-180' : ''}`
                      } />
                  </button>
                  {openSection === item.label && (
                    <div className="pb-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 pl-3 text-sm text-white/80">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href ?? '/'}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-bold tracking-wide">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
