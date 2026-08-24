'use client';

import { useLayoutEffect, useRef, useState } from 'react';

type Vertex = { x: number; y: number; round: boolean };

function pointTowards(from: Vertex, to: Vertex, dist: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const t = Math.min(dist, len / 2) / len;
  return { x: from.x + dx * t, y: from.y + dy * t };
}

function buildRoundedPolygonPath(vertices: Vertex[], radius: number) {
  const n = vertices.length;
  const last = vertices[n - 1];
  const first = vertices[0];
  const start = last.round ? pointTowards(last, first, radius) : last;

  let d = `M ${start.x} ${start.y} `;
  for (let i = 0; i < n; i++) {
    const curr = vertices[i];
    const prev = vertices[(i - 1 + n) % n];
    const next = vertices[(i + 1) % n];
    if (curr.round) {
      const before = pointTowards(curr, prev, radius);
      const after = pointTowards(curr, next, radius);
      d += `L ${before.x} ${before.y} Q ${curr.x} ${curr.y} ${after.x} ${after.y} `;
    } else {
      d += `L ${curr.x} ${curr.y} `;
    }
  }
  return d + 'Z';
}

type ChamferedCardProps = {
  children: React.ReactNode;
  className?: string;
  cut?: number;
  pointRadius?: number;
};

export function ChamferedCard({
  children,
  className = '',
  cut = 56,
  pointRadius = 14,
}: ChamferedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [clipPath, setClipPath] = useState<string | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    function update() {
      const w = el!.clientWidth;
      const h = el!.clientHeight;
      if (!w || !h) return;
      const c = Math.min(cut, w / 2, h / 2);
      const r = Math.min(pointRadius, c);

      const vertices: Vertex[] = [
        { x: c, y: 0, round: true },
        { x: w, y: 0, round: false },
        { x: w, y: h - c, round: true },
        { x: w - c, y: h, round: true },
        { x: 0, y: h, round: false },
        { x: 0, y: c, round: true },
      ];

      setClipPath(`path('${buildRoundedPolygonPath(vertices, r)}')`);
    }

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cut, pointRadius]);

  return (
    <div
      ref={ref}
      className={className}
      style={clipPath ? { clipPath } : undefined}>
      {children}
    </div>
  );
}
