'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

/**
 * Long text behind a fade and a button. Content shorter than the collapsed
 * height is shown in full with no button.
 */
export function ReadMore({
  children,
  collapsedHeight = 360,
  moreLabel = 'Read the full story',
}: {
  children: React.ReactNode;
  collapsedHeight?: number;
  moreLabel?: string;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [tall, setTall] = useState(false);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const check = () => setTall(el.scrollHeight > collapsedHeight + 80);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [collapsedHeight]);

  const clamped = tall && !expanded;

  return (
    <div>
      <div className="relative overflow-hidden" style={clamped ? { maxHeight: collapsedHeight } : undefined}>
        <div ref={inner}>{children}</div>
        {clamped && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {tall && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-4 py-2 text-[14px] font-extrabold text-ink transition hover:bg-neutral-200">
          {expanded ? 'Show less' : moreLabel}
          <ChevronDownIcon className={`h-4 w-4 text-brand transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
}
