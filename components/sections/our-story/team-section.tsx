'use client'

import { motion } from 'framer-motion'

const milestones = [
  { title: 'Started',          subtitle: '2012, by Vimal N.',                        img: '/assets/f3ad8fd0-85ff-4cea-b642-50d79c566906.png' },
  { title: 'Growth',           subtitle: '30% year-on-year',                         img: '/assets/73e6b8a7-23a2-4a53-ac20-3a31fe604878.png' },
  { title: 'Factory Capacity', subtitle: '20,000+ merch pieces per month.',           img: '/assets/eee69ad8-d4fd-435f-9c74-de0b4dfff4b6.png' },
  { title: 'Clients',          subtitle: 'Students, Startups, Brands across India.',  img: '/assets/9ce510ac-f8e2-4ed7-bcae-0ea11c8c8b03.png' },
]

const VP = { once: true, margin: '-80px' }

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: 'easeOut' as const, delay },
  }
}

export function TeamSection() {
  return (
    <section className="bg-black w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      {/* Heading + description */}
      <div className="max-w-360 mx-auto text-center mb-12 sm:mb-16">
        <motion.h2
          className="text-white font-bold text-4xl sm:text-5xl mb-6"
          style={{ fontFamily: 'var(--font-k2d)' }}
          {...fadeUp()}
        >
          Our Journey
        </motion.h2>
        <div
          className="text-white text-sm sm:text-base leading-relaxed space-y-3 max-w-246.25 mx-auto"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          <motion.p {...fadeUp(0.15)}>
            2012 mein jab FabLabs start hua tha, it was just a small dream — college aur
            brands ke liye aisa merch banana jo normal se alag ho. Fast forward to today, and
            that dream has become a growing company with 30% year-on-year growth.
          </motion.p>
          <motion.p {...fadeUp(0.25)}>
            From Tiruppur (textile hub of India) to campus fests all over the country, humne
            prove kiya hai ki jab passion aur quality saath ho, toh growth automatically hoti
            hai.
          </motion.p>
        </div>
      </div>

      {/* Milestone cards — stagger in, preserving CSS desktop offset */}
      <div className="max-w-325 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              style={{ marginTop: i > 0 ? `${i * 40}px` : '0' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{
                duration: 0.55,
                delay: i * 0.12,
                ease: 'easeOut' as const,
              }}
            >
              {/* Photo */}
              <div className="rounded-[12px] overflow-hidden shadow-[10px_10px_15px_0px_rgba(0,0,0,0.25)] w-44.5 h-39.25 relative z-10">
                <img src={m.img} alt="" className="w-full h-full object-cover" />
              </div>
              {/* White info card */}
              <div className="bg-white rounded-[12px] -mt-6 pt-10 pb-6 px-4 w-52.25 text-center">
                <p className="font-bold text-black text-xl leading-tight" style={{ fontFamily: 'var(--font-k2d)' }}>
                  {m.title}:
                </p>
                <p className="text-black text-sm mt-1 leading-snug" style={{ fontFamily: 'var(--font-k2d)' }}>
                  {m.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
