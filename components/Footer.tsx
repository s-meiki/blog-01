import { site } from '@/lib/siteConfig';

export function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200">
      <div className="container py-6 text-sm text-gray-600">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.copyright}</p>
          <div className="flex gap-4">
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href="/sitemap.xml">サイトマップ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

