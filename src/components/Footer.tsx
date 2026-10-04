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
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#6B574E] leading-relaxed mb-4">
              Beautiful, personalized digital experiences made for birthdays, anniversaries, proposals, weddings, and the people who mean the most.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5D2E]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Delivered in 24 hrs on WhatsApp</span>
            </div>
          </div>

          {/* Occasions */}
          <div>
            <h4 className="text-xs font-bold text-[#2B1724] tracking-wider uppercase mb-4">
              Occasions
            </h4>
            <ul className="space-y-2 text-xs text-[#5D4A41]">
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">Royal Wedding Invitations</a></li>
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">Holy Nikah &amp; Walima</a></li>
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">Gaye Holud &amp; Mehendi Night</a></li>
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">Engagement &amp; Proposal</a></li>
              <li><a href="#templates-section" className="hover:text-[#7A0C38] transition-colors">Birthday &amp; Anniversaries</a></li>
              <li><a href="#pricing-section" className="hover:text-[#7A0C38] text-[#7A0C38] font-semibold transition-colors flex items-center gap-1"><span>Custom Celebration Edit (৳499)</span> <Sparkles className="w-3 h-3 text-[#A81B5B]" /></a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-bold text-[#2B1724] tracking-wider uppercase mb-4">
              Included Features
            </h4>
            <ul className="space-y-2 text-xs text-[#6B574E]">
              <li>• Real-time RSVP Tracking</li>
              <li>• Google Maps 1-Tap Navigation</li>
              <li>• Embedded Background Music</li>
              <li>• Interactive Countdown Timer</li>
              <li>• WhatsApp Instant Share</li>
              <li>• 2 Free Revisions Included</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold text-[#2B1724] tracking-wider uppercase mb-4">
              Support &amp; Custom Orders
            </h4>
            <p className="text-xs text-[#6B574E] mb-3">
              Need custom illustrations, specific mantras, or private events?
            </p>
            <a
              href="https://wa.me/880123228230?text=Hello%20Wishora!%20I%20would%20like%20to%20create%20a%20custom%20celebration%20invite."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF4EC] border border-[#D8C7B5] text-[#2B1724] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer mb-2 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={onChooseTemplate}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs border border-rose-300/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Browse All 29 Designs</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A685D] gap-4">
          <p>© {new Date().getFullYear()} Wishora. All rights reserved. Crafted for unforgettable moments.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#7A0C38]">Privacy Policy</a>
            <a href="#" className="hover:text-[#7A0C38]">Terms of Service</a>
            <a href="#faq-section" className="hover:text-[#7A0C38]">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
