'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const modes = [
  { name: 'CONVERGENCE', type: '5v5 Tactical', desc: 'Strategic team-based combat across shifting dimensional arenas. Plant the Rift Spike to secure zones and eliminate the opposing team.', icon: '⬡', color: '#00f0ff', players: '10', maps: '7' },
  { name: 'RIFT WARS', type: 'Battle Royale', desc: 'Drop into a collapsing dimension. Last squad standing survives the convergence. Scavenge quantum loot to survive.', icon: '◇', color: '#b000ff', players: '60', maps: '3' },
  { name: 'NEXUS BREACH', type: 'Objective', desc: 'Attack or defend NEXUS facilities in asymmetric warfare across multiple phases. Coordination is key.', icon: '△', color: '#ff00aa', players: '12', maps: '5' },
];

export default function GameplaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateY: -5 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.15,
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="gameplay" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.3), transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.5em] text-neon-blue/60 uppercase block mb-4">Game Modes</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-wider"><span className="gradient-text">Gameplay</span></h2>
          <p className="font-body text-sm text-white/30 mt-4 max-w-lg mx-auto tracking-wide">Choose your battleground across multiple dimensions</p>
          <div className="energy-line max-w-xs mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode, i) => (
            <div
              key={mode.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-cursor-hover
              className="glass-card p-8 relative overflow-hidden group cursor-none transition-all duration-700"
              style={{
                perspective: '1000px',
                borderColor: hovered === i ? `${mode.color}30` : undefined,
                boxShadow: hovered === i ? `0 0 40px ${mode.color}15` : undefined,
              }}
            >
              {/* Hover gradient */}
              <motion.div
                animate={{ opacity: hovered === i ? 0.08 : 0 }}
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${mode.color}40, transparent)` }}
              />
              {/* Scan line on hover */}
              {hovered === i && (
                <motion.div
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute left-0 right-0 h-[1px] z-10"
                  style={{ background: `${mode.color}30` }}
                />
              )}
              <div className="relative z-10">
                <motion.div
                  animate={hovered === i ? { scale: 1.1, rotate: 90 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-6 w-16 h-16 flex items-center justify-center rounded-xl border text-neon-blue/60"
                  style={{ borderColor: `${mode.color}30`, color: hovered === i ? mode.color : undefined }}
                >
                  {mode.icon}
                </motion.div>
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-2" style={{ color: `${mode.color}60` }}>{mode.type}</span>
                <h3 className="font-display text-xl font-bold tracking-wider text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">{mode.name}</h3>
                <p className="font-body text-sm text-white/35 leading-relaxed mb-4">{mode.desc}</p>
                
                {/* Mode stats */}
                <div className="flex gap-4 mb-4">
                  <div className="text-center">
                    <span className="font-display text-lg font-bold" style={{ color: mode.color }}>{mode.players}</span>
                    <span className="font-mono text-[9px] text-white/25 block tracking-widest">PLAYERS</span>
                  </div>
                  <div className="text-center">
                    <span className="font-display text-lg font-bold" style={{ color: mode.color }}>{mode.maps}</span>
                    <span className="font-mono text-[9px] text-white/25 block tracking-widest">MAPS</span>
                  </div>
                </div>

                <motion.div
                  animate={{ width: hovered === i ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                  className="h-[1px]"
                  style={{ background: `linear-gradient(90deg, ${mode.color}, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 energy-line" />
    </section>
  );
}
