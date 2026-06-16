import type { Metadata } from 'next'
import { siteConfig } from '@/config'
import { FabHeroSection } from '@/components/sections/fab/fab-hero-section'
import { FabGridSection } from '@/components/sections/fab/fab-grid-section'
import { fabProjects } from '@/data'

export const metadata: Metadata = {
  title: 'Fab',
  description: `Explore our fabrication projects and workshops at ${siteConfig.name}.`,
}

export default function FabPage() {
  return (
    <>
      <FabHeroSection />
      <FabGridSection projects={fabProjects} />
    </>
  )
}
