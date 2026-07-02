import type { Metadata } from 'next'
import { FabSections } from './_fab-sections'

export const metadata: Metadata = {
  title: 'Fab',
  description:
    'Explore our diverse range of premium fabrics — each selected for quality, durability, and design excellence.',
}

export default function FabPage() {
  return <FabSections />
}
