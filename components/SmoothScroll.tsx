'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Images and video near the top of the page can settle their final
    // layout size after ScrollTrigger's initial position calculation,
    // leaving elements just below them permanently stuck at their
    // pre-reveal opacity. Re-measure once everything has actually loaded.
    function refresh() {
      ScrollTrigger.refresh();
    }
    window.addEventListener('load', refresh);
    const settleTimeout = setTimeout(refresh, 500);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      window.removeEventListener('load', refresh);
      clearTimeout(settleTimeout);
    };
  }, []);

  return null;
}
