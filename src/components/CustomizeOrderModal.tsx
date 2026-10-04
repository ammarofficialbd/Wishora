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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2B1724]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DDCF] max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8DDCF] flex items-center justify-between bg-white/70">
          <div>
            <h3 className="text-xl font-bold font-serif-luxury text-[#2B1724]">
              Personalise Your Invitation Link
            </h3>
            <p className="text-xs text-[#7A685D]">
              Ready in 24 hours · Delivered directly on WhatsApp &amp; Email
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFE7DC] text-[#7A685D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h3 className="text-2xl font-serif-luxury font-bold text-[#2B1724]">
                Order Received! ✨
              </h3>
              <p className="text-sm text-[#5A454F] max-w-md mx-auto">
                Thank you, <strong>{formData.groomName || 'Couple'}</strong>. Our design artisan will prepare your live website link for <strong>{selectedTemplate.name}</strong> and deliver the draft preview to <strong>{formData.whatsappNumber || 'your WhatsApp'}</strong> within 24 hours.
              </p>

              {/* Sample WhatsApp Link Preview */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#e9f7ef] border border-emerald-200 text-left">
                <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Previewing Your WhatsApp Message:</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs font-sans text-stone-800 shadow-xs">
                  <p className="font-bold text-amber-950 font-serif-luxury">
                    🌸 {formData.groomName || 'Groom'} &amp; {formData.brideName || 'Bride'}'s Wedding Celebration 🌸
                  </p>
                  <p className="mt-1 text-stone-600">
                    We invite you and your family to join us on {formData.weddingDate || 'our special day'}.
                  </p>
                  <p className="mt-2 text-blue-600 underline font-medium">
                    https://wishora.com/invite/{((formData.groomName || 'g') + '-' + (formData.brideName || 'b')).toLowerCase().replace(/\s+/g, '')}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] text-white font-semibold text-sm hover:brightness-110 transition-all shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Template Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  Selected Design
                </label>
                <div className="flex items-center gap-3 p-3 rounded-2xl border border-stone-200 bg-stone-50">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg font-serif-luxury font-bold text-amber-900">
                    ✦
                  </div>
                  <div className="flex-1">
                    <select
                      value={selectedTemplateId}
                      onChange={(e) => {
                        setSelectedTemplateId(e.target.value);
                        setFormData((prev) => ({ ...prev, templateId: e.target.value }));
                      }}
                      className="w-full text-sm font-bold text-neutral-900 bg-transparent border-none focus:outline-none cursor-pointer"
                    >
                      {TEMPLATES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.categoryLabel}) — ৳{t.discountPrice}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-stone-500">{selectedTemplate.aesthetic}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-neutral-900 font-display">
                      ৳{selectedTemplate.discountPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Couple / Person Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Groom / Host Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kabir"
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Bride / Host Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya"
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
              </div>

              {/* Date & City Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Event Date(s) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 24 November 2026"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    City / Venue Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Umaid Bhawan, Jodhpur"
                    value={formData.cityVenue}
                    onChange={(e) => setFormData({ ...formData, cityVenue: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
              </div>

              {/* Delivery Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    WhatsApp Number (for delivery) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-amber-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                    Language Preference
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-amber-600 bg-white"
                  >
                    <option value="English & Hindi">English &amp; Hindi (Most Popular)</option>
                    <option value="English only">English only</option>
                    <option value="Hindi only">Hindi (देवनागरी)</option>
                    <option value="Marathi">Marathi (मराठी)</option>
                    <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                    <option value="Telugu">Telugu (తెలుగు)</option>
                    <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                  </select>
                </div>
              </div>

              {/* Optional Customizations Toggles */}
              <div className="pt-2 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                  Interactive Features Included
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeMusic}
                      onChange={(e) => setFormData({ ...formData, includeMusic: e.target.checked })}
                      className="rounded text-black"
                    />
                    <span className="text-xs text-stone-800 font-medium">Ceremonial Music</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeRsvp}
                      onChange={(e) => setFormData({ ...formData, includeRsvp: e.target.checked })}
                      className="rounded text-black"
                    />
                    <span className="text-xs text-stone-800 font-medium">Guest RSVP Tracker</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeMap}
                      onChange={(e) => setFormData({ ...formData, includeMap: e.target.checked })}
                      className="rounded text-black"
                    />
                    <span className="text-xs text-stone-800 font-medium">Google Maps Navigation</span>
                  </label>
                </div>
              </div>

              {/* Additional notes / requests */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Special Notes or Event Itinerary Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please include Mehendi, Haldi and Reception events. Add our hashtag #KabirWedsAnanya."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-200 text-sm focus:outline-amber-600 bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-rose-300/30"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Proceed with {selectedTemplate.name} — ৳{selectedTemplate.discountPrice}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-[#7A685D] mt-2">
                  🔒 Secure checkout · 2 free rounds of edits included
                </p>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
