"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ASSETS = {
  bg: "/assets/testimonials-bg.png",
  avatarKarthik: "/assets/testimonials-avatar-karthik.png",
  avatarShriGuru: "/assets/testimonials-avatar-shri-guru.png",
  avatarAnanya: "/assets/testimonials-avatar-ananya.png",
  avatarShriGuruAlt: "/assets/testimonials-avatar-shri-guru-alt.png",
  avatarAnanyaAlt: "/assets/testimonials-avatar-ananya-alt.png",
  heartSide: "/assets/testimonials-heart-side.svg",
  heartCenter: "/assets/testimonials-heart-center.svg",
  navPrev: "/assets/testimonials-nav-prev.svg",
  navNext: "/assets/testimonials-nav-next.svg",
};

// Geometry copied straight from Figma's bubble exports (node 172:508 for the
// side cards, 171:391 for the center card) — both shapes are identical across
// every card of their size, only the fill color differs per card. Side and
// center cards use two different sizes/tail proportions, hence two shapes.
const BUBBLE_SHAPES = {
  side: {
    viewBox: "0 0 127.93 119.442",
    path: "M5 15C5 9.47714 9.47715 5 15 5H92.93C98.4528 5 102.93 9.47715 102.93 15V71.8293C102.93 77.3521 98.4528 81.8293 92.93 81.8293H78.4475H72.5861C68.6951 81.8293 65.1573 84.0863 63.5175 87.615L63.0336 88.6563C59.4487 96.3706 48.4813 96.3706 44.8964 88.6563L44.4124 87.615C42.7726 84.0863 39.2349 81.8293 35.3438 81.8293H29.4825H15C9.47716 81.8293 5 77.3521 5 71.8293V15Z",
  },
  center: {
    viewBox: "0 0 171.288 160.165",
    path: "M5 15C5 9.47716 9.47715 5 15 5H136.288C141.811 5 146.288 9.47715 146.288 15V101.601C146.288 107.123 141.811 111.601 136.288 111.601H110.966H99.5793C95.7428 111.601 92.2446 113.795 90.5754 117.25L84.648 129.516C81.0083 137.048 70.2799 137.048 66.6402 129.516L60.7129 117.25C59.0437 113.795 55.5454 111.601 51.709 111.601H40.3221H15C9.47715 111.601 5 107.123 5 101.601V15Z",
  },
} as const;

const K2D: CSSProperties = { fontFamily: "var(--font-k2d)" };

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  bg: string;
  heart: string;
  width: number;
  height: number;
  featured?: boolean;
};

// Figma node 172:526 ("Property 1=Default") — Karthik Raj / Shri Guru / Ananya.
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Karthik Raj",
    role: "Cultural Fest Head, SRM University",
    quote:
      '"We didn\'t expect the merchandise to feel this premium. FabLabs turned simple T-shirts into stylish essentials that we now wear every day. Great value for money."',
    avatar: ASSETS.avatarKarthik,
    bg: "#BC0A69",
    heart: ASSETS.heartSide,
    width: 385.319,
    height: 210,
  },
  {
    name: "Shri Guru",
    role: "Cultural Fest Head, SRM University",
    quote:
      '"FabLabs made our college fest T-shirts look amazing! Everyone in our batch loved the design—it truly captured the vibe. The quality was excellent, and the delivery was right on time."',
    avatar: ASSETS.avatarShriGuru,
    bg: "#ffffff",
    heart: ASSETS.heartCenter,
    featured: true,
    width: 555.919,
    height: 280,
  },
  {
    name: "Ananya",
    role: "Cultural Fest Head, SRM University",
    quote:
      "\"We wanted hoodies for our startup team, and FabLabs delivered perfectly. From stitching to printing, everything was clean and professional. Now, in every meeting, people ask us, 'Where did you get these from?'\"",
    avatar: ASSETS.avatarAnanya,
    bg: "#B9BC0A",
    heart: ASSETS.heartSide,
    width: 385.319,
    height: 210,
  },
];

// Figma node 172:604 ("Property 1=Variant2") — same three people, reshuffled:
// Shri Guru moves to the left as a blue side card, Ananya becomes the featured
// center card, and Karthik Raj moves to the right. Same quotes; Shri Guru and
// Ananya get the alternate avatar art Figma uses for this arrangement.
const TESTIMONIALS_2: Testimonial[] = [
  {
    name: "Shri Guru",
    role: "Cultural Fest Head, SRM University",
    quote:
      '"FabLabs made our college fest T-shirts look amazing! Everyone in our batch loved the design—it truly captured the vibe. The quality was excellent, and the delivery was right on time."',
    avatar: ASSETS.avatarShriGuruAlt,
    bg: "#0A64BC",
    heart: ASSETS.heartSide,
    width: 385.319,
    height: 210,
  },
  {
    name: "Ananya",
    role: "Cultural Fest Head, SRM University",
    quote:
      "\"We wanted hoodies for our startup team, and FabLabs delivered perfectly. From stitching to printing, everything was clean and professional. Now, in every meeting, people ask us, 'Where did you get these from?'\"",
    avatar: ASSETS.avatarAnanyaAlt,
    bg: "#ffffff",
    heart: ASSETS.heartCenter,
    featured: true,
    width: 555.919,
    height: 280,
  },
  {
    name: "Karthik Raj",
    role: "Cultural Fest Head, SRM University",
    quote:
      '"We didn\'t expect the merchandise to feel this premium. FabLabs turned simple T-shirts into stylish essentials that we now wear every day. Great value for money."',
    avatar: ASSETS.avatarKarthik,
    bg: "#BC0A69",
    heart: ASSETS.heartSide,
    width: 385.319,
    height: 210,
  },
];

const TESTIMONIAL_SETS = [TESTIMONIALS, TESTIMONIALS_2];

// Inlined (rather than an <img src="*.svg">) so the fill can be driven by the
// card's own bg color via a real SVG attribute, instead of being locked to
// whatever color was baked into a pre-exported raster/SVG asset. The drop
// shadow itself lives on HeartBadge's wrapping div (a plain CSS filter) so it
// covers the heart icon too, not just the bubble — no filter needed here.
function BubbleShape({
  variant,
  color,
}: {
  variant: keyof typeof BUBBLE_SHAPES;
  color: string;
}) {
  const { viewBox, path } = BUBBLE_SHAPES[variant];
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      className="absolute inset-0 size-full overflow-visible"
    >
      <path d={path} fill={color} />
    </svg>
  );
}

// Speech-bubble badge sits at a fixed ratio of its own card's box in Figma
// (node 172:526, e.g. 172:508 "Rectangle 22" for the Karthik Raj card) — left
// 76.6% / width 20%, identical for both the featured and side cards. It's
// anchored flush with `bottom: 100%` (its own bottom edge at the card's top
// edge — robust regardless of the card's actual height, since the card now
// uses minHeight rather than a fixed ratio to its width), then pulled back
// down with `translateY(41.8%)` — a percentage of the badge's OWN height,
// per the CSS transform spec — to reproduce Figma's overlap, where ~42% of
// the bubble's height sits on top of the card rather than floating above it.
// z-20 (above the card's z-0) plus the drop-shadow keep it visually "on" the
// card, matching Figma's shadow on the same bubble layer. Its color is driven
// by the caller (see TestimonialCard) so it updates whenever the active
// testimonial set — and therefore each card's color — changes.
function HeartBadge({
  color,
  featured,
  heart,
}: {
  color: string;
  featured?: boolean;
  heart: string;
}) {
  return (
    <div
      className="absolute z-20 aspect-square"
      style={{
        left: "76.6%",
        bottom: "100%",
        width: "20%",
        transform: "translateY(41.8%)",
        filter: "drop-shadow(10px 10px 15px rgba(0,0,0,0.47))",
      }}
    >
      <BubbleShape variant={featured ? "center" : "side"} color={color} />
      <img
        src={heart}
        alt=""
        className="absolute left-1/2 top-[12%] -translate-x-1/2 w-[44%] h-[44%]"
      />
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative mx-auto"
      style={{ maxWidth: `min(95vw, ${t.width}px)` }}
    >
      {/* The featured card is always white, so its badge keeps Figma's fixed
          blue accent (t.bg would be invisible) — side-card badges match t.bg. */}
      <HeartBadge
        color={t.featured ? "#0A64BC" : t.bg}
        featured={t.featured}
        heart={t.heart}
      />

      <Card
        className={cn(
          "relative z-0 rounded-[32px] border-0 shadow-lg ring-0",
          t.featured ? "shadow-2xl" : "opacity-[0.76]",
        )}
        style={{
          background: t.bg,
          width: t.width,
          minHeight: t.height,
          maxWidth: "100%",
        }}
      >
        <CardContent
          className={cn(
            "flex flex-col h-full gap-4",
            t.featured ? "p-5 sm:p-6" : "p-4",
          )}
        >
          {/* Author */}
          <div className="flex items-start gap-4">
            <Image
              src={t.avatar}
              alt={t.name}
              width={73}
              height={73}
              className={cn(
                "rounded-full object-cover shrink-0",
                t.featured ? "size-18" : "size-16",
              )}
            />
            <div>
              <p
                className={cn(
                  "font-bold text-black leading-tight",
                  t.featured ? "text-xl sm:text-2xl" : "text-sm",
                )}
                style={K2D}
              >
                {t.name}
              </p>
              <p
                className={cn(
                  "text-black/80 leading-snug mt-0.5",
                  t.featured ? "text-base sm:text-lg" : "text-xs",
                )}
                style={K2D}
              >
                {t.role}
              </p>
              <div className="flex mt-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} className="text-amber-500 text-xs">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quote */}
          <p
            className={cn(
              "italic text-black leading-relaxed flex-1",
              t.featured ? "text-sm sm:text-base" : "text-xs sm:text-sm",
            )}
            style={K2D}
          >
            {t.quote}
          </p>

          {/* Thumbs up */}
          <ThumbsUp
            className="text-black/70"
            size={t.featured ? 26 : 20}
            strokeWidth={2}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// Figma (Group 26/27, node 171:449 / 172:495) places the arrows mid-height,
// straddling the gaps beside the center card. Nudged inward from Figma's raw
// 28.7% / 67.5% so they sit closer to the white center card's edges. That
// placement only makes sense once all 3 cards are visible side by side (lg
// and up); hidden below that instead of falling back to a row under the
// cards, per request to drop the arrows entirely on mobile/tablet.
function NavButtons({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous testimonials"
        className="hidden lg:block absolute z-20 top-1/2 -translate-y-1/2 left-[29%] size-10"
      >
        <img src={ASSETS.navPrev} alt="" className="size-full" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next testimonials"
        className="hidden lg:block absolute z-20 top-1/2 -translate-y-1/2 left-[68%] size-10"
      >
        <img src={ASSETS.navNext} alt="" className="size-full" />
      </button>
    </>
  );
}

export function TestimonialsSection() {
  // Counter over the two Figma arrangements (172:526 / 172:604) — prev/next
  // just flips which fixed set of 3 cards is shown, rather than scrolling
  // through individual slides.
  const [setIndex, setSetIndex] = useState(0);
  const goPrev = () =>
    setSetIndex(
      (i) => (i - 1 + TESTIMONIAL_SETS.length) % TESTIMONIAL_SETS.length,
    );
  const goNext = () => setSetIndex((i) => (i + 1) % TESTIMONIAL_SETS.length);

  return (
    <section className="relative w-full overflow-hidden min-h-[780px]">
      {/* Background — Figma's flat black backdrop with the outlined "Testimonial" watermark baked in */}
      <div className="absolute inset-0">
        <Image src={ASSETS.bg} alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-8 lg:px-12">
        <h2
          className="text-white text-4xl sm:text-5xl font-bold text-center mb-12"
          style={K2D}
        >
          Clients Testimonial
        </h2>

        <div className="relative max-w-360 mx-auto pt-20 sm:pt-24">
          <AnimatePresence mode="wait">
            <m.div
              key={setIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-wrap justify-center items-center gap-x-6 lg:gap-x-8 gap-y-20 sm:gap-y-24"
            >
              {TESTIMONIAL_SETS[setIndex].map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </m.div>
          </AnimatePresence>

          {/* Navigation — Figma's red circular arrow icons */}
          <NavButtons onPrev={goPrev} onNext={goNext} />
        </div>
      </div>
    </section>
  );
}
