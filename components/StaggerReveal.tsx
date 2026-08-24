'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol';
};

export function StaggerReveal({ children, className, as = 'div' }: StaggerRevealProps) {
  const Tag = as;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(el.children);
      const containerRect = el.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      // Cards still drag in from the side — but the side is picked from
      // each item's actual on-screen column (left half of the grid vs.
      // right half), not from its array index. Index-based left/right
      // alternation doesn't line up with real columns once a grid wraps to
      // 3+ columns, so same-row cards ended up flying in from opposite
      // sides and crossing paths mid-flight. A modest, uniform offset keeps
      // the motion readable instead of the exaggerated wide swings before.
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 24,
          x: (_i, target) => {
            const itemRect = (target as HTMLElement).getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            return itemCenter < containerCenter ? -48 : 48;
          },
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    // Lazy-loaded images below the fold finish loading after ScrollTrigger's
    // initial position calc, shifting layout and staling the trigger point.
    // Refresh once each image settles so the trigger fires at the right spot.
    const images = Array.from(el.querySelectorAll('img')).filter((img) => !img.complete);
    const onImageLoad = () => ScrollTrigger.refresh();
    images.forEach((img) => img.addEventListener('load', onImageLoad, { once: true }));

    // Last-resort safety net: if the reveal still never fires, don't leave
    // real content permanently invisible.
    const safety = setTimeout(() => {
      gsap.set(el.children, { opacity: 1, x: 0, y: 0 });
    }, 2500);

    return () => {
      clearTimeout(safety);
      images.forEach((img) => img.removeEventListener('load', onImageLoad));
      ctx.revert();
    };
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement & HTMLUListElement & HTMLOListElement>} className={className}>
      {children}
    </Tag>
  );
}
