import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types/content';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
      {post.coverImage ? (
        <div className="relative aspect-[16/9]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/blog/${post.slug}`} className="group-hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.excerpt ? <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p> : null}
        <div className="mt-3 text-xs text-gray-500">
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</time>
        </div>
      </div>
    </article>
  );
}

