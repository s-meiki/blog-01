import type { Metadata } from 'next';

type Params = { params: { category: string } };

export function generateMetadata({ params }: Params): Metadata {
  return { title: `カテゴリー: ${params.category}` };
}

export default function CategoryPage({ params }: Params) {
  return (
    <div>
      <h1 className="text-2xl font-bold">カテゴリー: {params.category}</h1>
      <p className="mt-2 text-gray-600">このカテゴリーに属する記事一覧（ダミー）。</p>
      <ul className="mt-6 list-disc pl-6">
        <li>記事 1</li>
        <li>記事 2</li>
        <li>記事 3</li>
      </ul>
    </div>
  );
}

