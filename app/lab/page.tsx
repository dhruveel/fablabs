import type { Metadata } from 'next'
import { LabSections } from './_lab-sections'

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'Step into the FabLabs Printing Lab — where innovation transforms your vision into reality.',
}

export default function LabPage() {
  return <LabSections />
}
