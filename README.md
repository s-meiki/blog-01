# めいき氏 公式サイト & ブログ（Next.js + Tailwind + Sanity）

## セットアップ

1. 依存パッケージをインストール

```
pnpm i # または npm i / yarn
```

2. 開発サーバー起動

```
pnpm dev
```

3. 環境変数を設定

- `.env` を作成し、`.env.example` を参考に設定
- `NEXT_PUBLIC_GA_ID` は任意
- Sanityは後続フェーズで `next-sanity` を導入し、スキーマ/データ接続を行います

## 構成

- `app/` App Router構成（トップ/ブログ/記事/プロフィール/問い合わせ）
- `components/` ヘッダー/フッター/記事カード
- `lib/` サイト設定、GA、Sanity設定の雛形
- `types/` コンテンツ型定義

## 次のタスク（マイルストーン）

- Sanity プロジェクト作成とスキーマ定義（Post/Category/Tag/Profile）
- `next-sanity` 導入と GROQ クエリ実装（SSG/ISR）
- 検索ページとカテゴリ/タグのフィルタリング
- OGP/JSON-LDの拡充、sitemap自動生成
- Lighthouseでの継続的パフォーマンス確認

