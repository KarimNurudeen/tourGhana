import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Tour Ghana.',
};

const sectionHeading = 'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p>
        Questions about a destination, a correction to a listing, or a
        partnership enquiry &mdash; get in touch and the team will get back
        to you.
      </p>

      <h2 className={sectionHeading}>What to include</h2>
      <p>
        A few common reasons people write in: a listing that&rsquo;s out of
        date (opening hours, a festival date, a closed road), a place or
        festival that should be on the site but isn&rsquo;t, a tour operator
        enquiry, or a media and advertising enquiry. Mentioning which of
        these it is, and linking the page in question if there is one,
        gets you a faster answer.
      </p>

      <h2 className={sectionHeading}>Email</h2>
      <p>
        <a
          href="mailto:hello@tourghana.example"
          className="font-semibold text-ink underline hover:text-flagGreen">
          hello@tourghana.example
        </a>
      </p>
      <p>
        The team aims to reply within a few business days. For anything
        time-critical &mdash; a trip departing imminently &mdash; a direct
        booking or a licensed tour operator will always be faster than this
        site.
      </p>
    </StaticPage>
  );
}
