import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { QuoteDialog } from "./quote-dialog";

const A = {
  logo: "/assets/logo.png",
  socFb: "/assets/footer-social-facebook.png",
  socIg: "/assets/footer-social-instagram.png",
  socTw: "/assets/footer-social-twitter.png",
  socYt: "/assets/footer-social-youtube.png",
  icoPhone: "/assets/footer-icon-phone.png",
  icoEmail: "/assets/footer-icon-email.png",
  icoAddr: "/assets/footer-icon-address.png",
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
              width={400}
              height={134}
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
                { label: "Home", href: "/" },
                { label: "Our Story", href: "/our-story" },
                { label: "Fab", href: "/fab" },
                { label: "Lab", href: "/lab" },
                { label: "Community", href: "/community" },
                { label: "Shop", href: "/shop" },
                { label: "Contact Us", href: "/contact" },
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
          className="text-white/50 text-xs text-center"
          style={{ fontFamily: "var(--font-k2d)" }}
        >
          © {new Date().getFullYear()} FabLabs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
