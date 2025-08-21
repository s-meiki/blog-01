import { createClient } from 'next-sanity'

// Use explicit values so Hosted Studio does not rely on Next.js env
const projectId = 'tgkpx8zk'
const dataset = 'production'
const apiVersion = '2025-08-20'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
