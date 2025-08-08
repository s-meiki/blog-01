import { draftMode } from 'next/headers'
import { client } from '@/sanity/client'
import Post from './Post'
import { PostType } from '@/types/PostType'

interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Promise<any>; // Next.js expects params as a Promise<any> in async server components
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: Promise<any>;
}

async function getPost(slug: string) {
  const post: PostType = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title,
    "publishedAt": publishedAt,
    body,
    mainImage
  }`, { slug })
  return post
}

export default async function PostPage({ params }: PageProps) {
  const typedParams = (await params) as { slug: string };
  const post = await getPost(typedParams.slug)
  const isDraftMode = (await draftMode()).isEnabled

  return <Post post={post} isDraftMode={isDraftMode} />
}

