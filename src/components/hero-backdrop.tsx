'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function HeroBackdrop(){
 const root=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);const [loadNext,setLoadNext]=useState(false);const [ready,setReady]=useState(false);
 const [visible,setVisible]=useState(true);const [paused,setPaused]=useState(false);const [reduce,setReduce]=useState(true);
 useEffect(()=>{
  const query=matchMedia('(prefers-reduced-motion: reduce)');const onMotion=()=>setReduce(query.matches);onMotion();query.addEventListener('change',onMotion);
  const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting),{threshold:.1});if(root.current)observer.observe(root.current);
  const onVisibility=()=>{if(document.hidden)setVisible(false);else if(root.current)setVisible(root.current.getBoundingClientRect().bottom>0)};document.addEventListener('visibilitychange',onVisibility);
  return()=>{query.removeEventListener('change',onMotion);observer.disconnect();document.removeEventListener('visibilitychange',onVisibility)};
 },[]);
 useEffect(()=>{if(reduce||!visible)return;const timer=setTimeout(()=>setLoadNext(true),1200);return()=>clearTimeout(timer)},[reduce,visible]);
 useEffect(()=>{if(!ready||reduce||!visible||paused)return;const timer=setInterval(()=>setActive(current=>1-current),7000);return()=>clearInterval(timer)},[ready,reduce,visible,paused]);
 return <><div className="hero-dental-backdrop hero-fading-backdrop" ref={root} data-active-photo={active} aria-hidden="true"><Image src="/images/hero-background-fade.webp" alt="" fill priority sizes="100vw" className={active===0?'hero-slide active':'hero-slide'}/>{loadNext&&<Image src="/images/dental-hero.webp" alt="" fill sizes="100vw" onLoad={()=>setReady(true)} className={active===1?'hero-slide active':'hero-slide'}/>}</div>{!reduce&&ready&&<button type="button" className="hero-photo-toggle" onClick={()=>setPaused(value=>!value)} aria-pressed={paused}>{paused?'Play photos':'Pause photos'}</button>}</>;
}
