import type { QuickFact } from '@/types/content';

/**
 * Quick facts on a frosted-glass panel: a dark card over a red backdrop. Static by design: the soft colour
 * blobs behind the glass give the blur something to show, and nothing moves.
 * "grid" lays the facts out across the page; "stack" is one column for the
 * sidebar and phones.
 */
export function QuickFactsPanel({
  facts,
  variant = 'grid',
}: {
  facts: QuickFact[];
  variant?: 'grid' | 'stack';
}) {
  if (facts.length === 0) return null;

  const list =
    variant === 'grid'
      ? 'grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
      : 'grid grid-cols-1 gap-2.5';

  return (
    <section
      aria-label="Quick facts"
      className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-[#a3121a] to-[#2b0b0e] p-3 shadow-card sm:p-5">
      {/* Colour behind the glass, so the blur has something to blur. */}
      <span aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-amber-300/45 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-rose-300/35 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-40 w-40 rounded-full bg-white/15 blur-3xl" />

      <div className="relative rounded-xl border border-white/20 bg-[#0d0e11]/85 p-4 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6">
        <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-white/80">Quick facts</h2>
        <dl className={`mt-4 ${list}`}>
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-lg border border-white/15 bg-white/[0.07] px-3.5 py-3 backdrop-blur-sm">
              <dt className="text-[11px] font-bold uppercase tracking-wide text-white/70">{fact.label}</dt>
              <dd className="mt-1 text-[16px] font-semibold leading-snug text-white">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
