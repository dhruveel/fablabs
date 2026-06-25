import type { Metadata } from 'next'
import { siteConfig } from '@/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.name} — how we collect, use, and protect your information.`,
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
    heading: 'Information We Collect',
    paragraphs: [
      'When you place an order, request a quote, or get in touch with us, we may collect the following personal information:',
    ],
    bullets: [
      'Name, email address, and phone number',
      'Shipping and billing address',
      'Order details including product preferences, quantities, and custom design files',
      'Payment information (processed securely via third-party payment gateways — we do not store card details)',
      'Messages and communications you send us',
    ],
  },
  {
    heading: 'How We Use Your Information',
    paragraphs: ['We use the information we collect solely to run our business and serve you better:'],
    bullets: [
      'To process and fulfil your merchandise orders',
      'To communicate about your order status, delivery, and support queries',
      'To send quotes and respond to enquiries',
      'To improve our products and services based on feedback',
      'To comply with legal obligations',
    ],
  },
  {
    heading: 'Sharing Your Information',
    paragraphs: [
      'FabLabs does not sell, rent, or trade your personal information to third parties.',
      'We may share limited data with trusted service providers who assist us in operating our business — such as courier and logistics partners for order delivery, and payment processors for secure transactions. These parties are bound by strict confidentiality agreements and are only permitted to use your data for the purposes we specify.',
    ],
  },
  {
    heading: 'Data Storage & Security',
    paragraphs: [
      'Your personal data is stored on secure servers. We implement industry-standard technical and organisational measures to protect your information against unauthorised access, alteration, disclosure, or destruction.',
      'While we take all reasonable precautions, no method of transmission over the Internet or electronic storage is 100% secure. We encourage you to keep your contact information up to date and notify us immediately if you suspect any unauthorised use of your account.',
    ],
  },
  {
    heading: 'Cookies & Analytics',
    paragraphs: [
      'Our website may use cookies and similar tracking technologies to improve your browsing experience and analyse site traffic. Cookies are small text files stored on your device that help us understand how you interact with our website.',
      'You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.',
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: ['You have the right to:'],
    bullets: [
      'Access the personal information we hold about you',
      'Request correction of inaccurate or incomplete data',
      'Request deletion of your personal data (subject to legal retention requirements)',
      'Opt out of marketing communications at any time',
      'Lodge a complaint with the relevant data protection authority',
    ],
  },
  {
    heading: 'Retention of Data',
    paragraphs: [
      'We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, comply with our legal obligations, resolve disputes, and enforce our agreements. Order records may be retained for up to 5 years for accounting and compliance purposes.',
    ],
  },
  {
    heading: 'Third-Party Links',
    paragraphs: [
      'Our website may contain links to third-party websites or social media platforms. These sites have their own privacy policies, and we are not responsible for their content or practices. We encourage you to review the privacy policy of any third-party site you visit.',
    ],
  },
  {
    heading: "Children's Privacy",
    paragraphs: [
      'Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with their personal data, please contact us and we will delete it promptly.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please don't hesitate to reach out:",
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
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,100,188,0.15) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-[1200px] mx-auto">
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
          Privacy<br />Policy
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
        className="max-w-[1200px] mx-auto rounded-[24px] px-8 sm:px-12 py-10 sm:py-14"
        style={{ background: 'linear-gradient(to bottom, #201e1e, #0d0d0d)' }}
      >
        <p
          className="text-white/80 text-base sm:text-lg leading-relaxed"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          At <span className="text-[#0A64BC] font-bold">FabLabs</span>, your privacy matters
          as much as the merch we create for you. This Privacy Policy explains what personal
          information we collect, how we use it, and the steps we take to keep it safe. By
          using our website or placing an order with us, you agree to the practices described
          below.
        </p>
      </div>
    </section>
  )
}

function PolicyContent() {
  return (
    <section className="bg-black w-full px-6 sm:px-12 lg:px-20 py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
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
export default function PrivacyPolicyPage() {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <Intro />
      <PolicyContent />
    </div>
  )
}
