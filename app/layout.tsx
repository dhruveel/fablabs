import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter, K2D, Jersey_10 } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { DarkNav } from '@/components/layout/dark-nav'
import { DarkFooter } from '@/components/layout/dark-footer'
import { siteConfig } from '@/config'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const k2d = K2D({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-k2d',
  display: 'swap',
})
const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jersey10',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
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
        'font-sans'
      )}
    >
      <body className="min-h-full flex flex-col bg-black">
        <DarkNav />
        <main className="flex-1">{children}</main>
        <DarkFooter />
      </body>
    </html>
  )
}
