'use client';
import {useLanguage} from './language';
import {translate} from '@/lib/messages';
const headings={'きょうの日記':'today','交換日記帳':'book','フレンド':'friends','コレクション':'collection'} as const;
export default function PageTitle({title}:{title:keyof typeof headings}){
 const {locale}=useLanguage();
 return <h1 className="handwritten-heading" data-i18n-skip>{(locale==='ja'||locale==='en')?<img src={'/heading-'+headings[title]+(locale==='en'?'-en':'')+'.svg'} alt={translate(title,locale)}/>:translate(title,locale)}</h1>;
}
