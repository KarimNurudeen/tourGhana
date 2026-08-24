'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react';
import type { Tour } from '@/types/content';
import { SearchOverlay } from './SearchOverlay';

export type HeroSlide = {
  slug: string;
  title: string;
  region: string;
  image: string;
  href: string;
};

const exploreTabs = [
  { label: 'Explore', href: '/' },
  { label: 'Attractions', href: '/attractions' },
  { label: 'Regions', href: '/regions' },
  { label: 'Where To Stay', href: '/where-to-stay' },
  { label: 'Videos', href: '/videos' },
  { label: 'Events', href: '/category/festivals' },
];

const quickTags = [
  { label: 'Forts & Castles', href: '/category/forts-castles' },
  { label: 'Beaches', href: '/category/coast-beaches' },
  { label: 'Culture & Heritage', href: '/category/culture-heritage' },
  { label: 'Wildlife', href: '/category/parks-wildlife' },
  { label: 'Festivals', href: '/category/festivals' },
  { label: 'Where To Stay', href: '/where-to-stay' },
  { label: 'Cape Coast', href: '/tours/cape-coast-castle' },
  { label: 'Kakum', href: '/tours/kakum-national-park' },
  { label: 'Elmina', href: '/tours/elmina-castle' },
  { label: 'Greater Accra', href: '/region/greater-accra' },
  { label: 'Ashanti Region', href: '/region/ashanti-region' },
  { label: 'Videos', href: '/videos' },
];

const SLIDE_INTERVAL_MS = 6000;

type HeroProps = {
  slides: HeroSlide[];
  tours: Tour[];
};

export function Hero({ slides, tours }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  function showPrev() {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % slides.length);
  }

  const active = slides[activeIndex];

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden rounded-2xl">
      <div className="relative h-[560px] w-full sm:h-[620px]">
        {slides.map((slide, index) => (
          <div
            key={slide.slug ?? index}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}>
            <Image
              src={slide.image!}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-16 text-center sm:pb-20">
          <h1
            id="hero-heading"
            className="max-w-3xl text-[32px] font-black leading-[1.1] tracking-tight text-white sm:text-[44px]">
            Discover unforgettable experiences in Ghana
          </h1>

          <nav
            aria-label="Quick sections"
            className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {exploreTabs.map((tab, index) => (
              <Link
                key={tab.label}
                href={tab.href}
                className={`rounded-full px-4 py-2 text-[14px] font-bold transition ${
                  index === 0
                    ? 'bg-white text-ink'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                {tab.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="mt-6 flex w-full max-w-xl items-center gap-3 rounded-full border border-white/30 bg-white/15 px-5 py-3.5 text-left shadow-lg backdrop-blur-md transition hover:bg-white/25">
            <SearchIcon className="h-5 w-5 shrink-0 text-white/80" />
            <span className="text-[15px] text-white/80">
              Search attractions, regions or categories
            </span>
          </button>

          <div className="mt-5 flex max-w-2xl items-center gap-2 overflow-x-auto no-scrollbar px-2">
            {quickTags.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="shrink-0 rounded-full bg-black/25 px-3.5 py-1.5 text-[13px] font-semibold text-white backdrop-blur transition hover:bg-black/40">
                {tag.label}
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={showPrev}
          aria-label="Previous background photo"
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50 sm:left-6">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next background photo"
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50 sm:right-6">
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-6">
          {slides.map((slide, index) => (
            <button
              key={slide.slug ?? index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show background photo ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>

        <Link
          href={active.href}
          className="absolute bottom-5 left-4 z-20 sm:bottom-6 sm:left-6">
          <p className="text-[13px] font-bold text-white hover:underline">{active.title}</p>
          <p className="text-[12px] text-white/70">{active.region}</p>
        </Link>

        <Link
          href="/where-to-stay"
          className="absolute bottom-5 right-4 z-20 text-[13px] font-semibold text-white/80 underline decoration-white/40 underline-offset-2 transition hover:text-white sm:bottom-6 sm:right-6">
          See all places to stay
        </Link>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} tours={tours} />
    </section>
  );
}
