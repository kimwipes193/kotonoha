import { LanguageProvider, Localized } from './language';
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'ことのは — 匿名の誰かと交換日記',description:'1日1回、名も知らない誰かと今日の気持ちを交換する日記アプリ。',icons:{icon:[{url:'/posto-favicon-v2.png',type:'image/png',sizes:'64x64'}],apple:[{url:'/posto-apple-icon-v2.png',sizes:'180x180'}]},other:{'google-adsense-account':'ca-pub-3886723912710329'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ja"><body><LanguageProvider>{children}<Localized><footer className="global-legal-footer" style={{textAlign:'center',padding:'20px',fontSize:13}}><a href="/guide">使い方</a>{' ・ '}<a href="/about">ことのはについて・お問い合わせ</a>{' ・ '}<a href="/privacy">プライバシーポリシー</a>{' ・ '}<a href="/terms">利用規約</a></footer></Localized></LanguageProvider></body></html>;}
