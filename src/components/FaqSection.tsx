import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  id: string;
  badge?: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'process',
    badge: '০১. অর্ডার প্রসেস',
    question: 'Wishora কীভাবে কাজ করে এবং কীভাবে অর্ডার করব?',
    answer: 'Wishora-র মাধ্যমে আপনার প্রিয়জনকে স্পেশাল কোনো দিনে (Birthday, Anniversary, Proposal, Wedding Invitation ইত্যাদি) ডিজিটাল সারপ্রাইজ বা ডিজিটাল নিমন্ত্রণ কার্ড দিতে পারেন। অর্ডার করতে আমাদের WhatsApp বা Messenger-এ নক দিন। আমাদের টিম আপনার চাওয়া অনুযায়ী কনটেন্ট ও টেমপ্লেট নির্বাচন করতে সাহায্য করবে। সবকিছু কনফার্ম হওয়ার পর নির্ধারিত সময়ের আগেই আপনার জন্য কাস্টমাইজড লিঙ্ক তৈরি করে বুঝিয়ে দেওয়া হবে।'
  },
  {
    id: 'delivery-link',
    badge: '০২. ডেলিভারি ও লিঙ্ক',
    question: 'আমি ডেলিভারি কীভাবে পাব এবং লিঙ্কটি দেখতে কেমন হবে?',
    answer: 'কাজ শেষ হওয়ার পর আমরা আপনাকে একটি ওয়েবসাইটের ডেলিভারি লিঙ্ক দিয়ে দেব (যেমন: wishora.online/mina)—যেখানে ক্লায়েন্ট বা যার নামে উইশ করা হচ্ছে তার নাম থাকবে। এই লিঙ্কটি আপনি সরাসরি আপনার প্রিয়জন বা অতিথিদের সাথে শেয়ার করতে পারবেন।'
  },
  {
    id: 'timeline',
    badge: '০৩. ডেলিভারি সময়সীমা',
    question: 'অর্ডার করার পর ডেলিভারি পেতে কত দিন সময় লাগে?',
    answer: 'সাধারণত অর্ডার কনফার্ম হওয়ার ৩ থেকে ৫ দিনের মধ্যে আমরা ডেলিভারি সম্পূর্ণ করি। তবে আপনার প্রোভাইড করা কনটেন্ট, ছবি বা তথ্যের পরিমাণের ওপর নির্ভর করে সময় কিছুটা কম বা বেশি হতে পারে।'
  },
  {
    id: 'payment',
    badge: '০৪. পেমেন্ট পদ্ধতি',
    question: 'পেমেন্ট কীভাবে করতে হবে?',
    answer: 'আপনি খুব সহজেই Bkash (বিকাশ) অথবা Nagad (নগদ)-এর মাধ্যমে পেমেন্ট সম্পন্ন করতে পারবেন। কনটেন্ট ও টেমপ্লেট ফাইনাল হওয়ার পর পেমেন্ট প্রসেস সম্পন্ন করতে হয়।'
  },
  {
    id: 'support-changes',
    badge: '০৫. সাপোর্ট ও পরিবর্তন',
    question: 'সার্ভিস সম্পর্কিত যেকোনো পরিবর্তনের জন্য কীভাবে যোগাযোগ করব?',
    answer: 'কনটেন্ট ডেলিভারির আগে বা তৈরির প্রক্রিয়ায় যেকোনো পরিবর্তন বা প্রশ্নের জন্য সরাসরি আমাদের সাথে WhatsApp বা Facebook Messenger-এ কথা বলতে পারবেন। আমাদের প্রতিনিধি আপনাকে সর্বাত্মক সহযোগিতা করবে।'
  }
];

interface FaqSectionProps {
  onOpenInquiry?: () => void;
  onChooseTemplate?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenInquiry, onChooseTemplate }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    process: true // প্রথম প্রশ্নটি স্বয়ংক্রিয়ভাবে ওপেন থাকবে
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="faq-section" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#EAE3D6] relative">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-[#8C5D2E] text-[11px] font-bold tracking-widest uppercase mb-3 font-display">
          <span>✦</span>
          <span>FREQUENTLY ASKED QUESTIONS</span>
          <span>✦</span>
        </div>
        <h2 className="text-[24px] sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B1724] leading-[34.4px] sm:leading-[1.15] mb-4 font-serif-luxury">
          সাধারণ জিজ্ঞাসা ও উত্তর<br />
          <span className="font-bold text-[#7A0C38]">Wishora Experience FAQ</span>
        </h2>
        <p className="text-sm sm:text-base text-[#6B574E] max-w-2xl mx-auto font-normal leading-relaxed">
          Wishora সম্পর্কিত প্রয়োজনীয় সকল তথ্যের সহজ ও পরিষ্কার উত্তর—অর্ডার প্রসেস, ডেলিভারি, পেমেন্ট এবং সাপোর্ট।
        </p>
      </div>

      {/* Accordion FAQ List - 5 Important Questions in Bengali */}
      <div className="space-y-4 mb-14">
        {FAQ_ITEMS.map((faq) => {
          const isOpen = !!openItems[faq.id];
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#7A0C38]/30 shadow-[0_10px_30px_rgba(122,12,56,0.08)]'
                  : 'bg-white/80 hover:bg-white border-[#E8DDD4] shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full text-left py-5 px-5 sm:px-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 pr-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
                    isOpen ? 'bg-[#7A0C38]/10 text-[#7A0C38]' : 'bg-[#F2ECE2] text-[#8C6239]'
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#181210] font-sans sm:font-serif-luxury leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {faq.badge && (
                    <span className="hidden sm:inline-block text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#8C5D2E] border border-amber-500/20">
                      {faq.badge}
                    </span>
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#181210] text-amber-200' : 'bg-[#F5EFE6] text-[#4A3C33]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#5D4A41] leading-relaxed border-t border-[#F2ECE2]/80 mt-1">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Still Have Questions CTA Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#2B1724] via-[#3B192A] to-[#181210] p-7 sm:p-10 text-white shadow-xl border border-rose-500/20 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1375]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[#FDE68A] text-[11px] font-semibold tracking-wide mb-3 border border-white/15">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Dedicated WhatsApp Support</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white mb-2 leading-tight">
            আপনার মনের মতো করে সাজাতে কথা বলুন আমাদের সাথে
          </h3>
          <p className="text-xs sm:text-sm text-stone-200 font-normal leading-relaxed">
            কাস্টম ডিজাইন, বিশেষ ফিচার বা যেকোনো প্রয়োজনে সরাসরি আমাদের সাথে WhatsApp-এ যোগাযোগ করুন।
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF1375] via-[#E11D48] to-[#BE185D] hover:brightness-105 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(255,19,117,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp-এ কথা বলুন</span>
            </button>
          )}
          {onChooseTemplate && (
            <button
              onClick={onChooseTemplate}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>টেমপ্লেটগুলো দেখুন</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
