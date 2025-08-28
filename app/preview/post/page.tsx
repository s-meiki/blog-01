import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/client'
import { postByIdQuery } from '@/lib/sanity/queries'
import { RichText } from '@/components/RichText'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PreviewPostPage({ searchParams }: { searchParams?: { id?: string } }) {
  const id = searchParams?.id || ''
  if (!id) return notFound()
  const post = await sanityFetch<any>(postByIdQuery, { id }, 0)
  if (!post) return notFound()

  return (
    <article className="prose max-w-none">
      <nav aria-label="breadcrumb" className="mb-4 text-sm">
        <Link href="/">ホーム</Link> / <Link href="/blog">ブログ</Link> /
        <span className="text-gray-600"> {post.title}</span>
      </nav>
      <h1 className="mb-2">{post.title}</h1>
      <p className="!mt-0 text-sm text-gray-500">
        プレビュー（下書きを含む）。公開URL: {post.slug ? `/blog/${post.slug}` : '未設定'}
      </p>
      <div className="mt-6">
        <RichText value={post.content} />
      </div>
    </article>
  )
}

