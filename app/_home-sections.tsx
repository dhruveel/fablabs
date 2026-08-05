"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { A } from "./_home-shared";

// Everything below the Hero lives in its own module and is code-split here —
// still server-rendered (dynamic() defaults to ssr: true, so content/SEO are
// unaffected), but its client JS loads in a separate chunk instead of
// blocking the Hero's own hydration. See _home-sections-below-fold.tsx.
const BelowFoldSections = dynamic(() =>
  import("./_home-sections-below-fold").then((mod) => mod.BelowFoldSections),
);

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
            preload
            fetchPriority="high"
          />
        </m.div>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between px-4 sm:px-8 min-h-[inherit]">
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
              loading="eager"
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
              loading="eager"
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
              loading="eager"
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────
export function HomeSections() {
  return (
    <div className="bg-black">
      <HeroSection />
      <BelowFoldSections />
    </div>
  );
}
