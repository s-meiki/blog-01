// Placeholder for Sanity client. Will switch to `next-sanity` during integration.
import { sanityConfig } from './config';

export function getSanityClient() {
  // In real integration, return `createClient(sanityConfig)`.
  return { config: sanityConfig } as const;
}

