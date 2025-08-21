
// Sanity Studio configuration for Hosted Studio deployment

/**
 * This configuration is used for the Sanity Studio (Hosted Studio).
 * Deploy with: `pnpm sanity:deploy`
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes/index'
import structure from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision plugin is optional. It was causing a version mismatch with the installed `sanity`.
    // If needed, add `import {visionTool} from '@sanity/vision'` and include it here.
  ],
})
