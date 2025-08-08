import { draftMode } from 'next/headers'
import { client } from '@/sanity/client'
import PostPage from './PostPage'
import PostPreview from './PostPreview'
import { PostType } from '@/types/PostType'

interface PageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const post: PostType = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug },
  )
  return post
}

export default async function Page({ params }: PageProps) {
  const post = await getPost(params.slug)
  const isDraftMode = draftMode().isEnabled

  if (isDraftMode) {
    return <PostPreview post={post} />
  }

  return <PostPage post={post} />
}

