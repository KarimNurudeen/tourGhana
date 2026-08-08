'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PEG_PATH =
  'M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z';

type PegtopShapeProps = {
  className: string;
  idSuffix: string;
};

function PegtopShape({ className, idSuffix }: PegtopShapeProps) {
  const shineId = `shine-${idSuffix}`;
  const maskId = `mask-${idSuffix}`;

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={shineId}>
          <feGaussianBlur stdDeviation={3} />
        </filter>
        <mask id={maskId}>
          <path d={PEG_PATH} fill="white" />
        </mask>
        <radialGradient
          id={`gradient-1-${idSuffix}`}
          cx={50}
          cy={66}
          fx={50}
          fy={66}
          r={30}
          gradientTransform="translate(0 35) scale(1 0.5)"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="black" stopOpacity="0.3" />
          <stop offset="50%" stopColor="black" stopOpacity="0.1" />
          <stop offset="100%" stopColor="black" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id={`gradient-2-${idSuffix}`}
          cx={55}
          cy={20}
          fx={55}
          fy={20}
          r={30}
          gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="50%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id={`gradient-3-${idSuffix}`}
          cx={85}
          cy={50}
          fx={85}
          fy={50}
          xlinkHref={`#gradient-2-${idSuffix}`}
        />
        <radialGradient
          id={`gradient-4-${idSuffix}`}
          cx={50}
          cy={58}
          fx={50}
          fy={58}
          r={60}
          gradientTransform="translate(0 47) scale(1 0.2)"
          xlinkHref={`#gradient-3-${idSuffix}`}
        />
        <linearGradient
          id={`gradient-5-${idSuffix}`}
          x1={50}
          y1={90}
          x2={50}
          y2={10}
          gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="black" stopOpacity="0.2" />
          <stop offset="40%" stopColor="black" stopOpacity={0} />
        </linearGradient>
      </defs>
      <g>
        <path d={PEG_PATH} fill="currentColor" />
        <path d={PEG_PATH} fill={`url(#gradient-1-${idSuffix})`} />
        <path
          d={PEG_PATH}
          fill="none"
          stroke="white"
          opacity="0.3"
          strokeWidth={3}
          filter={`url(#${shineId})`}
          mask={`url(#${maskId})`}
        />
        <path d={PEG_PATH} fill={`url(#gradient-2-${idSuffix})`} />
        <path d={PEG_PATH} fill={`url(#gradient-3-${idSuffix})`} />
        <path d={PEG_PATH} fill={`url(#gradient-4-${idSuffix})`} />
        <path d={PEG_PATH} fill={`url(#gradient-5-${idSuffix})`} />
      </g>
    </svg>
  );
}

export function PageLoader() {
  // Rendered visible by default — matching the server-rendered markup — so
  // it's present from the very first paint with no gap for real page
  // content to flash through underneath. The blocking inline script in
  // layout.tsx (via the `skip-loader` class on <html>) is what actually
  // suppresses it on repeat visits within a session; that decision has to
  // happen before paint, which a React effect can never do.
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.documentElement.classList.contains('skip-loader')) {
      setVisible(false);
      return;
    }

    let cancelled = false;

    // A fixed duration is deliberate: this is a branded splash moment, not a
    // literal "resources finished loading" indicator. Waiting on window's
    // `load` event here previously caused the loader to hang indefinitely
    // whenever any single resource (an image, the service worker, a font)
    // never fully settled — a fixed timer always resolves.
    const hideTimeout = setTimeout(() => {
      if (cancelled) return;
      sessionStorage.setItem('tour-ghana-loaded', '1');
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            if (!cancelled) setVisible(false);
          },
        });
      } else {
        setVisible(false);
      }
    }, 1300);

    return () => {
      cancelled = true;
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading Tour Ghana"
      className="page-loader-overlay">
      <div className="pegtop-loader">
        <PegtopShape className="pegtop-one" idSuffix="1" />
        <PegtopShape className="pegtop-two" idSuffix="2" />
        <PegtopShape className="pegtop-three" idSuffix="3" />
      </div>
    </div>
  );
}
