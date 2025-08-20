import { createClient } from 'next-sanity';
import { sanityConfig } from './config';

export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  stega: false
});

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>, revalidateSeconds = 60) {
  const hasProject = Boolean(sanityConfig.projectId);
  if (!hasProject) return null as unknown as T; // 未設定時はnullで返す
  return sanityClient.fetch<T>(query, params, { next: { revalidate: revalidateSeconds } });
}

