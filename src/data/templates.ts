import { TemplateItem } from '../types';
import birthdayGalaImg from '../assets/images/birthday_celebration_gala_1791092278497.jpg';
import royalWeddingImg from '../assets/images/royal_wedding_invitation_1791092289863.jpg';
import proposalCardImg from '../assets/images/secret_proposal_card_1791303789300.jpg';

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'first-birthday-wonderland',
    name: 'First Birthday Wonderland',
    category: 'birthday',
    categoryLabel: 'Birthday Celebration',
    originalPrice: 1499,
    discountPrice: 799,
    currency: '৳',
    tag: 'Most Popular',
    coverImage: '/assets/wishora-birth-template.jpg',
    accentColor: '#831843',
    secondaryColor: '#FBF4F1',
    aesthetic: 'Burgundy Helium Balloon & Interactive Memories Story',
    groomName: 'Ayaan',
    brideName: '1st Birthday Gala',
    eventDate: '14 November 2026',
    location: 'Gulshan Club, Dhaka',
    shlokaOrMantra: 'A small corner of the internet, made just for you',
    description: 'Bespoke mobile celebration with wax-sealed letter, photo memories chapters, scratch card surprise, 5 blowable cake candles, and 3D wishes for the year ahead.',
    musicTitle: 'Upbeat Celebration Swing & Ceremonial Flute',
    events: [
      { id: '1', name: 'Cake Cutting & Birthday Gala', date: '14 Nov 2026', time: '06:30 PM', venue: 'Grand Ballroom', address: 'Gulshan Club, Dhaka', dressCode: 'Smart Pastel & Party Chic' }
    ]
  },
  {
    id: 'golden-birthday-gala',
    name: 'Golden Birthday Surprise',
    category: 'birthday',
    categoryLabel: 'Birthday Celebration · Live Surprise',
    originalPrice: 1299,
    discountPrice: 699,
    currency: '৳',
    tag: 'Trending Surprise',
    coverImage: birthdayGalaImg,
    accentColor: '#9D174D',
    secondaryColor: '#2A0610',
    aesthetic: 'Surprise Countdown · Balloons Pop & Cake Cutting',
    groomName: 'Ahnaf',
    brideName: 'Birthday Surprise',
    eventDate: '25 November 2026',
    location: 'The Westin, Gulshan, Dhaka',
    shlokaOrMantra: 'A celebration, just for you. Another year of you, and the world is better for it.',
    description: 'Bespoke birthday surprise with 30s countdown, 10 pop-the-balloon kind messages, interactive 3D cake cutting & candle blow, photo memories gallery, heartfelt typewriter letter, 6 flip wish surprises, and grand celebration finale.',
    musicTitle: 'Celebration Joy – Acoustic Flute & Swing',
    events: [
      { id: '1', name: 'Birthday Bash & Dinner', date: '25 Nov 2026', time: '07:30 PM', venue: 'Grand Pavilion Ballroom', address: 'The Westin Dhaka', dressCode: 'Smart Casual & Party Chic' }
    ]
  },
  {
    id: 'rajwada-vivah',
    name: 'Romantic Proposal & Love Story',
    category: 'engagement',
    categoryLabel: 'Romantic Proposal · Love Story',
    originalPrice: 1499,
    discountPrice: 799,
    currency: '৳',
    tag: 'Trending Proposal',
    coverImage: proposalCardImg,
    accentColor: '#BE185D',
    secondaryColor: '#FFF1F2',
    aesthetic: 'Twilight Fairy Lights · Ring Reveal & Our Story',
    groomName: 'Kabir',
    brideName: 'Ananya',
    eventDate: '14 February 2027',
    location: 'Rooftop Terrace, Gulshan, Dhaka',
    shlokaOrMantra: 'She said YES! The beginning of our forever story',
    description: 'Bespoke romantic proposal webpage with countdown, 10 moments that made me fall for you, interactive ring reveal, photo timeline, and typewriter love letter.',
    musicTitle: 'Romantic Acoustic Piano & Soft Cello Melody',
    events: [
      { id: '1', name: 'Rooftop Proposal & Dinner', date: '14 Feb 2027', time: '07:30 PM', venue: 'Private Sky Pavilion', address: 'Gulshan 2, Dhaka', dressCode: 'Smart Romantic & Cocktail' }
    ]
  },
  {
    id: 'golden-jubilee',
    name: 'Golden Jubilee Gala',
    category: 'birthday',
    categoryLabel: 'Birthday Celebration',
    originalPrice: 1499,
    discountPrice: 799,
    currency: '৳',
    tag: 'Popular',
    coverImage: '/assets/wishora-birth-template.jpg',
    accentColor: '#831843',
    secondaryColor: '#FBF4F1',
    aesthetic: 'Champagne Gold Sparkle & Confetti Poppers',
    groomName: 'Ayaan',
    brideName: 'Birthday Gala',
    eventDate: '14 November 2026',
    location: 'Gulshan Club, Dhaka',
    shlokaOrMantra: 'Cheers to another year of great memories, love, and laughter!',
    description: 'Dynamic interactive confetti popping, guest birthday wishes wall, countdown timer, and venue directions.',
    musicTitle: 'Upbeat Celebration Swing',
    events: [
      { id: '1', name: 'Birthday Bash & Dinner', date: '14 Nov 2026', time: '07:30 PM', venue: 'Grand Pavilion Ballroom', address: 'Gulshan Club, Dhaka', dressCode: 'Smart Casual & Party Chic' }
    ]
  },
  {
    id: 'noor-zafar',
    name: 'Noor-e-Zafar',
    category: 'muslim',
    categoryLabel: 'Nikah & Wedding',
    originalPrice: 4999,
    discountPrice: 3499,
    currency: '৳',
    tag: 'Bestseller',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1E3A8A',
    secondaryColor: '#F0F9FF',
    aesthetic: 'Midnight Navy & Gold Foil Islamic Calligraphy',
    groomName: 'Tanvir',
    brideName: 'Nusrat',
    eventDate: '24 November 2026',
    location: 'Pan Pacific Sonargaon, Dhaka',
    shlokaOrMantra: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • In the name of Allah, Most Gracious, Most Merciful',
    description: 'Intricate crescent moon motifs with regal geometric arches, gold foil typography, and heartfelt Nikah invitations.',
    musicTitle: 'Sufi Soul Romance – Acoustic Oud & Strings',
    events: [
      { id: '1', name: 'Mehendi & Dholak Evening', date: '22 Nov 2026', time: '06:00 PM', venue: 'Balcony Lounge', address: 'Gulshan, Dhaka', dressCode: 'Emerald Green & Mustard' },
      { id: '2', name: 'Holy Nikah Ceremony', date: '24 Nov 2026', time: '07:00 PM', venue: 'Grand Ballroom', address: 'Pan Pacific Sonargaon, Dhaka', dressCode: 'Royal Ivory & Gold Zari' },
      { id: '3', name: 'Walima Gala Reception', date: '26 Nov 2026', time: '08:00 PM', venue: 'Surma Hall', address: 'Sonargaon, Dhaka', dressCode: 'Black Tie & Elegant Sarees' }
    ]
  },
  {
    id: 'celestial-ring',
    name: 'Celestial Proposal',
    category: 'engagement',
    categoryLabel: 'Propose & Engagement',
    originalPrice: 3999,
    discountPrice: 2499,
    currency: '৳',
    tag: 'Trending',
    coverImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    accentColor: '#DB2777',
    secondaryColor: '#FDF2F8',
    aesthetic: 'Rose Gold Shimmer & Diamond Ring Motif',
    groomName: 'Rayhan',
    brideName: 'Sadia',
    eventDate: '14 February 2027',
    location: 'InterContinental, Dhaka',
    shlokaOrMantra: 'She Said Yes! An unforgettable beginning to forever',
    description: 'Soft rose gold watercolor backdrop, interactive ring unboxing animation, and heartfelt countdown for friends and family.',
    musicTitle: 'Piano Melody – A Thousand Years',
    events: [
      { id: '1', name: 'Ring Exchange & Cocktails', date: '14 Feb 2027', time: '07:00 PM', venue: 'Rooftop Infinity Terrace', address: 'InterContinental, Dhaka', dressCode: 'Smart Formal & Gowns' }
    ]
  },
  {
    id: 'vrindavan',
    name: 'Botanical Harmony',
    category: 'hindu',
    categoryLabel: 'Wedding Invitation',
    originalPrice: 5999,
    discountPrice: 3999,
    currency: '৳',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    accentColor: '#059669',
    secondaryColor: '#ECFDF5',
    aesthetic: 'Sage Green Botanical & Gold Leaf Border',
    groomName: 'Abrar',
    brideName: 'Mehnaz',
    eventDate: '12 January 2027',
    location: 'Le Méridien, Airport Road, Dhaka',
    shlokaOrMantra: 'Celebrating love, family, and lifelong blessings together',
    description: 'Crisp botanical foliage paired with embossed gold monograms, interactive guest messages, and venue navigation.',
    musicTitle: 'Acoustic Guitar – Serenade in G Major',
    events: [
      { id: '1', name: 'Gaye Holud Festival', date: '10 Jan 2027', time: '05:30 PM', venue: 'Sky Ballroom', address: 'Le Méridien, Dhaka', dressCode: 'Floral Yellow & Green' },
      { id: '2', name: 'Wedding Reception', date: '12 Jan 2027', time: '07:30 PM', venue: 'Grand Ballroom', address: 'Le Méridien, Dhaka', dressCode: 'Regal Formal' }
    ]
  }
];
