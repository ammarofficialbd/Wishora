import React, { useState } from 'react';
import { X, Sparkles, Check, Send, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TemplateItem, OrderFormData } from '../types';
import { TEMPLATES } from '../data/templates';

interface CustomizeOrderModalProps {
  initialTemplate?: TemplateItem | null;
  onClose: () => void;
}

export const CustomizeOrderModal: React.FC<CustomizeOrderModalProps> = ({
  initialTemplate,
  onClose
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    initialTemplate?.id || 'bansuri'
  );

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const [formData, setFormData] = useState<OrderFormData>({
    templateId: selectedTemplate.id,
    groomName: initialTemplate?.groomName || '',
    brideName: initialTemplate?.brideName || '',
    groomParents: '',
    brideParents: '',
    weddingDate: initialTemplate?.eventDate || '',
    cityVenue: initialTemplate?.location || '',
    language: 'English & Hindi',
    whatsappNumber: '',
    email: '',
    notes: '',
    includeRsvp: true,
    includeMusic: true,
    includeMap: true
  });

  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-[#2B1724]/75 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E8DDCF] max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E8DDCF] flex items-center justify-between bg-white/85 backdrop-blur-sm sticky top-0 z-20 shrink-0">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-[#2B1724]">
              আপনার ডিজিটাল নিমন্ত্রণটি সাজান
            </h3>
            <p className="text-[11px] sm:text-xs text-[#7A685D]">
              ২৪ ঘণ্টার মধ্যে প্রস্তুত · সরাসরি হোয়াটসঅ্যাপ ও ইমেইলে ডেলিভারি
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFE7DC] text-[#7A685D] hover:text-[#2B1724] transition-colors cursor-pointer active:scale-90"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 overscroll-contain">
          {orderSubmitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-7 sm:w-8 h-7 sm:h-8 stroke-[3]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#2B1724]">
                অর্ডার সফলভাবে গ্রহণ করা হয়েছে! ✨
              </h3>
              <p className="text-xs sm:text-sm text-[#5A454F] max-w-md mx-auto leading-relaxed">
                ধন্যবাদ, <strong>{formData.groomName || 'আপনাকে'}</strong>। আমাদের ডিজাইন টিম <strong>{selectedTemplate.name}</strong>-এর জন্য আপনার ওয়েবসাইট লিঙ্ক প্রস্তুত করবে এবং ২৪ ঘণ্টার মধ্যে <strong>{formData.whatsappNumber || 'আপনার হোয়াটসঅ্যাপে'}</strong> ড্রাফট প্রিভিউ পাঠিয়ে দেওয়া হবে।
              </p>

              {/* Sample WhatsApp Link Preview */}
              <div className="max-w-md mx-auto p-3.5 sm:p-4 rounded-2xl bg-[#e9f7ef] border border-emerald-200 text-left">
                <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>আপনার হোয়াটসঅ্যাপ মেসেজ প্রিভিউ:</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs font-sans text-stone-800 shadow-xs">
                  <p className="font-bold text-amber-950 font-serif-luxury">
                    🌸 {formData.groomName || 'বর'} ও {formData.brideName || 'কনে'}'র শুভ বিবাহ 🌸
                  </p>
                  <p className="mt-1 text-stone-600">
                    আমাদের জীবনের এই বিশেষ দিনে আপনাকে ও আপনার পরিবারকে আন্তরিক নিমন্ত্রণ।
                  </p>
                  <p className="mt-2 text-blue-600 underline font-medium break-all">
                    https://wishora.online/{((formData.groomName || 'g') + '-' + (formData.brideName || 'b')).toLowerCase().replace(/\s+/g, '')}
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] text-white font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  সম্পন্ন হয়েছে
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
              {/* Template Selector */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  নির্বাচিত ডিজাইন
                </label>
                <div className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-2xl border border-stone-200 bg-stone-50">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 flex items-center justify-center text-base sm:text-lg font-serif-luxury font-bold text-amber-900 shrink-0">
                    ✦
                  </div>
                  <div className="flex-1 min-w-0">
                    <select
                      value={selectedTemplateId}
                      onChange={(e) => {
                        setSelectedTemplateId(e.target.value);
                        setFormData((prev) => ({ ...prev, templateId: e.target.value }));
                      }}
                      className="w-full text-xs sm:text-sm font-bold text-neutral-900 bg-transparent border-none focus:outline-none cursor-pointer truncate"
                    >
                      {TEMPLATES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.categoryLabel}) — ৳{t.discountPrice}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">{selectedTemplate.aesthetic}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-neutral-900 font-display">
                      ৳{selectedTemplate.discountPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Couple / Person Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    বরের নাম / প্রধান ব্যক্তি *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: কবির / আহনাফ"
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    className="w-full p-2.5 sm:p-2.5 rounded-xl border border-stone-200 text-base sm:text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    কনের নাম / প্রিয় মানুষ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: অনন্যা / মিনা"
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    className="w-full p-2.5 sm:p-2.5 rounded-xl border border-stone-200 text-base sm:text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
              </div>

              {/* Date & City Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    অনুষ্ঠানের তারিখ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ২৪ নভেম্বর ২০২৬"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full p-2.5 sm:p-2.5 rounded-xl border border-stone-200 text-base sm:text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    শহর / ভেন্যুর ঠিকানা *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: গুলশান ক্লাব, ঢাকা"
                    value={formData.cityVenue}
                    onChange={(e) => setFormData({ ...formData, cityVenue: e.target.value })}
                    className="w-full p-2.5 sm:p-2.5 rounded-xl border border-stone-200 text-base sm:text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
              </div>

              {/* Delivery Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    হোয়াটসঅ্যাপ নম্বর (ডেলিভারির জন্য) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="যেমন: 01712345678"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 sm:p-2.5 rounded-xl border border-stone-200 text-base sm:text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    ভাষার পছন্দ
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full p-2.5 sm:p-2.5 rounded-xl border border-stone-200 text-base sm:text-sm focus:outline-amber-600 bg-white cursor-pointer"
                  >
                    <option value="Bangla only">বাংলা (সর্বাধিক জনপ্রিয়)</option>
                    <option value="Bangla & English">বাংলা ও ইংরেজি (উভয়ই)</option>
                    <option value="English only">ইংরেজি</option>
                  </select>
                </div>
              </div>

              {/* Optional Customizations Toggles */}
              <div className="pt-2 border-t border-stone-100">
                <p className="text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                  অন্তর্ভুক্ত বিশেষ সুবিধাসমূহ
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer active:scale-98">
                    <input
                      type="checkbox"
                      checked={formData.includeMusic}
                      onChange={(e) => setFormData({ ...formData, includeMusic: e.target.checked })}
                      className="rounded text-rose-700 w-4 h-4"
                    />
                    <span className="text-xs text-stone-800 font-medium">আবহ সংগীত</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer active:scale-98">
                    <input
                      type="checkbox"
                      checked={formData.includeRsvp}
                      onChange={(e) => setFormData({ ...formData, includeRsvp: e.target.checked })}
                      className="rounded text-rose-700 w-4 h-4"
                    />
                    <span className="text-xs text-stone-800 font-medium">অতিথি RSVP ট্র্যাকার</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer active:scale-98">
                    <input
                      type="checkbox"
                      checked={formData.includeMap}
                      onChange={(e) => setFormData({ ...formData, includeMap: e.target.checked })}
                      className="rounded text-rose-700 w-4 h-4"
                    />
                    <span className="text-xs text-stone-800 font-medium">গুগল ম্যাপস লোকেশন</span>
                  </label>
                </div>
              </div>

              {/* Additional notes / requests */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  বিশেষ বার্তা বা কোনো অনুরোধ (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  placeholder="যেমন: গায়ে হলুদ ও রিসেপশনের শিডিউল যুক্ত করতে চাই। আমাদের হ্যাশট্যাগ দিন।"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 text-base sm:text-sm focus:outline-amber-600 bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 sticky bottom-0 bg-[#FAF8F5] pb-1 z-10">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-rose-300/30"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{selectedTemplate.name} অর্ডার করুন — ৳{selectedTemplate.discountPrice}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] sm:text-[11px] text-[#7A685D] mt-2">
                  🔒 নিরাপদ হোয়াটসঅ্যাপ ডেলিভারি · ২টি ফ্রি রিভিশন সুবিধা
                </p>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
