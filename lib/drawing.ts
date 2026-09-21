export type Stroke={color:string;width:number;erase:boolean;points:[number,number][]};
export const MAX_POINTS=8000,MAX_STROKES=300;
export function validDrawing(value:unknown):value is Stroke[]{
 if(!Array.isArray(value)||value.length>MAX_STROKES)return false;
 let count=0;
 return value.every(s=>s&&typeof s.color==='string'&&/^#[0-9a-f]{6}$/i.test(s.color)&&typeof s.erase==='boolean'&&Number.isFinite(s.width)&&s.width>=1&&s.width<=40&&Array.isArray(s.points)&&s.points.length>0&&(count+=s.points.length)<=MAX_POINTS&&s.points.every((p:unknown)=>Array.isArray(p)&&p.length===2&&p.every((n,i)=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=(i===0?600:400))));
}
export function readDrawing(raw?:string|null):Stroke[]{try{const value=JSON.parse(raw??'[]');return validDrawing(value)?value:[];}catch{return [];}}
export function hasDrawing(strokes:Stroke[]){return strokes.some(s=>!s.erase);}
