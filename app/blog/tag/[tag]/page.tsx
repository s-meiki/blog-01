import type { Metadata } from 'next';

type Params = { params: { tag: string } };

export function generateMetadata({ params }: Params): Metadata {
  return { title: `タグ: ${params.tag}` };
}

export default function TagPage({ params }: Params) {
  return (
    <div>
      <h1 className="text-2xl font-bold">タグ: {params.tag}</h1>
      <p className="mt-2 text-gray-600">このタグに属する記事一覧（ダミー）。</p>
      <ul className="mt-6 list-disc pl-6">
        <li>記事 A</li>
        <li>記事 B</li>
        <li>記事 C</li>
      </ul>
    </div>
  );
}

