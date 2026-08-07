import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Tour Ghana accessibility statement.',
};

export default function AccessibilityPage() {
  return (
    <StaticPage title="Accessibility Statement">
      <p>
        Tour Ghana aims to make this site usable for as many visitors as
        possible, including people using screen readers, keyboard navigation
        and other assistive technology.
      </p>
      <p>
        If you run into a page or feature that is hard to use, get in touch
        via{' '}
        <a
          href="mailto:hello@tourghana.example"
          className="font-semibold text-white underline hover:text-flagGold">
          hello@tourghana.example
        </a>{' '}
        and let the team know what happened, so it can be fixed.
      </p>
    </StaticPage>
  );
}
