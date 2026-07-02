import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { QuoteDialog } from "./quote-dialog";

const A = {
  logo: "/assets/logo.png",
  socFb: "/assets/0d9638c9-3a5a-4d92-b034-91d7ec4d7604.png",
  socIg: "/assets/cacad907-34a9-4da8-96a7-da532840f2e9.png",
  socTw: "/assets/5dac2d8d-3393-49d2-a377-6db21e292a0f.png",
  socYt: "/assets/e8ef54c3-03a2-4477-a416-becbc0e5986c.png",
  icoPhone: "/assets/50636965-30bf-40fe-9b4b-9384e4bbb5a3.png",
  icoEmail: "/assets/3a036d4a-5868-4de0-9dbb-f9c256451473.png",
  icoAddr: "/assets/1d529d27-fe67-4d93-8049-80bc38f85f92.png",
};

const SOCIAL_LABELS = ["Facebook", "Instagram", "Twitter / X", "YouTube"];

export function DarkFooter() {
  return (
    <footer className="w-full bg-black px-6 sm:px-10 lg:px-12 pt-10 pb-6">
      <div className="max-w-360 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <Image
              src={A.logo}
              alt="FabLabs"
              width={200}
              height={96}
              className="h-24 w-auto object-contain"
            />
            <p
              className="text-white font-bold text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-k2d)" }}
            >
              Custom merch. Real stories. FabLabs always on.
            </p>
            <div className="flex gap-4">
              {([A.socFb, A.socIg, A.socTw, A.socYt] as const).map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={SOCIAL_LABELS[i]}
                  width={32}
                  height={32}
                  className="size-8 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Custom Merch */}
          <div
            className="flex flex-col gap-4"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            <p className="font-bold text-xl sm:text-2xl">
              <span className="text-[#0A64BC]">Custom</span>
              <span className="text-white"> Merch</span>
            </p>
            <div className="flex flex-col gap-1 text-lg sm:text-xl font-bold">
              <QuoteDialog />
              <p>
                <span className="text-[#0A64BC]">Join the </span>
                <span className="text-white">Squad</span>
              </p>
            </div>
          </div>

          {/* Menu */}
          <div
            className="flex flex-col gap-3"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            <p className="text-[#0A64BC] text-xl sm:text-2xl font-bold">Menu</p>
            <ul className="flex flex-col gap-1 text-white font-bold text-base sm:text-lg">
              {[
                "Home",
                "Our Story",
                "Fab",
                "Lab",
                "Community",
                "Shop",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-[#0A64BC] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div
            className="flex flex-col gap-3"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            <p className="text-[#0A64BC] text-xl sm:text-2xl font-bold">
              Company
            </p>
            <ul className="flex flex-col gap-1 text-white font-bold text-base sm:text-lg">
              {[
                { label: "About", href: "/our-story" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                {
                  label: "Terms and conditions",
                  href: "/terms-and-conditions",
                },
                { label: "Refund policy", href: "#" },
                { label: "Affiliates program", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#0A64BC] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Let's Connect */}
          <div
            className="col-span-2 sm:col-span-1 flex flex-col gap-3"
            style={{ fontFamily: "var(--font-k2d)" }}
          >
            <p className="text-[#0A64BC] text-xl sm:text-2xl font-bold">
              Let&apos;s Connect
            </p>
            <a
              href="#"
              className="text-white font-bold text-base sm:text-lg hover:text-[#0A64BC] transition-colors"
            >
              FAQ
            </a>
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex items-center gap-3">
                <Image
                  src={A.icoPhone}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 shrink-0"
                />
                <span className="text-white text-sm sm:text-base font-bold">
                  9489959191
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={A.icoEmail}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 shrink-0"
                />
                <span className="text-white text-sm sm:text-base font-bold">
                  info@fablabs.in
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Image
                  src={A.icoAddr}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 shrink-0 mt-0.5"
                />
                <p className="text-white text-sm font-bold leading-relaxed">
                  Orca whale Inc 1st floor 22/5 kpp garden&apos;s Kongu Main
                  road Tirupur-641607
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mt-8 mb-4 bg-white/10" />
        <p
          className="text-white/40 text-xs text-center"
          style={{ fontFamily: "var(--font-k2d)" }}
        >
          © {new Date().getFullYear()} FabLabs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
