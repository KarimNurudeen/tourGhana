"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photography = exports.categoryColumns = exports.travelTips = exports.mostRead = exports.historyEvents = exports.historyFeature = exports.forYouGrid = exports.forYouLead = exports.latestUpdates = exports.sidebarStories = exports.sidebarFeature = exports.topicBlocks = exports.photoStrip = exports.heroMore = exports.heroLead = exports.featuredRegionLinks = void 0;
const tours_1 = require("./tours");
const fromTour = (slug) => {
    const tour = tours_1.tourBySlug[slug];
    return {
        slug: tour.slug,
        title: tour.headline,
        region: tour.region,
        image: tour.image
    };
};
exports.featuredRegionLinks = [
    'Central Region',
    'Ashanti Region',
    'Volta Region',
    'Northern Region'
].map((label) => ({ label, href: `/region/${(0, tours_1.slugify)(label)}` }));
exports.heroLead = fromTour('cape-coast-castle');
exports.heroMore = [
    fromTour('elmina-castle'),
    fromTour('elmina-harbour'),
    fromTour('kakum-national-park'),
    fromTour('independence-square')
];
exports.photoStrip = [
    fromTour('elmina-harbour'),
    fromTour('bonwire-kente'),
    fromTour('labadi-beach'),
    fromTour('kakum-national-park'),
    fromTour('homowo-festival'),
    fromTour('aburi-gardens')
];
exports.topicBlocks = [
    {
        id: 'top-attractions',
        topic: 'Top Attractions',
        links: [
            { label: 'Kakum National Park', href: '/tours/kakum-national-park' },
            { label: 'Mole National Park', href: '/tours/mole-national-park' },
            { label: 'Nzulezu', href: '/tours/nzulezu' },
            { label: 'Wli Falls', href: '/tours/wli-waterfalls' }
        ],
        lead: fromTour('kakum-national-park'),
        more: [
            fromTour('mole-national-park'),
            fromTour('nzulezu'),
            fromTour('paga-crocodile-pond')
        ]
    },
    {
        id: 'culture',
        topic: 'Culture & Heritage',
        links: [
            { label: 'Kente weaving', href: '/tours/bonwire-kente' },
            { label: 'Adinkra symbols', href: '/category/culture-heritage' },
            { label: 'Manhyia Palace', href: '/tours/manhyia-palace' },
            { label: 'Handicrafts', href: '/category/culture-heritage' }
        ],
        lead: fromTour('bonwire-kente'),
        more: [
            fromTour('manhyia-palace'),
            fromTour('nzulezu'),
            fromTour('elmina-castle')
        ]
    },
    {
        id: 'festivals',
        topic: 'Festivals in Ghana',
        links: [
            { label: 'Homowo', href: '/tours/homowo-festival' },
            { label: 'Damba', href: '/tours/damba-festival' },
            { label: 'Akwasidae', href: '/tours/akwasidae-festival' },
            { label: 'Hogbetsotso', href: '/tours/hogbetsotso-festival' }
        ],
        lead: fromTour('aboakyer-festival'),
        more: [
            fromTour('homowo-festival'),
            fromTour('bakatue-festival'),
            fromTour('chale-wote-festival')
        ]
    }
];
exports.sidebarFeature = fromTour('mole-national-park');
exports.sidebarStories = [
    fromTour('elmina-harbour'),
    fromTour('labadi-beach'),
    fromTour('accra-food'),
    fromTour('aburi-gardens')
];
exports.latestUpdates = [
    fromTour('wli-waterfalls'),
    fromTour('nzulezu'),
    fromTour('paga-crocodile-pond'),
    fromTour('damba-festival'),
    fromTour('bonwire-kente')
];
exports.forYouLead = {
    ...fromTour('kempinski-hotel-accra'),
    title: 'Where to stay in Ghana: beach lodges, city hotels and community stays'
};
exports.forYouGrid = [
    fromTour('coconut-grove-beach-resort-elmina'),
    fromTour('golden-tulip-kumasi-city'),
    fromTour('zaina-lodge-mole'),
    fromTour('labadi-beach-hotel')
];
exports.historyFeature = {
    ...fromTour('independence-square'),
    title: '1957: Ghana becomes the first sub-Saharan nation to gain independence'
};
exports.historyEvents = [
    { year: '1471', text: 'Portuguese traders are the first Europeans to reach the Gold Coast' },
    { year: '1482', text: 'Elmina Castle founded on the Gold Coast' },
    { year: '1701', text: 'The Asante Empire is formed at Kumasi' },
    { year: '1874', text: 'Britain declares the Gold Coast a Crown colony' },
    { year: '1900', text: 'Yaa Asantewaa leads the Asante war against British rule' },
    { year: '1957', text: 'Ghana becomes the first sub-Saharan nation to gain independence' },
    { year: '1960', text: 'Ghana declared a republic, Kwame Nkrumah becomes first president' },
    { year: '1966', text: 'A military coup removes Nkrumah from power' },
    { year: '1981', text: 'Jerry Rawlings takes power in a second coup' },
    { year: '1992', text: 'Fourth Republic constitution adopted, multi-party rule restored' },
    { year: '2010', text: 'Commercial oil production begins at the Jubilee Field' }
];
exports.mostRead = [
    fromTour('cape-coast-castle'),
    fromTour('kakum-national-park'),
    fromTour('mole-national-park'),
    fromTour('accra-food')
];
exports.travelTips = [
    {
        label: 'Visas & entry',
        detail: 'Most travellers now apply online for an Electronic Travel Authorization before flying; ECOWAS nationals remain visa-free'
    },
    {
        label: 'Best time to visit',
        detail: 'The dry season runs from November to March'
    },
    {
        label: 'Money',
        detail: 'The cedi is cash and mobile money first, cards are limited outside major hotels'
    },
    {
        label: 'Health',
        detail: 'Yellow fever certificate required, malaria prophylaxis advised'
    },
    {
        label: 'Getting around',
        detail: 'Shared taxis and tro-tros cover most towns; Uber and Bolt operate in Accra and Kumasi'
    },
    {
        label: 'Language',
        detail: 'English is the official language; Twi and other local languages are widely spoken'
    },
    {
        label: 'Connectivity',
        detail: 'Local SIM cards from MTN, Telecel or AirtelTigo are cheap and widely available'
    },
    {
        label: 'Electricity',
        detail: '230V, UK-style three-pin (type G) sockets are standard'
    },
    {
        label: 'Dress',
        detail: 'Modest dress is expected at chieftaincy palaces, castles and religious sites'
    },
    {
        label: 'Tipping',
        detail: 'Not obligatory, but appreciated for guides and drivers; small notes are easiest'
    }
];
exports.categoryColumns = [
    {
        id: 'forts',
        title: 'FORTS & CASTLES',
        href: '/category/forts-castles',
        lead: fromTour('cape-coast-castle'),
        items: [
            fromTour('elmina-castle'),
            fromTour('elmina-harbour'),
            fromTour('independence-square')
        ]
    },
    {
        id: 'wildlife',
        title: 'WILDLIFE & NATURE',
        href: '/category/parks-wildlife',
        lead: fromTour('mole-national-park'),
        items: [
            fromTour('kakum-national-park'),
            fromTour('wli-waterfalls'),
            fromTour('paga-crocodile-pond')
        ]
    },
    {
        id: 'events',
        title: 'SPECIAL EVENTS',
        href: '/category/festivals',
        lead: fromTour('fetu-afahye-festival'),
        items: [
            fromTour('odwira-festival'),
            fromTour('kobine-festival'),
            fromTour('panafest-emancipation-day')
        ]
    },
    {
        id: 'food',
        title: 'FOOD & DINING',
        href: '/category/food-dining',
        lead: fromTour('accra-food'),
        items: [
            fromTour('labadi-beach'),
            fromTour('aburi-gardens'),
            fromTour('nzulezu')
        ]
    }
];
exports.photography = [
    fromTour('manhyia-palace'),
    fromTour('elmina-harbour'),
    fromTour('homowo-festival')
];
