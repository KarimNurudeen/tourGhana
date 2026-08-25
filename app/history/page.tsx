import type { Metadata } from 'next';
import Image from 'next/image';
import { getHistoryPage, getHomepage } from '@/lib/api';

export const metadata: Metadata = {
  title: 'History of Ghana',
  description:
    'From the medieval Empire of Ghana and the Asante kingdom to the Atlantic slave trade, ' +
    'independence in 1957 and the Fourth Republic.',
};

const sectionHeading =
  'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default async function HistoryPage() {
  const [{ historyEvents }, history] = await Promise.all([getHomepage(), getHistoryPage()]);

  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-ink sm:text-[46px]">
          History of Ghana
        </h1>
        {history.intro && (
          <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-ink">{history.intro}</p>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article className="max-w-2xl space-y-10 text-[17px] leading-relaxed text-neutral-700">
            {history.image && (
              // The image is a portrait, so it sits as a figure in the text
              // rather than being cropped into a wide banner.
              <figure className="float-none mb-2 sm:float-right sm:ml-8 sm:w-[280px]">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={history.image}
                    alt={history.imageCaption ?? ''}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 280px, 100vw"
                  />
                </div>
                {history.imageCaption && (
                  <figcaption className="mt-2 text-[13px] leading-snug text-neutral-500">
                    {history.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {history.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className={sectionHeading}>{section.heading}</h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>

          <aside>
            <h2 className="text-[14px] font-bold uppercase tracking-wide text-neutral-500">
              Key dates
            </h2>
            <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <ul className="space-y-8 border-l border-neutral-200 pl-6">
                {historyEvents.map((event) => (
                  <li key={event.year} className="relative">
                    <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-flagRed" />
                    <p className="text-[20px] font-bold text-ink">{event.year}</p>
                    <p className="mt-1 text-[16px] text-neutral-600">{event.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
