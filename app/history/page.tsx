import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getHomepage } from '@/lib/api';

export const metadata: Metadata = {
  title: 'History of Ghana',
  description:
    'From the medieval Empire of Ghana and the Asante kingdom to the Atlantic slave trade, ' +
    'independence in 1957 and the Fourth Republic.',
};

const sectionHeading =
  'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default async function HistoryPage() {
  const { historyEvents, historyFeature } = await getHomepage();

  return (
    <main id="main" className="w-full bg-white">
      <div className="mx-auto max-w-page px-4 py-10">
        <h1 className="text-[38px] font-black tracking-tight text-ink sm:text-[46px]">
          History of Ghana
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-neutral-600">
          {historyFeature.title}
        </p>

        {historyFeature.image && (
          <div className="relative mt-8 aspect-[16/7] w-full overflow-hidden rounded-xl">
            <Image
              src={historyFeature.image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </div>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article className="max-w-2xl space-y-10 text-[17px] leading-relaxed text-neutral-700">
            <p className="text-[19px] leading-relaxed text-ink">
              Ghana&rsquo;s name is older than the country that carries it. It was
              taken at independence from a medieval empire that stood hundreds
              of miles to the northwest, chosen to root a new nation in an
              African past rather than a colonial one.
            </p>

            <section className="space-y-4">
              <h2 className={sectionHeading}>The Empire of Ghana</h2>
              <p>
                The first Ghana was not on this coast. From around the fourth
                century, the Soninke people built a state across what is now
                southeastern Mauritania and western Mali, grown wealthy on the
                trade routes carrying gold north across the Sahara and salt
                south in return.
              </p>
              <p>
                &lsquo;Ghana&rsquo; was not originally the name of the country
                at all. It was the title of its ruler &mdash; warrior king
                &mdash; in the Soninke language, still spoken by around two
                million people today. Traders and neighbours heard the title,
                applied it to the whole territory, and the name stuck. The
                empire weakened from the eleventh century under pressure from
                the north and was eventually absorbed into the rising Mali
                Empire.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={sectionHeading}>Gold, and the arrival of Europeans</h2>
              <p>
                Portuguese ships reached this coast in 1471 and found people
                wearing worked gold. Within a decade they had begun building in
                stone: Elmina Castle went up in 1482, the first European
                fortification of its size in sub-Saharan Africa and the anchor
                of a trade in gold, ivory and timber.
              </p>
              <p>
                The Dutch, English, Danes, Swedes and Brandenburgers followed,
                and the shoreline filled with forts &mdash; more than thirty of
                them along a few hundred kilometres, each holding a stretch of
                coast against European rivals as much as against anyone else.
                The stretch became known in Europe simply as the Gold Coast.
                Many of those forts are still standing and can be visited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={sectionHeading}>The Atlantic slave trade</h2>
              <p>
                From the sixteenth century the traffic shifted from goods to
                people, and by the 1600s the trade in captives had overtaken
                gold entirely. The same forts were rebuilt around it. Dungeons
                were cut beneath the courtyards of{' '}
                <Link
                  href="/tours/cape-coast-castle"
                  className="font-semibold text-ink underline hover:text-flagGreen">
                  Cape Coast Castle
                </Link>{' '}
                and{' '}
                <Link
                  href="/tours/elmina-castle"
                  className="font-semibold text-ink underline hover:text-flagGreen">
                  Elmina Castle
                </Link>
                , where people were held, sometimes for months, before being
                taken through a seaward doorway to waiting ships.
              </p>
              <p>
                Millions of West Africans were carried across the Atlantic over
                the course of the trade. Both castles are UNESCO World Heritage
                Sites today and are kept as memorials as much as monuments; the
                guides who work in them are trained by the Ghana Museums and
                Monuments Board.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={sectionHeading}>The Asante and the wars of resistance</h2>
              <p>
                Inland, a different power was consolidating. Around 1701 the
                Asante state was formed at Kumasi under Osei Tutu, unifying
                Akan groups around the Golden Stool, the sacred object held to
                embody the soul of the nation. At its height the Asante Empire
                controlled much of present-day Ghana and traded directly with
                the Europeans on the coast.
              </p>
              <p>
                That brought a century of conflict with Britain. The last of
                these wars began in 1900, when the British governor demanded to
                sit on the Golden Stool. Yaa Asantewaa, queen mother of Ejisu,
                led the Asante into what became known as the War of the Golden
                Stool. The rising was defeated and Asante was annexed, but the
                stool itself was never surrendered.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={sectionHeading}>Abolition and the Gold Coast colony</h2>
              <p>
                Britain outlawed the slave trade across its empire with the
                Slave Trade Act of 1807. The act ended British participation in
                the traffic rather than the institution of slavery itself, and
                the trade continued under other flags for decades afterwards.
              </p>
              <p>
                In 1874 Britain formally declared the territory a Crown colony
                under the name Gold Coast. Cocoa, introduced late in the
                nineteenth century, grew into the colony&rsquo;s dominant export
                and remains central to the Ghanaian economy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={sectionHeading}>Independence, 1957</h2>
              <p>
                On 6 March 1957 the Gold Coast became the first colony in
                sub-Saharan Africa to win independence, with Kwame Nkrumah, who
                had led the campaign, as prime minister. Nkrumah understood the
                moment as continental rather than national. &ldquo;Our
                independence is meaningless,&rdquo; he said, &ldquo;unless it is
                linked up with the total liberation of Africa.&rdquo;
              </p>
              <p>
                More than thirty African countries became independent over the
                following decade. Ghana became a republic in 1960 with Nkrumah
                as its first president.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={sectionHeading}>A name, a flag, a currency</h2>
              <p>
                The new country took the name of the medieval empire, on the
                understanding that many of its people descended from those who
                had lived there. The flag, designed by Theodosia Okoh, carries
                the Pan-African red, gold and green with a black star at its
                centre &mdash; a symbol of African freedom that later gave the
                national football team its name.
              </p>
              <p>
                The currency changed too, from the British West African pound to
                the cedi. The word comes from the Akan for cowry shell: cowries
                were used as money across West Africa for centuries, introduced
                by traders from across the Sahara, and stayed in circulation
                until 1901.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={sectionHeading}>Coups, and the Fourth Republic</h2>
              <p>
                The decades after independence were unstable. Nkrumah was
                removed by a military coup in 1966, and further coups followed;
                Jerry Rawlings took power in 1979 and again in 1981, ruling for
                a decade before overseeing a return to civilian government.
              </p>
              <p>
                A new constitution in 1992 restored multi-party politics and
                established the Fourth Republic. Ghana has held regular
                elections since, with power passing between rival parties
                peacefully more than once &mdash; a record that has made the
                country one of the more stable democracies on the continent.
                Commercial oil production began offshore at the Jubilee Field in
                2010.
              </p>
            </section>
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
