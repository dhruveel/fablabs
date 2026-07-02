import type { Metadata } from 'next'
import { CommunitySections } from './_community-sections'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the FabLabs squad — connect with college students, creators, and makers across India.',
}

export default function CommunityPage() {
  return <CommunitySections />
}
