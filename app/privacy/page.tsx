import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Tour Ghana privacy policy.',
};

const sectionHeading = 'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>
        Tour Ghana keeps the data it collects to a minimum, and only uses it
        to operate and improve this site. Information is not sold to third
        parties.
      </p>

      <h2 className={sectionHeading}>What this site does not do</h2>
      <p>
        There are no user accounts, no analytics trackers and no advertising
        cookies on this site. The one piece of browser storage it uses is a
        small flag saved to your browser&rsquo;s session storage so the
        entrance animation doesn&rsquo;t replay on every page within the
        same visit &mdash; it holds no personal information and clears when
        your browser session ends.
      </p>

      <h2 className={sectionHeading}>Embedded third-party content</h2>
      <p>
        Some pages embed YouTube videos and Google Maps directions. When you
        play an embedded video or request directions, YouTube or Google may
        set their own cookies and collect data according to their own
        privacy policies &mdash; that happens on their side, governed by
        their terms, not this site&rsquo;s.
      </p>

      <h2 className={sectionHeading}>If you contact us</h2>
      <p>
        If you contact the site directly, whatever you share (such as your
        email address) is used only to respond to you, and isn&rsquo;t added
        to any mailing list or shared onward.
      </p>
    </StaticPage>
  );
}
