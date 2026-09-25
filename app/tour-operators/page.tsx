import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactLinks, DirectoryForm, Pager } from '@/components/Directory';
import { getGuidePage, getTourOperators } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Tour Operators',
  description: 'Licensed travel agents and tour operators across Ghana.',
};

type Props = {
  searchParams: Promise<{ q?: string; agencyType?: string; page?: string }>;
};

const h2 =
  "flex items-center gap-2 text-[22px] font-black tracking-tight text-ink before:h-6 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-['']";

export default async function TourOperatorsPage({ searchParams }: Props) {
  const { q, agencyType, page } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);
  const [intro, data] = await Promise.all([
    getGuidePage('tour-operators'),
    getTourOperators({ q, agencyType, page: pageNumber, pageSize: 20 }),
  ]);

  return (
    <main id="main" className="w-full">
      <div className="mx-auto max-w-feed space-y-10 px-3 py-6 sm:px-4">
        <header>
          <h1 className="text-[30px] font-black tracking-tight text-ink sm:text-[38px]">Tour Operators</h1>
          {intro && (
            <div className="mt-3 max-w-3xl space-y-3 text-[16px] leading-relaxed text-neutral-700">
              {intro.sections.flatMap((s) => s.paragraphs).map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          )}
        </header>

        <section id="directory" aria-label="Tour operator directory" className="scroll-mt-32 space-y-3">
          <h2 className={h2}>Travel agents and tour operators</h2>
          <DirectoryForm
            action="/tour-operators#directory"
            q={q}
            placeholder="Search by agency or area"
            selects={[{ name: 'agencyType', label: 'IATA and non-IATA', options: data.agencyTypes, value: agencyType }]}
          />
          <p className="text-[13px] font-bold uppercase tracking-wide text-neutral-500">
            {data.total.toLocaleString('en-GB')} agenc{data.total === 1 ? 'y' : 'ies'}
          </p>

          {data.items.length === 0 ? (
            <p className="rounded-xl bg-white p-5 text-[15px] text-neutral-600 shadow-card">
              No agencies match that search.
            </p>
          ) : (
            <ul className="grid gap-3 md:grid-cols-2">
              {data.items.map((op) => (
                <li key={`${op.name}-${op.location}`} className="rounded-xl bg-white p-4 shadow-card">
                  <p className="text-[17px] font-extrabold leading-snug text-ink">{op.name}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {op.category && (
                      <span className="rounded bg-neutral-200/80 px-2 py-1 text-[12px] font-extrabold uppercase tracking-wide text-brand">
                        {op.category}
                      </span>
                    )}
                    {op.agencyType && (
                      <span className="rounded bg-neutral-200/80 px-2 py-1 text-[12px] font-extrabold uppercase tracking-wide text-neutral-600">
                        {op.agencyType}
                      </span>
                    )}
                  </div>
                  {op.location && <p className="mt-2 text-[14px] text-neutral-700">{op.location}</p>}
                  {op.postalAddress && <p className="text-[14px] text-neutral-500">{op.postalAddress}</p>}
                  {op.contact.length > 0 && (
                    <ul className="mt-2 space-y-0.5 break-words text-[14px] text-neutral-700">
                      {op.contact.map((line) => (
                        <li key={line}>
                          <ContactLinks text={line} />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}

          <Pager
            basePath="/tour-operators"
            params={{ q, agencyType }}
            page={data.page}
            pageSize={data.pageSize}
            total={data.total}
            anchor="directory"
          />
        </section>

        <section aria-label="Before you book" className="space-y-3">
          <h2 className={h2}>What to check before booking</h2>
          <div className="rounded-xl bg-white p-5 shadow-card">
            <p className="text-[16px] leading-relaxed text-neutral-700">
              Whoever you book with, it&rsquo;s worth confirming they hold a current licence from the Ghana
              Tourism Authority, that the price quoted states clearly what it covers (guide, transport, park and
              entry fees, meals), and that they can name the specific sites on the itinerary rather than a vague
              regional tour. For coastal forts and national parks in particular, ask whether the guide is the
              one certified on-site by the Ghana Museums and Monuments Board or the park authority, since some
              sites require it.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
              Run a licensed tour operation in Ghana? Get in touch through{' '}
              <Link href="/contact" className="font-bold text-brand hover:underline">
                Contact Us
              </Link>{' '}
              with your licence details and the regions or itineraries you cover.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
