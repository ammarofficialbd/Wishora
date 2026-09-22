import React from 'react';
import { ArrowUpRight, Key } from 'lucide-react';

interface HeroProps {
  onChooseTemplate: () => void;
  onSelectTemplate: (templateId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onChooseTemplate, onSelectTemplate }) => {
  // Column 1 Cards (Row/Lane 1 - Moves UPPER)
  const col1Cards = [
    {
      id: 'farhan-samira',
      templateId: 'rajwada-vivah',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between text-stone-800 bg-gradient-to-b from-[#b8c9d9] via-[#8faec7] to-[#5c7a96] overflow-hidden select-none">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:18px_18px]" />
          
          <div className="relative z-10 text-center pt-1.5">
            <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-white/40 backdrop-blur-xs flex items-center justify-center text-amber-950 text-xs font-serif-luxury shadow-xs border border-white/50">
              ✨
            </div>
            <p className="text-[11px] sm:text-xs font-cinzel tracking-widest text-neutral-800 font-bold">
              ROYAL CELEBRATION
            </p>
            <p className="text-[9px] sm:text-[10px] tracking-wider uppercase text-neutral-700 font-semibold mt-0.5">
              TOGETHER WITH OUR FAMILIES
            </p>
          </div>

          <div className="relative z-10 text-center my-auto py-1">
            <h3 className="text-2xl sm:text-3xl font-script text-neutral-900 leading-none drop-shadow-xs">
              Farhan
            </h3>
            <p className="text-xs sm:text-sm font-serif-accent italic text-neutral-700 my-0.5">
              weds
            </p>
            <h3 className="text-2xl sm:text-3xl font-script text-neutral-900 leading-none drop-shadow-xs">
              Samira
            </h3>
          </div>

          <div className="relative z-10 text-center pb-1">
            <p className="text-[10px] sm:text-[11px] text-neutral-800/90 font-medium leading-relaxed max-w-[200px] mx-auto bg-white/30 backdrop-blur-xs py-1 px-2.5 rounded-full border border-white/40 shadow-xs">
              Radisson Blu Water Garden, Dhaka
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'tanvir-nusrat',
      templateId: 'noor-zafar',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#c5e1f7] via-[#dcedf9] to-[#edf4f9] text-stone-800 overflow-hidden select-none">
          <div className="absolute top-2.5 left-2.5 text-pink-400 text-lg">🌸</div>
          <div className="absolute top-2.5 right-2.5 text-pink-400 text-lg">🌸</div>
          <div className="absolute top-1 inset-x-0 flex justify-center gap-6 text-amber-600/40 text-xs">
            <span>✨</span>
            <span>✨</span>
          </div>

          <div className="relative z-10 text-center pt-2">
            <p className="text-[9px] sm:text-[10px] text-stone-600 leading-relaxed">
              Cordially invite you to attend the<br />Wedding reception of
            </p>
            
            <div className="my-2 sm:my-2.5">
              <h4 className="text-2xl sm:text-3xl font-script text-rose-800 font-bold">
                Tanvir
              </h4>
              <p className="text-[9px] sm:text-[10px] text-pink-600 font-bold my-0.5 flex items-center justify-center gap-1">
                <span>✦</span> WITH <span>✦</span>
              </p>
              <h4 className="text-2xl sm:text-3xl font-script text-rose-800 font-bold">
                Nusrat
              </h4>
            </div>

            <p className="text-[9px] sm:text-[10px] text-stone-500">
              Pan Pacific Sonargaon, Dhaka
            </p>
          </div>

          <div className="relative z-10 bg-white/80 backdrop-blur-xs border border-blue-200/80 rounded-xl p-2 text-center shadow-sm">
            <p className="text-[11px] sm:text-xs font-bold text-stone-800 font-serif-luxury">24th November 2026</p>
            <p className="text-[9px] sm:text-[10px] text-stone-600">Grand Ballroom, Dhaka</p>
          </div>
        </div>
      )
    }
  ];

  // Column 2 Cards (Row/Lane 2 - Moves LOWER)
  const col2Cards = [
    {
      id: 'green-envelope',
      templateId: 'kesariya',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-center items-center bg-[#a2b59f] text-stone-800 overflow-hidden select-none">
          <div className="absolute inset-0 bg-[#a6b9a3] border-[5px] border-[#94a891]" />
          
          <div className="absolute inset-0 opacity-40 flex items-center justify-center p-3">
            <div className="w-full h-full border border-white/50 rounded-xl flex items-center justify-center relative">
              <div className="absolute top-2.5 left-2.5 text-white/80 text-xl">🌿</div>
              <div className="absolute top-2.5 right-2.5 text-white/80 text-xl">🌸</div>
              <div className="absolute bottom-2.5 left-2.5 text-white/80 text-xl">🌸</div>
              <div className="absolute bottom-2.5 right-2.5 text-white/80 text-xl">🌿</div>
            </div>
          </div>

          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#9bb098] to-[#8fa58c] opacity-90 [clip-path:polygon(0_0,100%_0,50%_75%)] shadow-lg" />

          <div className="relative z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#e6c587] via-[#cfa052] to-[#9c6f2a] shadow-xl flex items-center justify-center border-2 border-[#fae8be] transform group-hover:scale-110 transition-transform">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full border border-amber-900/30 flex items-center justify-center text-center">
              <span className="text-amber-950 font-serif-luxury font-bold text-xs sm:text-sm tracking-widest">
                R &amp; P
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 z-10 text-center">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-950 font-cinzel font-bold bg-white/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/40">
              Sage Botanical Invite
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'omar-malak',
      templateId: 'noor-zafar',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#0a1835] via-[#102754] to-[#1c3d78] text-white overflow-hidden select-none">
          <div className="absolute top-3 right-4 text-amber-200 text-xl">🌙</div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-40" />

          <div className="relative z-10 text-center pt-1.5">
            <p className="text-sm sm:text-base font-arabic text-amber-300 drop-shadow-xs">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-blue-200 font-semibold mt-0.5">
              WE'RE GETTING MARRIED
            </p>
          </div>

          <div className="relative z-10 text-center my-auto py-1">
            <h4 className="text-2xl sm:text-3xl font-script text-amber-200 font-bold">
              Omar <span className="text-white text-lg">&amp;</span> Malak
            </h4>
            <p className="text-xs font-arabic text-amber-300/90 mt-0.5">
              في الدنيا والآخرة
            </p>
          </div>

          <div className="relative z-10 text-center pb-1">
            <p className="text-[11px] sm:text-xs font-cinzel font-bold tracking-wider text-amber-300 mb-1.5">
              20 SEPTEMBER 2026
            </p>
            <div className="w-full py-1 bg-blue-900/60 rounded-xl border border-blue-400/30 flex items-center justify-center text-[9px] sm:text-[10px] text-blue-200 font-medium">
              Nikah Mubarak Celebration
            </div>
          </div>
        </div>
      )
    }
  ];

  // Column 3 Cards (Row/Lane 3 - Moves UPPER)
  const col3Cards = [
    {
      id: 'rayhan-sadia',
      templateId: 'celestial-ring',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#fdf2f8] via-[#fce7f3] to-[#fbcfe8] text-[#831843] overflow-hidden select-none">
          <div className="relative z-10 text-center pt-1.5">
            <p className="text-[9px] sm:text-[10px] text-pink-900/80 font-serif-luxury uppercase tracking-wider">
              Together With Their Loved Ones
            </p>
            <div className="w-7 h-7 mx-auto my-1 rounded-full bg-pink-500/20 text-pink-700 text-xs font-bold flex items-center justify-center border border-pink-500/40 shadow-xs">
              💍
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center my-auto py-1">
            <h4 className="text-2xl sm:text-3xl font-script text-pink-900 font-bold">
              Rayhan &amp; Sadia
            </h4>
            <p className="text-[10px] sm:text-[11px] text-pink-800 font-medium mt-1">
              InterContinental, Dhaka
            </p>
          </div>

          <div className="relative z-10 text-center pb-1">
            <span className="text-[9px] sm:text-[10px] bg-pink-900/10 text-pink-900 px-2.5 py-0.5 rounded-full font-semibold border border-pink-900/20">
              Engagement &amp; Ring Exchange
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'sam-sofia',
      templateId: 'grace-cathedral',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between bg-[#faf7f5] text-stone-900 overflow-hidden select-none">
          <div className="absolute inset-y-0 left-0 w-8 sm:w-10 bg-gradient-to-r from-[#4d0c15] via-[#851624] to-[#a81c2f] shadow-lg [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]" />
          <div className="absolute inset-y-0 right-0 w-8 sm:w-10 bg-gradient-to-l from-[#4d0c15] via-[#851624] to-[#a81c2f] shadow-lg [clip-path:polygon(0_0,100%_0,100%_100%,30%_100%)]" />

          <div className="relative z-10 text-center px-3 pt-3">
            <p className="text-[8px] sm:text-[9px] font-serif-luxury uppercase tracking-widest text-stone-500">
              YOU ARE CORDIALLY INVITED TO CELEBRATE
            </p>
          </div>

          <div className="relative z-10 text-center my-auto px-3 py-2">
            <h4 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-neutral-900">
              Sam
            </h4>
            <p className="text-sm font-script text-rose-700 my-0.5">
              &amp;
            </p>
            <h4 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-neutral-900">
              Sofia
            </h4>
          </div>

          <div className="relative z-10 text-center pb-1">
            <p className="text-[11px] sm:text-xs font-bold text-stone-700">15 December 2026</p>
            <p className="text-[9px] sm:text-[10px] text-stone-500">St. Mary's Cathedral, Sydney</p>
          </div>
        </div>
      )
    }
  ];

  // Column 4 Cards (Row/Lane 4 - Moves LOWER)
  const col4Cards = [
    {
      id: 'rajasthani-jharokha',
      templateId: 'vrindavan',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#dfbda5] via-[#caa085] to-[#b7896c] overflow-hidden select-none">
          <div className="absolute inset-0 p-3 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-1.5 opacity-40">
              <div className="h-10 border-t-2 border-x-2 border-stone-800 rounded-t-full bg-stone-900/10" />
              <div className="h-10 border-t-2 border-x-2 border-stone-800 rounded-t-full bg-stone-900/10" />
              <div className="h-10 border-t-2 border-x-2 border-stone-800 rounded-t-full bg-stone-900/10" />
            </div>

            <div className="relative w-full h-36 border-2 border-stone-800/60 rounded-t-[36px] bg-[#dfb498]/60 p-2.5 flex items-end justify-center gap-2">
              <div className="flex items-end justify-center gap-2 mb-0.5">
                <div className="w-7 h-16 bg-emerald-800 rounded-t-lg relative flex flex-col items-center shadow-md">
                  <div className="w-3.5 h-3.5 bg-[#d49e7b] rounded-full -top-3.5 absolute">
                    <div className="w-4 h-2 bg-amber-500 rounded-t-full -top-1 absolute" />
                  </div>
                </div>
                <div className="w-8 h-15 bg-rose-600 rounded-t-2xl relative flex flex-col items-center shadow-md">
                  <div className="w-3.5 h-3.5 bg-[#d49e7b] rounded-full -top-3.5 absolute">
                    <div className="w-4 h-4 bg-amber-400/80 rounded-full -top-1 absolute opacity-70" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-center pt-1.5">
            <p className="text-[11px] sm:text-xs font-cinzel tracking-widest text-neutral-900 font-bold uppercase">
              Royal Rajasthan Vivah
            </p>
          </div>

          <div className="relative z-10 text-center pb-1 bg-black/45 backdrop-blur-xs rounded-xl p-1.5 border border-white/20">
            <p className="text-[11px] sm:text-xs font-serif-luxury font-bold text-amber-200">
              Kabir &amp; Ananya
            </p>
            <p className="text-[9px] sm:text-[10px] text-amber-300/80">Umaid Bhawan Palace, Jodhpur</p>
          </div>
        </div>
      )
    },
    {
      id: 'house-warming',
      templateId: 'sindoori',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#fcfbfa] to-[#f4eee6] text-stone-800 overflow-hidden border border-stone-200 select-none">
          <div className="absolute inset-2.5 border border-amber-600/20 rounded-xl" />

          <div className="relative z-10 text-center pt-2">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest font-cinzel text-stone-500">
              YOU ARE CORDIALLY INVITED
            </p>
            <h4 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900 mt-1 leading-tight">
              House<br />Warming
            </h4>
            <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-amber-800 font-bold mt-0.5">
              CEREMONY
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center my-auto py-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-lg flex items-center justify-center border-2 border-white">
              <Key className="w-6 h-6 sm:w-7 sm:h-7 text-amber-950 stroke-[2.5]" />
            </div>
          </div>

          <div className="relative z-10 pb-1 flex justify-center">
            <div className="px-3 py-1 rounded-full bg-[#9a7b56] text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-sm">
              OPEN INVITATION
            </div>
          </div>
        </div>
      )
    }
  ];

  // Column 5 Cards (Row/Lane 5 - Moves UPPER)
  const col5Cards = [
    {
      id: 'temple-mandap',
      templateId: 'dakshin',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#69291b] via-[#521e13] to-[#3a130c] text-amber-100 overflow-hidden select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-20" />
          
          <div className="absolute top-1 inset-x-0 flex justify-around text-amber-400 text-xs sm:text-sm pt-1 opacity-90">
            <span>🏵️</span>
            <span>🔔</span>
            <span>🏵️</span>
            <span>🔔</span>
            <span>🏵️</span>
          </div>

          <div className="relative z-10 text-center pt-5">
            <p className="text-[9px] sm:text-[10px] font-cinzel uppercase tracking-widest text-amber-300">
              Subha Muhurtham
            </p>
            <div className="w-8 h-px bg-amber-400/40 mx-auto my-1.5" />
            <h4 className="text-xl sm:text-2xl font-serif-luxury text-amber-100 font-bold">
              Karthik &amp; Meenakshi
            </h4>
          </div>

          <div className="relative z-10 w-full p-2 bg-black/55 border border-amber-500/40 rounded-xl text-center">
            <p className="text-[11px] sm:text-xs text-amber-200 font-medium">18 November 2026</p>
            <p className="text-[9px] sm:text-[10px] text-amber-300/80">Chennai, Tamil Nadu</p>
            <span className="text-[8px] sm:text-[9px] text-emerald-400 font-semibold mt-0.5 inline-block">
              Traditional Vedic Vivaham
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'jodi-hi-thai-ji',
      templateId: 'gulmohar',
      render: () => (
        <div className="w-full h-full relative p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-[#8f1929] via-[#6d101d] to-[#4e0913] text-amber-100 overflow-hidden select-none">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffd700_1.5px,transparent_1.5px)] [background-size:12px_12px]" />

          <div className="relative z-10 text-center pt-1.5">
            <div className="flex justify-center items-center gap-2 text-amber-300 text-xs opacity-80">
              <span>🦚</span>
              <span className="text-[9px] uppercase tracking-widest font-cinzel font-bold">SHREE</span>
              <span>🦚</span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center my-auto py-1">
            <div className="w-15 h-15 sm:w-17 sm:h-17 rounded-full bg-gradient-to-br from-[#f5d78e] via-[#dfb152] to-[#996f24] shadow-xl flex items-center justify-center border-2 border-amber-200 transform group-hover:scale-110 transition-transform">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-amber-950/40 flex items-center justify-center">
                <span className="text-amber-950 font-serif-luxury font-bold text-xs sm:text-sm tracking-wider">
                  JH
                </span>
              </div>
            </div>
            
            <p className="text-xs font-script text-amber-200 mt-2">
              #JodiHIThaiJi
            </p>
          </div>

          <div className="relative z-10 text-center pb-1">
            <p className="text-[9px] sm:text-[10px] text-amber-200/80">
              You're invited to celebrate with us
            </p>
          </div>
        </div>
      )
    }
  ];

  // Repeat columns for continuous seamless vertical loops
  const c1Duplicated = [...col1Cards, ...col1Cards, ...col1Cards];
  const c2Duplicated = [...col2Cards, ...col2Cards, ...col2Cards];
  const c3Duplicated = [...col3Cards, ...col3Cards, ...col3Cards];
  const c4Duplicated = [...col4Cards, ...col4Cards, ...col4Cards];
  const c5Duplicated = [...col5Cards, ...col5Cards, ...col5Cards];

  return (
    <section className="relative pt-10 pb-4 sm:pt-14 sm:pb-6 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F1E7] to-[#FAF8F5]">
      {/* Ambient warm champagne & rose background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-amber-200/35 via-rose-100/30 to-amber-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-[#8C5D2E] text-xs sm:text-sm font-semibold mb-4">
          <span className="text-amber-600">✦</span>
          <span>For moments worth remembering</span>
          <span className="text-amber-600">✦</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-[#2B1724] tracking-tight leading-[1.14] mb-5 font-serif-luxury max-w-4xl mx-auto">
          Turn a Special Moment Into<br />
          <span className="font-extrabold text-[#831843]">Something They’ll Never Forget.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#5A454F] text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-8">
          Beautiful, personalized digital experiences made for birthdays, anniversaries, proposals, weddings, and the people who mean the most.
        </p>

        {/* Primary CTA Button */}
        <div className="flex justify-center items-center mb-8 sm:mb-10">
          <button
            onClick={onChooseTemplate}
            id="hero-choose-template-btn"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF1375] via-[#E11D48] to-[#BE185D] hover:brightness-105 text-white text-base font-semibold border border-rose-300/40 hover:scale-105 active:scale-95 transition-all shadow-[0_12px_28px_-6px_rgba(255,19,117,0.4)] hover:shadow-[0_16px_36px_-6px_rgba(255,19,117,0.55)] cursor-pointer flex items-center gap-2 group"
          >
            <span>Choose a template</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 
        3D Angled Moving Showcase Matrix
        - 110 degree left tilt (rotateZ -20deg) with perspective
        - Increased card height & width (w-[270px] to w-[400px], aspect-[3/4.4])
        - Alternating opposite directions:
            Row/Lane 1: UPPER (animate-marquee-up)
            Row/Lane 2: LOWER (animate-marquee-down)
            Row/Lane 3: UPPER (animate-marquee-up)
            Row/Lane 4: LOWER (animate-marquee-down)
            Row/Lane 5: UPPER (animate-marquee-up)
      */}
      <div className="relative w-full h-[540px] sm:h-[640px] md:h-[700px] lg:h-[740px] overflow-hidden pause-on-hover select-none">
        
        {/* Top & Bottom Soft Fade Masks */}
        <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-20 pointer-events-none" />

        {/* Left & Right Soft Fade Masks */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-20 pointer-events-none" />

        {/* 3D Perspective Plane Container (110 degree left tilt) */}
        <div className="hero-3d-plane flex justify-center gap-3.5 sm:gap-4.5 md:gap-5.5 px-4 h-full">
          
          {/* Row/Lane 1: Moves UPPER (Upwards) */}
          <div className="animate-marquee-up flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c1Duplicated.map((card, idx) => (
              <div
                key={`c1-${card.id}-${idx}`}
                onClick={() => onSelectTemplate(card.templateId)}
                className="group relative cursor-pointer aspect-[3/4.2] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-stone-300/80 bg-white transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_28px_60px_rgba(0,0,0,0.25)] shrink-0"
              >
                {card.render()}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row/Lane 2: Moves LOWER (Downwards) */}
          <div className="animate-marquee-down flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c2Duplicated.map((card, idx) => (
              <div
                key={`c2-${card.id}-${idx}`}
                onClick={() => onSelectTemplate(card.templateId)}
                className="group relative cursor-pointer aspect-[3/4.2] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-stone-300/80 bg-white transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_28px_60px_rgba(0,0,0,0.25)] shrink-0"
              >
                {card.render()}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row/Lane 3: Moves UPPER (Upwards) */}
          <div className="animate-marquee-up flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c3Duplicated.map((card, idx) => (
              <div
                key={`c3-${card.id}-${idx}`}
                onClick={() => onSelectTemplate(card.templateId)}
                className="group relative cursor-pointer aspect-[3/4.2] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-stone-300/80 bg-white transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_28px_60px_rgba(0,0,0,0.25)] shrink-0"
              >
                {card.render()}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row/Lane 4: Moves LOWER (Downwards) */}
          <div className="animate-marquee-down flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c4Duplicated.map((card, idx) => (
              <div
                key={`c4-${card.id}-${idx}`}
                onClick={() => onSelectTemplate(card.templateId)}
                className="group relative cursor-pointer aspect-[3/4.2] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-stone-300/80 bg-white transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_28px_60px_rgba(0,0,0,0.25)] shrink-0"
              >
                {card.render()}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row/Lane 5: Moves UPPER (Upwards) */}
          <div className="animate-marquee-up flex flex-col gap-3.5 sm:gap-4.5 md:gap-5.5 w-[210px] sm:w-[250px] md:w-[285px] lg:w-[315px] shrink-0">
            {c5Duplicated.map((card, idx) => (
              <div
                key={`c5-${card.id}-${idx}`}
                onClick={() => onSelectTemplate(card.templateId)}
                className="group relative cursor-pointer aspect-[3/4.2] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-stone-300/80 bg-white transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_28px_60px_rgba(0,0,0,0.25)] shrink-0"
              >
                {card.render()}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
