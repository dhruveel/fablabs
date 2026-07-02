'use client'

import { m } from 'framer-motion'

const imgFlow = '/assets/ce500f86-01e0-4c96-b8de-0ab9a9a7bf38.png'

const steps = [
  { title: 'Idea Kicks In',       desc: "When students plan an event or fest, one of their first thoughts is, 'Let\\'s get custom merchandise made!'", img: '/assets/ef7e2b37-f6ca-4e67-8b22-978ba7725f9a.gif', labelTop: true  },
  { title: 'Connect with FabLabs',desc: 'They meet our founder, Vimal—easygoing, friendly, and just like talking to a friend.',                        img: '/assets/888b29a0-94f2-48b6-b085-99bffba2cda0.gif', labelTop: true  },
  { title: 'We Manufacture',      desc: 'The cotton is carefully sourced and stitching begins. Every step is handled in-house with no compromises on quality.', img: '/assets/9258a937-c116-4b7f-a402-16ac08748862.gif', labelTop: true  },
  { title: 'Designs Get Printed', desc: 'Their logos, names, and fest graphics are fully customized and printed to perfection.',                        img: '/assets/f3a8debe-4e97-4a0a-8d90-3c50951b4009.gif', labelTop: false },
  { title: 'Fast Dispatch',       desc: 'Timely delivery so students get merch before the event.',                                                      img: '/assets/c2f3baae-4b64-4287-9496-cee85904066a.gif', labelTop: false },
  { title: 'Wear & Celebrate',    desc: 'Students get their merch and enjoy the event together, same fits, same vibe, full memories.',                  img: '/assets/f53f4915-0f1a-4a06-897f-2d1c27957748.gif', labelTop: false },
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
    <div className="w-55 h-55 sm:w-70 sm:h-70 lg:w-81.25 lg:h-81.25 shrink-0">
      <img src={step.img} alt={step.title} className="w-full h-full object-contain" />
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
        <img src={imgFlow} alt="" className="w-[50%] sm:w-[46%] h-auto object-contain opacity-30 lg:opacity-50" />
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
