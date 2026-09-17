# GitHub + Cloudflareで公開する

GitHubにはソースを保存し、GitHub ActionsからCloudflare Workersへ公開します。日記とログインセッションはCloudflare D1に保存します。GitHub Pagesは使用しません。

## 1. Cloudflare側を準備

1. 自分のCloudflareアカウントにWorkers用のサブドメインを作成します。
2. D1データベースを作成します（例：`kotonoha`）。表示されたDatabase IDを控えます。
3. Worker名と公開URLを決めます。例：Worker名が `kotonoha`、サブドメインが `your-account` なら `https://kotonoha.your-account.workers.dev` です。これは例であり、まだ作成済みのURLではありません。
4. 自分のアカウントに限定したAPIトークンを作成します。Workers Scriptsの編集、D1の編集に必要な権限を付けます。Account IDも控えます。

## 2. Googleログインを準備

[Google Cloud Console](https://console.cloud.google.com/auth/clients)で対象プロジェクトを選び、Google Auth Platformのブランド情報・対象ユーザーを設定します。

- OAuthクライアントの種類：**ウェブアプリケーション**
- 承認済みリダイレクトURI：`https://実際の公開ドメイン/api/auth/google/callback`
- ローカル用（任意）：`http://localhost:5173/api/auth/google/callback`
- 要求するスコープ：`openid email` のみ。Gmailのメールを読む権限は不要です。
- テストモードでは登録したテストユーザーのみ利用できます。一般公開する場合はGoogle側の対象ユーザー設定も本番にしてください。

Client IDとClient Secretを取得します。Client Secretをソースコード・Issue・チャットに貼らないでください。

## 3. GitHubに設定

公開先のリポジトリへソースをpushします。リポジトリの **Settings → Environments** で `production` を作成し、SecretsとVariablesを設定します。リポジトリ単位のActions Secrets/Variablesでも利用できます。

### Secrets

|名前|内容|
|---|---|
|`CLOUDFLARE_API_TOKEN`|手順1のAPIトークン|
|`CLOUDFLARE_ACCOUNT_ID`|自分のCloudflare Account ID|
|`GOOGLE_CLIENT_ID`|手順2のClient ID|
|`GOOGLE_CLIENT_SECRET`|手順2のClient Secret|

### Variables

|名前|内容|
|---|---|
|`CLOUDFLARE_WORKER_NAME`|作成するWorker名|
|`CLOUDFLARE_DATABASE_ID`|自分のD1 Database ID|
|`CLOUDFLARE_DATABASE_NAME`|D1名（未設定ならkotonoha）|
|`APP_ORIGIN`|正確な公開URL。末尾の `/` は付けない|

**Actions → Publish Kotonoha → Run workflow** を実行します。以後、`main`へのpushでも公開します。テスト・型チェック・ビルドの成功後に、D1マイグレーションとWorker公開を実行します。OAuth秘密情報は一時ファイル経由でWranglerのsecrets機能に渡し、処理終了時に削除します。

公開URLで、Googleログイン → 日記送信 → 再読み込み → ログアウトを実際のGoogleアカウントで確認してください。2人目の別アカウントが投稿して30秒以上経つと、ページの自動更新で交換を確認できます。

## 既存サイトとデータについて

現在のSites公開版と、新しいCloudflare公開版は別の配信先です。このリポジトリの設定だけでは、現在の公開版を書き換えません。

旧版はChatGPTのユーザーID、新版はGoogleの固定ユーザーIDを使います。同じメールアドレスでも勝手にアカウントを結びつけません。現在の日記・獲得アイテムを引き継ぐには、旧データのエクスポート／インポートと、両方のアカウントを本人が確認する移行手順が別途必要です。現在のデータを削除する処理はありません。

`.openai/hosting.json` は元のSitesプロジェクト情報です。外部公開スクリプトはここにあるプロジェクトIDを公開先には使わず、明示したCloudflareアカウント・DB・Worker名だけを使います。

## ローカルで確認

1. `npm ci`
2. `.dev.vars.example`を`.dev.vars`にコピーし、ローカル用のOAuth情報を入力。
3. `npm run build`
4. `drizzle/`内の未適用SQLを順番に、次のコマンドでローカルD1へ適用。

```
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/SQLファイル名.sql
```

5. `npm run dev` で起動。秘密情報未設定時はログインが「設定準備中」になります。

## 残っている外部連携

広告配信・視聴完了検証と自由文の自動翻訳は未接続です。広告の追加投稿は準備中のままで、不正に追加権限を与えません。無料ガチャは動作します。

参考：[Google OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect)、[Cloudflare GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)、[GitHub Pagesの範囲](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
