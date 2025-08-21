"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold">エラーが発生しました</h1>
      <p className="mt-2 text-gray-600">時間をおいて再度お試しください。</p>
      <div className="mt-6">
        <button onClick={() => reset()} className="rounded border px-4 py-2">
          再読み込み
        </button>
      </div>
      <pre className="mt-6 text-left text-xs text-red-600 container overflow-auto">{String(error?.message || '')}</pre>
    </div>
  );
}

