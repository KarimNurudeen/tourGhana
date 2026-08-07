import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Tour Ghana privacy policy.',
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>
        Tour Ghana keeps the data it collects to a minimum, and only uses it
        to operate and improve this site. Information is not sold to third
        parties.
      </p>
      <p>
        If you contact the site directly, whatever you share (such as your
        email address) is used only to respond to you.
      </p>
    </StaticPage>
  );
}
