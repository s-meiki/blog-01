export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-20'

// Provide safe defaults so Hosted Studio doesn't depend on Next.js envs
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tgkpx8zk'
