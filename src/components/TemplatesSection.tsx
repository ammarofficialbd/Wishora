import React, { useMemo } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { TemplateItem } from '../types';
import { TEMPLATES } from '../data/templates';

interface TemplatesSectionProps {
  onSelectTemplate: (templateId: string) => void;
  onOpenInquiry?: () => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  onSelectTemplate
}) => {
  // Featured 3 signature templates
  const featuredTemplateIds = [
    'rajwada-vivah',
    'vrindavan',
    'golden-jubilee'
  ];

  const templatesList = useMemo(() => {
    return TEMPLATES.filter(t => featuredTemplateIds.includes(t.id));
  }, []);

  return (
    <section id="templates-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-[#8C5D2E] text-[11px] font-bold tracking-widest uppercase mb-3 font-display">
          <span>✦</span>
          <span>MADE FOR EVERY MOMENT</span>
          <span>✦</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181210] leading-[1.15] mb-4 font-serif-luxury">
          Whatever the Moment, <span className="italic font-serif-accent font-semibold text-amber-700">Make It Meaningful.</span>
        </h2>
        <p className="text-[#4D3F38] text-sm sm:text-base font-normal">
          Explore our signature collection for Weddings, Birthdays, Proposals, and Invitations. Tap any card to view the live interactive demo.
        </p>
      </div>

      {/* Templates 3-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {templatesList.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className="group flex flex-col cursor-pointer bg-white hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF9] rounded-3xl p-5 border border-[#E8DDD4] shadow-xs hover:shadow-[0_20px_45px_rgba(255,19,117,0.12)] hover:border-[#FF1375]/45 transition-all duration-300"
          >
            {/* ONLY TEMPLATE CARD PREVIEW (NO MOBILE PHONE MOCKUP) */}
            <div 
              className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between text-center border shadow-xs transition-transform duration-300 group-hover:scale-[1.02] mb-5"
              style={{
                backgroundColor: template.secondaryColor || '#FAF7F0',
                borderColor: `${template.accentColor}35`
              }}
            >
              {/* Background decorative watermark */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4a34b_1.2px,transparent_1.2px)] [background-size:18px_18px]" />

              {/* Top Motif / Monogram */}
              <div className="relative z-10 pt-2">
                <div 
                  className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-base font-bold shadow-xs mb-2 backdrop-blur-xs"
                  style={{
                    backgroundColor: `${template.accentColor}18`,
                    color: template.accentColor,
                    border: `1.5px solid ${template.accentColor}45`
                  }}
                >
                  {template.category === 'engagement' ? '💍' : template.category === 'birthday' ? '🎂' : template.category === 'save-the-date' ? '💌' : template.category === 'muslim' ? '🌙' : '✦'}
                </div>
                <p className="text-[10px] uppercase tracking-widest font-cinzel opacity-90 font-bold" style={{ color: template.accentColor }}>
                  {template.categoryLabel}
                </p>
              </div>

              {/* Middle: Couple Names / Event Title */}
              <div className="relative z-10 my-auto py-2">
                <h4 className="text-2xl sm:text-[26px] font-serif-luxury font-bold text-[#181210] leading-tight drop-shadow-xs">
                  {template.groomName}
                </h4>
                <p className="text-xs font-serif-accent italic my-1 font-bold" style={{ color: template.accentColor }}>
                  &amp;
                </p>
                <h4 className="text-2xl sm:text-[26px] font-serif-luxury font-bold text-[#181210] leading-tight drop-shadow-xs">
                  {template.brideName}
                </h4>

                {/* Golden Wax Seal */}
                <div className="my-3 flex justify-center">
                  <div 
                    className="w-8 h-8 rounded-full shadow-md flex items-center justify-center text-xs font-bold text-white border border-amber-200/80 transform group-hover:rotate-12 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${template.accentColor}, #d4a34b)`
                    }}
                  >
                    ✦
                  </div>
                </div>

                <p className="text-[11px] font-semibold text-[#4D3F38] tracking-wide mt-1">
                  {template.eventDate}
                </p>
              </div>

              {/* Hover Badge */}
              <div className="absolute top-3 right-3 bg-[#2B1724]/90 backdrop-blur-xs text-[#FDE68A] border border-amber-400/40 text-[10px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Live Demo</span>
              </div>
            </div>

            {/* Template Info & Pricing row */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h3 className="text-xl font-bold text-[#181210] font-serif-luxury group-hover:text-[#FF1375] transition-colors">
                {template.name}
              </h3>

              {/* Price Tags */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-stone-400 line-through">
                  ৳{template.originalPrice.toLocaleString('en-US')}
                </span>
                <span className="text-xs font-bold bg-gradient-to-r from-[#2B1724] to-[#4A1733] text-[#FDE68A] border border-amber-400/35 px-2.5 py-0.5 rounded-full shadow-xs">
                  ৳{template.discountPrice.toLocaleString('en-US')}
                </span>
              </div>
            </div>

            {/* Category Tag */}
            <div className="mb-4">
              <span className="text-xs text-[#8C6239] font-medium">
                {template.categoryLabel}
              </span>
            </div>

            {/* Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectTemplate(template.id);
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF1375] via-[#E11D48] to-[#BE185D] hover:brightness-105 active:scale-[0.98] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer mt-auto shadow-[0_4px_14px_rgba(255,19,117,0.25)] hover:shadow-[0_8px_22px_rgba(255,19,117,0.38)] border border-rose-300/30"
            >
              <span>View template</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
