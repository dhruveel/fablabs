import type { Metadata } from 'next'
import { siteConfig } from '@/config'
import { fabProjects, labProjects } from '@/data'
import { HeroSection } from '@/components/sections/landing/hero-section'
import { AboutPreviewSection } from '@/components/sections/landing/about-preview-section'
import { FabPreviewSection } from '@/components/sections/landing/fab-preview-section'
import { LabPreviewSection } from '@/components/sections/landing/lab-preview-section'
import { CtaSection } from '@/components/sections/landing/cta-section'

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
}

export default function LandingPage() {
  const featuredFab = fabProjects.filter((p) => p.featured)
  const featuredLab = labProjects.filter((p) => p.featured)

  return (
    <>
      <HeroSection />
      <AboutPreviewSection />
      <FabPreviewSection projects={featuredFab} />
      <LabPreviewSection projects={featuredLab} />
      <CtaSection />
    </>
  )
}
