import React from 'react';
import { Menu } from 'lucide-react';

interface NavbarProps {
  onChooseTemplate: () => void;
  onOpenMenu: () => void;
  onOpenInquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onChooseTemplate, onOpenMenu }) => {
  return (
    <header className="sticky top-0 z-35 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center group cursor-pointer"
          id="nav-logo"
          aria-label="Wishora"
        >
          <img 
            src="/assets/wishora.png" 
            alt="wishora" 
            className="h-[60px] w-[73px] object-contain group-hover:scale-105 transition-transform"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-[#4A3B34]">
          <a 
            href="#templates-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('templates-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#7A0C38] transition-colors cursor-pointer"
          >
            টেমপ্লেটসমূহ
          </a>
          <a 
            href="#how-it-works-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#7A0C38] transition-colors cursor-pointer"
          >
            কীভাবে কাজ করে
          </a>
          <a 
            href="#pricing-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#7A0C38] transition-colors cursor-pointer"
          >
            প্যাকেজ ও খরচ
          </a>
          <a 
            href="#blog-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#7A0C38] transition-colors cursor-pointer"
          >
            ব্লগ ও গল্প
          </a>
          <a 
            href="#faq-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#7A0C38] transition-colors cursor-pointer"
          >
            সাধারণ জিজ্ঞাসা
          </a>
        </nav>

        {/* Right side CTA Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onChooseTemplate}
            id="nav-choose-template-btn"
            className="inline-flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-xs sm:text-sm font-semibold active:scale-95 transition-all shadow-[0_4px_16px_rgba(122,12,56,0.25)] cursor-pointer whitespace-nowrap border border-rose-200/20"
          >
            টেমপ্লেট বেছে নিন
          </button>
        </div>
      </div>
    </header>
  );
};
