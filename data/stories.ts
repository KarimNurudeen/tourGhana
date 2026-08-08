import { images } from './images';
import { slugify, tourBySlug } from './tours';
import {
  CategoryColumn,
  HistoryEvent,
  LinkItem,
  Story,
  TopicBlock } from
'../types/content';

const fromTour = (slug: string): Story => {
  const tour = tourBySlug[slug];
  return {
    slug: tour.slug,
    title: tour.headline,
    region: tour.region,
    image: tour.image
  };
};

export const featuredRegionLinks: LinkItem[] = [
'Central Region',
'Ashanti Region',
'Volta Region',
'Northern Region'].map((label) => ({ label, href: `/region/${slugify(label)}` }));


export const heroLead: Story = fromTour('cape-coast-castle');

export const heroMore: Story[] = [
fromTour('elmina-castle'),
fromTour('elmina-harbour'),
fromTour('kakum-national-park'),
fromTour('independence-square')];


export const photoStrip: Story[] = [
fromTour('elmina-harbour'),
fromTour('bonwire-kente'),
fromTour('labadi-beach'),
fromTour('kakum-national-park'),
fromTour('homowo-festival'),
fromTour('aburi-gardens')];


export const topicBlocks: TopicBlock[] = [
{
  id: 'top-attractions',
  topic: 'Top Attractions',
  links: [
  { label: 'Kakum National Park', href: '/tours/kakum-national-park' },
  { label: 'Mole National Park', href: '/tours/mole-national-park' },
  { label: 'Nzulezu', href: '/tours/nzulezu' },
  { label: 'Wli Falls', href: '/tours/wli-waterfalls' }],

  lead: fromTour('kakum-national-park'),
  more: [
  fromTour('mole-national-park'),
  fromTour('nzulezu'),
  fromTour('paga-crocodile-pond')]

},
{
  id: 'culture',
  topic: 'Culture & Heritage',
  links: [
  { label: 'Kente weaving', href: '/tours/bonwire-kente' },
  { label: 'Adinkra symbols', href: '/category/culture-heritage' },
  { label: 'Manhyia Palace', href: '/tours/manhyia-palace' },
  { label: 'Handicrafts', href: '/category/culture-heritage' }],

  lead: fromTour('bonwire-kente'),
  more: [
  fromTour('manhyia-palace'),
  fromTour('nzulezu'),
  fromTour('elmina-castle')]

},
{
  id: 'festivals',
  topic: 'Festivals in Ghana',
  links: [
  { label: 'Homowo', href: '/tours/homowo-festival' },
  { label: 'Damba', href: '/tours/damba-festival' },
  { label: 'Akwasidae', href: '/category/festivals' },
  { label: 'Hogbetsotso', href: '/category/festivals' }],

  lead: fromTour('homowo-festival'),
  more: [
  fromTour('damba-festival'),
  fromTour('manhyia-palace'),
  fromTour('accra-food')]

}];


export const sidebarFeature: Story = fromTour('mole-national-park');

export const sidebarStories: Story[] = [
fromTour('elmina-harbour'),
fromTour('labadi-beach'),
fromTour('accra-food'),
fromTour('aburi-gardens')];


export const latestUpdates: Story[] = [
fromTour('wli-waterfalls'),
fromTour('nzulezu'),
fromTour('paga-crocodile-pond'),
fromTour('damba-festival'),
fromTour('bonwire-kente')];


export const forYouLead: Story = {
  ...fromTour('labadi-beach'),
  image: 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113845/tour-ghana/kempinski-hotel-accra.jpg',
  title: 'Where to stay in Ghana: beach lodges, city hotels and community stays'
};

export const forYouGrid: Story[] = [
fromTour('manhyia-palace'),
fromTour('nzulezu'),
fromTour('mole-national-park'),
fromTour('elmina-castle')];


export const historyFeature: Story = {
  ...fromTour('independence-square'),
  title: '1957: Ghana becomes the first sub-Saharan nation to gain independence'
};

export const historyEvents: HistoryEvent[] = [
{ year: '1482', text: 'Elmina Castle founded on the Gold Coast' },
{ year: '1701', text: 'The Asante Empire is formed at Kumasi' },
{ year: '1992', text: 'Fourth Republic constitution adopted' }];


export const mostRead: Story[] = [
fromTour('cape-coast-castle'),
fromTour('kakum-national-park'),
fromTour('mole-national-park'),
fromTour('accra-food')];


export const travelTips: {label: string;detail: string;}[] = [
{
  label: 'Visas & entry',
  detail: 'Most nationalities need a visa in advance from a Ghana mission'
},
{
  label: 'Best time to visit',
  detail: 'The dry season runs from November to March'
},
{
  label: 'Money',
  detail: 'The cedi is cash and mobile money first, cards are limited'
},
{
  label: 'Health',
  detail: 'Yellow fever certificate required, malaria prophylaxis advised'
}];


export const categoryColumns: CategoryColumn[] = [
{
  id: 'forts',
  title: 'FORTS & CASTLES',
  href: '/category/forts-castles',
  lead: fromTour('cape-coast-castle'),
  items: [
  fromTour('elmina-castle'),
  fromTour('elmina-harbour'),
  fromTour('independence-square')]

},
{
  id: 'wildlife',
  title: 'WILDLIFE & NATURE',
  href: '/category/parks-wildlife',
  lead: fromTour('mole-national-park'),
  items: [
  fromTour('kakum-national-park'),
  fromTour('wli-waterfalls'),
  fromTour('paga-crocodile-pond')]

},
{
  id: 'events',
  title: 'SPECIAL EVENTS',
  href: '/category/festivals',
  lead: fromTour('homowo-festival'),
  items: [
  fromTour('damba-festival'),
  fromTour('manhyia-palace'),
  fromTour('bonwire-kente')]

},
{
  id: 'food',
  title: 'FOOD & DINING',
  href: '/category/food-dining',
  lead: fromTour('accra-food'),
  items: [
  fromTour('labadi-beach'),
  fromTour('aburi-gardens'),
  fromTour('nzulezu')]

}];


export const photography: Story[] = [
fromTour('manhyia-palace'),
fromTour('elmina-harbour'),
fromTour('homowo-festival')];