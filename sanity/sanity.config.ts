import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {resolveProductionUrl} from './resolve-production-url'

export default defineConfig({
  name: 'default',
  title: 'meiki_blog',

  projectId: '78yfqhvs',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      resolve: {
        previewUrl: resolveProductionUrl,
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
