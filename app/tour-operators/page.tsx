import type { Metadata } from 'next';
import Link from 'next/link';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Tour Operators',
  description: 'Licensed tour operators across Ghana.',
};

export default function TourOperatorsPage() {
  return (
    <StaticPage title="Tour Operators">
      <p>
        Tour Ghana does not yet list individual operators directly. In the
        meantime, the best way to plan a guided trip is to browse{' '}
        <Link href="/attractions" className="font-semibold text-white underline hover:text-flagGold">
          Top Attractions
        </Link>{' '}
        or{' '}
        <Link href="/regions" className="font-semibold text-white underline hover:text-flagGold">
          Highlights by Region
        </Link>{' '}
        and get in touch through{' '}
        <Link href="/contact" className="font-semibold text-white underline hover:text-flagGold">
          Contact Us
        </Link>
        , and the team can point you toward a licensed operator for that
        itinerary.
      </p>
    </StaticPage>
  );
}
