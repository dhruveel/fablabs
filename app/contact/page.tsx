import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact Us — FabLabs',
  description: 'Get in touch with FabLabs for custom merchandise quotes, college fest orders, and more.',
}

// ── Asset URLs (Figma, valid ~7 days from 2026-06-25) ────────────────────────
const A = {
  heroBg:     '/assets/f83452be-04c5-4618-b223-f395940896b6.jpg',
  phone:      '/assets/632d4e50-bdbf-40c0-b176-b7a4d93da29d.png',
  sticker:    '/assets/7ba38746-03e8-4565-b7f8-89bc41127e59.svg',
  floatIllus: '/assets/c61a2ba1-9c65-4729-bd5d-fc0d76ed30ea.png',
  icoPhone:   '/assets/4df8129b-336b-474d-8458-360db8f12adc.png',
  icoEmail:   '/assets/ca3f0a68-b45d-4bb6-822b-edc938ea8f62.png',
  icoAddr:    '/assets/f76a85a9-5908-41ed-a9b8-e1d0c8910ea4.png',
}

// ── Shared CTA button ─────────────────────────────────────────────────────────
function BlueOutlineBtn({
  children,
  type,
  className,
}: {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
}) {
  return (
    <Button
      type={type ?? 'button'}
      variant="outline"
      className={cn(
        'h-auto rounded-full border-2 border-[#0A64BC] bg-transparent px-7 py-2.5',
        'text-[#0A64BC] hover:bg-[#0A64BC]/10 hover:text-[#0A64BC]',
        'text-base sm:text-lg whitespace-nowrap',
        className
      )}
      style={{ fontFamily: 'var(--font-jersey10)' }}
    >
      {children}
    </Button>
  )
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden min-h-[260px] sm:min-h-[360px] lg:min-h-[440px] flex items-center">
      <div className="absolute inset-0 pointer-events-none select-none">
        <img src={A.heroBg} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
      </div>
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 flex justify-end">
        <h1
          className="text-white text-right text-4xl sm:text-6xl lg:text-[96px] xl:text-[120px] font-bold leading-tight"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Chal Baat<br />Karein
        </h1>
      </div>
    </section>
  )
}

// ── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      className="relative w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12"
      style={{ background: 'linear-gradient(180deg, #0165a1 0%, #00253b 100%)' }}
    >
      {/* Floating illustration — top-right */}
      <div className="absolute top-8 right-6 sm:right-12 lg:right-16 z-20 pointer-events-none hidden sm:block">
        <img src={A.floatIllus} alt="" className="size-[140px] sm:size-[180px] lg:size-[218px] object-contain" />
      </div>

      {/* Inner card */}
      <Card
        className="relative z-10 w-full max-w-[1200px] mx-auto rounded-[46px] border-0 ring-0 shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #262626 0%, #797d80 259.73%)' }}
      >
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* ── Left: illustration + contact info ── */}
            <div className="relative lg:w-[44%] shrink-0 flex flex-col justify-end gap-6 px-8 py-10 lg:py-14 overflow-hidden min-h-[380px] lg:min-h-[700px]">
              {/* Rotated phone illustration */}
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  width: '70%',
                  top: '-5%',
                  left: '-8%',
                  transform: 'rotate(49.86deg)',
                  transformOrigin: '50% 40%',
                }}
              >
                <img src={A.phone} alt="" className="w-full object-contain opacity-80" />
              </div>
              {/* Sticker badge */}
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  width: '26%',
                  bottom: '30%',
                  left: '18%',
                  transform: 'rotate(30.95deg)',
                }}
              >
                <img src={A.sticker} alt="" className="w-full object-contain" />
              </div>

              {/* Contact info items */}
              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <img src={A.icoPhone} alt="" className="size-[52px] shrink-0 rounded-full" />
                  <p className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'var(--font-k2d)' }}>
                    9489959191
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={A.icoEmail} alt="" className="size-[52px] shrink-0 rounded-full" />
                  <p className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'var(--font-k2d)' }}>
                    info@fablabs.in
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <img src={A.icoAddr} alt="" className="size-[52px] shrink-0 rounded-full mt-0.5" />
                  <p className="text-white font-bold text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'var(--font-k2d)' }}>
                    Orca whale Inc 1st floor 22/5 kpp garden&apos;s<br />
                    Kongu Main road Tirupur-641607
                  </p>
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="block lg:hidden h-px bg-white/10 mx-8" />
            <div className="hidden lg:block w-px bg-white/10 my-8" />

            {/* ── Right: form ── */}
            <div className="flex-1 bg-black rounded-b-[46px] lg:rounded-r-[46px] lg:rounded-bl-none px-6 sm:px-10 py-10 lg:py-12">
              <form className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="h-14 rounded-full bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 text-base focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
                  style={{ fontFamily: 'var(--font-k2d)' }}
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="h-14 rounded-full bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 text-base focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
                  style={{ fontFamily: 'var(--font-k2d)' }}
                />
                <Input
                  type="email"
                  placeholder="Email ID"
                  className="h-14 rounded-full bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 text-base focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
                  style={{ fontFamily: 'var(--font-k2d)' }}
                />
                <Input
                  type="text"
                  placeholder="Subject"
                  className="h-14 rounded-full bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 text-base focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
                  style={{ fontFamily: 'var(--font-k2d)' }}
                />
                <Textarea
                  placeholder="Message"
                  rows={6}
                  className="min-h-[160px] sm:min-h-[184px] rounded-[29px] bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 py-4 text-base resize-none focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
                  style={{ fontFamily: 'var(--font-k2d)' }}
                />
                <div className="pt-2">
                  <BlueOutlineBtn type="submit">Let&apos;s Talk</BlueOutlineBtn>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

// ── Map Section ───────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="w-full bg-black py-10 sm:py-14 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1208px] mx-auto rounded-[27px] overflow-hidden h-[300px] sm:h-[450px] lg:h-[550px]">
        <iframe
          title="FabLabs location — Tirupur, Tamil Nadu"
          src="https://maps.google.com/maps?q=Kongu+Main+Road,+Tirupur,+Tamil+Nadu+641607,+India&output=embed&z=15"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="bg-black">
      <HeroSection />
      <ContactSection />
      <MapSection />
    </div>
  )
}
