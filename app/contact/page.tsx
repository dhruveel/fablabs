import type { Metadata } from 'next'
import { siteConfig } from '@/config'
import { ContactHeroSection } from '@/components/sections/contact/contact-hero-section'
import { ContactFormSection } from '@/components/sections/contact/contact-form-section'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${siteConfig.name} team.`,
}

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
    </>
  )
}
