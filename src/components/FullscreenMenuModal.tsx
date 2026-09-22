import React from 'react';
import { X, Instagram, Youtube, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FullscreenMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseTemplate: () => void;
}

export const FullscreenMenuModal: React.FC<FullscreenMenuModalProps> = ({
  isOpen,
  onClose,
  onChooseTemplate,
}) => {
  const menuItems = [
    { label: 'Home', href: '#', isScroll: false },
    { label: 'Templates', href: '#templates-section', isScroll: true },
    { label: 'Features', href: '#reinvented-section', isScroll: true },
    { label: 'How it works', href: '#how-it-works-section', isScroll: true },
    { label: 'Reviews', href: '#reviews-section', isScroll: true },
    { label: 'FAQ', href: '#faq-section', isScroll: true },
    { label: 'Shop invites', href: '#templates-section', isScroll: true },
  ];

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isScroll: boolean) => {
    onClose();
    if (!isScroll || href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-2 sm:pt-4 px-3 sm:px-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Menu Card Panel (Slightly more than half of viewport height, max-h-[72vh]) */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E5DACB] flex flex-col justify-between p-5 sm:p-8 overflow-hidden z-10 max-h-[75vh] overflow-y-auto no-scrollbar"
          >
            {/* Top Bar: Logo & Close X Button */}
            <div className="w-full flex items-center justify-between pb-3.5 border-b border-[#EAE3D6]/80">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF1375] via-[#E11D48] to-amber-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-[#2B1724] font-display flex items-center gap-1">
                  wishora
                  <span className="text-[#FF1375] text-xs">✦</span>
                </span>
              </a>

              <motion.button
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-[#F0E6D8] text-[#2B1724] border border-[#E5DACB] shadow-sm transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>

            {/* Mobile Primary CTA Button right inside the menu */}
            <div className="pt-3 pb-1 block sm:hidden">
              <button
                onClick={() => {
                  onClose();
                  onChooseTemplate();
                }}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#FF1375] via-[#E11D48] to-[#BE185D] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Choose a template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Middle: Centered Menu Title & Links */}
            <div className="py-3 sm:py-5 text-center flex flex-col items-center justify-center my-auto">
              <motion.h3 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-xl sm:text-3xl font-bold tracking-tight text-[#1A120B] mb-3 sm:mb-5 font-serif-luxury"
              >
                Explore Menu
              </motion.h3>

              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.12,
                    },
                  },
                }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5 max-w-2xl w-full"
              >
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    onClick={(e) => handleMenuClick(e, item.href, item.isScroll)}
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.96 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="group relative px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/80 hover:bg-white border border-[#EADFCF] hover:border-[#FF1375]/40 text-center text-sm sm:text-base font-medium text-[#3A2E28] hover:text-[#FF1375] transition-all duration-200 shadow-xs cursor-pointer font-serif-luxury flex items-center justify-center"
                  >
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </motion.nav>
            </div>

            {/* Bottom Footer Section: Social Icons & Quick CTA */}
            <div className="w-full pt-3.5 border-t border-[#EAE3D6]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a href="#instagram" onClick={(e) => e.preventDefault()} className="p-2 rounded-full bg-white border border-[#E5DACB] text-[#5D4A41] hover:text-[#FF1375] transition-colors shadow-xs" aria-label="Instagram">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="#youtube" onClick={(e) => e.preventDefault()} className="p-2 rounded-full bg-white border border-[#E5DACB] text-[#5D4A41] hover:text-[#FF1375] transition-colors shadow-xs" aria-label="YouTube">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a href="#facebook" onClick={(e) => e.preventDefault()} className="p-2 rounded-full bg-white border border-[#E5DACB] text-[#5D4A41] hover:text-[#FF1375] transition-colors shadow-xs" aria-label="Facebook">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="#linkedin" onClick={(e) => e.preventDefault()} className="p-2 rounded-full bg-white border border-[#E5DACB] text-[#5D4A41] hover:text-[#FF1375] transition-colors shadow-xs" aria-label="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onChooseTemplate();
                }}
                className="hidden sm:inline-flex px-5 py-2 rounded-full bg-[#1A120B] hover:bg-[#33261D] text-white text-xs font-semibold items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>Browse all 29 designs</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
