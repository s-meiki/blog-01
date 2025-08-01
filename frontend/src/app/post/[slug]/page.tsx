import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

async function getPost(slug: string) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    publishedAt,
  }`, { slug })
  return post
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <article className="prose lg:prose-xl mx-auto p-4">
      <h1>{post.title}</h1>
      <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(800).height(400).url()}
          alt={post.title}
          width={800}
          height={400}
        />
      )}
      <PortableText value={post.body} />
    </article>
  )
}
