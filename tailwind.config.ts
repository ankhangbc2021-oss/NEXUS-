import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f0ff',
        'neon-purple': '#b000ff',
        'neon-pink': '#ff00aa',
        'neon-red': '#ff003c',
        'cyber-dark': '#0a0a0f',
        'cyber-darker': '#050508',
        'cyber-gray': '#1a1a2e',
        'cyber-light': '#16213e',
        'holo-blue': '#00d4ff',
        'holo-purple': '#8b5cf6',
        'energy-core': '#00ff88',
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'body': ['Rajdhani', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'energy-flow': 'energy-flow 3s ease-in-out infinite',
        'holo-flicker': 'holo-flicker 0.15s ease-in-out infinite',
        'particle-drift': 'particle-drift 20s linear infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'energy-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'holo-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.97' },
        },
        'particle-drift': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(0, 240, 255, 0.3)' },
          '50%': { borderColor: 'rgba(176, 0, 255, 0.6)' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
        'neon-gradient': 'linear-gradient(135deg, #00f0ff 0%, #b000ff 50%, #ff003c 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};

export default config;
