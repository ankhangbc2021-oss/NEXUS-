'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Universe', href: '#story' },
  { label: 'Agents', href: '#characters' },
  { label: 'Arsenal', href: '#weapons' },
  { label: 'Gameplay', href: '#gameplay' },
  { label: 'Download', href: '#download' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
          scrolled
            ? 'bg-cyber-darker/80 backdrop-blur-xl border-b border-neon-blue/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="relative group" data-cursor-hover>
              <span className="font-display text-xl font-bold tracking-[0.3em] gradient-text">
                NEXUS
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-blue group-hover:w-full transition-all duration-500" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor-hover
                  className="relative font-body text-sm tracking-[0.2em] uppercase text-white/50 hover:text-neon-blue transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-blue group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <a
                href="#download"
                data-cursor-hover
                className="magnetic-btn text-xs"
              >
                Play Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 w-8"
              data-cursor-hover
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-full h-[1px] bg-neon-blue block"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-[1px] bg-neon-blue block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-full h-[1px] bg-neon-blue block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-cyber-darker/95 backdrop-blur-xl z-[9989] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl tracking-[0.3em] uppercase text-white/70 hover:text-neon-blue transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
