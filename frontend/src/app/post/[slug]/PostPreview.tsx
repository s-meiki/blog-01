'use client'

import { PostPage } from './PostPage'
import { PostType } from '@/types/PostType'

export function PostPreview({ post: initialPost }: { post: PostType }) {
  // Live preview functionality is temporarily disabled to resolve build errors.
  // If live preview is required, please refer to the latest Sanity documentation for Next.js 15.
  const post = initialPost

  return <PostPage post={post} />
}
