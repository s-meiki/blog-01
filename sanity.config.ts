
// Sanity Studio configuration for Hosted Studio deployment

/**
 * This configuration is used for the Sanity Studio (Hosted Studio).
 * Deploy with: `pnpm sanity:deploy`
 */

import {defineConfig} from 'sanity'
// No extra plugins for Hosted Studio to minimize version mismatches

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes/index'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [],
})
