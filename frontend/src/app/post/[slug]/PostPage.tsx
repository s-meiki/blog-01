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

export function PostPage({ post }: { post: PostType }) {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; 記事一覧へ戻る
      </Link>
      <main>
        <article className="prose lg:prose-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).width(800).url()}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover rounded-lg mb-8"
            />
          )}
          <h1 className="text-white">{post.title}</h1>
          <p className="text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
          <div className="text-gray-300">
            <PortableText value={post.body} />
          </div>
        </article>
      </main>
    </div>
  )
}
