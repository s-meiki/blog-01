'use client'

import { PostPreview } from './PostPreview'
import { PostPage } from './PostPage'
import { PostType } from '@/types/PostType'

export default function Post({ post, isDraftMode }: { post: PostType, isDraftMode: boolean }) {
  // Live preview functionality is temporarily disabled to resolve build errors.
  // If live preview is required, please refer to the latest Sanity documentation for Next.js 15.
  if (isDraftMode) {
    return <PostPreview post={post} />
  }
  return <PostPage post={post} />
}
