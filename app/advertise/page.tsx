import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Advertise With Us',
  description: 'Advertising and partnership enquiries for Tour Ghana.',
};

export default function AdvertisePage() {
  return (
    <StaticPage title="Advertise With Us">
      <p>
        Tour Ghana works with hotels, tour operators and tourism boards
        looking to reach travellers planning a trip to Ghana.
      </p>
      <p>
        For rates and partnership options, reach out via{' '}
        <a
          href="mailto:hello@tourghana.example"
          className="font-semibold text-white underline hover:text-flagGold">
          hello@tourghana.example
        </a>
        .
      </p>
    </StaticPage>
  );
}
