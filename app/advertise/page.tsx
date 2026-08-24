import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Advertise With Us',
  description: 'Advertising and partnership enquiries for Tour Ghana.',
};

const sectionHeading = 'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default function AdvertisePage() {
  return (
    <StaticPage title="Advertise With Us">
      <p>
        Tour Ghana works with hotels, tour operators, tourism boards and
        travel-adjacent brands looking to reach people actively planning a
        trip to Ghana &mdash; not a general audience, but readers already on
        a specific region or attraction page, deciding where to stay or who
        to book with.
      </p>

      <h2 className={sectionHeading}>Ways to work together</h2>
      <p>
        Placement on relevant region or category pages, inclusion in the
        Tour Operators and Where To Stay guides, and sponsored content built
        around a specific place or festival are all options. What fits best
        depends on what you&rsquo;re trying to reach &mdash; get in touch and
        the details can be worked out from there.
      </p>

      <h2 className={sectionHeading}>Getting in touch</h2>
      <p>
        For rates and partnership options, reach out via{' '}
        <a
          href="mailto:hello@tourghana.example"
          className="font-semibold text-ink underline hover:text-flagGreen">
          hello@tourghana.example
        </a>{' '}
        with a short description of what you&rsquo;re looking for and which
        pages or regions are most relevant to you.
      </p>
    </StaticPage>
  );
}
