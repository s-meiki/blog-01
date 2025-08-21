import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { searchPostsQuery } from '@/lib/sanity/queries';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/types/content';

export const metadata: Metadata = { title: '検索' };

export const revalidate = 0;

function toMatchQuery(q: string) {
  // GROQ match uses wildcards. Allow partial matches, split by whitespace.
  const parts = q.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  // Join with space so any term may match
  return parts.map((p) => `*${p}*`).join(' ');
}

export default async function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = (searchParams?.q || '').trim();

  let results: Post[] = [];
  if (q) {
    const match = toMatchQuery(q);
    if (match) {
      try {
        results = (await sanityFetch<Post[]>(searchPostsQuery, { q: match }, 0)) || [];
      } catch (e) {
        results = [];
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">検索</h1>
      <form className="mt-4 flex gap-2" action="/search">
        <input
          type="search"
          name="q"
          placeholder="キーワード"
          className="w-full rounded border px-3 py-2"
          defaultValue={q}
        />
        <button className="rounded bg-brand px-4 py-2 text-white">検索</button>
      </form>

      {!q ? (
        <p className="mt-6 text-sm text-gray-500">キーワードを入力して検索してください。</p>
      ) : (
        <div className="mt-6">
          <div className="text-sm text-gray-600">{results.length} 件ヒット</div>
          {results.length === 0 ? (
            <p className="mt-2 text-sm">該当する記事は見つかりませんでした。</p>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
