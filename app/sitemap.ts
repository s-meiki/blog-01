import type { MetadataRoute } from 'next';
import { site } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/blog`, lastModified: now, priority: 0.9 },
    { url: `${base}/profile`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.6 }
  ];
}

