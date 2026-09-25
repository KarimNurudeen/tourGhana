'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

// Two full "breaths" (in and out) of the logo, then a fade. The CSS cycle
// length in globals.css (.logo-breathe) must match BREATH_SECONDS.
const BREATH_SECONDS = 1;
const BREATHS = 2;
const FADE_SECONDS = 0.5;

export function PageLoader() {
  // Rendered visible by default, matching the server-rendered markup, so it's
  // present from the very first paint with no gap for page content to flash
  // through underneath.
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    // A fixed duration is deliberate: this is a branded splash moment, not a
    // literal "resources finished loading" indicator. Waiting on window's
    // `load` event previously hung the loader whenever a single resource (an
    // image, the service worker, a font) never settled; a timer always resolves.
    const hideTimeout = setTimeout(() => {
      if (cancelled) return;
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: FADE_SECONDS,
          ease: 'power2.out',
          onComplete: () => {
            if (!cancelled) setVisible(false);
          },
        });
      } else {
        setVisible(false);
      }
    }, BREATH_SECONDS * BREATHS * 1000);

    return () => {
      cancelled = true;
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={overlayRef} role="status" aria-label="Loading Tour Ghana" className="page-loader-overlay">
      <Image
        src="/logo-lights.png"
        alt=""
        width={774}
        height={745}
        priority
        className="logo-breathe h-auto w-[min(56vw,280px)]"
      />
    </div>
  );
}
