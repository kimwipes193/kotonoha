# AdSense設定状況（2026-09-18）

アカウント画面で確認した公開パブリッシャーID: ca-pub-3886723912710329

## 公開済み
- 全ページのメタデータに google-adsense-account を設定。
- public/ads.txt にGoogleが指定する販売者情報を設定。
- 公開サイトのHTTP応答200、確認メタタグ、ads.txtの内容を確認。

## 未完了の理由
AdSenseサイト一覧の登録先は kimwipes193.workers.dev。
https://kotonoha.kimwipes193.workers.dev/ を追加しても「このサイトはすでに追加されています」と表示される。
アプリのURLはアクセスできるが、親ドメインはアクセスできず、Googleのメタタグ所有権確認が「お客様のサイトは確認できませんでした」で失敗した。
利用できる独自ドメインについてユーザーに確認中。広告配信コードはまだ有効化しておらず、審査申請も未完了。

## 続行手順
1. ユーザー指定の独自ドメインをCloudflare Workerへ接続し、OAuthの許可URL・APP_ORIGINを合わせて更新する。購入や移行範囲の承認は別途確認する。
2. 新しいドメインをAdSenseに登録し、所有権確認と審査申請を行う。
3. 広告掲載場所を設定し、プライバシーポリシー・GoogleのCMPを整備する。個人の日記本文の扱いを考慮する。
4. 実際の広告配信コードを設置し、承認後に表示確認する。広告をテスト目的でクリックしない。

通常のAdSense広告の閲覧・クリックを追加投稿の報酬条件にしてはいけない。「広告を見てもう1通」は、利用可能な正式のリワード広告と報酬検証を別途接続するまで準備中のままにする。

## 公式資料
- https://support.google.com/adsense/answer/7584263?hl=ja
- https://support.google.com/adsense/answer/12170421?hl=ja
- https://support.google.com/adsense/answer/48182?hl=ja
- https://support.google.com/admanager/answer/9116812?hl=ja
