import React from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Music, 
  Share2, 
  MapPin, 
  RotateCcw, 
  ArrowRight 
} from 'lucide-react';

interface ReinventedSectionProps {
  onChooseTemplate: () => void;
}

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'interactive',
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: 'bg-rose-50/90 border-rose-200/90',
    iconColor: 'text-[#7A0C38]',
    title: 'জীবন্ত ও মনকাড়া অভিজ্ঞতা',
    description: 'মন জুড়ানো ব্যাকগ্রাউন্ড মিউজিক, অ্যানিমেশন, স্ক্র্যাচ সারপ্রাইজ এবং আবেগঘন চিঠি যা অতিথিদের প্রথম দর্শনেই মুগ্ধ করবে।'
  },
  {
    id: 'effortless',
    icon: <Smartphone className="w-6 h-6" />,
    iconBg: 'bg-emerald-50/90 border-emerald-200/90',
    iconColor: 'text-emerald-700',
    title: 'সহজ ও ১০০% মোবাইল ফ্রেন্ডলি',
    description: 'যেকোনো স্মার্টফোনে মাত্র ১ ট্যাপেই লিংকটি খোলে। প্রবীণ অতিথিরাও সহজে দেখতে পারেন, কোনো অ্যাপ ডাউনলোড বা সাইন-আপের ঝামেলা নেই।'
  },
  {
    id: 'memories',
    icon: <Music className="w-6 h-6" />,
    iconBg: 'bg-amber-50/90 border-amber-200/90',
    iconColor: 'text-[#8C5D2E]',
    title: 'পছন্দের মিউজিক ও স্মৃতিময় ছবির গল্প',
    description: 'আপনার জীবনের সুন্দর স্মৃতিগুলো সাজান পছন্দের রোমান্টিক সুর, সুন্দর ছবির অ্যালবাম এবং পর্বভিত্তিক স্মৃতিকথার সাথে।'
  },
  {
    id: 'sharing',
    icon: <Share2 className="w-6 h-6" />,
    iconBg: 'bg-purple-50/90 border-purple-200/90',
    iconColor: 'text-purple-700',
    title: 'হোয়াটসঅ্যাপে তাত্ক্ষণিক ডেলিভারি',
    description: 'পাবেন আপনার নামের পার্সোনালাইজড লিংক (যেমন: wishora.online/ayaan), যা সরাসরি হোয়াটসঅ্যাপ, মেসেঞ্জার বা কিউআর কোডে শেয়ার করা যায়।'
  },
  {
    id: 'rsvp-maps',
    icon: <MapPin className="w-6 h-6" />,
    iconBg: 'bg-blue-50/90 border-blue-200/90',
    iconColor: 'text-blue-700',
    title: 'লাইভ RSVP ও গুগল ম্যাপস লোকেশন',
    description: 'কোন কোন অতিথি উপস্থিত থাকছেন তা জেনে নিন সরাসরি, আর অতিথিরা ১ ট্যাপেই ভেন্যুর গুগল ম্যাপস ডিরেকশন পেয়ে যাবেন।'
  },
  {
    id: 'revisions',
    icon: <RotateCcw className="w-6 h-6" />,
    iconBg: 'bg-orange-50/90 border-orange-200/90',
    iconColor: 'text-orange-700',
    title: '২ বার ফ্রি রিভিশন ও দ্রুত ডেলিভারি',
    description: 'অর্ডার কনফার্মের ২৪–৪৮ ঘণ্টার মধ্যেই হোয়াটসঅ্যাপে রেডি লিংক ডেলিভারি। মনের মতো পারফেক্ট করতে পাচ্ছেন ২ বার সম্পূর্ণ ফ্রি রিভিশন।'
  }
];

export const ReinventedSection: React.FC<ReinventedSectionProps> = ({ onChooseTemplate }) => {
  return (
    <section id="reinvented-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D6]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & CTA */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-[#8C5D2E] text-[11px] font-bold tracking-widest uppercase mb-3 font-display w-fit">
            <span>✦ অনন্য অভিজ্ঞতা ✦</span>
          </div>
          <h2 className="text-[24px] sm:text-4xl md:text-[44px] lg:text-[44px] font-bold tracking-tight text-[#2B1724] leading-[34.4px] sm:leading-[1.2] mb-5 font-serif-luxury">
            ডিজিটাল নিমন্ত্রণ ও শুভেচ্ছা,<br />
            <span className="text-[#7A0C38] font-bold">নতুন ও আধুনিক রূপে।</span>
          </h2>

          <p className="text-[#4D3F38] text-sm sm:text-base leading-relaxed mb-8 max-w-md font-normal">
            কাগজের সাধারণ কার্ড বা সাদামাটা মেসেজ যা দিতে পারে না—এখানে রয়েছে চমৎকার আবহ সঙ্গীত, জীবন্ত অ্যানিমেশন আর হৃদয়ের গভীরের ভালোবাসা।
          </p>

          <div>
            <button
              onClick={onChooseTemplate}
              id="reinvented-choose-template-btn"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-sm font-semibold active:scale-95 transition-all shadow-[0_12px_28px_-6px_rgba(122,12,56,0.35)] cursor-pointer inline-flex items-center gap-2 border border-rose-300/30"
            >
              <span>টেমপ্লেট বেছে নিন</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Right Column: 6 Refined Feature Items List */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
          {FEATURES.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/90 hover:bg-white border border-[#EAE3D6] hover:border-amber-400/60 shadow-xs hover:shadow-md transition-all duration-200"
            >
              {/* Feature Icon Container */}
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} border flex items-center justify-center shrink-0 shadow-xs`}>
                {item.icon}
              </div>

              {/* Text */}
              <div className="pt-0.5">
                <h3 className="text-base sm:text-lg font-bold text-[#181210] mb-1 font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A4B43] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
