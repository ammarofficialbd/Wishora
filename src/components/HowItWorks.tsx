import React from 'react';
import { Check, Edit3, MessageCircle, Sparkles, Heart } from 'lucide-react';
import romanticProposalImg from '../assets/images/romantic_proposal_invite_1791303320088.jpg';

interface HowItWorksProps {
  onChooseTemplate: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onChooseTemplate }) => {
  return (
    <section id="how-it-works-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D6]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-[#8C5D2E] text-[11px] font-bold tracking-widest uppercase mb-3 font-display">
          <span>EFFORTLESS PROCESS</span>
        </div>
        <h2 className="text-[24px] sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B1724] leading-[34.4px] sm:leading-[1.15] text-center mb-4 font-serif-luxury">
          Your Dream Invite,<br className="hidden sm:inline" /> Made For You in Minutes
        </h2>
        <p className="text-[#4D3F38] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
          Pick a design, tell us your details, and we craft your personalized invite. Beautiful, effortless and entirely yours.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {/* Step 1: Choose a template (Proposal Theme) */}
        <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-[#EAE3D6] shadow-sm hover:shadow-md hover:border-rose-400/50 transition-all">
          {/* Visual Canvas */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#FAF0F4] to-[#F5E2EC] p-2.5 sm:p-3 flex items-center justify-center mb-6 relative overflow-hidden border border-[#EAD5E2] group">
            {/* Real Proposal Template Image Card Preview */}
            <div className="relative w-[78%] sm:w-[82%] max-w-[240px] rounded-2xl bg-white shadow-xl border-2 border-rose-200/90 overflow-hidden transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
              {/* Proposal Image Banner */}
              <div className="relative h-28 sm:h-36 w-full overflow-hidden bg-stone-900">
                <img 
                  src={romanticProposalImg} 
                  alt="Romantic Proposal Template Preview" 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-[8px] sm:text-[9px] text-rose-200 font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm border border-rose-300/30">
                  <Heart className="w-2.5 h-2.5 text-[#ff3d6e] fill-[#ff3d6e]" />
                  <span>Romantic Proposal</span>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-white/95 text-[9px] sm:text-[10px] text-[#7A0C38] font-bold shadow-xs">
                  ৳699
                </div>
              </div>

              {/* Template Card Info */}
              <div className="p-2.5 sm:p-3 bg-white text-left">
                <p className="text-[11px] sm:text-xs font-serif-luxury font-bold text-[#2B1724] leading-tight truncate">
                  "Will You Marry Me?" 💍
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[9px] sm:text-[10px] text-[#7A685D]">Proposal Story</span>
                  <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md bg-gradient-to-r from-[#7A0C38] to-[#C7246D] text-white font-semibold shadow-2xs">
                    Selected ✓
                  </span>
                </div>
              </div>
            </div>

            {/* Checkmark Badge */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 rounded-full bg-gradient-to-r from-[#7A0C38] to-[#C7246D] text-white border-2 border-white flex items-center justify-center shadow-lg z-10">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          <h3 className="text-base font-bold text-[#181210] mb-1.5 font-display flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-amber-500/10 text-[#8C5D2E] text-xs flex items-center justify-center font-bold">1</span>
            <span>Choose a template</span>
          </h3>
          <p className="text-xs text-[#5A4B43] max-w-xs leading-relaxed">
            Pick an enchanting design that fits the spirit of your celebration.
          </p>
        </div>

        {/* Step 2: Make it yours */}
        <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-[#EAE3D6] shadow-sm hover:shadow-md hover:border-amber-400/50 transition-all">
          {/* Visual Canvas */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#FCEBED] to-[#F7DEDF] p-3 flex items-center justify-center mb-6 relative overflow-hidden border border-rose-100">
            {/* Mini Form Mockup */}
            <div className="w-44 bg-white rounded-xl shadow-lg border border-stone-200 p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                <span className="text-[9px] font-bold text-neutral-800 flex items-center gap-1">
                  <Edit3 className="w-2.5 h-2.5 text-rose-500" /> Edit Details
                </span>
                <span className="text-[8px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-semibold">Live</span>
              </div>
              <div className="space-y-1">
                <div className="text-left">
                  <span className="text-[7px] text-stone-500 font-semibold">Groom Name</span>
                  <div className="text-[8px] bg-stone-50 border border-stone-200 rounded px-1.5 py-0.5 font-medium text-stone-800">
                    Kabir
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-[7px] text-stone-500 font-semibold">Bride Name</span>
                  <div className="text-[8px] bg-stone-50 border border-stone-200 rounded px-1.5 py-0.5 font-medium text-stone-800">
                    Sara
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-base font-bold text-[#181210] mb-1.5 font-display flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-amber-500/10 text-[#8C5D2E] text-xs flex items-center justify-center font-bold">2</span>
            <span>Make it yours</span>
          </h3>
          <p className="text-xs text-[#5A4B43] max-w-xs leading-relaxed">
            Tell us your names, dates and personal details, and we add the magic.
          </p>
        </div>

        {/* Step 3: Delivered on WhatsApp */}
        <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-[#EAE3D6] shadow-sm hover:shadow-md hover:border-amber-400/50 transition-all">
          {/* Visual Canvas */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#EBF5EE] to-[#D7EDDE] p-3 flex items-center justify-center mb-6 relative overflow-hidden border border-emerald-100">
            {/* WhatsApp Chat bubble mockup */}
            <div className="w-48 bg-white rounded-xl shadow-lg border border-stone-200 p-2.5 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 border-b border-stone-100 pb-1">
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white">
                  <MessageCircle className="w-2.5 h-2.5 fill-white" />
                </div>
                <span className="text-[8px] font-bold text-emerald-800">Is your invite ready?</span>
              </div>
              
              <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-200/80 text-left">
                <p className="text-[7px] text-emerald-700 font-semibold mb-0.5">Yes! Sharing it now 💚</p>
                <div className="bg-white rounded p-1 text-[8px] font-serif-luxury font-bold text-amber-950 text-center shadow-xs">
                  Aarav weds Ananya ✨
                </div>
                <p className="text-[6px] text-stone-400 mt-1 text-right">09:41 AM · Delivered ✓✓</p>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-neutral-900 mb-1.5 font-display">
            3 - Delivered on WhatsApp
          </h3>
          <p className="text-xs text-stone-500 max-w-xs">
            Your personalised invite lands on WhatsApp and email.
          </p>
        </div>
      </div>

      {/* Center CTA */}
      <div className="flex justify-center">
        <button
          onClick={onChooseTemplate}
          id="how-it-works-choose-template-btn"
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-sm font-semibold active:scale-95 transition-all shadow-[0_12px_28px_-6px_rgba(122,12,56,0.35)] cursor-pointer border border-rose-300/30"
        >
          Choose a template
        </button>
      </div>
    </section>
  );
};
