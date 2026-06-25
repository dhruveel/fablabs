'use client'

import { motion } from 'framer-motion'

const imgGroup36 = '/assets/0b2d220b-4adc-46d4-9c29-563bea1a488e.svg'
const imgFrame54 = '/assets/7c85b60d-048b-4881-92d9-60cfce24bfe7.png'

export function StoryHeroSection() {
  return (
    <section className="relative bg-black w-full overflow-hidden min-h-120 sm:min-h-145 lg:min-h-173">
      {/* Right side image slides in from right */}
      <motion.div
        className="absolute right-0 top-0 h-full w-[46%] lg:w-[46%]"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
      >
        <img
          src={imgFrame54}
          alt=""
          className="h-full w-full object-cover rounded-l-[11px]"
        />
      </motion.div>

      {/* Gradient mask */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/95 to-transparent" />

      {/* Brand wordmark slides up from bottom */}
      <motion.div
        className="absolute bottom-8 left-[5%] sm:left-18.25 w-[55%] sm:w-[50%] lg:w-[48%] max-w-174"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
      >
        <img
          src={imgGroup36}
          alt="FabLabs"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </section>
  )
}
