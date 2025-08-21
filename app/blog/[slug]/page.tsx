import type { Metadata } from 'next';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity/client';
import { allSlugsQuery, postBySlugQuery } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/RichText';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/siteConfig';

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = (await sanityFetch<string[]>(allSlugsQuery, {}, 60)) || [];
  return slugs.slice(0, 50).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await sanityFetch<any>(postBySlugQuery, { slug: params.slug }, 60);
  if (!post) return { title: params.slug };
  return { title: post.title, description: post.excerpt };
}

export const revalidate = 60;

function extractHeadingsFromBlocks(blocks: any[]) {
  if (!Array.isArray(blocks)) return [] as { level: number; text: string; id: string }[];
  return blocks
    .filter((b) => b._type === 'block' && /^h[1-3]$/.test(b.style || ''))
    .map((b) => {
      const level = Number((b.style || 'h2').replace('h', '')) || 2;
      const text = (b.children || []).map((c: any) => c.text).join('');
      const id = text.toLowerCase().replace(/\s+/g, '-');
      return { level, text, id };
    });
}

export default async function BlogPostPage({ params }: Params) {
  const post = await sanityFetch<any>(postBySlugQuery, { slug: params.slug }, 60);
  if (!post) return notFound();
  const headings = extractHeadingsFromBlocks(post.content);
  return (
    <article className="prose max-w-none">
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt || post.publishedAt,
          author: { '@type': 'Person', name: site.author },
          mainEntityOfPage: `${site.url.replace(/\/$/, '')}/blog/${post.slug}`,
          image: post.coverImage ? [post.coverImage] : undefined,
          keywords: Array.isArray(post.tags) ? post.tags.map((t: any) => t.title) : undefined,
          articleSection: Array.isArray(post.categories)
            ? post.categories.map((c: any) => c.title)
            : undefined
        }}
      />
      <nav aria-label="breadcrumb" className="mb-4 text-sm">
        <Link href="/">ホーム</Link> / <Link href="/blog">ブログ</Link> /
        <span className="text-gray-600"> {post.title}</span>
      </nav>
      <h1 className="mb-2">{post.title}</h1>
      <p className="!mt-0 text-sm text-gray-500">
        公開日: {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ja-JP') : '-'}
      </p>

      <aside className="toc not-prose mt-6 rounded-lg border p-4">
        <div className="font-semibold text-sm text-gray-700">目次</div>
        <ul className="mt-2">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 1 ? '' : h.level === 2 ? 'lvl-2' : 'lvl-3'}>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ul>
      </aside>

      <div className="mt-6">
        <RichText value={post.content} />
      </div>

      <div className="not-prose mt-8 flex gap-3 text-sm">
        <a
          className="rounded border px-3 py-1"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://example.com/blog/' + params.slug)}`}
          target="_blank"
          rel="noreferrer"
        >
          Xでシェア
        </a>
        <a
          className="rounded border px-3 py-1"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://example.com/blog/' + params.slug)}`}
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
        <a
          className="rounded border px-3 py-1"
          href={`https://b.hatena.ne.jp/entry/s/${'example.com/blog/' + params.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          はてブ
        </a>
      </div>
    </article>
  );
}
