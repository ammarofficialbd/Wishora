import React, { useState, useEffect } from 'react';
import { 
  X, Check, Music, ArrowRight, Sparkles, ExternalLink, Smartphone, Info 
} from 'lucide-react';
import { TemplateItem } from '../types';
import { audioController } from '../utils/audio';
import { BirthdayMobileWidget } from './BirthdayMobileWidget';
import { BirthdaySurpriseTemplate } from './BirthdaySurpriseTemplate';

interface LiveInviteModalProps {
  template: TemplateItem | null;
  onClose: () => void;
  onCustomize: (template: TemplateItem) => void;
}

export const LiveInviteModal: React.FC<LiveInviteModalProps> = ({
  template,
  onClose,
  onCustomize
}) => {
  const [mobileTab, setMobileTab] = useState<'preview' | 'details'>('preview');

  if (!template) return null;

  const isSurpriseTemplate = template.id === 'golden-birthday-gala';

  // Derive celebration person's name from template
  const personName = template.groomName && template.groomName.length > 0 
    ? (template.groomName.includes('&') ? template.groomName.split('&')[0].trim() : template.groomName) 
    : (template.name?.includes('Birthday') ? template.name.replace(/Birthday/i, '').trim() : 'Ahnaf');

  const senderGreeting = template.brideName && template.brideName.length > 0
    ? `With love, ${template.brideName}`
    : 'With love, Wishora';

  // Body scroll locking and audio cleanup
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      audioController.stopMusic();
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#2B1724]/75 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl h-[94vh] sm:h-[92vh] max-h-[880px] bg-[#FAF6F0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#E7D7C8]">
        
        {/* Top Header for Mobile with Segmented Tabs & Close Button */}
        <div className="w-full md:hidden bg-[#FAF8F5] border-b border-[#E8DDCF] px-3.5 py-2.5 flex items-center justify-between z-30 shrink-0">
          {/* Segmented Switcher for Mobile */}
          <div className="flex items-center p-1 rounded-xl bg-[#EFE7DC] border border-[#E2D5C3]">
            <button
              onClick={() => setMobileTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mobileTab === 'preview'
                  ? 'bg-white text-[#7A0C38] shadow-xs'
                  : 'text-[#6E5B53] hover:text-[#2B1724]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setMobileTab('details')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mobileTab === 'details'
                  ? 'bg-white text-[#7A0C38] shadow-xs'
                  : 'text-[#6E5B53] hover:text-[#2B1724]'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Details &amp; Price</span>
            </button>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-[#F2ECE2] text-[#2B1724] border border-[#E0D4C3] shadow-xs transition-colors cursor-pointer active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Close Button */}
        <button
          onClick={onClose}
          className="hidden md:flex absolute top-4 right-4 z-50 p-2 rounded-full bg-white/90 hover:bg-white text-[#2B1724] hover:text-[#7A0C38] transition-colors cursor-pointer shadow-md border border-[#E5DACB] active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Interactive Smartphone Simulator */}
        <div 
          className={`w-full md:w-1/2 h-full bg-gradient-to-b from-[#F3EBE1] to-[#EBE0D3] p-2.5 sm:p-5 flex flex-col items-center justify-center overflow-hidden border-r border-[#E2D4C3] ${
            mobileTab === 'preview' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <div className="relative w-full max-w-[310px] sm:max-w-[340px] h-[calc(94vh-140px)] sm:h-[600px] md:h-[640px] max-h-[660px] bg-[#4A1525] rounded-[38px] sm:rounded-[42px] p-2.5 sm:p-3 shadow-2xl border-[4px] sm:border-[5px] border-[#662035] flex flex-col justify-between overflow-hidden">
            
            {/* Phone Notch */}
            <div className="w-24 sm:w-28 h-3.5 sm:h-4 bg-[#320C18] mx-auto rounded-full mb-1 flex items-center justify-center shrink-0">
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-600/60 mr-2" />
              <div className="w-10 sm:w-12 h-1 bg-amber-600/40 rounded-full" />
            </div>

            {/* Phone Screen Body */}
            <div 
              className="relative flex-1 rounded-[26px] sm:rounded-[30px] overflow-hidden text-stone-900 flex flex-col justify-between shadow-inner w-full h-full min-h-0 bg-[#FBF4F1] overscroll-contain"
            >
              {isSurpriseTemplate ? (
                <BirthdaySurpriseTemplate
                  name={personName}
                  isEmbedded={true}
                  onOrder={() => onCustomize(template)}
                />
              ) : (
                <BirthdayMobileWidget 
                  name={personName}
                  senderName={senderGreeting}
                  accentColor={template.accentColor || '#831843'}
                  onCustomize={() => onCustomize(template)}
                />
              )}
            </div>

            {/* Home indicator */}
            <div className="w-14 sm:w-16 h-1 bg-amber-600/40 rounded-full mx-auto mt-1 shrink-0" />
          </div>

          {/* Quick Mobile Sticky Order Strip in Preview Mode */}
          <div className="w-full max-w-[320px] pt-2 flex md:hidden items-center justify-between gap-2">
            <button
              onClick={() => onCustomize(template)}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>Order Template (৳{template.discountPrice})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileTab('details')}
              className="py-2 px-3 rounded-xl bg-white border border-[#E0D4C3] text-[#2B1724] font-semibold text-xs active:scale-95 whitespace-nowrap"
            >
              Details
            </button>
          </div>
        </div>

        {/* Right Side: Template Details, Features & Order CTA */}
        <div 
          className={`w-full md:w-1/2 h-full bg-[#FAF8F5] p-5 sm:p-8 flex flex-col justify-between overflow-y-auto overscroll-contain ${
            mobileTab === 'details' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-[#EFE7DC] text-[#8C5D2E] border border-[#E2D5C3] px-3 py-1 rounded-full font-semibold">
                {template.categoryLabel || 'Celebration'}
              </span>
              {template.tag && (
                <span className="text-xs bg-rose-100 text-[#7A0C38] border border-rose-200 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#A81B5B]" />
                  {template.tag}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#2B1724] mb-2">
              {template.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#7A0C38] font-display">
                ৳{template.discountPrice.toLocaleString('en-US')}
              </span>
              <span className="text-stone-400 line-through text-sm sm:text-base">
                ৳{template.originalPrice.toLocaleString('en-US')}
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                Save {Math.round((1 - template.discountPrice / template.originalPrice) * 100)}%
              </span>
            </div>

            {/* Full View (Open in New Tab) Button */}
            {isSurpriseTemplate && (
              <a
                href="/template/birthday01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#2a0610] via-[#5a1024] to-[#7a0f2e] text-white hover:brightness-110 text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer mb-5 border border-rose-400/40 group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-white/10 text-[#ff3d6e] group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-4 h-4 text-[#ff3d6e]" />
                  </span>
                  <div className="text-left">
                    <div className="text-amber-200 font-bold">Full View (Open in New Tab)</div>
                    <div className="text-[10px] text-rose-200/80 font-normal">Separate full template page (no header/footer)</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-white/15 px-3 py-1.5 rounded-full text-white font-semibold shrink-0 group-hover:bg-white/25 transition-colors">
                  <span>Full View</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            )}

            <p className="text-[#5A454F] text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              {template.description}
            </p>

            {/* Included in this template breakdown */}
            <div className="space-y-3 mb-8">
              <h4 className="text-xs font-bold text-[#2B1724] uppercase tracking-wider">
                What's included in this design:
              </h4>

              {isSurpriseTemplate ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5A454F]">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Countdown Surprise Intro Screen</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>10 Balloon Popping Affirmations</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Interactive Cake Cutting &amp; Flames</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Memory Photo Gallery with Lightbox</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Wax Envelope Typewriter Letter</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>6 3D Flip Wish Cards &amp; Grand Finale</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5A454F]">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Wax-Sealed Unfolding Letter</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Music className="w-3.5 h-3.5 text-[#A81B5B] shrink-0" />
                    <span>Ambient Flute Celebration Music</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Scratch-to-Reveal Surprise Gift</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>5 Blowable Cake Candles &amp; Flame</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>3D Flip Wish Cards for the Year</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>24 Hour Delivery on WhatsApp</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-[#E8DDCF] flex flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onCustomize(template)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer border border-rose-300/30"
            >
              <span>Personalise &amp; Order — ৳{template.discountPrice}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[10px] sm:text-[11px] text-[#87746D]">
              No technical knowledge needed · We handle photos, timings, and WhatsApp link setup
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
