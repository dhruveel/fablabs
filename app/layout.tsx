import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Inter, K2D, Jersey_10, Permanent_Marker, Rock_Salt } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { SiteChrome } from '@/components/layout/site-chrome'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { Providers } from '@/components/providers'
import { siteConfig } from '@/config'

const inter     = Inter({ subsets: ['latin'], variable: '--font-sans' })
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const k2d = K2D({
  subsets:  ['latin'],
  weight:   ['400', '500', '700'],
  style:    ['normal', 'italic'],
  variable: '--font-k2d',
  display:  'swap',
})
const jersey10 = Jersey_10({
  subsets:  ['latin'],
  weight:   ['400'],
  variable: '--font-jersey10',
  display:  'swap',
})
// Free Google Fonts substitute for Figma's "Higher Jump" (a paid brush-marker
// display font not available via next/font/google) — closest free match for
// the rough, bold marker-stroke look used on the DropSection heading.
const permanentMarker = Permanent_Marker({
  subsets:  ['latin'],
  weight:   ['400'],
  variable: '--font-higher-jump',
  display:  'swap',
})
const rockSalt = Rock_Salt({
  subsets:  ['latin'],
  weight:   ['400'],
  variable: '--font-rock-salt',
  display:  'swap',
})

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  themeColor:   '#000000',
}

export const metadata: Metadata = {
  title: {
    default:  siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:  siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         siteConfig.url,
    title:       siteConfig.name,
    description: siteConfig.description,
    siteName:    siteConfig.name,
    images:      [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       siteConfig.name,
    description: siteConfig.description,
    images:      [siteConfig.ogImage],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full antialiased',
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        k2d.variable,
        jersey10.variable,
        permanentMarker.variable,
        rockSalt.variable,
        'font-sans',
      )}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
