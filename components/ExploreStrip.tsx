import Link from 'next/link';
import {
  CalendarDaysIcon,
  CameraIcon,
  LandmarkIcon,
  MapIcon,
  TentTreeIcon,
  UtensilsIcon,
} from 'lucide-react';

const ways = [
  { label: 'Highlights by Region', Icon: MapIcon, tone: 'bg-red-100', to: '/tours/independence-square' },
  { label: 'Forts & Castles', Icon: LandmarkIcon, tone: 'bg-amber-100', to: '/tours/cape-coast-castle' },
  { label: 'Parks & Wildlife', Icon: TentTreeIcon, tone: 'bg-emerald-100', to: '/tours/mole-national-park' },
  { label: 'Festivals', Icon: CalendarDaysIcon, tone: 'bg-sky-100', to: '/tours/homowo-festival' },
  { label: 'Food & Dining', Icon: UtensilsIcon, tone: 'bg-orange-100', to: '/tours/accra-food' },
  { label: 'Handicrafts', Icon: CameraIcon, tone: 'bg-violet-100', to: '/tours/bonwire-kente' },
];

export function ExploreStrip() {
  return (
    <section aria-labelledby="ways-to-explore">
      <h2
        id="ways-to-explore"
        className="text-[22px] font-black tracking-tight text-white">
        Ways to explore Ghana
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
        {ways.map(({ label, Icon, tone, to }) => (
          <li key={label}>
            <Link
              href={to}
              className="group flex items-center gap-3 text-[15px] font-bold text-white hover:text-flagGold">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center ${tone}`}>
                <Icon className="h-5 w-5 text-black" />
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
