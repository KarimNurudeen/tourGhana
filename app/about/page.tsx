import type { Metadata } from 'next';
import Link from 'next/link';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Tour Ghana, an independent travel guide to Ghana.',
};

const sectionHeading = 'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default function AboutPage() {
  return (
    <StaticPage title="About Tour Ghana">
      <p>
        Tour Ghana is an independent travel guide to the Republic of Ghana,
        covering attractions, culture and heritage, festivals, accommodation
        and licensed tour operators across all sixteen regions.
      </p>
      <p>
        The guide is built around real places, festivals and food, organised
        by region and by theme, so visitors can plan a trip around what they
        care about most, whether that is coastal forts, wildlife, craft
        villages or the calendar of festivals held throughout the year.
      </p>

      <h2 className={sectionHeading}>What&rsquo;s on the site</h2>
      <p>
        Every attraction listed includes practical detail beyond a photo and
        a paragraph: opening hours where they&rsquo;re fixed, how to get
        there from Accra or the nearest city, a short list of what to
        actually look for on the visit, and the nearby sites most people
        combine it with. Attractions can be browsed by{' '}
        <Link href="/regions" className="font-semibold text-ink underline hover:text-flagGreen">
          region
        </Link>
        , by{' '}
        <Link href="/attractions" className="font-semibold text-ink underline hover:text-flagGreen">
          category
        </Link>
        , or searched directly.
      </p>

      <h2 className={sectionHeading}>How it stays current</h2>
      <p>
        Content is reviewed and added to on an ongoing basis. Festival dates,
        opening hours and travel logistics change, so where something on this
        site is time-sensitive &mdash; a festival month, a visa policy, a
        border crossing &mdash; treat it as a starting point for planning and
        confirm the specifics closer to your travel date.
      </p>

      <h2 className={sectionHeading}>Get in touch</h2>
      <p>
        Spot something out of date, or have a place, festival or operator
        worth adding? Use the{' '}
        <Link href="/contact" className="font-semibold text-ink underline hover:text-flagGreen">
          contact page
        </Link>
        .
      </p>
    </StaticPage>
  );
}
