'use client';
import { Localized } from './language';

import type { Progress } from '@/lib/rewards';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const remarks=['はい。猫の手、空いてます。','なでても配達速度は変わりません。','……もう一回だけなら。','仕事中です。いちおう。','今日もおつかれさま。'];
export default function PostalCat({mood,bodyLength,catMentioned,signedIn,progress,onPet,busy}:{mood:string;bodyLength:number;catMentioned:boolean;signedIn:boolean;progress?:Progress;onPet:(id:string)=>Promise<Progress|undefined>;busy:boolean}) {
 const [pats,setPats]=useState(0),[asleep,setAsleep]=useState(false),[secret,setSecret]=useState(false),[found,setFound]=useState(false);
 useEffect(()=>{try{setFound(localStorage.getItem('kotonoha-cat-badge')==='yes');}catch{}},[]);
 const [happy,setHappy]=useState(false);
 useEffect(()=>{for(const src of ['/mascot-sleep.png','/mascot-happy.png']){const image=new Image();image.src=src;}},[]);
 useEffect(()=>{if(!happy)return;const timer=window.setTimeout(()=>setHappy(false),3000);return()=>window.clearTimeout(timer);},[happy,pats]);
 const [petting,setPetting]=useState(false),[retry,setRetry]=useState<string|null>(null);
 async function pat(){if(petting||busy)return;setPetting(true);try{if(signedIn){const had=progress?.titles.some(t=>t.id==='pet5');const eventId=retry||crypto.randomUUID();setRetry(eventId);const result=await onPet(eventId);if(!result)return;setRetry(null);if(!had&&result.titles.some(t=>t.id==='pet5'))setSecret(true);}else if(pats===4){setSecret(true);}setPats(pats+1);if(pats+1>=5)setFound(true);setAsleep(false);setHappy(true);}finally{setPetting(false);}}

 const saying=asleep?'勤務中のまばたきが、ちょっと長め。':pats>0?remarks[pats%remarks.length]:catMentioned?'「ねこ」って書いた？ 呼びました？':bodyLength>=800?'大作ですね。両手で運びます。':bodyLength>=10?'うんうん。ちゃんと、預かるよ。':mood==='🌧️'?'雨の日は、ここで雨宿り。':mood==='🌙'?'今日は省エネ。それも立派な一日。':'白紙もいいけど、お話も聞きたい。';
 return <Localized><section className={'cat-office '+(asleep?'is-asleep':'')} aria-label="配達係ぽすとの部屋">
  <div className="office-top"><span>POST OFFICE / 001</span><button className="duty-sign" onClick={()=>{setAsleep(!asleep);setHappy(false);}} aria-pressed={asleep}><span key={String(asleep)} className="duty-sign-hanger"><span className="duty-sign-board">{asleep?'休憩中 zZ':'勤務中（たぶん）'}</span></span></button></div>
  <h2>きもちの配達、<br/>猫の手も借りて。</h2>
  <p className="cat-speech" role="status" aria-live="polite">{saying}</p>
  <button className="cat-pet" disabled={petting||busy} onClick={pat} aria-label="配達係ぽすとをなでる" title="なでてみる？">
   <img key={String(asleep)+String(happy)+pats} className={happy&&!asleep?'cat-art is-patted':'cat-art'} src={asleep?'/mascot-sleep.png':happy?'/mascot-happy.png':'/mascot.png'} alt={asleep?'目を閉じて丸くなり、手紙を枕に眠るぽすと':happy?'うれしそうに目を細め、前足を上げるぽすと':'片耳が折れた、とぼけ顔の黒猫の配達係ぽすと'} width="512" height="512"/>
   {asleep&&<span className="cat-zzz" aria-hidden="true">z Z</span>}
   {pats>0&&<span key={'pat'+pats} className="pet-heart" aria-hidden="true">♡</span>}
  </button>
  <div className="cat-caption"><span><b>ぽすと</b><small>特技：大事そうに運ぶ</small></span><span className="pet-hint">なでる？ ↗</span></div>
  {(signedIn?progress?.titles.some(t=>t.id==='pet5'):found)&&<button className="secret-badge" onClick={()=>setSecret(true)}>✦ 名誉なで係の会員証</button>}
  <Dialog open={secret} onOpenChange={setSecret}><DialogContent className="diary-dialog secret-dialog"><DialogTitle>あ、見つかっちゃった。</DialogTitle><DialogDescription>ぽすとから、あなたへ。</DialogDescription><div className="secret-certificate"><span>ことのは郵便局 非公式</span><strong>名誉なで係</strong><img src="/mascot-happy.png" alt="笑顔で前足を上げる会員証のぽすと" width="150" height="150"/><p>お給料：猫からの信頼。<br/>勤務時間：気が向いたとき。</p><span className="certificate-number">MEMBER No. 0005</span></div><p className="center-note">{signedIn?'称号は小さなコレクションの台帳に保存されています。':'ログインすると、なでた回数と称号をアカウントに保存できます。'}</p></DialogContent></Dialog>
 </section></Localized>;
}
