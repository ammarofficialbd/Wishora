import React, { useState } from 'react';
import { Play, ArrowRight, CheckCircle2, Volume2, MapPin, Calendar, Users, ExternalLink, Sparkles, Heart } from 'lucide-react';
import { audioController } from '../utils/audio';

interface RoyalWeddingBannerProps {
  onOpenDemo: () => void;
  onBuyNow: () => void;
}

export const RoyalWeddingBanner: React.FC<RoyalWeddingBannerProps> = ({ onOpenDemo, onBuyNow }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(2);
  const [showRsvpSubmitted, setShowRsvpSubmitted] = useState(false);
  const [activeCeremony, setActiveCeremony] = useState<'haldi' | 'sangeet' | 'wedding'>('wedding');

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playing = audioController.toggleMusic('romantic');
    setIsPlayingMusic(playing);
  };

  const handleQuickRsvp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRsvpSubmitted(true);
    setTimeout(() => setShowRsvpSubmitted(false), 3500);
  };

  return (
    <section id="royal-wedding-section" className="pt-6 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#5A1227] via-[#480E1E] to-[#360915] text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-amber-500/30">
        
        {/* Subtle royal damask background overlay */}
        <div 
          className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#fde68a 1.2px, transparent 1.2px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient warm gold glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-semibold w-fit mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>The Royal Wedding Edit · Haldi, Mehendi, Sangeet &amp; Reception</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.18] mb-5 font-serif-luxury">
              Your entire wedding celebration<br />
              <span className="font-serif-accent italic font-normal text-amber-300">
                on one interactive WhatsApp link.
              </span>
            </h2>

            {/* Description */}
            <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-normal">
              Haldi, Mehendi, Sangeet, Muhurat and Grand Reception — every ceremony in the exact sequence it happens. Guests get <strong className="text-amber-200 font-semibold">1-tap Google Maps directions</strong>, <strong className="text-amber-200 font-semibold">RSVP with guest count</strong>, listen to celebratory Shehnai &amp; romantic music, and add dates to calendar. Beautifully customized with your names and photos, ready in 24 hours.
            </p>

            {/* Pricing Box */}
            <div className="flex flex-wrap items-baseline gap-3 mb-8">
              <span className="text-3xl sm:text-4xl font-bold text-amber-300 font-display">
                ₹499
              </span>
              <span className="text-rose-200 text-xs sm:text-sm max-w-xs">
                customized for your couple story &amp; all functions – <span className="text-white font-medium">ready in 24 hours</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenDemo}
                id="wedding-demo-btn"
                className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-semibold flex items-center gap-2 active:scale-95 transition-all cursor-pointer shadow-sm backdrop-blur-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
                <span>Demo Wedding Suite</span>
              </button>

              <button
                onClick={onBuyNow}
                id="wedding-buy-btn"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-stone-950 text-sm font-bold flex items-center gap-2 active:scale-95 transition-all shadow-gold cursor-pointer"
              >
                <span>Customize Wedding Invite — ₹499</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom 4 Feature Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/15">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">All Ceremonies</h4>
                <p className="text-xs text-rose-200">Mehendi to Reception</p>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">Instant RSVP</h4>
                <p className="text-xs text-rose-200">know who is coming</p>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">Maps &amp; Audio</h4>
                <p className="text-xs text-rose-200">1-tap venue &amp; music</p>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">24 hrs Delivery</h4>
                <p className="text-xs text-rose-200">on your WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={onOpenDemo}
              className="group relative cursor-pointer w-full max-w-[300px] sm:max-w-[330px] rounded-[38px] p-3 bg-gradient-to-b from-[#4A1525] to-[#2E0B16] border-[5px] border-amber-600/40 shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-[#230811] mx-auto rounded-full mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-700/50 mr-2" />
                <div className="w-10 h-1 bg-amber-700/40 rounded-full" />
              </div>

              {/* Top helper pill inside screen */}
              <div className="text-center mb-1">
                <span className="inline-block text-[10px] bg-amber-400/25 text-amber-200 px-3 py-0.5 rounded-full border border-amber-400/40 font-semibold">
                  Tap to open live wedding invite
                </span>
              </div>

              {/* Smartphone Screen Canvas */}
              <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f8f3ea] to-[#f4ebe0] text-stone-900 p-4 border border-amber-800/20 shadow-inner min-h-[480px] flex flex-col justify-between">
                
                {/* Traditional Wedding Header */}
                <div className="relative text-center pt-2 pb-2">
                  
                  {/* Auspicious Wedding Heading */}
                  <div className="text-center px-1">
                    <p className="text-[9px] font-cinzel font-bold tracking-widest text-amber-900 uppercase">
                      || शुभ विवाह ||
                    </p>
                    <p className="text-[8px] tracking-wider uppercase text-stone-500 font-semibold mt-0.5">
                      TOGETHER WITH OUR FAMILIES
                    </p>
                  </div>

                  {/* Golden Monogram Crest */}
                  <div className="my-2.5 relative flex justify-center items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 via-white to-amber-200 border-2 border-amber-400/70 flex flex-col items-center justify-center shadow-md p-2 relative">
                      <Heart className="w-4 h-4 text-rose-700 fill-rose-700 mb-0.5" />
                      <div className="text-xs font-serif-luxury font-bold text-amber-950">K &amp; A</div>
                      <div className="text-[7px] text-amber-800 tracking-widest uppercase">2026</div>
                    </div>
                    {/* Floral Ornaments */}
                    <div className="absolute -bottom-1 -right-1 text-base">🌸</div>
                    <div className="absolute -bottom-1 -left-1 text-base">🌿</div>
                  </div>

                  <h3 className="text-2xl font-serif-luxury font-bold text-amber-950 leading-tight">
                    Kabir &amp; Ananya
                  </h3>
                  <p className="text-[11px] text-amber-900/90 font-serif-accent italic font-semibold mt-0.5">
                    24 November 2026
                  </p>
                  <p className="text-[10px] text-stone-600 flex items-center justify-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-800" />
                    <span>Umaid Bhawan Palace, Jodhpur</span>
                  </p>
                </div>

                {/* Ceremony Selector Pills */}
                <div className="flex gap-1 justify-center my-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCeremony('haldi');
                    }}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-semibold transition-all ${
                      activeCeremony === 'haldi' 
                        ? 'bg-amber-600 text-white shadow-xs' 
                        : 'bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    Haldi (10 AM)
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCeremony('sangeet');
                    }}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-semibold transition-all ${
                      activeCeremony === 'sangeet' 
                        ? 'bg-amber-600 text-white shadow-xs' 
                        : 'bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    Sangeet (7 PM)
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCeremony('wedding');
                    }}
                    className={`px-2.5 py-1 rounded-full text-[9px] font-semibold transition-all ${
                      activeCeremony === 'wedding' 
                        ? 'bg-amber-600 text-white shadow-xs' 
                        : 'bg-stone-200/80 text-stone-700'
                    }`}
                  >
                    Pheras (8 PM)
                  </button>
                </div>

                {/* Interactive Phone Screen Widgets */}
                <div className="space-y-2 text-xs">
                  {/* Wedding Music Player */}
                  <div 
                    onClick={toggleAudio}
                    className="p-2 rounded-xl bg-amber-950 text-amber-100 flex items-center justify-between border border-amber-800/60 hover:bg-neutral-900 transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${isPlayingMusic ? 'bg-amber-400 text-black animate-spin' : 'bg-amber-800 text-amber-200'} flex items-center justify-center text-[10px]`}>
                        {isPlayingMusic ? '♫' : '▶'}
                      </div>
                      <span className="text-[10px] font-medium truncate">Shehnai &amp; Sitar: Mangal Shubh Vivah</span>
                    </div>
                    <span className="text-[9px] text-amber-300 underline font-semibold shrink-0">
                      {isPlayingMusic ? 'Playing' : 'Play'}
                    </span>
                  </div>

                  {/* Micro RSVP Widget */}
                  <div className="p-2.5 rounded-xl bg-white/95 border border-stone-200 shadow-xs">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-bold text-stone-800 flex items-center gap-1">
                        <Users className="w-3 h-3 text-rose-700" /> Will you attend our wedding?
                      </span>
                      {showRsvpSubmitted ? (
                        <span className="text-[9px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Confirmed!
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <select 
                        value={rsvpCount}
                        onChange={(e) => setRsvpCount(Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-stone-50 border border-stone-300 rounded-lg text-[10px] py-1 px-1.5 text-stone-800"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={4}>4 Guests (Family)</option>
                        <option value={6}>6+ Guests</option>
                      </select>
                      <button
                        onClick={handleQuickRsvp}
                        className="flex-1 py-1 rounded-lg bg-rose-800 hover:bg-rose-900 text-white text-[10px] font-semibold transition-colors"
                      >
                        RSVP Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom link indicator */}
                <div className="pt-2 text-center border-t border-amber-800/10">
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 group-hover:text-amber-700">
                    <span>Open full interactive wedding invite</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
