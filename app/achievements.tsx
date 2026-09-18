'use client';
import type { Progress } from '@/lib/rewards';
export default function Achievements({progress,signedIn}:{progress?:Progress;signedIn:boolean}){
 const earned=progress?.titles??[];
 return <section className="achievement-section"><div className="collection-title"><h2>獲得した称号</h2>{earned.length>0&&<span>{earned.length} 件</span>}</div>{!signedIn?<p className="achievement-intro">ログインすると、あなたの称号を確認できます。</p>:earned.length===0?<p className="achievement-intro">まだ称号はありません。あなたのペースで楽しんでください。</p>:<div className="title-grid">{earned.map(t=><article key={t.id} className="title-card earned"><span className="title-icon" aria-hidden="true">{t.icon}</span><div><h3>{t.name}</h3><span className="title-earned">獲得：{new Date(t.earned).toLocaleDateString('ja-JP',{timeZone:'Asia/Tokyo'})}</span></div></article>)}</div>}</section>;
}
