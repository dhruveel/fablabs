'use client'

import { motion } from 'framer-motion'

const imgs = {
  r32: '/assets/05053899-2a78-4465-afb3-a5172ee3484f.jpg',
  r33: '/assets/998c97a7-8b55-417f-a3b1-914b15996a62.jpg',
  r34: '/assets/9194a7be-aed6-4007-be4f-b5d6a27c4e65.jpg',
  r35: '/assets/9feaf6df-7479-4533-b1fe-67a863284d4e.jpg',
  r36: '/assets/5a001757-829a-4487-b2ea-6d8e5415ff9e.jpg',
}

const photos = [imgs.r36, imgs.r32, imgs.r33, imgs.r34, imgs.r35]

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
const staggerPhoto = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function TimelineSection() {
  return (
    <section className="bg-black w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-312 mx-auto">
        {/* Dark gradient card */}
        <motion.div
          className="rounded-[40px] px-6 sm:px-12 lg:px-20 py-14 sm:py-20 text-center"
          style={{ background: 'linear-gradient(to bottom, #201e1e, #0d0d0d)' }}
          {...fadeUp()}
        >
          <h2
            className="text-white font-bold text-4xl sm:text-5xl mb-8"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            Who We Are
          </h2>
          <div
            className="text-white text-sm sm:text-base leading-relaxed space-y-4 max-w-191.75 mx-auto"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            <p>
              At FabLabs, we don&apos;t just make clothing, we create merchandise that truly
              connects with you. From a hoodie for your college squad to a T-shirt for your
              startup team, we believe every piece of apparel should tell a story, your story.
            </p>
            <p>
              Born in the textile capital of Tiruppur, FabLabs was founded in 2012 when our
              founder, Vimal N., asked a simple question: &lsquo;Why should merchandise feel
              boring and generic?&rsquo; Since then, we&apos;ve been on a mission to change the
              way merch is created.
            </p>
            <p>
              Today, with over 10 years of experience and 30% year-on-year growth, FabLabs is
              trusted by students, startups, and brands alike. Every step—stitching, printing,
              and finishing, is done in-house, ensuring that what you imagine is exactly what
              you receive.
            </p>
          </div>
        </motion.div>

        {/* Blue gradient quote pill */}
        <motion.div
          className="mt-8 sm:mt-10 mx-auto max-w-225 rounded-[17px] px-8 py-6 text-white text-center text-sm sm:text-base font-bold"
          style={{
            fontFamily: 'var(--font-k2d)',
            background: 'linear-gradient(100deg, #0a64bc 5.67%, #4f9ce7 99.53%)',
          }}
          {...fadeUp(0.2)}
        >
          From one small idea in 2012, we&apos;ve grown into a factory that produces 20,000+
          merch pieces every month. But no matter how much we scale, ek cheez constant hai —
          our personal connect. Unlike a regular company, we talk to you directly, like dost.
          Because merch is not just clothing — it&apos;s identity.
        </motion.div>

        {/* Photo collage — stagger in */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          variants={staggerGrid}
          initial="hidden"
          whileInView="show"
          viewport={VP}
        >
          {photos.map((src, i) => (
            <motion.div
              key={i}
              variants={staggerPhoto}
              className="rounded-[12px] overflow-hidden"
              style={{ aspectRatio: i === 1 || i === 3 ? '16/11' : '4/5' }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
