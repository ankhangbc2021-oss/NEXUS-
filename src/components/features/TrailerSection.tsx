'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TrailerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="trailer" className="relative py-32 md:py-48 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(255,0,60,0.2), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.5em] text-neon-red/60 uppercase block mb-4">Cinematic</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-wider"><span className="gradient-text">Official Trailer</span></h2>
          <p className="font-body text-sm text-white/30 mt-4 max-w-lg mx-auto tracking-wide">Witness the NEXUS universe come alive</p>
          <div className="energy-line max-w-xs mx-auto mt-8" />
        </motion.div>

        {/* Video Container */}
        <div ref={containerRef} className="relative aspect-video rounded-2xl overflow-hidden group" data-cursor-hover>
          <div className="absolute inset-0 bg-cyber-gray flex items-center justify-center">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.05) 0%, transparent 60%)' }} />
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Animated energy ring behind play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-40 h-40 rounded-full border border-neon-blue/5"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute w-32 h-32 rounded-full border border-neon-purple/5"
              />
            </div>

            {/* Play button */}
            {!isPlaying && (
              <motion.button
                onClick={() => setIsPlaying(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-20 h-20 md:w-28 md:h-28 rounded-full border border-neon-blue/30 flex items-center justify-center group/btn cursor-none"
                data-cursor-hover
              >
                <div className="absolute inset-0 rounded-full bg-neon-blue/5 group-hover/btn:bg-neon-blue/10 transition-colors" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-neon-blue/20"
                />
                <motion.div
                  animate={{ scale: [1.3, 1.6, 1.3], opacity: [0.15, 0, 0.15] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="absolute inset-0 rounded-full border border-neon-blue/10"
                />
                <svg className="w-8 h-8 md:w-10 md:h-10 text-neon-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            )}
            {isPlaying && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 border border-neon-blue/30 rounded-full border-t-neon-blue mx-auto mb-4"
                  />
                  <p className="font-mono text-sm text-neon-blue/40 tracking-widest">TRAILER LOADING...</p>
                </div>
              </div>
            )}
          </div>

          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-neon-blue/20 transition-colors duration-500 pointer-events-none" />
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-neon-blue/20 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-neon-blue/20 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-neon-blue/20 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-neon-blue/20 rounded-br-2xl" />
        </div>

        {/* Cinematic info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-8 mt-8"
        >
          {['4K Ultra HD', 'Dolby Atmos', 'HDR10+'].map((label) => (
            <span key={label} className="font-mono text-[10px] tracking-[0.3em] text-white/15 uppercase">{label}</span>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 energy-line" />
    </section>
  );
}
