export type CategoryType =
  | 'all'
  | 'hindu'
  | 'christian'
  | 'sikh'
  | 'muslim'
  | 'south-indian'
  | 'engagement'
  | 'baby-shower'
  | 'birthday'
  | 'save-the-date'
  | 'festive';

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode?: string;
  icon?: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  category: CategoryType;
  categoryLabel: string;
  originalPrice: number;
  discountPrice: number;
  currency: string;
  tag?: string;
  coverImage: string;
  accentColor: string;
  secondaryColor: string;
  aesthetic: string;
  groomName: string;
  brideName: string;
  eventDate: string;
  location: string;
  shlokaOrMantra?: string;
  description: string;
  musicTitle: string;
  events: WeddingEvent[];
  handMockupType?: 'classic-hand' | 'gold-hand' | 'simple-phone';
}

export interface TestimonialItem {
  id: string;
  names: string;
  relation: string;
  quote: string;
  rating: number;
  image: string;
  tag?: string;
}

export interface ComparisonRow {
  feature: string;
  printedCards: string;
  whatsappVideos: string;
  invifest: string;
  invifestSub?: string;
  isPositive?: boolean;
}

export interface OrderFormData {
  templateId: string;
  groomName: string;
  brideName: string;
  groomParents?: string;
  brideParents?: string;
  weddingDate: string;
  cityVenue: string;
  language: string;
  whatsappNumber: string;
  email: string;
  notes?: string;
  includeRsvp: boolean;
  includeMusic: boolean;
  includeMap: boolean;
}
