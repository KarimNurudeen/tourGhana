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
  // Where the card leads: a related place page, or this event on /history.
  href?: string;
  placeName?: string | null;
  placeImage?: string | null;
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

export type YouTubeVideo = {
  videoId: string;
  title: string;
  channel: string;
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
  // Videos embedded from YouTube (uploaded MP4s are in `videos`).
  youtubeVideos?: YouTubeVideo[];
  festivalTiming?: FestivalTiming;
  // Absent for guide-derived places that have no map pin yet.
  coordinates?: Coordinates | null;
  overview: string[];
  highlights: string[];
  quickFacts: QuickFact[];
  gettingThere: string[];
  tips: string[];
  nearby: string[];
  // The page's full text as it originally appeared, as titled sections.
  sourceText?: SourceSection[];
  // Worked out by the API from where places are (not hand-picked). "distance":
  // within ~80 km, nearest first; "region": same-region fallback with no
  // distances; "none": nothing to show.
  nearbyMode?: NearbyMode;
  nearbyPlaces?: NearbyPlace[];
  nearbyStaysMode?: NearbyMode;
  nearbyStays?: NearbyPlace[];
};

export type NearbyMode = 'distance' | 'region' | 'none';

export type NearbyPlace = {
  slug: string;
  name: string;
  region: string;
  category: string;
  image: string;
  // Whole kilometres (0 = under a kilometre); null when there is no distance.
  distanceKm: number | null;
};

export type SourceSection = {
  heading: string;
  paragraphs: string[];
};

export type GuideSection = {
  heading: string | null;
  paragraphs: string[];
  image?: string | null;
  imageCredit?: string | null;
};

export type GuidePage = {
  slug: string;
  title: string;
  group: 'visiting' | 'touring' | 'events' | 'services' | 'about';
  intro: string | null;
  sortOrder: number;
  image?: string | null;
  imageCredit?: string | null;
  // Places picked for the page (with distance from `distanceFrom` when set).
  featuredHeading?: string | null;
  featured?: NearbyPlace[];
  distanceFrom?: string | null;
  links?: LinkItem[];
  showTravelAgents?: boolean;
  sections: GuideSection[];
};

export type FestivalListing = {
  name: string;
  month: string;
  monthNumber: number | null;
  place: string | null;
  description: string | null;
  listType: 'calendar' | 'monthly' | 'other';
  image?: string | null;
  imageCredit?: string | null;
};

export type AccommodationListing = {
  name: string;
  region: string;
  location: string;
  phone: string | null;
  emailWebsite: string | null;
  grade: string;
};

export type TourOperatorListing = {
  name: string;
  category: string;
  agencyType: string;
  location: string;
  postalAddress: string;
  contact: string[];
};

export type Paged<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};