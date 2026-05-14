'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DownloadSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="download" className="relative py-32 md:py-48 overflow-hidden">
      {/* Multi-layered background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.15), rgba(176,0,255,0.08) 50%, transparent 70%)' }} />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.1), transparent 60%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div ref={titleRef}>
          <span className="font-mono text-xs tracking-[0.5em] text-neon-blue/60 uppercase block mb-6">Free to Play</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-6">
            <span className="shimmer-text">Enter the NEXUS</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-white/35 max-w-xl mx-auto mb-12 tracking-wide">
            Download now and join millions of agents fighting across dimensions. Your legacy begins here.
          </p>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          <a href="#" data-cursor-hover className="relative inline-flex items-center gap-4 px-12 py-5 font-display text-sm font-bold tracking-[0.3em] uppercase overflow-hidden group cursor-none">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-xl border border-neon-blue/30 group-hover:border-neon-blue transition-colors duration-500" />
            <div className="absolute inset-0 rounded-xl bg-neon-blue/5 group-hover:bg-neon-blue/10 transition-colors duration-500" />
            {/* Sweep effect */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute -left-full group-hover:left-full w-full h-full bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent transition-all duration-700" />
            </div>
            {/* Pulse rings */}
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 rounded-xl border border-neon-blue/10" />
            <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="absolute inset-0 rounded-xl border border-neon-blue/5" />
            <span className="relative z-10 text-neon-blue group-hover:text-white transition-colors duration-300">
              Download Now
            </span>
            <svg className="w-5 h-5 relative z-10 text-neon-blue group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </motion.div>

        {/* Platforms */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="flex justify-center gap-8 mt-12">
          {[
            { name: 'Windows', icon: 'M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801' },
            { name: 'PlayStation', icon: 'M9.5 2v18l3-1V2h-3zm7.5 10.5c-.8-.5-1.5-.3-1.5-.3l-3 1v2l4-1.5s.8-.2.8.5-.8.8-.8.8L13 16v2l5-2s2-.5 2-2-.5-2-3-1.5zM6 16l-4 1.5s-2 .5-2 2 2.5 1.5 2.5 1.5L8 19v-2l-4 1.5s-.8.2-.8-.5.8-.8.8-.8L7 16v-2l-1 .5z' },
            { name: 'Xbox', icon: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 2c1.4 0 2.7.3 3.9.8-1 .6-2.1 1.5-3.1 2.6L12 6.2l-.8-.8C10.2 4.3 9.1 3.4 8.1 2.8 9.3 2.3 10.6 2 12 2zM5.8 4.4c1.2.5 2.5 1.5 3.7 3L12 10l2.5-2.6c1.2-1.5 2.5-2.5 3.7-3 2.3 1.7 3.8 4.5 3.8 7.6 0 5.2-4.2 9.4-9.4 9.8-.2 0-.4 0-.6 0s-.4 0-.6 0C6.2 21.4 2 17.2 2 12c0-3.1 1.5-5.9 3.8-7.6z' },
            { name: 'Steam', icon: 'M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015z' },
          ].map((p) => (
            <motion.a
              key={p.name}
              href="#"
              whileHover={{ y: -3 }}
              data-cursor-hover
              className="flex flex-col items-center gap-2 group cursor-none"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/5 group-hover:border-neon-blue/30 group-hover:bg-neon-blue/5 transition-all duration-300">
                <svg className="w-5 h-5 text-white/20 group-hover:text-neon-blue transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d={p.icon} />
                </svg>
              </div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase group-hover:text-neon-blue/50 transition-colors">{p.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* System Req */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="mt-16 glass-card p-6 max-w-md mx-auto">
          <h4 className="font-display text-xs tracking-widest text-neon-blue/40 uppercase mb-4">Minimum Requirements</h4>
          <div className="grid grid-cols-2 gap-3 text-left">
            {[{ l: 'OS', v: 'Windows 10 64-bit' }, { l: 'CPU', v: 'Intel i5-4460' }, { l: 'RAM', v: '8 GB' }, { l: 'GPU', v: 'GTX 1050 Ti' }, { l: 'Storage', v: '30 GB SSD' }, { l: 'DirectX', v: 'Version 12' }].map((r) => (
              <div key={r.l}>
                <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase block">{r.l}</span>
                <span className="font-body text-xs text-white/50">{r.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 energy-line" />
    </section>
  );
}
