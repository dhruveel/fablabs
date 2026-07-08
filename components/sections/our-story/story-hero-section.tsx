'use client'

import Image from 'next/image'
import { m } from 'framer-motion'

const imgWordmark = '/assets/our-story-wordmark.svg'
const imgPhoto    = '/assets/our-story-photo.jpg'

export function StoryHeroSection() {
  return (
    <section className="relative bg-black w-full overflow-hidden min-h-120 sm:min-h-145 lg:min-h-173">

      {/* Right photo — slides in from right */}
      <m.div
        className="absolute top-0 right-0 h-full w-[46%]"
        style={{ top: 'clamp(0px, 9.1%, 63px)' }}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
      >
        <Image
          src={imgPhoto}
          alt=""
          fill
          priority
          sizes="46vw"
          className="object-cover rounded-l-[11px]"
        />
      </m.div>

      {/* Left wordmark — slides in from left */}
      <m.div
        className="absolute left-[5%] lg:left-18.25 w-[50%] lg:w-[48%] max-w-174"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.35 }}
      >
        {/* width/height are the SVG's real viewBox ratio (696×356) — only used
            by Image to compute aspect-ratio; className still drives the
            actual rendered size (w-full h-auto), same as the plain <img>. */}
        <Image
          src={imgWordmark}
          alt="Our Story"
          width={696}
          height={356}
          unoptimized
          className="w-full h-auto object-contain"
        />
      </m.div>

    </section>
  )
}
