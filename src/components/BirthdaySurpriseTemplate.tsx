import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Sparkles, ExternalLink, X, Heart, Music, Volume2, VolumeX } from 'lucide-react';
import { audioController } from '../utils/audio';

interface BirthdaySurpriseTemplateProps {
  name?: string;
  isEmbedded?: boolean;
  onClose?: () => void;
  onOrder?: () => void;
}

const BALLOON_COLORS = [
  '#ff3d6e',
  '#d81b4a',
  '#e8c27a',
  '#ff6b4a',
  '#ff8fa8',
  '#ffb3c1',
  '#f59e0b',
  '#ec4899',
  '#d97706',
  '#e11d48'
];

const BALLOON_MESSAGES = [
  "You make people feel at home.",
  "Your laugh is the best sound.",
  "You are braver than you know.",
  "Thank you for always showing up.",
  "You're really good at this life thing.",
  "Your kindness is contagious.",
  "Somebody is very proud of you.",
  "You light up every room.",
  "The best is still ahead.",
  "You are deeply loved."
];

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    cap: "A memory worth keeping"
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    cap: "One of my favourite moments"
  },
  {
    src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
    cap: "Just us, being us"
  },
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    cap: "Where it all began"
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    cap: "A trip to remember"
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    cap: "Laughing until it hurt"
  }
];

const WISHES = [
  "May this year hand you more reasons to laugh than you can count.",
  "May every door you knock on open wider than you hoped.",
  "May you feel, every single day, how loved you are.",
  "May your coffee be hot and your plans work out.",
  "May you find joy in the small, ordinary moments.",
  "May this be your best year yet."
];

const WISH_ICONS = ['🎁', '💌', '✨', '🍀', '🌟', '🎀'];

export const BirthdaySurpriseTemplate: React.FC<BirthdaySurpriseTemplateProps> = ({
  name = "Ahnaf",
  isEmbedded = false,
  onClose,
  onOrder
}) => {
  // Intro / Countdown State
  const [countdown, setCountdown] = useState(15); // Quick demo countdown
  const [isCountdownEnded, setIsCountdownEnded] = useState(false);
  const [isIntroDismissed, setIsIntroDismissed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Balloons State
  const [poppedBalloons, setPoppedBalloons] = useState<Record<number, boolean>>({});
  const [currentBalloonMessage, setCurrentBalloonMessage] = useState<string>('');

  // Cake State
  const [isCakeCut, setIsCakeCut] = useState(false);

  // Gallery Lightbox State
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; cap: string } | null>(null);

  // Letter State
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [typedLetter, setTypedLetter] = useState('');

  // 3D Wishes Flip State
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // Countdown timer effect
  useEffect(() => {
    if (isCountdownEnded) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCountdownEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCountdownEnded]);

  // Audio Toggle
  const toggleMusic = () => {
    const isPlaying = audioController.toggleMusic('celebration');
    setIsPlayingAudio(isPlaying);
  };

  // Confetti trigger helper
  const triggerConfetti = (x = 0.5, y = 0.5) => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: BALLOON_COLORS,
      disableForReducedMotion: true
    });
  };

  const triggerGrandConfetti = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: BALLOON_COLORS
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: BALLOON_COLORS
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // Balloon Pop Handler
  const handlePopBalloon = (idx: number, e: React.MouseEvent) => {
    if (poppedBalloons[idx]) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left / window.innerWidth + rect.width / (2 * window.innerWidth);
    const y = rect.top / window.innerHeight + rect.height / (2 * window.innerHeight);
    triggerConfetti(x, y);

    setPoppedBalloons((prev) => {
      const next = { ...prev, [idx]: true };
      const poppedCount = Object.keys(next).length;
      if (poppedCount === BALLOON_MESSAGES.length) {
        setCurrentBalloonMessage("All popped! You make every day worth celebrating. 🎈");
        triggerGrandConfetti();
      } else {
        setCurrentBalloonMessage(BALLOON_MESSAGES[idx]);
      }
      return next;
    });
  };

  // Cut Cake Handler
  const handleCutCake = (e: React.MouseEvent) => {
    if (isCakeCut) return;
    setIsCakeCut(true);
    const rect = e.currentTarget.getBoundingClientRect();
    triggerConfetti(rect.left / window.innerWidth + 0.5 * (rect.width / window.innerWidth), 0.4);
    setTimeout(() => {
      triggerConfetti(0.5, 0.4);
    }, 400);
  };

  // Letter Open Handler
  const fullLetterText = `Another year, and I still get to know you.\n\nThank you for the laughter, the long talks, and the way you make ordinary days feel like occasions.\n\nToday is yours. Eat the cake. Take the photo. Make the wish.`;

  const handleOpenLetter = () => {
    if (isLetterOpen) return;
    setIsLetterOpen(true);
    triggerConfetti(0.5, 0.6);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedLetter(fullLetterText.slice(0, i));
      if (i >= fullLetterText.length) {
        clearInterval(interval);
      }
    }, 32);
  };

  // 3D Card Flip Handler
  const handleFlipCard = (idx: number, e: React.MouseEvent) => {
    if (flippedCards[idx]) return;
    setFlippedCards((prev) => ({ ...prev, [idx]: true }));
    const rect = e.currentTarget.getBoundingClientRect();
    triggerConfetti(rect.left / window.innerWidth + 0.1, rect.top / window.innerHeight);
  };

  const poppedCount = Object.keys(poppedBalloons).length;
  const totalBalloons = BALLOON_MESSAGES.length;

  return (
    <div className={`relative w-full ${isEmbedded ? 'h-full overflow-y-auto overscroll-contain' : 'min-h-screen'} bg-[#2a0610] text-[#fff3e6] font-sans selection:bg-[#ff3d6e] selection:text-white`}>
      {/* Dynamic Font Styling and Custom CSS */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 16px rgba(255, 61, 110, 0.5)); }
          50% { filter: drop-shadow(0 0 32px rgba(232, 194, 122, 0.8)); }
        }
        .perspective-900 { perspective: 900px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* Floating Audio / Sound Toggle */}
      <button
        onClick={toggleMusic}
        className={`${isEmbedded ? 'absolute top-3 right-3' : 'fixed top-4 right-4'} z-40 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-amber-200 backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg`}
        title="Toggle Music"
        aria-label="Toggle Celebration Music"
      >
        {isPlayingAudio ? <Volume2 className="w-4 h-4 text-[#ff3d6e]" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* STAGE 1: COUNTDOWN INTRO SCREEN */}
      {!isIntroDismissed && (
        <div 
          className={`${isEmbedded ? 'absolute inset-0' : 'fixed inset-0'} z-50 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#2a0610] via-[#8a1236] to-[#2a0610] transition-all duration-700`}
        >
          {/* Ambient radial blur */}
          <div className="absolute w-[340px] h-[340px] rounded-full bg-[#ff3d6e]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-md mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#e8c27a] uppercase font-sans">
              ✦ A Special Celebration Awaits ✦
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Something Special Is Waiting for You…
            </h1>

            <p className="text-sm sm:text-base text-rose-100/80 font-light max-w-sm mx-auto">
              Hold on tight. Good things take a moment.
            </p>

            {/* Countdown Display */}
            <div className="py-6 flex flex-col items-center">
              <div className="flex items-baseline gap-2 font-serif text-[#e8c27a]">
                <span className="text-6xl sm:text-8xl font-bold tracking-tight drop-shadow-[0_0_35px_rgba(232,194,122,0.5)]">
                  {countdown}
                </span>
                <span className="text-sm sm:text-base font-sans text-rose-200/70 uppercase tracking-widest">
                  seconds
                </span>
              </div>

              {!isCountdownEnded && (
                <button
                  onClick={() => {
                    setIsCountdownEnded(true);
                    setCountdown(0);
                  }}
                  className="mt-3 text-[11px] text-amber-300/80 hover:text-amber-200 underline cursor-pointer"
                >
                  Skip timer to open immediately ⚡
                </button>
              )}
            </div>

            {/* Open Button (appears on countdown finish or skip) */}
            {isCountdownEnded && (
              <button
                onClick={() => {
                  triggerConfetti();
                  setIsIntroDismissed(true);
                  if (!isPlayingAudio) {
                    setIsPlayingAudio(true);
                    audioController.toggleMusic('celebration');
                  }
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff3d6e] via-[#d81b4a] to-[#ff3d6e] hover:brightness-110 text-white text-base font-bold tracking-wider shadow-[0_10px_35px_rgba(255,61,110,0.55)] cursor-pointer active:scale-95 transition-all transform animate-bounce"
              >
                Open Your Surprise ✨
              </button>
            )}
          </div>
        </div>
      )}

      {/* MAIN CELEBRATION CONTAINER */}
      <main className="relative z-10">
        
        {/* SECTION 1: HERO */}
        <section className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 relative overflow-hidden bg-radial from-[#7a0f2e]/60 via-[#2a0610] to-[#2a0610]">
          {/* Floating celebratory icons */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <span className="absolute top-10 left-[15%] text-2xl text-[#ff3d6e] animate-pulse">♥</span>
            <span className="absolute top-24 right-[20%] text-xl text-[#e8c27a]">✦</span>
            <span className="absolute bottom-16 left-[25%] text-xl text-[#ff3d6e]">✦</span>
            <span className="absolute bottom-20 right-[15%] text-2xl text-[#e8c27a] animate-pulse">♥</span>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <div className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#e8c27a]">
              A celebration, just for you
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight">
              Happy Birthday, <span className="text-[#ff3d6e] drop-shadow-[0_0_25px_rgba(255,61,110,0.4)]">{name}!</span>
            </h1>

            <p className="text-base sm:text-lg text-[#fff3e6]/85 max-w-xl mx-auto leading-relaxed font-light">
              Another year of you, and the world is better for it. Today is entirely yours.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('balloons-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff3d6e] to-[#d81b4a] hover:brightness-110 text-white font-semibold tracking-wide text-sm sm:text-base shadow-[0_10px_30px_rgba(255,61,110,0.4)] cursor-pointer active:scale-95 transition-all"
              >
                Let the Celebration Begin
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: POP THE BALLOONS */}
        <section id="balloons-section" className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-white/10 bg-[#2a0610]">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#e8c27a] mb-2">
            01 · Pop the balloons
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-8">
            Every balloon hides something kind
          </h2>

          {/* Balloon Arena Stage */}
          <div className="relative w-full max-w-3xl h-[360px] sm:h-[420px] rounded-3xl bg-white/5 border border-white/10 p-4 mb-6 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-2 gap-2 p-4 items-center justify-items-center">
              {BALLOON_MESSAGES.map((msg, i) => {
                const isPopped = !!poppedBalloons[i];
                return (
                  <div key={i} className="relative flex flex-col items-center">
                    {!isPopped ? (
                      <button
                        onClick={(e) => handlePopBalloon(i, e)}
                        className="group relative cursor-pointer active:scale-90 transition-transform"
                        style={{
                          animation: `float-gentle ${3 + (i % 3) * 0.7}s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`
                        }}
                        aria-label={`Pop balloon ${i + 1}`}
                      >
                        {/* Balloon body */}
                        <div
                          className="w-12 h-16 sm:w-16 sm:h-20 rounded-[50%_50%_48%_48%/55%_55%_45%_45%] shadow-[inset_-6px_-8px_0_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.3)] relative group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: BALLOON_COLORS[i % BALLOON_COLORS.length] }}
                        >
                          {/* Highlight sheen */}
                          <div className="absolute top-2 left-2.5 w-3 h-4 rounded-full bg-white/40 rotate-[25deg]" />
                          {/* Knot */}
                          <div 
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 rounded-sm"
                            style={{ backgroundColor: BALLOON_COLORS[i % BALLOON_COLORS.length] }}
                          />
                        </div>
                        {/* String */}
                        <div className="w-[1px] h-8 bg-white/30 mx-auto" />
                      </button>
                    ) : (
                      <div className="w-12 h-16 sm:w-16 sm:h-20 flex items-center justify-center text-xs text-amber-200/50">
                        ✨
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Bar & Counter */}
          <div className="w-full max-w-xs space-y-2 mb-4">
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#ff3d6e] to-[#e8c27a] transition-all duration-300"
                style={{ width: `${(poppedCount / totalBalloons) * 100}%` }}
              />
            </div>
            <div className="text-xs text-[#e8c27a] font-mono tracking-wider">
              {poppedCount < totalBalloons ? `${totalBalloons - poppedCount} balloons remaining` : 'All popped! 🎉'}
            </div>
          </div>

          {/* Affirmation Message Display */}
          <div className="min-h-[3.5rem] max-w-md mx-auto text-center px-4">
            <p className="text-lg sm:text-xl font-serif text-[#e8c27a] italic transition-opacity">
              {currentBalloonMessage || 'Tap on any balloon above to pop it and reveal a message!'}
            </p>
          </div>
        </section>

        {/* SECTION 3: CUT THE CAKE */}
        <section className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-white/10 bg-radial from-[#7a0f2e]/40 via-[#2a0610] to-[#2a0610]">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#e8c27a] mb-2">
            02 · Make a wish
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-8">
            Make a Wish and Cut the Cake!
          </h2>

          <div className="relative max-w-sm w-full mx-auto flex flex-col items-center">
            <button
              onClick={handleCutCake}
              className="relative cursor-pointer group active:scale-95 transition-transform"
              aria-label="Cut the birthday cake"
            >
              <svg 
                viewBox="0 0 300 270" 
                className="w-72 sm:w-80 h-auto overflow-visible drop-shadow-[0_0_35px_rgba(255,61,110,0.35)]"
              >
                <defs>
                  <clipPath id="cake-clip-left">
                    <rect x="-40" y="-20" width="190" height="320" />
                  </clipPath>
                  <clipPath id="cake-clip-right">
                    <rect x="150" y="-20" width="190" height="320" />
                  </clipPath>
                  <g id="cake-graphics">
                    {/* Cake Plate */}
                    <ellipse cx="150" cy="248" rx="140" ry="14" fill="#ffffff22" />
                    {/* Bottom tier */}
                    <rect x="30" y="170" width="240" height="74" rx="14" fill="#ff3d6e" />
                    {/* Middle tier */}
                    <rect x="55" y="112" width="190" height="62" rx="12" fill="#d81b4a" />
                    {/* Top tier */}
                    <rect x="80" y="60" width="140" height="56" rx="12" fill="#fff3e6" />
                    {/* Frosting drips */}
                    <path d="M30 184q20 18 40 0t40 0t40 0t40 0t40 0t40 0v-14H30z" fill="#fff3e6" />
                    <path d="M55 126q15 16 30 0t30 0t30 0t30 0t30 0v-14H55z" fill="#fff3e6" />
                    {/* Sprinkles */}
                    <g fill="#e8c27a">
                      <circle cx="60" cy="215" r="4" /><circle cx="110" cy="225" r="4" />
                      <circle cx="170" cy="212" r="4" /><circle cx="220" cy="224" r="4" />
                      <circle cx="90" cy="150" r="3" /><circle cx="200" cy="145" r="3" />
                    </g>
                    {/* Candles */}
                    <g fill="#a50f3a">
                      <rect x="112" y="30" width="10" height="32" rx="2" />
                      <rect x="145" y="26" width="10" height="36" rx="2" />
                      <rect x="178" y="30" width="10" height="32" rx="2" />
                    </g>
                  </g>
                </defs>

                {/* Left slice of cake (splits on cut) */}
                <g 
                  clipPath="url(#cake-clip-left)"
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: isCakeCut ? 'translate(-24px, 4px) rotate(-4deg)' : 'none',
                    transformOrigin: '80px 250px'
                  }}
                >
                  <use href="#cake-graphics" />
                </g>

                {/* Right slice of cake (splits on cut) */}
                <g 
                  clipPath="url(#cake-clip-right)"
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: isCakeCut ? 'translate(24px, 4px) rotate(4deg)' : 'none',
                    transformOrigin: '220px 250px'
                  }}
                >
                  <use href="#cake-graphics" />
                </g>

                {/* Candle Flames */}
                {!isCakeCut ? (
                  <g fill="#ffb347" className="animate-pulse">
                    <ellipse cx="117" cy="18" rx="6" ry="11" />
                    <ellipse cx="150" cy="14" rx="6" ry="11" />
                    <ellipse cx="183" cy="18" rx="6" ry="11" />
                  </g>
                ) : (
                  <g fill="#ffffff66" className="transition-opacity duration-300">
                    <circle cx="117" cy="14" r="3" />
                    <circle cx="150" cy="10" r="3" />
                    <circle cx="183" cy="14" r="3" />
                  </g>
                )}

                {/* Knife line animation */}
                <line 
                  x1="150" 
                  y1="0" 
                  x2="150" 
                  y2="250" 
                  stroke="#e8c27a" 
                  strokeWidth="3.5" 
                  strokeDasharray="260"
                  strokeDashoffset={isCakeCut ? "0" : "260"}
                  className="transition-all duration-500 ease-in"
                  opacity={isCakeCut ? 0.3 : 1}
                />
              </svg>

              {!isCakeCut && (
                <div className="mt-3 text-xs text-[#e8c27a] font-medium tracking-wide">
                  👆 Tap the cake to blow candles &amp; slice
                </div>
              )}
            </button>

            {/* Cake Wish Message */}
            <div className="min-h-[4rem] mt-4 px-4 text-center">
              {isCakeCut && (
                <p className="text-lg sm:text-xl font-serif text-[#e8c27a] italic animate-in fade-in slide-in-from-bottom-2 duration-700">
                  May every wish you made come true this year — and a few you forgot to make. 💖
                </p>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: MEMORY GALLERY */}
        <section className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-white/10 bg-[#2a0610]">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#e8c27a] mb-2">
            03 · Memories
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-10">
            A Special Memory Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mx-auto">
            {PHOTOS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxPhoto(p)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/10 bg-white/5 transition-transform duration-300 hover:scale-[1.03] hover:-rotate-1"
                aria-label={`Open photo: ${p.cap}`}
              >
                <img 
                  src={p.src} 
                  alt={p.cap} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 text-left">
                  <span className="text-xs sm:text-sm text-white/95 font-medium">
                    {p.cap}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxPhoto && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
              onClick={() => setLightboxPhoto(null)}
            >
              <div 
                className="relative max-w-2xl w-full bg-[#2a0610] rounded-2xl overflow-hidden border border-white/20 shadow-2xl p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightboxPhoto(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <img 
                  src={lightboxPhoto.src} 
                  alt={lightboxPhoto.cap} 
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
                />
                <p className="text-center py-4 text-sm font-medium text-[#e8c27a]">
                  {lightboxPhoto.cap}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 5: BIRTHDAY LETTER */}
        <section className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-white/10 bg-radial from-[#7a0f2e]/40 via-[#2a0610] to-[#2a0610]">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#e8c27a] mb-2">
            04 · A letter
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-8">
            A Heartfelt Birthday Letter
          </h2>

          {!isLetterOpen ? (
            <div className="flex flex-col items-center gap-6">
              {/* Wax Envelope Representation */}
              <div className="relative w-64 sm:w-80 h-44 bg-[#a50f3a] rounded-xl shadow-2xl overflow-hidden border border-white/15">
                {/* Flap triangle */}
                <div 
                  className="absolute inset-x-0 top-0 h-24 bg-[#d81b4a] shadow-md origin-top"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
                {/* Golden Wax Seal */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#e8c27a] to-[#b38636] border-2 border-amber-300 shadow-md flex items-center justify-center text-amber-950 font-serif font-bold text-lg">
                  W
                </div>
              </div>

              <button
                onClick={handleOpenLetter}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ff3d6e] to-[#d81b4a] hover:brightness-110 text-white font-semibold text-sm shadow-lg cursor-pointer active:scale-95 transition-all"
              >
                Open Your Letter 💌
              </button>
            </div>
          ) : (
            <div className="max-w-xl w-full mx-auto p-6 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-500">
              <h3 className="font-serif text-2xl text-[#e8c27a] mb-4">
                Dear {name},
              </h3>
              <p className="text-base sm:text-lg text-[#fff3e6] leading-relaxed whitespace-pre-wrap min-h-[9rem] font-light">
                {typedLetter}
              </p>
              <div className="mt-6 text-right font-serif text-xl sm:text-2xl text-[#e8c27a] italic">
                — With all my love
              </div>
            </div>
          )}
        </section>

        {/* SECTION 6: LITTLE SURPRISES (3D FLIP CARDS) */}
        <section className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-white/10 bg-[#2a0610]">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#e8c27a] mb-2">
            05 · Little surprises
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-10">
            Tap to reveal a surprise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
            {WISHES.map((wish, idx) => {
              const isFlipped = !!flippedCards[idx];
              return (
                <div 
                  key={idx}
                  onClick={(e) => handleFlipCard(idx, e)}
                  className="h-44 perspective-900 cursor-pointer"
                >
                  <div 
                    className={`relative w-full h-full preserve-3d transition-transform duration-700 rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}
                  >
                    {/* Front: Gift Icon */}
                    <div className="absolute inset-0 backface-hidden flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-[#ff3d6e] to-[#a50f3a] shadow-xl border border-white/20 text-4xl hover:brightness-105 transition-all">
                      <span>{WISH_ICONS[idx % WISH_ICONS.length]}</span>
                    </div>

                    {/* Back: Revealed Secret Wish */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-5 rounded-2xl bg-[#fff3e6] text-[#4a0a1c] shadow-xl font-serif text-sm sm:text-base leading-snug text-center border border-amber-200">
                      <p>"{wish}"</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: GRAND FINALE */}
        <section className="py-24 px-4 sm:px-6 flex flex-col items-center text-center border-t border-white/10 bg-radial from-[#7a0f2e]/60 via-[#2a0610] to-[#2a0610]">
          <div className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#e8c27a] mb-3">
            The grand finale
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight bg-gradient-to-r from-[#e8c27a] via-[#ff3d6e] to-[#e8c27a] bg-clip-text text-transparent mb-4 animate-pulse">
            Happy Birthday!
          </h2>

          <p className="text-base sm:text-lg text-rose-100/90 max-w-md mx-auto mb-8 font-light">
            Here's to you, today and every day after.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={triggerGrandConfetti}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff3d6e] to-[#d81b4a] hover:brightness-110 text-white font-bold tracking-wide text-sm sm:text-base shadow-[0_12px_35px_rgba(255,61,110,0.5)] cursor-pointer active:scale-95 transition-all"
            >
              Celebrate Again 🎉
            </button>

            {onOrder && (
              <button
                onClick={onOrder}
                className="px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base border border-white/25 cursor-pointer active:scale-95 transition-all"
              >
                Customize for Someone Special
              </button>
            )}
          </div>
        </section>

      </main>
    </div>
  );
};
