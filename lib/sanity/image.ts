import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { sanityConfig } from './config';

const builder = createImageUrlBuilder({ projectId: sanityConfig.projectId, dataset: sanityConfig.dataset });

export function urlForImage(source: Image | any) {
  return builder.image(source);
}

