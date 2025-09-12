import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/types/content';
import { sanityFetch } from '@/lib/sanity/client';
import { paginatedPostsByTagQuery } from '@/lib/sanity/queries';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/siteConfig';

type Params = { params: { tag: string } };

export function generateMetadata({ params }: Params): Metadata {
  const title = `タグ: ${params.tag}`;
  const url = `${site.url.replace(/\/$/, '')}/blog/tag/${params.tag}`;
  return {
    title,
    openGraph: { type: 'website', url, title },
    twitter: { card: 'summary', title }
  };
}

export const revalidate = 60;

const PAGE_SIZE = 9;

export default async function TagPage({ params }: Params) {
  const page = 1;
  const offset = (page - 1) * PAGE_SIZE;
  const end = offset + PAGE_SIZE;

  let items: Post[] = [];
  let total = 0;
  try {
    const res = (await sanityFetch<{ total: number; items: Post[] }>(
      paginatedPostsByTagQuery,
      { slug: params.tag, offset, end },
      60
    )) || { total: 0, items: [] };
    items = Array.isArray(res.items) ? res.items : [];
    total = Number(res.total) || 0;
  } catch {
    items = [];
    total = 0;
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > totalPages && total > 0) return notFound();

  return (
    <div>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `タグ: ${params.tag}`,
          itemListElement: items.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${site.url.replace(/\/$/, '')}/blog/${p.slug}`
          }))
        }}
      />
      <h1 className="text-2xl font-bold">タグ: {params.tag}</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
      <nav className="mt-8 flex items-center justify-center gap-4 text-sm" aria-label="pagination">
        <Link
          href="#"
          aria-disabled
          className="rounded border px-3 py-1 pointer-events-none opacity-50"
        >
          前へ
        </Link>
        <span>
          {page} / {totalPages}
        </span>
        <Link
          href={totalPages > 1 ? `/blog/tag/${params.tag}/page/2` : '#'}
          aria-disabled={totalPages <= 1}
          className={`rounded border px-3 py-1 ${totalPages <= 1 ? 'pointer-events-none opacity-50' : ''}`}
        >
          次へ
        </Link>
      </nav>
    </div>
  );
}
