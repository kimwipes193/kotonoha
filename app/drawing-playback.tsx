'use client';
import {useEffect,useMemo,useRef,useState,type ReactNode} from 'react';
import {readDrawing} from '@/lib/drawing';
import {drawingDuration,drawingFrame} from '@/lib/drawing-playback';
import {paint} from './drawing';
import {Localized} from './language';

export default function DrawingPlayback({drawing,children}:{drawing:string;children?:ReactNode}){
 const strokes=useMemo(()=>readDrawing(drawing),[drawing]);
 const canvas=useRef<HTMLCanvasElement>(null),frame=useRef(0);
 const [run,setRun]=useState(0),[playing,setPlaying]=useState(false);
 useEffect(()=>{
  const target=canvas.current;if(!target)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const finish=()=>{cancelAnimationFrame(frame.current);paint(target,strokes);setPlaying(false);};
  if(!strokes.length||(run===0&&motion.matches)){finish();return;}
  setPlaying(true);paint(target,[]);
  let start:number|undefined;
  const duration=drawingDuration(strokes);
  const tick=(now:number)=>{
   start??=now;const progress=Math.min(1,(now-start)/duration);
   paint(target,drawingFrame(strokes,progress));
   if(progress<1)frame.current=requestAnimationFrame(tick);else setPlaying(false);
  };
  frame.current=requestAnimationFrame(tick);
  const changed=()=>{if(motion.matches)finish();};
  motion.addEventListener('change',changed);
  return()=>{cancelAnimationFrame(frame.current);motion.removeEventListener('change',changed);};
 },[strokes,run]);
 function finish(){cancelAnimationFrame(frame.current);if(canvas.current)paint(canvas.current,strokes);setPlaying(false);}
 return <Localized><div className="drawing-playback"><div className="drawing-artboard"><canvas ref={canvas} width={600} height={400} className="drawing-surface" role="img" aria-label="手書き・絵日記"/>{children}</div><div className="drawing-playback-controls">{playing?<button type="button" onClick={finish}>完成した絵を見る</button>:<button type="button" onClick={()=>setRun(n=>n+1)}>もう一度、描くところを見る</button>}</div></div></Localized>;
}
