import type { Metadata } from 'next';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/types/content';
import { sanityFetch } from '@/lib/sanity/client';
import { postsByCategoryQuery } from '@/lib/sanity/queries';

type Params = { params: { category: string } };

export function generateMetadata({ params }: Params): Metadata {
  return { title: `カテゴリー: ${params.category}` };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: Params) {
  const posts = (await sanityFetch<Post[]>(postsByCategoryQuery, { slug: params.category }, 60)) || [];
  return (
    <div>
      <h1 className="text-2xl font-bold">カテゴリー: {params.category}</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
