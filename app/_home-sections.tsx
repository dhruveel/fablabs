'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TestimonialsSection } from './landing/_testimonials'

// ── Assets ────────────────────────────────────────────────────────────────────
const A = {
  heroBg: '/assets/ed62f8a7-530d-4c1f-accd-ed9bdc5ff1e3.png',
  modelL: '/assets/ac1cd68a-a9d6-4e99-96a9-b94f3c876e97.png',
  modelC: '/assets/82d9e877-3f29-4e7b-a8a1-22cd671e989b.png',
  modelR: '/assets/c71c6d7d-fea6-4c1e-8905-495ec2543b9b.png',
  arrowUp: '/assets/d219d5e2-e5a4-423d-85d2-623b5a03aecc.svg',
  arrowDn: '/assets/3e65a833-c4dd-4c44-9c5b-fc6a75f985ef.svg',
  star: '/assets/4a21b2de-60a4-496d-8d33-83a8c2b14e12.svg',
  dropBg: '/assets/04414504-0ca3-4e03-89f2-7db926342531.png',
  aboutImg: '/assets/d46c4826-c621-483c-b322-454cee3ef241.jpg',
  craft1: '/assets/50c6850b-c8eb-42c9-bf57-2a009e120972.png',
  craft2: '/assets/cedbac2c-950a-4a83-9f1c-7775d994e13b.png',
  craft3: '/assets/a2d62fdb-c2a3-4f91-b46f-e6f51fba4ce4.png',
  craft4: '/assets/20f46158-bcfb-44f1-bb3c-60d9a87ce33d.png',
  statsBg: '/assets/610424dd-cfee-4c1b-a1f3-6567822e33e8.svg',
  phone: '/assets/e00b7fee-a4f4-45c9-8ad9-aff927f692cb.png',
  cl1: '/assets/e5d4aa11-e257-455a-bd83-0094be5a7628.png',
  cl2: '/assets/78f2cc3f-bb47-4f53-97a1-6d9dfc4a7527.png',
  cl3: '/assets/5df5ff08-3002-48c3-b570-dc74866e0c3d.png',
  cl4: '/assets/ab1b9c8f-0e06-4ac3-afb0-de813ceee87f.png',
  cl5: '/assets/4a977989-16de-485d-a12d-2f7bf31dce0a.png',
  cl6: '/assets/35b93b4a-ad0b-4bda-8a56-abc781f28052.png',
  cl7: '/assets/d1ba393e-13cf-4a55-8988-79031d8915bf.png',
  cl8: '/assets/6d935726-90de-4241-9d17-38b528195248.png',
  cl9: '/assets/ae484975-fd14-4f6a-b9bb-652678378f15.png',
  cl10: '/assets/a35ea7df-a28d-4940-a197-2cef46e82d28.png',
  cl11: '/assets/d9dc4d34-4309-4765-97bf-800d19c5cd6a.png',
  qArt: '/assets/8e45fa36-3812-4020-8d08-a5587cb3e3aa.png',
  qHand: '/assets/b5db3408-7b7a-475e-b0c1-3b10acd1f6ab.png',
  ctaBg: '/assets/c44b006c-11eb-4c4e-be8e-dca171cfc7bf.png',
  ctaIllus: '/assets/fa6b2f5e-691c-4559-a286-0d6b8b5f8f57.png',
}

// ── Animation helpers ─────────────────────────────────────────────────────────
const VP = { once: true, margin: '-80px' }

// Returns motion props to spread onto a motion.* element
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 44 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: 'easeOut' as const, delay },
  }
}

function slideFrom(x: number, delay = 0) {
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: 'easeOut' as const, delay },
  }
}

// Stagger container + children variants
const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const staggerUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const popIn = {
  hidden: { opacity: 0, scale: 0.72 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 290, damping: 22 },
  },
}

// ── Shared CTA button ─────────────────────────────────────────────────────────
const MotionButton = motion(Button)

function BlueOutlineBtn({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <MotionButton
      variant="outline"
      className={cn(
        'h-auto rounded-full border-2 border-[#0A64BC] bg-transparent px-6 py-2',
        'text-[#0A64BC] hover:bg-[#0A64BC]/10 hover:text-[#0A64BC]',
        'text-base sm:text-lg whitespace-nowrap',
        className,
      )}
      style={{ fontFamily: 'var(--font-jersey10)' }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
    >
      {children}
    </MotionButton>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Parallax: bg drifts up slightly as user scrolls
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden min-h-[60vh] sm:min-h-[75vh] lg:min-h-208.25"
    >
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={A.heroBg}
          alt=""
          className="absolute w-full object-cover object-top pointer-events-none"
          style={{ top: '-28%', height: '158%', y: bgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between px-4 sm:px-8 py-10 min-h-[inherit]">
        {/* Models */}
        <div className="flex flex-1 items-end justify-center gap-1 sm:gap-3 w-full max-w-225">
          <motion.img
            src={A.modelL}
            alt=""
            className="hidden sm:block h-52 lg:h-82.5 object-contain"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: 'easeOut' }}
          />
          <motion.img
            src={A.modelC}
            alt=""
            className="h-64 sm:h-95 lg:h-145 object-contain"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          />
          <motion.img
            src={A.modelR}
            alt=""
            className="hidden sm:block h-52 lg:h-82.5 object-contain"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: 'easeOut' }}
          />
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-4 mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
        >
          <BlueOutlineBtn>Print Now</BlueOutlineBtn>
          <div className="flex gap-3">
            <button
              aria-label="Previous"
              className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            >
              <img src={A.arrowUp} alt="" className="h-12 w-auto" />
            </button>
            <button
              aria-label="Next"
              className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            >
              <img src={A.arrowDn} alt="" className="h-12 w-auto -scale-y-100" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Tagline ───────────────────────────────────────────────────────────────────
function Tagline() {
  return (
    <div className="w-full bg-black flex flex-col items-center gap-3 py-8 px-4">
      <motion.img
        src={A.star}
        alt=""
        className="h-14 w-auto"
        initial={{ opacity: 0, scale: 0, rotate: -90 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={VP}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.p
        className="text-white text-base sm:text-lg lg:text-xl text-center max-w-2xl"
        style={{ fontFamily: 'var(--font-k2d)' }}
        {...fadeUp(0.15)}
      >
        FabLabs creates merchandise that comes from the heart and stands out in style.
      </motion.p>
    </div>
  )
}

// ── Drop Section ──────────────────────────────────────────────────────────────
function DropSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-[50vh] lg:min-h-171.5">
      <div className="absolute inset-0">
        <img
          src={A.dropBg}
          alt=""
          className="absolute w-full h-[150%] object-cover top-[-10%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 sm:gap-10 px-6 py-24 sm:py-32 min-h-[inherit]">
        <motion.h2
          className="text-white text-3xl sm:text-5xl lg:text-[64px] font-bold text-center uppercase leading-tight max-w-3xl"
          style={{ fontFamily: 'var(--font-k2d)' }}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Design your drop.
          <br />
          Ban apna crew.
        </motion.h2>
        <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6" {...fadeUp(0.28)}>
          <BlueOutlineBtn>Join the Squad</BlueOutlineBtn>
          <BlueOutlineBtn>Grab your Drip</BlueOutlineBtn>
        </motion.div>
      </div>
    </section>
  )
}

// ── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="w-full bg-black py-10 sm:py-14 px-4 sm:px-8 lg:px-12 flex justify-center">
      <motion.div className="w-full max-w-283" {...fadeUp()}>
        <Card
          className="w-full rounded-[40px] ring-0 shadow-none border-0"
          style={{ background: 'linear-gradient(180deg, #201e1e 0%, #0d0d0d 100%)' }}
        >
          <CardContent className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Image */}
            <motion.div
              className="hidden lg:block w-[42%] shrink-0 rounded-[27px] overflow-hidden self-stretch"
              {...slideFrom(-60, 0.15)}
            >
              <img
                src={A.aboutImg}
                alt=""
                className="w-full h-full object-cover min-h-100"
              />
            </motion.div>
            {/* Text */}
            <div className="flex-1 text-[#a8a8a8]">
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-[64px] font-bold mb-4 sm:mb-6"
                style={{ fontFamily: 'var(--font-k2d)' }}
                {...fadeUp(0.1)}
              >
                Who We Are?
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg lg:text-[24px] text-justify leading-relaxed mb-8 sm:mb-10"
                style={{ fontFamily: 'var(--font-k2d)' }}
                {...fadeUp(0.2)}
              >
                FabLabs is not just a merchandising company, yeh ek brand story creator hai.
                Based in Tiruppur, Tamil Nadu, FabLabs was founded in 2012 by Vimal N. with
                one simple idea: make merchandise that people actually vibe with.
              </motion.p>
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-[64px] font-bold mb-4 sm:mb-6"
                style={{ fontFamily: 'var(--font-k2d)' }}
                {...fadeUp(0.3)}
              >
                What We Do?
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg lg:text-[24px] text-justify leading-relaxed"
                style={{ fontFamily: 'var(--font-k2d)' }}
                {...fadeUp(0.4)}
              >
                From college fests to big brands, hum custom-made merch banate hain jo
                visibility badhata hai and directly connects with your audience. Every piece
                is designed to resonate with your story, because we believe merch is not just
                clothing, it&apos;s identity.
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

// ── Craft Section ─────────────────────────────────────────────────────────────
const CRAFT_CARDS = [
  { img: A.craft1, text: 'Printing That Tells Your Story', href: 'https://fablabs.in/' },
  { img: A.craft2, text: 'A Fabric For Every Journey' },
  { img: A.craft3, text: 'Crafted By Hands That Cares' },
  { img: A.craft4, text: 'Fit For Your Every Move' },
]
const STAGGER_MT = ['lg:mt-0', 'lg:mt-[50px]', 'lg:mt-[100px]', 'lg:mt-[150px]']

function CraftSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 px-4 sm:px-8">
      <motion.h2
        className="text-white text-3xl sm:text-4xl lg:text-[48px] font-bold text-center mb-10 sm:mb-14"
        style={{ fontFamily: 'var(--font-k2d)' }}
        {...fadeUp()}
      >
        Tera Story, Hamaara Craft
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-center gap-5 sm:gap-6 max-w-350 mx-auto pb-0 lg:pb-40"
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        {CRAFT_CARDS.map((card, i) => {
          const inner = (
            <>
              <img
                src={card.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <p
                className="relative z-10 text-white text-3xl sm:text-4xl lg:text-[48px] font-bold text-center leading-tight px-6"
                style={{ fontFamily: 'var(--font-k2d)' }}
              >
                {card.text}
              </p>
            </>
          )

          return (
            <motion.div
              key={i}
              variants={staggerUp}
              className={cn(
                'relative rounded-[33px] overflow-hidden flex items-center justify-center',
                'w-full aspect-320/356 lg:w-70 xl:w-80 lg:aspect-auto lg:h-89 shrink-0',
                STAGGER_MT[i],
              )}
              whileHover={{ scale: 1.04, y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              {card.href ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
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

// ── Stats Section ─────────────────────────────────────────────────────────────
const STATS = [
  { value: '100+', label: 'Corporate Partners' },
  { value: '50+', label: 'College Campuses' },
  { value: '10k+', label: 'T-shirts' },
  { value: '10k+', label: 'Customers' },
]

function StatsSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-150 lg:min-h-230.75">
      <div className="absolute inset-0">
        <img src={A.statsBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 max-w-360 mx-auto flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-24 py-16 sm:py-20 gap-10 lg:gap-8 min-h-[inherit]">
        {/* Left */}
        <motion.div
          className="flex flex-col gap-4 sm:gap-5 max-w-125 w-full"
          {...slideFrom(-50)}
        >
          <p
            className="text-white text-2xl sm:text-3xl"
            style={{ fontFamily: 'var(--font-k2d)', fontWeight: 500 }}
          >
            Shop now, flex later
          </p>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            Wear your vibe.
            <br />
            Dikha apna style.
          </h2>
          <p
            className="text-white text-sm sm:text-base text-justify leading-relaxed"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            At Fablabs, we craft more than clothing, we craft pieces that tell your story.
            Har stitch, har colour, har design is all about tu kaun hai. Because for us, merch
            is not just fabric, it&apos;s identity. Every T-shirt, every hoodie, every cap we
            create is made to carry your vibe.
          </p>
          {/* Mobile stat grid */}
          <motion.div
            className="grid grid-cols-2 gap-3 lg:hidden mt-2"
            variants={staggerGrid}
            initial="hidden"
            whileInView="show"
            viewport={VP}
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={popIn}>
                <Card className="rounded-2xl border-0 ring-0 bg-[#0A64BC]/80 text-center py-4">
                  <CardContent className="p-0">
                    <p
                      className="text-white text-2xl font-bold leading-none"
                      style={{ fontFamily: 'var(--font-k2d)' }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-white/80 text-xs mt-1"
                      style={{ fontFamily: 'var(--font-k2d)' }}
                    >
                      {s.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <BlueOutlineBtn className="self-start mt-2">Print Now</BlueOutlineBtn>
        </motion.div>

        {/* Right — phone + floating stat cards (desktop only) */}
        <div
          className="hidden lg:flex relative shrink-0 items-center justify-center"
          style={{ width: 500, height: 700 }}
        >
          {/* Outer wrapper handles enter animation; inner img handles float */}
          <motion.div
            className="absolute"
            style={{
              width: 580,
              height: 720,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%) rotate(-35deg)',
            }}
            initial={{ opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <motion.img
              src={A.phone}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
          </motion.div>

          {/* Floating stat cards */}
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="absolute"
              style={{
                top: [80, 200, 350, 490][i],
                left: i % 2 === 0 ? 10 : undefined,
                right: i % 2 !== 0 ? 10 : undefined,
              }}
              initial={{ opacity: 0, scale: 0.65, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25 + i * 0.13,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <Card className="rounded-2xl border-0 ring-0 bg-[#0A64BC]/85 text-center shadow-2xl backdrop-blur-sm px-5 py-3">
                <CardContent className="p-0">
                  <p
                    className="text-white text-3xl font-bold leading-none"
                    style={{ fontFamily: 'var(--font-k2d)' }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-white/80 text-xs font-bold mt-1"
                    style={{ fontFamily: 'var(--font-k2d)' }}
                  >
                    {s.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Clients Section ───────────────────────────────────────────────────────────
const CLIENTS = [
  A.cl1, A.cl2, A.cl3, A.cl4, A.cl5, A.cl6,
  A.cl7, A.cl8, A.cl9, A.cl10, A.cl11,
]

function ClientsSection() {
  return (
    <section className="w-full bg-black py-10 sm:py-14 px-4 sm:px-8 lg:px-12 flex justify-center">
      <motion.div className="w-full max-w-300" {...fadeUp()}>
        <Card
          className="w-full rounded-[46px] ring-0 shadow-none border-0 py-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(38,38,38,0.71) 0%, rgba(121,125,128,0.71) 100%)',
          }}
        >
          <CardHeader className="pt-10 sm:pt-14 pb-8 px-6 sm:px-10">
            <CardTitle
              className="text-white text-3xl sm:text-4xl lg:text-[48px] font-bold text-center"
              style={{ fontFamily: 'var(--font-k2d)' }}
            >
              Our Clients
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 sm:px-10 pb-10 sm:pb-14">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-9 place-items-center"
              variants={staggerGrid}
              initial="hidden"
              whileInView="show"
              viewport={VP}
            >
              {CLIENTS.map((src, i) => (
                <motion.div
                  key={i}
                  variants={staggerUp}
                  className="h-16 sm:h-20 lg:h-22.5 w-full flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

// ── Quotes Section ────────────────────────────────────────────────────────────
function QuotesSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-125 lg:min-h-204.75">
      {/* Decorative right imagery */}
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 pointer-events-none hidden lg:block"
        {...slideFrom(60)}
      >
        <img
          src={A.qArt}
          alt=""
          className="absolute right-0 top-0 h-full w-auto object-contain"
        />
        <img
          src={A.qHand}
          alt=""
          className="absolute right-24 top-8 h-[90%] object-contain"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-360 mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-20 min-h-[inherit]">
        <motion.div className="max-w-lg" {...slideFrom(-50)}>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-[48px] leading-relaxed mb-6"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            Ready to bring your vision to life?
          </h2>
          <p
            className="text-white text-sm sm:text-base leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            At FabLabs, we don&apos;t just print logos on tees, we help you create a whole
            vibe for your college fest, squad, or brand. Whether you need 20 hoodies for your
            gang, 200 T-shirts for your college event, or a hatke design that&apos;s totally
            yours, hum sab manage kar lenge.
          </p>
          <p
            className="text-white text-sm sm:text-base leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            From choosing the right fabric to final finishing, everything is done in-house —
            so quality bhi top-notch hogi, aur delivery bhi fast. All you have to do is tell
            us your idea… baaki quote se leke final merch tak, scene set hai!
          </p>
          <p
            className="text-white text-base sm:text-lg lg:text-[24px] font-bold leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            Get a custom quote today and let&apos;s start building something extraordinary —
            made just for you, by us.
          </p>
          <BlueOutlineBtn>Get My Quote</BlueOutlineBtn>
        </motion.div>
      </div>
    </section>
  )
}

// ── CTA Section ───────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden min-h-75 sm:min-h-95">
      <div className="absolute inset-0">
        <img src={A.ctaBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 max-w-360 mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 lg:px-28 py-14 sm:py-20 gap-8">
        <motion.div className="max-w-169.75 w-full" {...slideFrom(-40)}>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-[48px] mb-4"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            Slide into our DMs
          </h2>
          <p
            className="text-white text-sm sm:text-base leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            Have an idea or planning a fest? We&apos;d love to create something with you!
            From custom hoodies for your team to department T-shirts or even a bold new
            concept—we&apos;re always ready to make it happen.
          </p>
          <BlueOutlineBtn>Let&apos;s Talk.</BlueOutlineBtn>
        </motion.div>
        <motion.img
          src={A.ctaIllus}
          alt=""
          className="hidden sm:block h-40 sm:h-48 lg:h-54.5 w-auto object-contain shrink-0"
          {...slideFrom(50, 0.15)}
        />
      </div>
    </section>
  )
}

// ── Root export ───────────────────────────────────────────────────────────────
export function HomeSections() {
  return (
    <div className="bg-black">
      <HeroSection />
      <Tagline />
      <DropSection />
      <AboutSection />
      <CraftSection />
      <StatsSection />
      <ClientsSection />
      <QuotesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  )
}
