'use client';
import {cloneElement,createContext,isValidElement,useContext,useEffect,useState,type ReactNode} from 'react';
import {detectLocale,locales,translate,validLocale,type Locale} from '@/lib/messages';
const LanguageContext=createContext<{locale:Locale;setLocale:(locale:Locale)=>void}>({locale:'ja',setLocale:()=>{}});
export function LanguageProvider({children}:{children:ReactNode}){
 const [locale,setValue]=useState<Locale>('ja');
 useEffect(()=>{let saved:string|null=null;try{saved=localStorage.getItem('kotonoha-language');}catch{}setValue(validLocale(saved)?saved:detectLocale(navigator.languages));},[]);
 useEffect(()=>{document.documentElement.lang=locale;document.title=locale==='ja'?'ことのは — 匿名の誰かと交換日記':`Kotonoha — ${translate('交換日記帳',locale)}`;},[locale]);
 function setLocale(value:Locale){if(!validLocale(value))return;setValue(value);try{localStorage.setItem('kotonoha-language',value);}catch{}}
 return <LanguageContext.Provider value={{locale,setLocale}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){return useContext(LanguageContext);}
export function LanguagePicker(){const {locale,setLocale}=useLanguage();return <label className="language-picker"><span aria-hidden="true">🌐</span><span className="sr-only">{translate('言語',locale)}</span><select aria-label={translate('言語',locale)} value={locale} onChange={e=>setLocale(e.target.value as Locale)}>{[['ja','日本語'],['en','English'],['fr','Français'],['zh-CN','简体中文'],['ko','한국어']].map(([value,label])=><option key={value} value={value} lang={value}>{label}</option>)}</select></label>;}
const countryCodes=new Map<string,string>();
const japaneseCountries=new Intl.DisplayNames(['ja'],{type:'region'});
for(let a=65;a<=90;a++)for(let b=65;b<=90;b++){const code=String.fromCharCode(a,b);const name=japaneseCountries.of(code);if(name&&name!==code)countryCodes.set(name,code);}
export function countryName(name:string,locale:Locale){const code=countryCodes.get(name);return code?new Intl.DisplayNames([locale],{type:'region'}).of(code)??name:translate(name,locale);}
function uiText(text:string,locale:Locale){
 const owned=text.match(/^所持数 (\d+) 枚$/);if(owned)return translate('所持数 {count} 枚',locale,{count:owned[1]});
 return translate(text,locale);
}
// Translate presentation only. Never alter form values, handlers, or user-written diary text.
export function localizeTree(node:ReactNode,locale:Locale):ReactNode{
 if(Array.isArray(node))return node.map((child,index)=>{const localized=localizeTree(child,locale);return isValidElement(localized)&&localized.key===null?cloneElement(localized,{key:index}):localized;});
 const child=node;
  if(typeof child==='string')return uiText(child,locale);
  if(!isValidElement<Record<string,unknown>>(child))return child;
  const props=child.props;
  if(props['data-i18n-skip']||child.type==='textarea'||child.type==='input'){
   if(child.type==='textarea'&&typeof props.placeholder==='string')return cloneElement(child,{placeholder:uiText(props.placeholder,locale)});
   return child;
  }
  const changes:Record<string,unknown>={};
  for(const key of ['title','aria-label','alt','placeholder'])if(typeof props[key]==='string')changes[key]=uiText(props[key] as string,locale);
  if(props.children!==undefined)changes.children=localizeTree(props.children as ReactNode,locale);
  return cloneElement(child,changes);
}
export function Localized({children}:{children:ReactNode}){const {locale}=useLanguage();return <>{localizeTree(children,locale)}</>;}
