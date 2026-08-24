'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  y = 40,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
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
      gsap.set(el, { opacity: 1, y: 0 });
    }, 2500);

    return () => {
      clearTimeout(safety);
      images.forEach((img) => img.removeEventListener('load', onImageLoad));
      ctx.revert();
    };
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
