import type { Metadata } from 'next'
import { HomeSections } from './_home-sections'

export const metadata: Metadata = {
  title: 'FabLabs — Custom Merch',
  description: 'Custom merch. Real stories. FabLabs always on.',
}

export default function LandingPage() {
  return <HomeSections />
}
