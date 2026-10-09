import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, Sparkles, X, Heart, Volume2, VolumeX, Edit3, 
  Palette, Camera, Upload, RotateCcw, Check, Plus, Trash2, 
  ChevronRight, Share2, Eye, EyeOff, Sliders, Music, Cake, Mail,
  Lock, Unlock, KeyRound, ShieldCheck, Gift, Bell, Wifi, Battery, 
  Signal, Fingerprint, Lightbulb, Delete, CheckCircle2, AlertCircle,
  Star, PartyPopper, Smile, Flame, Cookie
} from 'lucide-react';
import { audioController } from '../utils/audio';

export interface BirthdayTemplateCustomData {
  personName: string;
  ageText: string;
  senderName: string;
  heroHeadline: string;
  heroSubtitle: string;
  cakeWishMessage: string;
  letterText: string;
  letterSignoff: string;
  photos: Array<{ src: string; cap: string }>;
  balloonMessages: string[];
  wishes: string[];
  themeColor: 'sweetPink' | 'ruby' | 'gold' | 'velvet' | 'emerald';
  passcode?: string;
  passcodeHint?: string;
  lockHeading?: string;
  lockSubtitle?: string;
}

interface BirthdaySurpriseTemplateProps {
  name?: string;
  isEmbedded?: boolean;
  initialEditMode?: boolean;
  onClose?: () => void;
  onOrder?: (customData?: BirthdayTemplateCustomData) => void;
}

const THEMES = {
  sweetPink: {
    name: 'Sweet Pastel Pink (Dreamy Delight)',
    bgMain: '#260B18',
    bgGradFrom: '#5E1439',
    canopyBg: '#F8BBD0',
    canopyDrip: '#F48FB1',
    accent: '#FF4081',
    softPink: '#FCE4EC',
    gold: '#FFD54F',
    peach: '#FFAB91',
    navy: '#1E293B',
    badgeBg: 'rgba(255, 64, 129, 0.25)',
    cardBg: 'rgba(255, 255, 255, 0.08)',
  },
  ruby: {
    name: 'Ruby Rose (Classic Velvet)',
    bgMain: '#2A0610',
    bgGradFrom: '#7A0F2E',
    canopyBg: '#E57373',
    canopyDrip: '#EF5350',
    accent: '#FF3D6E',
    softPink: '#FFEBEE',
    gold: '#E8C27A',
    peach: '#FF8A80',
    navy: '#0F172A',
    badgeBg: 'rgba(255, 61, 110, 0.2)',
    cardBg: 'rgba(255, 255, 255, 0.07)',
  },
  gold: {
    name: 'Royal Gold (Warm Elegance)',
    bgMain: '#1E1403',
    bgGradFrom: '#5C4308',
    canopyBg: '#FFE082',
    canopyDrip: '#FFD54F',
    accent: '#F59E0B',
    softPink: '#FFF8E1',
    gold: '#FDE68A',
    peach: '#FFCC80',
    navy: '#1C1917',
    badgeBg: 'rgba(245, 158, 11, 0.2)',
    cardBg: 'rgba(255, 255, 255, 0.08)',
  },
  velvet: {
    name: 'Velvet Purple (Dreamy Mauve)',
    bgMain: '#190626',
    bgGradFrom: '#4C0D66',
    canopyBg: '#E1BEE7',
    canopyDrip: '#CE93D8',
    accent: '#D946EF',
    softPink: '#F3E5F5',
    gold: '#F5D0FE',
    peach: '#B39DDB',
    navy: '#0F172A',
    badgeBg: 'rgba(217, 70, 239, 0.2)',
    cardBg: 'rgba(255, 255, 255, 0.07)',
  },
  emerald: {
    name: 'Emerald Forest (Lush Nature)',
    bgMain: '#051E16',
    bgGradFrom: '#0E4A36',
    canopyBg: '#A5D6A7',
    canopyDrip: '#81C784',
    accent: '#10B981',
    softPink: '#E8F5E9',
    gold: '#A7F3D0',
    peach: '#80CBC4',
    navy: '#064E3B',
    badgeBg: 'rgba(16, 185, 129, 0.2)',
    cardBg: 'rgba(255, 255, 255, 0.07)',
  },
};

const BALLOON_PALETTE = [
  { bg: '#FFAB91', text: '#5D2E1A', sheen: '#FFE0B2', label: 'Pastel Peach' },
  { bg: '#F48FB1', text: '#6A1B4D', sheen: '#FCE4EC', label: 'Blush Rose' },
  { bg: '#FFFFFF', text: '#374151', sheen: '#F3F4F6', label: 'Pearl White' },
  { bg: '#1E293B', text: '#E2E8F0', sheen: '#475569', label: 'Midnight Gloss' },
  { bg: '#FFD54F', text: '#5D4037', sheen: '#FFF9C4', label: 'Golden Honey' },
  { bg: '#F06292', text: '#880E4F', sheen: '#F8BBD0', label: 'Sweet Strawberry' },
  { bg: '#80DEEA', text: '#006064', sheen: '#E0F7FA', label: 'Pastel Mint' },
  { bg: '#CE93D8', text: '#4A148C', sheen: '#F3E5F5', label: 'Lavender Dream' },
  { bg: '#FF8A80', text: '#B71C1C', sheen: '#FFEBEE', label: 'Coral Burst' },
  { bg: '#FFE082', text: '#6D4C41', sheen: '#FFF8E1', label: 'Champagne Shimmer' },
];

const DEFAULT_BALLOON_MESSAGES = [
  "You make every single room warmer just by walking into it.",
  "Your laugh is genuinely our favorite sound in the world.",
  "You are braver and stronger than you ever give yourself credit for.",
  "Thank you for always caring so deeply for everyone around you.",
  "Your pure kindness and warmth are completely contagious.",
  "Somebody out here is endlessly proud of everything you do.",
  "You bring unforgettable sparkle and magic wherever you go.",
  "The brightest and happiest chapters of your story are still ahead.",
  "Today is completely and unapologetically yours to celebrate.",
  "You are deeply, truly, and infinitely loved by all of us."
];

const DEFAULT_CUPCAKES = [
  {
    id: 'lemon',
    name: 'Vanilla Buttercream Swirl',
    flavor: 'Sweet Vanilla & Golden Honey',
    color: '#FFE082',
    frosting: '#FFF9C4',
    base: '#D7CCC8',
    cupColor: '#5D4037',
    icon: '🧁',
    wish: 'May your year be as bright and sweet as golden sunshine!'
  },
  {
    id: 'rose',
    name: 'Strawberry Velvet Rose',
    flavor: 'Wild Strawberry & Rose Cream',
    color: '#F48FB1',
    frosting: '#FCE4EC',
    base: '#880E4F',
    cupColor: '#AD1457',
    icon: '🍓',
    wish: 'May endless love and sweet surprises follow you everywhere!'
  },
  {
    id: 'cocoa',
    name: 'Decadent Belgian Truffle',
    flavor: 'Dark Chocolate & Salted Caramel',
    color: '#6D4C41',
    frosting: '#A1887F',
    base: '#3E2723',
    cupColor: '#271711',
    icon: '🍫',
    wish: 'May you savor rich success, peaceful days, and hearty laughter!'
  },
  {
    id: 'cotton',
    name: 'Cotton Candy Cloud',
    flavor: 'Marshmallow & Peach Swirl',
    color: '#FFAB91',
    frosting: '#FFE0B2',
    base: '#D81B60',
    cupColor: '#C2185B',
    icon: '🌸',
    wish: 'May your dreams float high and every wish come true effortlessly!'
  }
];

const DEFAULT_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    cap: "A golden memory worth cherishing forever ✨"
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    cap: "Laughing together until our stomachs hurt 💖"
  },
  {
    src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
    cap: "Just us, making every simple day extraordinary 🎈"
  },
  {
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    cap: "Where this incredible journey first began 🌟"
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    cap: "An unforgettable milestone and celebration 🍰"
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    cap: "Pure joy, unfiltered smiles, and priceless moments 💕"
  }
];

const DEFAULT_WISHES = [
  "May this year give you more reasons to smile than you could ever count.",
  "May every door you knock on open wider than you ever dared to hope.",
  "May you feel, each and every single day, just how special you are.",
  "May your mornings be peaceful and every single dream come true.",
  "May you discover pure magic in the smallest, sweetest everyday moments.",
  "May this be the happiest, most unforgettable year of your life yet!"
];

const WISH_ICONS = ['🎁', '💌', '✨', '🍀', '🌟', '🎀'];

const DEFAULT_LETTER = `Another year of you, and getting to celebrate you in this life will always be my greatest blessing.

Thank you for your warm smile, your infectious laughter, and the effortless way you turn ordinary moments into treasured memories.

Today is completely yours. Make the biggest wish, eat every treat, and know that you are loved beyond words. May your year ahead be wrapped in endless happiness, health, and limitless blessings!`;

const LETTER_PRESETS = [
  {
    label: 'Partner / Romantic Love',
    text: `Happy Birthday to my favorite person in the entire universe! 💖

Your presence brings peace to my mind and sunshine to my soul. Walking through life with you is my sweetest adventure.

On your special day, I wish you boundless health, infinite joy, and all the dreams your heart has been whispering. Today and forever, I love you more than words could ever describe.`,
    signoff: '— Forever yours with all my heart'
  },
  {
    label: 'Best Friend',
    text: `Happy Birthday to my favorite human and absolute best friend! 🎉

Thank you for the endless late-night chats, the crazy laughter, and for always having my back no matter what. 

Go all out today and celebrate like you own the world. May this year shower you with unforgettable victories, wild adventures, and pure bliss!`,
    signoff: '— Your best friend for life'
  },
  {
    label: 'Family / Cherished One',
    text: `Happy Birthday to our brightest star and biggest pride! 🌟

Watching you grow and fill every room with your kindness is the greatest joy of our lives. 

We pray that you step into this new year with confidence, surrounded by love, health, and endless opportunities. We love you so very much!`,
    signoff: '— With endless love & blessings'
  }
];

export const BirthdaySurpriseTemplate: React.FC<BirthdaySurpriseTemplateProps> = ({
  name = "Ahnaf",
  isEmbedded = false,
  initialEditMode = false,
  onClose,
  onOrder
}) => {
  // Customizable Template Content State
  const [personName, setPersonName] = useState(name);
  const [ageText, setAgeText] = useState('25th Birthday Celebration');
  const [senderName, setSenderName] = useState('With all our love');
  const [heroHeadline, setHeroHeadline] = useState('Happy Birthday');
  const [heroSubtitle, setHeroSubtitle] = useState('Another year of you, and the world is so much sweeter! Step into your magical birthday universe.');
  const [cakeWishMessage, setCakeWishMessage] = useState('May every single wish you make today come true — and a few wonderful ones you forgot to ask for! 🎂✨');
  const [letterText, setLetterText] = useState(DEFAULT_LETTER);
  const [letterSignoff, setLetterSignoff] = useState('— With all my love');
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS);
  const [balloonMessages, setBalloonMessages] = useState(DEFAULT_BALLOON_MESSAGES);
  const [wishes, setWishes] = useState(DEFAULT_WISHES);
  const [themeColor, setThemeColor] = useState<'sweetPink' | 'ruby' | 'gold' | 'velvet' | 'emerald'>('sweetPink');

  // Mobile Lock Screen State
  const [isLocked, setIsLocked] = useState(true);
  const [passcode, setPasscode] = useState('2026');
  const [passcodeHint, setPasscodeHint] = useState('The secret passcode is 2026 🎂');
  const [lockHeading, setLockHeading] = useState('A Special Birthday Surprise');
  const [lockSubtitle, setLockSubtitle] = useState('You have received an exclusive personalized celebration gift! Enter the secret passcode to unlock your special memories, wishes, and moments.');
  const [enteredCode, setEnteredCode] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lockTime, setLockTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  const [lockDate, setLockDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  });

  // Editor Drawer State
  const [isEditorOpen, setIsEditorOpen] = useState(initialEditMode);
  const [activeEditTab, setActiveEditTab] = useState<'basic' | 'letter' | 'photos' | 'balloons' | 'style'>('basic');
  const [editorToast, setEditorToast] = useState<string | null>(null);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetIdx, setUploadTargetIdx] = useState<number | null>(null);

  // Audio State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Balloons State
  const [poppedBalloons, setPoppedBalloons] = useState<Record<number, boolean>>({});
  const [currentBalloonMessage, setCurrentBalloonMessage] = useState<string>('');

  // Cake State
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);

  // Cupcakes Sweet Treat Bar State
  const [activeCupcakeWish, setActiveCupcakeWish] = useState<string | null>(null);
  const [eatenCupcakes, setEatenCupcakes] = useState<Record<string, boolean>>({});

  // Gallery Lightbox State
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; cap: string } | null>(null);

  // Letter State
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [typedLetter, setTypedLetter] = useState('');

  // 3D Wishes Flip State
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const currentTheme = THEMES[themeColor] || THEMES.sweetPink;

  // Helper toast notification
  const showToast = (msg: string) => {
    setEditorToast(msg);
    setTimeout(() => {
      setEditorToast(null);
    }, 2800);
  };

  // Clock updater effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLockTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setLockDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Audio Toggle
  const toggleMusic = () => {
    const isPlaying = audioController.toggleMusic('celebration');
    setIsPlayingAudio(isPlaying);
  };

  // Grand Confetti Burst
  const triggerGrandConfetti = () => {
    try {
      const end = Date.now() + 1800;
      const colors = ['#FF4081', '#FFD54F', '#F48FB1', '#FFAB91', '#FFFFFF', '#CE93D8'];
      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } catch {}
  };

  const triggerConfetti = (x = 0.5, y = 0.5) => {
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { x, y },
        colors: ['#FF4081', '#FFD54F', '#F48FB1', '#FFAB91', '#FFFFFF', '#1E293B']
      });
    } catch {}
  };

  // Keypad input handler
  const handleKeypadInput = (digit: string) => {
    if (isUnlocking || isShaking) return;
    if (enteredCode.length >= passcode.length) return;

    audioController.playKeyTap();
    const nextCode = enteredCode + digit;
    setEnteredCode(nextCode);

    if (nextCode.length === passcode.length) {
      if (nextCode === passcode) {
        // Unlock success
        executeUnlockSequence();
      } else {
        // Error shake
        setIsShaking(true);
        audioController.playKeyError();
        setTimeout(() => {
          setIsShaking(false);
          setEnteredCode('');
        }, 650);
      }
    }
  };

  // Quick Biometric Unlock Shortcut
  const executeUnlockSequence = () => {
    setIsUnlocking(true);
    audioController.playUnlockSuccess();
    triggerGrandConfetti();
    setTimeout(() => {
      setIsLocked(false);
      setIsUnlocking(false);
      setEnteredCode('');
      if (!isPlayingAudio) {
        setIsPlayingAudio(true);
        audioController.toggleMusic('celebration');
      }
    }, 650);
  };

  const handleKeypadDelete = () => {
    if (isUnlocking || enteredCode.length === 0) return;
    audioController.playKeyTap();
    setEnteredCode(enteredCode.slice(0, -1));
  };

  // Pop Balloon Handler
  const handlePopBalloon = (idx: number, e: React.MouseEvent) => {
    if (poppedBalloons[idx]) return;

    audioController.playPopEffect();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerConfetti(rect.left / window.innerWidth + 0.05, rect.top / window.innerHeight);

    setPoppedBalloons((prev) => ({ ...prev, [idx]: true }));
    const msg = balloonMessages[idx] || "You are amazing!";
    setCurrentBalloonMessage(msg);
  };

  // Cut Cake & Blow Candles Handler
  const handleCutCake = (e: React.MouseEvent) => {
    if (!candlesLit && isCakeCut) return;

    audioController.playBlowCandles();
    setTimeout(() => {
      audioController.playChime();
    }, 300);

    const rect = e.currentTarget.getBoundingClientRect();
    triggerConfetti(rect.left / window.innerWidth + 0.1, rect.top / window.innerHeight);

    setCandlesLit(false);
    setIsCakeCut(true);
  };

  const handleRelightCandles = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioController.playKeyTap();
    setCandlesLit(true);
    setIsCakeCut(false);
    showToast('Candles re-lit! Make another wish! 🎂');
  };

  // Cupcake Sweet Treat Bar Click
  const handleCupcakeClick = (cupcake: typeof DEFAULT_CUPCAKES[0], e: React.MouseEvent) => {
    audioController.playChime();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerConfetti(rect.left / window.innerWidth + 0.05, rect.top / window.innerHeight);
    setEatenCupcakes(prev => ({ ...prev, [cupcake.id]: true }));
    setActiveCupcakeWish(cupcake.wish);
  };

  // Open Letter Handler
  const handleOpenLetter = () => {
    audioController.playWaxSealPop();
    setIsLetterOpen(true);
    triggerConfetti(0.5, 0.4);
  };

  // Typewriter effect for letter
  useEffect(() => {
    if (isLetterOpen) {
      setTypedLetter('');
      let index = 0;
      const fullText = letterText;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypedLetter(fullText.slice(0, index + 1));
          index += 2;
        } else {
          clearInterval(timer);
        }
      }, 18);
      return () => clearInterval(timer);
    } else {
      setTypedLetter(letterText);
    }
  }, [letterText, isLetterOpen]);

  // 3D Card Flip Handler
  const handleFlipCard = (idx: number, e: React.MouseEvent) => {
    if (flippedCards[idx]) return;
    audioController.playChime();
    setFlippedCards((prev) => ({ ...prev, [idx]: true }));
    const rect = e.currentTarget.getBoundingClientRect();
    triggerConfetti(rect.left / window.innerWidth + 0.1, rect.top / window.innerHeight);
  };

  // Photo upload trigger
  const handleTriggerUpload = (idx: number) => {
    setUploadTargetIdx(idx);
    fileInputRef.current?.click();
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTargetIdx !== null) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setPhotos((prev) => {
            const next = [...prev];
            next[uploadTargetIdx] = {
              ...next[uploadTargetIdx],
              src: result
            };
            return next;
          });
          showToast(`Photo #${uploadTargetIdx + 1} updated successfully!`);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  // Reset to default data
  const handleResetDefaults = () => {
    setPersonName(name || 'Ahnaf');
    setAgeText('25th Birthday Celebration');
    setSenderName('With all our love');
    setHeroHeadline('Happy Birthday');
    setHeroSubtitle('Another year of you, and the world is so much sweeter! Step into your magical birthday universe.');
    setCakeWishMessage('May every single wish you make today come true — and a few wonderful ones you forgot to ask for! 🎂✨');
    setLetterText(DEFAULT_LETTER);
    setLetterSignoff('— With all my love');
    setPhotos(DEFAULT_PHOTOS);
    setBalloonMessages(DEFAULT_BALLOON_MESSAGES);
    setWishes(DEFAULT_WISHES);
    setThemeColor('sweetPink');
    setPasscode('2026');
    setPasscodeHint('The secret passcode is 2026 🎂');
    setLockHeading('A Special Birthday Surprise');
    setLockSubtitle('You have received an exclusive personalized celebration gift! Enter the secret passcode to unlock your special memories, wishes, and moments.');
    showToast('All fields reset to default values!');
  };

  // Dispatch custom data for ordering
  const handleOrderWithCustomData = () => {
    const customData: BirthdayTemplateCustomData = {
      personName,
      ageText,
      senderName,
      heroHeadline,
      heroSubtitle,
      cakeWishMessage,
      letterText,
      letterSignoff,
      photos,
      balloonMessages,
      wishes,
      themeColor,
      passcode,
      passcodeHint,
      lockHeading,
      lockSubtitle
    };
    if (onOrder) {
      onOrder(customData);
    }
  };

  const poppedCount = Object.keys(poppedBalloons).length;
  const totalBalloons = balloonMessages.length;

  return (
    <div 
      className={`relative w-full ${isEmbedded ? 'h-full overflow-y-auto overscroll-contain' : 'min-h-screen'} text-[#FFF3E6] font-sans selection:bg-[#FF4081] selection:text-white transition-colors duration-500`}
      style={{ backgroundColor: currentTheme.bgMain }}
    >
      {/* Hidden file input for uploading custom photo */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Dynamic Font Styling and Custom CSS */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-4deg); }
        }
        @keyframes sway-ribbon {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes flame-flicker {
          0%, 100% { transform: scale(1) translateY(0); filter: drop-shadow(0 0 10px #FFA726); }
          25% { transform: scale(1.08, 0.95) translateY(-1px); filter: drop-shadow(0 0 16px #FF7043); }
          50% { transform: scale(0.92, 1.05) translateY(1px); filter: drop-shadow(0 0 12px #FFD54F); }
          75% { transform: scale(1.04, 0.98) translateY(-0.5px); filter: drop-shadow(0 0 18px #FF5722); }
        }
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-9px); }
          40%, 80% { transform: translateX(9px); }
        }
        .animate-shake {
          animation: shake 0.45s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes lock-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.03); }
        }
        .animate-lock-bounce {
          animation: lock-bounce 2.4s infinite ease-in-out;
        }
        .perspective-900 { perspective: 900px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* Toast Notification */}
      {editorToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[70] px-4 py-2.5 rounded-full bg-black/90 text-amber-200 border border-amber-300/40 text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in zoom-in-95">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{editorToast}</span>
        </div>
      )}

      {/* FIXED TOP FLOATING CONTROLS TOOLBAR */}
      <div className={`${isEmbedded ? 'absolute top-3' : 'fixed top-3'} inset-x-3 sm:inset-x-6 z-40 flex items-center justify-between gap-2 pointer-events-none`}>
        {/* Left: Back / Exit Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="pointer-events-auto px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 text-pink-300 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </button>
        )}

        {/* Center: Template live status badge */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-pink-300/20 text-xs text-pink-200 font-medium shadow-md">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
          <span>Sweet Pastel Birthday Dream ✨</span>
        </div>

        {/* Right: Actions (Lock Screen + Music + Customize + Order) */}
        <div className="pointer-events-auto flex items-center gap-2 ml-auto">
          {/* Lock Screen / Relock Button */}
          {!isLocked && (
            <button
              onClick={() => {
                setIsLocked(true);
                setEnteredCode('');
                setIsUnlocking(false);
                showToast('Screen locked! Enter passcode to unlock.');
              }}
              className="px-3 py-2 rounded-full bg-black/60 hover:bg-black/85 text-pink-200 backdrop-blur-md border border-pink-300/30 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-95"
              title="Lock Screen"
              aria-label="Lock Screen"
            >
              <Lock className="w-3.5 h-3.5 text-pink-300" />
              <span className="hidden sm:inline">Lock Screen</span>
            </button>
          )}

          {/* Music Button */}
          <button
            onClick={toggleMusic}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-pink-200 backdrop-blur-md border border-pink-300/30 transition-all cursor-pointer shadow-lg active:scale-95"
            title="Toggle Celebration Music"
            aria-label="Toggle Celebration Music"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 text-[#FF4081]" /> : <VolumeX className="w-4 h-4 text-white/70" />}
          </button>

          {/* Edit / Customize Drawer Trigger */}
          <button
            onClick={() => setIsEditorOpen(true)}
            className="px-3 sm:px-3.5 py-2 rounded-full bg-gradient-to-r from-[#FF4081] to-[#D81B60] hover:brightness-110 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg cursor-pointer transition-all active:scale-95 border border-pink-300/40"
            title="Customize this Template"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit Template</span>
            <span className="sm:hidden">Edit</span>
          </button>

          {/* Order Button */}
          {onOrder && (
            <button
              onClick={handleOrderWithCustomData}
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <span>Order</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: MOBILE LOCK SYSTEM & SURPRISE VAULT SCREEN */}
      {/* ========================================================================= */}
      {isLocked && (
        <div 
          className={`${isEmbedded ? 'absolute inset-0' : 'fixed inset-0'} z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain transition-all duration-700 ${
            isUnlocking ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
          style={{ 
            background: `radial-gradient(circle at center, ${currentTheme.bgGradFrom} 0%, ${currentTheme.bgMain} 100%)`,
            backdropFilter: 'blur(25px)'
          }}
        >
          {/* Floating celebratory ambient decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full blur-[100px] opacity-40 animate-pulse pointer-events-none"
              style={{ backgroundColor: currentTheme.accent }}
            />
            <div 
              className="absolute bottom-10 right-10 w-[280px] h-[280px] rounded-full blur-[90px] opacity-35 pointer-events-none"
              style={{ backgroundColor: currentTheme.gold }}
            />
            {/* Hanging cutout stars */}
            <span className="absolute top-12 left-[14%] text-2xl text-pink-300 opacity-70 animate-bounce">✨</span>
            <span className="absolute top-24 right-[16%] text-xl text-amber-300 opacity-80 animate-pulse">✦</span>
            <span className="absolute bottom-20 left-[18%] text-2xl text-pink-400 opacity-60">💖</span>
            <span className="absolute bottom-14 right-[22%] text-2xl text-amber-200 opacity-70 animate-bounce">🎈</span>
          </div>

          {/* Smartphone Lock Chassis Wrapper */}
          <div className="relative z-10 w-full max-w-[370px] sm:max-w-[400px] flex flex-col items-center">
            
            {/* Mobile Lock Screen Glass Chassis */}
            <div className="w-full rounded-[38px] sm:rounded-[44px] bg-gradient-to-b from-black/75 via-black/85 to-black/95 backdrop-blur-2xl border-[2.5px] border-pink-400/30 shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-4 sm:p-6 flex flex-col items-center text-center relative overflow-hidden">
              
              {/* Dynamic Island / Speaker */}
              <div className="w-28 sm:w-34 h-4 rounded-full bg-black/95 border border-pink-300/20 flex items-center justify-between px-3 mb-3 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-emerald-400/90 animate-pulse" />
                <div className="w-10 h-1 bg-white/30 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-pink-400/90" />
              </div>

              {/* Status Bar: Time & Connectivity */}
              <div className="w-full flex items-center justify-between text-[11px] text-white/70 px-2 mb-1.5 font-mono">
                <span className="font-semibold">{lockTime}</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3 text-pink-200" />
                  <Wifi className="w-3 h-3 text-pink-200" />
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Date Display */}
              <div className="text-[11px] sm:text-xs font-medium tracking-wide text-rose-200/90 uppercase mb-0.5">
                {lockDate}
              </div>

              {/* Big Time Display */}
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white mb-2 drop-shadow-md">
                {lockTime}
              </div>

              {/* Lock / Unlock Icon Badge */}
              <div className="mb-2">
                <div 
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 ${
                    isUnlocking 
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 scale-110 shadow-[0_0_25px_rgba(52,211,153,0.6)]' 
                      : 'bg-white/10 border-pink-400/40 text-pink-300 shadow-md animate-lock-bounce'
                  }`}
                >
                  {isUnlocking ? (
                    <Unlock className="w-5 h-5 text-emerald-400 animate-bounce" />
                  ) : (
                    <Lock className="w-5 h-5 text-pink-300" />
                  )}
                </div>
              </div>

              {/* Notification / Welcome Card */}
              <div className="w-full p-3 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-pink-300/30 text-left mb-3.5 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-300">
                    <Gift className="w-3.5 h-3.5 text-[#FF4081]" />
                    <span>Special Birthday Delivery</span>
                  </div>
                  <span className="text-[10px] text-white/50">Just now</span>
                </div>
                <h2 className="text-sm sm:text-base font-serif font-bold text-white leading-snug">
                  {lockHeading} for <span className="text-[#FF4081]">{personName}</span> 💖
                </h2>
                <p className="text-[11px] sm:text-xs text-rose-100/85 font-light mt-1 line-clamp-3 leading-relaxed">
                  {lockSubtitle}
                </p>
              </div>

              {/* Passcode Instruction Header */}
              <div className="mb-2">
                <p className="text-[11px] font-bold tracking-wider uppercase font-mono" style={{ color: isUnlocking ? '#34D399' : currentTheme.gold }}>
                  {isUnlocking ? '✨ Passcode Verified! Opening Celebration...' : 'Enter Secret Passcode'}
                </p>
              </div>

              {/* Passcode Dots Display */}
              <div className={`flex items-center justify-center gap-3.5 mb-4 ${isShaking ? 'animate-shake' : ''}`}>
                {Array.from({ length: passcode.length }).map((_, idx) => {
                  const isFilled = idx < enteredCode.length;
                  return (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                        isUnlocking
                          ? 'bg-emerald-400 scale-125 shadow-[0_0_12px_#34D399]'
                          : isShaking
                          ? 'bg-rose-500 scale-110 shadow-[0_0_12px_#F43F5E]'
                          : isFilled
                          ? 'bg-gradient-to-tr from-[#FF4081] to-[#FFD54F] scale-125 shadow-[0_0_12px_rgba(255,64,129,0.8)] ring-2 ring-white/50'
                          : 'bg-white/15 border border-pink-300/30'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Numeric Keypad Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-[260px] mb-2.5">
                {[
                  { num: '1', sub: '✦' },
                  { num: '2', sub: 'ABC' },
                  { num: '3', sub: 'DEF' },
                  { num: '4', sub: 'GHI' },
                  { num: '5', sub: 'JKL' },
                  { num: '6', sub: 'MNO' },
                  { num: '7', sub: 'PQRS' },
                  { num: '8', sub: 'TUV' },
                  { num: '9', sub: 'WXYZ' },
                ].map((item) => (
                  <button
                    key={item.num}
                    onClick={() => handleKeypadInput(item.num)}
                    disabled={isUnlocking}
                    className="h-12 sm:h-13 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all active:scale-92 shadow-md group"
                  >
                    <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-pink-200 transition-colors">
                      {item.num}
                    </span>
                    <span className="text-[7px] sm:text-[8px] text-white/50 tracking-widest font-mono">
                      {item.sub}
                    </span>
                  </button>
                ))}

                {/* Hint Button */}
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="h-12 sm:h-13 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/25 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all active:scale-92 text-amber-300"
                  title="Show Passcode Hint"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[8px] text-amber-200/80 font-medium">Hint</span>
                </button>

                {/* 0 Key */}
                <button
                  onClick={() => handleKeypadInput('0')}
                  disabled={isUnlocking}
                  className="h-12 sm:h-13 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all active:scale-92 shadow-md group"
                >
                  <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-pink-200 transition-colors">
                    0
                  </span>
                  <span className="text-[7px] sm:text-[8px] text-white/50 font-mono">+</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleKeypadDelete}
                  disabled={isUnlocking || enteredCode.length === 0}
                  className="h-12 sm:h-13 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/25 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all active:scale-92 text-rose-300 disabled:opacity-30 disabled:pointer-events-none"
                  title="Delete previous digit"
                >
                  <Delete className="w-4 h-4 text-rose-300" />
                  <span className="text-[8px] text-rose-200/70 font-medium">Delete</span>
                </button>
              </div>

              {/* Biometric Quick Touch Unlock Shortcut */}
              <button
                onClick={executeUnlockSequence}
                className="w-full max-w-[260px] py-2 px-3 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-400/30 text-pink-200 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer mb-2 active:scale-95 group"
                title="Tap for instant biometric unlock"
              >
                <Fingerprint className="w-4 h-4 text-[#FF4081] group-hover:scale-110 transition-transform" />
                <span>Tap for Biometric / Instant Unlock</span>
              </button>

              {/* Hint Box (if toggled) */}
              {showHint && (
                <div className="w-full p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs mb-1.5 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center gap-1.5 text-left">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span className="text-[11px]">{passcodeHint}</span>
                  </div>
                  <button 
                    onClick={() => setShowHint(false)}
                    className="text-white/60 hover:text-white text-xs px-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Security notice footer */}
              <div className="flex items-center gap-1 text-[10px] text-rose-200/60 mt-1">
                <ShieldCheck className="w-3 h-3 text-pink-300" />
                <span>Encrypted with love for {personName}</span>
              </div>
            </div>

            {/* Quick Guest Hint text */}
            <p className="mt-3 text-xs text-pink-200/80 font-medium text-center">
              💡 Tip: Passcode is <span className="text-amber-300 font-bold">{passcode}</span> or tap the fingerprint button!
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: MAIN BIRTHDAY CELEBRATION EXPERIENCE */}
      {/* ========================================================================= */}
      <main className={`relative w-full ${isLocked ? 'blur-sm pointer-events-none select-none opacity-40' : 'opacity-100'} transition-all duration-700`}>

        {/* TOP SCALLOPED CANOPY / DRAPED HEADER (Matching the Reference Photo!) */}
        <div className="relative w-full overflow-hidden pointer-events-none select-none">
          <svg 
            viewBox="0 0 1440 180" 
            className="w-full h-24 sm:h-36 md:h-44 object-cover drop-shadow-[0_12px_24px_rgba(255,64,129,0.35)]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="canopyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={currentTheme.canopyBg} />
                <stop offset="100%" stopColor={currentTheme.canopyDrip} />
              </linearGradient>
            </defs>
            {/* Scalloped Wavy Curtain Draping */}
            <path 
              d="M0,0 L1440,0 L1440,80 Q1350,160 1260,80 Q1170,160 1080,80 Q990,160 900,80 Q810,160 720,80 Q630,160 540,80 Q450,160 360,80 Q270,160 180,80 Q90,160 0,80 Z" 
              fill="url(#canopyGrad)" 
            />
          </svg>

          {/* Hanging Ribbon Streamers & Twinkling Gold Stars */}
          <div className="absolute top-0 inset-x-0 h-36 pointer-events-none flex justify-between px-6 sm:px-16">
            <div className="flex flex-col items-center animate-[sway-ribbon_3s_ease-in-out_infinite]">
              <div className="w-[2px] h-20 bg-gradient-to-b from-pink-300 to-transparent" />
              <span className="text-amber-300 text-lg animate-spin" style={{ animationDuration: '6s' }}>✦</span>
            </div>
            <div className="flex flex-col items-center animate-[sway-ribbon_3.5s_ease-in-out_infinite] delay-300">
              <div className="w-[2px] h-28 bg-gradient-to-b from-pink-300 to-transparent" />
              <span className="text-pink-300 text-sm">🎀</span>
            </div>
            <div className="flex flex-col items-center animate-[sway-ribbon_2.8s_ease-in-out_infinite] delay-150">
              <div className="w-[2px] h-16 bg-gradient-to-b from-amber-300 to-transparent" />
              <span className="text-amber-200 text-base">✨</span>
            </div>
            <div className="flex flex-col items-center animate-[sway-ribbon_3.2s_ease-in-out_infinite] delay-500">
              <div className="w-[2px] h-24 bg-gradient-to-b from-pink-300 to-transparent" />
              <span className="text-pink-200 text-base">✦</span>
            </div>
            <div className="flex flex-col items-center animate-[sway-ribbon_3.8s_ease-in-out_infinite] delay-700">
              <div className="w-[2px] h-20 bg-gradient-to-b from-amber-300 to-transparent" />
              <span className="text-amber-300 text-lg">✨</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: HERO GREETING WITH 3D BALLOON CLUSTERS */}
        <section 
          className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-4 pb-16 overflow-hidden"
          style={{ background: `radial-gradient(circle at center, ${currentTheme.bgGradFrom} 0%, ${currentTheme.bgMain} 90%)` }}
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] sm:w-[650px] h-[420px] sm:h-[650px] rounded-full blur-[120px] opacity-35 pointer-events-none"
              style={{ backgroundColor: currentTheme.accent }}
            />
            <div 
              className="absolute bottom-10 left-10 w-[240px] h-[240px] rounded-full blur-[90px] opacity-30 pointer-events-none"
              style={{ backgroundColor: currentTheme.gold }}
            />
          </div>

          {/* Left Floating Balloon Cluster (From the reference photo!) */}
          <div className="hidden lg:flex absolute left-8 top-16 flex-col items-center pointer-events-none select-none animate-[float-gentle_4s_ease-in-out_infinite]">
            {/* Peach Big Balloon */}
            <div className="relative w-28 h-36 rounded-[50%_50%_48%_48%/55%_55%_45%_45%] bg-gradient-to-br from-[#FFCCBC] via-[#FFAB91] to-[#D84315] shadow-[inset_-8px_-10px_0_rgba(0,0,0,0.2),0_15px_30px_rgba(255,171,145,0.4)]">
              <div className="absolute top-4 left-5 w-6 h-10 rounded-full bg-white/50 rotate-[25deg] blur-[1px]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-3 bg-[#D84315] rounded-sm" />
            </div>
            {/* Pearl White Sub-Balloon */}
            <div className="relative -mt-10 ml-14 w-20 h-26 rounded-[50%_50%_48%_48%/55%_55%_45%_45%] bg-gradient-to-br from-white via-[#F5F5F5] to-[#BDBDBD] shadow-xl">
              <div className="absolute top-3 left-4 w-4 h-7 rounded-full bg-white/80 rotate-[25deg]" />
            </div>
            {/* Ribbon */}
            <div className="w-[1.5px] h-36 bg-gradient-to-b from-white/60 to-transparent" />
          </div>

          {/* Right Floating Balloon Cluster (From the reference photo!) */}
          <div className="hidden lg:flex absolute right-8 top-20 flex-col items-center pointer-events-none select-none animate-[float-slow_4.5s_ease-in-out_infinite]">
            {/* Soft Pink Balloon */}
            <div className="relative w-26 h-34 rounded-[50%_50%_48%_48%/55%_55%_45%_45%] bg-gradient-to-br from-[#FCE4EC] via-[#F48FB1] to-[#C2185B] shadow-[inset_-8px_-10px_0_rgba(0,0,0,0.2),0_15px_30px_rgba(244,143,177,0.4)]">
              <div className="absolute top-4 left-5 w-5 h-9 rounded-full bg-white/60 rotate-[25deg] blur-[1px]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-3 bg-[#C2185B] rounded-sm" />
            </div>
            {/* Midnight Navy Gloss Balloon */}
            <div className="relative -mt-8 mr-12 w-20 h-26 rounded-[50%_50%_48%_48%/55%_55%_45%_45%] bg-gradient-to-br from-[#334155] via-[#1E293B] to-[#0F172A] shadow-2xl">
              <div className="absolute top-3 left-4 w-4 h-7 rounded-full bg-white/70 rotate-[25deg]" />
            </div>
            {/* Ribbon */}
            <div className="w-[1.5px] h-36 bg-gradient-to-b from-white/60 to-transparent" />
          </div>

          {/* Hero Center Content */}
          <div className="max-w-3xl mx-auto space-y-5 pt-2 relative z-10">
            {/* Tag Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.22em] uppercase border border-pink-300/30 shadow-md backdrop-blur-md"
              style={{ backgroundColor: currentTheme.badgeBg, color: currentTheme.gold }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{ageText}</span>
              <span>✦</span>
              <span>Exclusive Celebration</span>
            </div>

            {/* Main Name Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-lg">
              {heroHeadline}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF80AB] via-[#FF4081] to-[#FFD54F] drop-shadow-[0_0_35px_rgba(255,64,129,0.5)]">{personName}!</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-base sm:text-xl text-[#FFF3E6]/90 max-w-2xl mx-auto leading-relaxed font-light">
              {heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={() => {
                  const el = document.getElementById('cake-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF4081] to-[#D81B60] hover:brightness-110 text-white font-bold tracking-wide text-sm sm:text-base shadow-[0_12px_35px_rgba(255,64,129,0.45)] cursor-pointer active:scale-95 transition-all flex items-center gap-2"
              >
                <Cake className="w-4 h-4" />
                <span>Make a Wish & Cut Cake 🎂</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('cupcakes-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 border border-pink-300/30 font-semibold text-sm sm:text-base cursor-pointer active:scale-95 transition-all backdrop-blur-md"
              >
                <span>Sweet Treats Bar 🧁</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: 2-TIER TEXTURED BIRTHDAY CAKE & MAKE A WISH (From the Image!) */}
        {/* ========================================================================= */}
        <section 
          id="cake-section"
          className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-pink-400/20 relative"
          style={{ background: `radial-gradient(circle at center, ${currentTheme.bgGradFrom} 0%, ${currentTheme.bgMain} 85%)` }}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-300 mb-2">
            01 · The Centerpiece
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
            Make a Wish & Blow the Candles!
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto mb-8 font-light">
            Tap the cake to extinguish the glowing flames, slice your cake, and unlock your personal wish
          </p>

          <div className="relative max-w-md w-full mx-auto flex flex-col items-center">
            
            {/* Interactive 2-Tier Pastel Pink Cake SVG Container */}
            <div 
              onClick={handleCutCake}
              className="relative cursor-pointer group active:scale-95 transition-transform"
              role="button"
              tabIndex={0}
              aria-label="Blow out candles and cut the birthday cake"
            >
              <svg 
                viewBox="0 0 320 310" 
                className="w-72 sm:w-88 h-auto overflow-visible drop-shadow-[0_15px_45px_rgba(255,64,129,0.35)]"
              >
                <defs>
                  {/* Textured pattern for the pastel pink cake tiers */}
                  <pattern id="cake-texture" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#F8BBD0" opacity="0.6" />
                    <circle cx="6" cy="6" r="1" fill="#F48FB1" opacity="0.5" />
                  </pattern>
                  {/* Clip paths for cutting the cake in two slices */}
                  <clipPath id="slice-left">
                    <rect x="-40" y="-30" width="200" height="360" />
                  </clipPath>
                  <clipPath id="slice-right">
                    <rect x="160" y="-30" width="200" height="360" />
                  </clipPath>
                  
                  {/* Master Cake Graphic Component */}
                  <g id="master-tiered-cake">
                    {/* Pedestal Stand Table Top */}
                    <ellipse cx="160" cy="275" rx="145" ry="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    <ellipse cx="160" cy="278" rx="145" ry="14" fill="#E2E8F0" opacity="0.6" />
                    <path d="M140,285 L130,305 L190,305 L180,285 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    
                    {/* Bottom Tier (Tier 1) - Pastel Pink Textured Body */}
                    <rect x="45" y="185" width="230" height="80" rx="16" fill="#F48FB1" />
                    <rect x="45" y="185" width="230" height="80" rx="16" fill="url(#cake-texture)" />
                    {/* Bottom Satin Ribbon */}
                    <rect x="45" y="248" width="230" height="14" rx="4" fill="#FF4081" />
                    
                    {/* Top Tier (Tier 2) - Pastel Pink Textured Body */}
                    <rect x="75" y="115" width="170" height="74" rx="14" fill="#F8BBD0" />
                    <rect x="75" y="115" width="170" height="74" rx="14" fill="url(#cake-texture)" />
                    {/* Top Tier Satin Ribbon */}
                    <rect x="75" y="172" width="170" height="12" rx="3" fill="#FF4081" />
                    
                    {/* Whipped Cream Top Layer & Cake Toppers */}
                    <ellipse cx="160" cy="115" rx="85" ry="14" fill="#FCE4EC" />
                    
                    {/* Center Mini Topper Accent (like the photo's center topper) */}
                    <ellipse cx="160" cy="110" rx="18" ry="7" fill="#FF4081" />
                    <circle cx="160" cy="104" r="6" fill="#FFD54F" />

                    {/* Left Candle */}
                    <rect x="120" y="65" width="8" height="46" rx="2" fill="#FFFFFF" stroke="#F48FB1" strokeWidth="1.5" />
                    <line x1="124" y1="65" x2="124" y2="58" stroke="#333" strokeWidth="1.5" />
                    
                    {/* Center Candle */}
                    <rect x="156" y="55" width="8" height="56" rx="2" fill="#FF4081" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="160" y1="55" x2="160" y2="48" stroke="#333" strokeWidth="1.5" />
                    
                    {/* Right Candle */}
                    <rect x="192" y="65" width="8" height="46" rx="2" fill="#FFFFFF" stroke="#F48FB1" strokeWidth="1.5" />
                    <line x1="196" y1="65" x2="196" y2="58" stroke="#333" strokeWidth="1.5" />
                  </g>
                </defs>

                {/* Left Side Slice of Cake */}
                <g 
                  clipPath="url(#slice-left)"
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: isCakeCut ? 'translate(-20px, 4px) rotate(-3.5deg)' : 'none',
                    transformOrigin: '80px 270px'
                  }}
                >
                  <use href="#master-tiered-cake" />
                </g>

                {/* Right Side Slice of Cake */}
                <g 
                  clipPath="url(#slice-right)"
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: isCakeCut ? 'translate(20px, 4px) rotate(3.5deg)' : 'none',
                    transformOrigin: '240px 270px'
                  }}
                >
                  <use href="#master-tiered-cake" />
                </g>

                {/* Candle Flames with Realistic Animated Glow */}
                {candlesLit ? (
                  <g className="animate-[flame-flicker_1.2s_infinite]">
                    {/* Left Flame */}
                    <ellipse cx="124" cy="46" rx="5.5" ry="11" fill="#FFA726" />
                    <ellipse cx="124" cy="47" rx="3" ry="7" fill="#FFF59D" />
                    
                    {/* Center Flame */}
                    <ellipse cx="160" cy="36" rx="6.5" ry="12" fill="#FF7043" />
                    <ellipse cx="160" cy="37" rx="3.5" ry="8" fill="#FFF9C4" />
                    
                    {/* Right Flame */}
                    <ellipse cx="196" cy="46" rx="5.5" ry="11" fill="#FFA726" />
                    <ellipse cx="196" cy="47" rx="3" ry="7" fill="#FFF59D" />
                  </g>
                ) : (
                  /* Extinguished Smoke Puffs */
                  <g className="transition-opacity duration-500 opacity-60">
                    <circle cx="124" cy="48" r="3" fill="#E2E8F0" />
                    <circle cx="160" cy="38" r="4" fill="#E2E8F0" />
                    <circle cx="196" cy="48" r="3" fill="#E2E8F0" />
                  </g>
                )}

                {/* Golden Slicing Knife Animation */}
                <line 
                  x1="160" 
                  y1="20" 
                  x2="160" 
                  y2="280" 
                  stroke="#FFD54F" 
                  strokeWidth="3.5" 
                  strokeDasharray="280"
                  strokeDashoffset={isCakeCut ? "0" : "280"}
                  className="transition-all duration-500 ease-in"
                  opacity={isCakeCut ? 0.3 : 1}
                />
              </svg>

              {/* Status Hint */}
              <div className="mt-3 text-xs text-amber-300 font-medium tracking-wide flex items-center justify-center gap-1.5">
                {candlesLit ? (
                  <>
                    <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Tap cake to blow out candles & cut a slice</span>
                  </>
                ) : (
                  <>
                    <PartyPopper className="w-3.5 h-3.5 text-pink-300 animate-bounce" />
                    <span>Candles blown! Wish made! 🎉</span>
                  </>
                )}
              </div>
            </div>

            {/* Cake Wish Message Card */}
            <div className="min-h-[4rem] mt-4 px-4 text-center">
              {isCakeCut ? (
                <div className="p-4 rounded-2xl bg-white/10 border border-pink-300/30 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500 space-y-2">
                  <p className="text-lg sm:text-xl font-serif text-amber-200 italic">
                    "{cakeWishMessage}"
                  </p>
                  <button
                    onClick={handleRelightCandles}
                    className="mt-2 px-3 py-1 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-400/30 text-xs font-semibold cursor-pointer transition-all inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Re-light Candles</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: SWEET TREATS & CUPCAKES BAR (Directly from the Reference Image!) */}
        {/* ========================================================================= */}
        <section 
          id="cupcakes-section"
          className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-pink-400/20 relative"
          style={{ backgroundColor: currentTheme.bgMain }}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-300 mb-2">
            02 · Sweet Treats Bar
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
            Pick Your Birthday Cupcake 🧁
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto mb-10 font-light">
            Tap any gourmet cupcake to pop celebratory sprinkles and reveal a sweet personalized blessing
          </p>

          {/* 4 Cupcakes Grid (Matching the bottom row in the uploaded image) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
            {DEFAULT_CUPCAKES.map((cupcake) => {
              const isEaten = !!eatenCupcakes[cupcake.id];
              return (
                <div
                  key={cupcake.id}
                  onClick={(e) => handleCupcakeClick(cupcake, e)}
                  className={`group relative p-4 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col items-center justify-between ${
                    isEaten 
                      ? 'bg-pink-500/20 border-pink-300/40 scale-102 shadow-[0_10px_30px_rgba(255,64,129,0.3)]' 
                      : 'bg-white/5 hover:bg-white/10 border-white/15 hover:border-pink-300/30 hover:scale-105 shadow-lg'
                  }`}
                >
                  {/* Cupcake 3D Illustration */}
                  <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                      {/* Cupcake Paper Liner */}
                      <path 
                        d="M25,60 L32,92 L68,92 L75,60 Z" 
                        fill={cupcake.cupColor} 
                        stroke="#00000033" 
                        strokeWidth="1.5" 
                      />
                      {/* Liner pleats */}
                      <line x1="36" y1="60" x2="41" y2="92" stroke="#FFFFFF22" strokeWidth="1.5" />
                      <line x1="50" y1="60" x2="50" y2="92" stroke="#FFFFFF22" strokeWidth="1.5" />
                      <line x1="64" y1="60" x2="59" y2="92" stroke="#FFFFFF22" strokeWidth="1.5" />

                      {/* Cake Base */}
                      <ellipse cx="50" cy="60" rx="26" ry="7" fill={cupcake.base} />

                      {/* Swirled Frosting Layers */}
                      <path 
                        d="M26,58 C26,45 36,44 40,46 C42,34 56,33 60,44 C66,45 74,48 74,58 Z" 
                        fill={cupcake.color} 
                      />
                      <path 
                        d="M34,46 C34,36 44,35 50,32 C56,35 66,36 66,46 Z" 
                        fill={cupcake.frosting} 
                      />
                      {/* Frosting Top Swirl Tip */}
                      <path 
                        d="M45,34 Q50,18 53,24 Q56,30 55,34 Z" 
                        fill={cupcake.color} 
                      />

                      {/* Sprinkles on top */}
                      <circle cx="42" cy="42" r="1.5" fill="#FF4081" />
                      <circle cx="58" cy="45" r="1.5" fill="#FFD54F" />
                      <circle cx="50" cy="36" r="1.5" fill="#FFF" />
                      <circle cx="48" cy="50" r="1.5" fill="#80DEEA" />
                    </svg>

                    {/* Sparkle badge */}
                    <div className="absolute top-0 right-0 w-7 h-7 rounded-full bg-pink-500/20 border border-pink-300/40 flex items-center justify-center text-xs">
                      {cupcake.icon}
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-white text-sm sm:text-base mb-1">
                    {cupcake.name}
                  </h3>
                  <p className="text-[11px] text-pink-200/70 font-light">
                    {cupcake.flavor}
                  </p>

                  <div className="mt-3 px-3 py-1 rounded-full bg-white/10 group-hover:bg-[#FF4081] text-pink-200 group-hover:text-white text-[11px] font-semibold transition-colors">
                    {isEaten ? '✨ Tasted' : 'Tap to Taste'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Revealed Cupcake Wish Display */}
          {activeCupcakeWish && (
            <div className="mt-8 max-w-md w-full p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-amber-500/15 to-pink-500/20 border border-pink-300/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500 text-center">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                🧁 Sweet Blessing for {personName}
              </span>
              <p className="text-base sm:text-lg font-serif text-white mt-1 italic">
                "{activeCupcakeWish}"
              </p>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: POP THE FLOATING BALLOONS MINI-GAME */}
        {/* ========================================================================= */}
        <section 
          id="balloons-section" 
          className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-pink-400/20 relative" 
          style={{ background: `radial-gradient(circle at center, ${currentTheme.bgGradFrom} 0%, ${currentTheme.bgMain} 85%)` }}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-300 mb-2">
            03 · Balloon Popper
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
            Pop Every Balloon to Reveal Messages
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto mb-8 font-light">
            Each pastel balloon holds a heartfelt reason why you are so special to all of us
          </p>

          {/* Balloon Arena Stage */}
          <div className="relative w-full max-w-3xl h-[360px] sm:h-[420px] rounded-3xl bg-white/5 border border-pink-300/20 p-4 mb-6 overflow-hidden flex items-center justify-center shadow-xl">
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-2 gap-2 p-4 items-center justify-items-center">
              {balloonMessages.map((msg, i) => {
                const isPopped = !!poppedBalloons[i];
                const colorObj = BALLOON_PALETTE[i % BALLOON_PALETTE.length];
                return (
                  <div key={i} className="relative flex flex-col items-center">
                    {!isPopped ? (
                      <button
                        onClick={(e) => handlePopBalloon(i, e)}
                        className="group relative cursor-pointer active:scale-90 transition-transform"
                        style={{
                          animation: `float-gentle ${3 + (i % 3) * 0.7}s ease-in-out infinite`,
                          animationDelay: `${i * 0.25}s`
                        }}
                        aria-label={`Pop balloon ${i + 1}`}
                      >
                        {/* 3D Balloon body */}
                        <div
                          className="w-12 h-16 sm:w-16 sm:h-20 rounded-[50%_50%_48%_48%/55%_55%_45%_45%] shadow-[inset_-6px_-8px_0_rgba(0,0,0,0.25),0_10px_25px_rgba(0,0,0,0.35)] relative group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: colorObj.bg }}
                        >
                          {/* Highlight sheen */}
                          <div 
                            className="absolute top-2 left-2.5 w-3 h-5 rounded-full rotate-[25deg]"
                            style={{ backgroundColor: colorObj.sheen, opacity: 0.7 }}
                          />
                          {/* Knot */}
                          <div 
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 rounded-sm"
                            style={{ backgroundColor: colorObj.bg }}
                          />
                        </div>
                        {/* Hanging curly string */}
                        <div className="w-[1px] h-8 bg-white/40 mx-auto animate-[sway-ribbon_2s_infinite]" />
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
                className="h-full bg-gradient-to-r from-[#FF4081] via-[#F48FB1] to-[#FFD54F] transition-all duration-300"
                style={{ width: `${(poppedCount / totalBalloons) * 100}%` }}
              />
            </div>
            <div className="text-xs text-amber-300 font-mono tracking-wider">
              {poppedCount < totalBalloons ? `${totalBalloons - poppedCount} balloons remaining` : 'All 10 balloons popped! 🎉'}
            </div>
          </div>

          {/* Affirmation Message Display */}
          <div className="min-h-[3.5rem] max-w-md mx-auto text-center px-4">
            <p className="text-lg sm:text-xl font-serif text-pink-200 italic transition-opacity">
              {currentBalloonMessage || '👆 Tap any balloon above to pop it and reveal your message!'}
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: SPECIAL MEMORY GALLERY */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-pink-400/20 relative" style={{ backgroundColor: currentTheme.bgMain }}>
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-300 mb-2">
            04 · Memory Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
            Golden Memories with You 📸
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto mb-10 font-light">
            Click any snapshot to enlarge and cherish the moments
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mx-auto">
            {photos.map((p, idx) => (
              <div key={idx} className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-pink-300/20 bg-white/5 transition-transform duration-300 hover:scale-[1.02]">
                <img 
                  src={p.src} 
                  alt={p.cap} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => setLightboxPhoto(p)}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end justify-between p-4 text-left pointer-events-none">
                  <span className="text-xs sm:text-sm text-white font-medium line-clamp-2">
                    {p.cap}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxPhoto && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
              onClick={() => setLightboxPhoto(null)}
            >
              <div 
                className="relative max-w-2xl w-full bg-[#260B18] rounded-3xl overflow-hidden border border-pink-300/30 shadow-2xl p-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightboxPhoto(null)}
                  className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <img 
                  src={lightboxPhoto.src} 
                  alt={lightboxPhoto.cap} 
                  className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
                />
                <p className="text-center py-4 text-sm font-medium text-amber-200">
                  {lightboxPhoto.cap}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: WAX-SEALED HEARTFELT LETTER */}
        {/* ========================================================================= */}
        <section 
          className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-pink-400/20 relative"
          style={{ background: `radial-gradient(circle at center, ${currentTheme.bgGradFrom} 0%, ${currentTheme.bgMain} 85%)` }}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-300 mb-2">
            05 · A Special Letter
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
            A Handwritten Note for You 💌
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto mb-8 font-light">
            Tap the wax-sealed envelope to unroll the heartfelt birthday message
          </p>

          {!isLetterOpen ? (
            <div className="flex flex-col items-center gap-6">
              {/* Wax Envelope Representation */}
              <div 
                onClick={handleOpenLetter}
                className="relative w-64 sm:w-80 h-44 bg-[#880E4F] rounded-2xl shadow-2xl overflow-hidden border border-pink-300/30 cursor-pointer hover:scale-105 active:scale-95 transition-all group"
              >
                {/* Flap triangle */}
                <div 
                  className="absolute inset-x-0 top-0 h-24 bg-[#AD1457] shadow-md origin-top group-hover:-translate-y-1 transition-transform"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
                {/* Golden Wax Seal */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD54F] to-[#FFA000] border-2 border-amber-200 shadow-md flex items-center justify-center text-amber-950 font-serif font-bold text-lg group-hover:rotate-12 transition-transform">
                  W
                </div>
              </div>

              <button
                onClick={handleOpenLetter}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF4081] to-[#D81B60] hover:brightness-110 text-white font-semibold text-sm shadow-lg cursor-pointer active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Break Seal & Open Letter 💌</span>
              </button>
            </div>
          ) : (
            <div className="max-w-xl w-full mx-auto p-6 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-pink-300/30 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-500 relative">
              <h3 className="font-serif text-2xl text-amber-200 mb-4">
                Dearest {personName},
              </h3>
              <p className="text-base sm:text-lg text-[#FFF3E6] leading-relaxed whitespace-pre-wrap min-h-[9rem] font-light">
                {typedLetter}
              </p>
              <div className="mt-6 text-right font-serif text-xl sm:text-2xl text-pink-300 italic">
                {letterSignoff}
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: 3D SURPRISE FLIP CARDS */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 flex flex-col items-center text-center border-t border-pink-400/20 relative" style={{ backgroundColor: currentTheme.bgMain }}>
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-300 mb-2">
            06 · Secret Wishes
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
            Tap to Reveal Secret Blessings ✨
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto mb-10 font-light">
            Every 3D card holds a secret wish specially prepared for your big day
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
            {wishes.map((wish, idx) => {
              const isFlipped = !!flippedCards[idx];
              return (
                <div 
                  key={idx}
                  onClick={(e) => handleFlipCard(idx, e)}
                  className="h-44 perspective-900 cursor-pointer"
                >
                  <div 
                    className={`relative w-full h-full preserve-3d transition-transform duration-700 rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}
                  >
                    {/* Front: Gift Icon */}
                    <div className="absolute inset-0 backface-hidden flex items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-[#FF4081] to-[#880E4F] shadow-xl border border-pink-300/30 text-4xl hover:brightness-105 transition-all">
                      <span>{WISH_ICONS[idx % WISH_ICONS.length]}</span>
                    </div>

                    {/* Back: Revealed Secret Wish */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-5 rounded-3xl bg-[#FFF3E6] text-[#4A0A1C] shadow-xl font-serif text-sm sm:text-base leading-snug text-center border border-amber-200">
                      <p>"{wish}"</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: GRAND FINALE */}
        {/* ========================================================================= */}
        <section 
          className="py-24 px-4 sm:px-6 flex flex-col items-center text-center border-t border-pink-400/20"
          style={{ background: `radial-gradient(circle at center, ${currentTheme.bgGradFrom} 0%, ${currentTheme.bgMain} 90%)` }}
        >
          <div className="text-[11px] font-bold tracking-[0.28em] uppercase text-amber-300 mb-3">
            ✦ Grand Finale ✦
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight bg-gradient-to-r from-[#FFD54F] via-[#FF4081] to-[#FFD54F] bg-clip-text text-transparent mb-4 animate-pulse">
            Happy Birthday, {personName}!
          </h2>

          <p className="text-base sm:text-lg text-rose-100/90 max-w-md mx-auto mb-8 font-light">
            Here's to you, today and every single day after. Cheers to another year of brilliance!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={triggerGrandConfetti}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF4081] to-[#D81B60] hover:brightness-110 text-white font-bold tracking-wide text-sm sm:text-base shadow-[0_12px_35px_rgba(255,64,129,0.5)] cursor-pointer active:scale-95 transition-all"
            >
              Celebrate Again 🎉
            </button>

            {onOrder && (
              <button
                onClick={handleOrderWithCustomData}
                className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base border border-emerald-400/30 cursor-pointer active:scale-95 transition-all shadow-lg"
              >
                Order This Experience 🛍️
              </button>
            )}
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* INTERACTIVE BIRTHDAY TEMPLATE LIVE EDITOR (SIDE DRAWER) */}
      {/* ========================================================================= */}
      {isEditorOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditorOpen(false);
          }}
        >
          <div className="w-full max-w-lg h-full bg-[#1E0712] border-l border-pink-300/30 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-pink-300/20 bg-black/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF4081] to-[#880E4F] text-white">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    Birthday Live Customizer
                  </h3>
                  <p className="text-[11px] sm:text-xs text-pink-200/80 font-normal">
                    Real-time instant preview as you customize
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Close Editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editor Category Tabs */}
            <div className="flex items-center gap-1 p-2 bg-black/30 border-b border-white/10 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveEditTab('basic')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeEditTab === 'basic' ? 'bg-[#FF4081] text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Cake className="w-3.5 h-3.5" />
                <span>Basic Info</span>
              </button>
              <button
                onClick={() => setActiveEditTab('letter')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeEditTab === 'letter' ? 'bg-[#FF4081] text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Letter</span>
              </button>
              <button
                onClick={() => setActiveEditTab('photos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeEditTab === 'photos' ? 'bg-[#FF4081] text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => setActiveEditTab('balloons')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeEditTab === 'balloons' ? 'bg-[#FF4081] text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Balloons & Wishes</span>
              </button>
              <button
                onClick={() => setActiveEditTab('style')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeEditTab === 'style' ? 'bg-[#FF4081] text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Themes</span>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-left text-xs sm:text-sm">
              
              {/* TAB 1: BASIC INFO */}
              {activeEditTab === 'basic' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-200 text-xs">
                    💡 Changing the name here automatically updates the hero banner, lock screen, letter, cake, and finale!
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-1.5">
                      Birthday Person's Name *
                    </label>
                    <input
                      type="text"
                      value={personName}
                      onChange={(e) => {
                        setPersonName(e.target.value);
                      }}
                      placeholder="e.g. Ahnaf, Sarah, Ayaan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-1.5">
                      Milestone / Turning Age (Subtitle Tag)
                    </label>
                    <input
                      type="text"
                      value={ageText}
                      onChange={(e) => setAgeText(e.target.value)}
                      placeholder="e.g. 25th Birthday Celebration / 1st Birthday"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-1.5">
                      Hero Greeting Headline
                    </label>
                    <input
                      type="text"
                      value={heroHeadline}
                      onChange={(e) => setHeroHeadline(e.target.value)}
                      placeholder="e.g. Happy Birthday"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-1.5">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      rows={2}
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="Celebratory greeting note..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-1.5">
                      Cake Wish Note (Revealed upon cutting cake)
                    </label>
                    <input
                      type="text"
                      value={cakeWishMessage}
                      onChange={(e) => setCakeWishMessage(e.target.value)}
                      placeholder="e.g. May every wish come true..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Mobile Lock Screen Settings */}
                  <div className="pt-4 border-t border-white/15">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-1.5 text-pink-300">
                      <Lock className="w-4 h-4" />
                      <span>Mobile Lock Screen Settings</span>
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-white/90 font-medium mb-1.5 text-xs">
                          4-Digit Secret Passcode *
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={passcode}
                          onChange={(e) => setPasscode(e.target.value)}
                          placeholder="e.g. 2026"
                          className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-center tracking-widest text-base focus:border-[#FF4081] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white/90 font-medium mb-1.5 text-xs">
                          Passcode Hint for Guest
                        </label>
                        <input
                          type="text"
                          value={passcodeHint}
                          onChange={(e) => setPasscodeHint(e.target.value)}
                          placeholder="e.g. The secret passcode is 2026 🎂"
                          className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-white/90 font-medium mb-1.5 text-xs">
                          Lock Screen Headline
                        </label>
                        <input
                          type="text"
                          value={lockHeading}
                          onChange={(e) => setLockHeading(e.target.value)}
                          placeholder="e.g. A Special Birthday Surprise"
                          className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-white/90 font-medium mb-1.5 text-xs">
                          Lock Screen Paragraph Message
                        </label>
                        <textarea
                          rows={2}
                          value={lockSubtitle}
                          onChange={(e) => setLockSubtitle(e.target.value)}
                          placeholder="Heartfelt delivery note..."
                          className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors text-xs resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HEARTFELT LETTER */}
              {activeEditTab === 'letter' && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-white/90 font-medium">
                        Quick Preset Templates:
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                      {LETTER_PRESETS.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => {
                            setLetterText(preset.text);
                            setLetterSignoff(preset.signoff);
                            showToast(`"${preset.label}" letter loaded!`);
                          }}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-left text-xs text-pink-200 hover:text-white transition-colors cursor-pointer"
                        >
                          <div className="font-semibold">{preset.label}</div>
                          <div className="text-[10px] text-white/60">Click to load</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-1.5">
                      Letter Body *
                    </label>
                    <textarea
                      rows={8}
                      value={letterText}
                      onChange={(e) => setLetterText(e.target.value)}
                      placeholder="Write your heart out..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors font-sans text-xs sm:text-sm leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 font-medium mb-1.5">
                      Sign-off Signature
                    </label>
                    <input
                      type="text"
                      value={letterSignoff}
                      onChange={(e) => setLetterSignoff(e.target.value)}
                      placeholder="e.g. — With all my love / — Your best friend"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#FF4081] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: PHOTOS & MEMORIES */}
              {activeEditTab === 'photos' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs">
                    📸 Upload photos directly from your phone/computer or paste image URLs!
                  </div>

                  <div className="space-y-3">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/15 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-pink-200 text-xs">
                            Photo #{idx + 1}
                          </span>
                          <button
                            onClick={() => handleTriggerUpload(idx)}
                            className="px-2.5 py-1 rounded-lg bg-[#FF4081] hover:bg-[#D81B60] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload from Device</span>
                          </button>
                        </div>

                        <div className="flex gap-3 items-center">
                          <img 
                            src={photo.src} 
                            alt={`Preview ${idx + 1}`} 
                            className="w-16 h-16 rounded-lg object-cover border border-white/20 shrink-0" 
                          />
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              value={photo.src.startsWith('data:') ? '(Custom Uploaded Image)' : photo.src}
                              disabled={photo.src.startsWith('data:')}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPhotos((prev) => {
                                  const next = [...prev];
                                  next[idx] = { ...next[idx], src: val };
                                  return next;
                                });
                              }}
                              placeholder="Image web URL..."
                              className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder-white/30"
                            />
                            <input
                              type="text"
                              value={photo.cap}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPhotos((prev) => {
                                  const next = [...prev];
                                  next[idx] = { ...next[idx], cap: val };
                                  return next;
                                });
                              }}
                              placeholder="Photo caption..."
                              className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder-white/30"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: BALLOONS & WISHES */}
              {activeEditTab === 'balloons' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-bold mb-2">
                      Balloon Hidden Messages (10 Messages):
                    </h4>
                    <div className="space-y-2">
                      {balloonMessages.map((msg, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <span className="text-[11px] text-pink-300 font-mono w-5">
                            #{bIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={msg}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBalloonMessages((prev) => {
                                const next = [...prev];
                                next[bIdx] = val;
                                return next;
                              });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white text-xs placeholder-white/30 focus:border-[#FF4081] focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/15">
                    <h4 className="text-white font-bold mb-2">
                      3D Flip Cards Secret Wishes (6 Wishes):
                    </h4>
                    <div className="space-y-2">
                      {wishes.map((w, wIdx) => (
                        <div key={wIdx} className="flex items-center gap-2">
                          <span className="text-[11px] text-pink-300 font-mono w-5">
                            #{wIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={w}
                            onChange={(e) => {
                              const val = e.target.value;
                              setWishes((prev) => {
                                const next = [...prev];
                                next[wIdx] = val;
                                return next;
                              });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white text-xs placeholder-white/30 focus:border-[#FF4081] focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: THEME & STYLE */}
              {activeEditTab === 'style' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/90 font-medium mb-2">
                      Choose Color Theme Palette:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((key) => {
                        const t = THEMES[key];
                        const isSelected = themeColor === key;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setThemeColor(key);
                              showToast(`"${t.name}" theme activated!`);
                            }}
                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                              isSelected 
                                ? 'border-[#FF4081] bg-white/15 ring-2 ring-[#FF4081]' 
                                : 'border-white/15 bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <span 
                                className="w-4 h-4 rounded-full border border-white/30 shadow-xs" 
                                style={{ backgroundColor: t.accent }} 
                              />
                              <span className="font-semibold text-white text-xs">
                                {t.name}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white text-xs sm:text-sm">
                        Celebration Background Music
                      </span>
                      <button
                        onClick={toggleMusic}
                        className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-pink-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-[#FF4081]" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>{isPlayingAudio ? 'Music Playing' : 'Music Muted'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-white/60">
                      Plays automatically or via guest tap when opening the surprise.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Action Footer */}
            <div className="p-4 bg-black/60 border-t border-white/15 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetDefaults}
                  className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset to default values"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={() => {
                    setIsEditorOpen(false);
                    showToast('Previewing your customized template!');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4081] to-[#D81B60] hover:brightness-110 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <Check className="w-4 h-4" />
                  <span>View Full Preview (Hide Editor)</span>
                </button>
              </div>

              {onOrder && (
                <button
                  onClick={handleOrderWithCustomData}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-lg cursor-pointer transition-all"
                >
                  <span>Order with These Custom Details 🛍️</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
