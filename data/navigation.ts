import { NavItem, LinkItem } from '../types/content';

export const primaryNav: NavItem[] = [
{
  label: 'VISITING',
  children: [
  { label: 'History of Ghana', href: '/history' },
  { label: 'Visas & Diplomatic Missions', href: '/visas' },
  { label: 'Travel Tips', href: '/travel-tips' },
  { label: 'Where To Stay', href: '/where-to-stay' },
  { label: 'Food & Dining', href: '/category/food-dining' }]

},
{
  label: 'TOURING',
  children: [
  { label: 'Highlights by Region', href: '/regions' },
  { label: 'Culture & Heritage', href: '/category/culture-heritage' },
  { label: 'Festivals in Ghana', href: '/category/festivals' },
  { label: 'Forts & Castles', href: '/category/forts-castles' },
  { label: 'Handicrafts', href: '/category/culture-heritage' }]

},
{ label: 'TOP ATTRACTIONS', href: '/attractions' },
{ label: 'VIDEOS', href: '/videos' },
{ label: 'SPECIAL EVENTS', href: '/category/festivals' },
{ label: 'ACCOMMODATION', href: '/where-to-stay' },
{ label: 'TOUR OPERATORS', href: '/tour-operators' },
{ label: 'CONTACT', href: '/contact' }];


export const tickerLinks: LinkItem[] = [
{ label: 'PANAFEST & Emancipation Day', href: '/category/festivals' },
{ label: 'Chale Wote Street Art Festival', href: '/category/festivals' },
{ label: 'Visa on arrival update', href: '/visas' },
{ label: 'Harmattan travel advice', href: '/travel-tips' }];


export const regionLinks: string[] = [
'Greater Accra',
'Central',
'Ashanti',
'Volta',
'Northern',
'Western'];