'use client';
import Image from 'next/image';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

const headlines=[
 ['Creating Beautiful Smiles,','Building Lasting Confidence.'],
 ['Because Every Smile Deserves','Exceptional Care.'],
 ['The Art of Dentistry.','The Beauty of Your Smile.'],
 ['A Healthier Smile.','A More Confident You.'],
 ['Where Advanced Dentistry Meets','Beautiful Smiles.'],
 ['Your Journey to a Perfect Smile','Starts Here.'],
 ['Elevating Smiles,','Transforming Lives.'],
 ['Smile Brighter.','Live Confidently.'],
];
const backgrounds=['/images/hero-background-fade.webp','/images/hero-care.webp','/images/dental-hero.webp'];
type HeroState={frame:number;loadNext:boolean;reduce:boolean;paused:boolean;ready:boolean;toggle:()=>void;markReady:(index:number)=>void};
const HeroContext=createContext<HeroState|null>(null);
function useHero(){const context=useContext(HeroContext);if(!context)throw new Error('Hero content needs HeroExperience');return context}

export function HeroExperience({children}:{children:ReactNode}){
 const root=useRef<HTMLElement>(null);const [frame,setFrame]=useState(0);
 const [loadNext,setLoadNext]=useState(false);const [loaded,setLoaded]=useState([true,false,false]);
 const [visible,setVisible]=useState(true);const [paused,setPaused]=useState(false);const [reduce,setReduce]=useState(true);
 const ready=loaded.every(Boolean);
 useEffect(()=>{
  const query=matchMedia('(prefers-reduced-motion: reduce)');const onMotion=()=>setReduce(query.matches);onMotion();query.addEventListener('change',onMotion);
  const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting&&!document.hidden),{threshold:.1});if(root.current)observer.observe(root.current);
  const onVisibility=()=>{const bounds=root.current?.getBoundingClientRect();setVisible(!document.hidden&&!!bounds&&bounds.bottom>0&&bounds.top<window.innerHeight)};
  document.addEventListener('visibilitychange',onVisibility);
  return()=>{query.removeEventListener('change',onMotion);observer.disconnect();document.removeEventListener('visibilitychange',onVisibility)};
 },[]);
 useEffect(()=>{if(reduce||!visible)return;const timer=setTimeout(()=>setLoadNext(true),1200);return()=>clearTimeout(timer)},[reduce,visible]);
 useEffect(()=>{if(!ready||reduce||!visible||paused)return;const timer=setInterval(()=>setFrame(current=>current+1),7000);return()=>clearInterval(timer)},[ready,reduce,visible,paused]);
 return <HeroContext.Provider value={{frame,loadNext,reduce,paused,ready,toggle:()=>setPaused(value=>!value),markReady:index=>setLoaded(current=>current[index]?current:current.map((value,i)=>i===index?true:value))}}><section className="hero hero-background" ref={root}>{children}</section></HeroContext.Provider>;
}

export function HeroBackdrop(){
 const hero=useHero();const active=hero.frame%backgrounds.length;
 return <><div className="hero-dental-backdrop hero-fading-backdrop" data-active-photo={active} aria-hidden="true">{backgrounds.map((src,index)=>index===0||hero.loadNext?<Image key={src} src={src} alt="" fill priority={index===0} sizes="100vw" onLoad={()=>hero.markReady(index)} className={active===index?'hero-slide active':'hero-slide'}/>:null)}</div>{!hero.reduce&&hero.ready&&<button type="button" className="hero-photo-toggle" onClick={hero.toggle} aria-pressed={hero.paused}>{hero.paused?'Play animation':'Pause animation'}</button>}</>;
}

export function HeroHeadline(){
 const {frame,reduce}=useHero();const current=headlines[frame%headlines.length];const previous=headlines[(frame-1+headlines.length)%headlines.length];
 return <h1 className="hero-headline" data-headline-index={frame%headlines.length}><span className={frame===0||reduce?'hero-quote-current is-still':'hero-quote-current'} key={frame}>{current[0]} <em>{current[1]}</em></span>{frame>0&&!reduce&&<span className="hero-quote-outgoing" key={`out-${frame}`} aria-hidden="true">{previous[0]} <em>{previous[1]}</em></span>}</h1>;
}
