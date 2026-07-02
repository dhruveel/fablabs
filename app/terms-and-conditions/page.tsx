import type { Metadata } from 'next'
import { siteConfig } from '@/config'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: `Terms and conditions for using ${siteConfig.name} — please read before placing an order.`,
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Section {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

// ── Content ───────────────────────────────────────────────────────────────────
const lastUpdated = 'June 25, 2026'

const sections: Section[] = [
  {
    heading: 'Acceptance of Terms',
    paragraphs: [
      'By accessing our website, placing an order, or engaging our services in any way, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using our services.',
      'FabLabs reserves the right to update or modify these terms at any time without prior notice. Continued use of our services following any changes constitutes your acceptance of the revised terms.',
    ],
  },
  {
    heading: 'Our Services',
    paragraphs: [
      'FabLabs provides custom merchandise manufacturing services including but not limited to custom T-shirts, hoodies, caps, tote bags, and other printed or embroidered apparel for colleges, startups, brands, and individuals.',
      'All products are manufactured to order. We do not maintain ready stock for custom items.',
    ],
  },
  {
    heading: 'Orders & Quotations',
    paragraphs: ['When placing an order with FabLabs:'],
    bullets: [
      'All orders are subject to availability of materials and production capacity.',
      'A confirmed order is binding. Cancellations are only accepted before production begins.',
      'Quotations are valid for 7 days from the date of issue unless stated otherwise.',
      'Minimum order quantities (MOQs) may apply depending on the product and customisation type.',
      'FabLabs reserves the right to decline any order at its sole discretion.',
    ],
  },
  {
    heading: 'Custom Design & Artwork',
    paragraphs: [
      "You are responsible for ensuring that any artwork, logos, or design files you submit are accurate, print-ready, and do not infringe upon any third-party intellectual property rights. FabLabs will not be held liable for errors in submitted designs.",
      'By submitting designs, you confirm you hold the necessary rights or permissions to use the artwork commercially. FabLabs reserves the right to refuse production of content that is offensive, unlawful, or in violation of any applicable laws.',
      'Minor colour variations between digital proofs and final printed products may occur due to differences in screen calibration and printing processes. These do not constitute defects.',
    ],
  },
  {
    heading: 'Pricing & Payment',
    paragraphs: [
      'All prices are quoted in Indian Rupees (INR) and are exclusive of applicable taxes unless stated otherwise. GST and other statutory levies will be added as applicable.',
    ],
    bullets: [
      'A deposit or advance payment may be required before production commences.',
      'Full payment must be cleared before dispatch of goods.',
      'FabLabs accepts payment via bank transfer, UPI, and other approved payment methods.',
      'Prices are subject to change without notice. The price applicable to your order is the one confirmed at the time of order placement.',
    ],
  },
  {
    heading: 'Production Timelines & Delivery',
    paragraphs: [
      'Production timelines vary depending on order size, product type, and complexity of customisation. Estimated timelines will be communicated at the time of order confirmation.',
      'FabLabs will make every reasonable effort to meet agreed delivery dates. However, delivery timelines are estimates and not guarantees. We are not liable for delays caused by factors beyond our control, including courier delays, natural events, or supply chain disruptions.',
      'Risk of loss or damage passes to the customer upon handover to the courier or logistics partner.',
    ],
  },
  {
    heading: 'Quality, Defects & Returns',
    paragraphs: [
      'FabLabs takes pride in delivering quality merchandise. If you receive goods that are materially defective or significantly different from what was approved in the proof stage, please notify us within 48 hours of delivery with supporting photographs.',
    ],
    bullets: [
      'Claims made after 48 hours of delivery may not be accepted.',
      'Defective items will be replaced or refunded at our discretion after inspection.',
      'Returns are not accepted for correctly manufactured custom orders.',
      'We are not responsible for sizing issues if correct measurements were provided and approved.',
    ],
  },
  {
    heading: 'Intellectual Property',
    paragraphs: [
      "All content on the FabLabs website — including text, images, graphics, logos, and design assets — is the property of FabLabs or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.",
      'FabLabs retains the right to display completed merchandise in our portfolio, social media, and marketing materials unless you explicitly request otherwise in writing at the time of order.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    paragraphs: [
      "To the maximum extent permitted by law, FabLabs' total liability to you for any claim arising out of or in connection with our services shall not exceed the amount paid by you for the specific order giving rise to the claim.",
      'FabLabs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, goodwill, or data, even if advised of the possibility of such damages.',
    ],
  },
  {
    heading: 'Indemnification',
    paragraphs: [
      'You agree to indemnify and hold FabLabs, its directors, employees, and agents harmless from and against any claims, liabilities, damages, losses, and expenses — including legal fees — arising out of or in any way connected with your use of our services, your violation of these terms, or your infringement of any intellectual property or other rights of any third party.',
    ],
  },
  {
    heading: 'Governing Law & Disputes',
    paragraphs: [
      'These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Tirupur, Tamil Nadu.',
      'We encourage you to contact us first to resolve any disputes amicably before initiating formal legal proceedings.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      'For any questions or concerns about these Terms and Conditions, please reach out to us:',
    ],
    bullets: [
      'Email: info@fablabs.in',
      'Phone: 9489959191',
      "Address: Orca Whale Inc, 1st Floor, 22/5 KPP Garden's, Kongu Main Road, Tirupur – 641607",
    ],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-black w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden">
      {/* Blue glow accent */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,100,188,0.15) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-300 mx-auto">
        <p
          className="text-[#0A64BC] font-bold text-sm sm:text-base tracking-widest uppercase mb-4"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Legal
        </p>
        <h1
          className="text-white font-bold text-5xl sm:text-7xl lg:text-[96px] leading-tight"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Terms &amp;<br />Conditions
        </h1>
        <p
          className="text-white/50 text-sm sm:text-base mt-6"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Last updated: {lastUpdated}
        </p>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="bg-black w-full px-6 sm:px-12 lg:px-20 pb-4">
      <div
        className="max-w-300 mx-auto rounded-[24px] px-8 sm:px-12 py-10 sm:py-14"
        style={{ background: 'linear-gradient(to bottom, #201e1e, #0d0d0d)' }}
      >
        <p
          className="text-white/80 text-base sm:text-lg leading-relaxed"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Welcome to <span className="text-[#0A64BC] font-bold">FabLabs</span>. These Terms
          and Conditions govern your use of our website and services. Please read them
          carefully before placing an order or engaging with us in any capacity. Our goal is
          to be straightforward and fair — if anything is unclear, just reach out to us
          directly.
        </p>
      </div>
    </section>
  )
}

function TermsContent() {
  return (
    <section className="bg-black w-full px-6 sm:px-12 lg:px-20 py-10 sm:py-14">
      <div className="max-w-300 mx-auto flex flex-col gap-12">
        {sections.map((s, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            {/* Section number */}
            <div className="shrink-0 sm:w-[56px]">
              <span
                className="text-[#0A64BC] font-bold text-xl"
                style={{ fontFamily: 'var(--font-k2d)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Section body */}
            <div className="flex-1 border-t border-white/10 pt-6">
              <h2
                className="text-white font-bold text-xl sm:text-2xl mb-4"
                style={{ fontFamily: 'var(--font-k2d)' }}
              >
                {s.heading}
              </h2>
              <div
                className="text-white/70 text-sm sm:text-base leading-relaxed space-y-3"
                style={{ fontFamily: 'var(--font-k2d)' }}
              >
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.bullets && (
                  <ul className="mt-3 flex flex-col gap-2 list-none pl-0">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-1.5 shrink-0 size-1.5 rounded-full bg-[#0A64BC]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <Intro />
      <TermsContent />
    </div>
  )
}
