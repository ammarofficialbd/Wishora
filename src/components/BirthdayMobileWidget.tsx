import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronDown, RotateCcw, Volume2, VolumeX, Image as ImageIcon, Send } from 'lucide-react';
import { audioController } from '../utils/audio';

interface BirthdayMobileWidgetProps {
  name?: string;
  senderName?: string;
  accentColor?: string;
  onCustomize?: () => void;
}

export const BirthdayMobileWidget: React.FC<BirthdayMobileWidgetProps> = ({
  name = 'Ayaan',
  senderName = 'Wishora Family',
  accentColor = '#831843',
  onCustomize,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [envOpen, setEnvOpen] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [candlesOut, setCandlesOut] = useState([false, false, false, false, false]);
  const [cardFlips, setCardFlips] = useState([false, false, false]);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterHeadRef = useRef<HTMLDivElement>(null);
  const lastScratchPos = useRef<{ x: number; y: number } | null>(null);

  // Isolate wheel scrolling so background page never scrolls when hovering the widget
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      const isAtTop = scrollTop <= 0 && e.deltaY < 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      if (!isAtTop && !isAtBottom) {
        e.preventDefault();
        scroller.scrollTop += e.deltaY;
      } else {
        // Prevent body scroll leak at the boundaries
        e.preventDefault();
      }
    };

    scroller.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      scroller.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Trigger confetti burst
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#E9C98C', '#C9A25B', '#F2C4D2', '#FBEFE9', accentColor, '#BE185D'],
      });
    } catch {}
  };

  // Scroll listener inside the simulator
  const handleScroll = () => {
    if (scrollerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollerRef.current;
      const total = Math.max(1, scrollHeight - clientHeight);
      setScrollProgress(Math.min(100, Math.round((scrollTop / total) * 100)));
    }
  };

  // Scroll to Letter Section
  const scrollToLetter = () => {
    if (letterHeadRef.current && scrollerRef.current) {
      const topPos = letterHeadRef.current.offsetTop;
      scrollerRef.current.scrollTo({ top: topPos - 10, behavior: 'smooth' });
    }
  };

  // Toggle Envelope
  const handleToggleEnvelope = () => {
    if (!envOpen) {
      audioController.playWaxSealPop();
    }
    setEnvOpen(!envOpen);
  };

  // Toggle Music
  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playing = audioController.toggleMusic('flute');
    setIsPlayingMusic(playing);
  };

  // Candle blowing
  const blowCandle = (index: number) => {
    if (candlesOut[index]) return;
    audioController.playPopEffect();
    const next = [...candlesOut];
    next[index] = true;
    setCandlesOut(next);

    if (next.every(Boolean)) {
      setTimeout(() => {
        triggerConfetti();
      }, 350);
    }
  };

  const relightCandles = () => {
    audioController.playWaxSealPop();
    setCandlesOut([false, false, false, false, false]);
  };

  // Card flip
  const toggleFlip = (index: number) => {
    audioController.playPopEffect();
    const next = [...cardFlips];
    next[index] = !next[index];
    setCardFlips(next);
  };

  // Replay from start
  const handleReplay = () => {
    setEnvOpen(false);
    setScratched(false);
    setCandlesOut([false, false, false, false, false]);
    setCardFlips([false, false, false]);
    paintCanvasFoil();
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Canvas Scratch Paint
  const paintCanvasFoil = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    ctx.globalCompositeOperation = 'source-over';
    
    // Gradient Foil
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#5B0F33');
    grad.addColorStop(0.35, '#831843');
    grad.addColorStop(0.5, '#BE185D');
    grad.addColorStop(0.65, '#831843');
    grad.addColorStop(1, '#4A0520');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Gold sparkles
    ctx.fillStyle = 'rgba(233, 201, 140, 0.45)';
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 1.6 + 0.4;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border dashed line
    ctx.strokeStyle = 'rgba(233, 201, 140, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(8, 8, W - 16, H - 16);
    ctx.setLineDash([]);

    // Text Label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFDF7';
    ctx.font = 'italic 500 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Scratch Me ✦', W / 2, H / 2 - 10);

    ctx.fillStyle = 'rgba(255, 240, 246, 0.9)';
    ctx.font = '600 9px system-ui, sans-serif';
    ctx.fillText('DRAG FINGER OR MOUSE TO REVEAL', W / 2, H / 2 + 18);
  };

  useEffect(() => {
    paintCanvasFoil();
  }, [accentColor]);

  // Scratch handling
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || scratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 32;

    ctx.beginPath();
    if (lastScratchPos.current) {
      ctx.moveTo(lastScratchPos.current.x, lastScratchPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    lastScratchPos.current = { x, y };

    // Check transparency ratio occasionally
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clearCount = 0;
      let totalCount = 0;
      for (let i = 3; i < imgData.length; i += 40) {
        totalCount++;
        if (imgData[i] < 20) clearCount++;
      }
      if (clearCount / totalCount > 0.42) {
        setScratched(true);
        triggerConfetti();
      }
    } catch {}
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scratched) return;
    setIsScratching(true);
    lastScratchPos.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching || scratched) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    lastScratchPos.current = null;
  };

  const allCandlesOut = candlesOut.every(Boolean);
  const outCount = candlesOut.filter(Boolean).length;

  return (
    <div className="relative w-full h-full bg-[#FBF4F1] text-[#2A0A18] flex flex-col select-none overflow-hidden font-sans">
      {/* Scroll Progress Bar at top */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#E9C98C] via-[#F2C4D2] to-[#831843] z-40 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Ambient Music & Sound Button */}
      <div className="absolute top-3 right-3 z-40 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          className="p-2 rounded-full bg-white/90 hover:bg-white text-[#2A0A18] shadow-md border border-[#E9C98C]/60 transition-transform active:scale-90"
          title={isPlayingMusic ? 'Mute Music' : 'Play Celebration Music'}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#831843]" />
          )}
        </button>
      </div>

      {/* Internal Smooth Scroll Container */}
      <div 
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth overscroll-contain touch-pan-y"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        {/* ================= HERO SECTION ================= */}
        <section 
          className="relative min-h-[520px] sm:min-h-[580px] p-6 flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            background: `linear-gradient(145deg, #4A0520 0%, ${accentColor} 50%, #2A0A18 100%)`,
          }}
        >
          {/* Circular Luxury Orbit Rings */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-[#E9C98C]/20 pointer-events-none" />
          <div className="absolute w-[260px] h-[260px] rounded-full border border-[#E9C98C]/15 pointer-events-none" />

          {/* Floating Helium Balloons */}
          <div className="absolute left-4 top-10 pointer-events-none animate-bounce duration-1000">
            <div className="w-12 h-14 rounded-[50%_50%_48%_52%/55%_55%_45%_45%] bg-[#F2C4D2] shadow-inner relative">
              <div className="absolute left-2.5 top-2 w-2.5 h-4 rounded-full bg-white/60 rotate-20" />
            </div>
            <div className="w-2 h-1.5 mx-auto -mt-0.5 bg-[#F2C4D2] clip-triangle" />
          </div>

          <div className="absolute right-4 top-16 pointer-events-none animate-pulse">
            <div className="w-14 h-16 rounded-[50%_50%_48%_52%/55%_55%_45%_45%] bg-[#D9B26F] shadow-inner relative">
              <div className="absolute left-3 top-2.5 w-3 h-5 rounded-full bg-white/60 rotate-20" />
            </div>
            <div className="w-2 h-1.5 mx-auto -mt-0.5 bg-[#D9B26F] clip-triangle" />
          </div>

          <div className="absolute left-6 bottom-12 pointer-events-none">
            <div className="w-10 h-12 rounded-[50%_50%_48%_52%/55%_55%_45%_45%] bg-[#FBEFE9] shadow-inner relative">
              <div className="absolute left-2 top-1.5 w-2 h-3.5 rounded-full bg-white/80 rotate-20" />
            </div>
          </div>

          {/* Sparkles */}
          <Sparkles className="absolute left-10 top-24 w-4 h-4 text-[#E9C98C] animate-pulse" />
          <Sparkles className="absolute right-12 top-48 w-5 h-5 text-[#FBEFE9] animate-pulse delay-300" />
          <Sparkles className="absolute left-8 bottom-32 w-3.5 h-3.5 text-[#E9C98C] animate-pulse delay-700" />

          {/* Hero Typography */}
          <div className="relative z-10 flex flex-col items-center gap-3 max-w-[280px]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#E9C98C] font-semibold">
              ✦ Special Birthday Celebration ✦
            </div>

            <h1 className="font-serif-luxury italic text-5xl sm:text-6xl text-[#FBEFE9] leading-[0.9] font-normal tracking-tight">
              Happy<br />Birthday
            </h1>

            <div className="font-serif-luxury italic text-3xl font-medium text-[#E9C98C]">
              {name}
            </div>

            <p className="text-xs font-light text-[#FBEFE9]/85 leading-relaxed mt-1">
              A bespoke digital wonderland crafted with love, memories, and surprises.
            </p>

            <button
              onClick={scrollToLetter}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#FBEFE9] hover:bg-white text-[#831843] text-xs font-bold tracking-wider uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>সারপ্রাইজটি খুলুন</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#831843]" />
            </button>
          </div>

          {/* Down Indicator */}
          <div className="absolute bottom-4 flex flex-col items-center text-[#FBEFE9]/60 text-[9px] uppercase tracking-widest gap-1 animate-bounce">
            <span>Scroll</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </section>

        {/* ================= MARQUEE 1 ================= */}
        <div className="bg-[#2A0A18] py-3 overflow-hidden whitespace-nowrap text-[#E9C98C] text-sm font-serif-luxury italic border-y border-[#E9C98C]/30 flex gap-6 items-center animate-marquee-left">
          <span>Happy Birthday</span>
          <span>✦</span>
          <span>Make a Wish</span>
          <span>✦</span>
          <span>Cherish Every Moment</span>
          <span>✦</span>
          <span>Cheers to Another Year</span>
          <span>✦</span>
          <span>Happy Birthday</span>
          <span>✦</span>
          <span>Make a Wish</span>
        </div>

        {/* ================= 01: A LETTER SECTION ================= */}
        <section 
          ref={letterHeadRef}
          className="p-6 py-10 bg-[#FBF4F1] flex flex-col items-center text-center gap-5"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#8A6A2F]">
              01 — A Heartfelt Letter
            </span>
            <h2 className="font-serif-luxury italic text-3xl text-[#2A0A18] font-bold">
              Before anything else, read this
            </h2>
          </div>

          {/* Interactive Envelope */}
          <div 
            onClick={handleToggleEnvelope}
            className="relative w-[260px] h-[160px] cursor-pointer group mt-4 transition-transform hover:scale-[1.02] active:scale-98"
          >
            {/* Envelope Back Base */}
            <div className="absolute inset-0 rounded-2xl bg-[#4A0520] shadow-xl border border-[#7A0C38]" />

            {/* Letter Paper that slides out */}
            <div 
              className={`absolute left-3 right-3 top-2 h-[140px] rounded-xl bg-[#FFFDF9] p-3 flex flex-col gap-1.5 transition-transform duration-700 ${
                envOpen ? '-translate-y-24 shadow-2xl z-20' : 'translate-y-0 z-0'
              }`}
            >
              <span className="font-serif-luxury italic text-sm font-bold text-[#831843]">
                Dear {name},
              </span>
              <div className="w-full h-[1px] bg-rose-100" />
              <div className="w-4/5 h-[1px] bg-rose-100" />
              <div className="w-full h-[1px] bg-rose-100" />
              <div className="w-3/5 h-[1px] bg-rose-100" />
            </div>

            {/* Envelope Front Pocket */}
            <div 
              className="absolute inset-0 rounded-2xl bg-[#831843] z-10"
              style={{
                clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)',
              }}
            />

            {/* Envelope Flap (Opens up) */}
            <div 
              className={`absolute left-0 top-0 w-full h-[90px] bg-[#9D174D] z-30 rounded-t-2xl transition-transform duration-500 origin-top ${
                envOpen ? '-rotate-180 -translate-y-full opacity-60' : 'rotate-0'
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Wax Seal / Tap Indicator */}
            {!envOpen && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-gradient-to-tr from-[#92400E] to-[#F59E0B] shadow-lg flex items-center justify-center border-2 border-white/40 animate-pulse">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
            )}
          </div>

          <p className="text-[10px] text-[#6B4A57] uppercase tracking-widest mt-1">
            {envOpen ? 'Tap envelope to close' : '✨ Tap the golden wax seal to open'}
          </p>

          {/* Unfolded Full Letter Card */}
          {envOpen && (
            <div className="w-full max-w-[300px] p-5 rounded-2xl bg-white shadow-xl border border-rose-100 text-left flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4">
              <div className="font-serif-luxury italic text-xl font-bold text-[#831843]">
                Dear {name},
              </div>
              <p className="text-xs text-[#4A2A37] leading-relaxed font-light">
                Another year of your beautiful smile, and the world is infinitely brighter for it. Thank you for the laughter, the unforgettable memories, and the warmth you bring into every room.
              </p>
              <p className="text-xs text-[#4A2A37] leading-relaxed font-light">
                Today is entirely about you. Keep scrolling down — the best surprises are just ahead!
              </p>
              <div className="font-serif-luxury italic text-sm text-[#2A0A18] font-semibold text-right pt-1">
                — With love, {senderName}
              </div>
            </div>
          )}
        </section>

        {/* ================= 02: MEMORIES SECTION ================= */}
        <section className="p-6 py-10 bg-[#F6E3E8] flex flex-col gap-6">
          <div className="text-center">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#8A6A2F]">
              02 — Memory Chapters
            </span>
            <h2 className="font-serif-luxury italic text-3xl text-[#2A0A18] font-bold mt-0.5">
              A few favourite moments
            </h2>
          </div>

          {/* Polaroid 1: Left Tilted */}
          <div className="self-start transform -rotate-3 hover:rotate-0 transition-transform">
            <div className="w-[210px] p-2.5 pb-4 bg-white rounded-xl shadow-md flex flex-col gap-2 border border-stone-200">
              <div className="h-[150px] rounded-lg bg-[#EFD3DC] overflow-hidden flex items-center justify-center relative">
                <img 
                  src="/assets/wishora-birth-template.jpg" 
                  alt="Where it began"
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#831843] bg-[#EFD3DC]/40">
                  <ImageIcon className="w-5 h-5 mb-1 text-[#831843]" />
                  <span className="text-[9px] uppercase tracking-wider font-semibold">1st Birthday Story</span>
                </div>
              </div>
              <span className="font-serif-luxury italic text-sm text-center text-[#2A0A18] font-bold">
                Where the magic began
              </span>
            </div>
          </div>

          {/* Polaroid 2: Right Tilted */}
          <div className="self-end transform rotate-3 hover:rotate-0 transition-transform">
            <div className="w-[210px] p-2.5 pb-4 bg-white rounded-xl shadow-md flex flex-col gap-2 border border-stone-200">
              <div className="h-[150px] rounded-lg bg-[#FBEFE9] overflow-hidden flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80" 
                  alt="Celebration memories"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-2">
                  <span className="text-[10px] text-white font-medium">Sweet moments</span>
                </div>
              </div>
              <span className="font-serif-luxury italic text-sm text-center text-[#2A0A18] font-bold">
                Laughter &amp; Joy
              </span>
            </div>
          </div>

          {/* Polaroid 3: Center Tilted */}
          <div className="self-center transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="w-[210px] p-2.5 pb-4 bg-white rounded-xl shadow-md flex flex-col gap-2 border border-stone-200">
              <div className="h-[150px] rounded-lg bg-[#EAE0D5] overflow-hidden flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80" 
                  alt="Party memories"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-2">
                  <span className="text-[10px] text-white font-medium">Golden memories</span>
                </div>
              </div>
              <span className="font-serif-luxury italic text-sm text-center text-[#2A0A18] font-bold">
                Unforgettable Milestone
              </span>
            </div>
          </div>
        </section>

        {/* ================= 03: SCRATCH CARD SECTION ================= */}
        <section 
          className="p-6 py-10 flex flex-col items-center text-center gap-5"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #4A0520 100%)`,
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#E9C98C]">
              03 — A Little Surprise
            </span>
            <h2 className="font-serif-luxury italic text-3xl text-[#FBEFE9] font-bold">
              Scratch to reveal your gift
            </h2>
          </div>

          {/* Scratch Card Container */}
          <div className="relative w-[280px] h-[170px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E9C98C]/40">
            {/* Prize Behind */}
            <div className="absolute inset-0 bg-[#FFFDF9] p-4 flex flex-col items-center justify-center text-center gap-1.5 border border-[#E9C98C]">
              <span className="text-[9px] tracking-widest uppercase font-bold text-[#8A6A2F]">
                Your Birthday Gift
              </span>
              <div className="font-serif-luxury italic text-2xl font-bold text-[#831843]">
                ✦ Special Celebration Treat ✦
              </div>
              <p className="text-[11px] text-[#6B4A57]">
                Redeemable with loved ones today!
              </p>
            </div>

            {/* Interactive Canvas Overlay */}
            <canvas
              ref={canvasRef}
              width={280}
              height={170}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
                scratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            />
          </div>

          {!scratched ? (
            <p className="text-[10px] text-[#FBEFE9]/85 uppercase tracking-widest flex items-center gap-1.5">
              <span>✦</span>
              <span>Rub your finger or mouse over the card</span>
              <span>✦</span>
            </p>
          ) : (
            <div className="font-serif-luxury italic text-xl text-[#E9C98C] font-semibold animate-in fade-in duration-300">
              Surprise unlocked! Enjoy every moment.
            </div>
          )}
        </section>

        {/* ================= 04: MAKE A WISH (CAKE & CANDLES) ================= */}
        <section className="p-6 py-10 bg-[#FBF4F1] flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#8A6A2F]">
              04 — Make a Wish
            </span>
            <h2 className="font-serif-luxury italic text-3xl text-[#2A0A18] font-bold">
              Close your eyes &amp; blow the candles
            </h2>
          </div>

          {/* Birthday Cake with 5 Candles */}
          <div className="relative flex flex-col items-center mt-2">
            {/* Candles Row */}
            <div className="flex items-end justify-center gap-2 mb-[-3px] z-10">
              {candlesOut.map((isOut, idx) => (
                <button
                  key={idx}
                  onClick={() => blowCandle(idx)}
                  className="relative flex flex-col items-center cursor-pointer p-1 group active:scale-90 transition-transform"
                  title={isOut ? 'Candle is blown out' : 'Tap to blow out candle'}
                >
                  {/* Flame or Smoke */}
                  {!isOut ? (
                    <div className="w-3.5 h-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-[#FF8A3D] via-[#FFC85C] to-[#FFF8E1] shadow-[0_0_12px_rgba(255,180,60,0.8)] animate-pulse" />
                  ) : (
                    <div className="w-2 h-5 rounded-full bg-stone-400/40 blur-[1px] animate-bounce -translate-y-2 opacity-60" />
                  )}

                  {/* Wick */}
                  <div className="w-[1.5px] h-2 bg-neutral-900" />

                  {/* Candle Body */}
                  <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-b from-[#FFFDF7] to-[#E9C98C] border border-amber-300/40" />
                </button>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div 
              className="relative w-[180px] h-[50px] rounded-t-2xl overflow-hidden shadow-md"
              style={{ backgroundColor: accentColor }}
            >
              <div className="absolute top-0 left-0 right-0 h-3 bg-[#FBEFE9] rounded-b-md" />
              {/* Dripping frosting scallops */}
              <div className="absolute top-2 left-3 w-3.5 h-4 bg-[#FBEFE9] rounded-b-full" />
              <div className="absolute top-2 left-12 w-4 h-6 bg-[#FBEFE9] rounded-b-full" />
              <div className="absolute top-2 left-24 w-3.5 h-4 bg-[#FBEFE9] rounded-b-full" />
              <div className="absolute top-2 left-36 w-4 h-5 bg-[#FBEFE9] rounded-b-full" />
            </div>

            {/* Cake Bottom Tier */}
            <div className="relative w-[230px] h-[65px] rounded-b-xl bg-[#F2C4D2] flex items-center justify-center gap-3 shadow-lg border-t-2 border-white/50">
              <div className="w-2.5 h-2.5 rounded-full bg-[#831843]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D9B26F]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#831843]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D9B26F]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#831843]" />
            </div>

            {/* Plate Base */}
            <div className="w-[260px] h-3.5 rounded-full bg-stone-300 shadow-md -mt-1.5" />
          </div>

          {!allCandlesOut ? (
            <p className="text-[10px] text-[#6B4A57] uppercase tracking-widest">
              Tap each flame to blow · {outCount} of 5 blown out
            </p>
          ) : (
            <div className="flex flex-col items-center gap-3 animate-in fade-in duration-500">
              <div className="font-serif-luxury italic text-2xl text-[#831843] font-bold">
                🎉 Your birthday wish is on its way!
              </div>
              <button
                onClick={relightCandles}
                className="px-5 py-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold uppercase tracking-wider shadow-xs cursor-pointer active:scale-95"
              >
                Light candles again
              </button>
            </div>
          )}
        </section>

        {/* ================= 05: THREE WISHES FLIP CARDS ================= */}
        <section className="p-6 py-10 bg-[#F6E3E8] flex flex-col items-center text-center gap-4">
          <div className="mb-2">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#8A6A2F]">
              05 — For The Year Ahead
            </span>
            <h2 className="font-serif-luxury italic text-3xl text-[#2A0A18] font-bold mt-0.5">
              Three wishes, just for you
            </h2>
          </div>

          {/* Wish Card 1 */}
          <div 
            onClick={() => toggleFlip(0)}
            className="w-full max-w-[300px] h-[115px] cursor-pointer perspective-1000 select-none"
          >
            <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${cardFlips[0] ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div 
                className="absolute inset-0 rounded-2xl p-4 flex items-center justify-between shadow-md backface-hidden"
                style={{ backgroundColor: accentColor }}
              >
                <span className="font-serif-luxury italic text-4xl text-[#E9C98C] font-bold">
                  i.
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FBEFE9]/90">
                  Tap to open ✦
                </span>
              </div>
              {/* Back */}
              <div className="absolute inset-0 rounded-2xl p-4 bg-white shadow-md flex items-center justify-center text-left rotate-y-180 backface-hidden border border-rose-100">
                <p className="font-serif-luxury italic text-sm font-semibold text-[#2A0A18] leading-snug">
                  May this year hand you more reasons to laugh, love, and smile than you can count.
                </p>
              </div>
            </div>
          </div>

          {/* Wish Card 2 */}
          <div 
            onClick={() => toggleFlip(1)}
            className="w-full max-w-[300px] h-[115px] cursor-pointer perspective-1000 select-none"
          >
            <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${cardFlips[1] ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className="absolute inset-0 rounded-2xl p-4 bg-[#2A0A18] flex items-center justify-between shadow-md backface-hidden">
                <span className="font-serif-luxury italic text-4xl text-[#E9C98C] font-bold">
                  ii.
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FBEFE9]/90">
                  Tap to open ✦
                </span>
              </div>
              {/* Back */}
              <div className="absolute inset-0 rounded-2xl p-4 bg-white shadow-md flex items-center justify-center text-left rotate-y-180 backface-hidden border border-rose-100">
                <p className="font-serif-luxury italic text-sm font-semibold text-[#2A0A18] leading-snug">
                  May every door you knock on open a little wider than you ever dreamed.
                </p>
              </div>
            </div>
          </div>

          {/* Wish Card 3 */}
          <div 
            onClick={() => toggleFlip(2)}
            className="w-full max-w-[300px] h-[115px] cursor-pointer perspective-1000 select-none"
          >
            <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${cardFlips[2] ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className="absolute inset-0 rounded-2xl p-4 bg-[#C9A25B] flex items-center justify-between shadow-md backface-hidden">
                <span className="font-serif-luxury italic text-4xl text-[#2A0A18] font-bold">
                  iii.
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#2A0A18]/90">
                  Tap to open ✦
                </span>
              </div>
              {/* Back */}
              <div className="absolute inset-0 rounded-2xl p-4 bg-white shadow-md flex items-center justify-center text-left rotate-y-180 backface-hidden border border-rose-100">
                <p className="font-serif-luxury italic text-sm font-semibold text-[#2A0A18] leading-snug">
                  May you feel, every single day, just how deeply and truly you are cherished.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MARQUEE 2 ================= */}
        <div className="bg-[#C9A25B] py-3 overflow-hidden whitespace-nowrap text-[#2A0A18] text-xs font-bold tracking-widest uppercase border-y border-amber-600/30 flex gap-6 items-center animate-marquee-left">
          <span>Cheers to you</span>
          <span>•</span>
          <span>Another trip around the sun</span>
          <span>•</span>
          <span>Cheers to you</span>
          <span>•</span>
          <span>Another trip around the sun</span>
        </div>

        {/* ================= FOOTER ================= */}
        <section className="p-6 py-12 bg-[#2A0A18] flex flex-col items-center text-center gap-4 text-[#FBEFE9]">
          <Sparkles className="w-6 h-6 text-[#E9C98C]" />
          <h3 className="font-serif-luxury italic text-4xl leading-tight font-bold">
            Happy Birthday,<br />
            <span className="text-[#E9C98C]">{name}.</span>
          </h3>
          <p className="text-xs font-light text-[#FBEFE9]/80 max-w-[240px]">
            Here is to celebrating you today and every single day after.
          </p>
          <div className="font-serif-luxury italic text-base text-[#E9C98C]">
            With all our love, {senderName}
          </div>

          <button
            onClick={handleReplay}
            className="mt-4 px-6 py-2.5 rounded-full border border-[#E9C98C] text-[#E9C98C] hover:bg-[#E9C98C] hover:text-[#2A0A18] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>শুরু থেকে পুনরায় দেখুন</span>
          </button>
        </section>
      </div>
    </div>
  );
};
