const siteUrl = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export function resolveProductionUrl(doc: any) {
  const slug: string | undefined = doc?.slug?.current || undefined;
  if (doc?._type === 'post' && slug) return `${siteUrl}/blog/${slug}`;
  if (doc?._type === 'category' && slug) return `${siteUrl}/blog/category/${slug}`;
  if (doc?._type === 'tag' && slug) return `${siteUrl}/blog/tag/${slug}`;
  if (doc?._type === 'profile') return `${siteUrl}/profile`;
  return `${siteUrl}/`;
}
