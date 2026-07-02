import type { Metadata } from 'next'
import { siteConfig } from '@/config'

export const metadata: Metadata = {
  title: 'Shop',
  description: `The ${siteConfig.name} shop is coming soon. Stay tuned for custom merch drops.`,
}

export default function ShopPage() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow blobs */}
      <div
        className="absolute -top-50 -left-50 size-150 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,100,188,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-50 -right-50 size-150 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,100,188,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative text-center flex flex-col items-center gap-6 max-w-2xl">
        {/* Label */}
        <span
          className="text-[#0A64BC] font-bold text-sm tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Shop
        </span>

        {/* Heading */}
        <h1
          className="text-white font-bold leading-none"
          style={{
            fontFamily: 'var(--font-k2d)',
            fontSize: 'clamp(4rem, 14vw, 10rem)',
          }}
        >
          Coming
          <br />
          <span className="text-[#0A64BC]">Soon</span>
        </h1>

        {/* Divider */}
        <div className="w-16 h-px bg-[#0A64BC]/50" />

        {/* Sub-copy */}
        <p
          className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          We&apos;re stocking up. Custom merch drops, limited-edition pieces, and squad essentials — all landing here soon.
        </p>

        {/* CTA nudge */}
        <a
          href="/contact"
          className="mt-2 inline-flex items-center gap-2 h-12 px-8 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
          style={{
            fontFamily: 'var(--font-k2d)',
            background: 'linear-gradient(100deg, #0a64bc 5.67%, #4f9ce7 99.53%)',
          }}
        >
          Get Notified — Contact Us
        </a>
      </div>
    </div>
  )
}
