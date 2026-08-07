import type { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Tour Ghana terms of use.',
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Use">
      <p>
        This site is provided as a general travel guide to Ghana. Content is
        provided for planning purposes and, while every effort is made to
        keep it accurate, opening hours, prices, routes and other details
        change &mdash; always confirm details that matter before you travel.
      </p>
      <p>
        Text, photography and design on this site belong to Tour Ghana or
        its licensors unless stated otherwise, and may not be reproduced
        without permission.
      </p>
    </StaticPage>
  );
}
