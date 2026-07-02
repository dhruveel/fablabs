import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { siteConfig } from '@/config'

export function FloatingWhatsAppButton() {
  const href = siteConfig.links.whatsapp
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#22c15e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
