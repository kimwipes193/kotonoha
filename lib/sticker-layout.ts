export type StickerLayout={x:number;y:number;rotation:number;scale:number};
export const defaultStickerLayout:StickerLayout={x:80,y:80,rotation:0,scale:1};
export function validStickerLayout(value:unknown):value is StickerLayout{
 if(!value||typeof value!=='object')return false;
 const v=value as StickerLayout;
 return [v.x,v.y,v.rotation,v.scale].every(n=>typeof n==='number'&&Number.isFinite(n))&&v.x>=0&&v.x<=100&&v.y>=0&&v.y<=100&&v.rotation>=-180&&v.rotation<=180&&v.scale>=0.5&&v.scale<=2;
}
export function readStickerLayout(value?:string|null):StickerLayout{try{const parsed=JSON.parse(value||'null');return validStickerLayout(parsed)?parsed:defaultStickerLayout;}catch{return defaultStickerLayout;}}
export function moveSticker(layout:StickerLayout,x:number,y:number):StickerLayout{return {...layout,x:Math.max(0,Math.min(100,x)),y:Math.max(0,Math.min(100,y))};}
export function stickerCenter(layout:StickerLayout){const margin=6*layout.scale*Math.SQRT2;return {x:margin+(100-2*margin)*layout.x/100,y:margin+(100-2*margin)*layout.y/100};}
// Preserve the paper-space center while scaling; clamp only at the paper edges.
export function transformSticker(layout:StickerLayout,start:{x:number;y:number},current:{x:number;y:number}):StickerLayout{
 const distance=Math.hypot(start.x,start.y);if(distance<.001)return layout;
 const scale=Math.max(.5,Math.min(2,layout.scale*Math.hypot(current.x,current.y)/distance));
 const angle=(Math.atan2(current.y,current.x)-Math.atan2(start.y,start.x))*180/Math.PI;
 const rotation=((layout.rotation+angle+180)%360+360)%360-180;
 const center=stickerCenter(layout),margin=6*scale*Math.SQRT2,area=100-2*margin;
 return moveSticker({...layout,scale,rotation},(center.x-margin)/area*100,(center.y-margin)/area*100);
}
