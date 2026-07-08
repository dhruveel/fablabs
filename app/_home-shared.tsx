"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Assets ────────────────────────────────────────────────────────────────────
export const A = {
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
export const VP = { once: true, margin: "-80px" };

// Returns motion props to spread onto a motion.* element
export function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 44 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  };
}

export function slideFrom(x: number, delay = 0) {
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: VP,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  };
}

// Stagger container + children variants
export const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
export const staggerUp = {
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
export function BlueOutlineBtn({
  children,
  className,
  render,
  nativeButton,
  ...props
}: React.ComponentProps<typeof m.span> & {
  children: React.ReactNode;
  className?: string;
  render?: React.ComponentProps<typeof Button>["render"];
  nativeButton?: React.ComponentProps<typeof Button>["nativeButton"];
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
        render={render}
        nativeButton={nativeButton}
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
