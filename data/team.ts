import type { TeamMember } from '@/types'

export const teamMembers: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Alex Rivera',
    role: 'Co-Founder & Fab Director',
    bio: 'Designer-engineer with a background in digital fabrication and open hardware.',
    socials: {
      linkedin: 'https://linkedin.com/in/alex-rivera',
      github: 'https://github.com/alex-rivera',
    },
  },
  {
    id: 'team-002',
    name: 'Sam Chen',
    role: 'Co-Founder & Lab Director',
    bio: 'Researcher focused on materials science and computational design methods.',
    socials: {
      linkedin: 'https://linkedin.com/in/sam-chen',
      github: 'https://github.com/sam-chen',
    },
  },
  {
    id: 'team-003',
    name: 'Jordan Park',
    role: 'Community Lead',
    bio: 'Organizer and educator building bridges between makers and researchers.',
    socials: {
      linkedin: 'https://linkedin.com/in/jordan-park',
    },
  },
]
