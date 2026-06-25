'use client'

import { motion } from 'framer-motion'

const VP = { once: true, margin: '-80px' }

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VP,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  }
}

export function PromiseSection() {
  return (
    <section className="bg-black w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12 text-center">
      <div className="max-w-225 mx-auto">
        <motion.h2
          className="text-white font-bold text-4xl sm:text-5xl mb-8"
          style={{ fontFamily: 'var(--font-k2d)' }}
          {...fadeUp()}
        >
          Our Promise
        </motion.h2>
        <div
          className="text-white text-sm sm:text-base leading-relaxed space-y-4"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          <motion.p {...fadeUp(0.15)}>
            For us, merchandise is not just fabric—it&apos;s identity. That&apos;s why every
            stitch, every print, and every design is created with your story in mind.
          </motion.p>
          <motion.p {...fadeUp(0.25)}>
            Whether you&apos;re a college student planning a fest or a startup founder looking
            for team merchandise, FabLabs makes one promise:
          </motion.p>
          <motion.p className="font-bold text-lg sm:text-xl" {...fadeUp(0.35)}>
            Your story. Your style. Always FabLabs.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
