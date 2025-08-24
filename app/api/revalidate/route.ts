import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSanityClient } from '@/lib/sanity/client';

function getSecret(req: NextRequest) {
  const headerSig = req.headers.get('x-sanity-signature') || req.headers.get('X-Sanity-Signature');
  const url = new URL(req.url);
  const qsSecret = url.searchParams.get('secret');
  return headerSig || qsSecret;
}

async function getDocInfoById(id: string) {
  const query = `
    *[_id == $id][0]{
      _type,
      'slug': select(_type == 'post' => slug.current, _type == 'category' => slug.current, _type == 'tag' => slug.current, null),
      // for posts, also fetch category/tag slugs
      'catSlugs': select(_type == 'post' => categories[]->slug.current, null),
      'tagSlugs': select(_type == 'post' => tags[]->slug.current, null)
    }
  `;
  const client = getSanityClient();
  if (!client) return null;
  try {
    return await client.fetch(query, { id });
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (secret) {
    const provided = getSecret(req);
    if (provided !== secret) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }
  }
  try {
    const body = await req.json().catch(() => ({}));

    const ids: string[] = [];
    if (typeof body?._id === 'string') ids.push(body._id);
    if (typeof body?.documentId === 'string') ids.push(body.documentId);
    const created = body?.ids?.created || [];
    const updated = body?.ids?.updated || [];
    const deleted = body?.ids?.deleted || [];
    [...created, ...updated, ...deleted].forEach((id: any) => typeof id === 'string' && ids.push(id));

    const paths = new Set<string>();
    // Always revalidate top-level pages
    paths.add('/');
    paths.add('/blog');

    // Try to resolve document-specific paths
    const client = getSanityClient();
    for (const id of ids) {
      const info = client ? await getDocInfoById(id) : null;
      if (!info) continue;
      if (info._type === 'post' && info.slug) {
        paths.add(`/blog/${info.slug}`);
        const catSlugs: string[] = Array.isArray(info.catSlugs) ? info.catSlugs : [];
        const tagSlugs: string[] = Array.isArray(info.tagSlugs) ? info.tagSlugs : [];
        catSlugs.filter(Boolean).forEach((s) => paths.add(`/blog/category/${s}`));
        tagSlugs.filter(Boolean).forEach((s) => paths.add(`/blog/tag/${s}`));
      } else if (info._type === 'category' && info.slug) {
        paths.add(`/blog/category/${info.slug}`);
      } else if (info._type === 'tag' && info.slug) {
        paths.add(`/blog/tag/${info.slug}`);
      } else if (info._type === 'profile') {
        paths.add('/profile');
      }
    }

    paths.forEach((p) => revalidatePath(p));

    return NextResponse.json({ revalidated: true, paths: Array.from(paths) });
  } catch (e) {
    return NextResponse.json({ revalidated: false, error: String(e) }, { status: 500 });
  }
}
