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
  image: images.capeCoast,
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
  image: images.elmina,
  gallery: [images.elmina, images.capeCoast],
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
  image: images.mole,
  gallery: [images.mole, 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113785/tour-ghana/paga-crocodile-pond.jpg'],
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
  image: images.labadi,
  gallery: [images.labadi, images.jollof],
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
  image: 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113790/tour-ghana/bonwire-kente-weaver.jpg',
  gallery: ['https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786113790/tour-ghana/bonwire-kente-weaver.jpg', 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786114223/tour-ghana/manhyia-palace-museum.jpg'],
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
  image: images.festival,
  gallery: [images.festival, images.jollof],
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
  image: images.festival,
  gallery: [images.festival, 'https://res.cloudinary.com/ynvljxj8/image/upload/f_auto,q_auto,w_2400,c_limit/v1786114223/tour-ghana/manhyia-palace-museum.jpg'],
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
  image: images.elmina,
  gallery: [images.elmina, images.capeCoast],
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