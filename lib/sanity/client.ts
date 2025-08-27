import { createClient, type ClientConfig } from 'next-sanity';
import { draftMode } from 'next/headers';
import { sanityConfig } from './config';

let _client: ReturnType<typeof createClient> | null = null;
let _clientPreview: ReturnType<typeof createClient> | null = null;

function buildConfig(): ClientConfig | null {
  const { projectId, dataset, apiVersion, useCdn } = sanityConfig;
  if (!projectId || !dataset) return null;
  return { projectId, dataset, apiVersion, useCdn, stega: false } as const;
}

export function getSanityClient(preview = false) {
  if (preview) {
    if (_clientPreview) return _clientPreview;
    const cfg = buildConfig();
    const token = process.env.SANITY_API_READ_TOKEN;
    if (!cfg || !token) return null;
    _clientPreview = createClient({ ...cfg, useCdn: false, token, perspective: 'previewDrafts' as any });
    return _clientPreview;
  }
  if (_client) return _client;
  const cfg = buildConfig();
  if (!cfg) return null;
  _client = createClient(cfg);
  return _client;
}

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>, revalidateSeconds = 60) {
  let previewEnabled = false;
  try {
    previewEnabled = draftMode().isEnabled;
  } catch {}
  const client = getSanityClient(previewEnabled);
  if (!client) return null as unknown as T; // 未設定時はnullで返す
  try {
    const fetchOptions = previewEnabled
      ? ({ cache: 'no-store' } as const)
      : ({ next: { revalidate: revalidateSeconds } } as const);
    return await client.fetch<T>(query, params ?? {}, fetchOptions as any);
  } catch (e) {
    // ビルド/CIなどネットワーク不可の環境や一時的障害時はnullで握りつぶす
    return null as unknown as T;
  }
}
