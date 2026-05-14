# NEXUS — AAA Cinematic Game Universe

## Project Overview

NEXUS is a production-quality futuristic gaming website featuring ultra-premium visuals, immersive 3D environments powered by Three.js/React Three Fiber, cinematic GSAP animations, and smooth Lenis scrolling. The site showcases a fictional next-gen competitive game universe with a cyberpunk aesthetic.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | App Router framework |
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **TailwindCSS 3.4** | Utility-first styling |
| **Three.js / R3F** | 3D rendering (Hero scene, Weapon viewer) |
| **@react-three/drei** | Three.js helpers (Float, Stars) |
| **GSAP + ScrollTrigger** | Scroll-triggered cinematic animations |
| **Framer Motion** | Component-level animations & transitions |
| **Lenis** | Smooth scroll engine |
| **Zustand** | State management (available) |

## Features

- **3D Energy Core** — Procedural icosahedron with vertex-displaced GLSL shader, fresnel glow, orbital rings
- **3D Weapon Viewer** — Per-weapon procedural shaders with scan-line effects and auto-rotation
- **Particle Field** — Canvas-based particle system with mouse repulsion and connection lines
- **Smooth Scroll** — Lenis-powered buttery smooth scrolling
- **GSAP Scroll Animations** — Cinematic reveals with scrub, parallax, and staggered entries
- **Custom Cursor** — Neon ring + dot with interactive hover states
- **Loading Screen** — Animated logo reveal with progress bar
- **Holographic UI** — Glassmorphism cards, neon text, HUD corner decorations
- **Scan Line Overlay** — CRT-style moving scan line
- **Noise + Vignette** — Film grain and vignette overlays
- **Responsive** — Mobile-first with cursor fallback

## Folder Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, animations, CSS vars
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page (SmoothScroll wrapper)
├── components/
│   ├── features/
│   │   ├── HeroSection.tsx      # Hero with 3D scene + GSAP parallax
│   │   ├── StorySection.tsx     # Timeline lore with GSAP reveals
│   │   ├── CharacterSection.tsx # Agent showcase with stat bars
│   │   ├── GameplaySection.tsx  # Game modes with hover effects
│   │   ├── WeaponsSection.tsx   # Arsenal with 3D weapon viewer
│   │   ├── MultiplayerSection.tsx # Live stats with animated counters
│   │   ├── TrailerSection.tsx   # Video player with energy rings
│   │   ├── DownloadSection.tsx  # CTA with platform icons
│   │   └── Footer.tsx          # Links, socials, copyright
│   ├── scenes/
│   │   ├── HeroScene.tsx        # R3F canvas: EnergyCore, OrbitalRings, Particles
│   │   └── WeaponViewer.tsx     # R3F canvas: Procedural weapon models
│   ├── systems/
│   │   ├── ParticleField.tsx    # Canvas particle system
│   │   └── SmoothScroll.tsx     # Lenis wrapper
│   └── ui/
│       ├── CustomCursor.tsx     # Neon cursor
│       ├── LoadingScreen.tsx    # Intro loading animation
│       └── Navbar.tsx           # Fixed nav with mobile menu
```

## Installed Packages

### Dependencies
- next, react, react-dom
- @react-three/fiber, @react-three/drei, three
- gsap, framer-motion, lenis, zustand

### Dev Dependencies
- typescript, @types/node, @types/react, @types/react-dom, @types/three
- tailwindcss, postcss, autoprefixer
- eslint, eslint-config-next, raw-loader

## Animation Systems

### GSAP ScrollTrigger
- Hero title parallax (scrub-based)
- Story cards: opacity + y + scale + rotateX (scrub)
- Character heading: opacity + y reveal
- Gameplay cards: opacity + y + rotateY (staggered)
- Weapon list: opacity + x (staggered)
- Multiplayer stats: opacity + y + scale with back easing
- Trailer container: opacity + scale + y
- Download title: opacity + y + scale

### Framer Motion
- Loading screen: exit with scale + opacity
- Navbar: initial y slide-in
- Hero content: staggered fade-in
- Character detail: AnimatePresence with x-slide
- All section headings: inView fade-in
- Interactive hover states: whileHover, whileTap
- Pulsing energy effects: infinite loops

### CSS Animations
- `glow-pulse` — Box shadow pulse
- `float` — Vertical float
- `scan-line` — Moving scan line overlay
- `energy-flow` — Background position animation
- `holo-flicker` — Subtle opacity flicker
- `particle-drift` — Vertical particle movement
- `border-glow` — Border color oscillation
- `text-shimmer` — Gradient text sweep

## Shader Systems

### Energy Core (HeroScene)
- **Vertex**: Sinusoidal displacement along normals
- **Fragment**: Fresnel rim glow, dual-color mixing, pulsing alpha

### Weapon Model (WeaponViewer)
- **Vertex**: Normal-based vertex wiggle
- **Fragment**: Fresnel edge detection, scan-line overlay, time-based animation

## Performance Optimizations

- `dynamic()` imports for heavy components (3D scenes, cursor, particles)
- Canvas DPR capped at 1.5
- `powerPreference: 'high-performance'` on WebGL context
- Instanced mesh for floating particles (150 instances, single draw call)
- Particle count reduced on mobile (40 vs 80)
- CSS `will-change` and `transform` for GPU acceleration
- Lazy ScrollTrigger registration
- Mobile cursor disabled (restored to default)

## Update Log

### 2026-05-14

#### Added
- 3D Energy Core scene with GLSL shaders (HeroScene.tsx)
- 3D Orbital Rings with varying speeds and opacities
- 3D Floating Particles using InstancedMesh
- Mouse-reactive point light in 3D scene
- 3D Weapon Viewer with per-weapon procedural shaders
- Lenis smooth scroll system (SmoothScroll.tsx)
- GSAP ScrollTrigger integration across all sections
- Shimmer text animation for hero title
- AnimatePresence transitions for character detail panel
- Dynamic background glows that change with active character
- Scan-line hover effects on active cards
- HUD corner decorations on detail panels
- Character lore text
- Mode-specific stats (players, maps) in gameplay section
- Platform SVG icons with hover effects in download section
- Server status indicator in multiplayer section
- Cinematic info bar (4K, Dolby Atmos, HDR10+) under trailer
- Dual pulse ring effects on download CTA
- CLAUDE.md project documentation
- Comprehensive README.md with Vietnamese feature descriptions
- 9 screenshots captured and saved to docs/screenshots/

#### Changed
- Hero title uses shimmer-text instead of gradient-text
- Character cards have whileHover y-lift animation
- Story cards have hover translate-y and holographic underline
- All sections have descriptive subtitles
- Multiplayer stats have per-stat colors instead of uniform blue
- Download section has full SVG platform icons instead of text
- Footer unchanged (already well-structured)

## TODO

- [ ] Add real video embed for trailer section
- [ ] Implement ambient audio system with hover sounds
- [ ] Add GLSL post-processing effects (bloom, chromatic aberration)
- [ ] Create interactive 3D character models
- [ ] Add Theatre.js timeline for cinematic camera sequences
- [ ] Implement page transitions with shader-based wipes
- [ ] Add loading progress tied to actual asset loading
- [ ] Create mobile-optimized 3D fallbacks
- [ ] Add WebGL environment map for metallic reflections
- [ ] Implement magnetic button physics with GSAP

## Known Issues

- Trailer section shows placeholder (no actual video source)
- GSAP ScrollTrigger may conflict with Lenis on some browsers — tested on Chrome/Firefox
- Three.js scenes on low-end GPUs may need LOD fallbacks
- raw-loader needs to be installed for GLSL file imports

## Developer Notes

- All 3D scenes use `alpha: true` and transparent backgrounds to layer over the 2D UI
- GSAP contexts are always cleaned up with `ctx.revert()` to prevent memory leaks
- ScrollTrigger defaults are set once in page.tsx
- Color system uses CSS custom properties for consistency between Tailwind and inline styles
- Cursor is disabled on mobile via CSS media query
