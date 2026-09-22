'use client';

import {useEffect,useState,type ReactNode} from 'react';

export function LoadingScreen({progress=0,opening=false}:{progress?:number;opening?:boolean}){
 return <div className={'arrival-screen'+(opening?' is-opening':'')}>
  <svg className="arrival-frame" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><rect x="3" y="3" width="994" height="594" rx="30" pathLength="100" strokeDasharray="100" strokeDashoffset={100-progress}/></svg>
  <div className="arrival-center"><img src="/kotonoha-chika.svg" alt="ことのは" width="360" height="80"/><span className="arrival-subtitle">ONE DAY, ONE CONNECTION.</span><div className="arrival-progress" role="progressbar" aria-label="Loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span>LOADING</span><strong>{String(progress).padStart(3,'0')}</strong><small>%</small></div></div>
 </div>;
}

export default function Arrival({ready,children}:{ready:boolean;children:ReactNode}){
 const [assets,setAssets]=useState(0),[mounted,setMounted]=useState(false),[phase,setPhase]=useState<'loading'|'opening'|'done'>('loading');
 useEffect(()=>{
  setMounted(true);let active=true;
  const cleanups:(()=>void)[]=[];
  for(const src of ['/kotonoha-chika.svg','/mascot.png']){
   const image=new Image();let settled=false;
   const finish=()=>{if(settled)return;settled=true;clearTimeout(timeout);if(active)setAssets(n=>n+1);};
   const timeout=setTimeout(finish,5000);image.onload=finish;image.onerror=finish;image.src=src;
   cleanups.push(()=>{clearTimeout(timeout);image.onload=null;image.onerror=null;});
  }
  return()=>{active=false;cleanups.forEach(fn=>fn());};
 },[]);
 // Count completed initialization tasks, not downloaded bytes. Failed requests
 // also settle so the existing error and retry UI can always become accessible.
 const progress=(mounted?20:0)+assets*20+(ready?40:0);
 useEffect(()=>{
  if(progress!==100||phase!=='loading')return;
  const timer=setTimeout(()=>setPhase('opening'),window.matchMedia('(prefers-reduced-motion: reduce)').matches?100:900);
  return()=>clearTimeout(timer);
 },[progress,phase]);
 useEffect(()=>{
  if(phase!=='opening')return;
  const timer=setTimeout(()=>setPhase('done'),window.matchMedia('(prefers-reduced-motion: reduce)').matches?100:850);
  return()=>clearTimeout(timer);
 },[phase]);
 useEffect(()=>{
  if(phase==='done')return;
  const previous=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous;};
 },[phase]);
 return <div className={'arrival-root arrival-'+phase}><div className="arrival-content" inert={phase==='loading'} aria-hidden={phase==='loading'?true:undefined}>{children}</div>{phase!=='done'&&<LoadingScreen progress={progress} opening={phase==='opening'}/>}</div>;
}
