import Link from 'next/link'
import { client } from '@/sanity/client'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getPost(slug: string) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title,
    "publishedAt": publishedAt,
    body,
    mainImage
  }`, { slug })
  return post
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; 記事一覧へ戻る
      </Link>
      <main>
        <article className="prose lg:prose-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(800).url()}
              alt={post.title}
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
