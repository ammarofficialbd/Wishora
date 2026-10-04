import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ReinventedSectionProps {
  onChooseTemplate: () => void;
}

interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  iconBg: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'cost',
    icon: '🐷',
    iconBg: 'bg-rose-50/90 border-rose-200/90 text-rose-950',
    title: 'Cost',
    description: 'Cheaper than most WhatsApp and printed invites*'
  },
  {
    id: 'elderly',
    icon: '🦜',
    iconBg: 'bg-emerald-50/90 border-emerald-200/90 text-emerald-950',
    title: 'Elderly-friendly Design',
    description: 'No more squinting at tiny, boring WhatsApp videos'
  },
  {
    id: 'pre-wedding',
    icon: '📸',
    iconBg: 'bg-amber-50/90 border-amber-200/90 text-amber-950',
    title: 'Pre-Wedding Highlight',
    description: 'Showcase your shoot like never before'
  },
  {
    id: 'revisions',
    icon: '📜',
    iconBg: 'bg-sky-50/90 border-sky-200/90 text-sky-950',
    title: '2 Revisions',
    description: 'Two rounds of changes included, even after sharing'
  },
  {
    id: 'ready-made',
    icon: '🪔',
    iconBg: 'bg-orange-50/90 border-orange-200/90 text-orange-950',
    title: 'Ready-Made Templates',
    description: 'Includes invites and editable mantras (Hindu weddings only)'
  },
  {
    id: 'private-events',
    icon: '🔒',
    iconBg: 'bg-purple-50/90 border-purple-200/90 text-purple-950',
    title: 'Private Event Pages',
    description: 'Invite different guests to different events'
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181210] leading-[1.15] mb-5 font-serif-luxury">
            The Wedding Invite,<br />
            <span className="text-[#181210] font-extrabold">Reinvented.</span>
          </h2>

          <p className="text-[#4D3F38] text-sm sm:text-base leading-relaxed mb-8 max-w-md font-normal">
            Everything a printed card or WhatsApp video can't be: interactive, instant, and unmistakably you.
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

        {/* Right Column: 6 Feature Items List */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          {FEATURES.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/90 hover:bg-white border border-[#EAE3D6] hover:border-amber-400/60 shadow-xs hover:shadow-md transition-all duration-200"
            >
              {/* Thematic Jewel Icon Container */}
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} border flex items-center justify-center text-2xl shrink-0 shadow-xs`}>
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
