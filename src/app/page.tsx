'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/features/HeroSection';
import StorySection from '@/components/features/StorySection';
import CharacterSection from '@/components/features/CharacterSection';
import GameplaySection from '@/components/features/GameplaySection';
import WeaponsSection from '@/components/features/WeaponsSection';
import MultiplayerSection from '@/components/features/MultiplayerSection';
import TrailerSection from '@/components/features/TrailerSection';
import DownloadSection from '@/components/features/DownloadSection';
import Footer from '@/components/features/Footer';

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/systems/ParticleField'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/systems/SmoothScroll'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Register GSAP ScrollTrigger globally
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <SmoothScroll>
      <main className="relative">
        {/* Systems */}
        <LoadingScreen />
        <CustomCursor />
        <ParticleField />

        {/* Overlays */}
        <div className="scan-line-overlay" />
        <div className="noise-overlay" />
        <div className="vignette" />

        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <HeroSection />
        <div className="section-divider" />
        <StorySection />
        <div className="section-divider" />
        <CharacterSection />
        <div className="section-divider" />
        <GameplaySection />
        <div className="section-divider" />
        <WeaponsSection />
        <div className="section-divider" />
        <MultiplayerSection />
        <div className="section-divider" />
        <TrailerSection />
        <div className="section-divider" />
        <DownloadSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
