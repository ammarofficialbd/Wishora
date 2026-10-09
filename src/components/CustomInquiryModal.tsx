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
              অনুরোধ সফলভাবে পাঠানো হয়েছে! ✨
            </h3>
            <p className="text-xs sm:text-sm text-[#5A454F] leading-relaxed">
              আমাদের ডিজাইন টিম আগামী ৩ ঘণ্টার মধ্যে <strong>{contact}</strong> নম্বরে হোয়াটসঅ্যাপে যোগাযোগ করবে।
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] text-white text-xs sm:text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#8C5D2E] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#A81B5B]" />
              <span>কাস্টম ডিজাইন সার্ভিস</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#2B1724] mb-1.5 leading-tight">
              বিশেষ কোনো ভাবনা বা আইডিয়া আছে আপনার?
            </h3>
            <p className="text-xs text-[#5A454F] mb-5 leading-relaxed">
              রাজকীয় বিবাহ থেকে শুরু করে ডেস্টিনেশন সেলিব্রেশন—যেকোনো উৎসবের জন্য আমাদের টিম তৈরি করবে আপনার মনের মতো ডিজিটাল কার্ড।
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#2B1724] uppercase mb-1">আয়োজনের ধরন</label>
                <select
                  value={occasionType}
                  onChange={(e) => setOccasionType(e.target.value)}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white cursor-pointer"
                >
                  <option value="Custom Wedding Theme">কাস্টম বিবাহ থিম</option>
                  <option value="Holy Nikah & Walima">পবিত্র নিকাহ ও ওয়ালিমা</option>
                  <option value="Gaye Holud / Mehendi Night">গায়ে হলুদ ও মেহেন্দি রাত</option>
                  <option value="Birthday Gala & Surprise">জন্মদিন উৎসব ও সারপ্রাইজ</option>
                  <option value="Anniversary & Silver Jubilee">বিবাহবার্ষিকী ও জুবিলি</option>
                  <option value="Other Celebration">অন্যান্য বিশেষ উৎসব</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#2B1724] uppercase mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: তানভীর / অনন্যা"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#2B1724] uppercase mb-1">হোয়াটসঅ্যাপ নম্বর বা ইমেইল *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: 01712345678"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-[#E8DDCF] bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#2B1724] uppercase mb-1">আপনার ভাবনা বা বিস্তারিত বলুন</label>
                <textarea
                  rows={3}
                  placeholder="পছন্দের কালার থিম, মিউজিক বা বিশেষ কোনো ফিচারের কথা আমাদের জানান..."
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
                <span>অনুরোধটি পাঠান</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
