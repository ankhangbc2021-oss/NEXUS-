'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const loreEntries = [
  { year: '2089', title: 'The Genesis Event', description: 'A quantum anomaly tears through reality, creating rifts between parallel dimensions. The world is forever changed.', color: 'var(--neon-blue)' },
  { year: '2091', title: 'Project NEXUS', description: 'World governments form NEXUS to control the dimensional rifts before they consume everything. A desperate alliance forms.', color: 'var(--neon-purple)' },
  { year: '2094', title: 'The Agent Program', description: 'NEXUS recruits individuals with abilities enhanced by rift energy — humanity\'s last defense against the unknown.', color: 'var(--neon-pink)' },
  { year: '2097', title: 'The Convergence', description: 'Dimensions collapse into one. Agents fight across realities to prevent total annihilation. The final battle begins.', color: 'var(--neon-red)' },
];

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95, rotateX: 5 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="story" className="relative py-32 md:py-48 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(176,0,255,0.3), transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.2), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-24">
          <span className="font-mono text-xs tracking-[0.5em] text-neon-purple/60 uppercase block mb-4">The Story</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-wider"><span className="gradient-text">Universe Lore</span></h2>
          <p className="font-body text-sm text-white/30 mt-4 max-w-lg mx-auto tracking-wide">Uncover the events that shaped the NEXUS universe</p>
          <div className="energy-line max-w-xs mx-auto mt-8" />
        </motion.div>

        <div className="relative">
          {/* Animated timeline spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] origin-top"
            style={{ background: 'linear-gradient(180deg, var(--neon-blue), var(--neon-purple), var(--neon-pink), transparent)' }}
          />

          {loreEntries.map((entry, i) => (
            <div
              key={entry.year}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative flex items-start mb-16 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
              style={{ perspective: '1000px' }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  animate={{ boxShadow: [`0 0 10px ${entry.color}`, `0 0 25px ${entry.color}`, `0 0 10px ${entry.color}`] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full"
                  style={{ background: entry.color }}
                />
              </div>

              <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className="glass-card p-6 md:p-8 group transition-all duration-500 hover:translate-y-[-4px]">
                  <span className="font-display text-3xl font-black block mb-2 opacity-20" style={{ color: entry.color }}>{entry.year}</span>
                  <h3 className="font-display text-xl font-bold tracking-wider text-white mb-3">{entry.title}</h3>
                  <p className="font-body text-sm text-white/40 leading-relaxed">{entry.description}</p>
                  {/* Holographic underline */}
                  <div className="w-0 group-hover:w-full h-[1px] mt-4 transition-all duration-700" style={{ background: `linear-gradient(90deg, ${entry.color}, transparent)` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 energy-line" />
    </section>
  );
}
