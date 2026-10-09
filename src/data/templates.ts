import { TemplateItem } from '../types';
import birthdayGalaImg from '../assets/images/birthday_celebration_gala_1791092278497.jpg';
import royalWeddingImg from '../assets/images/royal_wedding_invitation_1791092289863.jpg';
import proposalCardImg from '../assets/images/secret_proposal_card_1791303789300.jpg';

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'first-birthday-wonderland',
    name: 'ফার্স্ট বার্থডে ওয়ান্ডারল্যান্ড',
    category: 'birthday',
    categoryLabel: 'প্রথম জন্মদিন উদযাপন',
    originalPrice: 1499,
    discountPrice: 799,
    currency: '৳',
    tag: 'সবচেয়ে প্রিয়',
    coverImage: '/assets/wishora-birth-template.jpg',
    accentColor: '#831843',
    secondaryColor: '#FBF4F1',
    aesthetic: 'বার্গান্ডি বেলুন ডেকোরেশন ও স্মৃতিময় ছবির গল্প',
    groomName: 'আয়ান',
    brideName: '১ম জন্মদিন উৎসব',
    eventDate: '১৪ নভেম্বর ২০২৬',
    location: 'গুলশান ক্লাব, ঢাকা',
    shlokaOrMantra: 'একটি বিশেষ ভার্চুয়াল কর্নার, যা তৈরি কেবল তোমার জন্য',
    description: 'মোবাইলে ওপেন করার সাথে সাথে ভেসে উঠবে ওয়াক্স সিল চিঠি, ছবির অ্যালবাম, সারপ্রাইজ স্ক্র্যাচ কার্ড, কেকের মোমবাতি ও আগামী বছরের আশীর্বাদ বার্তা।',
    musicTitle: 'আনন্দমুখর বাঁশি ও মৃদু সুর',
    events: [
      { id: '1', name: 'কেক কাটিং ও ডিনার পার্টি', date: '১৪ নভেম্বর ২০২৬', time: 'সন্ধ্যা ০৬:৩০', venue: 'গ্র্যান্ড বলরুম', address: 'গুলশান ক্লাব, ঢাকা', dressCode: 'স্মার্ট প্যাস্টেল ও পার্টি চিক' }
    ]
  },
  {
    id: 'golden-birthday-gala',
    name: 'গোল্ডেন বার্থডে সারপ্রাইজ',
    category: 'birthday',
    categoryLabel: 'লাইভ সারপ্রাইজ ও কাউন্টডাউন',
    originalPrice: 1299,
    discountPrice: 699,
    currency: '৳',
    tag: 'ট্রেন্ডিং সারপ্রাইজ',
    coverImage: birthdayGalaImg,
    accentColor: '#9D174D',
    secondaryColor: '#2A0610',
    aesthetic: 'সারপ্রাইজ কাউন্টডাউন · বেলুন পপ ও কেক কাটিং',
    groomName: 'আহনাফ',
    brideName: 'জন্মদিন সারপ্রাইজ',
    eventDate: '২৫ নভেম্বর ২০২৬',
    location: 'দ্য ওয়েস্টিন, গুলশান, ঢাকা',
    shlokaOrMantra: 'তোমার জন্য এক অনন্য উদযাপন। তোমার আগমনে পৃথিবীটা আরও সুন্দর হয়েছে।',
    description: '৩০ সেকেন্ডের রোমাঞ্চকর কাউন্টডাউন, ১০টি বেলুন পপ মিষ্টি বার্তা, ইন্টারেক্টিভ কেক কাটিং ও মোমবাতি নেভানো, স্মৃতিময় ফটো গ্যালারি এবং টাইপরাইটার স্টাইলে লেখা আবেগঘন চিঠি।',
    musicTitle: 'সেলিব্রেশন জয় – বাঁশি ও রিদমিক সুর',
    events: [
      { id: '1', name: 'বার্থডে সেলিব্রেশন ও ডিনার', date: '২৫ নভেম্বর ২০২৬', time: 'সন্ধ্যা ০৭:৩০', venue: 'গ্র্যান্ড প্যাভিলিয়ন বলরুম', address: 'দ্য ওয়েস্টিন ঢাকা', dressCode: 'স্মার্ট ক্যাজুয়াল' }
    ]
  },
  {
    id: 'rajwada-vivah',
    name: 'রোমান্টিক প্রপোজাল ও লাভ স্টোরি',
    category: 'engagement',
    categoryLabel: 'রোমান্টিক প্রপোজাল · লাভ স্টোরি',
    originalPrice: 1499,
    discountPrice: 799,
    currency: '৳',
    tag: 'ট্রেন্ডিং প্রপোজাল',
    coverImage: proposalCardImg,
    accentColor: '#BE185D',
    secondaryColor: '#FFF1F2',
    aesthetic: 'রোমান্টিক ফেয়ারি লাইটস · আংটি উন্মোচন ও স্মৃতিকথা',
    groomName: 'কবির',
    brideName: 'অনন্যা',
    eventDate: '১৪ ফেব্রুয়ারি ২০২৭',
    location: 'রুফটপ টেরেস, গুলশান, ঢাকা',
    shlokaOrMantra: 'অবশেষে সে বলল হ্যাঁ! শুরু হলো আমাদের আজীবন একসাথে চলার গল্প',
    description: 'কাউন্টডাউন সহ বিশেষ প্রপোজাল পেজ—১০টি মুহূর্ত কেন তোমাকে ভালোবেসেছিলাম, ভার্চুয়াল আংটি উন্মোচন, সম্পর্কের সুন্দর ফটো টাইমলাইন এবং প্রেমপত্র।',
    musicTitle: 'রোমান্টিক অ্যাকোস্টিক পিয়ানো ও চেলো সুর',
    events: [
      { id: '1', name: 'রুফটপ প্রপোজাল ও ক্যান্ডেললাইট ডিনার', date: '১৪ ফেব্রুয়ারি ২০২৭', time: 'সন্ধ্যা ০৭:৩০', venue: 'প্রাইভেট স্কাই প্যাভিলিয়ন', address: 'গুলশান ২, ঢাকা', dressCode: 'রোমান্টিক ফর্মাল' }
    ]
  },
  {
    id: 'golden-jubilee',
    name: 'গোল্ডেন জুবিলি গালা',
    category: 'birthday',
    categoryLabel: 'জন্মদিন ও বার্ষিকী উদযাপন',
    originalPrice: 1499,
    discountPrice: 799,
    currency: '৳',
    tag: 'জনপ্রিয়',
    coverImage: '/assets/wishora-birth-template.jpg',
    accentColor: '#831843',
    secondaryColor: '#FBF4F1',
    aesthetic: 'শেম্পেন গোল্ড স্পার্কল ও কনফেটি',
    groomName: 'আয়ান',
    brideName: 'বার্থডে গালা',
    eventDate: '১৪ নভেম্বর ২০২৬',
    location: 'গুলশান ক্লাব, ঢাকা',
    shlokaOrMantra: 'ভালোবাসা, হাসি আর সুন্দর স্মৃতির আরও একটি সোনালী বছর!',
    description: 'ইন্টারেক্টিভ কনফেটি ব্লাস্ট, অতিথিদের শুভেচ্ছা লেখার ওয়াল, কাউন্টডাউন টাইমার এবং ভেন্যু নেভিগেশন।',
    musicTitle: 'উৎসবের রোমাঞ্চকর সুর',
    events: [
      { id: '1', name: 'সেলিব্রেশন ও ডিনার', date: '১৪ নভেম্বর ২০২৬', time: 'সন্ধ্যা ০৭:৩০', venue: 'গ্র্যান্ড বলরুম', address: 'গুলশান ক্লাব, ঢাকা', dressCode: 'স্মার্ট পার্টি পোশাক' }
    ]
  },
  {
    id: 'noor-zafar',
    name: 'নূর-এ-জাফর',
    category: 'muslim',
    categoryLabel: 'নিকাহ ও ওয়ালিমা নিমন্ত্রণ',
    originalPrice: 4999,
    discountPrice: 3499,
    currency: '৳',
    tag: 'বেস্টসেলার',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1E3A8A',
    secondaryColor: '#F0F9FF',
    aesthetic: 'মিডনাইট নেভি ও গোল্ড ফয়েল ইসলামিক ক্যালিগ্রাফি',
    groomName: 'তানভীর',
    brideName: 'নুসরাত',
    eventDate: '২৪ নভেম্বর ২০২৬',
    location: 'প্যান প্যাসিফিক সোনারগাঁও, ঢাকা',
    shlokaOrMantra: 'بِسْمِ اللَّهِ الرَّحْمَٰনِ الرَّحِيمِ • পরম করুণাময় অসীম দয়ালু আল্লাহর নামে',
    description: 'চাঁদ-তারার সূক্ষ্ম নকশা, রাজকীয় ইসলামিক ক্যালিগ্রাফি, ওয়াক্স সিল এবং মার্জিত নিকাহ নিমন্ত্রণপত্র।',
    musicTitle: 'সুফি রোমান্স – ঐতিহ্যবাহী উদ ও তারের সুর',
    events: [
      { id: '1', name: 'মেহেন্দি ও ঢোলক সন্ধ্যা', date: '২২ নভেম্বর ২০২৬', time: 'সন্ধ্যা ০৬:০০', venue: 'ব্যালকনি লাউঞ্জ', address: 'গুলশান, ঢাকা', dressCode: 'পান্না সবুজ ও বাসন্তী' },
      { id: '2', name: 'পবিত্র নিকাহ অনুষ্ঠান', date: '২৪ নভেম্বর ২০২৬', time: 'সন্ধ্যা ০৭:০০', venue: 'গ্র্যান্ড বলরুম', address: 'প্যান প্যাসিফিক সোনারগাঁও', dressCode: 'রয়্যাল আইভরি ও গোল্ড' },
      { id: '3', name: 'ওয়ালিমা রিসেপশন', date: '২৬ নভেম্বর ২০২৬', time: 'রাত ০৮:০০', venue: 'সুরমা হল', address: 'সোনারগাঁও, ঢাকা', dressCode: 'আভিজাত্যপূর্ণ শাড়ি ও স্যুট' }
    ]
  },
  {
    id: 'celestial-ring',
    name: 'সেলেস্টিয়াল প্রপোজাল',
    category: 'engagement',
    categoryLabel: 'প্রপোজাল ও এনগেজমেন্ট',
    originalPrice: 3999,
    discountPrice: 2499,
    currency: '৳',
    tag: 'ট্রেন্ডিং',
    coverImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    accentColor: '#DB2777',
    secondaryColor: '#FDF2F8',
    aesthetic: 'রোজ গোল্ড শিমার ও ডায়মন্ড রিং অ্যানিমেশন',
    groomName: 'রায়হান',
    brideName: 'সাদিয়া',
    eventDate: '১৪ ফেব্রুয়ারি ২০২৭',
    location: 'ইন্টারকন্টিনেন্টাল, ঢাকা',
    shlokaOrMantra: 'সে বলল হ্যাঁ! চিরদিনের জন্য শুরু হওয়া মিষ্টি এক অধ্যায়',
    description: 'রোজ গোল্ড ওয়াটারকালার ব্যাকড্রপ, ইন্টারেক্টিভ রিং আনবক্সিং অ্যানিমেশন এবং বন্ধুদের জন্য লাইভ কাউন্টডাউন।',
    musicTitle: 'পিয়ানো মেলোডি – ভালোবাসা ও রোমাঞ্চ',
    events: [
      { id: '1', name: 'আংটি বদল ও ডিনার', date: '১৪ ফেব্রুয়ারি ২০২৭', time: 'সন্ধ্যা ০৭:০০', venue: 'রূফটপ ইনফিনিটি টেরেস', address: 'ইন্টারকন্টিনেন্টাল, ঢাকা', dressCode: 'স্মার্ট ফর্মাল' }
    ]
  },
  {
    id: 'vrindavan',
    name: 'বোটানিক্যাল হারমনি',
    category: 'hindu',
    categoryLabel: 'বিবাহ নিমন্ত্রণ',
    originalPrice: 5999,
    discountPrice: 3999,
    currency: '৳',
    tag: 'জনপ্রিয়',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    accentColor: '#059669',
    secondaryColor: '#ECFDF5',
    aesthetic: 'সেজ গ্রিন বোটানিক্যাল ও গোল্ড লিফ নকশা',
    groomName: 'আবরার',
    brideName: 'মেহনাজ',
    eventDate: '১২ জানুয়ারি ২০২৭',
    location: 'লা মেরিডিয়ান, এয়ারপোর্ট রোড, ঢাকা',
    shlokaOrMantra: 'ভালোবাসা, পরিবার এবং আজীবনের আশীর্বাদের মিলনমেলা',
    description: 'সবুজ পাতার প্রাকৃতিক স্নিগ্ধতা এবং সোনালী মনোগ্রামের মিশেলে তৈরি আধুনিক ডিজিটাল নিমন্ত্রণপত্র।',
    musicTitle: 'অ্যাকোস্টিক গিটার – সান্ধ্য সুর',
    events: [
      { id: '1', name: 'গায়ে হলুদ উৎসব', date: '১০ জানুয়ারি ২০২৭', time: 'বিকেল ০৫:৩০', venue: 'স্কাই বলরুম', address: 'লা মেরিডিয়ান, ঢাকা', dressCode: 'হলুদ ও সবুজ পোশাক' },
      { id: '2', name: 'বিবাহোত্তর সংবর্ধনা', date: '১২ জানুয়ারি ২০২৭', time: 'সন্ধ্যা ০৭:৩০', venue: 'গ্র্যান্ড বলরুম', address: 'লা মেরিডিয়ান, ঢাকা', dressCode: 'অভিজাত ফর্মাল' }
    ]
  }
];
