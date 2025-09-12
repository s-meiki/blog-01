import type { MetadataRoute } from 'next';
import { site } from '@/lib/siteConfig';
import { sanityFetch } from '@/lib/sanity/client';
import {
  allSlugsQuery,
  allCategorySlugsQuery,
  allTagSlugsQuery,
  categoriesWithCountQuery,
  tagsWithCountQuery
} from '@/lib/sanity/queries';

const PAGE_SIZE = 9;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();

  // 既定の基本ページ
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/blog`, lastModified: now, priority: 0.9 },
    { url: `${base}/profile`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.6 }
  ];

  // Sanityから記事スラッグを取得
  try {
    const [postSlugs, categories, tags] = await Promise.all([
      sanityFetch<string[]>(allSlugsQuery, {}, 60),
      sanityFetch<Array<{ slug: string; count: number }>>(categoriesWithCountQuery, {}, 60),
      sanityFetch<Array<{ slug: string; count: number }>>(tagsWithCountQuery, {}, 60)
    ]);

    // 記事詳細ページ
    const slugs = postSlugs || [];
    for (const slug of slugs) {
      entries.push({ url: `${base}/blog/${slug}`, lastModified: now, priority: 0.8 });
    }

    // ブログ一覧のページネーション (/blog/page/2 以降)
    const blogTotalPages = Math.max(1, Math.ceil(slugs.length / PAGE_SIZE));
    for (let p = 2; p <= blogTotalPages; p++) {
      entries.push({ url: `${base}/blog/page/${p}`, lastModified: now, priority: 0.7 });
    }

    // カテゴリページ + ページネーション
    for (const c of categories || []) {
      const slug = c?.slug;
      if (!slug) continue;
      entries.push({ url: `${base}/blog/category/${slug}`, lastModified: now, priority: 0.7 });
      const totalPages = Math.max(1, Math.ceil((Number(c?.count) || 0) / PAGE_SIZE));
      for (let p = 2; p <= totalPages; p++) {
        entries.push({ url: `${base}/blog/category/${slug}/page/${p}`, lastModified: now, priority: 0.6 });
      }
    }

    // タグページ + ページネーション
    for (const t of tags || []) {
      const slug = t?.slug;
      if (!slug) continue;
      entries.push({ url: `${base}/blog/tag/${slug}`, lastModified: now, priority: 0.6 });
      const totalPages = Math.max(1, Math.ceil((Number(t?.count) || 0) / PAGE_SIZE));
      for (let p = 2; p <= totalPages; p++) {
        entries.push({ url: `${base}/blog/tag/${slug}/page/${p}`, lastModified: now, priority: 0.5 });
      }
    }
  } catch {
    // 接続不可時は基本ページのみ
  }

  return entries;
}
