'use client';
import {useEffect,useRef,useState,type ReactNode,type KeyboardEvent,type PointerEvent} from 'react';
import {MAX_POINTS,MAX_STROKES,type Stroke} from '@/lib/drawing';
import {hsvToHex,hexToHsv} from '@/lib/pen-color';
import {Localized} from './language';

export function paint(canvas:HTMLCanvasElement,strokes:Stroke[]){
 const ctx=canvas.getContext('2d');if(!ctx)return;
 ctx.clearRect(0,0,600,400);ctx.lineCap='round';ctx.lineJoin='round';
 for(const s of strokes){ctx.globalCompositeOperation=s.erase?'destination-out':'source-over';ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=s.width;ctx.beginPath();const [x,y]=s.points[0];ctx.moveTo(x,y);if(s.points.length===1){ctx.arc(x,y,s.width/2,0,Math.PI*2);ctx.fill();}else{for(const p of s.points.slice(1))ctx.lineTo(...p);ctx.stroke();}}
 ctx.globalCompositeOperation='source-over';
}
export function DrawingCanvas({strokes,onChange,disabled=false,children}:{strokes:Stroke[];onChange?:(s:Stroke[])=>void;disabled?:boolean;children?:ReactNode}){
 const canvas=useRef<HTMLCanvasElement>(null),active=useRef<{id:number;stroke:Stroke}|null>(null);
 const [brightness,setBrightness]=useState(100*50/255),[saturation,setSaturation]=useState(34);
 const [hue,setHue]=useState(250.58823529411765),[ink,setInk]=useState('#242132'),[width,setWidth]=useState(4),[erase,setErase]=useState(false),[redo,setRedo]=useState<Stroke[][]>([]),[undo,setUndo]=useState<Stroke[][]>([]);
 const expectedStrokes=useRef(strokes);
 useEffect(()=>{if(expectedStrokes.current!==strokes){setUndo([]);setRedo([]);expectedStrokes.current=strokes;}},[strokes]);
 function change(next:Stroke[]){expectedStrokes.current=next;onChange?.(next);}
 const count=strokes.reduce((n,s)=>n+s.points.length,0),full=count>=MAX_POINTS||strokes.length>=MAX_STROKES;
 useEffect(()=>{if(canvas.current)paint(canvas.current,strokes);},[strokes]);
 function point(e:PointerEvent<HTMLCanvasElement>):[number,number]{const r=e.currentTarget.getBoundingClientRect();return [Math.round(Math.max(0,Math.min(600,(e.clientX-r.left)/r.width*600))),Math.round(Math.max(0,Math.min(400,(e.clientY-r.top)/r.height*400)))];}
 function finish(e:PointerEvent<HTMLCanvasElement>){if(active.current?.id!==e.pointerId)return;const stroke=active.current.stroke;active.current=null;setUndo([...undo,strokes]);change([...strokes,stroke]);setRedo([]);}
 function undoStroke(){if(!onChange||disabled||active.current||(!strokes.length&&!undo.length))return;setRedo([...redo,strokes]);change(undo.length?undo[undo.length-1]:strokes.slice(0,-1));setUndo(undo.slice(0,-1));}
 function redoStroke(){if(!onChange||disabled||active.current||!redo.length)return;setUndo([...undo,strokes]);change(redo[redo.length-1]);setRedo(redo.slice(0,-1));}
 function historyKey(e:KeyboardEvent<HTMLDivElement>){
  if(!onChange||disabled||active.current||e.nativeEvent.isComposing||e.altKey||!(e.ctrlKey||e.metaKey))return;
  const target=e.target as HTMLElement;
  if(target.closest('input,textarea,select,[contenteditable="true"],[role="textbox"]'))return;
  const key=e.key.toLowerCase();if(key!=='z'&&key!=='y')return;
  e.preventDefault();e.stopPropagation();if(key==='y'||e.shiftKey)redoStroke();else undoStroke();
 }
 function chooseHue(h:number){setHue(h);setSaturation(80);setInk(hsvToHex(h,80,brightness));setErase(false);}
 function chooseBrightness(v:number){setBrightness(v);setInk(hsvToHex(hue,saturation,v));setErase(false);}
 function chooseSwatch(color:string){const hsv=hexToHsv(color);setHue(hsv.h);setSaturation(hsv.s);setBrightness(hsv.v);setInk(color);setErase(false);}
 return <Localized><div className="drawing-panel" onKeyDown={historyKey}>
 {onChange&&<div className="drawing-tools"><img className="posto-pencil" src="/posto-artist.png" alt="" aria-hidden="true"/><div className="drawing-actions"><button type="button" aria-pressed={!erase} onClick={()=>setErase(false)}>筆</button><button type="button" aria-pressed={erase} onClick={()=>setErase(true)}>消しゴム</button><button type="button" className="drawing-history" aria-label="元に戻す" title="元に戻す" aria-keyshortcuts="Control+Z Meta+Z" disabled={disabled||(!strokes.length&&!undo.length)} onClick={undoStroke}><HistoryArrow/></button><button type="button" className="drawing-history" aria-label="やり直す" title="やり直す" aria-keyshortcuts="Control+Y Meta+Y Meta+Shift+Z" disabled={disabled||!redo.length} onClick={redoStroke}><HistoryArrow forward/></button><button type="button" disabled={disabled||!strokes.length} onClick={()=>{if(active.current)return;setUndo([...undo,strokes]);setRedo([]);change([]);}}>全消去</button></div><label>色 <input aria-label="ペンの色" className="hue-slider" type="range" min="0" max="359" value={hue} onChange={e=>chooseHue(Number(e.target.value))}/><span className="ink-preview" style={{background:ink}}/></label><div className="ink-swatches">{['#242132','#ffffff','#e65e66','#f4ad37','#51a884','#568bcc','#9368b7'].map(color=><button key={color} type="button" aria-label={color} aria-pressed={ink===color&&!erase} style={{background:color}} onClick={()=>chooseSwatch(color)}/>)}</div><label>明度 <input aria-label="ペンの明度" className="brightness-slider" style={{background:`linear-gradient(to right,#000,${hsvToHex(hue,saturation,100)})`}} type="range" min="0" max="100" value={brightness} onChange={e=>chooseBrightness(Number(e.target.value))}/><output>{Math.round(brightness)}%</output></label><label>太さ <input aria-label="ペンと消しゴムの太さ" type="range" min="1" max="40" value={width} onChange={e=>setWidth(Number(e.target.value))}/><output>{width}</output></label>{full&&<p role="status">画数の上限です。元に戻すと描き直せます。</p>}</div>}
 <div className="drawing-artboard"><canvas tabIndex={onChange&&!disabled?0:undefined} ref={canvas} width={600} height={400} role="img" aria-label="手書き・絵日記" className={onChange?'drawing-surface editable-drawing':'drawing-surface'} style={{touchAction:onChange&&!disabled?'none':'auto'}} onPointerDown={e=>{if(!onChange||disabled||full||active.current||e.button!==0)return;e.preventDefault();e.currentTarget.focus({preventScroll:true});e.currentTarget.setPointerCapture(e.pointerId);active.current={id:e.pointerId,stroke:{color:ink,width,erase,points:[point(e)]}};paint(e.currentTarget,[...strokes,active.current.stroke]);}} onPointerMove={e=>{const a=active.current;if(!a||a.id!==e.pointerId)return;const p=point(e),last=a.stroke.points.at(-1)!;if(Math.hypot(p[0]-last[0],p[1]-last[1])<2||count+a.stroke.points.length>=MAX_POINTS)return;a.stroke.points.push(p);paint(e.currentTarget,[...strokes,a.stroke]);}} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish}/>{children}</div>
 </div></Localized>;
}

function HistoryArrow({forward=false}:{forward?:boolean}){return <svg width="25" height="25" viewBox="0 0 24 24" aria-hidden="true" style={forward?{transform:'scaleX(-1)'}:undefined}><path d="M9 3 3 8l6 5V9h5a6 6 0 0 1 0 12H5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3 3 8l6 5Z" fill="currentColor"/></svg>;}
