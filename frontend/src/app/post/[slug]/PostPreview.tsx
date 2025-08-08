'use client'

import { useLiveQuery } from 'next-sanity/preview'

import PostPage from './PostPage'
import { PostType } from '@/types/PostType'

export default function PostPreview({ post }: { post: PostType }) {
  const [data] = useLiveQuery(post, `*[_type == "post" && slug.current == $slug][0]`, {
    slug: post.slug.current,
  })

  return <PostPage post={data} />
}