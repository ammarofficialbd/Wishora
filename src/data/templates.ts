import { TemplateItem } from '../types';
import birthdayGalaImg from '../assets/images/birthday_celebration_gala_1791092278497.jpg';
import royalWeddingImg from '../assets/images/royal_wedding_invitation_1791092289863.jpg';

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
    name: 'Golden Birthday Gala',
    category: 'birthday',
    categoryLabel: 'Birthday Celebration',
    originalPrice: 1299,
    discountPrice: 699,
    currency: '৳',
    tag: 'Trending',
    coverImage: birthdayGalaImg,
    accentColor: '#9D174D',
    secondaryColor: '#FDF2F8',
    aesthetic: 'Champagne Gold Sparkle & Confetti Poppers',
    groomName: 'Ahnaf',
    brideName: 'Celebration Night',
    eventDate: '25 November 2026',
    location: 'The Westin, Gulshan, Dhaka',
    shlokaOrMantra: 'Cheers to another year of great memories, love, and laughter!',
    description: 'Interactive luxury birthday experience featuring celebratory soundtrack, custom gift reveal, and interactive wishes wall.',
    musicTitle: 'Acoustic Joy – Celebration Swing',
    events: [
      { id: '1', name: 'Birthday Bash & Dinner', date: '25 Nov 2026', time: '07:30 PM', venue: 'Grand Pavilion Ballroom', address: 'The Westin Dhaka', dressCode: 'Smart Casual & Party Chic' }
    ]
  },
  {
    id: 'rajwada-vivah',
    name: 'Royal Heritage Vivah',
    category: 'hindu',
    categoryLabel: 'Royal Wedding Invitation',
    originalPrice: 3499,
    discountPrice: 1999,
    currency: '৳',
    tag: 'Royal Signature',
    coverImage: royalWeddingImg,
    accentColor: '#7A0C38',
    secondaryColor: '#FFFBEB',
    aesthetic: 'Regal Arch & Gold Foil Filigree',
    groomName: 'Farhan',
    brideName: 'Samira',
    eventDate: '18 December 2026',
    location: 'Radisson Blu Water Garden, Dhaka',
    shlokaOrMantra: 'Two souls, one heartfelt journey under the golden stars',
    description: 'Enchanting floral vines with warm golden arch motifs, ambient ceremonial melody, itinerary timeline, and instant RSVP.',
    musicTitle: 'Serenade of Elegance – Acoustic Sitar & Flute',
    events: [
      { id: '1', name: 'Gaye Holud & Mehendi Night', date: '16 Dec 2026', time: '06:00 PM', venue: 'Utshab Banquet Hall', address: 'Radisson Blu, Dhaka', dressCode: 'Bright Yellow & Floral Pastel' },
      { id: '2', name: 'Sangeet & Musical Evening', date: '17 Dec 2026', time: '07:30 PM', venue: 'Grand Ballroom', address: 'Dhaka', dressCode: 'Glamorous Evening Elegance' },
      { id: '3', name: 'Grand Wedding & Reception', date: '18 Dec 2026', time: '07:00 PM', venue: 'Royal Pavilion Courtyard', address: 'Airport Road, Dhaka', dressCode: 'Regal Traditional Silk & Velvet' }
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
