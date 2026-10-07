import React from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Music, 
  Share2, 
  MapPin, 
  RotateCcw, 
  ArrowRight 
} from 'lucide-react';

interface ReinventedSectionProps {
  onChooseTemplate: () => void;
}

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'interactive',
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: 'bg-rose-50/90 border-rose-200/90',
    iconColor: 'text-[#7A0C38]',
    title: 'Interactive Experiences',
    description: 'Ambient background music, interactive animations, scratch reveal surprises, and heartfelt personal letters that captivate guests.'
  },
  {
    id: 'effortless',
    icon: <Smartphone className="w-6 h-6" />,
    iconBg: 'bg-emerald-50/90 border-emerald-200/90',
    iconColor: 'text-emerald-700',
    title: 'Elderly & Mobile-Friendly',
    description: 'Opens with 1 tap on any smartphone or computer. No confusing app downloads, signups, or accounts needed.'
  },
  {
    id: 'memories',
    icon: <Music className="w-6 h-6" />,
    iconBg: 'bg-amber-50/90 border-amber-200/90',
    iconColor: 'text-[#8C5D2E]',
    title: 'Custom Audio & Photo Chapters',
    description: 'Highlight your story with your favorite romantic or celebratory playlists, high-resolution photo galleries, and chronological life chapters.'
  },
  {
    id: 'sharing',
    icon: <Share2 className="w-6 h-6" />,
    iconBg: 'bg-purple-50/90 border-purple-200/90',
    iconColor: 'text-purple-700',
    title: 'Instant WhatsApp Delivery',
    description: 'Get a clean, personalized link (like wishora.online/ayaan) ready to share instantly via WhatsApp, Messenger, or QR code.'
  },
  {
    id: 'rsvp-maps',
    icon: <MapPin className="w-6 h-6" />,
    iconBg: 'bg-blue-50/90 border-blue-200/90',
    iconColor: 'text-blue-700',
    title: 'Live RSVP & Venue Navigation',
    description: 'For events and gatherings, collect guest confirmations in real-time with 1-tap Google Maps directions to ceremony venues.'
  },
  {
    id: 'revisions',
    icon: <RotateCcw className="w-6 h-6" />,
    iconBg: 'bg-orange-50/90 border-orange-200/90',
    iconColor: 'text-orange-700',
    title: '2 Free Revisions & Fast Turnaround',
    description: 'Delivered in 24–48 hours directly to your WhatsApp, with 2 rounds of edits included so every detail is 100% perfect.'
  }
];

export const ReinventedSection: React.FC<ReinventedSectionProps> = ({ onChooseTemplate }) => {
  return (
    <section id="reinvented-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D6]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & CTA */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-[#8C5D2E] text-[11px] font-bold tracking-widest uppercase mb-3 font-display w-fit">
            <span>THE EXPERIENCE</span>
          </div>
          <h2 className="text-[24px] sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B1724] leading-[34.4px] sm:leading-[1.15] mb-5 font-serif-luxury">
            Digital Invitations &amp; Wishes,<br />
            <span className="text-[#7A0C38] font-bold">Reinvented.</span>
          </h2>

          <p className="text-[#4D3F38] text-sm sm:text-base leading-relaxed mb-8 max-w-md font-normal">
            Everything traditional printed cards or static images cannot be: interactive, memorable, and unmistakably personalized for birthdays, weddings, anniversaries, and milestones.
          </p>

          <div>
            <button
              onClick={onChooseTemplate}
              id="reinvented-choose-template-btn"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-sm font-semibold active:scale-95 transition-all shadow-[0_12px_28px_-6px_rgba(122,12,56,0.35)] cursor-pointer inline-flex items-center gap-2 border border-rose-300/30"
            >
              <span>Choose a template</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Right Column: 6 Refined Feature Items List */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          {FEATURES.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/90 hover:bg-white border border-[#EAE3D6] hover:border-amber-400/60 shadow-xs hover:shadow-md transition-all duration-200"
            >
              {/* Feature Icon Container */}
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} border flex items-center justify-center shrink-0 shadow-xs`}>
                {item.icon}
              </div>

              {/* Text */}
              <div className="pt-0.5">
                <h3 className="text-base sm:text-lg font-bold text-[#181210] mb-1 font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A4B43] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
