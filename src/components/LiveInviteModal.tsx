import React, { useState, useEffect } from 'react';
import { 
  X, Volume2, VolumeX, MapPin, Calendar, Clock, Share2, 
  Heart, Sparkles, Check, Send, ChevronRight, Music, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TemplateItem, WeddingEvent } from '../types';
import { audioController } from '../utils/audio';

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

  const [isOpenEnvelope, setIsOpenEnvelope] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'invite' | 'events' | 'rsvp' | 'gallery'>('invite');
  
  // RSVP form state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpCount, setRsvpCount] = useState(2);
  const [rsvpAttending, setRsvpAttending] = useState<'yes' | 'no'>('yes');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  
  // Simulated map popup
  const [selectedMapEvent, setSelectedMapEvent] = useState<WeddingEvent | null>(null);

  // Auto-trigger wax seal audio effect when opening
  const handleOpenEnvelope = () => {
    audioController.playWaxSealPop();
    setIsOpenEnvelope(true);
    // Start ambient music
    audioController.startCeremonialMusic('flute');
    setIsPlayingAudio(true);
  };

  const toggleMusic = () => {
    const playing = audioController.toggleMusic('flute');
    setIsPlayingAudio(playing);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setRsvpSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleShare = () => {
    const text = `You are cordially invited to celebrate the ${template.name} of ${template.groomName} & ${template.brideName}! View the live invitation:`;
    if (navigator.share) {
      navigator.share({
        title: `${template.groomName} & ${template.brideName}'s Wedding`,
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert('Invitation link copied to clipboard!');
    }
  };

  // Clean up audio on close
  useEffect(() => {
    return () => {
      audioController.stopMusic();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#2B1724]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[860px] bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#E7D7C8]">
        
        {/* Top Close Button for Mobile & Desktop */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-white text-[#2B1724] hover:text-[#FF1375] transition-colors cursor-pointer shadow-md border border-[#E5DACB]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Interactive Smartphone Simulator */}
        <div className="w-full md:w-1/2 h-full bg-gradient-to-b from-[#F3EBE1] to-[#EBE0D3] p-4 sm:p-6 flex flex-col items-center justify-center overflow-y-auto border-r border-[#E2D4C3]">
          <div className="relative w-full max-w-[340px] h-[580px] sm:h-[640px] bg-[#4A1525] rounded-[42px] p-3 shadow-2xl border-[5px] border-[#662035] flex flex-col justify-between">
            
            {/* Phone Notch */}
            <div className="w-28 h-4 bg-[#320C18] mx-auto rounded-full mb-1 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-600/60 mr-2" />
              <div className="w-12 h-1 bg-amber-600/40 rounded-full" />
            </div>

            {/* Phone Screen Body */}
            <div 
              className="relative flex-1 rounded-[30px] overflow-hidden overflow-y-auto no-scrollbar text-stone-900 flex flex-col justify-between shadow-inner"
              style={{
                backgroundColor: template.secondaryColor || '#faf6ee',
              }}
            >
              {/* If Envelope is not yet opened: Sealed Wax Envelope View */}
              {!isOpenEnvelope ? (
                <div 
                  onClick={handleOpenEnvelope}
                  className="h-full flex flex-col items-center justify-between p-6 text-center cursor-pointer select-none transition-transform hover:scale-[1.01]"
                  style={{
                    backgroundColor: template.secondaryColor || '#f9f3e6',
                    backgroundImage: `radial-gradient(${template.accentColor}15 1px, transparent 1px)`,
                    backgroundSize: '16px 16px'
                  }}
                >
                  <div className="pt-6">
                    <p className="text-[10px] tracking-widest uppercase font-cinzel text-stone-600">
                      Private Invitation
                    </p>
                    <p className="text-xs font-serif-accent italic text-stone-500 mt-1">
                      For your presence &amp; blessings
                    </p>
                  </div>

                  {/* 3D Interactive Wax Seal */}
                  <div className="flex flex-col items-center my-auto">
                    <div 
                      className="w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-amber-200 animate-pulse"
                      style={{
                        background: `linear-gradient(135deg, ${template.accentColor}, #d4a34b, #935817)`,
                        boxShadow: `0 10px 25px -5px ${template.accentColor}80`
                      }}
                    >
                      <span className="text-white text-xl font-serif-luxury font-bold drop-shadow-sm">
                        {template.groomName.charAt(0)}&amp;{template.brideName.charAt(0)}
                      </span>
                    </div>

                    <div className="mt-4 px-4 py-1.5 rounded-full bg-[#360915]/90 text-amber-200 text-xs font-semibold shadow-md border border-amber-400/30">
                      ✨ Tap wax seal to open invite
                    </div>
                  </div>

                  <div className="pb-4">
                    <h3 className="text-lg font-serif-luxury font-bold text-neutral-800">
                      {template.groomName} &amp; {template.brideName}
                    </h3>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      {template.eventDate}
                    </p>
                  </div>
                </div>
              ) : (
                /* Unfolded Live Invite Experience */
                <div className="p-4 sm:p-5 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-500">
                  
                  {/* Floating Top Audio & Share Controls */}
                  <div className="flex items-center justify-between sticky top-0 z-20 bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-xs border border-stone-200">
                    <button
                      onClick={toggleMusic}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-[10px] font-semibold"
                    >
                      {isPlayingAudio ? (
                        <>
                          <Volume2 className="w-3 h-3 text-emerald-600 animate-pulse" />
                          <span>Music On</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-3 h-3 text-stone-500" />
                          <span>Play Music</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleShare}
                      className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px]"
                      title="Share link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Header Monogram / Shloka */}
                  <div className="text-center pt-2">
                    {template.shlokaOrMantra && (
                      <div className="mb-2 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-stone-800 text-[9px] font-medium leading-relaxed font-cinzel">
                        {template.shlokaOrMantra}
                      </div>
                    )}
                    <p className="text-[9px] uppercase tracking-widest text-stone-500 font-cinzel">
                      {template.categoryLabel}
                    </p>
                    <h2 className="text-2xl font-serif-luxury font-bold text-neutral-900 mt-1">
                      {template.groomName}
                    </h2>
                    <p className="text-xs font-script text-amber-800 my-0.5 text-base">
                      weds
                    </p>
                    <h2 className="text-2xl font-serif-luxury font-bold text-neutral-900">
                      {template.brideName}
                    </h2>
                    <p className="text-[10px] font-semibold text-stone-600 mt-1">
                      {template.eventDate}
                    </p>
                    <p className="text-[9px] text-stone-500 flex items-center justify-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-rose-500" />
                      {template.location}
                    </p>
                  </div>

                  {/* Mini Countdown Display */}
                  <div className="grid grid-cols-4 gap-1 text-center bg-white/90 p-2 rounded-2xl border border-stone-200 shadow-xs">
                    <div className="p-1">
                      <span className="text-xs font-bold text-neutral-900">48</span>
                      <p className="text-[8px] text-stone-500">Days</p>
                    </div>
                    <div className="p-1 border-l border-stone-100">
                      <span className="text-xs font-bold text-neutral-900">14</span>
                      <p className="text-[8px] text-stone-500">Hours</p>
                    </div>
                    <div className="p-1 border-l border-stone-100">
                      <span className="text-xs font-bold text-neutral-900">32</span>
                      <p className="text-[8px] text-stone-500">Mins</p>
                    </div>
                    <div className="p-1 border-l border-stone-100">
                      <span className="text-xs font-bold text-neutral-900">19</span>
                      <p className="text-[8px] text-stone-500">Secs</p>
                    </div>
                  </div>

                  {/* Navigation Pills inside simulator */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-stone-200/70 rounded-xl text-[10px] font-semibold">
                    <button
                      onClick={() => setActiveTab('invite')}
                      className={`py-1 rounded-lg transition-colors ${activeTab === 'invite' ? 'bg-white text-black shadow-xs' : 'text-stone-600'}`}
                    >
                      Story
                    </button>
                    <button
                      onClick={() => setActiveTab('events')}
                      className={`py-1 rounded-lg transition-colors ${activeTab === 'events' ? 'bg-white text-black shadow-xs' : 'text-stone-600'}`}
                    >
                      Events
                    </button>
                    <button
                      onClick={() => setActiveTab('rsvp')}
                      className={`py-1 rounded-lg transition-colors ${activeTab === 'rsvp' ? 'bg-white text-black shadow-xs' : 'text-stone-600'}`}
                    >
                      RSVP
                    </button>
                  </div>

                  {/* Tab 1: Story / Welcome */}
                  {activeTab === 'invite' && (
                    <div className="space-y-3">
                      <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-200 relative shadow-xs">
                        <img 
                          src={template.coverImage} 
                          alt="Couple shoot" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                          <p className="text-white text-xs font-serif-accent italic">
                            "Two souls, one celebration of love."
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] text-stone-600 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-stone-200">
                        {template.description}
                      </p>
                    </div>
                  )}

                  {/* Tab 2: Events Itinerary */}
                  {activeTab === 'events' && (
                    <div className="space-y-2">
                      {template.events.map((ev) => (
                        <div key={ev.id} className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-xs text-left">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-xs font-bold text-neutral-900 font-serif-luxury">{ev.name}</h4>
                            <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                              {ev.time}
                            </span>
                          </div>
                          <p className="text-[9px] text-stone-500 flex items-center gap-1 mb-1">
                            <Calendar className="w-2.5 h-2.5" /> {ev.date}
                          </p>
                          <p className="text-[9px] text-stone-700 font-medium">{ev.venue}</p>
                          {ev.dressCode && (
                            <p className="text-[8px] text-stone-500 italic mt-0.5">Dress Code: {ev.dressCode}</p>
                          )}
                          <button
                            onClick={() => setSelectedMapEvent(ev)}
                            className="mt-1.5 w-full py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[9px] font-semibold flex items-center justify-center gap-1"
                          >
                            <MapPin className="w-2.5 h-2.5 text-rose-500" />
                            <span>View on Google Maps</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 3: Interactive RSVP */}
                  {activeTab === 'rsvp' && (
                    <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs">
                      {rsvpSubmitted ? (
                        <div className="text-center py-4 space-y-2">
                          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-5 h-5" />
                          </div>
                          <h4 className="text-xs font-bold text-neutral-900">Thank You, {rsvpName}!</h4>
                          <p className="text-[9px] text-stone-500">Your RSVP of {rsvpCount} guests has been recorded for the couple.</p>
                          <button
                            onClick={() => setRsvpSubmitted(false)}
                            className="text-[9px] text-amber-800 underline font-semibold"
                          >
                            Edit response
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleRsvpSubmit} className="space-y-2 text-left">
                          <div>
                            <label className="text-[8px] font-bold text-stone-600 uppercase">Your Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ramesh & Family"
                              value={rsvpName}
                              onChange={(e) => setRsvpName(e.target.value)}
                              className="w-full text-xs p-1.5 rounded-lg border border-stone-200 focus:outline-amber-600 bg-stone-50"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[8px] font-bold text-stone-600 uppercase">Guests Attending</label>
                              <select
                                value={rsvpCount}
                                onChange={(e) => setRsvpCount(Number(e.target.value))}
                                className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50"
                              >
                                <option value={1}>1 Guest</option>
                                <option value={2}>2 Guests</option>
                                <option value={3}>3 Guests</option>
                                <option value={4}>4 Guests</option>
                                <option value={5}>5+ Guests</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[8px] font-bold text-stone-600 uppercase">Attendance</label>
                              <select
                                value={rsvpAttending}
                                onChange={(e) => setRsvpAttending(e.target.value as 'yes' | 'no')}
                                className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50"
                              >
                                <option value="yes">Will Attend 🎉</option>
                                <option value="no">Cannot Attend</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-[8px] font-bold text-stone-600 uppercase">Wishes for the Couple</label>
                            <textarea
                              rows={2}
                              placeholder="Warm congratulations..."
                              value={rsvpMessage}
                              onChange={(e) => setRsvpMessage(e.target.value)}
                              className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#FF1375] to-[#BE185D] text-white text-xs font-semibold hover:brightness-105 transition-all flex items-center justify-center gap-1 shadow-xs"
                          >
                            <Send className="w-3 h-3" />
                            <span>Confirm RSVP</span>
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Home indicator */}
            <div className="w-16 h-1 bg-amber-600/40 rounded-full mx-auto mt-1" />
          </div>
        </div>

        {/* Right Side: Template Details, Features & Order CTA */}
        <div className="w-full md:w-1/2 h-full bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-[#EFE7DC] text-[#8C5D2E] border border-[#E2D5C3] px-3 py-1 rounded-full font-semibold">
                {template.categoryLabel}
              </span>
              {template.tag && (
                <span className="text-xs bg-rose-100 text-[#831843] border border-rose-200 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#FF1375]" />
                  {template.tag}
                </span>
              )}
            </div>

            <h2 className="text-3xl font-serif-luxury font-bold text-[#2B1724] mb-2">
              {template.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#831843] font-display">
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
                  <span>Interactive Wax Seal Pop</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Music className="w-3.5 h-3.5 text-[#FF1375]" />
                  <span>{template.musicTitle.slice(0, 20)}...</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Live RSVP Collection Form</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Google Maps 1-Tap Directions</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCC] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2 Free Revision Rounds</span>
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
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF1375] via-[#E11D48] to-[#BE185D] hover:brightness-105 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
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

      {/* Simulated Google Maps Modal if user clicked an event venue */}
      {selectedMapEvent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#2B1724]/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#E5DACB]">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2 text-[#2B1724] font-bold">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>{selectedMapEvent.venue}</span>
              </div>
              <button 
                onClick={() => setSelectedMapEvent(null)}
                className="p-1 rounded-full hover:bg-[#EFE7DC] text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#5A454F] mb-4">{selectedMapEvent.address}</p>

            {/* Map Placeholder Graphic */}
            <div className="w-full h-44 rounded-xl bg-white border border-[#E5DACB] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF1375] to-[#BE185D] text-white flex items-center justify-center shadow-lg animate-bounce">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[#2B1724] mt-2">Opening in Google Maps...</p>
              <p className="text-[10px] text-[#7A685D]">1-Tap turn-by-turn navigation for wedding guests</p>
            </div>

            <button
              onClick={() => setSelectedMapEvent(null)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF1375] to-[#BE185D] text-white text-xs font-semibold"
            >
              Close Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
