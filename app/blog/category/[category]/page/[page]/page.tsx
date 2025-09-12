import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/types/content';
import { sanityFetch } from '@/lib/sanity/client';
import { paginatedPostsByCategoryQuery } from '@/lib/sanity/queries';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/siteConfig';

export const revalidate = 60;

const PAGE_SIZE = 9;

type Params = { params: { category: string; page: string } };

export function generateMetadata({ params }: Params): Metadata {
  const n = Number(params.page) || 1;
  const title = `カテゴリー: ${params.category} - ページ ${n}`;
  const url = `${site.url.replace(/\/$/, '')}/blog/category/${params.category}/page/${n}`;
  return {
    title,
    openGraph: { type: 'website', url, title },
    twitter: { card: 'summary', title }
  };
}

export default async function CategoryPagedPage({ params }: Params) {
  const page = Math.max(1, Number(params.page) || 1);
  const offset = (page - 1) * PAGE_SIZE;
  const end = offset + PAGE_SIZE;

  let items: Post[] = [];
  let total = 0;
  try {
    const res = (await sanityFetch<{ total: number; items: Post[] }>(
      paginatedPostsByCategoryQuery,
      { slug: params.category, offset, end },
      60
    )) || { total: 0, items: [] };
    items = Array.isArray(res.items) ? res.items : [];
    total = Number(res.total) || 0;
  } catch {
    items = [];
    total = 0;
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if ((page > totalPages && total > 0) || page < 1) return notFound();

  const prevHref = page <= 2 ? `/blog/category/${params.category}` : `/blog/category/${params.category}/page/${page - 1}`;
  const nextHref = `/blog/category/${params.category}/page/${page + 1}`;

  return (
    <div>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `カテゴリー: ${params.category}`,
          itemListElement: items.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${site.url.replace(/\/$/, '')}/blog/${p.slug}`
          }))
        }}
      />
      <h1 className="text-2xl font-bold">カテゴリー: {params.category}</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
      <nav className="mt-8 flex items-center justify-center gap-4 text-sm" aria-label="pagination">
        <Link
          href={page > 1 ? prevHref : '#'}
          aria-disabled={page <= 1}
          className={`rounded border px-3 py-1 ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
        >
          前へ
        </Link>
        <span>
          {page} / {totalPages}
        </span>
        <Link
          href={page < totalPages ? nextHref : '#'}
          aria-disabled={page >= totalPages}
          className={`rounded border px-3 py-1 ${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
        >
          次へ
        </Link>
      </nav>
    </div>
  );
}

