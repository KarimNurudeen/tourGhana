import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Tour Ghana terms of use.',
};

const sectionHeading = 'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Use">
      <p>
        This site is provided as a general travel guide to Ghana. Content is
        provided for planning purposes and, while every effort is made to
        keep it accurate, opening hours, prices, routes and other details
        change &mdash; always confirm details that matter before you travel.
      </p>

      <h2 className={sectionHeading}>Ownership</h2>
      <p>
        Text, photography and design on this site belong to Tour Ghana or
        its licensors unless stated otherwise, and may not be reproduced
        without permission.
      </p>

      <h2 className={sectionHeading}>Third-party links and embeds</h2>
      <p>
        Pages on this site link to and embed content from third parties,
        including tourism authorities, YouTube and Google Maps. Tour Ghana
        doesn&rsquo;t control what those third parties publish and isn&rsquo;t
        responsible for their content or availability.
      </p>

      <h2 className={sectionHeading}>No guarantee, no liability</h2>
      <p>
        The site is provided as-is, without a guarantee that any particular
        page is complete, current or error-free. Tour Ghana isn&rsquo;t
        liable for decisions made, or costs incurred, based on information
        found here &mdash; treat it as a starting point, not a substitute
        for checking directly with the place, operator or authority
        concerned.
      </p>

      <h2 className={sectionHeading}>Changes</h2>
      <p>
        These terms may be updated from time to time as the site changes.
        Continuing to use the site after an update means you accept the
        current version.
      </p>
    </StaticPage>
  );
}
