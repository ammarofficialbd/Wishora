import React, { useEffect } from 'react';
import { 
  X, Check, Music, ArrowRight, Sparkles 
} from 'lucide-react';
import { TemplateItem } from '../types';
import { audioController } from '../utils/audio';
import { BirthdayMobileWidget } from './BirthdayMobileWidget';

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
  if (!template) return null;

  // Derive celebration person's name from template
  const personName = template.groomName && template.groomName.length > 0 
    ? (template.groomName.includes('&') ? template.groomName.split('&')[0].trim() : template.groomName) 
    : (template.name?.includes('Birthday') ? template.name.replace(/Birthday/i, '').trim() : 'Ayaan');

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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#2B1724]/60 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[860px] bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#E7D7C8]">
        
        {/* Top Close Button for Mobile & Desktop */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-white text-[#2B1724] hover:text-[#7A0C38] transition-colors cursor-pointer shadow-md border border-[#E5DACB]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Interactive Smartphone Simulator */}
        <div className="w-full md:w-1/2 h-full bg-gradient-to-b from-[#F3EBE1] to-[#EBE0D3] p-3 sm:p-5 flex flex-col items-center justify-center overflow-hidden border-r border-[#E2D4C3]">
          <div className="relative w-full max-w-[340px] h-[580px] sm:h-[640px] bg-[#4A1525] rounded-[42px] p-3 shadow-2xl border-[5px] border-[#662035] flex flex-col justify-between overflow-hidden">
            
            {/* Phone Notch */}
            <div className="w-28 h-4 bg-[#320C18] mx-auto rounded-full mb-1 flex items-center justify-center shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-600/60 mr-2" />
              <div className="w-12 h-1 bg-amber-600/40 rounded-full" />
            </div>

            {/* Phone Screen Body - All popups render the interactive celebration widget */}
            <div 
              className="relative flex-1 rounded-[30px] overflow-hidden text-stone-900 flex flex-col justify-between shadow-inner w-full h-full min-h-0 bg-[#FBF4F1] overscroll-contain"
            >
              <BirthdayMobileWidget 
                name={personName}
                senderName={senderGreeting}
                accentColor={template.accentColor || '#831843'}
                onCustomize={() => onCustomize(template)}
              />
            </div>

            {/* Home indicator */}
            <div className="w-16 h-1 bg-amber-600/40 rounded-full mx-auto mt-1 shrink-0" />
          </div>
        </div>

        {/* Right Side: Template Details, Features & Order CTA */}
        <div className="w-full md:w-1/2 h-full bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto overscroll-contain">
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

            <h2 className="text-3xl font-serif-luxury font-bold text-[#2B1724] mb-2">
              {template.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#7A0C38] font-display">
                ৳{template.discountPrice.toLocaleString('en-US')}
              </span>
              <span className="text-stone-400 line-through text-base">
                ৳{template.originalPrice.toLocaleString('en-US')}
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                Save {Math.round((1 - template.discountPrice / template.originalPrice) * 100)}%
              </span>
            </div>

            <p className="text-[#5A454F] text-sm leading-relaxed mb-6 font-normal">
              {template.description}
            </p>

            {/* Included in this template breakdown */}
            <div className="space-y-3 mb-8">
              <h4 className="text-xs font-bold text-[#2B1724] uppercase tracking-wider">
                What's included in this design:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5A454F]">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Wax-Sealed Unfolding Letter</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Music className="w-3.5 h-3.5 text-[#A81B5B]" />
                  <span>Ambient Flute Celebration Music</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scratch-to-Reveal Surprise Gift</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>5 Blowable Cake Candles & Flame</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3D Flip Wish Cards for the Year</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>24 Hour Delivery on WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-[#E8DDCF] flex flex-col gap-3">
            <button
              onClick={() => onCustomize(template)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer border border-rose-300/30"
            >
              <span>Personalise &amp; Order This Template — ৳{template.discountPrice}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-[#87746D]">
              No technical knowledge needed · We handle photos, timings, and WhatsApp link setup
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
