# 無料Pages URL

公開URL: https://kotonoha-post.pages.dev/

Pagesの `APP` サービスバインディングから既存の `kotonoha` Workerへ転送する。URL、Origin、Cookie、レスポンスのSet-Cookieを保持する。D1とGoogleの秘密鍵は既存Workerだけに置く。プレビューURLではアプリを提供しない。

Worker設定は既存のAPP_ORIGINに加えて `PAGES_ORIGIN=https://kotonoha-post.pages.dev` を指定する。設定生成時もこの環境変数を渡す。Google OAuthクライアントには `/api/auth/google/callback` を新旧両方のoriginで登録済み。

アカウントの保存データは共有。Cookieと端末保存の下書きはURLごとに独立し、新URLでは最初に再ログインが必要。旧URLの下書きは旧URL側に残る。

Pagesの設定は `pages-hosting/wrangler.json`。このディレクトリで `node ../node_modules/wrangler/bin/wrangler.js pages deploy public --project-name kotonoha-post --branch main` を実行する。
ビルド生成済みの `.wrangler/deploy/config.json` があるとPages設定と競合するため、Pages公開中だけこの生成ファイルを一時退避し、必ず復元する。アプリ更新は既存Workerの通常デプロイでPages側にも反映される。

ドメイン購入費は不要。Cloudflareの無料枠上限は別途適用される。
