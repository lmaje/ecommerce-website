import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'
import { BLOG_POSTS } from '@/lib/blog-posts'

const BASE = 'https://bakhtarmarket.co.uk'
const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,         lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/shop`,     lastModified: NOW, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/about`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,     lastModified: NOW, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/account`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/cart`,     lastModified: NOW, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${BASE}/checkout`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.2 },
  ]

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map(p => ({
    url: `${BASE}/shop/${p.id}`,
    lastModified: NOW,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...blogRoutes]
}
