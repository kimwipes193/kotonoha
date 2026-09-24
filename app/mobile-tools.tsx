'use client';
import {useState} from 'react';
import {Bell,ChevronDown,Gift,Mail,Send} from 'lucide-react';
import {LanguagePicker,Localized,useLanguage} from './language';
import {translate} from '@/lib/messages';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
type HistoryEntry={id:string;created:number;friendship?:string;mine?:boolean};
type Reward={id:string;day:string;kind:string;item:string};
export default function MobileTools({signedIn,sent,received,letters,rewards}:{signedIn:boolean;sent:HistoryEntry[];received:HistoryEntry[];letters:HistoryEntry[];rewards:Reward[]}){
 const {locale}=useLanguage();const [open,setOpen]=useState(false);
 const history=[...sent.map(e=>({...e,key:'sent-'+e.id,kind:'sent',date:new Date(e.created),label:'日記を投函しました'})),...received.map(e=>({...e,key:'received-'+e.id,kind:'received',date:new Date(e.created),label:'日記が届いています'})),...letters.map(e=>({...e,key:'friend-'+e.id,kind:e.mine?'sent':'received',date:new Date(e.created),label:e.mine?'フレンドに日記を投函しました':'フレンドの日記が届いています'})),...rewards.filter(e=>e.kind==='gacha').map(e=>({...e,key:'gift-'+e.id,kind:'gift',date:new Date(e.day+'T00:00:00+09:00'),label:'ガチャの贈りものを受け取りました'}))].sort((a,b)=>b.date.getTime()-a.date.getTime()).slice(0,100);
 return <Localized><div className="mobile-header-tools"><details className="mobile-settings"><summary aria-label="言語とアカウント設定"><ChevronDown size={23}/></summary><div className="mobile-settings-panel"><LanguagePicker/>{signedIn?<form action="/api/auth/logout" method="post"><button type="submit">ログアウト</button></form>:<a href="/api/auth/google">Googleでログイン</a>}</div></details><button type="button" className="mobile-bell" aria-label="通知履歴" onClick={()=>setOpen(true)}><Bell size={27}/></button></div><Dialog open={open} onOpenChange={setOpen}><DialogContent className="notification-dialog"><DialogTitle>通知履歴</DialogTitle><DialogDescription>日記の送受信とガチャの受け取り履歴</DialogDescription>{!signedIn?<p>ログインすると通知履歴を確認できます。</p>:!history.length?<p>まだ通知はありません。</p>:<ol className="notification-list">{history.map(e=><li key={e.key}>{e.kind==='gift'?<Gift/>:e.kind==='sent'?<Send/>:<Mail/>}<div><strong>{translate(e.label,locale)}</strong>{e.kind==='gift'&&'item'in e&&<span data-i18n-skip>{e.item.startsWith('paper-')?translate('便箋',locale):e.item}</span>}<small>{e.kind!=='gift'&&translate('日記の投稿日',locale)+'：'}{e.date.toLocaleDateString(locale,{timeZone:'Asia/Tokyo',year:'numeric',month:'short',day:'numeric'})}</small></div></li>)}</ol>}</DialogContent></Dialog></Localized>;
}
