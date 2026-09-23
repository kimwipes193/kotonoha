import {normalizeProfilePhoto} from './profile-image';
function loadPhotoImage(src:string):Promise<HTMLImageElement>{return new Promise((resolve,reject)=>{const img=new Image();const timer=setTimeout(()=>{img.src='';reject(new Error('photo-timeout'));},20000);img.onload=()=>{clearTimeout(timer);if(img.naturalWidth&&img.naturalHeight)resolve(img);else reject(new Error('photo-decode'));};img.onerror=()=>{clearTimeout(timer);reject(new Error('photo-decode'));};img.src=src;});}
function fileDataUrl(file:File):Promise<string>{return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error('photo-read'));reader.onabort=()=>reject(new Error('photo-read'));reader.readAsDataURL(file);});}
export async function readProfilePhoto(file:File):Promise<string>{
 const url=URL.createObjectURL(file);let img:HTMLImageElement|undefined;const canvas=document.createElement('canvas');
 try{
  try{img=await loadPhotoImage(url);}catch{img=await loadPhotoImage(await fileDataUrl(file));}
  canvas.width=canvas.height=256;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('photo-canvas');
  const side=Math.min(img.naturalWidth,img.naturalHeight);ctx.fillStyle='#fff';ctx.fillRect(0,0,256,256);ctx.drawImage(img,(img.naturalWidth-side)/2,(img.naturalHeight-side)/2,side,side,0,0,256,256);
  for(const quality of [.82,.65,.45]){try{return normalizeProfilePhoto(canvas.toDataURL('image/jpeg',quality));}catch{}}
  throw new Error('photo-convert');
 }finally{URL.revokeObjectURL(url);if(img)img.src='';canvas.width=canvas.height=0;}
}
export async function readMessagePhoto(file:File):Promise<string>{
 if(file.size>15*1024*1024)throw new Error('写真は15MB以下で選んでください。');
 const url=URL.createObjectURL(file),canvas=document.createElement('canvas');let img:HTMLImageElement|undefined;
 try{
  try{img=await loadPhotoImage(url);}catch{img=await loadPhotoImage(await fileDataUrl(file));}
  const scale=Math.min(1,1280/Math.max(img.naturalWidth,img.naturalHeight));
  canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('photo-canvas');
  ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
  for(const quality of [.8,.65,.45,.25]){try{return normalizeProfilePhoto(canvas.toDataURL('image/jpeg',quality),1280,350000);}catch{}}
  throw new Error('photo-convert');
 }catch{throw new Error('写真を読み込めませんでした。JPEG・PNGなど別の写真をお試しください。');}
 finally{URL.revokeObjectURL(url);if(img)img.src='';canvas.width=canvas.height=0;}
}
