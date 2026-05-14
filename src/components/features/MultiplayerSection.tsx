'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const features = [
  { label: 'Active Players', value: 2400000, suffix: '+', icon: '◉', color: '#00f0ff' },
  { label: 'Matches Daily', value: 850000, suffix: '+', icon: '⬡', color: '#b000ff' },
  { label: 'Servers Global', value: 142, suffix: '', icon: '◇', color: '#ff00aa' },
  { label: 'Avg Ping (ms)', value: 12, suffix: 'ms', icon: '△', color: '#00ff88' },
];

const featureCards = [
  { title: 'Cross-Dimensional Play', desc: 'Seamless cross-platform multiplayer across all devices and dimensions.', icon: '🌐' },
  { title: 'Ranked Ladder', desc: 'Competitive matchmaking with seasonal rewards, titles, and leaderboards.', icon: '🏆' },
  { title: 'Clan System', desc: 'Form clans, compete in tournaments, and climb the ranks together.', icon: '⚔️' },
  { title: 'Anti-Cheat', desc: 'Advanced quantum-encrypted anti-cheat for fair competitive play.', icon: '🛡️' },
];

export default function MultiplayerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="multiplayer" className="relative py-32 md:py-48 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10" style={{ background: 'radial-gradient(ellipse, rgba(0,255,136,0.2), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.5em] text-energy-core/60 uppercase block mb-4">Live Stats</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-wider"><span className="gradient-text">Multiplayer</span></h2>
          <p className="font-body text-sm text-white/30 mt-4 max-w-lg mx-auto tracking-wide">Join the global arena of interdimensional combat</p>
          <div className="energy-line max-w-xs mx-auto mt-8" />
        </motion.div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {features.map((f, i) => (
            <div
              key={f.label}
              ref={(el) => { statsRef.current[i] = el; }}
              className="glass-card p-6 text-center group hover:border-neon-blue/20 transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${f.color}, transparent 70%)` }} />
              <div className="relative z-10">
                <div className="text-2xl mb-3 transition-colors" style={{ color: `${f.color}60` }}>
                  <span className="group-hover:drop-shadow-[0_0_8px_var(--neon-blue)]">{f.icon}</span>
                </div>
                <div className="font-display text-2xl md:text-3xl font-bold neon-text" style={{ color: f.color }}>
                  <AnimatedCounter target={f.value} />{f.suffix}
                </div>
                <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase mt-2">{f.label}</p>
              </div>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] transition-all duration-700" style={{ background: f.color }} />
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureCards.map((fc, i) => (
            <motion.div
              key={fc.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass-card p-6 flex items-start gap-4 group hover:border-neon-blue/20 transition-all duration-500 hover:translate-y-[-2px]"
            >
              <span className="text-xl mt-0.5 flex-shrink-0">{fc.icon}</span>
              <div>
                <h3 className="font-display text-sm font-bold tracking-widest text-white group-hover:text-neon-blue transition-colors">{fc.title}</h3>
                <p className="font-body text-sm text-white/35 mt-1">{fc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Server status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-energy-core"
            style={{ boxShadow: '0 0 8px #00ff88' }}
          />
          <span className="font-mono text-[10px] tracking-[0.3em] text-energy-core/50 uppercase">All Systems Operational</span>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 energy-line" />
    </section>
  );
}
