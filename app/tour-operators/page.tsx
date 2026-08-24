import type { Metadata } from 'next';
import Link from 'next/link';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Tour Operators',
  description: 'Licensed tour operators across Ghana.',
};

const sectionHeading = 'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default function TourOperatorsPage() {
  return (
    <StaticPage title="Tour Operators">
      <p>
        Tour Ghana does not yet list individual operators directly. In the
        meantime, the best way to plan a guided trip is to browse{' '}
        <Link href="/attractions" className="font-semibold text-ink underline hover:text-flagGreen">
          Top Attractions
        </Link>{' '}
        or{' '}
        <Link href="/regions" className="font-semibold text-ink underline hover:text-flagGreen">
          Highlights by Region
        </Link>{' '}
        and get in touch through{' '}
        <Link href="/contact" className="font-semibold text-ink underline hover:text-flagGreen">
          Contact Us
        </Link>
        , and the team can point you toward a licensed operator for that
        itinerary.
      </p>

      <h2 className={sectionHeading}>What to check before booking</h2>
      <p>
        Whoever you book with, it&rsquo;s worth confirming they hold a
        current licence from the Ghana Tourism Authority, that the price
        quoted states clearly what it covers (guide, transport, park and
        entry fees, meals), and that they can name the specific sites on the
        itinerary rather than a vague regional tour. For coastal
        forts and national parks in particular, ask whether the guide is the
        one certified on-site by the Ghana Museums and Monuments Board or
        the park authority, since some sites require it.
      </p>

      <h2 className={sectionHeading}>Are you an operator?</h2>
      <p>
        If you run a licensed tour operation in Ghana and want to be
        considered for a future listing, reach out via{' '}
        <Link href="/contact" className="font-semibold text-ink underline hover:text-flagGreen">
          Contact Us
        </Link>{' '}
        with your licence details and the regions or itineraries you cover.
      </p>
    </StaticPage>
  );
}
