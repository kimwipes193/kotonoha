import type {Stroke} from './drawing';

// Reveal saved points in order, preserving pen styles and eraser compositing.
export function drawingFrame(strokes:Stroke[],progress:number):Stroke[]{
 if(progress>=1)return strokes;
 if(progress<=0)return [];
 let remaining=Math.floor(strokes.reduce((n,s)=>n+s.points.length,0)*progress);
 const frame:Stroke[]=[];
 for(const stroke of strokes){
  if(remaining<=0)break;
  frame.push(remaining>=stroke.points.length?stroke:{...stroke,points:stroke.points.slice(0,remaining)});
  remaining-=stroke.points.length;
 }
 return frame;
}
export function drawingDuration(strokes:Stroke[]){return Math.min(10000,Math.max(2500,strokes.reduce((n,s)=>n+s.points.length,0)*8))/1.3;}
