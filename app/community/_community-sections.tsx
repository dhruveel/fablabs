'use client'

import Image from 'next/image'
import { m } from 'framer-motion'

const A = {
  heroIllus: '/assets/community-hero-illus.png',
}

// ── Hero Section ──────────────────────────────────────────────────────────────
// Figma 215-1075: 1440×727 black section, illustration left:41 top:58 w:1357 h:611,
// heading centered at x:681.5 y:77, 48px Higher Jump (substituted with K2D bold)
function HeroSection() {
  return (
    <m.section
      className="relative w-full bg-black overflow-hidden aspect-[1440/727] min-h-75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Illustration: 2.85% left/right margin, 7.98% top/bottom */}
      <div
        className="absolute"
        style={{ left: '2.85%', right: '2.92%', top: '7.98%', bottom: '7.98%' }}
      >
        <Image
          src={A.heroIllus}
          alt="FabLabs community — group of young people"
          fill
          className="object-contain"
          preload
          fetchPriority="high"
        />
      </div>

      {/* Coming soon badge: centered above the heading */}
      <m.span
        className="absolute -translate-x-1/2 inline-flex items-center rounded-full bg-[#0A64BC] px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-white pointer-events-none"
        style={{ left: '47.33%', top: '5%', fontFamily: 'var(--font-k2d)' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      >
        Coming Soon
      </m.span>

      {/* Heading: center at x=47.33%, top=10.59%, width=52.71% */}
      <h1
        className="absolute -translate-x-1/2 text-white font-bold text-center leading-[1.9] pointer-events-none"
        style={{
          left: '47.33%',
          top: '10.59%',
          width: '52.71%',
          fontSize: 'clamp(18px, 3.33vw, 48px)',
          fontFamily: 'var(--font-k2d)',
        }}
      >
        Join The Squad Now
      </h1>
    </m.section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function CommunitySections() {
  return (
    <div className="bg-black">
      <HeroSection />
    </div>
  )
}
