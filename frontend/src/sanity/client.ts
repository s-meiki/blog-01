import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '78yfqhvs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
