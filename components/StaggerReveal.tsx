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
      const mid = (items.length - 1) / 2;

      items.forEach((item, i) => {
        const fromLeft = i % 2 === 0;
        const spread = Math.abs(i - mid) * 12;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: fromLeft ? -90 - spread : 90 + spread,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            delay: i * 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement & HTMLUListElement & HTMLOListElement>} className={className}>
      {children}
    </Tag>
  );
}
