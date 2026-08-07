import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Tour Ghana.',
};

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p>
        Questions about a destination, a correction to a listing, or a
        partnership enquiry &mdash; get in touch and the team will get back to
        you.
      </p>
      <p>
        <a
          href="mailto:hello@tourghana.example"
          className="font-semibold text-white underline hover:text-flagGold">
          hello@tourghana.example
        </a>
      </p>
    </StaticPage>
  );
}
