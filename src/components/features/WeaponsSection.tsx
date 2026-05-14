'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WeaponViewer = dynamic(() => import('@/components/scenes/WeaponViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] md:h-[300px] flex items-center justify-center">
      <div className="w-6 h-6 border border-neon-blue/30 rounded-full animate-spin border-t-neon-blue" />
    </div>
  ),
});

const weapons = [
  { name: 'PHANTOM EDGE', type: 'Quantum Blade', damage: 85, range: 15, speed: 95, desc: 'A blade that cuts through dimensional barriers, phasing between realities with each strike.', color: '#00f0ff' },
  { name: 'RIFT CANNON', type: 'Heavy Weapon', damage: 98, range: 90, speed: 30, desc: 'Fires concentrated rift energy blasts capable of tearing through dimensional shields.', color: '#b000ff' },
  { name: 'VOID PISTOL', type: 'Sidearm', damage: 55, range: 60, speed: 90, desc: 'Standard issue NEXUS agent sidearm, compact but deadly accurate.', color: '#ff00aa' },
  { name: 'NOVA RIFLE', type: 'Assault Rifle', damage: 72, range: 75, speed: 70, desc: 'Versatile energy rifle for all engagement ranges, the backbone of any arsenal.', color: '#00ff88' },
];

export default function WeaponsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState(0);
  const w = weapons[selected];
  const listRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      listRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
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
    <section ref={ref} id="weapons" className="relative py-32 md:py-48 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(255,0,170,0.3), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.5em] text-neon-pink/60 uppercase block mb-4">Armory</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-wider"><span className="gradient-text">Arsenal</span></h2>
          <p className="font-body text-sm text-white/30 mt-4 max-w-lg mx-auto tracking-wide">Equip yourself with quantum-powered weaponry</p>
          <div className="energy-line max-w-xs mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weapon List */}
          <div className="space-y-3">
            {weapons.map((wp, i) => (
              <div
                key={wp.name}
                ref={(el) => { listRef.current[i] = el; }}
                onClick={() => setSelected(i)}
                data-cursor-hover
                className={`glass-card p-4 cursor-none transition-all duration-500 flex items-center gap-4 ${selected === i ? '' : 'opacity-50 hover:opacity-80'}`}
                style={selected === i ? { borderColor: `${wp.color}40`, boxShadow: `0 0 20px ${wp.color}15` } : {}}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${wp.color}10`, border: `1px solid ${wp.color}25` }}>
                  <motion.div
                    animate={selected === i ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-3 h-3 rounded-sm"
                    style={{ background: wp.color, boxShadow: `0 0 8px ${wp.color}` }}
                  />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold tracking-widest" style={{ color: selected === i ? wp.color : 'white' }}>{wp.name}</h4>
                  <p className="font-mono text-[10px] text-white/30 tracking-wider">{wp.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Weapon Display */}
          <div className="lg:col-span-2">
            <motion.div key={selected} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass-card p-8 md:p-10 relative overflow-hidden h-full">
              <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 70% 30%, ${w.color}, transparent 60%)` }} />
              {/* HUD frame corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l border-t" style={{ borderColor: `${w.color}30` }} />
              <div className="absolute top-3 right-3 w-6 h-6 border-r border-t" style={{ borderColor: `${w.color}30` }} />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b" style={{ borderColor: `${w.color}30` }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b" style={{ borderColor: `${w.color}30` }} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">{w.type}</span>
                    <h3 className="font-display text-3xl md:text-4xl font-black tracking-wider mt-1" style={{ color: w.color }}>{w.name}</h3>
                  </div>
                </div>

                {/* 3D Weapon Viewer */}
                <WeaponViewer weaponName={w.name} color={w.color} />

                <p className="font-body text-white/40 mb-6 max-w-md">{w.desc}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[{ l: 'Damage', v: w.damage }, { l: 'Range', v: w.range }, { l: 'Speed', v: w.speed }].map((s) => (
                    <div key={s.l} className="text-center p-4 rounded-lg relative overflow-hidden" style={{ background: `${w.color}05`, border: `1px solid ${w.color}15` }}>
                      <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase block mb-2">{s.l}</span>
                      <span className="font-display text-2xl font-bold" style={{ color: w.color }}>{s.v}</span>
                      {/* Fill bar at bottom */}
                      <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-700" style={{ width: `${s.v}%`, background: w.color, boxShadow: `0 0 8px ${w.color}` }} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 energy-line" />
    </section>
  );
}
