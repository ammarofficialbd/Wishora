import React, { useMemo } from 'react';
import { ArrowUpRight, Sparkles, Heart, ExternalLink } from 'lucide-react';
import { TemplateItem } from '../types';
import { TEMPLATES } from '../data/templates';

interface TemplatesSectionProps {
  onSelectTemplate: (templateId: string) => void;
  onOpenInquiry?: () => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  onSelectTemplate
}) => {
  // 2 Birthday Templates and 1 Wedding Template
  const featuredTemplateIds = [
    'first-birthday-wonderland',
    'golden-birthday-gala',
    'rajwada-vivah'
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
        <h2 className="text-[24px] sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B1724] leading-[34.4px] sm:leading-[1.15] mb-4 font-serif-luxury">
          Whatever the Moment, <span className="font-bold text-[#7A0C38]">Make It Meaningful.</span>
        </h2>
        <p className="text-[#4D3F38] text-sm sm:text-base font-normal">
          Explore our signature collection for Birthdays, Proposals, and Celebrations. Tap any card to open the live interactive demo.
        </p>
      </div>

      {/* Templates 3-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {templatesList.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className="group flex flex-col cursor-pointer bg-white hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF9] rounded-3xl p-5 border border-[#E8DDD4] shadow-xs hover:shadow-[0_20px_45px_rgba(122,12,56,0.12)] hover:border-[#A81B5B]/40 transition-all duration-300"
          >
            {/* TEMPLATE IMAGE CARD PREVIEW */}
            <div 
              className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-5 border border-[#EADBCC] shadow-xs bg-[#2B1724]"
            >
              {/* Actual Template Cover Image */}
              <img 
                src={template.coverImage} 
                alt={template.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container styling
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Gradient Scrim for Contrast & Elegance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Top Tag Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md text-[#2B1724] text-[10px] font-bold tracking-wider uppercase border border-amber-300/40 shadow-xs">
                  {template.category === 'birthday' ? '🎂 Birthday' : '💍 Wedding'}
                </span>

                {template.tag && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#7A0C38] to-[#A81B5B] text-amber-200 text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1 border border-amber-300/30">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{template.tag}</span>
                  </span>
                )}
              </div>

              {/* Bottom Overlay Info on Image */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white pointer-events-none">
                <div className="flex items-center gap-1.5 mb-1 text-[11px] text-amber-200/90 font-medium">
                  <span>✦</span>
                  <span>{template.aesthetic.split('&')[0]}</span>
                </div>
                <h4 className="font-serif-luxury italic text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  {template.name}
                </h4>
              </div>

              {/* Hover Live Demo Overlay Pill */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                <div className="px-4 py-2 rounded-full bg-white text-[#2B1724] font-bold text-xs shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 text-[#A81B5B]" />
                  <span>Open Live Demo</span>
                </div>
              </div>
            </div>

            {/* Template Info & Pricing row */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h3 className="text-xl font-bold text-[#181210] font-serif-luxury group-hover:text-[#7A0C38] transition-colors">
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

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTemplate(template.id);
                }}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 active:scale-[0.98] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_4px_16px_rgba(122,12,56,0.25)] hover:shadow-[0_8px_24px_rgba(122,12,56,0.4)] border border-rose-300/30"
              >
                <span>View template</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>

              {template.id === 'golden-birthday-gala' && (
                <a
                  href="/template/birthday01"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-3 rounded-full bg-white hover:bg-rose-50 text-[#7A0C38] border border-rose-200 hover:border-rose-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer group"
                  title="Open Full View in New Tab"
                >
                  <span>Full View</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#ff3d6e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
