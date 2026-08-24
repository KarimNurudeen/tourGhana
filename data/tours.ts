import { Tour } from '../types/content';
import { images } from './images';

export const tours: Tour[] = [
{
  slug: 'cape-coast-castle',
  name: 'Cape Coast Castle',
  headline:
  'Cape Coast Castle: walking the stone corridors where Ghana’s Atlantic story is told',
  region: 'Central Region',
  category: 'Forts & Castles',
  summary:
  'A UNESCO World Heritage site on the Gulf of Guinea, Cape Coast Castle is the most visited monument on Ghana’s coast and the anchor of every heritage itinerary.',
  image: 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043083/tour-ghana/cape-coast-castle-v2-2.jpg',
  gallery: [
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043081/tour-ghana/cape-coast-castle-v2-1.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043083/tour-ghana/cape-coast-castle-v2-2.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043085/tour-ghana/cape-coast-castle-v2-3.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043087/tour-ghana/cape-coast-castle-v2-4.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043089/tour-ghana/cape-coast-castle-v2-5.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043091/tour-ghana/cape-coast-castle-v2-6.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043093/tour-ghana/cape-coast-castle-v2-7.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043095/tour-ghana/cape-coast-castle-v2-8.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043097/tour-ghana/cape-coast-castle-v2-9.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043100/tour-ghana/cape-coast-castle-v2-10.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043101/tour-ghana/cape-coast-castle-v2-11.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043103/tour-ghana/cape-coast-castle-v2-12.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043105/tour-ghana/cape-coast-castle-v2-13.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043108/tour-ghana/cape-coast-castle-v2-15.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043110/tour-ghana/cape-coast-castle-v2-16.jpg',
  'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786043112/tour-ghana/cape-coast-castle-v2-17.jpg'],

  videos: [
  {
    src: 'https://res.cloudinary.com/ynvljxj8/video/upload/v1786013410/tour-ghana/cape-coast-castle-1.mp4',
    poster: 'https://res.cloudinary.com/ynvljxj8/video/upload/f_auto,q_auto,w_2400,c_limit/tour-ghana/cape-coast-castle-1.jpg',
    caption: 'A guided walk through Cape Coast Castle, Central Region'
  },
  {
    src: 'https://res.cloudinary.com/ynvljxj8/video/upload/v1786013415/tour-ghana/cape-coast-castle-2.mp4',
    poster: 'https://res.cloudinary.com/ynvljxj8/video/upload/f_auto,q_auto,w_2400,c_limit/tour-ghana/cape-coast-castle-2.jpg',
    caption: 'Cape Coast Castle from the Atlantic-facing ramparts'
  }],

  coordinates: { lat: 5.103647, lng: -1.24106 },
  overview: [
  'Cape Coast Castle stands on a rocky outcrop above the fishing beach of Cape Coast, its whitewashed walls visible from far along the coast road. Begun by Swedish traders in 1653 as Carolusborg and rebuilt in stone by the British, it became the headquarters of British administration on the Gold Coast for almost two centuries.',
  'Guided tours move through the courtyard, the governor’s quarters, the cannons facing the Atlantic, and then down into the male and female dungeons. The route ends at the Door of No Return, the low doorway through which captives were taken to waiting ships. Guides are trained by the Ghana Museums and Monuments Board and speak from documented history rather than folklore.',
  'A museum on the upper floor covers the Gold Coast trade, Asante diplomacy, abolition and Ghana’s independence, and is worth an unhurried hour on its own. Most visitors combine the castle with Elmina, thirty minutes west, and with Kakum National Park inland.'],

  highlights: [
  'The full dungeon route, including the male and female cells and the condemned cell',
  'The Door of No Return and the beach-side plaque on the seaward side',
  'The West African Historical Museum on the upper floor',
  'Views over the fishing harbour and the canoes drawn up on the sand'],

  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Nearest city', value: 'Cape Coast, 145 km west of Accra' },
  { label: 'Opening hours', value: 'Daily, 9:00 to 16:30' },
  { label: 'Guided tour', value: 'Roughly 75 minutes, guides on site' },
  { label: 'Status', value: 'UNESCO World Heritage Site' }],

  gettingThere: [
  'From Accra, take the coastal N1 west through Winneba and Mankessim. Private car or chartered van takes about three hours in normal traffic.',
  'Intercity coaches run from Accra’s Kaneshie and Circle terminals to Cape Coast, then a short taxi ride to the castle gate.',
  'Most operators run Cape Coast, Elmina and Kakum as a single two-day itinerary with an overnight on the coast.'],

  tips: [
  'Arrive before 11:00 to avoid school groups and the midday heat.',
  'Photography is allowed in most areas but not in the dungeons.',
  'Dress respectfully, this is a memorial site as well as a monument.'],

  nearby: ['elmina-castle', 'kakum-national-park', 'elmina-harbour']
},
{
  slug: 'elmina-castle',
  name: 'Elmina Castle',
  headline:
  'Elmina Castle, built in 1482, is the oldest European building south of the Sahara',
  region: 'Central Region',
  category: 'Forts & Castles',
  summary:
  'Portuguese-built, Dutch-held and finally British, Elmina Castle sits above a working lagoon harbour thirteen kilometres from Cape Coast.',
  image: '/elmina-castle-07.jpg',
  gallery: [
  '/elmina-castle-07.jpg',
  '/elmina-castle-01.jpg',
  '/elmina-castle-02.jpg',
  '/elmina-castle-03.jpg',
  '/elmina-castle-04.jpg',
  '/elmina-castle-05.jpg',
  '/elmina-castle-06.jpg'],
  coordinates: { lat: 5.082743, lng: -1.348126 },
  overview: [
  'São Jorge da Mina was raised by Portuguese masons in 1482 with stone shipped from Lisbon, making it the oldest surviving European structure in sub-Saharan Africa. The Dutch took it in 1637 and held it for more than two centuries before ceding it to Britain in 1872.',
  'The castle is entered across a causeway above the Benya Lagoon, where hundreds of painted canoes tie up. Inside, the tour covers the Portuguese church later converted into an auction hall, the courtyards, the dungeons and the governor’s apartments.',
  'Above the town, the smaller Fort St. Jago looks down on the castle and gives the best photograph of the whole harbour. The two can be visited on a single ticket.'],

  highlights: [
  'The Portuguese chapel and the Dutch-era courtyards',
  'The Benya Lagoon causeway and the canoe harbour below',
  'Fort St. Jago on the hill opposite, included on the joint ticket',
  'The condemned cell and the memorial plaques'],

  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Nearest town', value: 'Elmina, 13 km west of Cape Coast' },
  { label: 'Opening hours', value: 'Daily, 9:00 to 16:30' },
  { label: 'Built', value: '1482 by Portuguese traders' },
  { label: 'Status', value: 'UNESCO World Heritage Site' }],

  gettingThere: [
  'Shared taxis run continuously between Cape Coast and Elmina and take about twenty minutes.',
  'From Accra allow three and a half hours by road on the N1.'],

  tips: [
  'Combine the castle with an early walk around the fishing harbour.',
  'Buy the joint ticket if you also want to climb to Fort St. Jago.'],

  nearby: ['cape-coast-castle', 'elmina-harbour', 'kakum-national-park']
},
{
  slug: 'kakum-national-park',
  name: 'Kakum National Park',
  headline:
  'Above the rainforest: the Kakum canopy walkway is still Ghana’s most thrilling half hour',
  region: 'Central Region',
  category: 'Parks & Wildlife',
  summary:
  'Seven rope bridges strung between giant emergent trees, forty metres above the floor of a protected tropical rainforest.',
  image: images.kakum,
  gallery: [images.kakum, images.wli],
  coordinates: { lat: 5.35006, lng: -1.38195 },
  overview: [
  'Kakum protects 375 square kilometres of upland evergreen rainforest, one of the last significant tracts in West Africa. It is best known for the canopy walkway, a chain of seven suspension bridges built in 1995 and anchored to emergent trees around forty metres above the ground.',
  'The walkway is reached by a steep twenty-minute climb from the visitor centre. Crossing all seven spans takes about half an hour at an unhurried pace, with viewing platforms between each bridge.',
  'The forest holds forest elephants, bongo, colobus and Diana monkeys and more than 260 bird species, though mammals are rarely seen by day. Guided nature walks on the forest floor and overnight tree platform stays are arranged at the visitor centre.'],

  highlights: [
  'The seven-bridge canopy walkway and its viewing platforms',
  'Sunrise slots for birders and small groups',
  'Guided ground-level nature walks with a park ranger',
  'The visitor centre exhibition on rainforest conservation'],

  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Nearest city', value: 'Cape Coast, 33 km south' },
  { label: 'Opening hours', value: 'Daily, 8:00 to 16:00' },
  { label: 'Walkway', value: '7 bridges, about 40 m above the forest floor' },
  { label: 'Best time', value: 'Early morning, before the heat and crowds' }],

  gettingThere: [
  'From Cape Coast take the road north towards Abrafo Junction, about forty-five minutes by taxi.',
  'Day trips from Accra are long but possible; most visitors stay overnight in Cape Coast or Elmina.'],

  tips: [
  'Wear closed shoes with grip, the climb is steep and often damp.',
  'The walkway sways, which is normal, and there is a lower loop for anyone who would rather stay on the ground.'],

  nearby: ['cape-coast-castle', 'elmina-castle', 'mole-national-park']
},
{
  slug: 'mole-national-park',
  name: 'Mole National Park',
  headline: 'Mole National Park is Ghana’s best chance to walk beside elephants',
  region: 'Savannah Region',
  category: 'Parks & Wildlife',
  summary:
  'Ghana’s largest wildlife reserve, where guided walking safaris bring visitors within metres of elephants at the waterholes.',
  image: '/mole-national-park-01.jpeg',
  gallery: [
  '/mole-national-park-01.jpeg',
  '/mole-national-park-02.jpeg',
  '/mole-national-park-03.jpeg',
  '/mole-national-park-04.jpeg',
  '/mole-national-park-05.jpeg',
  '/mole-national-park-06.jpeg',
  '/mole-national-park-07.jpeg',
  '/mole-national-park-08.jpeg',
  '/mole-national-park-09.jpeg'],
  coordinates: { lat: 9.5, lng: -2 },
  overview: [
  'Mole covers 4,840 square kilometres of Guinea savanna in northern Ghana and is the country’s flagship wildlife park. Around 600 elephants use the reserve, along with buffalo, roan and kob antelope, warthog, baboon and more than 300 bird species.',
  'What sets Mole apart is the walking safari. Armed rangers lead small groups down the escarpment towards the waterholes below the motel, and in the dry season elephants gather there through the middle of the day.',
  'Vehicle safaris cover more ground and reach the outer loops where antelope herds are more common. Both are booked at the park headquarters at Larabanga gate.'],

  highlights: [
  'Guided walking safari at first light to the waterholes',
  'The escarpment viewpoint above the plain',
  'Vehicle safari on the northern loop for antelope and buffalo',
  'The ancient Larabanga Mosque, ten minutes from the park gate'],

  quickFacts: [
  { label: 'Region', value: 'Savannah Region' },
  { label: 'Nearest town', value: 'Damongo, 25 km from the gate' },
  { label: 'Safaris', value: 'Walking at 07:00 and 15:30, vehicle on request' },
  { label: 'Best time', value: 'December to April, the dry season' },
  { label: 'Size', value: '4,840 square kilometres' }],

  gettingThere: [
  'Fly Accra to Tamale, then drive about four hours west through Damongo.',
  'By road from Kumasi allow a full day via Techiman and Bole.'],

  tips: [
  'Bring binoculars and neutral-coloured clothing for the walking safari.',
  'Book accommodation inside the park well ahead in the dry season.'],

  nearby: ['paga-crocodile-pond', 'damba-festival', 'kakum-national-park']
},
{
  slug: 'nzulezu',
  name: 'Nzulezu Stilt Village',
  headline: 'Nzulezu, the village on stilts, is reached by a 45-minute canoe ride',
  region: 'Western Region',
  category: 'Culture & Heritage',
  summary:
  'A living village built entirely on stilts over Lake Tadane, reached by dugout canoe through the Amansuri wetlands.',
  image: 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113778/tour-ghana/nzulezu-stilt-village.jpg',
  gallery: ['https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113778/tour-ghana/nzulezu-stilt-village.jpg', images.wli],
  coordinates: { lat: 5.020827, lng: -2.597921 },
  overview: [
  'Nzulezu, which means "surface of water", is home to around five hundred people whose houses, school and chapel all stand on raised platforms above Lake Tadane. Oral history traces the settlement to migrants from Walata in the old Ghana Empire, led there, the story goes, by a snail.',
  'Visitors reach the village by dugout canoe from Beyin, paddling forty-five minutes through the Amansuri wetland, one of the best preserved swamp forests in West Africa. Kingfishers, herons and monkeys are common along the channel.',
  'A single central walkway runs the length of the village with houses on either side. Visits are arranged through the community tourism office at Beyin, and part of every fee goes to the village.'],

  highlights: [
  'The canoe crossing through the Amansuri swamp forest',
  'The central boardwalk and the stilt-built schoolhouse',
  'Community-run guesthouses for an overnight stay',
  'Birdlife along the channel, best in the early morning'],

  quickFacts: [
  { label: 'Region', value: 'Western Region' },
  { label: 'Departure point', value: 'Beyin, near Half Assini' },
  { label: 'Canoe crossing', value: 'About 45 minutes each way' },
  { label: 'Best time', value: 'Morning departures, before the wind rises' },
  { label: 'Bookings', value: 'Community tourism office at Beyin' }],

  gettingThere: [
  'From Takoradi drive west through Agona Nkwanta and Esiama to Beyin, about three hours.',
  'From Accra it is a long day; most visitors overnight in Busua or Axim first.'],

  tips: [
  'Ask permission before photographing people in the village.',
  'Carry cash, there are no card facilities at Beyin or in the village.'],

  nearby: ['paga-crocodile-pond', 'wli-waterfalls', 'labadi-beach']
},
{
  slug: 'wli-waterfalls',
  name: 'Wli Waterfalls',
  headline: 'Wli Waterfalls, the highest in West Africa, sits on the Togo border',
  region: 'Volta Region',
  category: 'Parks & Wildlife',
  summary:
  'A two-stage waterfall inside the Agumatsa Wildlife Sanctuary, with an easy lower trail and a demanding climb to the upper falls.',
  image: images.wli,
  gallery: [images.wli, images.kakum],
  coordinates: { lat: 7.106232, lng: 0.609021 },
  overview: [
  'The Agumatsa river drops from the Agumatsa range in two stages, the lower fall reached by a level forty-five minute walk from the village of Wli, the upper fall by a steep and often slippery three-hour climb over the ridge.',
  'The cliff face above the lower fall is home to a large colony of fruit bats, and the spray pool at the base is open for swimming. The trail crosses the Agumatsa river nine times on timber bridges.',
  'Guides are compulsory and are assigned at the sanctuary office in Wli. Fees support the community management of the sanctuary.'],

  highlights: [
  'The lower falls and its swimming pool, an easy walk for most visitors',
  'The upper falls climb over the ridge for experienced hikers',
  'The fruit bat colony on the cliff face',
  'The nine river crossings on the forest trail'],

  quickFacts: [
  { label: 'Region', value: 'Volta Region' },
  { label: 'Nearest town', value: 'Hohoe, 20 km west' },
  { label: 'Lower falls walk', value: 'About 45 minutes each way, level' },
  { label: 'Upper falls hike', value: '3 hours up, steep and strenuous' },
  { label: 'Guides', value: 'Compulsory, assigned at the sanctuary office' }],

  gettingThere: [
  'From Accra drive via Ho and Hohoe, about four and a half hours.',
  'Taxis run from Hohoe to Wli village throughout the day.'],

  tips: [
  'Go in the wet season, June to October, for the fullest flow.',
  'Take a dry bag, the spray at the base reaches a long way.'],

  nearby: ['nzulezu', 'aburi-gardens', 'kakum-national-park']
},
{
  slug: 'aburi-gardens',
  name: 'Aburi Botanical Gardens',
  headline: 'Aburi Botanical Gardens is an easy escape from the Accra heat',
  region: 'Eastern Region',
  category: 'Parks & Wildlife',
  summary:
  'Sixty-four hectares of colonial-era gardens on the Akuapem ridge, forty minutes above the capital.',
  image: images.aburi,
  gallery: [images.aburi, images.wli],
  coordinates: { lat: 5.851184, lng: -0.172911 },
  overview: [
  'Laid out in 1890 on the site of a sanatorium, Aburi Botanical Gardens sits at 370 metres on the Akuapem ridge where the air is noticeably cooler than Accra below. The great avenue of royal palms is the signature view.',
  'The collection includes ancient silk cotton and ficus specimens, medicinal plant beds and a small nursery selling seedlings. A decommissioned military helicopter, long a curiosity, stands near the main lawn.',
  'The road up from Accra passes the woodcarvers of Aburi market, one of the best places in the country to buy handmade stools, masks and drums.'],

  highlights: [
  'The royal palm avenue and the great lawn',
  'Medicinal and economic plant collections',
  'The Aburi woodcarvers market on the approach road',
  'Cool ridge-top views back over Accra'],

  quickFacts: [
  { label: 'Region', value: 'Eastern Region' },
  { label: 'Distance', value: '30 km north of Accra, about 45 minutes' },
  { label: 'Opening hours', value: 'Daily, 8:00 to 18:00' },
  { label: 'Established', value: '1890' },
  { label: 'Best time', value: 'Weekday mornings, quiet and cool' }],

  gettingThere: [
  'Drive north from Accra through Madina and up the Aburi road.',
  'Trotros to Aburi leave from the 37 station in Accra throughout the day.'],

  tips: [
  'Bring a picnic, the lawns are open to visitors.',
  'Weekends are busy with families from Accra.'],

  nearby: ['labadi-beach', 'independence-square', 'wli-waterfalls']
},
{
  slug: 'paga-crocodile-pond',
  name: 'Paga Crocodile Pond',
  headline: 'Paga crocodile pond: what the ritual visit actually involves',
  region: 'Upper East Region',
  category: 'Culture & Heritage',
  summary:
  'A sacred pond on the Burkina Faso border where the crocodiles are considered the reincarnated souls of the townspeople.',
  image: 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113785/tour-ghana/paga-crocodile-pond.jpg',
  gallery: ['https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113785/tour-ghana/paga-crocodile-pond.jpg', images.mole],
  coordinates: { lat: 10.985404, lng: -1.109224 },
  overview: [
  'The crocodiles of Paga are protected by a taboo that has held for centuries: no resident of the town will harm them, and the crocodiles in turn have never harmed a resident. Each is understood to carry the soul of a member of the community.',
  'Guides call a crocodile out of the water with a live fowl, which is offered after the visit. Visitors may sit beside the animal for photographs under the guide’s direction. It is a managed ritual, not a wildlife encounter, and the fee supports the custodian families.',
  'Paga sits a kilometre from the Burkina Faso frontier and is usually visited alongside the Pikworo slave camp at Nania and the Sirigu painted houses to the east.'],

  highlights: [
  'The pond ritual with a custodian guide',
  'Pikworo Slave Camp at Nania, three kilometres away',
  'The painted courtyard houses of Sirigu',
  'The Burkina Faso border post, one kilometre north'],

  quickFacts: [
  { label: 'Region', value: 'Upper East Region' },
  { label: 'Nearest city', value: 'Bolgatanga, 40 km south' },
  { label: 'Opening hours', value: 'Daily, daylight hours' },
  { label: 'Visitor numbers', value: 'Capped daily to protect the pond' },
  { label: 'Best time', value: 'Late afternoon, when crocodiles bask' }],

  gettingThere: [
  'Fly to Tamale, then drive three hours north to Bolgatanga and on to Paga.',
  'Shared taxis run from Bolgatanga station to Paga through the day.'],

  tips: [
  'Agree the fee, including the fowl, before the ritual begins.',
  'Follow the guide exactly, the animals are wild despite the tradition.'],

  nearby: ['mole-national-park', 'damba-festival', 'nzulezu']
},
{
  slug: 'labadi-beach',
  name: 'Labadi Beach',
  headline: 'Labadi Beach on a Sunday: horses, highlife and grilled tilapia',
  region: 'Greater Accra',
  category: 'Coast & Beaches',
  summary:
  'Accra’s busiest and most sociable stretch of sand, run by the La traditional council and best visited at the weekend.',
  image: '/labadi-beach-02.jpg',
  imageCredit: 'Photos: Ghassan Mroue and Cca Raheem / Wikimedia Commons (CC BY-SA 3.0 / CC BY 4.0)',
  gallery: [
  '/labadi-beach-02.jpg',
  '/labadi-beach-01.jpg',
  images.labadi],
  coordinates: { lat: 5.562204, lng: -0.138529 },
  overview: [
  'La Pleasure Beach, known to everyone as Labadi, is the capital’s public beach and the easiest introduction to how Accra spends its weekends. Horse owners walk the sand, drummers set up near the entrance and bands play highlife and reggae into the evening.',
  'Food stalls grill tilapia and banku along the back of the beach, and the hotels at either end sell day passes with quieter sun loungers for visitors who want them.',
  'The Atlantic here has a strong undertow. Swim only in the patrolled area near the lifeguard stand and never after dark.'],

  highlights: [
  'Weekend live highlife bands and drumming circles',
  'Horse rides along the shoreline',
  'Grilled tilapia with banku and shito from the beach stalls',
  'Sunday afternoon, the busiest and best time to visit'],

  quickFacts: [
  { label: 'Region', value: 'Greater Accra' },
  { label: 'Location', value: 'La, 8 km east of central Accra' },
  { label: 'Opening hours', value: 'Daily, 6:00 to 22:00' },
  { label: 'Entrance', value: 'Gate fee collected by the La council' },
  { label: 'Best time', value: 'Sunday afternoon' }],

  gettingThere: [
  'Fifteen to thirty minutes by taxi or ride-hailing app from central Accra.',
  'Trotros along the Labadi road drop passengers at the beach junction.'],

  tips: [
  'Keep valuables with you and use the paid lockers at the hotels.',
  'Agree horse and photograph prices before, not after.'],

  nearby: ['independence-square', 'aburi-gardens', 'accra-food']
},
{
  slug: 'bonwire-kente',
  name: 'Bonwire Kente Village',
  headline: 'In Bonwire, the loom keeps time: a day with the weavers who make kente',
  region: 'Ashanti Region',
  category: 'Culture & Heritage',
  summary:
  'The historic home of Asante kente weaving, twenty minutes from Kumasi, where visitors can sit at a loom themselves.',
  image: '/bonwire-kente-loom.jpeg',
  gallery: ['/bonwire-kente-loom.jpeg'],
  coordinates: { lat: 6.796479, lng: -1.502649 },
  overview: [
  'Bonwire has woven kente for the Asante court since the seventeenth century. Narrow strips come off the loom at about ten centimetres wide and are sewn edge to edge into full cloths, each pattern carrying a name and a meaning.',
  'Weavers work in open sheds along the main street and welcome visitors. Most will explain the pattern they are working on, and many offer a short lesson at the loom.',
  'Prices depend on thread: cotton strips are affordable, silk and rayon cloths for ceremonial use run into the hundreds of dollars. Buying directly from the weaver is both cheaper and fairer than buying in Accra.'],

  highlights: [
  'Watching a full-width cloth being woven strip by strip',
  'A hands-on lesson at the loom',
  'Buying directly from the weaver at workshop prices',
  'Combining the visit with Ntonso adinkra stamping nearby'],

  quickFacts: [
  { label: 'Region', value: 'Ashanti Region' },
  { label: 'Distance', value: '18 km north-east of Kumasi' },
  { label: 'Visiting', value: 'Daily during working hours' },
  { label: 'Typical visit', value: 'Two hours, longer with a lesson' },
  { label: 'Pairs with', value: 'Ntonso adinkra village, 20 km away' }],

  gettingThere: [
  'Taxi or trotro from Kumasi Kejetia towards Effiduase, about forty minutes.',
  'Most Kumasi operators run a craft-villages day covering Bonwire, Ntonso and Ahwiaa.'],

  tips: [
  'Ask before photographing a weaver at work.',
  'Check whether a cloth is cotton or rayon before agreeing a price.'],

  nearby: ['manhyia-palace', 'homowo-festival', 'cape-coast-castle']
},
{
  slug: 'manhyia-palace',
  name: 'Manhyia Palace Museum',
  headline:
  'Manhyia Palace Museum tells the Asante story in the kingdom’s own words',
  region: 'Ashanti Region',
  category: 'Culture & Heritage',
  summary:
  'The former residence of the Asantehene in Kumasi, now a museum of the kingdom’s regalia, history and continuing authority.',
  image: 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786114223/tour-ghana/manhyia-palace-museum.jpg',
  gallery: ['https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786114223/tour-ghana/manhyia-palace-museum.jpg', 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113790/tour-ghana/bonwire-kente-weaver.jpg'],
  coordinates: { lat: 6.703552, lng: -1.615004 },
  overview: [
  'Built by the British in 1925 for the returning Asantehene Prempeh I after his exile in the Seychelles, Manhyia served as the royal residence until 1974 and opened as a museum in 1995.',
  'The rooms are kept much as they were, with the furniture, photographs and personal effects of Prempeh I and Prempeh II. Displays cover the Golden Stool, the Asante wars, the structure of the kingdom and the role of the Asantehene today.',
  'The current palace stands next door and is not open to visitors, but on Akwasidae festival days, held every six weeks, the courtyard fills for the public durbar and visitors are welcome to watch.'],

  highlights: [
  'The preserved royal rooms and regalia',
  'The Akwasidae durbar, held every six weeks',
  'Displays on the Golden Stool and Asante history',
  'Kumasi craft villages within easy reach'],

  quickFacts: [
  { label: 'Region', value: 'Ashanti Region' },
  { label: 'Location', value: 'Manhyia, northern Kumasi' },
  { label: 'Opening hours', value: 'Daily, 9:00 to 17:00' },
  { label: 'Guided tour', value: 'Included, about one hour' },
  { label: 'Akwasidae', value: 'Every six weeks, check dates before travel' }],

  gettingThere: [
  'Ten minutes by taxi from Kejetia market in central Kumasi.',
  'Kumasi is a five-hour drive or a forty-five minute flight from Accra.'],

  tips: [
  'Photography inside the museum rooms is restricted.',
  'Dress modestly if you are attending an Akwasidae durbar.'],

  nearby: ['bonwire-kente', 'homowo-festival', 'mole-national-park']
},
{
  slug: 'independence-square',
  name: 'Independence Square, Accra',
  headline: 'Independence Square, Accra: the walk every visitor starts with',
  region: 'Greater Accra',
  category: 'Culture & Heritage',
  summary:
  'Black Star Square, the Independence Arch and the Kwame Nkrumah Memorial Park make up the ceremonial heart of the capital.',
  image: 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786114227/tour-ghana/independence-arch-sunset.jpg',
  gallery: ['https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786114227/tour-ghana/independence-arch-sunset.jpg', images.labadi],
  coordinates: { lat: 5.549067, lng: -0.192909 },
  overview: [
  'Black Star Square was built for Queen Elizabeth II’s 1961 state visit and remains the stage for Ghana’s Independence Day parade every 6 March. The Black Star Gate, the Independence Arch and the Eternal Flame of African Liberation all stand within it.',
  'A fifteen-minute walk west is the Kwame Nkrumah Memorial Park, where the first president and his wife are buried beneath a sculpted mausoleum, with a museum of his papers, photographs and personal effects.',
  'The two sites plus the National Museum make a comfortable half day on foot, best done early before the coastal heat builds.'],

  highlights: [
  'The Black Star Gate and the Independence Arch',
  'The Eternal Flame of African Liberation',
  'Kwame Nkrumah Memorial Park and Mausoleum',
  'The National Museum, reopened after refurbishment'],

  quickFacts: [
  { label: 'Region', value: 'Greater Accra' },
  { label: 'Location', value: 'Osu, central Accra seafront' },
  { label: 'Square', value: 'Open access, no ticket required' },
  { label: 'Memorial Park', value: 'Daily, 9:00 to 17:00' },
  { label: 'Best time', value: 'Early morning or late afternoon' }],

  gettingThere: [
  'Central Accra, walkable from Osu and a short ride from most city hotels.',
  'Roads close around the square on 6 March for the national parade.'],

  tips: [
  'There is almost no shade on the square, carry water and a hat.',
  'Guides at the Memorial Park are licensed and worth taking.'],

  nearby: ['labadi-beach', 'accra-food', 'aburi-gardens']
},
{
  slug: 'homowo-festival',
  name: 'Homowo Festival',
  headline:
  'Homowo season brings the drums back to Accra, and the whole city eats kpokpoi',
  region: 'Greater Accra',
  category: 'Festivals',
  summary:
  'The Ga harvest festival that "hoots at hunger", marked across Accra with a ban on drumming, then a month of processions.',
  image: '/homowo-festival-01.jpg',
  imageCredit: 'Photo: Fquasie / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/homowo-festival-01.jpg'],
  festivalTiming: {
    months: [8, 9],
    note: 'Dates vary by Ga town — Ga Mashie, Osu, Teshie and Nungua each hold their own weekend'
  },
  coordinates: { lat: 5.814284, lng: 0.074677 },
  overview: [
  'Homowo remembers a famine survived generations ago and translates roughly as "hooting at hunger". The season opens in May with the planting of crops and a thirty-day ban on drumming and noise-making across Ga traditional areas.',
  'The ban lifts in August and the festival proper begins. Priests sprinkle kpokpoi, a steamed corn dish served with palm nut soup, along the streets for the ancestors. Families gather, twins are honoured in the Ga twins ceremony, and processions move through Ga Mashie, Osu, Teshie and Nungua on successive weekends.',
  'Visitors are welcome at the public processions. Ask a local host or your operator which quarter celebrates on which weekend, as the dates differ between Ga towns.'],

  highlights: [
  'The kpokpoi sprinkling ritual by Ga priests',
  'Processions through Ga Mashie, Osu, Teshie and Nungua',
  'The Ga twins ceremony',
  'Street drumming and dancing after the ban lifts'],

  quickFacts: [
  { label: 'Region', value: 'Greater Accra' },
  { label: 'When', value: 'August and September, varying by Ga town' },
  { label: 'Duration', value: 'Several weekends across the season' },
  { label: 'Access', value: 'Public processions, free to watch' },
  { label: 'Pairs with', value: 'Chale Wote in James Town, also August' }],

  gettingThere: [
  'All the celebrating quarters are within Accra and reachable by taxi.',
  'Expect road closures in Ga Mashie and Jamestown on procession days.'],

  tips: [
  'Confirm the exact weekend locally, dates shift each year.',
  'Ask before photographing priests or ritual moments.'],

  nearby: ['damba-festival', 'independence-square', 'labadi-beach']
},
{
  slug: 'damba-festival',
  name: 'Damba Festival',
  headline:
  'Damba in Tamale is a horse festival, a durbar and an all-night party',
  region: 'Northern Region',
  category: 'Festivals',
  summary:
  'The great festival of the Dagbon, Mamprusi and Gonja kingdoms, marked with drumming, dancing and a mounted chiefs’ durbar.',
  image: '/damba-festival-01.jpg',
  imageCredit: 'Photo: Celestinesucess / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/damba-festival-01.jpg'],
  festivalTiming: {
    months: [],
    note: 'Follows the Islamic lunar calendar, so the Gregorian date shifts about 11 days earlier each year'
  },
  coordinates: { lat: 9.367277, lng: -0.149499 },
  overview: [
  'Damba marks the birth of the Prophet Muhammad but has grown into the largest cultural festival in northern Ghana, celebrating the chieftaincy of Dagbon as much as the religious calendar.',
  'The festival runs over several days. Somo Damba on the eleventh day of the lunar month is followed by Naa Damba on the eighteenth, and the climax is the Belkulsi durbar, when chiefs ride out on decorated horses to the sound of lunsi talking drums.',
  'Tamale, Yendi and Karaga all hold their own celebrations. Accommodation fills quickly, so book weeks ahead.'],

  highlights: [
  'The mounted chiefs’ durbar and horse displays',
  'Lunsi talking-drum ensembles',
  'Night-long dancing in the chief’s palace forecourt',
  'Smock and hand-woven textile markets around the festival'],

  quickFacts: [
  { label: 'Region', value: 'Northern Region' },
  { label: 'Main towns', value: 'Tamale, Yendi and Karaga' },
  { label: 'When', value: 'Third month of the Islamic lunar calendar' },
  { label: 'Duration', value: 'Several days, climaxing in the durbar' },
  { label: 'Access', value: 'Public, visitors welcome at the durbar' }],

  gettingThere: [
  'Fly Accra to Tamale, about seventy minutes, then taxi within the city.',
  'Yendi is a two-hour drive east of Tamale.'],

  tips: [
  'Book accommodation in Tamale weeks in advance.',
  'Dress modestly, this is a religious as well as a royal occasion.'],

  nearby: ['mole-national-park', 'paga-crocodile-pond', 'homowo-festival']
},
{
  slug: 'elmina-harbour',
  name: 'Elmina Fishing Harbour',
  headline: 'Elmina’s fishing harbour is the loudest, brightest morning in Ghana',
  region: 'Central Region',
  category: 'Coast & Beaches',
  summary:
  'Hundreds of hand-painted canoes packed into the Benya Lagoon beneath the castle walls, at their busiest just after dawn.',
  image: '/elmina-harbour-01.jpg',
  imageCredit: 'Photos: Adam Jones and David Stanley / Wikimedia Commons (CC BY-SA 2.0 / CC BY 2.0)',
  gallery: ['/elmina-harbour-01.jpg', '/elmina-harbour-02.jpg'],
  coordinates: { lat: 5.086336, lng: -1.34892 },
  overview: [
  'The Benya Lagoon at Elmina is one of the great working harbours of West Africa. Canoes are painted with proverbs, flags and football crests, and each one carries a name that means something to its owner.',
  'Boats come in from around six in the morning and the market on the quay runs until the catch is gone. Smokehouses behind the quay process what is not sold fresh.',
  'The best vantage point is the bridge over the lagoon, or the walls of Fort St. Jago on the hill above.'],

  highlights: [
  'Dawn landings and the quayside fish market',
  'The painted canoes and their proverb names',
  'Views from the lagoon bridge and Fort St. Jago',
  'Boat builders working along the far bank'],

  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Location', value: 'Benya Lagoon, beneath Elmina Castle' },
  { label: 'Best time', value: '6:00 to 9:00, when the boats land' },
  { label: 'Cost', value: 'Free to walk, tips expected for guiding' },
  { label: 'Pairs with', value: 'Elmina Castle and Fort St. Jago' }],

  gettingThere: [
  'Twenty minutes by shared taxi from Cape Coast.',
  'The harbour is a five-minute walk from the castle gate.'],

  tips: [
  'Ask before photographing individuals, particularly the fishmongers.',
  'The quay is wet and slippery, wear shoes you do not mind ruining.'],

  nearby: ['elmina-castle', 'cape-coast-castle', 'labadi-beach']
},
{
  slug: 'accra-food',
  name: 'Eating in Accra',
  headline:
  'A first-timer’s guide to eating jollof, waakye and banku in Accra',
  region: 'Greater Accra',
  category: 'Food & Dining',
  summary:
  'Chop bars, waakye stands and rooftop kitchens: how to eat well in the capital, from breakfast to late night.',
  image: images.jollof,
  gallery: [images.jollof, images.labadi],
  coordinates: { lat: 5.559285, lng: -0.197431 },
  overview: [
  'Ghanaian food is built around a handful of staples: jollof rice, waakye, banku, kenkey, fufu and red red. Each comes with its own accompaniments, and every cook argues for their own version.',
  'Waakye, rice and beans cooked with sorghum leaves, is a breakfast dish and the queues at the best stands form before eight. Jollof is a lunch and celebration dish. Banku with grilled tilapia and shito belongs to the evening, ideally at a table outdoors.',
  'Osu and East Legon hold most of the sit-down restaurants, while the best chop bars are scattered through Labone, Adabraka and Nima. Prices at a chop bar are a fraction of a restaurant and the food is often better.'],

  highlights: [
  'Waakye for breakfast from a street stand',
  'Grilled tilapia with banku and shito in the evening',
  'Red red, fried plantain with bean stew',
  'A guided market walk through Makola before cooking'],

  quickFacts: [
  { label: 'Region', value: 'Greater Accra' },
  { label: 'Best areas', value: 'Osu, Labone, Adabraka, East Legon' },
  { label: 'Breakfast', value: 'Waakye stands, from about 7:00' },
  { label: 'Evening', value: 'Tilapia and banku spots, from 18:00' },
  { label: 'Payment', value: 'Cash or mobile money at chop bars' }],

  gettingThere: [
  'All the districts named are within twenty minutes of central Accra by taxi.',
  'Several operators run guided street-food walks in Osu and Jamestown.'],

  tips: [
  'Eat where there is a queue of locals, it is the reliable signal.',
  'Shito is hot. Ask for it on the side the first time.'],

  nearby: ['labadi-beach', 'independence-square', 'homowo-festival']
},
{
  slug: 'aboakyer-festival',
  name: 'Aboakyer',
  headline: 'Aboakyer: Winneba’s bare-handed deer hunt for the god Otu',
  region: 'Central Region',
  category: 'Festivals',
  summary:
  'Each May, two rival Asafo companies in Winneba race unarmed into the bush to catch a live bushbuck for the Effutu god Otu, then parade it home to a beach town in full carnival mood.',
  image: '/aboakyer-festival-01.jpg',
  imageCredit: 'Photo: Fquasie / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/aboakyer-festival-01.jpg', '/aboakyer-festival-02.jpg'],
  festivalTiming: {
    months: [5],
    rule: { month: 5, weekday: 6, occurrence: 1 }
  },
  coordinates: { lat: 5.351, lng: -0.6231 },
  overview: [
  'Aboakyer traces back to the Effutu people’s migration to the Winneba coast, and is held to honour the deity Otu and secure the community’s protection and good fortune for the year ahead. What was once a hunting-based provisioning rite has become a communal contest between Winneba’s two historic Asafo companies, Tuafo and Dentsefo.',
  'At dawn, unarmed teams from each company head into a nearby bush reserve to catch a live bushbuck by hand. Whichever company gets theirs back to the Paramount Chief’s palace first wins the year’s bragging rights, and the animal is presented to the chief before being ritually offered the following day. The rest of Winneba spends the day drumming, singing and parading through the streets.',
  'It is a genuinely local occasion rather than a staged show — the hunt itself happens out of town in the reserve, so what most visitors actually see and take part in is the parade, the drumming and the durbar back in Winneba itself.'],
  highlights: [
  'The pre-dawn Asafo companies setting off for the bush in matching colours',
  'The parade back into town with the captured bushbuck',
  'Drumming and dancing around Winneba’s main square through the afternoon',
  'The chief’s durbar the following day, when the animal is formally presented'],
  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Host town', value: 'Winneba, on the coast between Accra and Cape Coast' },
  { label: 'When', value: 'First Saturday in May' },
  { label: 'Who celebrates', value: 'The Effutu people, via two rival Asafo companies' },
  { label: 'Format', value: 'A hunt outside town followed by a public parade and durbar' }],
  gettingThere: [
  'Winneba is roughly ninety minutes west of Accra on the N1 coastal road.',
  'Shared taxis and buses run from Accra’s Kaneshie and Kwame Nkrumah Circle terminals directly to Winneba.',
  'Arrive the evening before if you want to see the companies gather at dawn.'],
  tips: [
  'The hunt itself takes place in a reserve outside town and isn’t really open to casual spectators — plan around the parade and durbar in Winneba itself.',
  'Streets get crowded and traffic tightens through town on festival day, so park early or arrive on foot.'],
  nearby: ['cape-coast-castle', 'kakum-national-park']
},
{
  slug: 'odwira-festival',
  name: 'Odwira',
  headline: 'Odwira: the Akuapem festival that opens the new yam harvest',
  region: 'Eastern Region',
  category: 'Festivals',
  summary:
  'A week of purification and thanksgiving in the hill town of Akropong, Odwira cleans the ancestral stools of the Akuapem state and formally releases the new yam crop for eating.',
  image: '/odwira-festival-01.jpg',
  imageCredit: 'Photo: Duncanoff / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/odwira-festival-01.jpg'],
  festivalTiming: {
    months: [9, 10],
    note: 'Exact dates are set annually by the Okuapeman traditional council'
  },
  coordinates: { lat: 5.9746, lng: -0.0854 },
  overview: [
  'Odwira, meaning purification, was instituted in 1826 by Nana Addo Dankwa I to mark the Akuapem state’s victory at the Battle of Katamansu and to give thanks for it. It has since grown into the Akuapem traditional area’s major annual observance.',
  'The early days of the festival are restricted, ceremonial rites: ancestral stools are cleansed and honoured, and by custom no one eats from the new yam harvest until the festival formally releases it. The week builds to a grand durbar, with Akuapem chiefs appearing in full kente and gold regalia alongside drumming and dancing.',
  'Akropong sits in the cool Akuapem hills north of Accra, and the open durbar is the part visitors can attend — the earlier ritual days are local, ceremonial occasions rather than a public spectacle.'],
  highlights: [
  'The grand durbar of Akuapem chiefs in full kente and gold regalia',
  'Drumming, dancing and praise-singing specific to the Akuapem state',
  'The ceremonial release of the new yam harvest',
  'The hill-town setting of Akropong itself, cooler and greener than the coast'],
  quickFacts: [
  { label: 'Region', value: 'Eastern Region' },
  { label: 'Host town', value: 'Akropong-Akuapem, with related events at Aburi, Larteh and Mamfe' },
  { label: 'When', value: 'Late September into October' },
  { label: 'Who celebrates', value: 'The Akuapem traditional state' },
  { label: 'Origin', value: 'Instituted in 1826 to mark victory at the Battle of Katamansu' }],
  gettingThere: [
  'Akropong is around an hour north of Accra, up into the Akuapem hills past Aburi.',
  'Shared taxis run from Accra’s Tema Station to Akropong via Aburi.',
  'Easy to combine with a stop at Aburi Botanical Gardens on the way up.'],
  tips: [
  'The durbar day draws the biggest crowds; earlier ritual days are local occasions, not visitor spectacles.',
  'New yam dishes appear on menus around the region once the festival releases the harvest — worth timing a food stop around it.'],
  nearby: ['aburi-gardens', 'independence-square']
},
{
  slug: 'hogbetsotso-festival',
  name: 'Hogbetsotso',
  headline: 'Hogbetsotso: the Anlo-Ewe festival of the exodus from Notsie',
  region: 'Volta Region',
  category: 'Festivals',
  summary:
  'Anloga’s biggest day of the year re-tells the seventeenth-century escape of the Anlo-Ewe from the walled city of Notsie, with a coastal clean-up, peace rites and a grand durbar.',
  image: '/hogbetsotso-festival-01.jpg',
  imageCredit: 'Photo: JY midey / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/hogbetsotso-festival-01.jpg'],
  festivalTiming: {
    months: [11],
    rule: { month: 11, weekday: 6, occurrence: 1 }
  },
  coordinates: { lat: 5.7947, lng: 0.8973 },
  overview: [
  'Hogbetsotso means festival of exodus, and commemorates the Anlo-Ewe people’s flight from the walled city of Notsie, in present-day Togo, under the rule of a tyrant king, Agokoli. Tradition holds they escaped by tricking the guards, in one version walking backwards through the wall to disguise their tracks.',
  'The festival week includes a peace-making period during which community disputes are formally settled, purification rites for ancestral stools, and a symbolic clean-up of the shoreline running from the Volta estuary toward the Mono River. It closes with a grand durbar of Anlo chiefs and queen mothers, with Agbadza and other Anlo-Ewe drumming and dance.',
  'Anloga is a small coastal town near Keta, and the durbar day is the accessible, public part of the festival — worth combining with a wider look at the Volta coast and the Keta lagoon.'],
  highlights: [
  'The symbolic coastal clean-up re-enacting the journey from Notsie',
  'The Anlo peace-making rites that precede the public celebrations',
  'Agbadza and other Anlo-Ewe drumming and dance performed at the durbar',
  'Chiefs and queen mothers of the Anlo state assembling in procession'],
  quickFacts: [
  { label: 'Region', value: 'Volta Region' },
  { label: 'Host town', value: 'Anloga, on the coast near Keta' },
  { label: 'When', value: 'First Saturday in November' },
  { label: 'Who celebrates', value: 'The Anlo-Ewe people' },
  { label: 'Origin', value: 'Commemorates the seventeenth-century flight from Notsie under King Agokoli' }],
  gettingThere: [
  'Anloga is on the coast road east of Ho, roughly three to four hours from Accra.',
  'The coastal route runs through Keta, a short drive from Anloga.',
  'Most visitors combine it with a night around Keta or the Volta estuary.'],
  tips: [
  'Book accommodation in Keta or Ho ahead of festival weekend — options in Anloga itself are limited.',
  'The durbar ground can get hot and exposed at midday; bring water and shade.'],
  nearby: ['wli-waterfalls', 'independence-square']
},
{
  slug: 'kundum-festival',
  name: 'Kundum',
  headline: 'Kundum: the Nzema and Ahanta harvest festival that moves town to town',
  region: 'Western Region',
  category: 'Festivals',
  summary:
  'A rolling calendar of harvest thanksgiving festivals along the western coast, Kundum passes through Ahanta and Nzema towns from August into November, each keeping its own date.',
  image: '/kundum-festival.jpg',
  imageCredit: 'Photo: Assilidjoe / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/kundum-festival.jpg'],
  festivalTiming: {
    months: [8, 9, 10, 11],
    note: 'Staggered town by town across the season — confirm the date for the specific town you plan to visit'
  },
  coordinates: { lat: 4.8664, lng: -2.2418 },
  overview: [
  'Kundum is traditionally traced to a hunter, Akpoley, who is said to have watched dwarf spirits dancing in the forest and brought the dance back to his people. It grew into a harvest thanksgiving festival celebrated across Ahanta and Nzema communities along Ghana’s western coast.',
  'The festival centres on libations, and on chiefs and queen mothers carried through town in palanquins to drumming built around the kundum dance style. Because it is a rolling calendar rather than one fixed day, towns from the Ahanta coast through Axim to Beyin and the Jomoro area each hold their own date, with the Western Nzema towns typically closing out the season in late October.',
  'Worth knowing honestly: in some Nzema communities, parts of the celebration have been restricted or scaled back by the local traditional council in recent years, so what is on show varies by town and by year — confirm locally rather than assuming a single fixed programme.'],
  highlights: [
  'Chiefs and queen mothers carried through town in palanquins',
  'Kundum drumming and dance, said to be inspired by dwarf spirits seen in the forest',
  'A different host town roughly every week or two through the season',
  'Harvest thanksgiving rites tied to each town’s own farming calendar'],
  quickFacts: [
  { label: 'Region', value: 'Western Region' },
  { label: 'Host towns', value: 'Rolling through Ahanta and Nzema towns, including Axim and Beyin' },
  { label: 'When', value: 'Staggered from around August to November, town by town' },
  { label: 'Who celebrates', value: 'Ahanta and Nzema people' },
  { label: 'Note', value: 'Confirm the specific town’s date directly — it isn’t one fixed date for the whole coast' }],
  gettingThere: [
  'Axim is around five hours west of Accra by road, past Takoradi.',
  'Regular buses run from Accra and Takoradi to Axim and on to the Nzema towns.',
  'Since dates roll town to town, confirm which town is celebrating on your travel dates before setting out.'],
  tips: [
  'Nzulezu and the Western Region’s beaches make good stops either side of a Kundum visit on the same trip.',
  'Ask locally which town is currently in its Kundum period — the season moves and isn’t centrally published.'],
  nearby: ['nzulezu']
},
{
  slug: 'fetu-afahye-festival',
  name: 'Fetu Afahye',
  headline: 'Fetu Afahye: Cape Coast’s new year, marched through the streets of Oguaa',
  region: 'Central Region',
  category: 'Festivals',
  summary:
  'The Oguaa state’s biggest festival closes out the year with Asafo companies parading from Kotokuraba Market to the chief’s palace, marking a historic purification that ended a plague.',
  image: '/fetu-afahye-festival-01.jpg',
  imageCredit: 'Photo: Kwame Ayisi and Fiifiabban / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/fetu-afahye-festival-01.jpg', '/fetu-afahye-festival-02.jpg'],
  festivalTiming: {
    months: [9],
    rule: { month: 9, weekday: 6, occurrence: 1 }
  },
  coordinates: { lat: 5.1053, lng: -1.2466 },
  overview: [
  'Fetu Afahye takes its name from "efin tu", clearing the dirt, a reference to a historic purification that is said to have ended an epidemic in Cape Coast. It marks the new year for the Oguaa traditional area.',
  'On the day, Asafo companies in distinctive uniforms and flags parade from Kotokuraba Market through Chapel Square to the Paramount Chief’s palace, with drumming and the firing of traditional muskets along the route. The day closes with an interdenominational service, reflecting Cape Coast’s mixed Christian and traditional character.',
  'It is a fully public, street-level festival in a compact town, and pairs naturally with a Cape Coast Castle visit since the parade route runs through the same streets.'],
  highlights: [
  'Asafo companies parading in full regalia with their own flags and colours',
  'The procession from Kotokuraba Market to the chief’s palace',
  'Drumming and the firing of traditional muskets along the route',
  'The interdenominational service that closes the day'],
  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Host town', value: 'Cape Coast (Oguaa)' },
  { label: 'When', value: 'First Saturday in September' },
  { label: 'Who celebrates', value: 'The Oguaa traditional area' },
  { label: 'Marks', value: 'The start of the Oguaa new year' }],
  gettingThere: [
  'Cape Coast is about two and a half to three hours west of Accra on the N1.',
  'Intercity coaches run from Accra’s Kaneshie and Circle terminals to Cape Coast.',
  'The parade route runs through the town centre, walkable from Cape Coast Castle.'],
  tips: [
  'Combine with a Cape Coast Castle visit on the same trip — the parade passes close to the castle.',
  'Roads through the town centre close for the parade; plan on foot rather than by car that afternoon.'],
  nearby: ['cape-coast-castle', 'kakum-national-park', 'elmina-castle']
},
{
  slug: 'bakatue-festival',
  name: 'Bakatue',
  headline: 'Bakatue: Elmina’s ceremonial opening of the fishing season',
  region: 'Central Region',
  category: 'Festivals',
  summary:
  'Every July, the chief of Elmina casts a net into the Benya Lagoon to lift a season-long fishing ban, opening the year’s fishing season with a royal procession and durbar.',
  image: '/bakatue-festival.jpg',
  imageCredit: 'Photo: NanaReagan / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/bakatue-festival.jpg'],
  festivalTiming: {
    months: [7],
    rule: { month: 7, weekday: 2, occurrence: 1 }
  },
  coordinates: { lat: 5.0838, lng: -1.3482 },
  overview: [
  'Bakatue means opening of the lagoon. The rites honour the river deity Nana Benya, and six weeks of purification precede the day itself, tied to a closed season meant to let fish stocks in the Benya Lagoon recover.',
  'On the day, the Omanhen, the paramount chief of Edina, is carried in a palanquin to the lagoon and casts the first net, formally lifting the ban. Decorated canoes follow onto the water, and the town holds a grand durbar of chiefs and queen mothers.',
  'It happens right by the lagoon bridge and causeway near Elmina Castle, making it an easy pairing with a castle and harbour visit on the same day.'],
  highlights: [
  'The paramount chief casting the ceremonial first net into the Benya Lagoon',
  'Decorated canoes on the lagoon marking the fishing season’s reopening',
  'The royal procession from the palace to the waterfront',
  'A durbar of chiefs and queen mothers in Elmina town'],
  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Host town', value: 'Elmina' },
  { label: 'When', value: 'First Tuesday in July' },
  { label: 'Who celebrates', value: 'The Edina traditional area' },
  { label: 'Marks', value: 'The ceremonial reopening of the fishing season' }],
  gettingThere: [
  'Elmina is fifteen minutes west of Cape Coast, about three hours from Accra.',
  'Shared taxis run continuously between Cape Coast and Elmina.',
  'The lagoon and causeway are a short walk from Elmina Castle.'],
  tips: [
  'Combine with Elmina Castle and the fishing harbour on the same day — they’re a few minutes apart.',
  'Get to the lagoon bridge early for a clear view of the net-casting.'],
  nearby: ['elmina-castle', 'elmina-harbour', 'cape-coast-castle']
},
{
  slug: 'akwasidae-festival',
  name: 'Akwasidae',
  headline: 'Akwasidae: the Asantehene’s court gathers at Manhyia Palace',
  region: 'Ashanti Region',
  category: 'Festivals',
  summary:
  'Every sixth Sunday, the Asantehene, chiefs and elders assemble at Manhyia Palace to honour Asante ancestors and display the Golden Stool — the closest most visitors get to the working court of the Asante kingdom.',
  image: '/akwasidae-festival-01.jpg',
  imageCredit: 'Photo: Zack Agon / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/akwasidae-festival-01.jpg'],
  festivalTiming: {
    months: [],
    note: 'Falls on a Sunday every sixth week as part of the Akan 42-day Adae cycle — check the current cycle for the next date'
  },
  coordinates: { lat: 6.703552, lng: -1.615004 },
  overview: [
  'Akwasidae is part of the forty-two day Adae cycle observed by the Asante state, held on a Sunday every sixth week. Libation is poured to royal ancestors at the Sikadwa Kofi, the Golden Stool, and a grander version, Adae Kese, is held roughly twice a year.',
  'The ceremony takes place in the courtyard of Manhyia Palace in Kumasi. The Asantehene appears in full regalia, chiefs and sub-chiefs pay homage in strict order of precedence, and drumming ensembles play repertoires specific to the Asante court.',
  'Unlike an annual festival, Akwasidae repeats roughly every six weeks, so dates need checking against the current Adae calendar. It pairs directly with a visit to the Manhyia Palace Museum, which sits on the same grounds.'],
  highlights: [
  'The Asantehene’s public appearance in full kente and gold regalia',
  'Sub-chiefs and elders paying homage in strict order of precedence',
  'Fontomfrom and other talking-drum ensembles specific to the Asante court',
  'The Golden Stool displayed within the palace grounds'],
  quickFacts: [
  { label: 'Region', value: 'Ashanti Region' },
  { label: 'Location', value: 'Manhyia Palace, Kumasi' },
  { label: 'When', value: 'Every sixth Sunday, part of the 42-day Adae cycle' },
  { label: 'Who celebrates', value: 'The Asantehene and the Asante royal court' },
  { label: 'Note', value: 'Dates follow the Adae calendar — confirm the next one before travelling' }],
  gettingThere: [
  'Kumasi is about four to five hours north of Accra by road, or a short domestic flight.',
  'Manhyia Palace is in central Kumasi, reachable by taxi from anywhere in the city.',
  'Pair with the Manhyia Palace Museum, which sits on the same grounds.'],
  tips: [
  'Confirm the next Akwasidae date locally or with the palace before planning around it — the Adae cycle doesn’t follow a fixed monthly pattern.',
  'Modest, respectful dress is expected; this is a working court occasion, not a staged show.'],
  nearby: ['manhyia-palace', 'bonwire-kente']
},
{
  slug: 'kobine-festival',
  name: 'Kobine',
  headline: 'Kobine: Lawra’s harvest reunion, danced to the gourd drum',
  region: 'Upper West Region',
  category: 'Festivals',
  summary:
  'Deep in the Upper West, Lawra’s Dagara community spends four days reuniting scattered families, parading as hunters and elephants, and competing in the region’s signature Kobine dance.',
  image: '/kobine-festival-01.jpg',
  imageCredit: 'Photo: Kopareh / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/kobine-festival-01.jpg'],
  festivalTiming: {
    months: [9, 10],
    note: 'Exact four-day dates are set annually by the Lawra traditional council'
  },
  coordinates: { lat: 10.65, lng: -2.8667 },
  overview: [
  'Kobine is a harvest and family-reunion festival of the Dagara people. The first day is set aside purely for family visits and reconciliation, before the public events begin.',
  'The days that follow bring a durbar of chiefs with processions of young men dressed as hunters or elephants, building to the festival’s centrepiece: a dance competition performed to gourd drums, known as kuor, and clay-pot-neck instruments, known as dalar. This Kobine dance is found in this form nowhere else in Ghana.',
  'Lawra sits in Ghana’s far north, near the Burkina Faso border, genuinely remote from Accra and Kumasi. It is worth planning as a dedicated trip rather than a side stop, and worth it for a festival that stays distinctly local.'],
  highlights: [
  'The Kobine dance competition, performed to gourd and clay-pot drums found nowhere else in Ghana',
  'Processions of young men costumed as hunters and elephants',
  'A durbar of Dagara chiefs from across the Lawra traditional area',
  'A first day set aside purely for family reunions before the public events begin'],
  quickFacts: [
  { label: 'Region', value: 'Upper West Region' },
  { label: 'Host town', value: 'Lawra, near the Burkina Faso border' },
  { label: 'When', value: 'Late September into October, over four days' },
  { label: 'Who celebrates', value: 'The Dagara people of the Lawra traditional area' },
  { label: 'Format', value: 'A family day, then a chiefs’ durbar and dance competition' }],
  gettingThere: [
  'Lawra is in Ghana’s far north, roughly twelve hours by road from Accra or four to five hours from Tamale.',
  'The most practical route is a domestic flight to Tamale, then road to Lawra via Wa.',
  'This is a genuinely remote trip — plan for it as its own itinerary rather than an add-on.'],
  tips: [
  'Arrange accommodation in Wa if Lawra itself is fully booked over festival weekend.',
  'The festival stays local and family-centred — visitors are welcome at the public durbar and dance competition, less so on the family reunion day.'],
  nearby: ['paga-crocodile-pond', 'mole-national-park']
},
{
  slug: 'panafest-emancipation-day',
  name: 'Panafest & Emancipation Day',
  headline: 'Panafest: Cape Coast and Elmina’s biennial gathering of the African diaspora',
  region: 'Central Region',
  category: 'Festivals',
  summary:
  'Every odd-numbered year, the Pan-African Historical Theatre Festival brings performers and visitors from across Africa and its diaspora to Cape Coast and Elmina, closing with a candlelight vigil at the Door of No Return.',
  image: '/panafest-emancipation-day-01.jpg',
  imageCredit: 'Photo: ZSM / Wikimedia Commons (CC BY-SA 3.0)',
  gallery: ['/panafest-emancipation-day-01.jpg'],
  festivalTiming: {
    months: [7, 8],
    note: 'Held only in odd-numbered years'
  },
  coordinates: { lat: 5.103647, lng: -1.24106 },
  overview: [
  'Panafest was founded in 1992, conceived by the playwright Efua Sutherland, as a biennial Pan-African Historical Theatre Festival for Africans and the diaspora, held in odd-numbered years.',
  'The programme includes a Northern Pilgrimage retracing historical routes associated with the slave trade, along with theatre, music and poetry performances staged around Cape Coast and Elmina. It runs alongside Emancipation Day, a related commemoration of the 1834 abolition of slavery in British colonies, and closes with a candlelight vigil and reenactment at the Door of No Return in Cape Coast Castle.',
  'It centres on the same UNESCO castles most heritage visitors already plan to see, but on these specific dates the sites carry a different, more charged public programme than an ordinary day visit.'],
  highlights: [
  'The candlelight vigil and reenactment at Cape Coast Castle’s Door of No Return',
  'Theatre, music and poetry performances staged around Cape Coast and Elmina',
  'The Northern Pilgrimage retracing historical slave-trade routes',
  'A gathering point for the African diaspora, not only Ghanaians'],
  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Venues', value: 'Cape Coast Castle and Elmina Castle' },
  { label: 'When', value: 'Late July into early August, odd-numbered years only' },
  { label: 'Founded', value: '1992' },
  { label: 'Related event', value: 'Emancipation Day, commemorating the 1834 abolition of slavery' }],
  gettingThere: [
  'Cape Coast is about two and a half to three hours west of Accra on the N1; Elmina is a further fifteen minutes.',
  'Book accommodation in Cape Coast or Elmina well ahead — rooms fill fast in festival years.',
  'Events run across both towns, so a car or taxi for the short hop between them helps.'],
  tips: [
  'This runs in odd-numbered years only — check the confirmed dates for the current edition before booking, since the programme shifts year to year.',
  'The Door of No Return vigil is a solemn, memorial occasion rather than a celebration; dress and behave accordingly.'],
  nearby: ['cape-coast-castle', 'elmina-castle', 'elmina-harbour']
},
{
  slug: 'chale-wote-festival',
  name: 'Chale Wote Street Art Festival',
  headline: 'Chale Wote: Jamestown’s old streets turned into an open-air gallery',
  region: 'Greater Accra',
  category: 'Festivals',
  summary:
  'For five days each August, Accra’s historic Jamestown fills with murals, performance and film as the Chale Wote Street Art Festival turns its lanes and lighthouse into Ghana’s biggest contemporary arts event.',
  image: '/chale-wote-festival.jpg',
  imageCredit: 'Photo: ThompsonArmah / Wikimedia Commons (CC BY-SA 4.0)',
  gallery: ['/chale-wote-festival.jpg'],
  festivalTiming: {
    months: [8],
    note: 'Exact five-day dates are announced annually, usually mid-to-late August'
  },
  coordinates: { lat: 5.5372, lng: -0.2138 },
  overview: [
  'Chale Wote was founded in 2011 by Mantse Aryeequaye and Sionne Neely of the ACCRA[dot]ALT collective, together with Redd Kat Pictures. The name comes from the Ga phrase "chalé wote", roughly "friend, let’s go".',
  'For the festival’s five days, Jamestown’s streets, colonial-era buildings and lighthouse become an open-air gallery for murals and graffiti, alongside spoken word, film screenings and performance, drawing crowds reported in the tens of thousands depending on the year.',
  'It differs from every other festival on this list in being contemporary and youth-led rather than built around chieftaincy or traditional rites, and it is the most walkable of any of them since it happens inside Accra itself.'],
  highlights: [
  'New murals painted directly onto Jamestown’s walls each year',
  'Performance art, spoken word and film screenings through the old town',
  'Climbing the Jamestown Lighthouse for a view over the festival',
  'A younger, more experimental crowd than Ghana’s traditional festivals'],
  quickFacts: [
  { label: 'Region', value: 'Greater Accra' },
  { label: 'Host area', value: 'Jamestown, Accra' },
  { label: 'When', value: 'Late August, around five days' },
  { label: 'Founded', value: '2011, by the ACCRA[dot]ALT collective' },
  { label: 'Character', value: 'Contemporary street art and performance, not a chieftaincy festival' }],
  gettingThere: [
  'Jamestown is a short Uber or Bolt ride from anywhere in central Accra, or walkable from Osu and the CBD.',
  'Streets around the festival hub close to cars — arrive on foot or be ready to park some distance out.',
  'Book accommodation in central Accra rather than Jamestown itself, which has limited lodging.'],
  tips: [
  'Go on a weekend day for the fullest programme — some installations and performances are day-specific.',
  'Keep an eye on belongings in the crowds, as with any dense street festival.'],
  nearby: ['independence-square', 'labadi-beach']
},
{
  slug: 'kempinski-hotel-accra',
  name: 'Kempinski Hotel Gold Coast City',
  headline: 'Kempinski Hotel Gold Coast City: five-star comfort in the heart of Accra',
  region: 'Greater Accra',
  category: 'Where To Stay',
  summary:
  'A five-star landmark on Gamel Abdul Nasser Avenue, with a rooftop pool, spa and some of the largest rooms in the capital.',
  image: '/kempinski-hotel-accra-01.jpg',
  gallery: [
  '/kempinski-hotel-accra-01.jpg',
  '/kempinski-hotel-accra-02.jpg',
  '/kempinski-hotel-accra-03.jpg',
  '/kempinski-hotel-accra-04.jpg',
  '/kempinski-hotel-accra-05.jpg',
  '/kempinski-hotel-accra-06.jpg',
  '/kempinski-hotel-accra-07.jpg',
  '/kempinski-hotel-accra-08.jpg',
  '/kempinski-hotel-accra-09.jpg',
  '/kempinski-hotel-accra-10.jpg'],
  photoCategories: {
    '/kempinski-hotel-accra-01.jpg': 'exterior',
    '/kempinski-hotel-accra-02.jpg': 'exterior',
    '/kempinski-hotel-accra-03.jpg': 'exterior',
    '/kempinski-hotel-accra-04.jpg': 'exterior',
    '/kempinski-hotel-accra-05.jpg': 'amenities',
    '/kempinski-hotel-accra-06.jpg': 'amenities',
    '/kempinski-hotel-accra-07.jpg': 'amenities',
    '/kempinski-hotel-accra-08.jpg': 'amenities',
    '/kempinski-hotel-accra-09.jpg': 'rooms',
    '/kempinski-hotel-accra-10.jpg': 'rooms',
  },
  coordinates: { lat: 5.5580, lng: -0.1969 },
  overview: [
  'The Kempinski sits close to Accra’s diplomatic and business district, a short drive from Osu and Independence Square. Its rooftop pool deck looks out over the city and is one of the few places in Accra to get a proper skyline view.',
  'Rooms run large by regional standards, and the hotel’s spa, gym and business centre make it a common choice for conferences as well as leisure stays.'],

  highlights: [
  'Rooftop pool and terrace bar overlooking the city',
  'Full-service spa and 24-hour fitness centre',
  'Multiple restaurants covering Ghanaian, Pan-Asian and international menus',
  'Business centre and conference floors for meetings and events'],

  quickFacts: [
  { label: 'Region', value: 'Greater Accra' },
  { label: 'Style', value: 'Five-star, business and leisure' },
  { label: 'Check-in', value: 'From 14:00' },
  { label: 'Best for', value: 'Business travellers and short city stays' }],

  gettingThere: [
  'About twenty-five minutes from Kotoka International Airport by road, depending on traffic.',
  'Walking distance from Independence Square and central Accra.'],

  tips: [
  'Book the rooftop pool bar in advance on weekends, it gets busy with non-guests too.',
  'Ask for a room on a higher floor for the best skyline view.'],

  nearby: ['independence-square', 'labadi-beach', 'accra-food']
},
{
  slug: 'labadi-beach-hotel',
  name: 'Labadi Beach Hotel',
  headline: 'Labadi Beach Hotel: private beachfront stay next to La Pleasure Beach',
  region: 'Greater Accra',
  category: 'Where To Stay',
  summary:
  'A beachfront hotel with direct access to its own stretch of sand next to Labadi Beach, popular for weekend pool days as well as overnight stays.',
  image: '/labadi-beach-hotel-01.jpg',
  gallery: [
  '/labadi-beach-hotel-01.jpg',
  '/labadi-beach-hotel-02.jpg',
  '/labadi-beach-hotel-03.jpg',
  '/labadi-beach-hotel-04.jpg',
  '/labadi-beach-hotel-05.jpg',
  '/labadi-beach-hotel-06.jpg',
  '/labadi-beach-hotel-07.jpg',
  '/labadi-beach-hotel-08.jpg',
  '/labadi-beach-hotel-09.jpg',
  '/labadi-beach-hotel-10.jpg',
  '/labadi-beach-hotel-11.jpg',
  '/labadi-beach-hotel-12.jpg'],
  photoCategories: {
    '/labadi-beach-hotel-01.jpg': 'exterior',
    '/labadi-beach-hotel-02.jpg': 'exterior',
    '/labadi-beach-hotel-03.jpg': 'exterior',
    '/labadi-beach-hotel-04.jpg': 'amenities',
    '/labadi-beach-hotel-05.jpg': 'amenities',
    '/labadi-beach-hotel-06.jpg': 'amenities',
    '/labadi-beach-hotel-07.jpg': 'amenities',
    '/labadi-beach-hotel-08.jpg': 'amenities',
    '/labadi-beach-hotel-09.jpg': 'amenities',
    '/labadi-beach-hotel-10.jpg': 'rooms',
    '/labadi-beach-hotel-11.jpg': 'rooms',
    '/labadi-beach-hotel-12.jpg': 'rooms',
  },
  coordinates: { lat: 5.5605, lng: -0.1594 },
  overview: [
  'Labadi Beach Hotel sits directly on the coast east of central Accra, with private beach access that keeps it quieter than the public beach next door.',
  'The gardens and pool terrace face the Atlantic, and the hotel is a regular venue for weekend brunches and live music as well as a base for beach days.'],

  highlights: [
  'Private beach frontage separate from the public Labadi Beach',
  'Poolside terrace with regular weekend entertainment',
  'Gardens running down to the shoreline',
  'Short drive from Osu’s restaurants and nightlife'],

  quickFacts: [
  { label: 'Region', value: 'Greater Accra' },
  { label: 'Style', value: 'Beachfront, four-star' },
  { label: 'Check-in', value: 'From 14:00' },
  { label: 'Best for', value: 'Beach days and weekend stays' }],

  gettingThere: [
  'About twenty minutes from Kotoka International Airport by road.',
  'A short taxi ride from Osu and central Accra.'],

  tips: [
  'Non-guests can often buy a day pass for the pool and beach — worth asking ahead.',
  'Weekends are busiest, book early if visiting for a specific event.'],

  nearby: ['labadi-beach', 'independence-square', 'accra-food']
},
{
  slug: 'villa-monticello-accra',
  name: 'Villa Monticello',
  headline: 'Villa Monticello: a boutique courtyard stay in Osu',
  region: 'Greater Accra',
  category: 'Where To Stay',
  summary:
  'A small boutique hotel in Osu built around a plunge pool and courtyard, walking distance from Oxford Street’s restaurants and shops.',
  image: '/villa-monticello-accra-01.jpg',
  gallery: [
  '/villa-monticello-accra-01.jpg',
  '/villa-monticello-accra-02.jpg',
  '/villa-monticello-accra-03.jpg'],
  photoCategories: {
    '/villa-monticello-accra-01.jpg': 'exterior',
    '/villa-monticello-accra-02.jpg': 'amenities',
    '/villa-monticello-accra-03.jpg': 'amenities',
  },
  coordinates: { lat: 5.5590, lng: -0.1780 },
  overview: [
  'Villa Monticello trades scale for character — a handful of rooms set around a courtyard and small plunge pool in the middle of Osu.',
  'Its Oxford Street location puts most of Osu’s restaurants, bars and shops within walking distance, making it a base for travellers who want to be in the middle of things rather than out by the beach.'],

  highlights: [
  'Courtyard plunge pool and lounge area',
  'Walking distance from Oxford Street’s restaurants and bars',
  'Small enough for personal, attentive service',
  'On-site restaurant serving Ghanaian and continental dishes'],

  quickFacts: [
  { label: 'Region', value: 'Greater Accra' },
  { label: 'Style', value: 'Boutique' },
  { label: 'Check-in', value: 'From 14:00' },
  { label: 'Best for', value: 'Couples and short city breaks' }],

  gettingThere: [
  'About twenty minutes from Kotoka International Airport by road.',
  'Walkable to most of Osu’s restaurants and bars.'],

  tips: [
  'Rooms are limited, book ahead during December and festival weekends.',
  'Ask for a courtyard-facing room if you want to hear less street noise.'],

  nearby: ['accra-food', 'independence-square', 'labadi-beach']
},
{
  slug: 'coconut-grove-beach-resort-elmina',
  name: 'Coconut Grove Beach Resort',
  headline: 'Coconut Grove Beach Resort: beachfront base for Elmina and Cape Coast',
  region: 'Central Region',
  category: 'Where To Stay',
  summary:
  'A beachfront resort just outside Elmina, within easy reach of Elmina Castle, Cape Coast Castle and Kakum National Park.',
  image: '/coconut-grove-beach-resort-elmina-01.jpg',
  gallery: [
  '/coconut-grove-beach-resort-elmina-01.jpg',
  '/coconut-grove-beach-resort-elmina-02.jpg',
  '/coconut-grove-beach-resort-elmina-03.jpg',
  '/coconut-grove-beach-resort-elmina-04.jpg',
  '/coconut-grove-beach-resort-elmina-05.jpg',
  '/coconut-grove-beach-resort-elmina-06.jpg',
  '/coconut-grove-beach-resort-elmina-07.jpg',
  '/coconut-grove-beach-resort-elmina-08.jpg',
  '/coconut-grove-beach-resort-elmina-09.jpg',
  '/coconut-grove-beach-resort-elmina-10.jpg',
  '/coconut-grove-beach-resort-elmina-11.jpg',
  '/coconut-grove-beach-resort-elmina-12.jpg',
  '/coconut-grove-beach-resort-elmina-13.jpg',
  '/coconut-grove-beach-resort-elmina-14.jpg',
  '/coconut-grove-beach-resort-elmina-15.jpg',
  '/coconut-grove-beach-resort-elmina-16.jpg'],
  photoCategories: {
    '/coconut-grove-beach-resort-elmina-01.jpg': 'amenities',
    '/coconut-grove-beach-resort-elmina-02.jpg': 'exterior',
    '/coconut-grove-beach-resort-elmina-03.jpg': 'exterior',
    '/coconut-grove-beach-resort-elmina-04.jpg': 'exterior',
    '/coconut-grove-beach-resort-elmina-05.jpg': 'exterior',
    '/coconut-grove-beach-resort-elmina-06.jpg': 'exterior',
    '/coconut-grove-beach-resort-elmina-07.jpg': 'rooms',
    '/coconut-grove-beach-resort-elmina-08.jpg': 'rooms',
    '/coconut-grove-beach-resort-elmina-09.jpg': 'rooms',
    '/coconut-grove-beach-resort-elmina-10.jpg': 'amenities',
    '/coconut-grove-beach-resort-elmina-11.jpg': 'amenities',
    '/coconut-grove-beach-resort-elmina-12.jpg': 'amenities',
    '/coconut-grove-beach-resort-elmina-13.jpg': 'amenities',
    '/coconut-grove-beach-resort-elmina-14.jpg': 'amenities',
    '/coconut-grove-beach-resort-elmina-15.jpg': 'amenities',
    '/coconut-grove-beach-resort-elmina-16.jpg': 'amenities',
  },
  coordinates: { lat: 5.0910, lng: -1.3610 },
  overview: [
  'Coconut Grove sits on a quiet stretch of coast a few minutes from Elmina town, making it one of the more convenient bases for visiting the Central Region’s castles and Kakum National Park in the same trip.',
  'Grounds run from the rooms down to the beach, with a pool set back from the shore for calmer swimming than the open Atlantic.'],

  highlights: [
  'Direct beach access a short walk from Elmina town',
  'Pool and gardens set back from the shoreline',
  'Within a thirty-minute drive of Kakum National Park',
  'On-site restaurant serving fresh seafood'],

  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Style', value: 'Beach resort' },
  { label: 'Check-in', value: 'From 14:00' },
  { label: 'Best for', value: 'Castle and Kakum day trips' }],

  gettingThere: [
  'About fifteen minutes by taxi from Elmina town.',
  'Around forty-five minutes from Cape Coast by road.'],

  tips: [
  'Book a room away from the main pool if you want a quieter night.',
  'Arrange castle and Kakum tours a day ahead through the front desk.'],

  nearby: ['elmina-castle', 'elmina-harbour', 'cape-coast-castle']
},
{
  slug: 'anomabo-beach-resort',
  name: 'Anomabo Beach Resort',
  headline: 'Anomabo Beach Resort: quiet coastline between Cape Coast and Saltpond',
  region: 'Central Region',
  category: 'Where To Stay',
  summary:
  'A low-rise beach resort in the fishing town of Anomabo, a quieter alternative to staying directly in Cape Coast.',
  image: '/anomabo-beach-resort-01.jpg',
  gallery: [
  '/anomabo-beach-resort-01.jpg',
  '/anomabo-beach-resort-02.jpg',
  '/anomabo-beach-resort-03.jpg',
  '/anomabo-beach-resort-04.jpg',
  '/anomabo-beach-resort-05.jpg',
  '/anomabo-beach-resort-06.jpg',
  '/anomabo-beach-resort-07.jpg'],
  photoCategories: {
    '/anomabo-beach-resort-01.jpg': 'amenities',
    '/anomabo-beach-resort-02.jpg': 'exterior',
    '/anomabo-beach-resort-03.jpg': 'exterior',
    '/anomabo-beach-resort-04.jpg': 'rooms',
    '/anomabo-beach-resort-05.jpg': 'amenities',
    '/anomabo-beach-resort-06.jpg': 'amenities',
    '/anomabo-beach-resort-07.jpg': 'amenities',
  },
  coordinates: { lat: 5.1690, lng: -1.1230 },
  overview: [
  'Anomabo is a working fishing town east of Cape Coast, and the resort here trades the density of Cape Coast’s hotels for a longer, quieter beach.',
  'It works well as a base for travellers splitting time between Cape Coast Castle, Kakum National Park and simply resting on the coast for a day.'],

  highlights: [
  'A long, uncrowded beach in front of the resort',
  'Fort William and Anomabo’s fishing harbour nearby',
  'Pool and beachfront restaurant',
  'Around thirty minutes from Cape Coast Castle'],

  quickFacts: [
  { label: 'Region', value: 'Central Region' },
  { label: 'Style', value: 'Beach resort' },
  { label: 'Check-in', value: 'From 13:00' },
  { label: 'Best for', value: 'A quieter alternative to central Cape Coast' }],

  gettingThere: [
  'About thirty minutes east of Cape Coast by road.',
  'Shared taxis run between Anomabo and Cape Coast through the day.'],

  tips: [
  'Currents can be strong — ask staff before swimming beyond the shallows.',
  'Bring cash, card acceptance is limited outside the resort itself.'],

  nearby: ['cape-coast-castle', 'kakum-national-park', 'elmina-castle']
},
{
  slug: 'busua-beach-resort',
  name: 'Busua Beach Resort',
  headline: 'Busua Beach Resort: Ghana’s surf town on the western coast',
  region: 'Western Region',
  category: 'Where To Stay',
  summary:
  'A beachfront resort in Busua, the Western Region’s best-known surf town, with board rental and lessons run out of the village itself.',
  image: images.hotel,
  gallery: [images.nzulezu, images.labadi],
  coordinates: { lat: 4.7820, lng: -1.9330 },
  overview: [
  'Busua has grown into Ghana’s main surf town, with a wide, gently shelving beach that suits beginners as well as more experienced surfers.',
  'The resort sits directly on the sand at one end of the village, within walking distance of the guesthouses, bars and board-rental shacks that make up the rest of Busua.'],

  highlights: [
  'Direct beach access with board rental nearby in the village',
  'Surf lessons available through local operators',
  'A relaxed, low-key village atmosphere',
  'Boat trips to Butre and nearby Fort Batenstein'],

  quickFacts: [
  { label: 'Region', value: 'Western Region' },
  { label: 'Style', value: 'Beach resort' },
  { label: 'Check-in', value: 'From 13:00' },
  { label: 'Best for', value: 'Surfing and slow beach days' }],

  gettingThere: [
  'About two and a half hours from Takoradi by road.',
  'Shared taxis run from Takoradi to Agona Nkwanta, with connections on to Busua.'],

  tips: [
  'The best swell runs roughly April to October — ask locally before booking a surf trip.',
  'Card payment is unreliable in Busua village itself, carry cash.'],

  nearby: ['nzulezu', 'kundum-festival']
},
{
  slug: 'golden-tulip-kumasi-city',
  name: 'Golden Tulip Kumasi City',
  headline: 'Golden Tulip Kumasi City: a business-grade base in the Ashanti capital',
  region: 'Ashanti Region',
  category: 'Where To Stay',
  summary:
  'A hilltop hotel overlooking Kumasi, close to Manhyia Palace and Kejetia Market, with conference space that makes it a regular choice for business travel.',
  image: images.kente,
  gallery: [images.hotel, images.chief],
  coordinates: { lat: 6.6980, lng: -1.6280 },
  overview: [
  'The Golden Tulip sits on a hill above central Kumasi, one of the few hotels in the city with a view over the surrounding forest and rooftops.',
  'It draws a mix of business travellers using the conference facilities and visitors using it as a base for Manhyia Palace, Kejetia Market and the kente-weaving villages nearby.'],

  highlights: [
  'Hilltop pool with views over Kumasi',
  'Conference and event space used for business travel',
  'A short drive from Manhyia Palace and Kejetia Market',
  'Within reach of the kente-weaving villages around Bonwire'],

  quickFacts: [
  { label: 'Region', value: 'Ashanti Region' },
  { label: 'Style', value: 'Business and leisure' },
  { label: 'Check-in', value: 'From 14:00' },
  { label: 'Best for', value: 'Business stays and palace visits' }],

  gettingThere: [
  'About twenty minutes from Kumasi Airport by road.',
  'A short taxi ride from Manhyia Palace and central Kumasi.'],

  tips: [
  'Book early during major Ashanti festivals such as Akwasidae, when the city fills up.',
  'Traffic into central Kumasi can be heavy in the late afternoon — plan around it.'],

  nearby: ['manhyia-palace', 'bonwire-kente', 'akwasidae-festival']
},
{
  slug: 'noda-hotel-kumasi',
  name: 'Noda Hotel',
  headline: 'Noda Hotel: a central Kumasi stay close to Kejetia',
  region: 'Ashanti Region',
  category: 'Where To Stay',
  summary:
  'A mid-range hotel in central Kumasi, within walking distance of Kejetia Market and a short ride from Manhyia Palace.',
  image: images.hotel,
  gallery: [images.kente, images.chief],
  coordinates: { lat: 6.6926, lng: -1.6182 },
  overview: [
  'Noda Hotel sits in the middle of Kumasi rather than out on the hills, which makes it a practical base for travellers spending most of their time in the old town rather than on excursions.',
  'Kejetia Market, one of West Africa’s largest, is within walking distance, and Manhyia Palace is a short taxi ride away.'],

  highlights: [
  'Walking distance from Kejetia Market',
  'Close to Manhyia Palace and the old town',
  'On-site restaurant serving Ghanaian dishes',
  'Practical, no-frills rooms at a mid-range price'],

  quickFacts: [
  { label: 'Region', value: 'Ashanti Region' },
  { label: 'Style', value: 'Mid-range, city centre' },
  { label: 'Check-in', value: 'From 13:00' },
  { label: 'Best for', value: 'Market and old-town visits' }],

  gettingThere: [
  'About twenty-five minutes from Kumasi Airport by road.',
  'Walking distance from Kejetia Market and central Kumasi.'],

  tips: [
  'Kejetia is busiest and most interesting in the morning — start early.',
  'Agree the fare with taxi drivers before setting off, as meters are rarely used.'],

  nearby: ['manhyia-palace', 'bonwire-kente', 'akwasidae-festival']
},
{
  slug: 'royal-senchi-resort-akosombo',
  name: 'Royal Senchi Resort',
  headline: 'Royal Senchi Resort: riverside stay above the Akosombo Dam',
  region: 'Eastern Region',
  category: 'Where To Stay',
  summary:
  'A resort on the banks of the Volta River just above the Akosombo Dam, with pool decks and gardens running down to the water.',
  image: images.aburi,
  gallery: [images.hotel, images.wli],
  coordinates: { lat: 6.2560, lng: 0.0540 },
  overview: [
  'Royal Senchi sits on the Volta River a short drive from the Akosombo Dam, with the river itself as the main draw — most rooms and the pool deck face the water.',
  'It’s a common weekend escape from Accra, about two hours by road, and works well combined with a stop at Aburi Botanical Gardens on the way.'],

  highlights: [
  'Riverside pool decks and gardens on the Volta',
  'Boat trips on the river arranged through the resort',
  'A short drive from the Akosombo Dam',
  'Quiet enough for a genuine weekend break from Accra'],

  quickFacts: [
  { label: 'Region', value: 'Eastern Region' },
  { label: 'Style', value: 'Riverside resort' },
  { label: 'Check-in', value: 'From 14:00' },
  { label: 'Best for', value: 'Weekend breaks from Accra' }],

  gettingThere: [
  'About two hours from Accra by road.',
  'Combine with a stop at Aburi Botanical Gardens on the drive up.'],

  tips: [
  'Book a river-facing room — some standard rooms face the car park instead.',
  'Weekends fill up with Accra day-trippers, book ahead.'],

  nearby: ['aburi-gardens', 'odwira-festival']
},
{
  slug: 'volta-serene-hotel-ho',
  name: 'Volta Serene Hotel',
  headline: 'Volta Serene Hotel: a base in Ho for Wli Falls and the Volta hills',
  region: 'Volta Region',
  category: 'Where To Stay',
  summary:
  'A hillside hotel in Ho, the most practical overnight base for reaching Wli Falls and the Volta Region’s hiking trails.',
  image: images.wli,
  gallery: [images.hotel, images.aburi],
  coordinates: { lat: 6.6010, lng: 0.4710 },
  overview: [
  'Ho sits at the base of the Volta hills and works as the main overnight stop for travellers heading to Wli Falls, Mount Afadjato and the region’s hiking trails.',
  'The Volta Serene is set on rising ground on the edge of town, with views out over Ho and the hills beyond.'],

  highlights: [
  'Hillside views over Ho and the surrounding Volta hills',
  'The most practical base for day trips to Wli Falls',
  'Restaurant serving Ghanaian and continental dishes',
  'Quiet compared to hotels in Accra or Kumasi'],

  quickFacts: [
  { label: 'Region', value: 'Volta Region' },
  { label: 'Style', value: 'Mid-range, hillside' },
  { label: 'Check-in', value: 'From 13:00' },
  { label: 'Best for', value: 'Wli Falls and Volta hiking trips' }],

  gettingThere: [
  'About three hours from Accra by road.',
  'Wli Falls is roughly an hour’s drive further northeast.'],

  tips: [
  'Arrange a driver or tro-tro to Wli the evening before — services thin out later in the day.',
  'Pack layers, evenings in the hills are noticeably cooler than the coast.'],

  nearby: ['wli-waterfalls', 'hogbetsotso-festival']
},
{
  slug: 'zaina-lodge-mole',
  name: 'Zaina Lodge',
  headline: 'Zaina Lodge: tented luxury inside Mole National Park',
  region: 'Savannah Region',
  category: 'Where To Stay',
  summary:
  'A tented lodge inside Mole National Park itself, close enough to the waterhole to watch elephants without leaving the grounds.',
  image: images.mole,
  gallery: [images.hotel, images.paga],
  coordinates: { lat: 9.2833, lng: -1.8500 },
  overview: [
  'Zaina Lodge is built inside Mole National Park rather than at its edge, which means wildlife sometimes passes through the grounds themselves.',
  'Tented rooms are raised on platforms with views over the bush, and the lodge runs its own guided game drives and walking safaris in addition to those bookable at the park gate.'],

  highlights: [
  'Elevated tented rooms overlooking the park’s bushland',
  'Guided game drives and walking safaris run from the lodge',
  'A pool positioned to watch wildlife at a nearby waterhole',
  'Full board included given the remote location'],

  quickFacts: [
  { label: 'Region', value: 'Savannah Region' },
  { label: 'Style', value: 'Tented safari lodge' },
  { label: 'Check-in', value: 'From 14:00' },
  { label: 'Best for', value: 'Wildlife viewing inside the park' }],

  gettingThere: [
  'Reached by light aircraft to Mole’s airstrip or a long drive from Tamale, around four hours by road.',
  'The lodge arranges airstrip and gate transfers for guests.'],

  tips: [
  'Book game drives for early morning or late afternoon, when animals are most active.',
  'The dry season, roughly December to April, gives the best wildlife viewing.'],

  nearby: ['mole-national-park', 'damba-festival']
},
{
  slug: 'sun-city-hotel-tamale',
  name: 'Sun City Hotel',
  headline: 'Sun City Hotel: a central Tamale base for the Northern Region',
  region: 'Northern Region',
  category: 'Where To Stay',
  summary:
  'A mid-range hotel in central Tamale, the usual staging point for trips to Mole National Park and Northern Region festivals.',
  image: images.hotel,
  gallery: [images.mole, images.paga],
  coordinates: { lat: 9.4075, lng: -0.8393 },
  overview: [
  'Tamale is the main transport hub for the north, and Sun City Hotel sits close to the centre of town, convenient for onward travel to Mole National Park or festival towns further afield.',
  'Rooms are straightforward and the restaurant serves a mix of Ghanaian and continental dishes, with the hotel acting mainly as a comfortable overnight stop rather than a destination in itself.'],

  highlights: [
  'Central Tamale location near transport connections',
  'Restaurant and bar on site',
  'A practical staging point for Mole National Park',
  'Convenient for Damba and other Northern Region festivals'],

  quickFacts: [
  { label: 'Region', value: 'Northern Region' },
  { label: 'Style', value: 'Mid-range, city centre' },
  { label: 'Check-in', value: 'From 13:00' },
  { label: 'Best for', value: 'Overnight stops en route to Mole' }],

  gettingThere: [
  'A short taxi ride from Tamale Airport.',
  'About four hours by road from Mole National Park.'],

  tips: [
  'Arrange onward transport to Mole a day ahead, options thin out later in the day.',
  'Book well ahead during Damba, when the town fills up.'],

  nearby: ['damba-festival', 'mole-national-park']
},
{
  slug: 'royal-park-hotel-bolgatanga',
  name: 'Royal Park Hotel',
  headline: 'Royal Park Hotel: a Bolgatanga base for the Upper East',
  region: 'Upper East Region',
  category: 'Where To Stay',
  summary:
  'A straightforward hotel in Bolgatanga, the usual overnight base for visiting Paga’s crocodile ponds and the Upper East’s craft villages.',
  image: images.paga,
  gallery: [images.hotel, images.mole],
  coordinates: { lat: 10.7856, lng: -0.8514 },
  overview: [
  'Bolgatanga is the main town of the Upper East, known for its basket weaving and leatherwork as well as being the closest base for Paga, near the Burkina Faso border.',
  'Royal Park Hotel offers plain, comfortable rooms and a restaurant, functioning mainly as a base for day trips rather than a destination itself.'],

  highlights: [
  'A practical base for visiting Paga’s crocodile ponds',
  'Close to Bolgatanga’s basket-weaving and leatherwork markets',
  'On-site restaurant and bar',
  'Quiet, low-traffic surroundings'],

  quickFacts: [
  { label: 'Region', value: 'Upper East Region' },
  { label: 'Style', value: 'Mid-range, city centre' },
  { label: 'Check-in', value: 'From 13:00' },
  { label: 'Best for', value: 'Paga day trips and craft-market visits' }],

  gettingThere: [
  'About forty minutes from Paga by road.',
  'Roughly three hours north of Tamale by road.'],

  tips: [
  'Bring cash, card acceptance is limited this far north.',
  'Bargain respectfully at the basket and leather markets, prices are rarely fixed.'],

  nearby: ['paga-crocodile-pond']
},
{
  slug: 'upland-hotel-wa',
  name: 'Upland Hotel',
  headline: 'Upland Hotel: an overnight base in Wa for the Upper West',
  region: 'Upper West Region',
  category: 'Where To Stay',
  summary:
  'A modest hotel in Wa, the Upper West’s regional capital, used mainly as a stop for travellers heading to Lawra and the Kobine festival.',
  image: images.hotel,
  gallery: [images.paga, images.chief],
  coordinates: { lat: 10.0601, lng: -2.5099 },
  overview: [
  'Wa sees relatively few travellers outside festival season, and the Upland Hotel is one of the more reliable places to stay in town, with simple rooms and a restaurant attached.',
  'It works mainly as a stopover for those continuing north to Lawra for the Kobine festival or exploring the Upper West’s mud-and-timber mosques.'],

  highlights: [
  'A reliable overnight stop in Wa town',
  'Restaurant serving Ghanaian dishes',
  'Convenient staging point for Lawra and the Kobine festival',
  'Close to the Upper West’s Sudanese-style mosques'],

  quickFacts: [
  { label: 'Region', value: 'Upper West Region' },
  { label: 'Style', value: 'Mid-range, city centre' },
  { label: 'Check-in', value: 'From 13:00' },
  { label: 'Best for', value: 'Stopovers en route to Lawra' }],

  gettingThere: [
  'About two hours from Lawra by road.',
  'Roughly four hours from Tamale by road.'],

  tips: [
  'Book ahead around Kobine festival, when Wa’s few hotels fill quickly.',
  'Fuel up in Wa before continuing north, options are sparser beyond town.'],

  nearby: ['kobine-festival']
},
{
  slug: 'rock-city-hotel-kwahu',
  name: 'Rock City Hotel',
  headline: 'Rock City Hotel: a resort escape on the Kwahu escarpment',
  region: 'Eastern Region',
  category: 'Where To Stay',
  summary:
  'A hillside resort in Nkwatia on the Kwahu Plateau, built around twin outdoor pools, rooftop cabanas and modern rooms, with views across the escarpment.',
  image: '/rock-city-hotel-17.jpg',
  gallery: [
  '/rock-city-hotel-01.avif',
  '/rock-city-hotel-02.avif',
  '/rock-city-hotel-03.avif',
  '/rock-city-hotel-04.avif',
  '/rock-city-hotel-05.avif',
  '/rock-city-hotel-06.avif',
  '/rock-city-hotel-07.avif',
  '/rock-city-hotel-08.avif',
  '/rock-city-hotel-09.avif',
  '/rock-city-hotel-10.avif',
  '/rock-city-hotel-11.avif',
  '/rock-city-hotel-12.avif',
  '/rock-city-hotel-13.avif',
  '/rock-city-hotel-14.avif',
  '/rock-city-hotel-15.avif',
  '/rock-city-hotel-16.avif',
  '/rock-city-hotel-18.webp',
  '/rock-city-hotel-19.jpg',
  '/rock-city-hotel-20.jpg',
  '/rock-city-hotel-21.jpg',
  '/rock-city-hotel-22.jpg',
  '/rock-city-hotel-23.webp',
  '/rock-city-hotel-24.webp',
  '/rock-city-hotel-25.webp',
  '/rock-city-hotel-26.webp',
  '/rock-city-hotel-27.webp',
  '/rock-city-hotel-28.webp'],
  photoCategories: {
    '/rock-city-hotel-01.avif': 'rooms',
    '/rock-city-hotel-02.avif': 'amenities',
    '/rock-city-hotel-03.avif': 'amenities',
    '/rock-city-hotel-04.avif': 'rooms',
    '/rock-city-hotel-05.avif': 'exterior',
    '/rock-city-hotel-06.avif': 'rooms',
    '/rock-city-hotel-07.avif': 'rooms',
    '/rock-city-hotel-08.avif': 'exterior',
    '/rock-city-hotel-09.avif': 'rooms',
    '/rock-city-hotel-10.avif': 'amenities',
    '/rock-city-hotel-11.avif': 'exterior',
    '/rock-city-hotel-12.avif': 'amenities',
    '/rock-city-hotel-13.avif': 'rooms',
    '/rock-city-hotel-14.avif': 'amenities',
    '/rock-city-hotel-15.avif': 'amenities',
    '/rock-city-hotel-16.avif': 'rooms',
    '/rock-city-hotel-17.jpg': 'exterior',
    '/rock-city-hotel-18.webp': 'rooms',
    '/rock-city-hotel-19.jpg': 'amenities',
    '/rock-city-hotel-20.jpg': 'rooms',
    '/rock-city-hotel-21.jpg': 'exterior',
    '/rock-city-hotel-22.jpg': 'amenities',
    '/rock-city-hotel-23.webp': 'rooms',
    '/rock-city-hotel-24.webp': 'rooms',
    '/rock-city-hotel-25.webp': 'amenities',
    '/rock-city-hotel-26.webp': 'exterior',
    '/rock-city-hotel-27.webp': 'rooms',
    '/rock-city-hotel-28.webp': 'rooms'
  },
  coordinates: { lat: 6.5667, lng: -0.7333 },
  overview: [
  'Rock City Hotel sits on the Nkwatia Mountains above the Kwahu Plateau in Ghana’s Eastern Region, a short drive from Mpraeso. The property, which markets itself as "the ultimate destination", combines a resort hotel with a wider residential estate of red-roofed apartment blocks on the same hillside.',
  'The centrepiece is a pair of outdoor pools, one lined with private cabanas and pergolas, overlooked by a rooftop deck with lounge chairs and umbrella seating. Rooms mix contemporary and warmer, more traditional finishes, and upper floors take in views across the escarpment and forest below.',
  'Kwahu is best known beyond Ghana for the Easter paragliding festival held on the plateau each year, when the hills around Nkwatia and Atibie fill with visitors. Rock City’s elevated position makes it one of the more convenient bases for that week.'],

  highlights: [
  'Twin outdoor pools with private cabanas and a rooftop lounge deck',
  'Rooms looking out over the Kwahu escarpment',
  'On-site restaurant and 24-hour reception',
  'Part of a wider Rock City residential estate on the same hillside'],

  quickFacts: [
  { label: 'Region', value: 'Eastern Region' },
  { label: 'Location', value: 'Nkwatia, Kwahu Plateau' },
  { label: 'Style', value: 'Hillside resort' },
  { label: 'Best for', value: 'Kwahu Easter paragliding season and highland getaways' }],

  gettingThere: [
  'About three hours from Accra by road, via Nkawkaw and up the Kwahu escarpment road.',
  'Shared taxis and private transfers run from Nkawkaw and Mpraeso to Nkwatia.'],

  tips: [
  'Book well ahead over Easter, when the paragliding festival fills every hotel on the plateau.',
  'Evenings on the escarpment are noticeably cooler than the coast — bring a light layer.'],

  nearby: []
}];


export const tourBySlug: Record<string, Tour> = tours.reduce(
  (acc, tour) => ({ ...acc, [tour.slug]: tour }),
  {} as Record<string, Tour>
);

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function tourHref(tour: Tour): string {
  if (tour.category === 'Where To Stay') return `/where-to-stay/${tour.slug}`;
  if (tour.category === 'Festivals') return `/category/festivals/${tour.slug}`;
  return `/tours/${tour.slug}`;
}

export type TaxonomyGroup = {
  slug: string;
  name: string;
  tours: Tour[];
};

function groupBy(field: 'category' | 'region'): TaxonomyGroup[] {
  const names = Array.from(new Set(tours.map((t) => t[field])));
  return names.map((name) => ({
    slug: slugify(name),
    name,
    tours: tours.filter((t) => t[field] === name),
  }));
}

export const categories: TaxonomyGroup[] = groupBy('category');
export const regions: TaxonomyGroup[] = groupBy('region');

export const categoryBySlug: Record<string, TaxonomyGroup> = Object.fromEntries(
  categories.map((c) => [c.slug, c])
);

export const regionBySlug: Record<string, TaxonomyGroup> = Object.fromEntries(
  regions.map((r) => [r.slug, r])
);