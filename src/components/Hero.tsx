import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import birthdayGalaImg from '../assets/images/birthday_celebration_gala_1791092278497.jpg';
import royalWeddingImg from '../assets/images/royal_wedding_invitation_1791092289863.jpg';

interface HeroProps {
  onChooseTemplate: () => void;
  onSelectTemplate: (templateId: string) => void;
}

interface HeroCardItem {
  id: string;
  templateId: string;
  title: string;
  subtitle: string;
  couple: string;
  category: string;
  image: string;
}

export const Hero: React.FC<HeroProps> = ({ onChooseTemplate, onSelectTemplate }) => {
  // Column 1 (Lane 1 - Moves UPPER)
  const col1Cards: HeroCardItem[] = [
    {
      id: 'hero-1',
      templateId: 'rajwada-vivah',
      title: 'Royal Heritage',
      subtitle: 'Royal Wedding',
      couple: 'Farhan & Samira',
      category: 'Wedding',
      image: royalWeddingImg
    },
    {
      id: 'hero-2',
      templateId: 'first-birthday-wonderland',
      title: 'First Birthday Wonderland',
      subtitle: 'Magical Celebration',
      couple: 'Ayaan’s 1st Birthday',
      category: 'Birthday',
      image: '/assets/wishora-birth-template.jpg'
    }
  ];

  // Column 2 (Lane 2 - Moves LOWER)
  const col2Cards: HeroCardItem[] = [
    {
      id: 'hero-3',
      templateId: 'golden-birthday-gala',
      title: 'Golden Birthday Surprise',
      subtitle: 'Surprise Countdown',
      couple: 'Ahnaf’s Birthday Surprise',
      category: 'Birthday',
      image: birthdayGalaImg
    },
    {
      id: 'hero-4',
      templateId: 'save-the-sunset',
      title: 'Sunset Save The Date',
      subtitle: 'Beachfront Destination',
      couple: 'Zayan & Ayla',
      category: 'Save the Date',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Column 3 (Lane 3 - Moves UPPER)
  const col3Cards: HeroCardItem[] = [
    {
      id: 'hero-5',
      templateId: 'first-birthday-wonderland',
      title: 'Ayaan’s 1st Birthday',
      subtitle: 'Burgundy & Gold Balloons',
      couple: 'Ayaan (1st Birthday)',
      category: 'Birthday',
      image: '/assets/wishora-birth-template.jpg'
    },
    {
      id: 'hero-6',
      templateId: 'golden-birthday-gala',
      title: 'Golden Birthday Surprise',
      subtitle: 'Surprise Countdown',
      couple: 'Ahnaf’s Birthday Surprise',
      category: 'Birthday',
      image: birthdayGalaImg
    }
  ];

  // Column 4 (Lane 4 - Moves LOWER)
  const col4Cards: HeroCardItem[] = [
    {
      id: 'hero-7',
      templateId: 'rajwada-vivah',
      title: 'Royal Heritage Vivah',
      subtitle: 'Regal Arch & Gold Foil',
      couple: 'Farhan & Samira',
      category: 'Royal Wedding',
      image: royalWeddingImg
    },
    {
      id: 'hero-8',
      templateId: 'first-birthday-wonderland',
      title: 'First Birthday Wonderland',
      subtitle: 'Magical Celebration',
      couple: 'Ayaan’s 1st Birthday',
      category: 'Birthday',
      image: '/assets/wishora-birth-template.jpg'
    }
  ];

  // Column 5 (Lane 5 - Moves UPPER)
  const col5Cards: HeroCardItem[] = [
    {
      id: 'hero-9',
      templateId: 'golden-birthday-gala',
      title: 'Golden Birthday Surprise',
      subtitle: 'Balloons & Cake Cutting',
      couple: 'Ahnaf & Family',
      category: 'Birthday',
      image: birthdayGalaImg
    },
    {
      id: 'hero-10',
      templateId: 'rajwada-vivah',
      title: 'Royal Heritage Vivah',
      subtitle: 'Grand Wedding Reception',
      couple: 'Farhan & Samira',
      category: 'Wedding',
      image: royalWeddingImg
    }
  ];

  // Repeat columns for continuous seamless vertical loops
  const c1Duplicated = [...col1Cards, ...col1Cards, ...col1Cards];
  const c2Duplicated = [...col2Cards, ...col2Cards, ...col2Cards];
  const c3Duplicated = [...col3Cards, ...col3Cards, ...col3Cards];
  const c4Duplicated = [...col4Cards, ...col4Cards, ...col4Cards];
  const c5Duplicated = [...col5Cards, ...col5Cards, ...col5Cards];

  const renderCard = (card: HeroCardItem, idx: number, prefix: string) => (
    <div
      key={`${prefix}-${card.id}-${idx}`}
      onClick={() => onSelectTemplate(card.templateId)}
      className="group relative cursor-pointer aspect-[3/4.2] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-stone-300/80 bg-[#1c1412] transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_28px_60px_rgba(0,0,0,0.35)] shrink-0"
    >
      {/* Real Template Image */}
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 pointer-events-none"
        loading="lazy"
      />

      {/* Cinematic Vignette Overlay for perfect typography legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />

      {/* Top Category Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#F3D188] border border-white/20 text-[10px] font-semibold uppercase tracking-wider shadow-sm">
          {card.category}
        </span>
      </div>

      {/* Bottom Details */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 text-white">
        <p className="text-[10px] sm:text-[11px] font-medium text-amber-200/90 tracking-widest uppercase font-cinzel">
          {card.subtitle}
        </p>
        <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-white leading-tight mt-0.5 drop-shadow-xs">
          {card.title}
        </h3>
        <p className="text-xs text-stone-300 mt-1 line-clamp-1 font-serif-accent italic">
          {card.couple}
        </p>
      </div>

      {/* Hover "Live Preview" Popup Indicator */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 z-20 backdrop-blur-[2px]">
        <span className="px-4 py-2 rounded-full bg-white text-[#181210] font-bold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
          <span>Live Demo</span>
          <ArrowUpRight className="w-4 h-4 text-[#A81B5B]" />
        </span>
      </div>
    </div>
  );

  return (
    <section className="relative pt-10 pb-4 sm:pt-14 sm:pb-6 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F1E7] to-[#FAF8F5]">
      {/* Ambient warm champagne & rose background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-amber-200/35 via-rose-100/30 to-amber-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-[#8C5D2E] text-xs sm:text-sm font-semibold mb-4">
          <span className="text-amber-600">✦</span>
          <span>For moments worth remembering</span>
          <span className="text-amber-600">✦</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-[30px] sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-[#2B1724] tracking-tight leading-[38px] sm:leading-[1.14] mb-5 font-serif-luxury max-w-4xl mx-auto">
          Turn a Special Moment Into<br />
          <span className="font-bold text-[#7A0C38]">Something They’ll Never Forget.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#5A454F] text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-8">
          Beautiful, personalized digital experiences made for birthdays, anniversaries, proposals, weddings, and the people who mean the most.
        </p>

        {/* Primary CTA Button */}
        <div className="flex justify-center items-center mb-8 sm:mb-10">
          <button
            onClick={onChooseTemplate}
            id="hero-choose-template-btn"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-base font-semibold border border-rose-300/30 hover:scale-105 active:scale-95 transition-all shadow-[0_12px_28px_-6px_rgba(122,12,56,0.4)] hover:shadow-[0_16px_36px_-6px_rgba(122,12,56,0.55)] cursor-pointer flex items-center gap-2 group"
          >
            <span>Choose a template</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 
        3D Angled Moving Showcase Matrix
        - 110 degree left tilt (rotateZ -20deg) with perspective
        - Real Template Images with click-to-preview popup modal
        - Alternating opposite directions:
            Row/Lane 1: UPPER (animate-marquee-up)
            Row/Lane 2: LOWER (animate-marquee-down)
            Row/Lane 3: UPPER (animate-marquee-up)
            Row/Lane 4: LOWER (animate-marquee-down)
            Row/Lane 5: UPPER (animate-marquee-up)
      */}
      <div className="relative w-full h-[540px] sm:h-[640px] md:h-[700px] lg:h-[740px] overflow-hidden pause-on-hover select-none">
        
        {/* Top & Bottom Soft Fade Masks */}
        <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-20 pointer-events-none" />

        {/* Left & Right Soft Fade Masks */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-20 pointer-events-none" />

        {/* 3D Perspective Plane Container (110 degree left tilt) */}
        <div className="hero-3d-plane flex justify-center gap-3.5 sm:gap-4.5 md:gap-5.5 px-4 h-full">
          
          {/* Row/Lane 1: Moves UPPER (Upwards) */}
          <div className="animate-marquee-up flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c1Duplicated.map((card, idx) => renderCard(card, idx, 'c1'))}
          </div>

          {/* Row/Lane 2: Moves LOWER (Downwards) */}
          <div className="animate-marquee-down flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c2Duplicated.map((card, idx) => renderCard(card, idx, 'c2'))}
          </div>

          {/* Row/Lane 3: Moves UPPER (Upwards) */}
          <div className="animate-marquee-up flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c3Duplicated.map((card, idx) => renderCard(card, idx, 'c3'))}
          </div>

          {/* Row/Lane 4: Moves LOWER (Downwards) */}
          <div className="animate-marquee-down flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c4Duplicated.map((card, idx) => renderCard(card, idx, 'c4'))}
          </div>

          {/* Row/Lane 5: Moves UPPER (Upwards) */}
          <div className="animate-marquee-up flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c5Duplicated.map((card, idx) => renderCard(card, idx, 'c5'))}
          </div>

        </div>

      </div>
    </section>
  );
};
