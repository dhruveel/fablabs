"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const imgs = {
  r32: "/assets/our-story-timeline-sewing-machine.jpg",
  r33: "/assets/our-story-timeline-handshake.jpg",
  r34: "/assets/our-story-timeline-embroidery.jpg",
  r35: "/assets/our-story-timeline-rack-scene.jpg",
  r36: "/assets/our-story-timeline-tape-measure.jpg",
  logo: "/assets/logo.png",
  badgeRings: "/assets/timeline-badge-rings.png",
};

// Left-to-right order and aspect ratios follow Figma's cascading collage
// (node 191:606): tall, wide, tall, wide, tall.
const photos = [
  { src: imgs.r36, wide: false, speed: 30 },
  { src: imgs.r32, wide: true, speed: 60 },
  { src: imgs.r33, wide: false, speed: 20 },
  { src: imgs.r34, wide: true, speed: 70 },
  { src: imgs.r35, wide: false, speed: 45 },
];

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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const staggerPhoto = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Photo that slides vertically as the page scrolls past it — `speed` (px) sets
// how far it travels, so each of the 5 collage photos drifts at its own pace.
// Scaled up slightly so the parallax shift never reveals empty space at the edges.
function ParallaxImage({ src, speed }: { src: string; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <m.div ref={ref} className="absolute inset-0" style={{ y }}>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover scale-110"
        sizes="(max-width: 640px) 20vw, 260px"
      />
    </m.div>
  );
}

// Circular FabLabs badge (Figma "Ellipse 12" + "Untitled_Artwork 22 1" +
// "Artboard 1 1"): a black disc with a hand-drawn blue ring bleeding past its
// edge and the wordmark centered on top.
function LogoBadge({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-[-15%]">
        <Image
          src={imgs.badgeRings}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 166px, (min-width: 640px) 125px, 62px"
          className="object-contain pointer-events-none"
        />
      </div>
      <div className="absolute inset-0 rounded-full bg-black" />
      <div className="absolute inset-0 flex items-center justify-center p-[26%]">
        <Image
          src={imgs.logo}
          alt=""
          aria-hidden
          width={175}
          height={57}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export function TimelineSection() {
  return (
    <section className="bg-black w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-300 mx-auto">
        {/* Photo collage — staggered heights bleeding into the card below, matching Figma's cascade.
            Positioned + z-20 so it renders in front of the card it overlaps, not behind it.
            The overlap is kept shallow so a slight gap remains above the "Who We Are" heading. */}
        <m.div
          className="relative z-20 flex items-end gap-2 sm:gap-3 px-2 -mb-4 sm:-mb-6 lg:-mb-8"
          variants={staggerGrid}
          initial="hidden"
          whileInView="show"
          viewport={VP}
        >
          {photos.map((photo, i) => (
            <m.div
              key={i}
              variants={staggerPhoto}
              className={cn(
                "relative rounded-[12px] overflow-hidden flex-1 min-w-0",
                photo.wide
                  ? "-translate-y-2 sm:-translate-y-3 lg:-translate-y-5"
                  : "translate-y-1 sm:translate-y-2 lg:translate-y-3",
              )}
              style={{ aspectRatio: photo.wide ? "16/11" : "4/5" }}
            >
              <ParallaxImage src={photo.src} speed={photo.speed} />
            </m.div>
          ))}
        </m.div>

        {/* Dark gradient card, with the logo badge anchored to its bottom edge */}
        <div className="relative">
          <m.div
            className="relative z-0 rounded-[40px] px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 pb-24 sm:pb-28 lg:pb-32 text-center"
            style={{ background: "linear-gradient(to bottom, #201e1e, #0d0d0d)" }}
            {...fadeUp()}
          >
            <h2
              className="text-white font-bold text-4xl sm:text-5xl mb-8"
              style={{ fontFamily: "var(--font-k2d)" }}
            >
              Who We Are
            </h2>
            <div
              className="text-white text-sm sm:text-base leading-relaxed space-y-4 max-w-191.75 mx-auto"
              style={{ fontFamily: "var(--font-k2d)" }}
            >
              <p>
                At FabLabs, we don&apos;t just make clothing, we create
                merchandise that truly connects with you. From a hoodie for
                your college squad to a T-shirt for your startup team, we
                believe every piece of apparel should tell a story, your
                story.
              </p>
              <p>
                Born in the textile capital of Tiruppur, FabLabs was founded
                in 2012 when our founder, Vimal N., asked a simple question:
                &lsquo;Why should merchandise feel boring and generic?&rsquo;
                Since then, we&apos;ve been on a mission to change the way
                merch is created.
              </p>
              <p>
                Today, with over 10 years of experience and 30% year-on-year
                growth, FabLabs is trusted by students, startups, and brands
                alike. Every step—stitching, printing, and finishing, is done
                in-house, ensuring that what you imagine is exactly what you
                receive.
              </p>
            </div>
          </m.div>

          {/* Logo badge (Figma node 191:618-621) and quote pill (191:610-611), side by
              side and straddling the card's bottom edge — matching Figma, where the
              blue pill starts right after the badge instead of sitting beneath it.
              On mobile the card is proportionally much shorter (text wraps to more
              lines), so the straddle overlap would cover the "Who We Are" copy —
              flow normally after the card there instead, stacked with the badge
              above the pill, and only switch to the side-by-side overlap from sm up. */}
          <div className="relative sm:absolute z-30 mt-6 sm:mt-0 sm:inset-x-10 lg:inset-x-20 sm:bottom-0 sm:translate-y-1/3 flex flex-col items-center sm:flex-row sm:items-end gap-4 sm:gap-6">
            <LogoBadge className="shrink-0 w-12 h-12 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />
            <m.div
              className="flex-1 rounded-[17px] px-8 py-6 text-white text-center text-sm sm:text-base font-bold"
              style={{
                fontFamily: "var(--font-k2d)",
                background: "linear-gradient(100deg, #0a64bc 5.67%, #4f9ce7 99.53%)",
              }}
              {...fadeUp(0.2)}
            >
              From one small idea in 2012, we&apos;ve grown into a factory that
              produces 20,000+ merch pieces every month. But no matter how much we
              scale, ek cheez constant hai — our personal connect. Unlike a regular
              company, we talk to you directly, like dost. Because merch is not
              just clothing — it&apos;s identity.
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
