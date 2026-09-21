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
