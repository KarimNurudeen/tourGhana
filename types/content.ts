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

export type PhotoCategory = 'exterior' | 'rooms' | 'amenities';

export type FestivalTiming = {
  // 1-12, months the festival can fall in
  months: number[];
  // When the exact day follows a fixed weekday rule (e.g. "first Saturday in May"),
  // this lets the calendar compute and highlight the next real occurrence.
  rule?: {
    month: number; // 1-12
    weekday: number; // 0 (Sun) - 6 (Sat)
    occurrence: number; // 1 = first, 2 = second, ...
  };
  // Shown alongside the calendar for festivals that can't be pinned to a fixed
  // weekday (lunar calendar, staggered by town, biennial, etc).
  note?: string;
};

export type Tour = {
  slug: string;
  name: string;
  headline: string;
  region: string;
  category: string;
  summary: string;
  image: string;
  // Required by CC BY-SA when the image comes from a source like Wikimedia
  // Commons rather than the site's own licensed Cloudinary uploads.
  imageCredit?: string;
  gallery: string[];
  // Only set for accommodation with photos distinct enough to sort by type;
  // keyed by image src (from `image` or `gallery`).
  photoCategories?: Partial<Record<string, PhotoCategory>>;
  videos?: TourVideo[];
  festivalTiming?: FestivalTiming;
  coordinates: Coordinates;
  overview: string[];
  highlights: string[];
  quickFacts: QuickFact[];
  gettingThere: string[];
  tips: string[];
  nearby: string[];
};