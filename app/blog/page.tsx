import Link from 'next/link';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/types/content';
import type { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity/client';
import { postsQuery } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'ブログ'
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  let posts: Post[] = [];
  try {
    posts = (await sanityFetch<Post[]>(postsQuery, {}, 60)) || [];
  } catch (e) {
    posts = [];
  }
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">ブログ</h1>
        <Link href="/search" className="text-sm underline">
          検索
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
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
