import type { Metadata } from 'next';

export const metadata: Metadata = { title: '検索' };

export default function SearchPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">検索</h1>
      <p className="mt-2 text-gray-600">キーワードを入力して検索（雛形）。Sanity導入後に全文検索へ拡張。</p>
      <form className="mt-4 flex gap-2">
        <input
          type="search"
          name="q"
          placeholder="キーワード"
          className="w-full rounded border px-3 py-2"
          defaultValue=""
        />
        <button className="rounded bg-brand px-4 py-2 text-white">検索</button>
      </form>
      <div className="mt-6 text-sm text-gray-500">検索結果は今後実装。</div>
    </div>
  );
}

