# めいき氏 公式サイト & ブログ（Next.js + Tailwind + Sanity）

管理画面（Hosted Studio）: https://your-project.sanity.studio

※ 上記URLは `pnpm sanity:deploy` 実行後に発行される実URLへ置き換えてください（`.env.local` の `SANITY_STUDIO_URL` にも保存推奨）。

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

3) Studio（管理画面）

- 推奨: Hosted Studio を利用（本サイトとは別URL）

```
pnpm sanity:login   # 初回のみ
pnpm sanity:deploy  # StudioをSanityにデプロイ → URL発行
```

- 以降は発行されたURLから管理（記事/カテゴリ/タグ/プロフィールの作成・編集）

4) Studio URL を記録（任意）

- `.env.local` に発行されたURLを記録しておくとチーム共有が容易です。

```
SANITY_STUDIO_URL=https://<your-project>.sanity.studio
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
  - 手順の目安:
    - URL作成: `pnpm webhook:url`（ローカル/本番URLを表示。引数で本番ベースURL可: `pnpm webhook:url -- https://your.site`）
    - 管理画面: Sanity Manage → Project → Webhooks → Add webhook
      - HTTP method: POST / Content type: JSON
      - URL: `https://your.site/api/revalidate?secret=...`（上記の出力を利用）
      - Filter (GROQ): `(_type in ["post","category","tag","profile"]) && !(_id in path("drafts.**"))`
      - Trigger on: Create / Update / Delete（Published のみ）
      - 送信テスト: 例を送信して `200 OK` を確認

7) 接続ヘルスチェック（ローカル）
- Devサーバー起動後に `http://localhost:3000/api/diag/sanity` を開くと、
  - `projectId` / `dataset`、`postCount`、`sampleSlugs`、`error` を返し、Sanity接続の状態を確認できます。

- 8) Studio内プレビュー（編集中プレビューのタブ）
- 依存追加（ローカルで `pnpm i` 必要）: `sanity-plugin-iframe-pane`
- Postの編集画面に「Preview」タブを追加（`sanity/structure.ts`）
- 仕組み: `SANITY_STUDIO_SITE_URL` の `/api/draft?secret=...&slug=/blog/[slug]` をiframe表示
- 必要な環境変数:
  - Next/Vercel 側（サーバー環境）
    - `SANITY_PREVIEW_SECRET` … Preview用のシークレット
    - `SANITY_API_READ_TOKEN` … Draftを読み取るためのRead Token（Editor以上の権限）
    - `SITE_URL` … 本番URL（未設定時は `http://localhost:3000`）
- Studio（Hosted Studio）側（Studioバンドルへ露出される）
  - `SANITY_STUDIO_PREVIEW_SECRET` … Studioが生成するURLに付与（上と同じ値推奨）
  - `SANITY_STUDIO_SITE_URL` … 本番URL（末尾にパスを付けない、例: `https://example.com`）
  - `SANITY_STUDIO_VERCEL_BYPASS_TOKEN` … VercelのDeployment Protectionが有効な場合のバイパストークン（任意）
- Next側の対応:
  - `app/api/draft/route.ts` で Draft Mode を有効化 → 対象ページにリダイレクト
  - `lib/sanity/client.ts` は Draft Mode時に `previewDrafts` + Tokenでデータ取得（未設定でも通常表示）

注意:
- `SANITY_STUDIO_SITE_URL` はサイトのルートURLを指定（末尾に `/blog` などのパスを付けない）
- Studioに環境変数を渡してデプロイする例:
  - `SANITY_STUDIO_SITE_URL="https://example.com" SANITY_STUDIO_PREVIEW_SECRET="<secret>" SANITY_STUDIO_VERCEL_BYPASS_TOKEN="<token>" pnpm sanity:deploy`

### Sanity CLI スクリプト（package.json）

- `pnpm sanity` … Sanity CLI ヘルプ
- `pnpm sanity:login` … Sanity ログイン
- `pnpm sanity:init` … プロジェクト初期化（既存 `sanity.config.ts` を選択）
- `pnpm sanity:deploy` … Studio を Sanity Hosted にデプロイ（推奨）
- `pnpm sanity:whoami` … ログイン確認
- `pnpm sanity:datasets` … データセット一覧
- `pnpm studio:open` … `.env.local` の `SANITY_STUDIO_URL` をブラウザで開く
- `pnpm webhook:test` … ローカル `/api/revalidate` にテストPOST（`.env.local` の `SANITY_WEBHOOK_SECRET` を利用）

補足: `sanity/sanity.cli.ts` は環境変数 `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` を参照するよう統一しています（無い場合は `tgkpx8zk` / `production`）。
