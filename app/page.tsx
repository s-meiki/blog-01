import Link from 'next/link';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/types/content';

const mockPosts: Post[] = [
  {
    _id: '1',
    title: '初投稿：サイト立ち上げの背景と技術選定',
    slug: 'hello-world',
    excerpt: 'Next.js + Tailwind + Sanityで構築する理由と進め方。',
    publishedAt: new Date().toISOString(),
    coverImage: 'https://images.unsplash.com/photo-1527443224154-c4f2a9f2c751?q=80&w=1600&auto=format&fit=crop'
  },
  {
    _id: '2',
    title: '運用方針：更新頻度・カテゴリ設計・SEOの考え方',
    slug: 'operations-and-seo',
    excerpt: 'サイトを資産化するための運用ガイドライン。',
    publishedAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'SSG/ISRで高速＆柔軟なブログを作る',
    slug: 'ssg-isr-best-practices',
    excerpt: 'Incremental Static Regenerationの活用ポイントまとめ。',
    publishedAt: new Date().toISOString()
  }
];

export default function HomePage() {
  return (
    <>
      <section className="py-10">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              自分らしく創る。<br />
              価値を届ける。
            </h1>
            <p className="mt-4 text-gray-600">
              めいき氏の公式サイト兼ブログ。開発・戦略・キャリアについて発信します。
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/blog" className="rounded bg-brand px-4 py-2 text-white">
                ブログを読む
              </Link>
              <Link href="/profile" className="rounded border px-4 py-2">
                プロフィール
              </Link>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-brand/10 to-brand-light p-6">
            <ul className="grid grid-cols-2 gap-4 text-center">
              <li>
                <div className="text-3xl font-bold">10+</div>
                <div className="text-xs text-gray-600">年の経験</div>
              </li>
              <li>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-xs text-gray-600">案件実績</div>
              </li>
              <li>
                <div className="text-3xl font-bold">90+</div>
                <div className="text-xs text-gray-600">Lighthouseスコア</div>
              </li>
              <li>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-xs text-gray-600">モバイル対応</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-xl font-semibold">最新記事</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockPosts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-xl font-semibold">SNS</h2>
        <div className="mt-3 flex gap-4 text-sm">
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="underline">
            X(Twitter)
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="underline">
            Instagram
          </a>
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-xl font-semibold">お問い合わせ</h2>
        <p className="mt-2 text-gray-600">
          まずはメールまたは各SNSのDMからご連絡ください。
          <br />
          <a href="mailto:hello@example.com" className="underline">
            hello@example.com
          </a>
        </p>
      </section>
    </>
  );
}

