export function hsvToHex(h:number,s:number,v:number){
 const value=v/100,saturation=s/100;
 const channel=(n:number)=>{const k=(n+h/60)%6;return Math.round(255*value*(1-saturation*Math.max(0,Math.min(k,4-k,1)))).toString(16).padStart(2,'0');};
 return '#'+channel(5)+channel(3)+channel(1);
}
export function hexToHsv(hex:string){
 const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255),max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min;
 let h=delta===0?0:max===r?60*((g-b)/delta%6):max===g?60*((b-r)/delta+2):60*((r-g)/delta+4);
 if(h<0)h+=360;return {h,s:max===0?0:delta/max*100,v:max*100};
}
