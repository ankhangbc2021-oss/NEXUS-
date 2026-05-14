'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const characters = [
  { name: 'SPECTRA', role: 'Dimensional Assassin', ability: 'Phase Shift', color: '#00f0ff', stats: { attack: 92, defense: 45, speed: 88, ability: 95 }, desc: 'Bends light and space to strike from impossible angles. Masters of dimensional stealth.', lore: 'Former quantum physicist who survived a rift exposure that merged her consciousness across three dimensions.' },
  { name: 'VORTEX', role: 'Reality Breaker', ability: 'Rift Storm', color: '#b000ff', stats: { attack: 78, defense: 60, speed: 72, ability: 98 }, desc: 'Tears open dimensional rifts to unleash devastating storms of pure energy.', lore: 'A living conduit for rift energy, Vortex can channel the void between dimensions as a weapon.' },
  { name: 'IRON VEIL', role: 'Quantum Guardian', ability: 'Temporal Shield', color: '#ff00aa', stats: { attack: 55, defense: 96, speed: 40, ability: 80 }, desc: 'Manipulates time to create impenetrable barriers that protect allies.', lore: 'Once a military engineer, Iron Veil discovered how to crystallize time itself into defensive constructs.' },
  { name: 'BLAZE', role: 'Energy Catalyst', ability: 'Nova Burst', color: '#ff003c', stats: { attack: 99, defense: 30, speed: 85, ability: 70 }, desc: 'Channels raw rift energy into explosive force that devastates the battlefield.', lore: 'Born during the Genesis Event, Blaze is a living manifestation of rift energy seeking release.' },
];

function StatBar({ label, value, color, isActive }: { label: string; value: number; color: string; isActive: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase w-16">{label}</span>
      <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isActive ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
      <span className="font-mono text-[10px] text-white/30 w-6 text-right">{value}</span>
    </div>
  );
}

export default function CharacterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="characters" className="relative py-32 md:py-48 overflow-hidden">
      {/* Dynamic background glow based on active character */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: `radial-gradient(circle, ${characters[active].color}40, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.5em] text-neon-blue/60 uppercase block mb-4">Choose Your Agent</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-wider"><span className="gradient-text">Agents</span></h2>
          <p className="font-body text-sm text-white/30 mt-4 max-w-lg mx-auto tracking-wide">Each agent brings unique rift-enhanced abilities to the battlefield</p>
          <div className="energy-line max-w-xs mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Character Cards */}
          <div className="grid grid-cols-2 gap-4">
            {characters.map((char, i) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => setActive(i)}
                data-cursor-hover
                className={`glass-card p-5 cursor-none transition-all duration-500 group relative overflow-hidden ${active === i ? 'border-opacity-40' : ''}`}
                style={{
                  borderColor: active === i ? char.color : undefined,
                  boxShadow: active === i ? `0 0 30px ${char.color}20, inset 0 0 30px ${char.color}08` : undefined,
                }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                {/* Active glow */}
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at center, ${char.color}, transparent 70%)` }}
                  />
                )}
                {/* Scan line on active */}
                {active === i && (
                  <motion.div
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[1px] z-20"
                    style={{ background: `linear-gradient(90deg, transparent, ${char.color}30, transparent)` }}
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg mb-3 flex items-center justify-center" style={{ background: `${char.color}15`, border: `1px solid ${char.color}30` }}>
                    <motion.div
                      animate={active === i ? { scale: [1, 1.3, 1], boxShadow: [`0 0 10px ${char.color}`, `0 0 25px ${char.color}`, `0 0 10px ${char.color}`] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-4 h-4 rounded-full"
                      style={{ background: char.color }}
                    />
                  </div>
                  <h3 className="font-display text-sm font-bold tracking-widest" style={{ color: active === i ? char.color : 'white' }}>{char.name}</h3>
                  <p className="font-mono text-[10px] text-white/30 tracking-wider mt-1">{char.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Character Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card p-8 md:p-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at top right, ${characters[active].color}, transparent 60%)` }} />
              
              {/* HUD corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l border-t" style={{ borderColor: `${characters[active].color}30` }} />
              <div className="absolute top-3 right-3 w-6 h-6 border-r border-t" style={{ borderColor: `${characters[active].color}30` }} />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b" style={{ borderColor: `${characters[active].color}30` }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b" style={{ borderColor: `${characters[active].color}30` }} />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: `${characters[active].color}10`, border: `1px solid ${characters[active].color}30` }}>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], boxShadow: [`0 0 15px ${characters[active].color}`, `0 0 35px ${characters[active].color}`, `0 0 15px ${characters[active].color}`] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-6 h-6 rounded-full"
                      style={{ background: characters[active].color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-black tracking-wider" style={{ color: characters[active].color }}>{characters[active].name}</h3>
                    <p className="font-mono text-xs tracking-widest text-white/40">{characters[active].role}</p>
                  </div>
                </div>

                <p className="font-body text-white/50 mb-4 leading-relaxed">{characters[active].desc}</p>
                <p className="font-body text-xs text-white/25 mb-6 leading-relaxed italic">&ldquo;{characters[active].lore}&rdquo;</p>

                <div className="mb-6 p-3 rounded-lg" style={{ background: `${characters[active].color}08`, border: `1px solid ${characters[active].color}15` }}>
                  <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">Signature Ability</span>
                  <p className="font-display text-lg font-bold mt-1" style={{ color: characters[active].color }}>{characters[active].ability}</p>
                </div>

                <div className="space-y-3">
                  {Object.entries(characters[active].stats).map(([k, v]) => (
                    <StatBar key={k} label={k} value={v} color={characters[active].color} isActive={true} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 energy-line" />
    </section>
  );
}
