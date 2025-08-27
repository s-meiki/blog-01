
// Sanity Studio configuration for Hosted Studio deployment

/**
 * This configuration is used for the Sanity Studio (Hosted Studio).
 * Deploy with: `pnpm sanity:deploy`
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

import {schema} from './sanity/schemaTypes/index'
import { resolveProductionUrl } from './sanity/resolve-production-url'
import { viewOnSiteAction } from './sanity/view-on-site-action'
import { viewDraftPreviewAction } from './sanity/view-draft-preview-action'
import structure, { defaultDocumentNode } from './sanity/structure'

export default defineConfig({
  // Hosted Studio config (independent of Next.js env).
  // It is safe to keep these public values here.
  projectId: 'tgkpx8zk',
  dataset: 'production',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [deskTool({ structure, defaultDocumentNode }), visionTool({ defaultApiVersion: '2024-08-01' })],
  document: {
    // Show "Open preview" in the post editor to view the published page
    productionUrl: async (prev, { document }) => resolveProductionUrl(document),
    actions: (prev, ctx) => {
      if (ctx.schemaType === 'post') {
        return [...prev, viewOnSiteAction, viewDraftPreviewAction]
      }
      return prev
    },
  },
})
