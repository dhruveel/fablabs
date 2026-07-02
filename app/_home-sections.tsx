"use client";

import {
  m,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TestimonialsSection } from "./landing/_testimonials";

// ── Assets ────────────────────────────────────────────────────────────────────
const A = {
  heroBg: "/assets/ed62f8a7-530d-4c1f-accd-ed9bdc5ff1e3.png",
  modelL: "/assets/ac1cd68a-a9d6-4e99-96a9-b94f3c876e97.png",
  modelC: "/assets/82d9e877-3f29-4e7b-a8a1-22cd671e989b.png",
  modelR: "/assets/c71c6d7d-fea6-4c1e-8905-495ec2543b9b.png",
  arrowUp: "/assets/arrow-left.png",
  arrowDn: "/assets/arrow-right.png",
  star: "/assets/4a21b2de-60a4-496d-8d33-83a8c2b14e12.svg",
  dropBg: "/assets/04414504-0ca3-4e03-89f2-7db926342531.png",
  aboutImg: "/assets/d46c4826-c621-483c-b322-454cee3ef241.jpg",
  craft1: "/assets/craft-card1.jpg",
  craft2: "/assets/craft-card2.jpg",
  craft3: "/assets/craft-card3.jpg",
  craft4: "/assets/craft-card4.jpg",
  statsCardBg: "/assets/stats-card-bg.svg",
  cl1: "/assets/e5d4aa11-e257-455a-bd83-0094be5a7628.png",
  cl2: "/assets/78f2cc3f-bb47-4f53-97a1-6d9dfc4a7527.png",
  cl3: "/assets/5df5ff08-3002-48c3-b570-dc74866e0c3d.png",
  cl4: "/assets/ab1b9c8f-0e06-4ac3-afb0-de813ceee87f.png",
  cl5: "/assets/4a977989-16de-485d-a12d-2f7bf31dce0a.png",
  cl6: "/assets/35b93b4a-ad0b-4bda-8a56-abc781f28052.png",
  cl7: "/assets/d1ba393e-13cf-4a55-8988-79031d8915bf.png",
  cl8: "/assets/6d935726-90de-4241-9d17-38b528195248.png",
  cl9: "/assets/ae484975-fd14-4f6a-b9bb-652678378f15.png",
  cl10: "/assets/a35ea7df-a28d-4940-a197-2cef46e82d28.png",
  cl11: "/assets/d9dc4d34-4309-4765-97bf-800d19c5cd6a.png",
  qArt: "/assets/8e45fa36-3812-4020-8d08-a5587cb3e3aa.png",
  qHand: "/assets/b5db3408-7b7a-475e-b0c1-3b10acd1f6ab.png",
  ctaBg: "/assets/c44b006c-11eb-4c4e-be8e-dca171cfc7bf.png",
  ctaIllus: "/assets/fa6b2f5e-691c-4559-a286-0d6b8b5f8f57.png",
};

// ── Animation helpers ─────────────────────────────────────────────────────────
const VP = { once: true, margin: "-80px" };

// Returns motion props to spread onto a motion.* element
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 44 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  };
}

function slideFrom(x: number, delay = 0) {
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  };
}

// Stagger container + children variants
const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ── Shared CTA button ─────────────────────────────────────────────────────────
function BlueOutlineBtn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.span
      className="inline-block"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring" as const, stiffness: 350, damping: 20 }}
    >
      <Button
        variant="outline"
        className={cn(
          "h-auto rounded-full border-2 border-[#0A64BC] bg-transparent px-6 py-2",
          "text-[#0A64BC] hover:bg-[#0A64BC]/10 hover:text-[#0A64BC]",
          "text-base sm:text-lg whitespace-nowrap",
          className,
        )}
        style={{ fontFamily: "var(--font-jersey10)" }}
      >
        {children}
      </Button>
    </m.span>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Parallax: bg drifts up slightly as user scrolls
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden min-h-150 sm:min-h-187.5 lg:min-h-208.25"
    >
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          className="absolute w-full pointer-events-none"
          style={{ top: "-28%", height: "158%", y: bgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          <Image
            src={A.heroBg}
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
        </m.div>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between px-4 sm:px-8 py-10 min-h-[inherit]">
        {/* Models */}
        <div className="flex flex-1 items-end justify-center gap-1 sm:gap-3 w-full max-w-225">
          <m.div
            className="relative hidden sm:block h-52 lg:h-82.5 w-48 lg:w-72 shrink-0"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.35,
              ease: "easeOut" as const,
            }}
          >
            <Image
              src={A.modelL}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 192px, 288px"
              priority
            />
          </m.div>
          <m.div
            className="relative h-64 sm:h-95 lg:h-145 w-52 sm:w-72 lg:w-96 shrink-0"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
          >
            <Image
              src={A.modelC}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 208px, (max-width: 1024px) 288px, 384px"
              priority
            />
          </m.div>
          <m.div
            className="relative hidden sm:block h-52 lg:h-82.5 w-48 lg:w-72 shrink-0"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.35,
              ease: "easeOut" as const,
            }}
          >
            <Image
              src={A.modelR}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 192px, 288px"
              priority
            />
          </m.div>
        </div>

        {/* CTA */}
        <m.div
          className="flex flex-col items-center gap-4 mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
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
              <img
                src={A.arrowDn}
                alt=""
                className="h-12 w-auto -scale-y-100"
              />
            </button>
          </div>
        </m.div>
      </div>
    </section>
  );
}

// ── Tagline ───────────────────────────────────────────────────────────────────
function Tagline() {
  return (
    <div className="w-full bg-black flex flex-col items-center gap-3 py-8 px-4">
      <m.img
        src={A.star}
        alt=""
        className="w-18.5 h-18.5"
        initial={{ opacity: 0, scale: 0, rotate: -90 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={VP}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <m.p
        className="text-white text-base sm:text-lg lg:text-xl text-center max-w-2xl"
        style={{ fontFamily: "var(--font-k2d)" }}
        {...fadeUp(0.15)}
      >
        FabLabs creates merchandise that comes from the heart and stands out in
        style.
      </m.p>
    </div>
  );
}

// ── Drop Section ──────────────────────────────────────────────────────────────
function DropSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-125 lg:min-h-171.5">
      <div className="absolute inset-0">
        <img
          src={A.dropBg}
          alt=""
          className="absolute w-full h-[150%] object-cover top-[-10%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70" />
      </div>
      <div className="relative z-10 max-w-360 mx-auto w-full flex flex-col items-center justify-center gap-8 sm:gap-10 px-6 py-24 sm:py-32 min-h-[inherit]">
        <m.h2
          className="text-white text-3xl sm:text-5xl lg:text-[64px] font-bold text-center uppercase leading-tight max-w-3xl"
          style={{ fontFamily: "var(--font-k2d)" }}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Design your drop.
          <br />
          Ban apna crew.
        </m.h2>
        <m.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          {...fadeUp(0.28)}
        >
          <BlueOutlineBtn>Join the Squad</BlueOutlineBtn>
          <BlueOutlineBtn>Grab your Drip</BlueOutlineBtn>
        </m.div>
      </div>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="w-full bg-black py-10 sm:py-14 px-4 sm:px-8 lg:px-12 flex justify-center">
      <m.div className="w-full max-w-283" {...fadeUp()}>
        <Card
          className="w-full rounded-[40px] ring-0 shadow-none border-0"
          style={{
            background: "linear-gradient(180deg, #201e1e 0%, #0d0d0d 100%)",
          }}
        >
          <CardContent className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Image */}
            <m.div
              className="hidden lg:block w-[42%] shrink-0 rounded-[27px] overflow-hidden self-stretch"
              {...slideFrom(-60, 0.15)}
            >
              <img
                src={A.aboutImg}
                alt=""
                className="w-full h-full object-cover min-h-100"
              />
            </m.div>
            {/* Text */}
            <div className="flex-1 text-[#a8a8a8]">
              <m.h2
                className="text-4xl sm:text-5xl lg:text-[64px] font-bold mb-4 sm:mb-6"
                style={{ fontFamily: "var(--font-k2d)" }}
                {...fadeUp(0.1)}
              >
                Who We Are?
              </m.h2>
              <m.p
                className="text-base sm:text-lg lg:text-[24px] text-justify leading-relaxed mb-8 sm:mb-10"
                style={{ fontFamily: "var(--font-k2d)" }}
                {...fadeUp(0.2)}
              >
                FabLabs is not just a merchandising company, yeh ek brand story
                creator hai. Based in Tiruppur, Tamil Nadu, FabLabs was founded
                in 2012 by Vimal N. with one simple idea: make merchandise that
                people actually vibe with.
              </m.p>
              <m.h2
                className="text-4xl sm:text-5xl lg:text-[64px] font-bold mb-4 sm:mb-6"
                style={{ fontFamily: "var(--font-k2d)" }}
                {...fadeUp(0.3)}
              >
                What We Do?
              </m.h2>
              <m.p
                className="text-base sm:text-lg lg:text-[24px] text-justify leading-relaxed"
                style={{ fontFamily: "var(--font-k2d)" }}
                {...fadeUp(0.4)}
              >
                From college fests to big brands, hum custom-made merch banate
                hain jo visibility badhata hai and directly connects with your
                audience. Every piece is designed to resonate with your story,
                because we believe merch is not just clothing, it&apos;s
                identity.
              </m.p>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </section>
  );
}

// ── Craft Section ─────────────────────────────────────────────────────────────
const CRAFT_CARDS = [
  {
    img: A.craft1,
    description:
      "At Fablabs, we believe your t-shirt should be more than just fabric, it should be a canvas for your passions. With cutting-edge printing techniques like screen printing, DTG, and thermal printing, we bring your boldest ideas to life, ensuring every design is as vibrant as the story you want to tell.",
    text: "Printing That Tells Your Story",
    href: "https://fablabs.in/",
  },
  {
    img: A.craft2,
    description:
      "Every adventure deserves the right gear. Whether you're seeking the softness of cotton for everyday comfort or the durability of premium blends for a bold statement, Fablabs offers fabrics as versatile as your lifestyle. Every touch, every thread, crafted for the moments that matter.",
    text: "A Fabric For Every Journey",
  },
  {
    img: A.craft3,
    description:
      "Every adventure deserves the right gear. Whether you're seeking the softness of cotton for everyday comfort or the durability of premium blends for a bold statement, Fablabs offers fabrics as versatile as your lifestyle. Every touch, every thread, crafted for the moments that matter.",
    text: "Crafted By Hands That Cares",
  },
  {
    img: A.craft4,
    description:
      "Every adventure deserves the right gear. Whether you're seeking the softness of cotton for everyday comfort or the durability of premium blends for a bold statement, Fablabs offers fabrics as versatile as your lifestyle. Every touch, every thread, crafted for the moments that matter.",
    text: "Fit For Your Every Move",
  },
];

function CraftCard({
  img,
  text,
  description,
  href,
}: {
  img: string;
  text: string;
  description: string;
  href?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      variants={staggerUp}
      className="relative rounded-[33px] overflow-hidden shrink-0 w-full aspect-320/356 sm:w-[calc(50%-16px)] lg:w-80 lg:aspect-auto lg:h-89"
      whileHover={{ scale: 1.04, y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      transition={{ type: "spring" as const, stiffness: 300, damping: 22 }}
    >
      <Image
        src={img}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
      />
      {/* Dark overlay — fades in on hover for description readability */}
      <m.div
        className="absolute inset-0 bg-black/60"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {/* Label — fades out on hover */}
      <m.p
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-64.75 text-white font-bold text-3xl sm:text-4xl lg:text-[48px] text-center leading-normal pointer-events-none"
        style={{ fontFamily: "var(--font-k2d)" }}
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -10 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </m.p>
      {/* Description — fades in on hover */}
      <m.p
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] text-white font-extrabold text-center pointer-events-none"
        style={{
          fontFamily: "var(--font-k2d)",
          fontSize: "16px",
          lineHeight: "100%",
        }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        {description}
      </m.p>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        />
      )}
    </m.div>
  );
}

function CraftSection() {
  return (
    <section className="w-full bg-black py-[73px] px-4 sm:px-11">
      <m.h2
        className="text-white text-3xl sm:text-4xl lg:text-[48px] font-bold text-center py-3 mb-0"
        style={{ fontFamily: "var(--font-k2d)" }}
        {...fadeUp()}
      >
        Your Story, Our Craft.
      </m.h2>
      <m.div
        className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-center items-center gap-8 max-w-[1396px] mx-auto py-3"
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        {CRAFT_CARDS.map((card, i) => (
          <CraftCard key={i} {...card} />
        ))}
      </m.div>
    </section>
  );
}

// ── Stats Section ─────────────────────────────────────────────────────────────
const STAT_BLUE = "linear-gradient(114.57deg, #0a64bc 49.984%, #000000 97.94%)";
const STAT_DARK =
  "linear-gradient(238.65deg, #474747 72.239%, #000000 89.796%)";

const STATS = [
  {
    steps: [1, 10, 20, 30, 40, 55, 65, 70, 80, 90, 99, 100],
    suffix: "+",
    label: "Corporate Partners",
    blue: true,
  },
  {
    steps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    suffix: "k+",
    label: "T-Shirt",
    blue: false,
  },
  {
    steps: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    suffix: "+",
    label: "College Campuses",
    blue: false,
  },
  {
    steps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    suffix: "k+",
    label: "Customers",
    blue: true,
  },
];

function StatCard({
  steps,
  suffix,
  label,
  blue,
  delay = 0,
}: {
  steps: number[];
  suffix: string;
  label: string;
  blue: boolean;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true });
  const y = useMotionValue(0);

  useEffect(() => {
    if (!inView || !slotRef.current) return;
    const lineH =
      (slotRef.current.children[0] as HTMLElement)?.offsetHeight ?? 96;
    animate(y, -(steps.length - 1) * lineH, {
      duration: 1.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
    });
  }, [inView, delay, steps.length, y]);

  return (
    <m.div
      ref={cardRef}
      className="w-36 sm:w-62.25 h-36 sm:h-52 rounded-[24px] p-4 sm:p-5 flex flex-col justify-between"
      style={{ background: blue ? STAT_BLUE : STAT_DARK }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" as const, delay }}
    >
      {/* Rolling slot counter */}
      <div
        className="flex items-start overflow-hidden"
        style={{
          height: "1.2em",
          fontSize: "clamp(28px, 4.5vw, 80px)",
          fontFamily: "var(--font-k2d)",
        }}
      >
        <div className="overflow-hidden h-full shrink-0">
          <m.div ref={slotRef} style={{ y }}>
            {steps.map((n, i) => (
              <div
                key={i}
                style={{ height: "1.2em" }}
                className="flex items-center text-white font-normal leading-none"
              >
                {String(n).padStart(2, "0")}
              </div>
            ))}
          </m.div>
        </div>
        <span className="text-white font-normal leading-none">{suffix}</span>
      </div>
      {/* Label */}
      <p
        className="text-white font-normal text-xs sm:text-xl lg:text-[24px]"
        style={{ fontFamily: "var(--font-k2d)" }}
      >
        {label}
      </p>
    </m.div>
  );
}

function StatsSection() {
  return (
    <section className="relative bg-black w-full overflow-hidden min-h-125 lg:min-h-231.5">
      {/* Tilted card SVG background (Figma: Frame 28, opacity 0.2 gradient) */}
      <Image
        src={A.statsCardBg}
        alt=""
        width={1460}
        height={877}
        aria-hidden
        unoptimized
        className="-left-2.5 absolute top-0 lg:top-12.25 w-[calc(100%+10px)] h-full lg:h-219.25 pointer-events-none select-none"
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 max-w-360 mx-auto px-5 sm:px-21 py-16 lg:pt-77.75 lg:pb-21.5 min-h-[inherit]">
        {/* Left text */}
        <m.div
          className="flex flex-col gap-5 w-full lg:max-w-99.5"
          {...slideFrom(-50)}
        >
          <p
            className="text-white text-2xl sm:text-[36px] font-medium"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            Shop now, flex later
          </p>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[97%]"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            Wear your vibe. Dikha apna style.
          </h2>
          <p
            className="text-white text-sm sm:text-base lg:text-[24px] leading-[97%]"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            At Fablabs, we craft more than clothing, we craft pieces that tell
            your story. Har stitch, har colour, har design is all about tu kaun
            hai.
          </p>
          <BlueOutlineBtn className="self-start mt-4">Print Now</BlueOutlineBtn>
        </m.div>
        {/* Right: 2×2 stat grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-x-11.5 sm:gap-y-12.5">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Clients Section ───────────────────────────────────────────────────────────
const CLIENTS = [
  A.cl1,
  A.cl2,
  A.cl3,
  A.cl4,
  A.cl5,
  A.cl6,
  A.cl7,
  A.cl8,
  A.cl9,
  A.cl10,
  A.cl11,
];

function ClientsSection() {
  return (
    <section className="w-full bg-black py-10 sm:py-14 px-4 sm:px-8 lg:px-12 flex justify-center">
      <m.div className="w-full max-w-300" {...fadeUp()}>
        <Card
          className="w-full rounded-[46px] ring-0 shadow-none border-0 py-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(38,38,38,0.71) 0%, rgba(121,125,128,0.71) 100%)",
          }}
        >
          <CardHeader className="pt-10 sm:pt-14 pb-8 px-6 sm:px-10">
            <CardTitle
              className="text-white text-3xl sm:text-4xl lg:text-[48px] font-bold text-center"
              style={{ fontFamily: "var(--font-k2d)" }}
            >
              Our Clients
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 sm:px-10 pb-10 sm:pb-14">
            <m.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-9 place-items-center"
              variants={staggerGrid}
              initial="hidden"
              whileInView="show"
              viewport={VP}
            >
              {CLIENTS.map((src, i) => (
                <m.div
                  key={i}
                  variants={staggerUp}
                  className="h-16 sm:h-20 lg:h-22.5 w-full flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </m.div>
              ))}
            </m.div>
          </CardContent>
        </Card>
      </m.div>
    </section>
  );
}

// ── Quotes Section ────────────────────────────────────────────────────────────
function QuotesSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-125 lg:min-h-204.75">
      {/* Decorative right imagery */}
      <m.div
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
      </m.div>

      {/* Content */}
      <div className="relative z-10 max-w-360 mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-20 min-h-[inherit]">
        <m.div className="max-w-lg" {...slideFrom(-50)}>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-[48px] leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            Ready to bring your vision to life?
          </h2>
          <p
            className="text-white text-sm sm:text-base leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            At FabLabs, we don&apos;t just print logos on tees, we help you
            create a whole vibe for your college fest, squad, or brand. Whether
            you need 20 hoodies for your gang, 200 T-shirts for your college
            event, or a hatke design that&apos;s totally yours, hum sab manage
            kar lenge.
          </p>
          <p
            className="text-white text-sm sm:text-base leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            From choosing the right fabric to final finishing, everything is
            done in-house — so quality bhi top-notch hogi, aur delivery bhi
            fast. All you have to do is tell us your idea… baaki quote se leke
            final merch tak, scene set hai!
          </p>
          <p
            className="text-white text-base sm:text-lg lg:text-[24px] font-bold leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            Get a custom quote today and let&apos;s start building something
            extraordinary — made just for you, by us.
          </p>
          <BlueOutlineBtn>Get My Quote</BlueOutlineBtn>
        </m.div>
      </div>
    </section>
  );
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
        <m.div className="max-w-169.75 w-full" {...slideFrom(-40)}>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-[48px] mb-4"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            Slide into our DMs
          </h2>
          <p
            className="text-white text-sm sm:text-base leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            Have an idea or planning a fest? We&apos;d love to create something
            with you! From custom hoodies for your team to department T-shirts
            or even a bold new concept—we&apos;re always ready to make it
            happen.
          </p>
          <BlueOutlineBtn>Let&apos;s Talk.</BlueOutlineBtn>
        </m.div>
        <m.img
          src={A.ctaIllus}
          alt=""
          className="hidden sm:block h-40 sm:h-48 lg:h-54.5 w-auto object-contain shrink-0"
          {...slideFrom(50, 0.15)}
        />
      </div>
    </section>
  );
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
  );
}
