import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Luxury Gradient Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/5">
        <motion.div
          className="h-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] origin-left shadow-[0_0_12px_rgba(122,12,56,0.6)]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Back to Top Luxury Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          showBackToTop
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 20 }
        }
        transition={{ duration: 0.25 }}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md text-[#2B1724] hover:text-[#7A0C38] border border-[#E8DDCF] shadow-lg hover:shadow-xl hover:border-[#A81B5B]/40 transition-all cursor-pointer group"
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </>
  );
};
