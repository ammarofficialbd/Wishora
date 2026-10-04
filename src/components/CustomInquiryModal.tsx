import React, { useState } from 'react';
import { X, Sparkles, Check, MessageSquare, Send } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B1724]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DDCF] p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EFE7DC] text-[#7A685D] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif-luxury font-bold text-[#2B1724]">
              Inquiry Sent! ✨
            </h3>
            <p className="text-xs text-[#5A454F]">
              Our bespoke design director will connect with you on WhatsApp at <strong>{contact}</strong> within 3 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] text-white text-xs font-semibold hover:brightness-110 transition-all shadow-xs cursor-pointer"
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
            <h3 className="text-2xl font-serif-luxury font-bold text-[#2B1724] mb-2">
              Have something unique in mind?
            </h3>
            <p className="text-xs text-[#5A454F] mb-6">
              From royal floral themes to destination beach celebrations, our design studio crafts customized digital invites for any event.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-bold text-[#2B1724] uppercase mb-1">Occasion Type</label>
                <select
                  value={occasionType}
                  onChange={(e) => setOccasionType(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                >
                  <option value="Custom Wedding Theme">Custom Theme Wedding</option>
                  <option value="Destination Wedding Passport">Destination Wedding Passport</option>
                  <option value="Housewarming / Griha Pravesh">Griha Pravesh / Housewarming</option>
                  <option value="Anniversary & Silver Jubilee">Anniversary &amp; Silver Jubilee</option>
                  <option value="Corporate Gala / Inauguration">Corporate Gala / Inauguration</option>
                  <option value="Other Celebration">Other Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2B1724] uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2B1724] uppercase mb-1">WhatsApp Number or Email</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 / email@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2B1724] uppercase mb-1">Describe your vision</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the theme, colors, background music, or reference links..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
