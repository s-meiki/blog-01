import Link from 'next/link';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/types/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ブログ'
};

const mockPosts: Post[] = Array.from({ length: 9 }).map((_, i) => ({
  _id: `p${i}`,
  title: `ダミー記事 ${i + 1}`,
  slug: `dummy-${i + 1}`,
  excerpt: 'カテゴリ/タグ/検索などは今後Sanity連携で実装。',
  publishedAt: new Date().toISOString()
}));

export default function BlogIndexPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">ブログ</h1>
        <Link href="/search" className="text-sm underline">
          検索
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4 text-sm">
        <button className="rounded border px-3 py-1" disabled>
          前へ
        </button>
        <button className="rounded border px-3 py-1">次へ</button>
      </div>
    </div>
  );
}

