import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageLoader } from '@/components/PageLoader';
import { getNavigation } from '@/lib/api';

export const metadata: Metadata = {
  // Pages set short titles ('Tour Operators', 'Top Attractions'), so the
  // template appends the site name rather than each page repeating it.
  title: {
    default: 'Tour Ghana — The Gateway to Africa',
    template: '%s | Tour Ghana',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { primaryNav, tickerLinks } = await getNavigation();

  return (
    <html lang="en">
      <body className="flex min-h-full w-full flex-col bg-white text-ink">
        <PageLoader />
        <SmoothScroll />
        <Header primaryNav={primaryNav} tickerLinks={tickerLinks} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
