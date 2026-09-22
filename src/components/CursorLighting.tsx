import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CursorLighting: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring physics for ambient luxury follow
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Faster spring for micro cursor dot
  const fastSpringConfig = { damping: 20, stiffness: 450, mass: 0.2 };
  const dotX = useSpring(mouseX, fastSpringConfig);
  const dotY = useSpring(mouseY, fastSpringConfig);

  useEffect(() => {
    // Only enable on devices that have a precise pointer (mouse/trackpad)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, .group')
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* 1. Primary Soft Ambient Radial Spotlight */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-multiply transition-opacity duration-300"
        style={{
          left: smoothX,
          top: smoothY,
          width: isHoveringInteractive ? 520 : 420,
          height: isHoveringInteractive ? 520 : 420,
          background: isHoveringInteractive
            ? 'radial-gradient(circle, rgba(255, 19, 117, 0.09) 0%, rgba(245, 158, 11, 0.06) 35%, rgba(255, 230, 210, 0.02) 60%, transparent 75%)'
            : 'radial-gradient(circle, rgba(255, 19, 117, 0.05) 0%, rgba(217, 119, 6, 0.04) 30%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: isMouseDown ? 0.9 : 0.75,
        }}
      />

      {/* 2. Concentrated Warm Gold Aura Core */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-soft-light transition-all duration-200"
        style={{
          left: dotX,
          top: dotY,
          width: isHoveringInteractive ? 160 : 100,
          height: isHoveringInteractive ? 160 : 100,
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 80%)',
          filter: 'blur(12px)',
        }}
      />

      {/* 3. Subtle Luxury Micro Ring / Lens Accent */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF1375]/30 transition-all duration-150"
        style={{
          left: dotX,
          top: dotY,
          width: isHoveringInteractive ? 38 : (isMouseDown ? 18 : 26),
          height: isHoveringInteractive ? 38 : (isMouseDown ? 18 : 26),
          backgroundColor: isHoveringInteractive ? 'rgba(255, 19, 117, 0.05)' : 'transparent',
          boxShadow: isHoveringInteractive 
            ? '0 0 16px rgba(255, 19, 117, 0.3), inset 0 0 8px rgba(245, 158, 11, 0.2)' 
            : '0 0 8px rgba(245, 158, 11, 0.2)',
        }}
      />

      {/* 4. Center Gold Sparkle Core */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF1375] to-amber-500 shadow-[0_0_8px_#FF1375]"
        style={{
          left: dotX,
          top: dotY,
          scale: isMouseDown ? 0.6 : (isHoveringInteractive ? 1.3 : 1),
        }}
      />
    </div>
  );
};
