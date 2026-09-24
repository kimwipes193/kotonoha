'use client';
import {useEffect,useState,type ReactNode} from 'react';
import {createPortal} from 'react-dom';
export default function ResponsiveDock({children}:{children:ReactNode}){
 const [mobile,setMobile]=useState(false);
 useEffect(()=>{const media=matchMedia('(max-width:700px)');const update=()=>setMobile(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{document.querySelectorAll('.main-nav .nav-symbol svg path,.main-nav .nav-symbol svg line,.main-nav .nav-symbol svg polyline,.main-nav .nav-symbol svg rect,.main-nav .nav-symbol svg circle').forEach(shape=>shape.setAttribute('pathLength','100'));},[mobile]);
 const nav=<aside className={'sidebar'+(mobile?' mobile-dock':'')}>{children}</aside>;
 return mobile?createPortal(nav,document.body):nav;
}
