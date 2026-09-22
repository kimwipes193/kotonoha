'use client';

import {useEffect, useRef, useState, type ReactNode, type PointerEvent} from 'react';
import {Send, Star, Sun} from 'lucide-react';
import {useLanguage} from './language';
import {translate} from '@/lib/messages';

// This little stage is local play only: it never awards or consumes inventory.
export default function PostoPlayground({children}:{children:ReactNode}) {
 const {locale}=useLanguage();
 const stage=useRef<HTMLDivElement>(null);
 const drag=useRef<{id:number;x:number;y:number;left:number;top:number}|null>(null);
 const [night,setNight]=useState(false),[flight,setFlight]=useState(0),[playing,setPlaying]=useState(false);
 const [toy,setToy]=useState({x:0,y:0});
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 useEffect(()=>{if(!flight)return;const end=setTimeout(()=>setFlight(0),1900);return()=>clearTimeout(end);},[flight]);
 function react(){setPlaying(true);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setPlaying(false),1400);}
 function move(x:number,y:number){
  const rect=stage.current?.getBoundingClientRect();if(!rect)return;
  const next={x:Math.max(-(rect.width-64),Math.min(0,x)),y:Math.max(-(rect.height-64),Math.min(0,y))};
  setToy(next);
  stage.current?.style.setProperty('--cat-lean',`${Math.max(-8,Math.min(8,(next.x+rect.width/2)*.06))}deg`);
 }
 function end(e:PointerEvent<HTMLButtonElement>){if(drag.current?.id!==e.pointerId)return;drag.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);react();}
 return <div ref={stage} className={'posto-stage'+(night?' night-sky':'')+(playing?' playing-yarn':'')}>
  <div className="posto-orbit" aria-hidden="true"/><div className="posto-stars" aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i><i>·</i><i>✧</i></div>
  <div className="posto-puppet">{children}</div>
  <button type="button" className="posto-charm plane-launch" aria-label={translate('紙ひこうきを飛ばす',locale)} title={translate('紙ひこうきを飛ばす',locale)} onClick={()=>setFlight(n=>n+1)}><Send size={21}/></button>
  <button type="button" className="posto-charm sky-switch" aria-pressed={night} aria-label={translate('ぽすとの空を切り替える',locale)} title={translate('ぽすとの空を切り替える',locale)} onClick={()=>setNight(n=>!n)}>{night?<Sun size={23}/>:<Star size={23}/>}</button>
  <button type="button" className="posto-yarn" aria-label={translate('毛糸玉で遊ぶ（ドラッグ・矢印キー）',locale)} title={translate('毛糸玉で遊ぶ（ドラッグ・矢印キー）',locale)} style={{transform:`translate(${toy.x}px,${toy.y}px)`}}
   onPointerDown={e=>{if(e.button!==0||drag.current)return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,left:toy.x,top:toy.y};react();}}
   onPointerMove={e=>{const d=drag.current;if(!d||d.id!==e.pointerId)return;move(d.left+e.clientX-d.x,d.top+e.clientY-d.y);react();}}
   onPointerUp={end} onPointerCancel={end} onLostPointerCapture={()=>{drag.current=null;}}
   onKeyDown={e=>{const steps:Record<string,[number,number]>={ArrowLeft:[-18,0],ArrowRight:[18,0],ArrowUp:[0,-18],ArrowDown:[0,18]};if(steps[e.key]){e.preventDefault();move(toy.x+steps[e.key][0],toy.y+steps[e.key][1]);react();}}}
   onClick={react}><span aria-hidden="true">🧶</span></button>
  {flight>0&&<div key={flight} className="posto-flight" aria-hidden="true"><Send size={34}/><span>✦</span><span>·</span></div>}
 </div>;
}
