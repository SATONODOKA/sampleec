# アフィリエイト管理ダッシュボード

Next.js 13 + TypeScript + Tailwind CSS で構築されたシンプルで使いやすいアフィリエイト管理システムです。

## 🚀 機能

- **管理画面**: 成果サマリ、商品一覧、発注管理
- **探すページ**: 商品検索とおすすめ表示
- **発注中ページ**: 発注状況の追跡
- **設定ページ**: ストア情報の管理
- **レスポンシブデザイン**: モバイルファーストのUI
- **リアルタイム更新**: localStorage活用のデータ永続化

## 🛠 技術スタック

- **Frontend**: Next.js 13.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Webpack (Turbopack無効)
- **Images**: Unsplash API
- **Deployment**: Netlify

## 📦 インストール

```bash
npm install
```

## 🔧 開発環境

```bash
npm run dev
```

開発サーバーが `http://localhost:3000` で起動します。

## 🏗 ビルド

```bash
npm run build
```

## 🌐 Netlifyデプロイ

### 1. リポジトリをNetlifyに接続

1. [Netlify](https://netlify.com) にログイン
2. "New site from Git" をクリック
3. GitHubリポジトリを選択

### 2. ビルド設定

Netlifyのビルド設定は `netlify.toml` で自動設定されます：

```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--production=false"
```

### 3. 環境変数（オプション）

Netlifyの管理画面で以下の環境変数を設定：

- `NEXT_PUBLIC_APP_URL`: デプロイ後のURL
- `NEXT_PUBLIC_ENV`: `production`

### 4. デプロイ完了

設定後、自動的にデプロイが開始されます。成功すると一意のURLが発行されます。

## 📱 使用方法

### 基本的な流れ

1. **管理画面** で現在の成果を確認
2. **探すページ** で新しい商品を検索
3. 気になる商品を **発注**
4. **発注中ページ** でステータス確認
5. **設定ページ** でストア情報を管理

### 発注機能

- 商品カードの「発注」ボタンをクリック
- 個数と希望到着日を選択
- 確定すると商品一覧と発注中リストに追加

## 🎨 カスタマイズ

### カラーテーマ

`tailwind.config.js` でAirシリーズの水色テーマを設定：

```js
colors: {
  air: {
    primary: '#90D5FF',
    light: '#B3E1FF', 
    dark: '#6DC5FF',
  }
}
```

### 商品データ

`src/lib/mockData.ts` でモックデータをカスタマイズ可能。

## 🐛 トラブルシューティング

### CSSが適用されない場合

```bash
rm -rf .next
npm run dev
```

### Netlifyビルドエラー

- Node.js バージョンを18に設定
- `npm run build` でローカルビルド確認
- `netlify.toml` の設定を確認

## �� ライセンス

MIT License 