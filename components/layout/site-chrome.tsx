'use client'

import { usePathname } from 'next/navigation'
import { DarkNav } from '@/components/layout/dark-nav'
import { DarkFooter } from '@/components/layout/dark-footer'
import { FloatingWhatsAppButton } from '@/components/layout/floating-whatsapp-button'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <main className="flex-1">{children}</main>
  }

  return (
    <>
      <DarkNav />
      <main className="flex-1">{children}</main>
      <DarkFooter />
      <FloatingWhatsAppButton />
    </>
  )
}
