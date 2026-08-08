import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageLoader } from '@/components/PageLoader';

export const metadata: Metadata = {
  title: 'News-Inspired Tour Design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-full w-full flex-col bg-black text-white">
        <script
          // Runs synchronously during HTML parsing, before the browser's first
          // paint and before React hydrates. This is the only point in time
          // that can suppress the loader without a visible flash — anything
          // in a React effect necessarily runs after the initial paint.
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('tour-ghana-loaded')){document.documentElement.classList.add('skip-loader');}}catch(e){}`,
          }}
        />
        <PageLoader />
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
