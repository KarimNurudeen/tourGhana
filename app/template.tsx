'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

// Module-scoped, not component state: it needs to survive remounts (this
// component remounts on every navigation) but reset on a real page reload —
// exactly what a plain module-level variable does in an SPA.
let hasMountedOnce = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // The very first load already gets the full PageLoader splash; only
    // play the reveal on subsequent client-side navigations.
    if (!hasMountedOnce) {
      hasMountedOnce = true;
      return;
    }

    // Pixel values anchored to the viewport, not percentages of this
    // element's own box: the page content can be many times taller than
    // the screen, and percentage-based clip-path is relative to that full
    // (often huge) box, which would center the circle far below the fold
    // and make the reveal invisible until it suddenly jumps into view.
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 40;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: `circle(0px at ${cx}px ${cy}px)` },
        {
          clipPath: `circle(${maxRadius}px at ${cx}px ${cy}px)`,
          duration: 0.9,
          ease: 'power3.inOut',
          onComplete: () => {
            // Drop the clip once fully revealed so scrolling later never
            // re-clips content that has since scrolled past this point.
            el.style.clipPath = 'none';
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return <div ref={wrapRef}>{children}</div>;
}
