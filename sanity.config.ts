
// Sanity Studio configuration for Hosted Studio deployment

/**
 * This configuration is used for the Sanity Studio (Hosted Studio).
 * Deploy with: `pnpm sanity:deploy`
 */

import {defineConfig} from 'sanity'

import {schema} from './sanity/schemaTypes/index'

export default defineConfig({
  // Hosted Studio config (independent of Next.js env).
  // It is safe to keep these public values here.
  projectId: 'tgkpx8zk',
  dataset: 'production',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [],
})
