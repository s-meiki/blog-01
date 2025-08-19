import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold">
          めいき氏
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/">ホーム</Link>
          <Link href="/blog">ブログ</Link>
          <Link href="/profile">プロフィール</Link>
          <Link href="/contact">お問い合わせ</Link>
        </nav>
      </div>
    </header>
  );
}

