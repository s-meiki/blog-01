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

-- Sanity プロジェクト作成とスキーマ定義（Post/Category/Tag/Profile）→ 実装済（Studioは `/studio`）
-- `next-sanity` 導入と GROQ クエリ実装（SSG/ISR）→ 実装済（60秒ISR）
-- 検索ページとカテゴリ/タグのフィルタリング → Sanity連携に差し替え予定
-- OGP/JSON-LDの拡充、sitemap自動生成
-- Lighthouseでの継続的パフォーマンス確認

## Sanity 導入メモ

1) 依存をインストール

```
pnpm i next-sanity sanity @sanity/image-url @portabletext/react groq
```

2) プロジェクトIDとDatasetを設定（Vercel環境変数にも同様にセット）

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
NEXT_PUBLIC_SANITY_DATASET=production
```

3) Studio を起動（ローカル）

```
pnpm dev  # /studio にアクセス
```

4) ドキュメント作成
- Post / Category / Tag / Profile を作成
- Post: title, slug, excerpt, coverImage, publishedAt, content など

5) データ反映
- トップ/ブログ一覧/記事ページがSanityデータを反映（ISR 60秒）

6) Webhook (任意)
- `SANITY_WEBHOOK_SECRET` を設定し、Sanity Webhook → `/api/revalidate` にPOSTで連携
  - 推奨: URLに `?secret=YOUR_SECRET` を付ける or ヘッダ `X-Sanity-Signature: YOUR_SECRET`
  - Payload: デフォルトの `documentId` または `ids.updated/created/deleted` に対応
  - Revalidate対象: `/`, `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/blog/tag/[slug]`, `/profile`

### Sanity CLI スクリプト（package.json）

- `pnpm sanity` … Sanity CLI ヘルプ
- `pnpm sanity:login` … Sanity ログイン
- `pnpm sanity:init` … プロジェクト初期化（既存 `sanity.config.ts` を選択）
- `pnpm sanity:deploy` … Studio を Sanity Hosted にデプロイ
- `pnpm sanity:whoami` … ログイン確認
- `pnpm sanity:datasets` … データセット一覧
