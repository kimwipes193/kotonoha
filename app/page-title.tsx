'use client';
import {useLanguage} from './language';
import {translate} from '@/lib/messages';
const headings={'きょうの日記':'today','交換日記帳':'book','フレンド':'friends','メッセージ':'messages','コレクション':'collection'} as const;
export default function PageTitle({headingKey}:{headingKey:keyof typeof headings}){
 const {locale}=useLanguage();
 return <h1 className="handwritten-heading" data-i18n-skip>{(locale==='ja'||locale==='en'||locale==='ko')?<img src={'/heading-'+headings[headingKey]+(locale==='ja'?'':'-'+locale)+'.svg'} alt={translate(headingKey,locale)}/>:translate(headingKey,locale)}</h1>;
}
