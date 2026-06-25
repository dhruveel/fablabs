'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// ── Assets ────────────────────────────────────────────────────────────────────
const A = {
  heroBg:      '/assets/a24f3a31-93e5-4fff-95c4-82c524564715.png',
  cotton:      '/assets/abd20ae6-0a91-4bb1-b32e-e4a3c82003d7.png',
  slub:        '/assets/e9d2c02f-12af-418b-b925-83276a5378b5.png',
  dryFit:      '/assets/a54a3171-687d-40fe-aa32-6267ee7d7493.jpg',
  pique:       '/assets/608da7fc-c32a-4a96-aa27-e72aeec26fcb.jpg',
  loopKnit:    '/assets/da050ca5-adba-4ad7-8c1b-7a362b24c1d0.jpg',
  derby:       '/assets/682975cf-d505-46bc-a165-9b7c7bd3e4c7.png',
  lycra:       '/assets/0a54d5d6-4cc6-4ac4-9dd8-b7fae3002701.png',
  melange:     '/assets/d41fd111-382c-4322-a92b-c9cb52bca71f.png',
  propsBg:     '/assets/ea222154-5fd9-41ea-9a66-a9c1dcba2279.jpg',
  iconDurabil: '/assets/fa14b391-9e95-4374-bd16-e3b4ddf3df5f.png',
  iconSkin:    '/assets/d6fdfa87-b36c-48a3-93c4-ad16e19e74ac.png',
  iconCustom:  '/assets/2cdb31a3-96c4-4782-a420-5236799a7180.png',
  iconSustain: '/assets/fa14b391-9e95-4374-bd16-e3b4ddf3df5f.png',
}

// ── Data ─────────────────────────────────────────────────────────────────────
const FABRICS: Array<{ label: string; img: string; href?: string }> = [
  { label: 'Cotton',       img: A.cotton   },
  { label: 'Slub Cotton',  img: A.slub,    href: 'https://fablabs.in/fab/' },
  { label: 'Dry Fit',      img: A.dryFit   },
  { label: 'Pique',        img: A.pique    },
  { label: 'Loop Knit',    img: A.loopKnit },
  { label: 'Derby',        img: A.derby    },
  { label: 'Lycra',        img: A.lycra    },
  { label: 'Color Melange',img: A.melange  },
]

const PROPERTIES = [
  { name: 'Durability',          desc: 'Built to last, even after countless washes.',                      icon: A.iconDurabil, stagger: 'lg:mt-0'  },
  { name: 'Skin Friendly',       desc: 'Hypoallergenic and breathable for all-day wear.',                  icon: A.iconSkin,    stagger: 'lg:mt-10' },
  { name: 'Customization',       desc: 'Perfect for printing, embroidery, and bold designs.',              icon: A.iconCustom,  stagger: 'lg:mt-20' },
  { name: 'Sustainably Sourced', desc: 'Supporting a better future through responsible sourcing.',         icon: A.iconSustain, stagger: 'lg:mt-32' },
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
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const staggerUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 280, damping: 22 } },
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-75 sm:min-h-100 lg:min-h-142.25 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none select-none">
        <img src={A.heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-20 text-center">
        {/* Watermark "FAB" fades in on load */}
        <motion.h1
          className="font-black leading-none text-white/20 select-none pointer-events-none"
          style={{ fontFamily: 'var(--font-k2d)', fontSize: 'clamp(80px, 20vw, 300px)' }}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          FAB
        </motion.h1>
        <motion.p
          className="text-white font-bold text-lg sm:text-2xl lg:text-3xl -mt-4 sm:-mt-8 lg:-mt-16"
          style={{ fontFamily: 'var(--font-k2d)' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.45, ease: 'easeOut' }}
        >
          A Fabric For Every Journey
        </motion.p>
      </div>
    </section>
  )
}

// ── Fabrics Section ───────────────────────────────────────────────────────────
function FabricsSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <motion.div
        className="w-full max-w-278.25 mx-auto rounded-[25px] px-8 sm:px-14 py-10 sm:py-14 mb-12 sm:mb-16"
        style={{ background: 'linear-gradient(180deg, #517388 0%, #1f0e6d 100%)' }}
        {...fadeUp()}
      >
        <p
          className="text-white text-center text-sm sm:text-base lg:text-[16px] leading-relaxed"
          style={{ fontFamily: 'var(--font-k2d)', fontWeight: 500 }}
        >
          Every Great Design Starts with the Right Fabric. At Fablabs, we know that the
          foundation of exceptional apparel lies in the fabric. Whether you&apos;re creating
          vibrant t-shirts, cozy sweatshirts, or professional polos, we provide the perfect
          canvas to bring your ideas to life. Explore our diverse range of fabrics, each
          selected for its quality, durability, and ability to showcase your designs flawlessly.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 max-w-327.5 mx-auto"
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        {FABRICS.map((f) => {
          const inner = (
            <>
              <img src={f.img} alt={f.label} className="absolute inset-0 w-full h-full object-cover rounded-[33px]" />
              <div className="absolute inset-0 rounded-[33px] bg-white/20" />
              <p
                className="relative z-10 font-black text-black text-center leading-tight px-3"
                style={{ fontFamily: 'var(--font-k2d)', fontSize: 'clamp(18px, 3.5vw, 52px)' }}
              >
                {f.label}
              </p>
            </>
          )

          return (
            <motion.div
              key={f.label}
              variants={staggerUp}
              className="relative overflow-hidden rounded-[33px] flex items-center justify-center"
              style={{ aspectRatio: '320 / 356' }}
              whileHover={{ scale: 1.04, y: -6 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 22 }}
            >
              {f.href ? (
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

// ── Properties Section ────────────────────────────────────────────────────────
function PropertiesSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <div className="absolute inset-0 pointer-events-none select-none">
        <img src={A.propsBg} alt="" className="w-full h-full object-cover" style={{ opacity: 0.27 }} />
      </div>

      <div className="relative z-10 max-w-327.5 mx-auto">
        <motion.h2
          className="text-white font-bold text-center text-2xl sm:text-4xl lg:text-[48px] mb-12 sm:mb-16"
          style={{ fontFamily: 'var(--font-k2d)' }}
          {...fadeUp()}
        >
          How We Choose Our Fabrics?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start"
          variants={staggerGrid}
          initial="hidden"
          whileInView="show"
          viewport={VP}
        >
          {PROPERTIES.map((p) => (
            <motion.div key={p.name} variants={popIn} className={cn('flex flex-col gap-0', p.stagger)}>
              <Card className="bg-[#222] rounded-[19px] border-0 ring-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-visible">
                <CardContent className="p-0 flex flex-col">
                  <div className="bg-[#444] rounded-[19px] m-3.5 mb-0 overflow-hidden flex items-center justify-center p-4">
                    <img src={p.icon} alt="" className="size-full max-h-38.5 object-contain" />
                  </div>
                  <div className="px-4 py-5 text-center flex flex-col gap-2">
                    <p className="text-white font-bold text-xl leading-tight" style={{ fontFamily: 'var(--font-k2d)' }}>
                      {p.name}
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-k2d)' }}>
                      {p.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Root export ───────────────────────────────────────────────────────────────
export function FabSections() {
  return (
    <div className="bg-black">
      <HeroSection />
      <FabricsSection />
      <PropertiesSection />
    </div>
  )
}
