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
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </a>

        {/* Right side CTA & Menu Icon */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Desktop/Tablet CTA Button - Hidden on Mobile */}
          <button
            onClick={onChooseTemplate}
            id="nav-choose-template-btn"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-sm font-semibold active:scale-95 transition-all shadow-[0_4px_16px_rgba(122,12,56,0.25)] cursor-pointer whitespace-nowrap border border-rose-200/20"
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
