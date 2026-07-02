export interface NavItem {
  label: string
  href: string
  description?: string
}

export interface FabProject {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  imageUrl?: string
  href?: string
  featured?: boolean
}

export interface LabProject {
  id: string
  title: string
  description: string
  field: string
  tags: string[]
  imageUrl?: string
  href?: string
  featured?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  imageUrl?: string
  socials?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  ogImage: string
  links: {
    instagram?: string
    linkedin?: string
    github?: string
    whatsapp?: string
  }
}
