'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }} />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-[0.3em] gradient-text">
              NEXUS
            </h1>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[1px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{
                background: 'linear-gradient(90deg, transparent, var(--neon-blue), var(--neon-purple), transparent)',
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8 }}
            className="font-mono text-xs tracking-[0.5em] text-neon-blue/50 mt-6 uppercase"
          >
            Initializing Game Universe
          </motion.p>

          {/* Loading Bar */}
          <div className="loading-bar-container mt-8">
            <motion.div
              className="loading-bar"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="font-mono text-xs text-neon-blue/40 mt-4 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.span>

          {/* Corner Decorations */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-neon-blue/20" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-neon-blue/20" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-neon-blue/20" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-neon-blue/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
