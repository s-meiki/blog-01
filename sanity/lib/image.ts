import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Explicit values for Hosted Studio
const projectId = 'tgkpx8zk'
const dataset = 'production'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => builder.image(source)
