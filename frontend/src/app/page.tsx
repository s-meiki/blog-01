import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { ThemeToggleButton } from '@/components/ThemeToggleButton'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: string) {
  return builder.image(source)
}

async function getPosts() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    "publishedAt": publishedAt,
    excerpt,
    mainImage
  }`)
  return posts
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto p-4">
      <header className="py-6 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-4xl font-bold">My Blog</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/search" className="text-blue-500 hover:underline">
            Search
          </Link>
          <ThemeToggleButton />
        </div>
      </header>
      <main>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {
            posts.map((post: { slug: { current: string }; mainImage: string; title: string; publishedAt: string; excerpt: string }) => (
              <Link
                key={post.slug.current}
                href={`/post/${post.slug.current}`}
                className="block bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors overflow-hidden"
              >
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).width(400).height(250).url()}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-400 mb-4">{new Date(post.publishedAt).toLocaleDateString()}</p>
                  <p className="text-gray-300">{post.excerpt}</p>
                </div>
              </Link>
            ))
          }
        </div>
      </main>
    </div>
  )
}
