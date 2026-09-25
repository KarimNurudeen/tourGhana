import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react';

type Select = { name: string; label: string; options: string[]; value?: string };

/** GET form, so filters live in the URL and the directory stays server-rendered. */
export function DirectoryForm({
  action,
  q,
  placeholder,
  selects,
}: {
  action: string;
  q?: string;
  placeholder: string;
  selects: Select[];
}) {
  const field =
    'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-[15px] text-ink focus:border-brand focus:outline-none';
  return (
    <form action={action} method="get" className="grid gap-2 rounded-xl bg-white p-3 shadow-card sm:grid-cols-[1fr_auto_auto_auto]">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input name="q" defaultValue={q} placeholder={placeholder} className={`${field} pl-9`} />
      </label>
      {selects.map((s) => (
        <label key={s.name} className="block">
          <span className="sr-only">{s.label}</span>
          <select name={s.name} defaultValue={s.value ?? ''} className={field}>
            <option value="">{s.label}</option>
            {s.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      ))}
      <button
        type="submit"
        className="rounded-lg bg-brand px-5 py-2.5 text-[15px] font-extrabold text-white hover:bg-brandDark">
        Search
      </button>
    </form>
  );
}

export function Pager({
  basePath,
  params,
  page,
  pageSize,
  total,
  anchor,
}: {
  basePath: string;
  params: Record<string, string | undefined>;
  page: number;
  pageSize: number;
  total: number;
  anchor?: string;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  const href = (n: number) => {
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) search.set(k, v);
    if (n > 1) search.set('page', String(n));
    const qs = search.toString();
    return `${basePath}${qs ? `?${qs}` : ''}${anchor ? `#${anchor}` : ''}`;
  };
  const link =
    'inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[14px] font-extrabold text-ink shadow-card hover:text-brand';
  return (
    <nav aria-label="Pages" className="mt-4 flex items-center justify-between gap-3">
      {page > 1 ? (
        <Link href={href(page - 1)} className={link}>
          <ChevronLeftIcon className="h-4 w-4" /> Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-[13px] font-semibold text-neutral-600">
        Page {page} of {pages}
      </span>
      {page < pages ? (
        <Link href={href(page + 1)} className={link}>
          Next <ChevronRightIcon className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

/** Emails and web addresses in a free-text contact field become links. */
export function ContactLinks({ text }: { text: string }) {
  const tokens = text.split(/(\s+|\/(?=\s|www|http))/).filter((t) => t.trim() && t !== '/');
  return (
    <>
      {tokens.map((token, i) => {
        const clean = token.replace(/[,;]+$/, '');
        const sep = i > 0 ? ' · ' : '';
        if (clean.includes('@')) {
          return (
            <span key={i}>
              {sep}
              <a href={`mailto:${clean}`} className="font-semibold text-brand hover:underline">
                {clean}
              </a>
            </span>
          );
        }
        if (/^(https?:\/\/|www\.)/i.test(clean)) {
          return (
            <span key={i}>
              {sep}
              <a
                href={clean.startsWith('http') ? clean : `https://${clean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand hover:underline">
                {clean}
              </a>
            </span>
          );
        }
        return <span key={i}>{sep}{clean}</span>;
      })}
    </>
  );
}
