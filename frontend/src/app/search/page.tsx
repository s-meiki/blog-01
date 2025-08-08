'use client'

import { useState } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/client'

interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
}

export default function SearchPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState('')

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query) return

    const result = await client.fetch(
      `*[_type == "post" && (title match $query || excerpt match $query || body match $query)] | order(publishedAt desc) {
        title,
        slug,
        "publishedAt": publishedAt,
        excerpt
      }`,
      { query: `*${query}*` } as Record<string, string>
    )
    setPosts(result)
  }

  return (
    <div className="container mx-auto p-4">
      <header className="py-6">
        <h1 className="text-4xl font-bold">Search Posts</h1>
      </header>
      <main>
        <form onSubmit={handleSearch} className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, excerpt, or body..."
            className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <button type="submit" className="mt-2 p-2 rounded-md bg-blue-500 text-white">
            Search
          </button>
        </form>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <Link
              key={post.slug.current}
              href={`/post/${post.slug.current}`}
              className="block p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-400 mb-4">{new Date(post.publishedAt).toLocaleDateString()}</p>
              <p className="text-gray-300">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
