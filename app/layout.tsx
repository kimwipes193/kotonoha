import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'ことのは — 匿名の誰かと交換日記',description:'1日1回、名も知らない誰かと今日の気持ちを交換する日記アプリ。',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ja"><body>{children}</body></html>;}
