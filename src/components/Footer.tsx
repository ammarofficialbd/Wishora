import React from 'react';
import { Heart, MessageCircle, Mail, Sparkles, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onChooseTemplate: () => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onChooseTemplate, onOpenInquiry }) => {
  return (
    <footer className="bg-gradient-to-b from-[#FAF4EC] via-[#F5ECE0] to-[#EFE2D3] border-t border-[#E5DACB] pt-16 pb-12 text-[#5D4A41] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E2D4C3]">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/assets/wishora.png" 
                alt="wishora" 
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#6B574E] leading-relaxed mb-4">
              জন্মদিন, বিবাহবার্ষিকী, বিশেষ প্রপোজাল কিংবা বিয়ের নিমন্ত্রণ—সবচেয়ে প্রিয় মানুষের জন্য তৈরি আকর্ষণীয় ও অবিস্মরণীয় ডিজিটাল অভিজ্ঞতা।
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5D2E]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>২৪ ঘণ্টার মধ্যে হোয়াটসঅ্যাপে ডেলিভারি</span>
            </div>
          </div>

          {/* Occasions */}
          <div>
            <h4 className="text-xs font-bold text-[#2B1724] tracking-wider uppercase mb-4">
              বিশেষ আয়োজন
            </h4>
            <ul className="space-y-2 text-xs text-[#5D4A41]">
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">রাজকীয় বিবাহ নিমন্ত্রণ</a></li>
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">পবিত্র নিকাহ ও ওয়ালিমা</a></li>
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">গায়ে হলুদ ও মেহেন্দি রাত</a></li>
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">রোমান্টিক প্রপোজাল ও এনগেজমেন্ট</a></li>
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">জন্মদিন ও বিবাহবার্ষিকী</a></li>
              <li><a href="#pricing-section" className="hover:text-[#7A0C38] text-[#7A0C38] font-semibold transition-colors flex items-center gap-1"><span>কাস্টম সারপ্রাইজ ওয়েবসাইট (৳৪৯৯)</span> <Sparkles className="w-3 h-3 text-[#A81B5B]" /></a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-bold text-[#2B1724] tracking-wider uppercase mb-4">
              বিশেষ সুবিধাসমূহ
            </h4>
            <ul className="space-y-2 text-xs text-[#6B574E]">
              <li>• লাইভ আরএসভিপি ট্র্যাকিং</li>
              <li>• ১-ট্যাপে গুগল ম্যাপস লোকেশন</li>
              <li>• পছন্দের ব্যাকগ্রাউন্ড মিউজিক</li>
              <li>• রোমাঞ্চকর কাউন্টডাউন টাইমার</li>
              <li>• হোয়াটসঅ্যাপে তাত্ক্ষণিক শেয়ার</li>
              <li>• ২টি ফ্রি রিভিশন সুবিধা</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold text-[#2B1724] tracking-wider uppercase mb-4">
              সহায়তা ও কাস্টম অর্ডার
            </h4>
            <p className="text-xs text-[#6B574E] mb-3">
              বিশেষ কোনো থিম, নিজস্ব লেখা বা ইউনিক আইডিয়া বাস্তবায়নে কথা বলুন সরাসরি।
            </p>
            <a
              href="https://wa.me/8801411390983?text=Hello%20Wishora!%20I%20would%20like%20to%20create%20a%20custom%20celebration%20invite."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF4EC] border border-[#D8C7B5] text-[#2B1724] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer mb-2 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>হোয়াটসঅ্যাপে চ্যাট করুন</span>
            </a>
            <button
              onClick={onChooseTemplate}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs border border-rose-300/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>সবগুলো ডিজাইন দেখুন</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A685D] gap-4">
          <p>© {new Date().getFullYear()} Wishora. সর্বস্বত্ব সংরক্ষিত। হৃদয়ের ভালোবাসায় তৈরি অবিস্মরণীয় মুহূর্ত।</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#7A0C38]">গোপনীয়তা নীতি</a>
            <a href="#" className="hover:text-[#7A0C38]">ব্যবহারের শর্তাবলি</a>
            <a href="#faq-section" className="hover:text-[#7A0C38]">সাধারণ জিজ্ঞাসা</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
