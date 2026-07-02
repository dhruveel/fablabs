import type { Metadata } from 'next'
import { siteConfig } from '@/config'
import { StoryHeroSection } from '@/components/sections/our-story/story-hero-section'
import { TimelineSection } from '@/components/sections/our-story/timeline-section'
import { TeamSection } from '@/components/sections/our-story/team-section'
import { ProcessSection } from '@/components/sections/our-story/process-section'
import { PromiseSection } from '@/components/sections/our-story/promise-section'

export const metadata: Metadata = {
  title: 'Our Story',
  description: `Learn about our journey and the team behind ${siteConfig.name}.`,
}

export default function OurStoryPage() {
  return (
    <>
      <StoryHeroSection />
      <TimelineSection />
      <TeamSection />
      <ProcessSection />
      <PromiseSection />
    </>
  )
}
