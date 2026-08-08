export type LinkItem = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: LinkItem[];
};

export type Story = {
  title: string;
  slug?: string;
  region?: string;
  image?: string;
  youtubeId?: string;
};

export type TopicBlock = {
  id: string;
  topic: string;
  links: LinkItem[];
  lead: Story;
  more: Story[];
};

export type CategoryColumn = {
  id: string;
  title: string;
  href: string;
  lead: Story;
  items: Story[];
};

export type ShortStory = {
  title: string;
  image: string;
  duration: string;
  slug: string;
  youtubeId?: string;
};

export type HistoryEvent = {
  year: string;
  text: string;
};

export type QuickFact = {
  label: string;
  value: string;
};

export type TourVideo = {
  src: string;
  poster: string;
  caption: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Tour = {
  slug: string;
  name: string;
  headline: string;
  region: string;
  category: string;
  summary: string;
  image: string;
  gallery: string[];
  videos?: TourVideo[];
  coordinates: Coordinates;
  overview: string[];
  highlights: string[];
  quickFacts: QuickFact[];
  gettingThere: string[];
  tips: string[];
  nearby: string[];
};