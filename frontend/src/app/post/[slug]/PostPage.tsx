'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'

import { PostType } from '@/types/PostType'

const builder = imageUrlBuilder(client)

function urlFor(source: string) {
  return builder.image(source)
}

import { PostType } from '@/types/PostType'

export default function PostPage({ post }: { post: PostType }) {
  return (
    <article>
      <h1>{post.title}</h1>
      {/* Render the rest of the post content */}
    </article>
  )
}
