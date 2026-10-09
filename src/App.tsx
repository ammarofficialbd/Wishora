import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoyalWeddingBanner } from './components/RoyalWeddingBanner';
import { TemplatesSection } from './components/TemplatesSection';
import { ReinventedSection } from './components/ReinventedSection';
import { HowItWorks } from './components/HowItWorks';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LiveInviteModal } from './components/LiveInviteModal';
import { CustomizeOrderModal } from './components/CustomizeOrderModal';
import { CustomInquiryModal } from './components/CustomInquiryModal';
import { FullscreenMenuModal } from './components/FullscreenMenuModal';
import { CursorLighting } from './components/CursorLighting';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollReveal } from './components/ScrollReveal';
import { FloatingHearts } from './components/FloatingHearts';
import { BirthdaySurpriseTemplate } from './components/BirthdaySurpriseTemplate';
import { TEMPLATES } from './data/templates';
import { TemplateItem } from './types';

export default function App() {
  // Modal states
  const [selectedTemplateForLiveDemo, setSelectedTemplateForLiveDemo] = useState<TemplateItem | null>(null);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [templateForCustomization, setTemplateForCustomization] = useState<TemplateItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // Check URL route for standalone template demo (e.g. /template/birthday01 or ?template=birthday01)
  const checkIsBirthdayDemoRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      path.includes('birthday01') || 
      path.includes('birtday01') || 
      search.includes('birthday01') || 
      search.includes('birtday01') ||
      hash.includes('birthday01') ||
      hash.includes('birtday01')
    );
  };

  const [isStandaloneBirthdayDemo, setIsStandaloneBirthdayDemo] = useState(checkIsBirthdayDemoRoute);
  const [isBirthdayEditMode, setIsBirthdayEditMode] = useState(false);

  useEffect(() => {
    const handleUrlChange = () => {
      setIsStandaloneBirthdayDemo(checkIsBirthdayDemoRoute());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Initialize Lenis for Butter-smooth Momentum Inertia Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Handlers
  const handleOpenLiveDemoById = (templateId: string) => {
    const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
    setSelectedTemplateForLiveDemo(template);
  };

  const handleOpenBirthdayDemo = (editMode = false) => {
    setSelectedTemplateForLiveDemo(null);
    window.history.pushState({}, '', '/template/birthday01');
    setIsBirthdayEditMode(editMode);
    setIsStandaloneBirthdayDemo(true);
  };

  const handleOpenCustomize = (template?: TemplateItem) => {
    setTemplateForCustomization(template || TEMPLATES[0]);
    setIsCustomizeModalOpen(true);
  };

  const handleChooseTemplateScroll = () => {
    const el = document.getElementById('templates-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenCustomize();
    }
  };

  if (isStandaloneBirthdayDemo) {
    const goldenTemplate = TEMPLATES.find((t) => t.id === 'golden-birthday-gala') || TEMPLATES[1];
    return (
      <div className="min-h-screen bg-[#2a0610]">
        <BirthdaySurpriseTemplate
          name="Ahnaf"
          isEmbedded={false}
          initialEditMode={isBirthdayEditMode}
          onClose={() => {
            window.history.pushState({}, '', '/');
            setIsStandaloneBirthdayDemo(false);
            setIsBirthdayEditMode(false);
          }}
          onOrder={() => {
            window.history.pushState({}, '', '/');
            setIsStandaloneBirthdayDemo(false);
            setIsBirthdayEditMode(false);
            handleOpenCustomize(goldenTemplate);
          }}
        />
        {isCustomizeModalOpen && (
          <CustomizeOrderModal
            initialTemplate={templateForCustomization}
            onClose={() => setIsCustomizeModalOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1c1b1f] flex flex-col font-sans selection:bg-[#f2dfc7] selection:text-[#382210] relative">
      {/* Background Floating Love Hearts (Rising Water Bubble Style) */}
      <FloatingHearts />

      {/* Premium Cursor Lighting Glow Spotlight */}
      <CursorLighting />

      {/* Smooth Scroll Progress Top Bar & Back to Top */}
      <ScrollProgress />

      {/* 1. Header / Navbar */}
      <Navbar 
        onChooseTemplate={handleChooseTemplateScroll} 
        onOpenMenu={() => setIsMenuModalOpen(true)}
        onOpenInquiry={() => setIsInquiryModalOpen(true)} 
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero 
          onChooseTemplate={handleChooseTemplateScroll}
          onSelectTemplate={handleOpenLiveDemoById}
        />

        {/* 3. The Royal Wedding Edit Section (Commented out by user) */}
        {/*
        <ScrollReveal distance={40} duration={0.8}>
          <RoyalWeddingBanner
            onOpenDemo={() => handleOpenLiveDemoById('vrindavan')}
            onBuyNow={() => {
              const weddingTemplate = TEMPLATES.find((t) => t.id === 'vrindavan') || TEMPLATES[0];
              handleOpenCustomize(weddingTemplate);
            }}
          />
        </ScrollReveal>
        */}

        {/* 4. Templates Catalog Section */}
        <ScrollReveal distance={40} duration={0.8}>
          <TemplatesSection
            onSelectTemplate={handleOpenLiveDemoById}
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
            onOpenBirthdayDemo={handleOpenBirthdayDemo}
          />
        </ScrollReveal>

        {/* 5. "The Wedding Invite, Reinvented." Feature Grid */}
        <ScrollReveal distance={40} duration={0.8}>
          <ReinventedSection 
            onChooseTemplate={handleChooseTemplateScroll} 
          />
        </ScrollReveal>

        {/* 6. "Your Dream Invite, Made For You in Minutes" 3-Step Flow */}
        <ScrollReveal distance={40} duration={0.8}>
          <HowItWorks 
            onChooseTemplate={handleChooseTemplateScroll} 
          />
        </ScrollReveal>

        {/* 7. Transparent Pricing Section */}
        <ScrollReveal distance={40} duration={0.8}>
          <PricingSection 
            onChooseTemplate={handleChooseTemplateScroll}
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
          />
        </ScrollReveal>

        {/* 8. Testimonials: Don't Take Our Word for It */}
        <ScrollReveal distance={40} duration={0.8}>
          <TestimonialsSection />
        </ScrollReveal>

        {/* 9. Blog & Stories Section */}
        <ScrollReveal distance={40} duration={0.8}>
          <BlogSection
            onChooseTemplate={handleChooseTemplateScroll}
            onSelectTemplate={handleOpenLiveDemoById}
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
          />
        </ScrollReveal>

        {/* 10. Frequently Asked Questions */}
        <ScrollReveal distance={40} duration={0.8}>
          <FaqSection 
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
            onChooseTemplate={handleChooseTemplateScroll}
          />
        </ScrollReveal>
      </main>

      {/* 9. Footer */}
      <Footer 
        onChooseTemplate={handleChooseTemplateScroll} 
        onOpenInquiry={() => setIsInquiryModalOpen(true)} 
      />

      {/* Root-Level Fullscreen Menu Modal */}
      <FullscreenMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onChooseTemplate={handleChooseTemplateScroll}
      />

      {/* Modals & Overlays */}
      {selectedTemplateForLiveDemo && (
        <LiveInviteModal
          template={selectedTemplateForLiveDemo}
          onClose={() => setSelectedTemplateForLiveDemo(null)}
          onCustomize={(template) => {
            setSelectedTemplateForLiveDemo(null);
            handleOpenCustomize(template);
          }}
          onOpenBirthdayDemo={handleOpenBirthdayDemo}
        />
      )}

      {isCustomizeModalOpen && (
        <CustomizeOrderModal
          initialTemplate={templateForCustomization}
          onClose={() => setIsCustomizeModalOpen(false)}
        />
      )}

      {isInquiryModalOpen && (
        <CustomInquiryModal
          onClose={() => setIsInquiryModalOpen(false)}
        />
      )}
    </div>
  );
}
