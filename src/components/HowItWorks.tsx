import React from 'react';
import { Check, Edit3, MessageCircle } from 'lucide-react';

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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181210] leading-[1.18] mb-4 font-serif-luxury">
          Your Dream Invite, Made For You in<br />
          Minutes
        </h2>
        <p className="text-[#4D3F38] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
          Pick a design, tell us your details, and we craft your personalized invite. Beautiful, effortless and entirely yours.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {/* Step 1: Choose a template */}
        <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-[#EAE3D6] shadow-sm hover:shadow-md hover:border-amber-400/50 transition-all">
          {/* Visual Canvas */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#F7F2EB] to-[#EFE7DC] p-3 flex items-center justify-center mb-6 relative overflow-hidden border border-[#EAE3D6]/70">
            {/* Mini phone frame browsing templates */}
            <div className="w-32 h-44 bg-white rounded-2xl shadow-lg border-2 border-stone-300 p-2 flex flex-col justify-between transform -rotate-3">
              <div className="w-8 h-1.5 bg-stone-300 rounded-full mx-auto" />
              <div className="p-1.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <p className="text-[7px] text-amber-800 font-cinzel">ROYAL VIVAH</p>
                <p className="text-[9px] font-serif-luxury font-bold text-neutral-900 mt-0.5">Kabir &amp; Rhea</p>
              </div>
              <div className="text-[7px] text-center bg-gradient-to-r from-[#FF1375] to-[#BE185D] text-white rounded-md py-0.5 font-semibold">
                Preview
              </div>
            </div>

            {/* Checkmark Badge */}
            <div className="absolute bottom-3 right-5 w-7 h-7 rounded-full bg-gradient-to-r from-[#FF1375] to-[#BE185D] text-white border border-rose-300 flex items-center justify-center shadow-md">
              <Check className="w-4 h-4" />
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
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF1375] via-[#E11D48] to-[#BE185D] hover:brightness-105 text-white text-sm font-semibold active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Choose a template
        </button>
      </div>
    </section>
  );
};
