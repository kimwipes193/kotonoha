'use client';
import {useEffect,useRef,useState,type CSSProperties,type PointerEvent} from 'react';
import {defaultStickerLayout,moveSticker,stickerCenter,transformSticker,type StickerLayout} from '@/lib/sticker-layout';
import {Localized} from './language';
type Gesture={pointer:number;mode:'move'|'transform';x:number;y:number;cx:number;cy:number;width:number;height:number;layout:StickerLayout};
export function PlacedSticker({sticker,layout,onChange,disabled=false}:{sticker:string;layout:StickerLayout;onChange?:(layout:StickerLayout)=>void;disabled?:boolean}){
 const drag=useRef<Gesture|null>(null),root=useRef<HTMLDivElement>(null);
 const [selected,setSelected]=useState(false);
 useEffect(()=>{function outside(e:globalThis.PointerEvent){if(!root.current?.contains(e.target as Node))setSelected(false);}document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[]);
 useEffect(()=>{drag.current=null;setSelected(false);},[sticker,disabled]);
 if(!sticker)return null;
 const size=12*layout.scale,center=stickerCenter(layout);
 const style={left:`${center.x}%`,top:`${center.y}%`,width:`${size}%`,transform:`translate(-50%,-50%) rotate(${layout.rotation}deg)`,fontSize:`${size}cqw`} as CSSProperties;
 function down(e:PointerEvent<HTMLButtonElement>,mode:Gesture['mode']){
  if(disabled||drag.current||e.button!==0)return;e.preventDefault();e.stopPropagation();setSelected(true);
  const rect=root.current!.parentElement!.getBoundingClientRect();
  drag.current={pointer:e.pointerId,mode,x:e.clientX,y:e.clientY,cx:rect.left+center.x/100*rect.width,cy:rect.top+center.y/100*rect.height,width:rect.width,height:rect.height,layout:{...layout}};
  e.currentTarget.setPointerCapture(e.pointerId);
 }
 function move(e:PointerEvent<HTMLDivElement>){const start=drag.current;if(!start||start.pointer!==e.pointerId||!onChange||disabled)return;e.preventDefault();
  if(start.mode==='move'){const area=1-12*start.layout.scale*Math.SQRT2/100;onChange(moveSticker(start.layout,start.layout.x+(e.clientX-start.x)/start.width/area*100,start.layout.y+(e.clientY-start.y)/start.height/area*100));}
  else onChange(transformSticker(start.layout,{x:start.x-start.cx,y:start.y-start.cy},{x:e.clientX-start.cx,y:e.clientY-start.cy}));
 }
 function end(e:PointerEvent<HTMLDivElement>){if(drag.current?.pointer===e.pointerId)drag.current=null;}
 if(!onChange)return <span className="placed-sticker" style={style} aria-hidden="true"><span className="sticker-art">{sticker}</span></span>;
 return <Localized><div ref={root} className={'placed-sticker editable-sticker '+(selected&&!disabled?'sticker-selected':'')} style={style} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end} onKeyDown={e=>{if(e.key==='Escape'){setSelected(false);drag.current=null;}}}>
 <button type="button" className="sticker-grab" aria-label="ステッカーを移動" aria-pressed={selected} title="ドラッグまたは矢印キーで移動" disabled={disabled} onClick={()=>setSelected(true)} onFocus={()=>setSelected(true)} onPointerDown={e=>down(e,'move')} onKeyDown={e=>{const step=e.shiftKey?10:2;const delta:Record<string,[number,number]>={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]};if(delta[e.key]){e.preventDefault();onChange(moveSticker(layout,layout.x+delta[e.key][0],layout.y+delta[e.key][1]));}}}><span className="sticker-art" aria-hidden="true">{sticker}</span></button>
 {selected&&!disabled&&<><span className="sticker-selection" aria-hidden="true"/>{['nw','ne','sw','se'].map((corner,i)=><button type="button" key={corner} className={'sticker-handle '+corner} aria-label={['左上の角で回転・拡大縮小','右上の角で回転・拡大縮小','左下の角で回転・拡大縮小','右下の角で回転・拡大縮小'][i]} title="角をドラッグして回転・拡大縮小" onPointerDown={e=>down(e,'transform')} onKeyDown={e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();const scale=layout.scale+(e.key==='ArrowUp'?.05:e.key==='ArrowDown'?-.05:0),angle=(e.key==='ArrowRight'?5:e.key==='ArrowLeft'?-5:0)*Math.PI/180;onChange(transformSticker(layout,{x:1,y:0},{x:Math.cos(angle)*scale/layout.scale,y:Math.sin(angle)*scale/layout.scale}));}}><span aria-hidden="true"/></button>)}</>}
 </div></Localized>;
}
export function StickerControls({onChange,onRemove,disabled}:{layout:StickerLayout;onChange:(value:StickerLayout)=>void;onRemove:()=>void;disabled:boolean}){
 return <Localized><div className="sticker-tools"><p>ドラッグで移動。タップして、四隅を動かすと回転・拡大縮小できます。</p><div className="sticker-control-actions"><button type="button" disabled={disabled} onClick={()=>onChange({...defaultStickerLayout})}>配置をリセット</button><button type="button" disabled={disabled} onClick={onRemove}>ステッカーを外す</button></div></div></Localized>;
}
