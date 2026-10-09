import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, MessageCircle } from 'lucide-react';

interface PricingSectionProps {
  onChoosePackage?: (packageName: string, price: string) => void;
  onChooseTemplate?: () => void;
  onOpenInquiry?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onChoosePackage,
  onChooseTemplate,
  onOpenInquiry,
}) => {
  const currentPrices = {
    symbol: '৳',
    starter: '499',
    memories: '699',
    premium: '999',
  };

  const getWhatsAppUrl = (pkgName: string, price: string) => {
    const message = `হ্যালো Wishora! আমি আপনাদের "${pkgName}" প্যাকেজটি (${currentPrices.symbol}${price}) অর্ডার করতে আগ্রহী। অনুগ্রহ করে বিস্তারিত প্রসেস ও অর্ডারের নিয়ম জানাবেন।`;
    return `https://wa.me/8801411390983?text=${encodeURIComponent(message)}`;
  };

  const handleSelect = (tier: string, price: string) => {
    if (onChoosePackage) {
      onChoosePackage(tier, `${currentPrices.symbol}${price}`);
    }
  };

  return (
    <section id="pricing-section" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF4EC] via-[#FDF2F7] to-[#F8EFF6] text-[#2D1D24] overflow-hidden border-t border-[#EAE0D5]">
      {/* Ambient background particles & wish glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-r from-[#FF2A85]/15 via-[#F59E0B]/10 to-[#EC4899]/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-rose-200/40 rounded-full blur-[90px]" />
        <div className="absolute bottom-20 right-10 w-[380px] h-[380px] bg-amber-200/35 rounded-full blur-[90px]" />
        
        {/* Subtle twinkling celebration stars */}
        <div className="absolute top-12 left-16 w-2 h-2 bg-[#FF2A85] rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-36 right-24 w-2 h-2 bg-amber-400 rounded-full opacity-60" />
        <div className="absolute bottom-24 left-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-1/2 right-12 w-2 h-2 bg-[#FF1375] rounded-full opacity-70" />
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-amber-500 rounded-full opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-[#8C5D2E] text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4 font-display">
            <span>✦</span>
            <span>স্বচ্ছ ও সাশ্রয়ী প্যাকেজ</span>
            <span>✦</span>
          </div>
          <h2 className="text-[24px] sm:text-4xl md:text-[44px] lg:text-[44px] font-bold tracking-tight text-[#2B1724] leading-[34.4px] sm:leading-[1.2] mb-5 font-serif-luxury">
            আপনার মুহূর্তের সাথে মানানসই<br />
            <span className="font-bold text-[#7A0C38]">প্যাকেজটি বেছে নিন।</span>
          </h2>
          <p className="text-[#68535F] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            প্রতিটি সৃষ্টি বিশেষভাবে তৈরি—আবহ সঙ্গীত, জীবন্ত ৩ডি অ্যানিমেশন এবং স্মৃতিময় অভিজ্ঞতার সমন্বয়ে।
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto">
          
          {/* Card 1: Starter */}
          <div className="relative rounded-[28px] bg-white/95 border border-[#E8D7E0] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:border-[#D49EBE] hover:shadow-[0_16px_40px_rgba(180,83,122,0.12)] group shadow-sm">
            <div>
              {/* Kicker */}
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9D768B] mb-3 font-display">
                স্টার্টার
              </p>

              {/* Title */}
              <h3 className="text-[22px] font-serif-luxury text-[#2B1724] mb-4 leading-snug">
                সহজ ও মিষ্টি সারপ্রাইজের জন্য
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-sm font-serif-luxury text-[#9D768B]">শুরু মাত্র</span>
                <span className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#9A3412]">
                  {currentPrices.symbol}{currentPrices.starter}
                </span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#F0E4EB] mb-6" />

              {/* Feature List */}
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-[#5B4853]">
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>ব্যক্তিগত কাস্টমাইজড ডিজাইন</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>নাম ও আন্তরিক শুভেচ্ছা বার্তা</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>ফটো অ্যালবাম ও গ্যালারি</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>ব্যাকগ্রাউন্ড মিউজিক প্লেয়ার</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>প্রাইভেট শেয়ারেবল লিংক</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <a
              href={getWhatsAppUrl('স্টার্টার', currentPrices.starter)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSelect('Starter', currentPrices.starter)}
              id="choose-starter-btn"
              className="w-full py-3.5 px-6 rounded-full bg-[#FAF0F5] hover:bg-emerald-50 text-[#831843] hover:text-emerald-800 border border-[#E2CBD8] hover:border-emerald-300 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>স্টার্টার প্যাকেজ নিন</span>
            </a>
          </div>

          {/* Card 2: Memories (MOST POPULAR - Highlighted) */}
          <div className="relative rounded-[28px] bg-gradient-to-b from-[#FAF0F4] via-[#FDF5F8] to-[#FFF9FB] border-2 border-[#A81B5B] p-7 sm:p-9 flex flex-col justify-between shadow-[0_12px_45px_rgba(122,12,56,0.15)] lg:-translate-y-3 transition-all duration-300 hover:shadow-[0_16px_55px_rgba(122,12,56,0.25)] group">
            
            {/* "MOST POPULAR" Floating Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7A0C38] to-[#C7246D] text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase shadow-[0_4px_15px_rgba(122,12,56,0.35)] whitespace-nowrap">
              সবচেয়ে জনপ্রিয়
            </div>

            <div>
              {/* Kicker */}
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7A0C38] mb-3 font-display">
                মেমোরিজ
              </p>

              {/* Title */}
              <h3 className="text-[22px] font-serif-luxury text-[#2B1724] mb-4 leading-snug">
                গভীর অনুভূতির গল্প সাজাতে
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-sm font-serif-luxury text-[#7A0C38]">শুরু মাত্র</span>
                <span className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#7A0C38]">
                  {currentPrices.symbol}{currentPrices.memories}
                </span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#F0D5E1] mb-6" />

              {/* Feature List */}
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-[#4E3946]">
                <li className="flex items-center gap-3 font-bold text-[#7A0C38]">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>স্টার্টার প্যাকেজের সবকিছু</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>আরও বেশি ছবির সুন্দর অ্যালবাম</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>ব্যক্তিগত চিঠি বা বার্তার অধ্যায়</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>ইন্টারেক্টিভ মেমোরি টাইমলাইন</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>ভিডিও যুক্ত করার সুবিধা</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <a
              href={getWhatsAppUrl('মেমোরিজ', currentPrices.memories)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSelect('Memories', currentPrices.memories)}
              id="choose-memories-btn"
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(122,12,56,0.35)] active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300 fill-emerald-300/20 group-hover:scale-110 transition-transform" />
              <span>মেমোরিজ প্যাকেজ নিন</span>
            </a>
          </div>

          {/* Card 3: Premium */}
          <div className="relative rounded-[28px] bg-white/95 border border-[#E8D7E0] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:border-[#D49EBE] hover:shadow-[0_16px_40px_rgba(180,83,122,0.12)] group shadow-sm">
            <div>
              {/* Kicker */}
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#B45309] mb-3 font-display">
                প্রিমিয়াম
              </p>

              {/* Title */}
              <h3 className="text-[22px] font-serif-luxury text-[#2B1724] mb-4 leading-snug">
                অবিস্মরণীয় রাজকীয় আয়োজন
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-sm font-serif-luxury text-[#9D768B]">শুরু মাত্র</span>
                <span className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#B45309]">
                  {currentPrices.symbol}{currentPrices.premium}
                </span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#F0E4EB] mb-6" />

              {/* Feature List */}
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-[#5B4853]">
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>সম্পূর্ণ কাস্টমাইজড স্টোরিলাইন</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>অ্যাডভান্সড ৩ডি অ্যানিমেশন</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>ছবি ও ভিডিওর বিশেষ চ্যাপ্টার</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>কাস্টম রিভিল সারপ্রাইজ সেকশন</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#A81B5B] text-xs">✦</span>
                  <span>প্রিমিয়াম সাউন্ডট্র্যাক ও এন্ডিং</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <a
              href={getWhatsAppUrl('প্রিমিয়াম', currentPrices.premium)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSelect('Premium', currentPrices.premium)}
              id="choose-premium-btn"
              className="w-full py-3.5 px-6 rounded-full bg-[#FAF0F5] hover:bg-emerald-50 text-[#831843] hover:text-emerald-800 border border-[#E2CBD8] hover:border-emerald-300 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer shadow-xs flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>প্রিমিয়াম প্যাকেজ নিন</span>
            </a>
          </div>

        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 max-w-2xl mx-auto text-center p-4 rounded-2xl bg-white/90 border border-[#E7D6DE] text-xs text-[#68535F] flex flex-wrap items-center justify-center gap-4 sm:gap-8 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>হোয়াটসঅ্যাপে ২৪ ঘণ্টার মধ্যে ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>২ বার ফ্রি রিভিশন সুবিধা</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-600 font-bold">✦</span>
            <span>১০০% সন্তুষ্টির নিশ্চয়তা</span>
          </div>
        </div>
      </div>
    </section>
  );
};
