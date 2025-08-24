import { createClient, type ClientConfig } from 'next-sanity';
import { sanityConfig } from './config';

let _client: ReturnType<typeof createClient> | null = null;

function buildConfig(): ClientConfig | null {
  const { projectId, dataset, apiVersion, useCdn } = sanityConfig;
  if (!projectId || !dataset) return null;
  return { projectId, dataset, apiVersion, useCdn, stega: false } as const;
}

export function getSanityClient() {
  if (_client) return _client;
  const cfg = buildConfig();
  if (!cfg) return null;
  _client = createClient(cfg);
  return _client;
}

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>, revalidateSeconds = 60) {
  const client = getSanityClient();
  if (!client) return null as unknown as T; // 未設定時はnullで返す
  try {
    return await client.fetch<T>(query, params ?? {}, { next: { revalidate: revalidateSeconds } });
  } catch (e) {
    // ビルド/CIなどネットワーク不可の環境や一時的障害時はnullで握りつぶす
    return null as unknown as T;
  }
}
