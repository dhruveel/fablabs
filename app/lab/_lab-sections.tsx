"use client";

import { useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteDialog } from "@/components/layout/quote-dialog";

// ── Assets ────────────────────────────────────────────────────────────────────
const A = {
  heroBg: "/assets/lab-hero-bg.jpg",
  scarlet: "/assets/lab-color-scarlet-red.jpg",
  coral: "/assets/lab-color-coral-pink.png",
  lavender: "/assets/lab-color-lavender.png",
  charcoal: "/assets/lab-color-charcoal-grey.png",
};

// ── Data ─────────────────────────────────────────────────────────────────────
const TECHNIQUES = [
  {
    label: "Screen Printing",
    description:
      "Durability. Boldness. Tradition. Make a lasting impression with bold designs built to last. Screen printing is more than just a technique, it is craftsmanship, a timeless art form. For those who want their statement to stand the test of time, this is the perfect choice. Whether you’re a bold artist or part of a larger movement, screen printing ensures your design remains vibrant and impactful. Every print tells a story, one that retains its color, strength, and impact for years to come.",

    ghost: "Screen Printing",
    color: "#BC0A69",
    ghostSize: "clamp(55px, 8.9vw, 128px)",
  },
  {
    label: "DTG\n(Direct-to Garment)",
    description:
      "Precision. Detail. Innovation. Direct-to-Garment printing brings your digital designs to life with photo-quality detail and unlimited colors. Perfect for small runs and complex artwork, DTG delivers soft, breathable prints that feel like part of the fabric — ideal for intricate gradients, photography, and full-color artwork produced on demand.",
    ghost: "DTG",
    color: "#B9BC0A",
    ghostSize: "clamp(80px, 20.8vw, 300px)",
  },
  {
    label: "Thermal Printing",
    description:
      "Heat. Transfer. Perfection. Thermal printing fuses vibrant designs directly onto your garment using heat and pressure. Ideal for smooth, high-resolution finishes, this technique produces consistent results perfect for names, numbers, and photographic prints that demand precision and lasting durability.",
    ghost: "Thermal Printing",
    color: "#0A64BC",
    ghostSize: "clamp(55px, 8.9vw, 128px)",
  },
  {
    label: "Embroidery",
    description:
      "Thread. Texture. Luxury. Elevate your brand with the timeless elegance of embroidery. Each stitch is a mark of quality, creating raised, textured designs that command attention. Perfect for logos, crests, and monograms, embroidery adds a premium feel that no other printing technique can match.",
    ghost: "Embroidery",
    color: "#E3BE2A",
    ghostSize: "clamp(50px, 8.3vw, 120px)",
  },
];

const COLORS = [
  {
    name: "Scarlet Red",
    hex: "#DD282B",
    img: A.scarlet,
    represents: "Passion, Courage, Joy",
    tagline: '"Wear Your Fire. Bold Moves Only."',
  },
  {
    name: "Coral Pink",
    hex: "#BC0A69",
    img: A.coral,
    represents: "Warmth, Playfulness, Compassion",
    tagline: '"Spread Kindness. Play with Color."',
  },
  {
    name: "Lavender",
    hex: "#8A38F5",
    img: A.lavender,
    represents: "Tranquility, Compassion, Grace",
    tagline: '"Wear Peace. Be Gentle with Yourself."',
  },
  {
    name: "Charcoal Grey",
    hex: "#9E9E9E",
    img: A.charcoal,
    represents: "Strength, Sophistication, Mystery",
    tagline: '"Power in Silence. Stay Unstoppable."',
  },
];

// ── Animation helpers ─────────────────────────────────────────────────────────
const VP = { once: true, margin: "-80px" };

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 150 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VP,
    transition: { duration: 0.35, ease: "easeOut" as const, delay },
  };
}

const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const staggerUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
const popIn = {
  hidden: { opacity: 0, scale: 0.82 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 270, damping: 22 },
  },
};

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-125 sm:min-h-162.5 lg:h-217.5 flex items-center justify-center">
      {/* Parallelogram-clipped background (Figma node 211:587) */}
      <m.svg
        viewBox="0 0 1393 843"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <defs>
          <clipPath id="labHeroClip">
            <path d="M0 14.003C0 5.47909 7.55299 -1.06655 15.9904 0.145282L1380.99 196.196C1387.88 197.186 1393 203.091 1393 210.054V828.969C1393 837.397 1385.61 843.915 1377.25 842.859L12.2457 670.456C5.24765 669.572 0 663.62 0 656.566V14.003Z" />
          </clipPath>
        </defs>
        <image
          href={A.heroBg}
          x="0"
          y="0"
          width="1393"
          height="843"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#labHeroClip)"
          opacity={0.78}
        />
      </m.svg>

      <div className="relative z-10 px-6 text-center max-w-249.75 mx-auto">
        <m.h1
          className="text-white font-extrabold leading-normal text-3xl sm:text-5xl lg:text-[96px]"
          style={{
            fontFamily: "var(--font-k2d)",
            textShadow: "4px 4px 4px rgba(0,0,0,0.37)",
          }}
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
        >
          Printing Perfection: Crafting Your Vision
        </m.h1>
      </div>
    </section>
  );
}

// ── Techniques Section ────────────────────────────────────────────────────────
function TechCard({
  label,
  ghost,
  color,
  ghostSize,
  description,
}: {
  label: string;
  ghost: string;
  color: string;
  ghostSize: string;
  description?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      variants={staggerUp}
      className="relative overflow-hidden rounded-[15px]"
      style={{ height: "clamp(160px, 19.5vw, 281px)" }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      transition={{ type: "spring" as const, stiffness: 300, damping: 22 }}
    >
      <div
        className="absolute rounded-[15px]"
        style={{ inset: "3.2% 0 2.49% 0", background: color }}
      />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span
          className="font-extrabold leading-none whitespace-nowrap select-none"
          style={{
            fontFamily: "var(--font-k2d)",
            fontSize: ghostSize,
            fontStyle: "normal",
            lineHeight: "100%",
            textAlign: "center",
            color: "transparent",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#000",
          }}
          aria-hidden
        >
          {ghost}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
        <m.p
          className="absolute text-white font-extrabold text-center leading-tight whitespace-pre-line"
          style={{
            fontFamily: "var(--font-k2d)",
            fontSize: "clamp(20px, 4.4vw, 64px)",
          }}
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? -10 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </m.p>
        {description && (
          <m.p
            className="absolute text-white font-extrabold text-center max-w-[90%]"
            style={{
              fontFamily: "var(--font-k2d)",
              fontSize: "16px",
              fontStyle: "normal",
              lineHeight: "100%",
            }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            {description}
          </m.p>
        )}
      </div>
    </m.div>
  );
}

function TechniquesSection() {
  const left = [TECHNIQUES[0], TECHNIQUES[3]]; // Screen Printing, Embroidery
  const right = [TECHNIQUES[1], TECHNIQUES[2]]; // DTG, Thermal Printing

  return (
    <section className="w-full bg-black overflow-hidden py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <m.p
        className="text-white text-center text-base sm:text-lg lg:text-2xl max-w-211.25 mx-auto mb-12 sm:mb-16 leading-relaxed"
        style={{ fontFamily: "var(--font-k2d)" }}
        {...fadeUp()}
      >
        Step into the heart of Fablabs, the Printing Lab, where innovation
        transforms your vision into reality. Here, every t-shirt tells a tale
        crafted through state-of-the-art techniques.
      </m.p>

      {/* Staggered 2-col: right column at top, left column offset down 88px (Figma Variant 2) */}
      <m.div
        className="max-w-300 mx-auto flex flex-col sm:flex-row sm:items-start gap-11 sm:gap-12"
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        <div className="flex flex-col gap-11 sm:flex-1 sm:pt-22">
          {left.map((t) => (
            <TechCard key={t.label} {...t} />
          ))}
        </div>
        <div className="flex flex-col gap-11 sm:flex-1">
          {right.map((t) => (
            <TechCard key={t.label} {...t} />
          ))}
        </div>
      </m.div>
    </section>
  );
}

// ── Color Showcase Section ────────────────────────────────────────────────────
function ColorShowcaseSection() {
  return (
    <section className="w-full bg-black py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <m.h2
        className="text-white text-center font-normal text-2xl sm:text-4xl lg:text-[48px] mb-4"
        style={{ fontFamily: "var(--font-k2d)" }}
        {...fadeUp()}
      >
        Ready to bring your vision to life?
      </m.h2>
      <m.p
        className="text-white text-center font-bold text-base sm:text-xl lg:text-[32px] max-w-252 mx-auto mb-12 sm:mb-16 leading-snug"
        style={{ fontFamily: "var(--font-k2d)" }}
        {...fadeUp(0.15)}
      >
        Get a custom quote today and let&apos;s start building something
        extraordinary — made just for you, by us.
      </m.p>

      <m.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-300 mx-auto"
        variants={staggerGrid}
        initial="hidden"
        whileInView="show"
        viewport={VP}
      >
        {COLORS.map((c) => (
          <m.div key={c.name} variants={popIn}>
            <Card
              className="rounded-[20px] border-0 ring-0 shadow-none overflow-hidden"
              style={{ background: "rgba(68,68,68,0.44)" }}
            >
              <CardContent className="p-0 flex flex-col">
                <div
                  className="relative w-full overflow-hidden rounded-[20px]"
                  style={{ aspectRatio: "616/798" }}
                >
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="px-6 py-5 text-center flex flex-col gap-2">
                  <p
                    className="font-bold text-2xl sm:text-3xl lg:text-[48px] leading-tight"
                    style={{ fontFamily: "var(--font-k2d)", color: c.hex }}
                  >
                    {c.name}
                  </p>
                  <p
                    className="text-white text-sm sm:text-base lg:text-[24px]"
                    style={{ fontFamily: "var(--font-k2d)" }}
                  >
                    Represents: {c.represents}
                  </p>
                  <p
                    className="text-[#0A64BC] italic font-semibold text-sm sm:text-base lg:text-[24px]"
                    style={{ fontFamily: "var(--font-k2d)" }}
                  >
                    Tagline: {c.tagline}
                  </p>
                </div>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </m.div>

      <m.div className="flex justify-center mt-12 sm:mt-16" {...fadeUp(0.25)}>
        <QuoteDialog
          trigger={
            <m.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                className="h-auto rounded-full border-2 border-[#0A64BC] bg-transparent px-8 py-3 text-[#0A64BC] hover:bg-[#0A64BC]/10 hover:text-[#0A64BC] text-base sm:text-xl whitespace-nowrap"
                style={{ fontFamily: "var(--font-jersey10)" }}
              >
                Get My Quote
              </Button>
            </m.div>
          }
        />
      </m.div>
    </section>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────
export function LabSections() {
  return (
    <div className="bg-black">
      <HeroSection />
      <TechniquesSection />
      <ColorShowcaseSection />
    </div>
  );
}
