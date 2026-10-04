import React from 'react';
import { motion } from 'framer-motion';

interface FloatingHeartItem {
  id: number;
  size: number; // small size (12px to 26px)
  startX: number; // percentage across screen width (2% to 96%)
  duration: number; // 12 to 24 seconds for graceful rise
  delay: number; // staggered appearance
  swayAmount: number; // horizontal bubble sway in pixels
  colorTheme: 'rose' | 'burgundy' | 'champagne' | 'gold' | 'blush';
  opacity: number;
  blur?: string;
  hasSparkle?: boolean;
}

// Curated smooth rising hearts (water-bubble style)
const HEARTS: FloatingHeartItem[] = [
  { id: 1, size: 18, startX: 8, duration: 16, delay: 0, swayAmount: 20, colorTheme: 'rose', opacity: 0.65 },
  { id: 2, size: 13, startX: 18, duration: 19, delay: 4.5, swayAmount: -16, colorTheme: 'champagne', opacity: 0.5 },
  { id: 3, size: 24, startX: 28, duration: 15, delay: 2, swayAmount: 22, colorTheme: 'burgundy', opacity: 0.6, hasSparkle: true },
  { id: 4, size: 15, startX: 38, duration: 21, delay: 7, swayAmount: -18, colorTheme: 'blush', opacity: 0.45 },
  { id: 5, size: 20, startX: 50, duration: 17, delay: 1, swayAmount: 24, colorTheme: 'gold', opacity: 0.55 },
  { id: 6, size: 14, startX: 62, duration: 22, delay: 8.5, swayAmount: -15, colorTheme: 'rose', opacity: 0.5 },
  { id: 7, size: 26, startX: 72, duration: 14, delay: 3.5, swayAmount: 25, colorTheme: 'burgundy', opacity: 0.62, hasSparkle: true },
  { id: 8, size: 16, startX: 82, duration: 18, delay: 6, swayAmount: -20, colorTheme: 'champagne', opacity: 0.55 },
  { id: 9, size: 22, startX: 92, duration: 15, delay: 2.8, swayAmount: 18, colorTheme: 'rose', opacity: 0.6 },
  { id: 10, size: 12, startX: 12, duration: 20, delay: 10, swayAmount: -14, colorTheme: 'blush', opacity: 0.4 },
  { id: 11, size: 19, startX: 44, duration: 16, delay: 12, swayAmount: 19, colorTheme: 'champagne', opacity: 0.5 },
  { id: 12, size: 15, startX: 88, duration: 19, delay: 11, swayAmount: -17, colorTheme: 'gold', opacity: 0.5 },
];

export const FloatingHearts: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none"
      aria-hidden="true"
    >
      {HEARTS.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute bottom-0 ${heart.blur || ''}`}
          style={{
            left: `${heart.startX}%`,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
          }}
          initial={{ y: '105vh', opacity: 0 }}
          animate={{
            y: ['105vh', '-10vh'],
            x: [
              0,
              heart.swayAmount,
              -heart.swayAmount * 0.8,
              heart.swayAmount * 0.9,
              0,
            ],
            opacity: [0, heart.opacity, heart.opacity, heart.opacity * 0.8, 0],
            scale: [0.85, 1, 1.05, 0.95, 0.8],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_4px_10px_rgba(122,12,56,0.18)]"
          >
            <defs>
              {/* Rose Gradient */}
              <linearGradient id={`heart-grad-rose-${heart.id}`} x1="20%" y1="10%" x2="80%" y2="90%">
                <stop offset="0%" stopColor="#FFF0F6" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#F472B6" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#BE185D" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#831843" stopOpacity="0.85" />
              </linearGradient>

              {/* Burgundy Gradient */}
              <linearGradient id={`heart-grad-burgundy-${heart.id}`} x1="20%" y1="10%" x2="85%" y2="95%">
                <stop offset="0%" stopColor="#FCE7F3" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#A81B5B" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#7A0C38" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#4A0520" stopOpacity="0.9" />
              </linearGradient>

              {/* Champagne Gold Gradient */}
              <linearGradient id={`heart-grad-champagne-${heart.id}`} x1="20%" y1="10%" x2="85%" y2="95%">
                <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#FDE68A" stopOpacity="0.85" />
                <stop offset="80%" stopColor="#D97706" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#92400E" stopOpacity="0.8" />
              </linearGradient>

              {/* Gold Gradient */}
              <linearGradient id={`heart-grad-gold-${heart.id}`} x1="25%" y1="10%" x2="85%" y2="90%">
                <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0.85" />
              </linearGradient>

              {/* Blush Gradient */}
              <linearGradient id={`heart-grad-blush-${heart.id}`} x1="20%" y1="10%" x2="80%" y2="90%">
                <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#FB7185" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E11D48" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Smooth Love / Heart Path */}
            <path
              d="M50 88 C20 62 4 44 4 27 C4 13 15 4 29 4 C37.5 4 45.5 8.5 50 15 C54.5 8.5 62.5 4 71 4 C85 4 96 13 96 27 C96 44 80 62 50 88 Z"
              fill={`url(#heart-grad-${heart.colorTheme}-${heart.id})`}
            />

            {/* Bubble 3D Glass Specular Highlight Curve on Top Left */}
            <path
              d="M24 12 C18 16 12 25 12 32 C12 34 14 34 15 32 C17 26 21 19 28 15 C30 14 29 11 24 12 Z"
              fill="white"
              opacity="0.85"
            />

            {/* Tiny Soft Specular Dot on Right Curve */}
            <circle cx="70" cy="18" r="3.5" fill="white" opacity="0.65" />

            {/* Optional center micro sparkle star for extra magic */}
            {heart.hasSparkle && (
              <path
                d="M50 36 Q50 44 58 44 Q50 44 50 52 Q50 44 42 44 Q50 44 50 36 Z"
                fill="#FFFBEB"
                opacity="0.9"
              />
            )}
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
