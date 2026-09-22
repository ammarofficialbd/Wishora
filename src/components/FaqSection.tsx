import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, ArrowRight, ShieldCheck, Zap, Clock, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  id: string;
  category: 'general' | 'ordering' | 'features' | 'payment';
  question: string;
  answer: string;
  badge?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'process',
    category: 'ordering',
    badge: 'Quick & Simple',
    question: 'How does the Wishora ordering and creation process work?',
    answer: 'Simply select your favorite signature template or choose our bespoke package, enter your celebration details (couple names, dates, ceremony timings, venues, and photos), and place your order. Our design team will handcraft your personalized live interactive invitation webpage in 24–48 hours and send a private preview link directly to your WhatsApp and email. You get 2 rounds of complimentary revisions to make sure everything is 100% perfect before sharing!'
  },
  {
    id: 'no-app',
    category: 'general',
    badge: 'Zero Friction',
    question: 'Do my guests need to download an app or create an account to view the invite?',
    answer: 'No app download or login is ever required! Wishora invitations are lightweight, lightning-fast web experiences designed to open seamlessly in any browser across iOS, Android, macOS, and Windows. You simply send your personalized link via WhatsApp, Messenger, Instagram, SMS, or print it as a QR code on physical gift boxes. Guests tap once and your invitation unfolds with music, countdowns, and animations.'
  },
  {
    id: 'rsvp-maps',
    category: 'features',
    badge: 'Popular Feature',
    question: 'How do the real-time RSVP system and Google Maps navigation work?',
    answer: 'When guests open your invite, they can instantly confirm their attendance with a single tap, enter their guest headcount, and leave personalized blessing notes. You receive organized RSVP updates to manage catering and seating. Furthermore, each ceremony venue card features a 1-tap "Get Directions" button that opens Google Maps navigation with exact coordinates.'
  },
  {
    id: 'music-photos',
    category: 'features',
    badge: 'Customization',
    question: 'Can we add our own background music, love story, and couple photo gallery?',
    answer: 'Yes, absolutely! You can choose from our curated library of romantic acoustic sitar, piano, and violin melodies, or provide your favorite audio song file. You can also include high-definition photo galleries, your proposal story, multi-event schedules (Mehendi, Gaye Holud, Sangeet, Nikah, Reception), dress codes, and gift registry details.'
  },
  {
    id: 'turnaround',
    category: 'ordering',
    badge: 'Fast Delivery',
    question: 'How fast is delivery? Can I request urgent same-day delivery?',
    answer: 'Standard delivery is delivered within 24 to 48 hours. If your wedding or celebration is approaching quickly, we offer an Express Rush service where our team prioritizes your order and delivers your completed invitation link within 6 to 12 hours.'
  },
  {
    id: 'payment',
    category: 'payment',
    badge: 'Secure',
    question: 'What payment methods do you accept in Bangladesh and internationally?',
    answer: 'We support all major payment methods including bKash, Nagad, Rocket, Upay, Visa, Mastercard, AMEX, and direct bank transfers in Bangladeshi Taka (৳ BDT). For non-resident Bangladeshis (NRBs) and international couples, we also accept international credit cards and PayPal.'
  },
  {
    id: 'validity',
    category: 'general',
    question: 'How long will our interactive invitation link remain active online?',
    answer: 'Your custom invitation webpage stays live and accessible online for 1 full year after your event date. This allows you, your family, and your guests to revisit the page, download memories, listen to your celebration playlist, and cherish the wishes left by loved ones.'
  },
  {
    id: 'bilingual-custom',
    category: 'features',
    question: 'Can we have bilingual invitations (Bengali & English) or custom cultural rituals?',
    answer: 'Yes! Wishora supports bilingual typography in Bengali and English with elegant traditional script styling. Whether you are hosting a traditional Bengali Hindu wedding, Muslim Nikah & Walima, Christian nuptials, Buddhist celebration, or modern cross-cultural gala, we customize all ritual names, prayers (Mantra / Quranic verses), and event timelines.'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'ordering', label: 'Ordering & Delivery' },
  { id: 'features', label: 'Features & RSVP' },
  { id: 'general', label: 'Guest Experience' },
  { id: 'payment', label: 'Pricing & Payments' }
];

interface FaqSectionProps {
  onOpenInquiry?: () => void;
  onChooseTemplate?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenInquiry, onChooseTemplate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    process: true, // First item open by default for immediate engagement
    'no-app': true
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="faq-section" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#EAE3D6] relative">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-[#8C5D2E] text-[11px] font-bold tracking-widest uppercase mb-3 font-display">
          <span>✦</span>
          <span>FREQUENTLY ASKED QUESTIONS</span>
          <span>✦</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181210] leading-[1.18] mb-4 font-serif-luxury">
          Everything You Need to Know<br />
          <span className="italic font-serif-accent font-semibold text-[#FF1375]">About the Wishora Experience</span>
        </h2>
        <p className="text-sm sm:text-base text-[#6B574E] max-w-2xl mx-auto font-normal leading-relaxed">
          Clear answers about how we craft, personalize, and deliver your live digital invitations with real-time RSVP, music, and instant WhatsApp sharing.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-[#181210] text-[#F3D188] border-amber-500/40 shadow-xs scale-102'
                  : 'bg-white hover:bg-[#F5EFE6] text-[#4A3C33] border-[#E5DACB]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4 mb-14">
        {filteredFaqs.map((faq) => {
          const isOpen = !!openItems[faq.id];
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#FF1375]/35 shadow-[0_10px_30px_rgba(255,19,117,0.06)]'
                  : 'bg-white/80 hover:bg-white border-[#E8DDD4] shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full text-left py-5 px-5 sm:px-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 pr-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
                    isOpen ? 'bg-[#FF1375]/10 text-[#FF1375]' : 'bg-[#F2ECE2] text-[#8C6239]'
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#181210] font-serif-luxury leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {faq.badge && (
                    <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#8C5D2E] border border-amber-500/20">
                      {faq.badge}
                    </span>
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#181210] text-amber-200' : 'bg-[#F5EFE6] text-[#4A3C33]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#5D4A41] leading-relaxed border-t border-[#F2ECE2]/80 mt-1">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Still Have Questions CTA Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#2B1724] via-[#3B192A] to-[#181210] p-7 sm:p-10 text-white shadow-xl border border-rose-500/20 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1375]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[#FDE68A] text-[11px] font-semibold tracking-wide mb-3 border border-white/15">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Dedicated WhatsApp Support</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white mb-2 leading-tight">
            Have a unique celebration idea or special request?
          </h3>
          <p className="text-xs sm:text-sm text-stone-200 font-normal leading-relaxed">
            Our creative directors are available on WhatsApp 7 days a week to assist with custom themes, urgent timelines, or questions.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF1375] via-[#E11D48] to-[#BE185D] hover:brightness-105 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(255,19,117,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </button>
          )}
          {onChooseTemplate && (
            <button
              onClick={onChooseTemplate}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Templates</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
