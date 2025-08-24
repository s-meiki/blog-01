import { defineCliConfig } from 'sanity/cli'

// Use env when available, and fall back to the main project defaults
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tgkpx8zk'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
