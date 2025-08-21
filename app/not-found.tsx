import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold">ページが見つかりませんでした</h1>
      <p className="mt-2 text-gray-600">URLが正しいかご確認ください。</p>
      <div className="mt-6">
        <Link href="/" className="rounded bg-brand px-4 py-2 text-white">
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}

