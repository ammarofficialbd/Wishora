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
          className="flex items-center gap-2 group cursor-pointer"
          id="nav-logo"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#FF1375] via-[#E11D48] to-amber-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#2B1724] font-display flex items-center gap-1">
            wishora
            <span className="text-[#FF1375] text-xs">✦</span>
          </span>
        </a>

        {/* Right side CTA & Menu Icon */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Desktop/Tablet CTA Button - Hidden on Mobile */}
          <button
            onClick={onChooseTemplate}
            id="nav-choose-template-btn"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF1375] via-[#E11D48] to-[#BE185D] hover:brightness-105 text-white text-sm font-semibold active:scale-95 transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            Choose a template
          </button>

          {/* Menu Toggle Button */}
          <button
            onClick={() => {
              onOpenMenu();
            }}
            id="nav-menu-toggle"
            className="p-2.5 rounded-full bg-[#F2ECE2] hover:bg-[#E5DACB] text-[#2B1724] transition-colors cursor-pointer border border-[#E0D4C3] shadow-xs flex items-center justify-center active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
