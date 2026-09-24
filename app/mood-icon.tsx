'use client';
import {Sun,CloudSun,Cloud,CloudRain,Moon} from 'lucide-react';
import {useLanguage} from './language';
import {translate} from '@/lib/messages';
const moods=['☀️','🌤️','☁️','🌧️','🌙'];
const labels=['晴れやか','おだやか','もやもや','しょんぼり','ひとやすみ'];
export default function MoodIcon({mood,size=25}:{mood:string;size?:number}){
 const {locale}=useLanguage();const index=Math.max(0,moods.indexOf(mood));const Icon=[Sun,CloudSun,Cloud,CloudRain,Moon][index];
 return <span className="diary-mood-icon" role="img" aria-label={translate(labels[index],locale)} title={translate(labels[index],locale)}><Icon size={size} aria-hidden="true"/></span>;
}
