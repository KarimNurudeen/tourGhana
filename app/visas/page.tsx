import type { Metadata } from 'next';
import Link from 'next/link';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Visas & Diplomatic Missions',
  description: 'General visa and entry guidance for visiting Ghana.',
};

export default function VisasPage() {
  return (
    <StaticPage title="Visas & Diplomatic Missions">
      <p>
        Most nationalities need a visa in advance from a Ghana diplomatic
        mission before travelling. Requirements and processing times vary by
        nationality, so it is worth applying well ahead of a planned trip and
        confirming current requirements directly with the nearest Ghanaian
        embassy or consulate.
      </p>
      <p>
        For general planning around when to visit and what to bring, see{' '}
        <Link href="/travel-tips" className="font-semibold text-white underline hover:text-flagGold">
          Travel Tips
        </Link>
        .
      </p>
    </StaticPage>
  );
}
