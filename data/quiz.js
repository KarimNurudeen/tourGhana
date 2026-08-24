"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizQuestions = void 0;
const tours_1 = require("./tours");
exports.quizQuestions = [
    {
        category: 'Forts & Castles',
        question: 'Which Ghanaian fort, built in 1482, is the oldest European building south of the Sahara?',
        image: tours_1.tourBySlug['elmina-castle'].image,
        options: ['Cape Coast Castle', 'Elmina Castle', 'Fort St. Jago', 'Fort Amsterdam'],
        correctAnswer: 'Elmina Castle',
    },
    {
        category: 'Parks & Wildlife',
        question: 'Which national park is Ghana’s best chance to walk beside elephants?',
        image: tours_1.tourBySlug['mole-national-park'].image,
        options: ['Kakum National Park', 'Mole National Park', 'Digya National Park', 'Bui National Park'],
        correctAnswer: 'Mole National Park',
    },
    {
        category: 'Culture & Heritage',
        question: 'Nzulezu, in the Western Region, is a village built entirely on what?',
        image: tours_1.tourBySlug['nzulezu'].image,
        options: ['Stilts over a lake', 'A cliffside', 'A river island', 'Reclaimed marshland'],
        correctAnswer: 'Stilts over a lake',
    },
    {
        category: 'Culture & Heritage',
        question: 'Manhyia Palace, in Kumasi, is the seat of which traditional ruler?',
        image: tours_1.tourBySlug['manhyia-palace'].image,
        options: ['The Asantehene', 'The Osagyefo', 'The Ga Mantse', 'The Yaa Naa'],
        correctAnswer: 'The Asantehene',
    },
    {
        category: 'Culture & Heritage',
        question: 'At the Paga Crocodile Pond, the crocodiles are believed to be what?',
        image: tours_1.tourBySlug['paga-crocodile-pond'].image,
        options: [
            'Reincarnated souls of the townspeople',
            'Ancient royal guardians',
            'Protected endangered wildlife',
            'Sacred river spirits',
        ],
        correctAnswer: 'Reincarnated souls of the townspeople',
    },
    {
        category: 'Coast & Beaches',
        question: 'Which Accra beach is known for Sunday horse rides, highlife music and grilled tilapia?',
        image: tours_1.tourBySlug['labadi-beach'].image,
        options: ['Labadi Beach', 'Kokrobite Beach', 'Busua Beach', 'Ada Beach'],
        correctAnswer: 'Labadi Beach',
    },
];
