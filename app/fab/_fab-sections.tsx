"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ── Assets ────────────────────────────────────────────────────────────────────
const A = {
  heroBg: "/assets/fab-hero-bg.jpg",
  cotton: "/assets/abd20ae6-0a91-4bb1-b32e-e4a3c82003d7.png",
  slub: "/assets/e9d2c02f-12af-418b-b925-83276a5378b5.png",
  dryFit: "/assets/a54a3171-687d-40fe-aa32-6267ee7d7493.jpg",
  pique: "/assets/608da7fc-c32a-4a96-aa27-e72aeec26fcb.jpg",
  loopKnit: "/assets/da050ca5-adba-4ad7-8c1b-7a362b24c1d0.jpg",
  derby: "/assets/682975cf-d505-46bc-a165-9b7c7bd3e4c7.png",
  lycra: "/assets/0a54d5d6-4cc6-4ac4-9dd8-b7fae3002701.png",
  melange: "/assets/d41fd111-382c-4322-a92b-c9cb52bca71f.png",
  propsBg: "/assets/ea222154-5fd9-41ea-9a66-a9c1dcba2279.jpg",
  iconDurabil: "/assets/fa14b391-9e95-4374-bd16-e3b4ddf3df5f.png",
  iconSkin: "/assets/d6fdfa87-b36c-48a3-93c4-ad16e19e74ac.png",
  iconCustom: "/assets/2cdb31a3-96c4-4782-a420-5236799a7180.png",
  iconSustain: "/assets/fa14b391-9e95-4374-bd16-e3b4ddf3df5f.png",
};

// ── Data ─────────────────────────────────────────────────────────────────────
const FABRICS: Array<{ label: string; img: string; href?: string; description: string }> = [
  {
    label: "Cotton",
    description:
      "Soft, breathable, and natural—cotton is the ultimate choice for comfort and versatility. Perfect for casual wear and everyday essentials, it’s skin-friendly and durable.",
    img: A.cotton,
  },
  {
    label: "Slub Cotton",
    description:
      "With its irregular texture and rich feel, slub cotton adds a trendy, modern twist to your casual and premium collections.",
    img: A.slub,

    href: "https://fablabs.in/fab/",
  },
  {
    label: "Dry Fit",
    description:
      "Designed for active lifestyles, dry-fit fabric wicks away moisture, keeping you cool and comfortable during workouts, sports, or outdoor activities.",
    img: A.dryFit,
  },
  {
    label: "Pique",
    description:
      "Classic and elegant, pique fabric features a textured finish, making it a favorite for polos and formal yet comfortable wear.",
    img: A.pique,
  },
  {
    label: "Loop Knit",
    description:
      "Known for its unique texture and stretch, loop knit fabric offers a cozy yet durable option, ideal for hoodies, sweatshirts, and loungewear.",
    img: A.loopKnit,
  },
  {
    label: "Derby",
    description:
      "Durable and stylish, Derby fabric combines a subtle sheen with a robust structure, perfect for creating standout apparel that lasts.h",
    img: A.derby,
  },
  {
    label: "Lycra",
    description:
      "Stretchable and resilient, Lycra is perfect for form-fitting designs. It moves with you, making it a great choice for activewear and stylish outfits.",
    img: A.lycra,
  },
  {
    label: "Color Melange",
    description:
      "Unique blends of tones create a beautiful, heathered look. Colour melange fabric is both stylish and versatile, ideal for modern, trendy designs.",
    img: A.melange,
  },
];

const PROPERTIES = [
  {
    name: "Durability",
    desc: "Built to last, even after countless washes.",
    icon: A.iconDurabil,
    stagger: "lg:mt-0",
  },
  {
    name: "Skin Friendly",
    desc: "Hypoallergenic and breathable for all-day wear.",
    icon: A.iconSkin,
    stagger: "lg:mt-10",
  },
  {
    name: "Customization",
    desc: "Perfect for printing, embroidery, and bold designs.",
    icon: A.iconCustom,
    stagger: "lg:mt-20",
  },
  {
    name: "Sustainably Sourced",
    desc: "Supporting a better future through responsible sourcing.",
    icon: A.iconSustain,
    stagger: "lg:mt-32",
  },
];

// ── Animation helpers ─────────────────────────────────────────────────────────
const VP = { once: true, margin: "-80px" };

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  };
}

const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const staggerUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
};

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-75 sm:min-h-100 lg:min-h-142.25 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none select-none">
        <img src={A.heroBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16">
        <m.h1
          className="font-bold leading-normal text-[#f6f6f6] whitespace-nowrap"
          style={{
            fontFamily: "var(--font-k2d)",
            fontSize: "clamp(48px, 13.9vw, 200px)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Threads
        </m.h1>
        <m.p
          className="font-bold leading-normal text-[#f6f6f6] text-center whitespace-nowrap"
          style={{
            fontFamily: "var(--font-k2d)",
            fontSize: "clamp(18px, 6.25vw, 90px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
        >
          That speaks Your Style
        </m.p>
      </div>
    </section>
  );
}

// ── Fabric Card ───────────────────────────────────────────────────────────────
function FabricCard({ label, img, href, description }: { label: string; img: string; href?: string; description: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <m.div
      variants={staggerUp}
      className="relative overflow-hidden rounded-[33px] flex items-center justify-center"
      style={{ aspectRatio: '320 / 356' }}
      whileHover={{ scale: 1.04, y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 22 }}
    >
      <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      {/* Base overlay */}
      <div className="absolute inset-0 bg-white/20" />
      {/* Dark overlay fades in on hover for readability */}
      <m.div
        className="absolute inset-0 bg-black/60"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {/* Label — fades out on hover */}
      <m.p
        className="absolute z-10 font-black text-black text-center leading-tight px-3"
        style={{ fontFamily: 'var(--font-k2d)', fontSize: 'clamp(18px, 3.5vw, 52px)' }}
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -10 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </m.p>
      {/* Description — fades in on hover */}
      <m.p
        className="absolute z-10 text-white font-extrabold text-center max-w-[80%]"
        style={{ fontFamily: 'var(--font-k2d)', fontSize: '16px', fontStyle: 'normal', lineHeight: '100%' }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        {description}
      </m.p>
      {/* Transparent link overlay for clickable cards */}
      {href && <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" />}
    </m.div>
  )
}

// ── Fabrics Section ───────────────────────────────────────────────────────────
function FabricsSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <m.div
        className="w-full max-w-300 mx-auto rounded-[25px] px-8 sm:px-14 py-10 sm:py-14 mb-12 sm:mb-16"
        style={{
          background: "linear-gradient(180deg, #517388 0%, #1f0e6d 100%)",
        }}
        {...fadeUp()}
      >
        <p
          className="text-white text-center text-sm sm:text-base lg:text-[16px] leading-relaxed"
          style={{ fontFamily: "var(--font-k2d)", fontWeight: 500 }}
        >
          Every Great Design Starts with the Right Fabric. At Fablabs, we know
          that the foundation of exceptional apparel lies in the fabric. Whether
          you&apos;re creating vibrant t-shirts, cozy sweatshirts, or
          professional polos, we provide the perfect canvas to bring your ideas
          to life. Explore our diverse range of fabrics, each selected for its
          quality, durability, and ability to showcase your designs flawlessly.
        </p>
      </m.div>

      <m.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 max-w-300 mx-auto"
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        {FABRICS.map((f) => (
          <FabricCard key={f.label} {...f} />
        ))}
      </m.div>
    </section>
  );
}

// ── Properties Section ────────────────────────────────────────────────────────
function PropertiesSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <div className="absolute inset-0 pointer-events-none select-none">
        <img
          src={A.propsBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.27 }}
        />
      </div>

      <div className="relative z-10 max-w-300 mx-auto">
        <m.h2
          className="text-white font-bold text-center text-2xl sm:text-4xl lg:text-[48px] mb-12 sm:mb-16"
          style={{ fontFamily: "var(--font-k2d)" }}
          {...fadeUp()}
        >
          How We Choose Our Fabrics?
        </m.h2>

        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start"
          variants={staggerGrid}
          initial="hidden"
          whileInView="show"
          viewport={VP}
        >
          {PROPERTIES.map((p) => (
            <m.div
              key={p.name}
              variants={popIn}
              className={cn("flex flex-col gap-0", p.stagger)}
            >
              <Card className="bg-[#222] rounded-[19px] border-0 ring-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-visible">
                <CardContent className="p-0 flex flex-col">
                  <div className="bg-[#444] rounded-[19px] m-3.5 mb-0 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={p.icon}
                      alt=""
                      className="size-full max-h-38.5 object-contain"
                    />
                  </div>
                  <div className="px-4 py-5 text-center flex flex-col gap-2">
                    <p
                      className="text-white font-bold text-xl leading-tight"
                      style={{ fontFamily: "var(--font-k2d)" }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="text-white/80 text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-k2d)" }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────
export function FabSections() {
  return (
    <div className="bg-black">
      <HeroSection />
      <FabricsSection />
      <PropertiesSection />
    </div>
  );
}
