export type StickerLayout={x:number;y:number;rotation:number;scale:number};
export const defaultStickerLayout:StickerLayout={x:80,y:80,rotation:0,scale:1};
export function validStickerLayout(value:unknown):value is StickerLayout{
 if(!value||typeof value!=='object')return false;
 const v=value as StickerLayout;
 return [v.x,v.y,v.rotation,v.scale].every(n=>typeof n==='number'&&Number.isFinite(n))&&v.x>=0&&v.x<=100&&v.y>=0&&v.y<=100&&v.rotation>=-180&&v.rotation<=180&&v.scale>=0.5&&v.scale<=2;
}
export function readStickerLayout(value?:string|null):StickerLayout{try{const parsed=JSON.parse(value||'null');return validStickerLayout(parsed)?parsed:defaultStickerLayout;}catch{return defaultStickerLayout;}}
export function moveSticker(layout:StickerLayout,x:number,y:number):StickerLayout{return {...layout,x:Math.max(0,Math.min(100,x)),y:Math.max(0,Math.min(100,y))};}
