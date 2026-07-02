import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig } from "@/config";
import { ContactForm } from "./_contact-form";

export const metadata: Metadata = {
  title: "Contact Us — FabLabs",
  description:
    "Get in touch with FabLabs for custom merchandise quotes, college fest orders, and more.",
};

const A = {
  heroBg: "/assets/26fc8ce1-f24d-4df6-b54c-fcfa6eba1230.jpg",
  phone: "/assets/contact-phone-1.png",
  sticker: "/assets/contact-wave.png",
  floatIllus: "/assets/contact-person.png",
  icoPhone: "/assets/5579d9bf-b8f1-4365-99b1-ca3749171ba3.png",
  icoEmail: "/assets/7442fd42-4b18-44b8-abdb-77d03af4e062.png",
  icoAddr: "/assets/72644459-83ae-44fc-881f-a59573e46935.png",
};

// ── Hero Section (Variant 2) ──────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden min-h-95 sm:min-h-130 lg:min-h-160 flex items-center">
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image src={A.heroBg} alt="" fill className="object-cover" />
      </div>
      <div className="relative z-10 w-full max-w-360 mx-auto px-6 sm:px-12 lg:px-24 flex justify-end">
        <h1
          className="text-black text-right text-4xl sm:text-6xl lg:text-[96px] xl:text-[128px] font-bold leading-tight"
          style={{ fontFamily: "var(--font-k2d)" }}
        >
          Let&apos;s Connect
        </h1>
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      className="relative w-full py-16 sm:py-20 lg:pt-47.5 lg:pb-28 px-4 sm:px-8 lg:px-12"
      style={{
        background: "linear-gradient(180deg, #0165a1 0%, #00253b 100%)",
      }}
    >
      {/* Floating illustration */}
      <div className="absolute top-8 lg:top-17 sm:right-3  z-20 pointer-events-none hidden sm:block">
        <div className="relative size-45 lg:size-54.5">
          <div className="absolute inset-[-2.29%_-11.47%_-11.47%_-2.29%]">
            <Image src={A.floatIllus} alt="" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Inner card */}
      <Card
        className="relative z-10 w-full max-w-300 mx-auto rounded-[46px] border-0 ring-0 shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #262626 0%, #797d80 259.73%)",
        }}
      >
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Left: illustration + contact info */}
            <div className="relative lg:w-[44%] shrink-0 flex flex-col justify-end gap-6 px-8 py-10 lg:py-14 overflow-hidden min-h-95 lg:min-h-200">
              {/* Phone */}
              <div
                className="absolute pointer-events-none select-none hidden lg:block"
                style={{
                  left: "-139.48px",
                  top: "-154.7px",
                  width: "821.806px",
                  height: "760.764px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={A.phone}
                  alt=""
                  width={307}
                  height={816}
                  style={{
                    width: "308px",
                    height: "816px",
                    transform: "rotate(10deg)",
                    objectPosition: "bottom",
                    flexShrink: 0,
                  }}
                />
              </div>
              {/* Sticker */}
              <div
                className="absolute pointer-events-none select-none hidden lg:block"
                style={{
                  left: "71.2px",
                  top: "357.03px",
                  width: "194.292px",
                  height: "179.751px",
                }}
              >
                <Image src={A.sticker} alt="" fill className="object-contain" />
              </div>

              {/* Contact info items */}
              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <Image
                    src={A.icoPhone}
                    alt=""
                    width={61}
                    height={61}
                    className="size-15.25 shrink-0 rounded-full"
                  />
                  <p
                    className="text-white font-bold text-xl lg:text-[24px]"
                    style={{ fontFamily: "var(--font-k2d)" }}
                  >
                    9489959191
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src={A.icoEmail}
                    alt=""
                    width={61}
                    height={61}
                    className="size-15.25 shrink-0 rounded-full"
                  />
                  <p
                    className="text-white font-bold text-xl lg:text-[24px]"
                    style={{ fontFamily: "var(--font-k2d)" }}
                  >
                    info@fablabs.in
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Image
                    src={A.icoAddr}
                    alt=""
                    width={61}
                    height={61}
                    className="size-15.25 shrink-0 rounded-full mt-0.5"
                  />
                  <p
                    className="text-white font-bold text-base lg:text-[24px] leading-tight"
                    style={{ fontFamily: "var(--font-k2d)" }}
                  >
                    Orca whale Inc 1st floor 22/5 kpp garden&apos;s
                    <br />
                    Kongu Main road Tirupur-641607
                  </p>
                </div>

                {siteConfig.links.whatsapp && (
                  <a
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white text-base transition-opacity hover:opacity-90"
                    style={{ fontFamily: "var(--font-k2d)" }}
                  >
                    <WhatsAppIcon className="size-5" />
                    Connect on WhatsApp
                  </a>
                )}
              </div>
            </div>

            {/* Right: form */}
            <div className="flex-1 bg-black rounded-b-[46px] lg:rounded-[35px] lg:mt-7.5 lg:mr-7.5 lg:mb-16 px-6 sm:px-10 py-10 lg:py-12">
              <ContactForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// ── Map Section ───────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="w-full bg-black py-10 sm:py-14 px-4 sm:px-8 lg:px-12">
      <div className="max-w-300 mx-auto rounded-[27px] overflow-hidden h-75 sm:h-112.5 lg:h-137.5">
        <iframe
          title="FabLabs location — Tirupur, Tamil Nadu"
          src="https://maps.google.com/maps?q=Kongu+Main+Road,+Tirupur,+Tamil+Nadu+641607,+India&output=embed&z=15"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="bg-black">
      <HeroSection />
      <ContactSection />
      <MapSection />
    </div>
  );
}
