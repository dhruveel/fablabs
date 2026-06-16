import type { Metadata } from 'next'
import { siteConfig } from '@/config'
import { LabHeroSection } from '@/components/sections/lab/lab-hero-section'
import { LabGridSection } from '@/components/sections/lab/lab-grid-section'
import { labProjects } from '@/data'

export const metadata: Metadata = {
  title: 'Lab',
  description: `Discover our research and experimental work at ${siteConfig.name}.`,
}

export default function LabPage() {
  return (
    <>
      <LabHeroSection />
      <LabGridSection projects={labProjects} />
    </>
  )
}
