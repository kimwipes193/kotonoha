'use client';
import {useEffect,useRef,useState,type PointerEvent} from 'react';
import {MAX_POINTS,MAX_STROKES,type Stroke} from '@/lib/drawing';
import {Localized} from './language';

export function paint(canvas:HTMLCanvasElement,strokes:Stroke[]){
 const ctx=canvas.getContext('2d');if(!ctx)return;
 ctx.clearRect(0,0,600,400);ctx.lineCap='round';ctx.lineJoin='round';
 for(const s of strokes){ctx.globalCompositeOperation=s.erase?'destination-out':'source-over';ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=s.width;ctx.beginPath();const [x,y]=s.points[0];ctx.moveTo(x,y);if(s.points.length===1){ctx.arc(x,y,s.width/2,0,Math.PI*2);ctx.fill();}else{for(const p of s.points.slice(1))ctx.lineTo(...p);ctx.stroke();}}
 ctx.globalCompositeOperation='source-over';
}
export function DrawingCanvas({strokes,onChange,disabled=false}:{strokes:Stroke[];onChange?:(s:Stroke[])=>void;disabled?:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),active=useRef<{id:number;stroke:Stroke}|null>(null);
 const [hue,setHue]=useState(15),[ink,setInk]=useState('#242132'),[width,setWidth]=useState(4),[erase,setErase]=useState(false),[redo,setRedo]=useState<Stroke[]>([]);
 const count=strokes.reduce((n,s)=>n+s.points.length,0),full=count>=MAX_POINTS||strokes.length>=MAX_STROKES;
 useEffect(()=>{if(canvas.current)paint(canvas.current,strokes);},[strokes]);
 function point(e:PointerEvent<HTMLCanvasElement>):[number,number]{const r=e.currentTarget.getBoundingClientRect();return [Math.round(Math.max(0,Math.min(600,(e.clientX-r.left)/r.width*600))),Math.round(Math.max(0,Math.min(400,(e.clientY-r.top)/r.height*400)))];}
 function finish(e:PointerEvent<HTMLCanvasElement>){if(active.current?.id!==e.pointerId)return;const stroke=active.current.stroke;active.current=null;onChange?.([...strokes,stroke]);setRedo([]);}
 function chooseHue(h:number){setHue(h);const c=(n:number)=>{const k=(n+h/60)%6;return Math.round(255*(1-.8*Math.max(0,Math.min(k,4-k,1)))).toString(16).padStart(2,'0');};setInk('#'+c(5)+c(3)+c(1));setErase(false);}
 return <Localized><div className="drawing-panel">
 {onChange&&<div className="drawing-tools"><div className="drawing-actions"><button type="button" aria-pressed={!erase} onClick={()=>setErase(false)}>筆</button><button type="button" aria-pressed={erase} onClick={()=>setErase(true)}>消しゴム</button><button type="button" disabled={disabled||!strokes.length} onClick={()=>{setRedo([...redo,strokes[strokes.length-1]]);onChange(strokes.slice(0,-1));}}>元に戻す</button><button type="button" disabled={disabled||!redo.length} onClick={()=>{onChange([...strokes,redo[redo.length-1]]);setRedo(redo.slice(0,-1));}}>やり直す</button></div><label>色 <input aria-label="ペンの色" className="hue-slider" type="range" min="0" max="359" value={hue} onChange={e=>chooseHue(Number(e.target.value))}/><span className="ink-preview" style={{background:ink}}/></label><div className="ink-swatches">{['#242132','#ffffff','#e65e66','#f4ad37','#51a884','#568bcc','#9368b7'].map(color=><button key={color} type="button" aria-label={color} aria-pressed={ink===color&&!erase} style={{background:color}} onClick={()=>{setInk(color);setErase(false);}}/>)}</div><label>太さ <input aria-label="ペンと消しゴムの太さ" type="range" min="1" max="40" value={width} onChange={e=>setWidth(Number(e.target.value))}/><output>{width}</output></label>{full&&<p role="status">画数の上限です。元に戻すと描き直せます。</p>}</div>}
 <canvas ref={canvas} width={600} height={400} role="img" aria-label="手書き・絵日記" className={onChange?'drawing-surface editable-drawing':'drawing-surface'} style={{touchAction:onChange&&!disabled?'none':'auto'}} onPointerDown={e=>{if(!onChange||disabled||full||active.current||e.button!==0)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);active.current={id:e.pointerId,stroke:{color:ink,width,erase,points:[point(e)]}};paint(e.currentTarget,[...strokes,active.current.stroke]);}} onPointerMove={e=>{const a=active.current;if(!a||a.id!==e.pointerId)return;const p=point(e),last=a.stroke.points.at(-1)!;if(Math.hypot(p[0]-last[0],p[1]-last[1])<2||count+a.stroke.points.length>=MAX_POINTS)return;a.stroke.points.push(p);paint(e.currentTarget,[...strokes,a.stroke]);}} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish}/>
 </div></Localized>;
}
