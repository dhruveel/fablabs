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
import { QuoteDialog } from "@/components/layout/quote-dialog";
import { TestimonialsSection } from "./landing/_testimonials";

// ── Assets ────────────────────────────────────────────────────────────────────
const A = {
  heroBg: "/assets/home-hero-bg.png",
  modelL: "/assets/home-hero-model-left.png",
  modelC: "/assets/home-hero-model-center.png",
  modelR: "/assets/home-hero-model-right.png",
  arrowUp: "/assets/arrow-left.png",
  arrowDn: "/assets/arrow-right.png",
  star: "/assets/home-tagline-star.svg",
  dropBg: "/assets/home-drop-bg.png",
  dropCrewCircle: "/assets/drop-crew-circle.png",
  aboutImg: "/assets/home-about-photo.jpg",
  craft1: "/assets/craft-card1.jpg",
  craft2: "/assets/craft-card2.jpg",
  craft3: "/assets/craft-card3.jpg",
  craft4: "/assets/craft-card4.jpg",
  statsCardBg: "/assets/stats-card-bg.svg",
  cl1: "/assets/home-client-logo-1.png",
  cl2: "/assets/home-client-logo-2.png",
  cl3: "/assets/home-client-logo-3.png",
  cl4: "/assets/home-client-logo-4.png",
  cl5: "/assets/home-client-logo-5.png",
  cl6: "/assets/home-client-logo-6.png",
  cl7: "/assets/home-client-logo-7.png",
  cl8: "/assets/home-client-logo-8.png",
  cl9: "/assets/home-client-logo-9.png",
  cl10: "/assets/home-client-logo-10.png",
  cl11: "/assets/home-client-logo-11.png",
  qArt: "/assets/home-quotes-art.png",
  ctaBg: "/assets/home-cta-bg.png",
  ctaIcon: "/assets/cta-contact-icon.png",
  // Stats "counter group" (Figma node 160:263)
  statsHandPhone: "/assets/stats-hand-phone.png",
  statsBadgeCorporate: "/assets/stats-badge-corporate-partners.svg",
  statsBadgeCollege: "/assets/stats-badge-college-campuses.svg",
  statsBadgeTshirt: "/assets/stats-badge-tshirt.svg",
  statsBadgeCustomers: "/assets/stats-badge-customers.svg",
  // Quotes "Group 35" (Figma node 182:356)
  quotesGlow: "/assets/quotes-glow.svg",
  quotesHandCutout: "/assets/quotes-hand-cutout.png",
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
// Forwards any extra props (onClick, ref, aria-*, ...) onto the actual DOM
// node — required so this can be used as a Base UI DialogTrigger `render`
// target; without it, the props Base UI merges in (like onClick) would be
// silently dropped and clicking the button would do nothing.
function BlueOutlineBtn({
  children,
  className,
  ...props
}: React.ComponentProps<typeof m.span> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.span
      className="inline-block"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring" as const, stiffness: 350, damping: 20 }}
      {...props}
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
          <QuoteDialog trigger={<BlueOutlineBtn>Get My Quote</BlueOutlineBtn>} />
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
        <div className="absolute inset-x-0 top-[-10%] h-[150%]">
          <Image src={A.dropBg} alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70" />
      </div>
      <div className="relative z-10 max-w-360 mx-auto w-full flex flex-col items-center justify-center gap-8 sm:gap-10 px-6 py-24 sm:py-32 min-h-[inherit]">
        <m.h2
          className="text-white text-3xl sm:text-5xl lg:text-[64px] text-center uppercase leading-relaxed max-w-3xl"
          style={{ fontFamily: "var(--font-higher-jump)" }}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span style={{ fontFamily: "var(--font-rock-salt)" }}>
            Design your drop.
          </span>
          <br />
          Ban apna{" "}
          <span className="relative inline-block whitespace-nowrap">
            crew.
            {/* Hand-drawn circle clipart (Figma node 64:77), scaled up around
                the word rather than Figma's fixed pixel crop, so it still
                lines up regardless of how the responsive text reflows. */}
            <img
              src={A.dropCrewCircle}
              alt=""
              aria-hidden
              className="pointer-events-none select-none absolute left-1/2 top-1/2 w-[190%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-10"
            />
          </span>
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
              className="relative hidden lg:block w-[42%] shrink-0 rounded-[27px] overflow-hidden self-stretch"
              {...slideFrom(-60, 0.15)}
            >
              <Image
                src={A.aboutImg}
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover min-h-100"
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
      {/* Dark overlay — permanent, only the text below swaps on hover */}
      <div className="absolute inset-0 bg-black/60" />
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
const STATS = [
  {
    steps: [1, 10, 20, 30, 40, 55, 65, 70, 80, 90, 99, 100],
    suffix: "+",
    label: "Corporate Partners",
  },
  {
    steps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    suffix: "k+",
    label: "T-Shirt",
  },
  {
    steps: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    suffix: "+",
    label: "College Campuses",
  },
  {
    steps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    suffix: "k+",
    label: "Customers",
  },
];

// Per-badge position/rotation/size, transcribed from Figma node 160:263
// ("counter group", a 993.521×923 frame). Insets are % of that frame, so the
// composition stays pixel-accurate at any scale as long as aspect is kept.
const BADGE_LAYOUT = [
  {
    // Corporate Partners
    bg: A.statsBadgeCorporate,
    bgOuter: "0 29.94% 84.13% 56.34%",
    bgInner: "11.88% 2.29% 4.04% 6.48%",
    numberOuter: "5.42% 30.84% 86.68% 58.28%",
    numberRotate: 17,
    numberH: "hypot(-12.4387cqw,60.3142cqh)",
    numberW: "hypot(87.5613cqw,39.6858cqh)",
    suffixOuter: "5.46% 30.06% 87.17% 65.23%",
    suffixRotate: 17,
    suffixH: "hypot(-38.7196cqw,87.113cqh)",
    suffixW: "hypot(61.2804cqw,12.887cqh)",
    labelOuter: "9.67% 31.54% 85.31% 57.79%",
    labelRotate: 17,
    labelH: "hypot(-4.41123cqw,33.0528cqh)",
    labelW: "hypot(95.5888cqw,66.9472cqh)",
    labelSize: 12,
  },
  {
    // T-Shirt
    bg: A.statsBadgeTshirt,
    bgOuter: "16.36% 20.66% 68.09% 67.01%",
    bgInner: "5.49% 3.51% 6.25% 0.65%",
    numberOuter: "21.34% 22.39% 73.42% 67.54%",
    numberRotate: -1.33,
    numberH: "hypot(1.06894cqw,95.2339cqh)",
    numberW: "hypot(98.9311cqw,-4.76613cqh)",
    suffixOuter: "18.79% 21.26% 74.21% 72.8%",
    suffixRotate: -2.83,
    suffixH: "hypot(5.18733cqw,95.7273cqh)",
    suffixW: "hypot(94.8127cqw,-4.27273cqh)",
    labelOuter: "25.56% 24.85% 72.31% 70.26%",
    labelRotate: -2.08,
    labelH: "hypot(1.34283cqw,91.1752cqh)",
    labelW: "hypot(98.6572cqw,-8.82484cqh)",
    labelSize: 14,
  },
  {
    // College Campuses
    bg: A.statsBadgeCollege,
    bgOuter: "18.31% 40.23% 67.39% 44.17%",
    bgInner: "8.77% 4.29% 2.44% 7.27%",
    numberOuter: "23.07% 41.7% 69.88% 47.6%",
    numberRotate: 11.7,
    numberH: "hypot(-8.77774cqw,69.1709cqh)",
    numberW: "hypot(91.2223cqw,30.8291cqh)",
    suffixOuter: "22.39% 41.78% 70.38% 53.99%",
    suffixRotate: 11.7,
    suffixH: "hypot(-29.9713cqw,90.8922cqh)",
    suffixW: "hypot(70.0287cqw,9.10784cqh)",
    labelOuter: "27.01% 43.36% 69.07% 46.36%",
    labelRotate: 11.7,
    labelH: "hypot(-3.17734cqw,43.3342cqh)",
    labelW: "hypot(96.8227cqw,56.6658cqh)",
    labelSize: 12,
  },
  {
    // Customers
    bg: A.statsBadgeCustomers,
    bgOuter: "37.05% 33.49% 44.96% 52.92%",
    bgInner: "0.49% 4.91% 13.58% 2%",
    numberOuter: "39.01% 35.61% 53.74% 53.65%",
    numberRotate: 12.91,
    numberH: "hypot(-9.62722cqw,66.9603cqh)",
    numberW: "hypot(90.3728cqw,33.0397cqh)",
    suffixOuter: "37.92% 34.31% 54.29% 58.93%",
    suffixRotate: 11.42,
    suffixH: "hypot(-18.2712cqw,84.575cqh)",
    suffixW: "hypot(81.7288cqw,15.425cqh)",
    labelOuter: "43.55% 37.67% 52.43% 55.16%",
    labelRotate: 16.71,
    labelH: "hypot(-7.26251cqw,46.4952cqh)",
    labelW: "hypot(92.7375cqw,53.5048cqh)",
    labelSize: 14,
  },
];

// Rolling digit stack: reveals `steps` one at a time, settling on the last
// value once its rotated bounding box scrolls into view.
// Base sizes below are tuned for the 993.521px-wide reference frame from
// Figma; `scale` (rendered width ÷ 993.521, measured live) keeps text
// proportional to the badge shapes at any viewport size, mobile included.
function RollingNumberGroup({
  steps,
  inView,
  delay = 0,
  scale,
}: {
  steps: number[];
  inView: boolean;
  delay?: number;
  scale: number;
}) {
  const slotRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!inView || !slotRef.current) return;
    const lineH =
      (slotRef.current.children[0] as HTMLElement)?.offsetHeight ?? 43 * scale;
    animate(y, -(steps.length - 1) * lineH, {
      duration: 1.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
    });
  }, [inView, steps.length, y, delay, scale]);

  return (
    <div className="overflow-clip relative size-full">
      <m.div
        ref={slotRef}
        className="absolute leading-[0] not-italic text-white font-bold"
        style={{
          fontFamily: "var(--font-k2d)",
          fontSize: 36 * scale,
          left: 7 * scale,
          top: -11 * scale,
          width: 87 * scale,
          y,
        }}
      >
        {steps.map((n, i) => (
          <p key={i} className="leading-[normal] mb-0">
            {String(n).padStart(2, "0")}
          </p>
        ))}
      </m.div>
    </div>
  );
}

function CounterBadge({
  stat,
  layout,
  inView,
  delay,
  scale,
}: {
  stat: (typeof STATS)[number];
  layout: (typeof BADGE_LAYOUT)[number];
  inView: boolean;
  delay: number;
  scale: number;
}) {
  return (
    <>
      <div className="absolute" style={{ inset: layout.bgOuter }}>
        <div className="absolute" style={{ inset: layout.bgInner }}>
          <img alt="" className="block max-w-none size-full" src={layout.bg} />
        </div>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{ inset: layout.numberOuter, containerType: "size" }}
      >
        <div
          className="flex-none"
          style={{
            height: layout.numberH,
            width: layout.numberW,
            transform: `rotate(${layout.numberRotate}deg)`,
          }}
        >
          <RollingNumberGroup
            steps={stat.steps}
            inView={inView}
            delay={delay}
            scale={scale}
          />
        </div>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{ inset: layout.suffixOuter, containerType: "size" }}
      >
        <div
          className="flex-none"
          style={{
            height: layout.suffixH,
            width: layout.suffixW,
            transform: `rotate(${layout.suffixRotate}deg)`,
          }}
        >
          <p
            className="leading-[normal] not-italic text-white whitespace-nowrap font-normal"
            style={{ fontFamily: "var(--font-k2d)", fontSize: 48 * scale }}
          >
            {stat.suffix}
          </p>
        </div>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{ inset: layout.labelOuter, containerType: "size" }}
      >
        <div
          className="flex-none"
          style={{
            height: layout.labelH,
            width: layout.labelW,
            transform: `rotate(${layout.labelRotate}deg)`,
          }}
        >
          <p
            className="leading-[normal] not-italic text-white whitespace-nowrap font-bold"
            style={{
              fontFamily: "var(--font-k2d)",
              fontSize: layout.labelSize * scale,
            }}
          >
            {stat.label}
          </p>
        </div>
      </div>
    </>
  );
}

// Faithful port of Figma's "counter group" (node 160:263): a hand holding a
// phone with the four stat badges floating around it. Renders at any size —
// used both in the desktop absolute layout and inline on mobile/tablet.
function StatsCounterGroup({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 993.521);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{ aspectRatio: "993.521 / 923" }}
    >
      <div
        className="absolute inset-x-0 top-0"
        style={{ aspectRatio: "993.521 / 901.003" }}
      >
        <Image
          src={A.statsHandPhone}
          alt=""
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 45vw, 90vw"
        />
      </div>
      {STATS.map((stat, i) => (
        <CounterBadge
          key={stat.label}
          stat={stat}
          layout={BADGE_LAYOUT[i]}
          inView={inView}
          delay={i * 0.12}
          scale={scale}
        />
      ))}
    </div>
  );
}

function StatsSection() {
  return (
    <section className="relative bg-black w-full overflow-hidden min-h-125 lg:min-h-231.5">
      {/* Tilted card SVG background (Figma: Frame 28, opacity 0.2 gradient) */}
      <div
        aria-hidden
        className="absolute -left-2.5 top-0 lg:top-12.25 w-[calc(100%+10px)] h-full lg:h-219.25 pointer-events-none select-none"
      >
        <Image
          src={A.statsCardBg}
          alt=""
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      {/* Right composition: hand + phone + floating stat badges */}
      <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none hidden lg:flex items-center justify-end">
        <StatsCounterGroup className="w-full max-w-[993.521px]" />
      </div>
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
          <QuoteDialog
            trigger={
              <BlueOutlineBtn className="self-start mt-4">
                Get My Quote
              </BlueOutlineBtn>
            }
          />
        </m.div>
        {/* Composition, inline: mobile/tablet only (desktop renders it absolutely, above) */}
        <m.div
          className="w-full flex justify-center lg:hidden"
          {...fadeUp(0.2)}
        >
          <StatsCounterGroup className="w-full max-w-100 sm:max-w-125" />
        </m.div>
        {/* Right: spacer to reserve layout space for the absolutely-positioned composition */}
        <div className="hidden lg:block lg:w-1/2" aria-hidden />
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
// Faithful port of Figma's "Group 35" (node 182:356): a neon Instagram-post
// mockup with a hand pulling a t-shirt out of it, an accent hand cutout, a
// soft light streak, and a fade-to-black vignette. Insets are % of that
// group's own 1070.198×947 bounding box, so it scales at any size.
function QuotesComposition({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative", className)}
      style={{ aspectRatio: "1070.198 / 947" }}
    >
      {/* Blurred light streak (Figma "Ellipse 11") */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "65.706%",
          top: "73.07%",
          width: "34.293%",
          height: "14.786%",
        }}
      >
        <img
          alt=""
          aria-hidden
          className="block max-w-none"
          style={{
            width: "102.84%",
            height: "18.141%",
            transform: "rotate(17.87deg)",
          }}
          src={A.quotesGlow}
        />
      </div>
      {/* Neon Instagram post with a hand pulling a t-shirt out of it */}
      <div
        className="absolute"
        style={{ left: "35.508%", top: "0%", width: "62.603%", height: "100%" }}
      >
        <Image
          src={A.qArt}
          alt=""
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 40vw, 85vw"
        />
      </div>
      {/* Accent hand cutout, echoing the artwork's own hand for depth */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "5.7%",
          top: "6.442%",
          width: "80.943%",
          height: "89.796%",
        }}
      >
        <img
          alt=""
          aria-hidden
          className="block max-w-none"
          style={{
            width: "78.156%",
            height: "63.617%",
            transform: "rotate(-40.26deg)",
          }}
          src={A.quotesHandCutout}
        />
      </div>
      {/* Fade-to-black vignette, blends the artwork into the text column */}
      <div
        className="absolute"
        style={{
          left: 0,
          top: "41.817%",
          width: "45.225%",
          height: "38.226%",
          backgroundImage:
            "linear-gradient(49.318deg, #000 47.725%, transparent 79.224%)",
        }}
      />
    </div>
  );
}

function QuotesSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-125 lg:min-h-204.75">
      {/* Decorative imagery: desktop. Figma's composition group (node 182:356)
          sits at left 19.24% / width 74.32% of the 1440px section — not
          flush against the right edge as a plain right-half column, so this
          positions it with those exact percentages instead. */}
      <m.div
        className="absolute inset-y-0 pointer-events-none hidden lg:flex items-center"
        style={{ left: "29.24%", width: "74.32%" }}
        {...slideFrom(60)}
      >
        <QuotesComposition className="w-full max-w-[1070.198px]" />
      </m.div>

      {/* Content */}
      <div className="relative z-10 max-w-360 mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-20 min-h-[inherit] flex flex-col gap-10">
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
        {/* Decorative imagery: mobile/tablet, inline below the text */}
        <m.div
          className="w-full flex justify-center lg:hidden"
          {...fadeUp(0.2)}
        >
          <QuotesComposition className="w-full max-w-100 sm:max-w-125" />
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
        <Image src={A.ctaBg} alt="" fill className="object-cover" />
      </div>

      {/* Circle icon (Figma "Contact Us", node 215:857) — left 77.71% / top
          37.38% / width 15.14% of the 1440×420 section. The source export
          rendered blank (a Figma image-fill export quirk), so this was pulled
          via get_screenshot instead and circle-masked locally to strip the
          solid black backdrop the screenshot captured around it. */}
      <m.img
        src={A.ctaIcon}
        alt=""
        className="hidden sm:block absolute aspect-square pointer-events-none"
        style={{ left: "77.71%", top: "20.38%", width: "15.14%" }}
        {...slideFrom(50, 0.15)}
      />

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
