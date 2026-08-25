import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Tour Ghana accessibility statement.',
};

const sectionHeading = 'border-t border-rule pt-5 text-[22px] font-black uppercase tracking-tight text-ink';

export default function AccessibilityPage() {
  return (
    <StaticPage title="Accessibility Statement">
      <p>
        Tour Ghana aims to make this site usable for as many visitors as
        possible, including people using screen readers, keyboard navigation
        and other assistive technology.
      </p>

      <h2 className={sectionHeading}>What&rsquo;s in place today</h2>
      <p>
        Every page has a single, clearly landmarked main content area.
        Interactive controls that are icon-only, such as the search and menu
        buttons in the header, carry a text label for screen readers even
        though nothing is printed on screen. Overlays &mdash; search, the
        photo gallery, video playback &mdash; can be closed with the Escape
        key as well as a visible close button, and the page behind them
        stops scrolling while they&rsquo;re open so keyboard and screen
        reader focus doesn&rsquo;t get lost underneath. Photographs that
        carry information have a written description; images that are purely
        decorative are marked as such so screen readers skip over them
        instead of reading out noise.
      </p>

      <h2 className={sectionHeading}>Known limitations</h2>
      <p>
        Some of the site&rsquo;s motion &mdash; the entrance animation,
        scroll reveals, the page transition &mdash; does not yet adapt to a
        reduced-motion preference set at the operating system level. That is
        a known gap rather than a deliberate choice, and is on the list to
        fix.
      </p>

      <h2 className={sectionHeading}>Tell us what&rsquo;s not working</h2>
      <p>
        If you run into a page or feature that is hard to use with a screen
        reader, keyboard-only navigation, or any other assistive technology,
        get in touch via{' '}
        <a
          href="mailto:hello@tourghana.com"
          className="font-semibold text-ink underline hover:text-flagGreen">
          hello@tourghana.com
        </a>{' '}
        with what you were trying to do and what happened, so it can be
        fixed.
      </p>
    </StaticPage>
  );
}
