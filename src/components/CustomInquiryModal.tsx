import React, { useState } from 'react';
import { X, Sparkles, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomInquiryModalProps {
  onClose: () => void;
}

export const CustomInquiryModal: React.FC<CustomInquiryModalProps> = ({ onClose }) => {
  const [occasionType, setOccasionType] = useState('Custom Wedding Theme');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60
      });
    } catch {}
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2B1724]/75 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E8DDCF] p-5 sm:p-8 max-h-[92vh] overflow-y-auto overscroll-contain">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-[#EFE7DC] text-[#7A685D] hover:text-[#2B1724] transition-colors cursor-pointer active:scale-90"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#2B1724]">
              Inquiry Sent! ✨
            </h3>
            <p className="text-xs sm:text-sm text-[#5A454F] leading-relaxed">
              Our bespoke design director will connect with you on WhatsApp at <strong>{contact}</strong> within 3 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] text-white text-xs sm:text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#8C5D2E] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#A81B5B]" />
              <span>Bespoke Design Service</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#2B1724] mb-1.5 leading-tight">
              Have something unique in mind?
            </h3>
            <p className="text-xs text-[#5A454F] mb-5 leading-relaxed">
              From royal floral themes to destination celebrations, our design team crafts customized digital invites for any event.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#2B1724] uppercase mb-1">Occasion Type</label>
                <select
                  value={occasionType}
                  onChange={(e) => setOccasionType(e.target.value)}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white cursor-pointer"
                >
                  <option value="Custom Wedding Theme">Custom Theme Wedding</option>
                  <option value="Holy Nikah & Walima">Holy Nikah &amp; Walima</option>
                  <option value="Gaye Holud / Mehendi Night">Gaye Holud / Mehendi Night</option>
                  <option value="Birthday Gala & Surprise">Birthday Gala &amp; Surprise</option>
                  <option value="Anniversary & Silver Jubilee">Anniversary &amp; Silver Jubilee</option>
                  <option value="Other Celebration">Other Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#2B1724] uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika / Tanvir"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#2B1724] uppercase mb-1">WhatsApp Number or Email *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 01712345678"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#2B1724] uppercase mb-1">Describe your vision</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the theme, colors, background music, or special requests..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Custom Request</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
