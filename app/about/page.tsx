import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'About Tour Ghana',
  description: 'About Tour Ghana, an independent travel guide to Ghana.',
};

export default function AboutPage() {
  return (
    <StaticPage title="About Tour Ghana">
      <p>
        Tour Ghana is an independent travel guide to the Republic of Ghana,
        covering attractions, culture and heritage, festivals, accommodation
        and licensed tour operators across all sixteen regions.
      </p>
      <p>
        The guide is built around real places, festivals and food, organised
        by region and by theme, so visitors can plan a trip around what they
        care about most, whether that is coastal forts, wildlife, craft
        villages or the calendar of festivals held throughout the year.
      </p>
    </StaticPage>
  );
}
