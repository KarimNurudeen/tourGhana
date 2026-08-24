import type { Tour } from '@/types/content';

// Pure helpers with no server-only dependencies, split out from lib/api.ts
// so client components can import them directly. lib/api.ts imports
// next/headers (for draft-mode-aware fetching), which makes the *entire*
// module server-only — any client component that pulled a value (not just
// a type) from lib/api.ts would drag that import in and fail to build.
export function tourHref(tour: Pick<Tour, 'slug' | 'category'>): string {
  if (tour.category === 'Where To Stay') return `/where-to-stay/${tour.slug}`;
  if (tour.category === 'Festivals') return `/category/festivals/${tour.slug}`;
  return `/tours/${tour.slug}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
