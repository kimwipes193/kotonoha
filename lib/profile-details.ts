import {validStickerPlacements,type StickerPlacement} from './sticker-layout';
import {checkDiary} from './diary-rules';
export const profileThemes=['stars','gingham','dots','letter'] as const;
export const profileColors=['lavender','sky','peach','mint','cream'] as const;
export const favoriteFields=['food','color','place','work'] as const;
export type ProfileDetails={theme:typeof profileThemes[number];color:typeof profileColors[number];favorites:Record<typeof favoriteFields[number],string>;stickers:StickerPlacement[]};
export function defaultProfileDetails():ProfileDetails{return {theme:'stars',color:'sky',favorites:{food:'',color:'',place:'',work:''},stickers:[]};}
export function validProfileDetails(v:any):v is ProfileDetails{return !!v&&JSON.stringify(v).length<=3000&&Object.keys(v).every(k=>['theme','color','favorites','stickers'].includes(k))&&profileThemes.includes(v.theme)&&profileColors.includes(v.color)&&!!v.favorites&&favoriteFields.every(k=>typeof v.favorites[k]==='string'&&v.favorites[k].length<=40&&(!v.favorites[k].trim()||!checkDiary(v.favorites[k])))&&validStickerPlacements(v.stickers)&&v.stickers.every((p:StickerPlacement)=>!p.target||p.target==='text');}
export function readProfileDetails(raw?:string|null):ProfileDetails{try{const v=JSON.parse(raw||'null');return validProfileDetails(v)?v:defaultProfileDetails();}catch{return defaultProfileDetails();}}
