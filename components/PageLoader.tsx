'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type FootprintIconProps = {
  className?: string;
  style?: React.CSSProperties;
};

function FootprintIcon({ className, style }: FootprintIconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 80 120"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="86" rx="24" ry="30" />
      <ellipse cx="38" cy="46" rx="27" ry="32" />
      <ellipse cx="16" cy="20" rx="8" ry="11" transform="rotate(-8 16 20)" />
      <ellipse cx="32" cy="10" rx="8.5" ry="12" />
      <ellipse cx="48" cy="9" rx="8" ry="12" transform="rotate(4 48 9)" />
      <ellipse cx="63" cy="15" rx="7" ry="10" transform="rotate(14 63 15)" />
      <ellipse cx="74" cy="27" rx="6" ry="8.5" transform="rotate(28 74 27)" />
    </svg>
  );
}

// A trail of alternating left/right footprints that shrink as they recede —
// reads as someone walking off into the distance rather than a static mark.
const FOOTSTEPS = [
  { left: '2%', bottom: '0%', rotate: -10, scale: 1, mirrored: false, color: 'gold' },
  { left: '34%', bottom: '18%', rotate: 10, scale: 0.92, mirrored: true, color: 'red' },
  { left: '6%', bottom: '36%', rotate: -10, scale: 0.85, mirrored: false, color: 'green' },
  { left: '38%', bottom: '54%', rotate: 10, scale: 0.78, mirrored: true, color: 'gold' },
  { left: '10%', bottom: '72%', rotate: -10, scale: 0.7, mirrored: false, color: 'red' },
  { left: '42%', bottom: '88%', rotate: 10, scale: 0.62, mirrored: true, color: 'green' },
] as const;

const FOOTSTEP_CYCLE_SECONDS = 1.92;
const FOOTSTEP_DELAY = FOOTSTEP_CYCLE_SECONDS / FOOTSTEPS.length;

export function PageLoader() {
  // Rendered visible by default — matching the server-rendered markup — so
  // it's present from the very first paint with no gap for real page
  // content to flash through underneath.
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    // A fixed duration is deliberate: this is a branded splash moment, not a
    // literal "resources finished loading" indicator. Waiting on window's
    // `load` event here previously caused the loader to hang indefinitely
    // whenever any single resource (an image, the service worker, a font)
    // never fully settled — a fixed timer always resolves.
    const hideTimeout = setTimeout(() => {
      if (cancelled) return;
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
      <div className="footsteps-loader">
        {FOOTSTEPS.map((step, i) => (
          <div
            key={i}
            className="footstep-slot"
            style={{
              left: step.left,
              bottom: step.bottom,
              transform: `rotate(${step.rotate}deg) scale(${step.scale})`,
            }}>
            <div className={step.mirrored ? 'footstep-mirror' : undefined}>
              <FootprintIcon
                className={`footstep footstep-${step.color}`}
                style={{ animationDelay: `${i * FOOTSTEP_DELAY}s` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
