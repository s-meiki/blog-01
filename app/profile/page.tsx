import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プロフィール'
};

export default function ProfilePage() {
  return (
    <article className="prose max-w-none">
      <h1>プロフィール</h1>
      <p>
        めいき氏の詳細プロフィール。経歴、スキルセット、価値観、提供できる価値について記載します。
      </p>
      <h2>経歴</h2>
      <ul>
        <li>20XX - 現在：フリーランス/プロダクト開発</li>
        <li>20XX - 20XX：Webエンジニア</li>
      </ul>
      <h2>スキル</h2>
      <ul>
        <li>フロントエンド：Next.js, React, TypeScript, Tailwind CSS</li>
        <li>バックエンド：Node.js, Edge Functions</li>
        <li>CMS：Sanity, Headless CMS設計</li>
      </ul>
      <h2>提供サービス</h2>
      <p>サイト構築/改善、技術選定、情報発信の仕組み化などをご支援します。</p>
    </article>
  );
}

