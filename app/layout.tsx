import type { Metadata } from 'next';
import './globals.css';
import { AppChrome } from '@/components/AppChrome';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageLoader } from '@/components/PageLoader';
import { getNavigation, getTours } from '@/lib/api';

export const metadata: Metadata = {
  // Pages set short titles ('Tour Operators', 'Top Attractions'), so the
  // template appends the site name rather than each page repeating it.
  title: {
    default: 'Tour Ghana — The Gateway to Africa',
    template: '%s | Tour Ghana',
  },
  // Without this, search engines compose a snippet from whatever body text
  // they find — which is how the footer blurb ended up as the Google
  // description for the homepage.
  description:
    'Plan a trip to Ghana: attractions, culture and heritage, festivals, ' +
    'accommodation and licensed tour operators across all sixteen regions.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ primaryNav, tickerLinks }, tours] = await Promise.all([getNavigation(), getTours()]);

  return (
    <html lang="en">
      <body className="pb-tabbar flex min-h-full w-full flex-col bg-surface text-ink">
        <PageLoader />
        <SmoothScroll />
        <AppChrome primaryNav={primaryNav} tickerLinks={tickerLinks} tours={tours} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
