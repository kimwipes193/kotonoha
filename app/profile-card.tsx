'use client';
import ProfileAvatar from './profile-avatar';
import {PlacedSticker} from './sticker';
import {Localized,useLanguage} from './language';
import {translate} from '@/lib/messages';
import {favoriteFields,type ProfileDetails} from '@/lib/profile-details';
import type {StickerLayout} from '@/lib/sticker-layout';
export const favoriteLabels={food:'好きな食べ物',color:'好きな色',place:'好きな場所',work:'好きな作品'};
export default function ProfileCard({nickname,icon,birthday,details,onStickerChange,disabled,isFriend=false}:{nickname?:string;icon?:string;birthday?:string;details:ProfileDetails;onStickerChange?:(index:number,layout:StickerLayout)=>void;disabled?:boolean;isFriend?:boolean}){
 const {locale}=useLanguage();
 return <Localized><section className={'profile-artboard profile-theme-'+details.theme+' profile-color-'+details.color}>
 <div className="profile-book-holes" aria-hidden="true"><i/><i/><i/><i/></div>
 <div className="profile-art-title"><img src={isFriend?"/friend-profile-umeboshi.svg":"/my-profile-umeboshi.svg"} alt={isFriend?"FRIEND PROFILE":"MY PROFILE"}/></div>
 <div className="profile-art-person"><div className="profile-polaroid"><ProfileAvatar icon={icon}/></div><dl><dt>ニックネーム</dt><dd data-i18n-skip>{nickname||'—'}</dd><dt>誕生日</dt><dd data-i18n-skip>{birthday?.replace('-',' / ')||'—'}</dd></dl></div>
 <div className="profile-favorites">{favoriteFields.map(k=><div className={'favorite-bubble favorite-'+k} key={k}><span>{translate(favoriteLabels[k],locale)}</span><p data-i18n-skip>{details.favorites[k]||'—'}</p></div>)}</div>
 <img className="profile-posto" src="/posto-wink.png" alt="" aria-hidden="true"/><span className="profile-art-footer" aria-hidden="true">a little book about me ✦</span>
 {details.stickers.map((p,i)=><PlacedSticker key={i} sticker={p.sticker} layout={p.layout} onChange={onStickerChange?(layout)=>onStickerChange(i,layout):undefined} disabled={disabled}/>)}
 </section></Localized>;
}
