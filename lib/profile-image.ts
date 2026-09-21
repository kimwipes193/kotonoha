export function validProfilePhoto(value:unknown):value is string{
 if(typeof value!=='string'||value.length>100000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value))return false;
 try{const bytes=Uint8Array.from(atob(value.slice(23)),c=>c.charCodeAt(0));if(bytes[0]!==255||bytes[1]!==216||bytes.at(-2)!==255||bytes.at(-1)!==217)return false;
 let pos=2,dimensions=false;
 while(pos<bytes.length-2){if(bytes[pos++]!==255)return false;const marker=bytes[pos++];if(marker===218)return dimensions;if(marker===225)return false;const length=(bytes[pos]<<8)|bytes[pos+1];if(length<2||pos+length>bytes.length)return false;if(marker===192||marker===194){const h=(bytes[pos+3]<<8)|bytes[pos+4],w=(bytes[pos+5]<<8)|bytes[pos+6];if(w<1||h<1||w>256||h>256)return false;dimensions=true;}pos+=length;}
 return false;
 }catch{return false;}
}

// Some browser encoders attach EXIF even when exporting a freshly drawn canvas.
// Strip optional metadata locally before applying the same strict server validator.
export function normalizeProfilePhoto(value:string):string{
 if(value.length>500000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value))throw new Error('photo-format');
 const bytes=Uint8Array.from(atob(value.slice(23)),c=>c.charCodeAt(0));
 if(bytes[0]!==255||bytes[1]!==216)throw new Error('photo-format');
 const parts:Uint8Array[]=[bytes.slice(0,2)];let pos=2,scan=false;
 while(pos<bytes.length){
  const start=pos;if(bytes[pos++]!==255)throw new Error('photo-format');
  while(bytes[pos]===255)pos++;
  const marker=bytes[pos++];
  if(marker===218){parts.push(bytes.slice(start));scan=true;break;}
  const length=(bytes[pos]<<8)|bytes[pos+1];if(length<2||pos+length>bytes.length)throw new Error('photo-format');
  if(!((marker>=225&&marker<=239)||marker===254))parts.push(bytes.slice(start,pos+length));
  pos+=length;
 }
 if(!scan)throw new Error('photo-format');
 let binary='';for(const part of parts)for(const byte of part)binary+=String.fromCharCode(byte);
 const cleaned='data:image/jpeg;base64,'+btoa(binary);
 if(!validProfilePhoto(cleaned))throw new Error('photo-format');
 return cleaned;
}
