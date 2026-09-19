'use client';
import {useEffect,useRef,useState} from 'react';
import {Languages} from 'lucide-react';
import {Localized,useLanguage} from './language';
import {translate,type Locale} from '@/lib/messages';
import {PlacedSticker} from './sticker';
import {readStickerLayout} from '@/lib/sticker-layout';
type Letter={id:string;body:string;paper:string;font?:string;mood:string;sticker:string;sticker_layout?:string|null};
export default function LetterReader({entry,signedIn,sampleOriginal}:{entry:Letter;signedIn:boolean;sampleOriginal:string}){
 const {locale}=useLanguage();
 const [target,setTarget]=useState<Locale>(locale),[translations,setTranslations]=useState<Record<string,string>>({}),[showTranslation,setShowTranslation]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const abort=useRef<AbortController|null>(null),reading=useRef<HTMLDivElement>(null);
 useEffect(()=>{reading.current?.focus();return()=>abort.current?.abort();},[]);
 async function convert(){
  if(busy)return;
  if(showTranslation){setShowTranslation(false);return;}
  if(translations[target]){setShowTranslation(true);return;}
  if(entry.id==='sample'&&!signedIn){setTranslations(prev=>({...prev,[target]:translate(entry.body,target)}));setShowTranslation(true);return;}
  const controller=new AbortController();abort.current=controller;const timeout=setTimeout(()=>controller.abort(),40000);setBusy(true);setError('');
  try{const response=await fetch('/api/diary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'translate',id:entry.id,target}),signal:controller.signal});const data=await response.json() as {text?:string;error?:string};if(!response.ok||typeof data.text!=='string')throw new Error(data.error||'翻訳につながりませんでした。原文のまま読めます。時間をおいてお試しください。');setTranslations(prev=>({...prev,[target]:data.text!}));setShowTranslation(true);}catch(e){if(!controller.signal.aborted)setError((e as Error).message);else setError('翻訳につながりませんでした。原文のまま読めます。時間をおいてお試しください。');}finally{clearTimeout(timeout);setBusy(false);}
 }
 return <Localized><div ref={reading} tabIndex={-1} className={'read-letter '+entry.paper+' diary-font-'+(entry.font||'sans')}><span>{entry.mood}</span><div className="sticker-canvas read-canvas"><p data-i18n-skip lang={showTranslation?target:undefined}>{showTranslation?translations[target]:entry.id==='sample'?sampleOriginal:entry.body}</p><PlacedSticker sticker={entry.sticker} layout={readStickerLayout(entry.sticker_layout)}/></div></div><div className="translation-controls"><label>翻訳先 <select aria-label="翻訳先" value={target} disabled={busy} onChange={e=>{setTarget(e.target.value as Locale);setShowTranslation(false);setError('');}}>{[['ja','日本語'],['en','English'],['fr','Français'],['zh-CN','简体中文'],['ko','한국어']].map(([value,label])=><option value={value} key={value} lang={value}>{label}</option>)}</select></label><button className="translate" disabled={busy} onClick={convert}><Languages size={16}/>{busy?'翻訳中…':showTranslation?'原文を見る':'この言語で読む'}</button></div><p className="translation-note">{entry.id==='sample'&&!signedIn?'見本はあらかじめ用意した翻訳です。':'翻訳すると本文をCloudflare AIで処理します。機械翻訳には誤りが含まれることがあります。'}</p>{busy&&<p role="status" className="translation-note">言葉のお着替え中。少しお待ちください。</p>}{error&&<p role="alert" className="dialog-error">{error}</p>}</Localized>;
}
