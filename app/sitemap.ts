import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number }> = [
    { path: '',                    priority: 1.0 },
    { path: '/fab',                priority: 0.9 },
    { path: '/lab',                priority: 0.9 },
    { path: '/our-story',          priority: 0.8 },
    { path: '/contact',            priority: 0.8 },
    { path: '/shop',               priority: 0.7 },
    { path: '/privacy-policy',     priority: 0.3 },
    { path: '/terms-and-conditions', priority: 0.3 },
  ]

  return routes.map(({ path, priority }) => ({
    url:             `${siteConfig.url}${path}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))
}
