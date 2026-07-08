'use client'

import Image from 'next/image'
import { m } from 'framer-motion'

const imgFlow = '/assets/our-story-process-flow-bg.png'

const steps = [
  { title: 'Idea Kicks In',       desc: "When students plan an event or fest, one of their first thoughts is, 'Let\\'s get custom merchandise made!'", img: '/assets/our-story-process-idea-kicks-in.gif', labelTop: true  },
  { title: 'Connect with FabLabs',desc: 'They meet our founder, Vimal—easygoing, friendly, and just like talking to a friend.',                        img: '/assets/our-story-process-connect-fablabs.gif', labelTop: true  },
  { title: 'We Manufacture',      desc: 'The cotton is carefully sourced and stitching begins. Every step is handled in-house with no compromises on quality.', img: '/assets/our-story-process-we-manufacture.gif', labelTop: true  },
  { title: 'Designs Get Printed', desc: 'Their logos, names, and fest graphics are fully customized and printed to perfection.',                        img: '/assets/our-story-process-designs-printed.gif', labelTop: false },
  { title: 'Fast Dispatch',       desc: 'Timely delivery so students get merch before the event.',                                                      img: '/assets/our-story-process-fast-dispatch.gif', labelTop: false },
  { title: 'Wear & Celebrate',    desc: 'Students get their merch and enjoy the event together, same fits, same vibe, full memories.',                  img: '/assets/our-story-process-wear-celebrate.gif', labelTop: false },
]

const VP = { once: true, margin: '-80px' }

const staggerRow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}
const fadeStep = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function StepCard({ step }: { step: typeof steps[number] }) {
  const text = (
    <div className="text-center px-2">
      <p className="text-white font-bold text-xl sm:text-2xl leading-tight" style={{ fontFamily: 'var(--font-k2d)' }}>
        {step.title}
      </p>
      <p className="text-white text-sm mt-2 max-w-65 mx-auto leading-snug" style={{ fontFamily: 'var(--font-k2d)' }}>
        {step.desc}
      </p>
    </div>
  )

  const illustration = (
    <div className="relative w-55 h-55 sm:w-70 sm:h-70 lg:w-81.25 lg:h-81.25 shrink-0">
      {/* unoptimized: these are animated GIFs — the built-in optimizer only
          outputs a static frame, so bypass it to keep the animation. */}
      <Image
        src={step.img}
        alt={step.title}
        fill
        unoptimized
        sizes="(min-width: 1024px) 325px, (min-width: 640px) 280px, 220px"
        className="object-contain"
      />
    </div>
  )

  return (
    <m.div variants={fadeStep} className="flex flex-col items-center gap-4">
      {step.labelTop ? text : illustration}
      {step.labelTop ? illustration : text}
    </m.div>
  )
}

export function ProcessSection() {
  return (
    <section className="bg-black w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Central flowing illustration fades in */}
      <m.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VP}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Image
          src={imgFlow}
          alt=""
          width={3447}
          height={3741}
          className="w-[50%] sm:w-[46%] h-auto object-contain opacity-30 lg:opacity-50"
        />
      </m.div>

      <div className="max-w-360 mx-auto relative">
        {/* Top row: label above illustration — stagger left → right */}
        <m.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-4 lg:gap-2"
          variants={staggerRow}
          initial="hidden"
          whileInView="show"
          viewport={VP}
        >
          {steps.slice(0, 3).map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </m.div>

        {/* Bottom row: illustration above label — stagger left → right */}
        <m.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-4 lg:gap-2 mt-10 sm:mt-6"
          variants={staggerRow}
          initial="hidden"
          whileInView="show"
          viewport={VP}
        >
          {steps.slice(3).map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </m.div>
      </div>
    </section>
  )
}
