import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplicate for seamless infinite horizontal loop
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  const handleNudge = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const shift = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: shift, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews-section" className="py-20 sm:py-28 max-w-full overflow-hidden border-t border-[#EAE3D6] relative bg-[#faf9f6]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        {/* Muted Uppercase Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DD] border border-[#E2D6C5] text-[#8C6239] text-[11px] font-semibold tracking-[0.2em] uppercase font-sans mb-4">
          <Heart className="w-3 h-3 text-[#B07238] fill-current" />
          <span>Real Celebrations • Real Stories</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181210] leading-[1.18] mb-4 font-serif-luxury">
          Don't Take Our Word for It.<br />
          <span className="italic font-serif-accent font-normal text-[#8C5D2E]">
            Here's What Real Couples Are Saying
          </span>
        </h2>

        {/* Rating Pill */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 px-4 py-2.5 sm:py-1.5 rounded-2xl sm:rounded-full bg-white border border-[#E6DACB] shadow-xs text-xs sm:text-sm font-medium text-[#181210] mt-2 max-w-full">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-[#E5A93C] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-[#181210]">4.9 / 5.0</span>
          </div>
          <span className="hidden sm:inline text-[#C8B8A6]">•</span>
          <span className="text-[#6B5A50] font-normal text-center leading-relaxed">
            Over 300+ couples across Bangladesh &amp; worldwide
          </span>
        </div>
      </div>

      {/* Manual Slide Arrows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-end mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNudge('left')}
            className="p-2 rounded-full bg-white border border-[#DFD1BF] text-[#2B1724] hover:bg-[#F3ECE2] hover:border-[#8C6239]/40 transition-all shadow-xs active:scale-90 cursor-pointer"
            aria-label="Slide Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNudge('right')}
            className="p-2 rounded-full bg-white border border-[#DFD1BF] text-[#2B1724] hover:bg-[#F3ECE2] hover:border-[#8C6239]/40 transition-all shadow-xs active:scale-90 cursor-pointer"
            aria-label="Slide Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Marquee Carousel Container with Gradient Fade Edges */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-24 md:w-32 bg-gradient-to-r from-[#faf9f6] via-[#faf9f6]/80 to-transparent z-10" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-24 md:w-32 bg-gradient-to-l from-[#faf9f6] via-[#faf9f6]/80 to-transparent z-10" />

        {/* Continuous Horizontal Sliding Track */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-none no-scrollbar py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div
            className="flex gap-5 sm:gap-6 px-4 animate-marquee-left hover:[animation-play-state:paused]"
          >
            {marqueeItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] h-[430px] sm:h-[460px] md:h-[490px] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-end p-6 text-white shadow-md hover:shadow-2xl transition-all duration-300 bg-[#1A1412] border border-white/10 select-none cursor-grab active:cursor-grabbing transform hover:-translate-y-1"
              >
                {/* Background Couple Photo */}
                <img
                  src={item.image}
                  alt={item.names}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Cinematic Dark Gradient Vignette for perfect text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 pointer-events-none" />

                {/* Subtle Top Tag Badge */}
                {item.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-black/45 backdrop-blur-md border border-white/15 text-[#E6C687] text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {item.tag}
                  </div>
                )}

                {/* Centered Content: Gold Stars, Small White Sans-Serif Quote, Bold White Names, Muted Subtitle */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Small Gold Stars */}
                  <div className="flex items-center justify-center gap-1 text-[#E5A93C] mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Centered Review Quote in small, white, sans-serif font */}
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-white/95 font-sans font-normal mb-5 max-w-[280px] mx-auto line-clamp-4">
                    "{item.quote}"
                  </p>

                  {/* Divider line */}
                  <div className="w-12 h-px bg-white/20 mb-3" />

                  {/* Centered Couple's Name in Bold White */}
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-wide font-sans text-center">
                    {item.names}
                  </h4>

                  {/* Centered Role / Subtitle in Muted Gray */}
                  <p className="text-[11px] sm:text-xs text-stone-300/80 font-normal tracking-wide text-center mt-0.5">
                    {item.relation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center mt-6">
        <p className="text-xs text-[#8C7A6B]">
          Hover or tap any card to pause • Over 1,500+ guests celebrated digitally this month
        </p>
      </div>
    </section>
  );
};
