import Image from 'next/image';
import Link from 'next/link';
import type { NearbyMode, NearbyPlace } from '@/types/content';
import { tourHref } from '@/lib/tour-utils';

const h2 =
  "flex items-center gap-2 text-[20px] font-black tracking-tight text-ink before:h-5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-[''] sm:text-[22px]";

function distanceLabel(km: number | null): string | null {
  if (km === null) return null;
  return km === 0 ? 'Under 1 km away' : `${km} km away`;
}

function heading(kind: 'sights' | 'stays', mode: NearbyMode, region: string): string {
  const where = region.replace(/ Region$/, '');
  if (kind === 'sights') return mode === 'distance' ? 'Nearby' : `More in ${where}`;
  return mode === 'distance' ? 'Where to stay nearby' : `Where to stay in ${where}`;
}

/**
 * Places near the one being viewed. The list comes from the API, which works it
 * out from coordinates; this only lays it out. "list" is a compact card for a
 * sidebar, "grid" is a row of cards under the main content.
 */
export function NearbySection({
  places,
  mode,
  region,
  kind = 'sights',
  layout = 'list',
}: {
  places?: NearbyPlace[];
  mode?: NearbyMode;
  region: string;
  kind?: 'sights' | 'stays';
  layout?: 'list' | 'grid';
}) {
  if (!places || places.length === 0 || !mode || mode === 'none') return null;

  const id = `nearby-${kind}`;
  const item = (place: NearbyPlace) => {
    const href = tourHref(place);
    const distance = distanceLabel(place.distanceKm);
    return (
      <li key={place.slug} className={layout === 'grid' ? 'rounded-xl bg-white p-4 shadow-card' : 'py-4'}>
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <Link href={href} className="text-[16px] font-bold leading-snug text-ink hover:text-brand">
              {place.name}
            </Link>
            <p className="mt-1 text-[12px] font-bold uppercase tracking-wide text-neutral-500">
              {distance ?? place.region}
            </p>
          </div>
          {place.image && (
            <Link href={href} className="shrink-0 overflow-hidden rounded-lg">
              <Image src={place.image} alt="" width={96} height={64} className="h-16 w-24 object-cover" />
            </Link>
          )}
        </div>
      </li>
    );
  };

  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className={h2}>
        {heading(kind, mode, region)}
      </h2>
      {layout === 'grid' ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{places.map(item)}</ul>
      ) : (
        <ul className="divide-y divide-neutral-200 rounded-xl bg-white px-4 shadow-card">{places.map(item)}</ul>
      )}
    </section>
  );
}
