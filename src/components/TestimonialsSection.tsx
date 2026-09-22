import React, { useRef, useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Triple the items for continuous loop experience
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  // Auto-slide step interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const cardWidth = container.offsetWidth < 640 ? 320 + 24 : 360 + 24;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 40) {
        // Reset to first set seamlessly
        container.scrollTo({ left: 0, behavior: 'smooth' });
        setActiveIndex(0);
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth < 640 ? 320 + 24 : 360 + 24;
      if (scrollRef.current.scrollLeft <= 20) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth / 3, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
      setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth < 640 ? 320 + 24 : 360 + 24;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      if (scrollRef.current.scrollLeft >= maxScroll - 40) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        setActiveIndex(0);
      } else {
        scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      }
    }
  };

  const handleDotClick = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth < 640 ? 320 + 24 : 360 + 24;
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  return (
    <section id="reviews-section" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D6] overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-[#8C5D2E] text-[11px] font-bold tracking-widest uppercase mb-3 font-display">
          <span>✦</span>
          <span>LOVED ACROSS BANGLADESH &amp; WORLDWIDE</span>
          <span>✦</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181210] leading-[1.18] mb-4 font-serif-luxury">
          Don't Take Our Word for It.<br />
          <span className="italic font-serif-accent font-semibold text-amber-700">Here's What Real Couples Are Saying</span>
        </h2>

        {/* Rating Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EAE3D6] shadow-xs text-xs sm:text-sm font-semibold text-[#181210] mt-2">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="font-bold text-[#181210]">4.9/5</span>
          <span className="text-stone-300">•</span>
          <span className="text-[#5A4B43] font-normal">Loved by 300+ happy couples</span>
        </div>
      </div>

      {/* Slider Controls Bar */}
      <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto px-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-1.5 text-xs text-[#8C6239] font-medium bg-[#F5EFE6] px-3 py-1 rounded-full border border-[#E5DACB] hover:bg-[#EAE0D2] transition-colors cursor-pointer"
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-amber-600 fill-current" />
                <span>Resume auto-slide</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Auto-sliding active</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleScrollLeft}
            className="p-2.5 rounded-full bg-white border border-[#E5DACB] text-[#2B1724] hover:bg-[#F2ECE2] hover:border-amber-400 transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleScrollRight}
            className="p-2.5 rounded-full bg-white border border-[#E5DACB] text-[#2B1724] hover:bg-[#F2ECE2] hover:border-amber-400 transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials Auto-Sliding Track */}
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto scrollbar-none no-scrollbar py-4 px-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allTestimonials.map((item, idx) => (
          <motion.div
            key={`${item.id}-${idx}`}
            whileHover={{ y: -8 }}
            className="group relative flex-shrink-0 w-[320px] sm:w-[360px] h-[480px] sm:h-[520px] rounded-3xl overflow-hidden flex flex-col justify-end p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 bg-[#2B1724] border border-white/10 select-none"
          >
            {/* Background Couple Photo */}
            <img
              src={item.image}
              alt={item.names}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181210] via-[#181210]/70 to-transparent pointer-events-none" />

            {/* Top Tag Badge */}
            <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md border border-white/20 text-[#F3D188] text-[10px] font-semibold px-3 py-1 rounded-full shadow-md">
              {item.tag || 'Verified Review'}
            </div>

            {/* Content at Bottom */}
            <div className="relative z-10 flex flex-col justify-end">
              {/* Star Rating */}
              <div className="flex items-center text-amber-400 gap-1 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base leading-relaxed text-stone-100 font-normal mb-5 italic font-serif-accent line-clamp-5">
                "{item.quote}"
              </p>

              {/* Names & Relation */}
              <div className="border-t border-white/20 pt-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white tracking-wide font-serif-luxury">
                    {item.names}
                  </h4>
                  <p className="text-xs text-amber-200/90 font-medium">
                    {item.relation}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-sm font-bold border border-white/30 shadow-sm">
                  ✦
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === i 
                ? 'w-8 h-2 bg-[#FF1375]' 
                : 'w-2 h-2 bg-[#D9CBBE] hover:bg-[#B3A090]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

