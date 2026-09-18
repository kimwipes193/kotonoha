'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const remarks=['はい。猫の手、空いてます。','なでても配達速度は変わりません。','……もう一回だけなら。','仕事中です。いちおう。','あと一回で、何か起きる予感。'];
export default function PostalCat({mood,bodyLength,catMentioned}:{mood:string;bodyLength:number;catMentioned:boolean}) {
 const [pats,setPats]=useState(0),[asleep,setAsleep]=useState(false),[secret,setSecret]=useState(false),[found,setFound]=useState(false);
 useEffect(()=>{try{setFound(localStorage.getItem('kotonoha-cat-badge')==='yes');}catch{}},[]);
 function pat(){const next=pats+1;setPats(next);setAsleep(false);if(next===5){setFound(true);setSecret(true);try{localStorage.setItem('kotonoha-cat-badge','yes');}catch{}}}
 const saying=asleep?'勤務中のまばたきが、ちょっと長め。':pats>0?remarks[pats%remarks.length]:catMentioned?'「ねこ」って書いた？ 呼びました？':bodyLength>=800?'大作ですね。両手で運びます。':bodyLength>=10?'うんうん。ちゃんと、預かるよ。':mood==='🌧️'?'雨の日は、ここで雨宿り。':mood==='🌙'?'今日は省エネ。それも立派な一日。':'白紙もいいけど、お話も聞きたい。';
 return <section className={'cat-office '+(asleep?'is-asleep':'')} aria-label="配達係ぽすとの部屋">
  <div className="office-top"><span>POST OFFICE / 001</span><button className="duty-sign" onClick={()=>setAsleep(!asleep)} aria-pressed={asleep}>{asleep?'休憩中 zZ':'勤務中（たぶん）'}</button></div>
  <h2>きもちの配達、<br/>猫の手も借りて。</h2>
  <p className="cat-speech" role="status" aria-live="polite">{saying}</p>
  <button className="cat-pet" onClick={pat} aria-label="配達係ぽすとをなでる" title="なでてみる？">
   <img key={pats} className={pats?'cat-art is-patted':'cat-art'} src="/mascot.png" alt="片耳が折れた、とぼけ顔の黒猫の配達係ぽすと" width="512" height="512"/>
   {asleep&&<span className="cat-zzz" aria-hidden="true">z Z</span>}
   {pats>0&&<span key={'pat'+pats} className="pet-heart" aria-hidden="true">♡</span>}
  </button>
  <div className="cat-caption"><span><b>ぽすと</b><small>特技：大事そうに運ぶ</small></span><span className="pet-hint">なでる？ ↗</span></div>
  {found&&<button className="secret-badge" onClick={()=>setSecret(true)}>✦ 名誉なで係の会員証</button>}
  <Dialog open={secret} onOpenChange={setSecret}><DialogContent className="diary-dialog secret-dialog"><DialogTitle>あ、見つかっちゃった。</DialogTitle><DialogDescription>ぽすとを5回なでた、やさしいあなたへ。</DialogDescription><div className="secret-certificate"><span>ことのは郵便局 非公式</span><strong>名誉なで係</strong><img src="/mascot.png" alt="会員証のぽすと" width="150" height="150"/><p>お給料：猫からの信頼。<br/>勤務時間：気が向いたとき。</p><span className="certificate-number">MEMBER No. 0005</span></div><p className="center-note">この会員証は、このブラウザーだけの小さなおまけです。</p></DialogContent></Dialog>
 </section>;
}
