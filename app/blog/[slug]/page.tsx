import type { Metadata } from 'next';
import Link from 'next/link';

type Params = { params: { slug: string } };

export function generateMetadata({ params }: Params): Metadata {
  return {
    title: `記事: ${params.slug}`
  };
}

const mockContent = `
# 見出し1
本文セクション。ブログ本文はSanityから取得して表示します。

## 見出し2-1
本文セクション。

## 見出し2-2
本文セクション。

### 見出し3
本文セクション。
`;

function extractHeadings(md: string) {
  return md
    .split('\n')
    .filter((l) => /^#{1,3}\s/.test(l))
    .map((l) => {
      const level = l.match(/^#+/)?.[0].length ?? 1;
      const text = l.replace(/^#{1,3}\s*/, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９\s-]/g, '')
        .replace(/\s+/g, '-');
      return { level, text, id } as const;
    });
}

export default function BlogPostPage({ params }: Params) {
  const headings = extractHeadings(mockContent);
  return (
    <article className="prose max-w-none">
      <nav aria-label="breadcrumb" className="mb-4 text-sm">
        <Link href="/">ホーム</Link> / <Link href="/blog">ブログ</Link> /
        <span className="text-gray-600"> {params.slug}</span>
      </nav>
      <h1 className="mb-2">{params.slug}</h1>
      <p className="!mt-0 text-sm text-gray-500">
        公開日: {new Date().toLocaleDateString('ja-JP')}
      </p>

      <aside className="not-prose mt-6 rounded-lg border p-4">
        <div className="font-semibold">目次</div>
        <ul className="mt-2 space-y-1 text-sm">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 1 ? '' : h.level === 2 ? 'pl-3' : 'pl-6'}>
              <a href={`#${h.id}`} className="underline">
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <div className="mt-6">
        {mockContent.split('\n').map((line, i) => {
          if (/^###\s/.test(line)) {
            const text = line.replace(/^###\s*/, '');
            const id = text.toLowerCase().replace(/\s+/g, '-');
            return (
              <h3 key={i} id={id}>
                {text}
              </h3>
            );
          }
          if (/^##\s/.test(line)) {
            const text = line.replace(/^##\s*/, '');
            const id = text.toLowerCase().replace(/\s+/g, '-');
            return (
              <h2 key={i} id={id}>
                {text}
              </h2>
            );
          }
          if (/^#\s/.test(line)) {
            const text = line.replace(/^#\s*/, '');
            const id = text.toLowerCase().replace(/\s+/g, '-');
            return (
              <h1 key={i} id={id}>
                {text}
              </h1>
            );
          }
          return <p key={i}>{line}</p>;
        })}
      </div>

      <div className="not-prose mt-8 flex gap-3 text-sm">
        <a
          className="rounded border px-3 py-1"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://example.com/blog/' + params.slug)}`}
          target="_blank"
          rel="noreferrer"
        >
          Xでシェア
        </a>
        <a
          className="rounded border px-3 py-1"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://example.com/blog/' + params.slug)}`}
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
        <a
          className="rounded border px-3 py-1"
          href={`https://b.hatena.ne.jp/entry/s/${'example.com/blog/' + params.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          はてブ
        </a>
      </div>
    </article>
  );
}

