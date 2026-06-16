import type { FabProject } from '@/types'

export const fabProjects: FabProject[] = [
  {
    id: 'fab-001',
    title: 'Open-Source CNC Router',
    description: 'A fully open-source CNC router designed for accessibility and modularity.',
    category: 'Hardware',
    tags: ['CNC', 'Open Source', 'Woodworking'],
    featured: true,
  },
  {
    id: 'fab-002',
    title: 'Modular Desk System',
    description:
      'Parametric desk system designed for maker spaces and collaborative environments.',
    category: 'Furniture',
    tags: ['Parametric Design', 'Laser Cut', 'Plywood'],
    featured: false,
  },
  {
    id: 'fab-003',
    title: 'Wearable Air Quality Monitor',
    description: 'Low-cost wearable sensor platform for real-time air quality monitoring.',
    category: 'Electronics',
    tags: ['Sensors', 'IoT', 'Wearables'],
    featured: true,
  },
  {
    id: 'fab-004',
    title: 'Flatpack Greenhouse',
    description: 'Flat-pack polycarbonate greenhouse kit optimized for urban balconies.',
    category: 'Architecture',
    tags: ['Flat Pack', 'Sustainability', 'Urban'],
    featured: false,
  },
]
