'use client';
import DrawingPlayback from './drawing-playback';
import {useEffect,useRef,useState} from 'react';
import {Localized,useLanguage} from './language';
import {translate,type Locale} from '@/lib/messages';
import {PlacedSticker} from './sticker';
import {readStickers} from '@/lib/sticker-layout';
type Letter={drawing?:string|null;stickers?:string|null;id:string;body:string;paper:string;font?:string;mood:string;sticker:string;sticker_layout?:string|null};
export default function LetterReader({entry,signedIn,sampleOriginal}:{entry:Letter;signedIn:boolean;sampleOriginal:string}){
 const {locale}=useLanguage();
 const [target,setTarget]=useState<Locale|''>(''),[translations,setTranslations]=useState<Record<string,string>>({}),[showTranslation,setShowTranslation]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const abort=useRef<AbortController|null>(null),reading=useRef<HTMLDivElement>(null);
 useEffect(()=>{reading.current?.focus();return()=>{abort.current?.abort();abort.current=null;};},[]);
 async function convert(next:Locale|''){
  abort.current?.abort();abort.current=null;setTarget(next);setError('');setShowTranslation(false);setBusy(false);
  if(!next||!entry.body.trim())return;
  if(translations[next]){setShowTranslation(true);return;}
  if(entry.id==='sample'&&!signedIn){setTranslations(prev=>({...prev,[next]:translate(entry.body,next)}));setShowTranslation(true);return;}
  const controller=new AbortController();abort.current=controller;const timeout=setTimeout(()=>controller.abort(),40000);setBusy(true);
  try{const response=await fetch('/api/diary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'translate',id:entry.id,target:next}),signal:controller.signal});const data=await response.json() as {text?:string;error?:string};if(abort.current!==controller)return;if(!response.ok||typeof data.text!=='string')throw new Error(data.error||'翻訳につながりませんでした。原文のまま読めます。時間をおいてお試しください。');setTranslations(prev=>({...prev,[next]:data.text!}));setShowTranslation(true);}catch(e){if(abort.current===controller)setError(controller.signal.aborted?'翻訳につながりませんでした。原文のまま読めます。時間をおいてお試しください。':(e as Error).message);}finally{clearTimeout(timeout);if(abort.current===controller)setBusy(false);}
 }

 return <Localized><div ref={reading} tabIndex={-1} className={'read-letter '+entry.paper+' diary-font-'+(entry.font||'sans')}><span>{entry.mood}</span>{entry.drawing&&<DrawingPlayback drawing={entry.drawing}/>}<div className="sticker-canvas read-canvas"><p data-i18n-skip lang={showTranslation?target||undefined:undefined}>{showTranslation?translations[target]:entry.id==='sample'?sampleOriginal:entry.body}</p>{readStickers(entry).map((p,i)=><PlacedSticker key={i} sticker={p.sticker} layout={p.layout}/>)}</div></div><div className="translation-controls"><label>翻訳先 <select aria-label="翻訳先" value={target} disabled={!entry.body.trim()} onChange={e=>convert(e.target.value as Locale|'')}><option value="">原文</option>{[['ja','日本語'],['en','English'],['fr','Français'],['zh-CN','简体中文'],['ko','한국어']].map(([value,label])=><option value={value} key={value} lang={value}>{label}</option>)}</select></label>{busy&&<span role="status">翻訳中…</span>}</div>{entry.drawing&&<p className="translation-note">手書き部分は翻訳されません。</p>}{error&&<p role="alert" className="dialog-error">{error}</p>}</Localized>;
}
