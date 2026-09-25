import { ContactLinks, DirectoryForm, Pager } from '@/components/Directory';
import { getAccommodation } from '@/lib/api';

type Props = {
  basePath: string;
  q?: string;
  region?: string;
  grade?: string;
  page: number;
};

/** Licensed hotels and guest houses, filterable by region and grade. */
export async function AccommodationDirectory({ basePath, q, region, grade, page }: Props) {
  const pageSize = 20;
  const data = await getAccommodation({ q, region, grade, page, pageSize });

  return (
    <div className="space-y-3">
      <DirectoryForm
        action={`${basePath}#directory`}
        q={q}
        placeholder="Search by name or town"
        selects={[
          { name: 'region', label: 'All regions', options: data.regions, value: region },
          { name: 'grade', label: 'All grades', options: data.grades, value: grade },
        ]}
      />
      <p className="text-[13px] font-bold uppercase tracking-wide text-neutral-500">
        {data.total.toLocaleString('en-GB')} licensed place{data.total === 1 ? '' : 's'} to stay
      </p>

      {data.items.length === 0 ? (
        <p className="rounded-xl bg-white p-5 text-[15px] text-neutral-600 shadow-card">
          Nothing matches those filters. Try a different region or a shorter search.
        </p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {data.items.map((hotel) => (
            <li key={`${hotel.region}-${hotel.name}-${hotel.location}`} className="rounded-xl bg-white p-4 shadow-card">
              <p className="text-[17px] font-extrabold leading-snug text-ink">{hotel.name}</p>
              <p className="mt-0.5 text-[14px] text-neutral-600">
                {[hotel.location, hotel.region].filter(Boolean).join(' · ')}
              </p>
              {hotel.grade && (
                <span className="mt-2 inline-block rounded bg-neutral-200/80 px-2 py-1 text-[12px] font-extrabold uppercase tracking-wide text-brand">
                  {hotel.grade}
                </span>
              )}
              {hotel.phone && <p className="mt-2 text-[14px] text-neutral-700">{hotel.phone}</p>}
              {hotel.emailWebsite && (
                <p className="mt-1 break-words text-[14px] text-neutral-700">
                  <ContactLinks text={hotel.emailWebsite} />
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <Pager
        basePath={basePath}
        params={{ q, region, grade }}
        page={data.page}
        pageSize={data.pageSize}
        total={data.total}
        anchor="directory"
      />
    </div>
  );
}
