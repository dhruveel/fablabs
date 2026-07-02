'use client'

import Image from 'next/image'
import { m } from 'framer-motion'

const A = {
  bg:      '/assets/our-story-bg.jpg',
  started: '/assets/our-story-icon-started.jpg',
  growth:  '/assets/our-story-icon-growth.jpg',
  factory: '/assets/our-story-icon-factory.jpg',
  clients: '/assets/our-story-icon-clients.jpg',
}

const MILESTONES = [
  { title: 'Started',          subtitle: '2012, by Vimal N.',                        img: A.started },
  { title: 'Growth',           subtitle: '30% year-on-year',                         img: A.growth  },
  { title: 'Factory Capacity', subtitle: '20,000+ merch pieces per month.',           img: A.factory },
  { title: 'Clients',          subtitle: 'Students, Startups, Brands across India.',  img: A.clients },
]

const VP = { once: true, margin: '-80px' }

const staggerCards = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 48 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export function TeamSection() {
  return (
    <section className="bg-black w-full overflow-hidden">

      {/* Heading + description */}
      <div className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 text-center">
        <m.h2
          className="text-white font-bold text-4xl sm:text-5xl lg:text-[48px] mb-8"
          style={{ fontFamily: 'var(--font-k2d)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          Our Journey
        </m.h2>
        <div
          className="text-white text-sm sm:text-base lg:text-[16px] leading-normal space-y-4 max-w-246.25 mx-auto font-bold"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          <m.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            When FabLabs began in 2012, it started as a small dream — to create merchandise for
            colleges and brands that stood out from the ordinary. Fast forward to today, and that
            dream has grown into a thriving company with 30% year-on-year growth.
          </m.p>
          <m.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
          >
            From Tiruppur, the textile hub of India, to campus festivals across the country, we
            have proven that when passion and quality come together, growth follows naturally.
          </m.p>
        </div>
      </div>

      {/* Full-width background image */}
      <m.div
        className="relative w-full h-80 sm:h-115 lg:h-193.25 overflow-hidden"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VP}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Image src={A.bg} alt="" fill className="object-cover" />
      </m.div>

      {/* Stat cards — pulled up to overlap the bottom of the background image */}
      <div className="px-4 sm:px-8 lg:px-12 -mt-16 sm:-mt-24 lg:-mt-36 pb-16 sm:pb-20">
        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-300 mx-auto"
          variants={staggerCards}
          initial="hidden"
          whileInView="show"
          viewport={VP}
        >
          {MILESTONES.map((item) => (
            <m.div key={item.title} variants={cardVariant}>
              <div className="bg-white rounded-[12px] overflow-hidden h-74.75">
                {/* Gray icon block at top (Figma: 178×157px, left+16px, top+12px) */}
                <div className="relative bg-[#bbb] rounded-[12px] shadow-[10px_10px_15px_0px_rgba(0,0,0,0.25)] mx-4 mt-3 h-39.25 overflow-hidden">
                  <Image src={item.img} alt="" fill className="object-cover" />
                </div>
                {/* Text at bottom (Figma: text top at 188px, block bottom at 169px → gap 19px) */}
                <div className="px-4 pt-4.75 text-center">
                  <p
                    className="font-bold text-black text-2xl leading-tight"
                    style={{ fontFamily: 'var(--font-k2d)' }}
                  >
                    {item.title}:
                  </p>
                  <p
                    className="text-black text-base leading-snug mt-1"
                    style={{ fontFamily: 'var(--font-k2d)' }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>

    </section>
  )
}
