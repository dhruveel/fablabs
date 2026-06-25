'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// ── Assets ────────────────────────────────────────────────────────────────────
const A = {
  heroBg:   '/assets/a0059ec9-ae6b-48f7-a180-5fdb4a2e0301.png',
  scarlet:  '/assets/fce3024e-6aa3-4f09-a61e-4841250323d0.jpg',
  coral:    '/assets/40d41562-a742-4292-8ea8-3e4db3e95856.png',
  lavender: '/assets/faf20288-7f7e-4366-97f0-a70c8d6a6657.png',
  charcoal: '/assets/8f37e66d-99d2-4f48-903c-dc478ae34fb5.png',
}

// ── Data ─────────────────────────────────────────────────────────────────────
const TECHNIQUES = [
  { label: 'Screen Printing',          ghost: 'Screen Printing', color: '#BC0A69' },
  { label: 'DTG\n(Direct-to Garment)', ghost: 'DTG',             color: '#B9BC0A' },
  { label: 'Thermal Printing',         ghost: 'Thermal Printing',color: '#0A64BC' },
  { label: 'Embroidery',               ghost: 'Embroidery',      color: '#E3BE2A' },
]

const COLORS = [
  { name: 'Scarlet Red',    hex: '#DD282B', img: A.scarlet,  represents: 'Passion, Courage, Joy',              tagline: '"Wear Your Fire. Bold Moves Only."'          },
  { name: 'Coral Pink',     hex: '#BC0A69', img: A.coral,    represents: 'Warmth, Playfulness, Compassion',    tagline: '"Spread Kindness. Play with Color."'          },
  { name: 'Lavender',       hex: '#8A38F5', img: A.lavender, represents: 'Tranquility, Compassion, Grace',     tagline: '"Wear Peace. Be Gentle with Yourself."'       },
  { name: 'Charcoal Grey',  hex: '#9E9E9E', img: A.charcoal, represents: 'Strength, Sophistication, Mystery',  tagline: '"Power in Silence. Stay Unstoppable."'        },
]

// ── Animation helpers ─────────────────────────────────────────────────────────
const VP = { once: true, margin: '-80px' }

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: 'easeOut' as const, delay },
  }
}

const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const staggerUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const popIn = {
  hidden: { opacity: 0, scale: 0.82 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 270, damping: 22 } },
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-75 sm:min-h-115 lg:min-h-150 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none select-none">
        <img src={A.heroBg} alt="" className="w-full h-full object-cover object-center opacity-50" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-16 sm:py-24 text-center max-w-225 mx-auto">
        <motion.h1
          className="text-white font-bold leading-tight text-3xl sm:text-5xl lg:text-[80px]"
          style={{ fontFamily: 'var(--font-k2d)', textShadow: '4px 4px 4px rgba(0,0,0,0.37)' }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Printing Perfection:<br />Crafting Your Vision
        </motion.h1>
      </div>
    </section>
  )
}

// ── Techniques Section ────────────────────────────────────────────────────────
function TechniquesSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <motion.p
        className="text-white text-center text-base sm:text-lg lg:text-2xl max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed"
        style={{ fontFamily: 'var(--font-k2d)' }}
        {...fadeUp()}
      >
        Step into the heart of Fablabs — the Printing Lab — where innovation transforms your
        vision into reality. Here, every t-shirt tells a tale crafted through state-of-the-art
        techniques.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-327.5 mx-auto"
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        {TECHNIQUES.map((t, i) => (
          <motion.div
            key={t.label}
            variants={staggerUp}
            className="relative overflow-hidden"
            style={{ height: 'clamp(160px, 22vw, 281px)' }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 22 }}
          >
            <div
              className="absolute left-0 right-0 rounded-[15px]"
              style={{ top: '3.2%', bottom: '2.49%', background: t.color }}
            />
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <span
                className="text-white/12 font-black leading-none whitespace-nowrap select-none"
                style={{ fontFamily: 'var(--font-k2d)', fontSize: 'clamp(60px, 9vw, 128px)' }}
                aria-hidden
              >
                {t.ghost}
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <p
                className="text-white font-bold text-center leading-tight whitespace-pre-line"
                style={{ fontFamily: 'var(--font-k2d)', fontSize: 'clamp(22px, 3.5vw, 56px)' }}
              >
                {t.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ── Color Showcase Section ────────────────────────────────────────────────────
function ColorShowcaseSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <motion.h2
        className="text-white text-center font-normal text-2xl sm:text-4xl lg:text-[48px] mb-4"
        style={{ fontFamily: 'var(--font-k2d)' }}
        {...fadeUp()}
      >
        Ready to bring your vision to life?
      </motion.h2>
      <motion.p
        className="text-white text-center font-bold text-base sm:text-xl lg:text-[32px] max-w-252 mx-auto mb-12 sm:mb-16 leading-snug"
        style={{ fontFamily: 'var(--font-k2d)' }}
        {...fadeUp(0.15)}
      >
        Get a custom quote today and let&apos;s start building something extraordinary — made
        just for you, by us.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-327.5 mx-auto"
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        {COLORS.map((c) => (
          <motion.div key={c.name} variants={popIn}>
            <Card
              className="rounded-[20px] border-0 ring-0 shadow-none overflow-hidden"
              style={{ background: 'rgba(68,68,68,0.44)' }}
            >
              <CardContent className="p-0 flex flex-col">
                <div className="relative w-full overflow-hidden rounded-[20px]" style={{ aspectRatio: '616/798' }}>
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="px-6 py-5 text-center flex flex-col gap-2">
                  <p
                    className="font-bold text-2xl sm:text-3xl lg:text-[48px] leading-tight"
                    style={{ fontFamily: 'var(--font-k2d)', color: c.hex }}
                  >
                    {c.name}
                  </p>
                  <p className="text-white text-sm sm:text-base lg:text-[24px]" style={{ fontFamily: 'var(--font-k2d)' }}>
                    Represents: {c.represents}
                  </p>
                  <p
                    className="text-[#0A64BC] italic font-semibold text-sm sm:text-base lg:text-[24px]"
                    style={{ fontFamily: 'var(--font-k2d)' }}
                  >
                    Tagline: {c.tagline}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="flex justify-center mt-12 sm:mt-16" {...fadeUp(0.25)}>
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
          <Button
            variant="outline"
            className="h-auto rounded-full border-2 border-[#0A64BC] bg-transparent px-8 py-3 text-[#0A64BC] hover:bg-[#0A64BC]/10 hover:text-[#0A64BC] text-base sm:text-xl whitespace-nowrap"
            style={{ fontFamily: 'var(--font-jersey10)' }}
          >
            Get My Quote
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ── Root export ───────────────────────────────────────────────────────────────
export function LabSections() {
  return (
    <div className="bg-black">
      <HeroSection />
      <TechniquesSection />
      <ColorShowcaseSection />
    </div>
  )
}
