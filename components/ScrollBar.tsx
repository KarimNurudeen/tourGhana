'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

/**
 * A scroll bar for any horizontally scrolling element: the thumb shows how
 * much of the content is visible and where you are; drag it, click the track,
 * or use the arrow keys. Renders nothing when the content already fits.
 */
export function ScrollBar({
  target,
  label,
  className = 'mt-2',
}: {
  target: RefObject<HTMLElement | null>;
  label: string;
  className?: string;
}) {
  const bar = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startScroll: number } | null>(null);
  // Thumb size and position as fractions (0-1) of the bar's width.
  const [thumb, setThumb] = useState({ size: 1, pos: 0 });

  const measure = useCallback(() => {
    const el = target.current;
    if (!el) return;
    const size = Math.min(1, el.clientWidth / el.scrollWidth);
    const max = el.scrollWidth - el.clientWidth;
    setThumb({ size, pos: max > 0 ? (el.scrollLeft / max) * (1 - size) : 0 });
  }, [target]);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      observer.disconnect();
    };
  }, [target, measure]);

  const scrollToFraction = (fraction: number) => {
    const el = target.current;
    if (el) el.scrollTo({ left: fraction * (el.scrollWidth - el.clientWidth), behavior: 'smooth' });
  };

  // Click on the track (not the thumb): centre the thumb on the click point.
  const onBarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const barEl = bar.current;
    if (!barEl || event.target !== barEl) return;
    const rect = barEl.getBoundingClientRect();
    const room = 1 - thumb.size;
    const fraction = room > 0 ? ((event.clientX - rect.left) / rect.width - thumb.size / 2) / room : 0;
    scrollToFraction(Math.min(1, Math.max(0, fraction)));
  };

  const onThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = target.current;
    if (!el) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startX: event.clientX, startScroll: el.scrollLeft };
  };

  const onThumbPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = target.current;
    const barEl = bar.current;
    if (!drag.current || !el || !barEl) return;
    // Moving the thumb by x pixels scrolls the content by x * (content / bar).
    el.scrollLeft = drag.current.startScroll + (event.clientX - drag.current.startX) * (el.scrollWidth / barEl.clientWidth);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const el = target.current;
    if (!el || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
    el.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * el.clientWidth * 0.85, behavior: 'smooth' });
    event.preventDefault();
  };

  if (thumb.size >= 0.999) return null;

  return (
    <div ref={bar} onPointerDown={onBarPointerDown} className={`relative h-2 cursor-pointer rounded-full bg-neutral-300 ${className}`}>
      <div
        role="scrollbar"
        aria-label={`${label} position`}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round((thumb.pos / (1 - thumb.size)) * 100)}
        tabIndex={0}
        onPointerDown={onThumbPointerDown}
        onPointerMove={onThumbPointerMove}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onKeyDown={onKeyDown}
        style={{ width: `${thumb.size * 100}%`, left: `${thumb.pos * 100}%`, touchAction: 'none' }}
        className="absolute top-0 h-2 cursor-grab rounded-full bg-brand active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      />
    </div>
  );
}
