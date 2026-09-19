'use client';
import {useEffect,useRef,useState} from 'react';
import {Localized} from './language';
function EnvelopeArt(){return <span className="envelope-art" aria-hidden="true"><span className="envelope-note"><i/><i/><i/><b>♡</b></span><span className="envelope-pocket"/><span className="envelope-flap"/><span className="envelope-seal">✦</span><span className="envelope-stamp">〒</span></span>;}
export function SendingEnvelope(){return <Localized><div className="mail-journey" role="status"><div className="mail-flight"><EnvelopeArt/></div><span className="mail-trail" aria-hidden="true">✧ · · ·</span><p>あなたの言葉、封筒にそっと。</p><small>日記を保存し、ぽすとに預けました。</small></div></Localized>;}
export function IncomingEnvelope({onOpen}:{onOpen:()=>void}){
 const [opening,setOpening]=useState(false),[motion,setMotion]=useState(false),[reduced,setReduced]=useState(false);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);const completed=useRef(false);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 function finish(){if(completed.current)return;completed.current=true;if(timer.current)clearTimeout(timer.current);onOpen();}
 function open(force=false){if(opening)return;setOpening(true);setMotion(force);if(!force&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}timer.current=setTimeout(finish,2200);}
 return <Localized><div className={'incoming-mail '+(opening?'is-opening ':'')+(motion?'mail-motion-requested':'')}><span className="mail-eyebrow">A LITTLE LETTER FOR YOU</span><button type="button" className="envelope-open" aria-label="封筒を開けて日記を読む" disabled={opening} onClick={()=>open()} onAnimationEnd={e=>{if(e.animationName==='letter-emerge')finish();}}><EnvelopeArt/></button><p role="status">{opening?'封筒を開けています…':'とん、とタップで開封。'}</p><small>どこかの誰かが、今日を分けてくれました。</small>{reduced&&<p className="motion-hint">端末の設定で動きを控えています。</p>}<div className="mail-open-actions"><button type="button" disabled={opening} onClick={()=>open(true)}>アニメーションで開封</button><button type="button" onClick={finish}>すぐに読む</button></div></div></Localized>;
}
