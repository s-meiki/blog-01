// Read Studio-safe envs first (exposed to Studio bundle), then fall back to server envs
const siteUrl = (
  process.env.SANITY_STUDIO_SITE_URL ||
  process.env.SITE_URL ||
  'http://localhost:3000'
).replace(/\/$/, '')

const previewSecret = (
  process.env.SANITY_STUDIO_PREVIEW_SECRET ||
  process.env.SANITY_PREVIEW_SECRET ||
  ''
);

export function resolveProductionUrl(doc: any) {
  const slug: string | undefined = doc?.slug?.current || undefined;
  if (doc?._type === 'post' && slug) return `${siteUrl}/blog/${slug}`;
  if (doc?._type === 'category' && slug) return `${siteUrl}/blog/category/${slug}`;
  if (doc?._type === 'tag' && slug) return `${siteUrl}/blog/tag/${slug}`;
  if (doc?._type === 'profile') return `${siteUrl}/profile`;
  return `${siteUrl}/`;
}

export function resolvePreviewUrl(doc: any) {
  const id: string | undefined = doc?._id || undefined
  const slug: string | undefined = doc?.slug?.current || undefined
  const url = new URL(`${siteUrl}/api/draft`)
  if (previewSecret) url.searchParams.set('secret', previewSecret)
  if (id) {
    url.searchParams.set('id', id)
  } else if (slug) {
    url.searchParams.set('slug', `/blog/${slug}`)
  } else {
    url.searchParams.set('slug', `/`)
  }
  const bypass =
    (process.env.SANITY_STUDIO_VERCEL_BYPASS_TOKEN as string | undefined) ||
    (process.env.VERCEL_BYPASS_TOKEN as string | undefined) ||
    ''
  if (bypass) {
    url.searchParams.set('x-vercel-protection-bypass', bypass)
    url.searchParams.set('x-vercel-set-bypass-cookie', 'true')
  }
  return url.toString();
}
