'use client';
import {Children,useEffect,useRef,useState,type ReactNode} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import {useLanguage} from './language';
import {translate} from '@/lib/messages';
export default function ProfilePager({children,labels,ids,targetId='self'}:{targetId?:string;children:ReactNode;labels:string[];ids:string[]}){
 const {locale}=useLanguage();const pages=Children.toArray(children),track=useRef<HTMLDivElement>(null),current=useRef(0),[index,setIndex]=useState(0),[height,setHeight]=useState<number>();
 const identity=ids.join('|');
 useEffect(()=>{const el=track.current;if(!el)return;const initial=Math.max(0,ids.indexOf(targetId));current.current=initial;setIndex(initial);el.scrollLeft=initial*el.clientWidth;let width=el.clientWidth;
 const measure=()=>{const cards=el.children;setHeight((cards[current.current] as HTMLElement)?.offsetHeight);if(width!==el.clientWidth){width=el.clientWidth;el.scrollLeft=current.current*width;}};
 const observer=new ResizeObserver(measure);observer.observe(el);Array.from(el.children).forEach(child=>observer.observe(child));measure();return()=>observer.disconnect();},[identity,targetId]);
 function go(next:number){const el=track.current;if(!el)return;el.scrollTo({left:Math.max(0,Math.min(pages.length-1,next))*el.clientWidth,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 return <div className="profile-album"><div className="profile-pager-controls"><button type="button" onClick={()=>go(index-1)} disabled={index===0} aria-label={translate('前のプロフィール',locale)}><ChevronLeft size={20}/></button><span aria-live="polite" data-i18n-skip><strong>{labels[index]}</strong><small>{index+1} / {pages.length}</small></span><button type="button" onClick={()=>go(index+1)} disabled={index===pages.length-1} aria-label={translate('次のプロフィール',locale)}><ChevronRight size={20}/></button></div><div className="profile-pager-track" ref={track} style={{height}} role="region" aria-label={translate('プロフィール帳',locale)} tabIndex={0} onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();go(index+(e.key==='ArrowRight'?1:-1));}}} onScroll={()=>{const el=track.current;if(!el)return;const next=Math.round(el.scrollLeft/el.clientWidth);if(next>=0&&next<pages.length&&next!==current.current){current.current=next;setIndex(next);setHeight((el.children[next] as HTMLElement)?.offsetHeight);}}}>{pages.map((page,i)=><div className="profile-pager-page" key={ids[i]} inert={index!==i}>{page}</div>)}</div></div>;
}
