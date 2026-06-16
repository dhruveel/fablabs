import type { LabProject } from '@/types'

export const labProjects: LabProject[] = [
  {
    id: 'lab-001',
    title: 'Mycelium Composites Research',
    description:
      'Investigating the structural properties of mycelium-based composite materials.',
    field: 'Materials Science',
    tags: ['Biomaterials', 'Sustainability', 'Research'],
    featured: true,
  },
  {
    id: 'lab-002',
    title: 'Generative Structural Forms',
    description:
      'Computational methods for generating structurally-optimal architectural forms.',
    field: 'Computational Design',
    tags: ['Generative', 'Structural', 'Algorithm'],
    featured: false,
  },
  {
    id: 'lab-003',
    title: 'Soft Robotics Actuator Library',
    description:
      'Open library of soft pneumatic actuators for accessible robotics experimentation.',
    field: 'Robotics',
    tags: ['Soft Robotics', 'Open Source', 'Fabrication'],
    featured: true,
  },
  {
    id: 'lab-004',
    title: 'Urban Heat Island Mapping',
    description: 'Community-driven sensor network for fine-grained urban heat island mapping.',
    field: 'Environmental Science',
    tags: ['Sensors', 'Urban', 'Climate'],
    featured: false,
  },
]
