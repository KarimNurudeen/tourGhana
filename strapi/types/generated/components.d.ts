import type { Schema, Struct } from '@strapi/strapi';

export interface HistorySection extends Struct.ComponentSchema {
  collectionName: 'components_history_sections';
  info: {
    displayName: 'History Section';
    icon: 'bulletList';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'Nav Item';
    icon: 'bulletList';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.link', true>;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TourCoordinates extends Struct.ComponentSchema {
  collectionName: 'components_tour_coordinates';
  info: {
    displayName: 'Coordinates';
    icon: 'pinMap';
  };
  attributes: {
    lat: Schema.Attribute.Decimal & Schema.Attribute.Required;
    lng: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface TourFestivalRule extends Struct.ComponentSchema {
  collectionName: 'components_tour_festival_rules';
  info: {
    displayName: 'Festival Rule';
    icon: 'calendar';
  };
  attributes: {
    month: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      >;
    occurrence: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    weekday: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 0;
        },
        number
      >;
  };
}

export interface TourFestivalTiming extends Struct.ComponentSchema {
  collectionName: 'components_tour_festival_timings';
  info: {
    displayName: 'Festival Timing';
    icon: 'calendar';
  };
  attributes: {
    months: Schema.Attribute.JSON;
    note: Schema.Attribute.Text;
    rule: Schema.Attribute.Component<'tour.festival-rule', false>;
  };
}

export interface TourQuickFact extends Struct.ComponentSchema {
  collectionName: 'components_tour_quick_facts';
  info: {
    displayName: 'Quick Fact';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TourVideo extends Struct.ComponentSchema {
  collectionName: 'components_tour_videos';
  info: {
    displayName: 'Video';
    icon: 'video';
  };
  attributes: {
    caption: Schema.Attribute.String;
    poster: Schema.Attribute.Media<'images'>;
    src: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'history.section': HistorySection;
      'shared.link': SharedLink;
      'shared.nav-item': SharedNavItem;
      'tour.coordinates': TourCoordinates;
      'tour.festival-rule': TourFestivalRule;
      'tour.festival-timing': TourFestivalTiming;
      'tour.quick-fact': TourQuickFact;
      'tour.video': TourVideo;
    }
  }
}
