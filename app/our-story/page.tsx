import type { Metadata } from 'next'
import { siteConfig } from '@/config'
import { StoryHeroSection } from '@/components/sections/our-story/story-hero-section'
import { TimelineSection } from '@/components/sections/our-story/timeline-section'
import { TeamSection } from '@/components/sections/our-story/team-section'
import { teamMembers, timelineEvents } from '@/data'

export const metadata: Metadata = {
  title: 'Our Story',
  description: `Learn about our journey and the team behind ${siteConfig.name}.`,
}

export default function OurStoryPage() {
  return (
    <>
      <StoryHeroSection />
      <TimelineSection events={timelineEvents} />
      <TeamSection members={teamMembers} />
    </>
  )
}
