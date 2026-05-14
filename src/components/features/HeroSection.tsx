'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

const HeroScene = dynamic(() => import('@/components/scenes/HeroScene'), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0, 240, 255, 0.06), transparent 40%)`;
      }
    };
    window.addEventListener('mousemove', handleMouse);

    // GSAP parallax on scroll
    if (titleRef.current && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.to(titleRef.current, {
          yPercent: -30,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }, sectionRef);
      return () => {
        ctx.revert();
        window.removeEventListener('mousemove', handleMouse);
      };
    }

    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mouse-reactive glow */}
      <div ref={glowRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* Animated Grid */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Radial glow from center */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(176, 0, 255, 0.04) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* 3D Scene */}
      <HeroScene />

      {/* Content */}
      <div ref={titleRef} className="relative z-10 text-center px-6 max-w-5xl">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6"
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.5em] text-neon-blue/60 uppercase">
            Season 01 — Genesis Protocol
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.1em] mb-6"
        >
          <span className="shimmer-text">NEXUS</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.3, ease: [0.23, 1, 0.32, 1] }}
          className="font-body text-lg md:text-2xl text-white/40 tracking-[0.2em] uppercase mb-12 max-w-2xl mx-auto"
        >
          Enter the next dimension of competitive gaming
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#download" className="magnetic-btn group" data-cursor-hover>
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Play Free
            </span>
          </a>

          <a href="#trailer" className="magnetic-btn !border-neon-purple/30 !text-neon-purple hover:!border-neon-purple hover:!text-white group" data-cursor-hover>
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Watch Trailer
            </span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
          className="flex justify-center gap-12 md:gap-20 mt-20"
        >
          {[
            { value: '2.4M', label: 'Active Players' },
            { value: '16', label: 'Unique Agents' },
            { value: '∞', label: 'Possibilities' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold neon-text text-neon-blue">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.5em] text-white/20 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-neon-blue/50 to-transparent"
        />
      </motion.div>

      {/* Bottom Energy Line */}
      <div className="absolute bottom-0 left-0 right-0 energy-line" />
    </section>
  );
}
