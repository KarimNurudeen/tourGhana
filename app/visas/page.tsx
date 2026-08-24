import type { Metadata } from 'next';
import Link from 'next/link';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Visas & Diplomatic Missions',
  description: 'General visa and entry guidance for visiting Ghana.',
};

const sectionHeading = 'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default function VisasPage() {
  return (
    <StaticPage title="Visas & Diplomatic Missions">
      <p>
        Ghana&rsquo;s entry rules changed recently, and this page reflects
        the policy as most recently reported &mdash; but immigration policy
        is exactly the kind of thing that shifts without much notice.
        Confirm directly with{' '}
        <a
          href="https://evisa.immigration.gov.gh"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ink underline hover:text-flagGreen">
          evisa.immigration.gov.gh
        </a>{' '}
        or the nearest Ghanaian mission before you book.
      </p>

      <h2 className={sectionHeading}>Electronic Travel Authorization</h2>
      <p>
        Ghana has moved to a mandatory pre-travel Electronic Travel
        Authorization (ETA) for tourism and business visits, applied for in
        advance online rather than issued on arrival at the airport &mdash;
        visa-on-arrival has been discontinued for the nationalities that
        previously used it. Apply before you fly; this isn&rsquo;t something
        to leave for the airport queue.
      </p>

      <h2 className={sectionHeading}>ECOWAS and AES nationals</h2>
      <p>
        Citizens of ECOWAS member states, and of the Alliance of Sahel
        States, continue to enter visa-free with just a valid passport.
      </p>

      <h2 className={sectionHeading}>Other African Union nationals</h2>
      <p>
        Nationals of African Union member states outside ECOWAS and the AES
        are eligible for the no-cost ETA, applied for online in advance
        rather than granted free on arrival as under the previous policy.
      </p>

      <h2 className={sectionHeading}>Everyone else</h2>
      <p>
        Other nationalities should expect to apply for a visa or ETA in
        advance through the e-visa portal or the nearest Ghana diplomatic
        mission. Requirements and processing times vary by nationality, so
        apply well ahead of a planned trip.
      </p>

      <p>
        For general planning around when to visit and what to bring, see{' '}
        <Link href="/travel-tips" className="font-semibold text-ink underline hover:text-flagGreen">
          Travel Tips
        </Link>
        .
      </p>
    </StaticPage>
  );
}
