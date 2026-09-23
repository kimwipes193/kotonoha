'use client';
import {useLayoutEffect,useRef} from 'react';
import {useLanguage} from './language';
import {translate} from '@/lib/messages';

export default function Tagline({text}:{text:string}){
 const {locale}=useLanguage(),ref=useRef<HTMLParagraphElement>(null);
 const translated=translate(text,locale),lines=translated.match(/[^。.!?！？]+[。.!?！？]*/g)??[translated];
 useLayoutEffect(()=>{const el=ref.current;if(!el)return;
  const fit=()=>{for(const line of Array.from(el.children) as HTMLElement[]){line.style.fontSize='';const base=parseFloat(getComputedStyle(line).fontSize),available=el.clientWidth;if(available&&line.scrollWidth>available)line.style.fontSize=(base*available/line.scrollWidth)+'px';}};
  const observer=new ResizeObserver(fit);observer.observe(el);fit();document.fonts.ready.then(fit);return()=>observer.disconnect();
 },[translated]);
 return <p ref={ref} className="sentence-tagline" data-i18n-skip>{lines.map((line,i)=><span key={i}>{line.trim()}</span>)}</p>;
}
