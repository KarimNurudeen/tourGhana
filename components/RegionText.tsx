import { ChevronDownIcon } from 'lucide-react';

const card = 'rounded-xl bg-white shadow-card';

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((p, i) =>
        p.startsWith('- ') ? (
          <p key={i} className="pl-4 text-[15px] leading-relaxed text-neutral-700 before:-ml-4 before:mr-2 before:text-brand before:content-['•']">
            {p.slice(2)}
          </p>
        ) : (
          <p key={i} className="text-[15px] leading-relaxed text-neutral-700">
            {p}
          </p>
        )
      )}
    </div>
  );
}

function Fold({ title, count, children, open = false }: { title: string; count: number; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className={`group ${card}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-[17px] font-extrabold text-ink [&::-webkit-details-marker]:hidden">
        <span>
          {title} <span className="ml-1 text-[13px] font-bold text-neutral-400">{count}</span>
        </span>
        <ChevronDownIcon className="h-5 w-5 text-brand transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-neutral-200 px-4 py-4">{children}</div>
    </details>
  );
}

/** A region's written guide: overview, attractions, festivals and wildlife. */
export function RegionText({
  overview = [],
  attractions = [],
  festivals = [],
  wildlife = [],
}: {
  overview?: string[];
  attractions?: string[];
  festivals?: string[];
  wildlife?: string[];
}) {
  if (!overview.length && !attractions.length && !festivals.length && !wildlife.length) return null;
  return (
    <div className="space-y-2">
      {overview.length > 0 && (
        <Fold title="About the region" count={overview.length} open>
          <Paragraphs items={overview} />
        </Fold>
      )}
      {attractions.length > 0 && (
        <Fold title="Attractions" count={attractions.length}>
          <Paragraphs items={attractions} />
        </Fold>
      )}
      {festivals.length > 0 && (
        <Fold title="Festivals & events" count={festivals.length}>
          <Paragraphs items={festivals} />
        </Fold>
      )}
      {wildlife.length > 0 && (
        <Fold title="Wildlife & nature" count={wildlife.length}>
          <Paragraphs items={wildlife} />
        </Fold>
      )}
    </div>
  );
}
