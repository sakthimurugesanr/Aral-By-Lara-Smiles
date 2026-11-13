'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const teeth=[
 {name:'Incisor',concern:'Surface decay',path:'M51 49Q90 33 129 49L126 108Q121 136 110 158L99 205Q90 225 81 205L70 158Q59 136 54 108Z',spot:'M70 72Q83 62 94 75L90 91Q77 99 67 86Z'},
 {name:'Canine',concern:'Decay near the gumline',path:'M48 71Q65 43 90 29Q115 43 132 71L125 119Q119 144 108 168L100 208Q90 230 80 208L72 168Q61 144 55 119Z',spot:'M62 111Q77 103 89 116L84 132Q73 139 65 129Z'},
 {name:'Premolar',concern:'Between-teeth decay',path:'M39 58Q51 35 72 43L90 54L108 43Q129 35 141 58Q148 82 137 115L123 153L118 202Q112 224 101 205L90 174L79 205Q68 224 62 202L57 153L43 115Q32 82 39 58Z',spot:'M128 77Q144 70 141 91L134 108Q124 107 121 94Z'},
 {name:'Molar',concern:'Deeper decay',path:'M29 64Q32 39 55 42Q73 34 90 48Q107 34 125 42Q148 39 151 64L145 112Q139 135 131 152L124 207Q117 228 105 205L90 165L75 205Q63 228 56 207L49 152Q41 135 35 112Z',spot:'M72 64L88 60L103 67L108 85L97 102L104 120L88 136L77 118L82 98L67 85Z'},
];
const stages=[
 {label:'Notice the signs',text:'Different tooth shapes. Different places decay can develop.'},
 {label:'Understand the concern',text:'A dental examination helps determine the extent of the problem.'},
 {label:'Plan the right care',text:'A conceptual repair — your dentist recommends the appropriate treatment.'},
];

function ToothIllustration({index}:{index:number}){
 const tooth=teeth[index];const id=`care-tooth-${index}`;
 return <svg className="care-tooth-svg" viewBox="0 0 180 240" role="img" aria-label={`${tooth.name} showing ${tooth.concern.toLowerCase()} and an illustrative restoration`}>
  <defs><linearGradient id={id+'-base'} x1="35" y1="40" x2="145" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="#fffaf0"/><stop offset=".5" stopColor="#eae0ca"/><stop offset="1" stopColor="#d8d2c3"/></linearGradient><linearGradient id={id+'-healthy'} x1="40" y1="40" x2="140" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset=".5" stopColor="#f9fcf9"/><stop offset="1" stopColor="#d8e9e3"/></linearGradient><radialGradient id={id+'-decay'}><stop stopColor="#4f302c"/><stop offset=".6" stopColor="#805b40"/><stop offset="1" stopColor="#aa8554"/></radialGradient></defs>
  <ellipse className="tooth-ground" cx="90" cy="224" rx="43" ry="6" fill="#56766a" opacity=".09"/>
  <g className="tooth-body-art"><path d={tooth.path} fill={`url(#${id}-base)`} stroke="#c8c4b6" strokeWidth="1.3"/><path className="tooth-healthy-enamel" d={tooth.path} fill={`url(#${id}-healthy)`} stroke="#aac8bc" strokeWidth="1.3"/><path d={index===1?'M68 76Q81 56 90 52':'M57 63Q72 52 83 59'} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".75"/>
  <g className="tooth-concern-layer"><path d={tooth.spot} fill={`url(#${id}-decay)`}/>{index===3&&<path d="M88 72L83 87L91 98L86 117" fill="none" stroke="#392c29" strokeWidth="3" strokeLinecap="round"/>}<circle cx={index===2?132:80} cy={index===1?120:80} r="3.3" fill="#49352d" opacity=".6"/></g>
  <path className="tooth-restoration-seam" d={tooth.spot} fill="#fffefa" stroke="#b6d2c6" strokeWidth=".9"/>
  <g className="tooth-glint" stroke="#77a490" strokeWidth="1.25" strokeLinecap="round"><path d="M141 34v14m-7-7h14M41 145v9m-4.5-4.5h9"/></g></g>
 </svg>;
}

export function ToothJourney(){
 const root=useRef<HTMLElement>(null);const panel=useRef<HTMLDivElement>(null);const currentStage=useRef(0);const [stage,setStage]=useState(0);
 const setManual=(healthy:boolean)=>{root.current?.style.setProperty('--care-progress',healthy?'1':'0');const next=healthy?2:0;currentStage.current=next;setStage(next)};
 useEffect(()=>{
  const sectionElement=root.current;const panelElement=panel.current;if(!sectionElement||!panelElement)return;
  const element=sectionElement;const pinnedPanel=panelElement;
  let disposed=false;let cleanup:undefined|(()=>void);let started=false;
  const updateStage=(progress:number)=>{const next=progress<.18?0:progress<.5?1:2;if(next!==currentStage.current){currentStage.current=next;setStage(next)}};
  async function setup(){
   if(started)return;started=true;
   try{
    const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);if(disposed)return;
    gsap.registerPlugin(ScrollTrigger);
    const media=gsap.matchMedia();
    media.add({all:'all',desktop:'(min-width: 1024px) and (min-height: 700px)',reduce:'(prefers-reduced-motion: reduce)'},context=>{
     const conditions=context.conditions as {desktop:boolean;reduce:boolean};
     const headerHeight=document.querySelector('header')?.getBoundingClientRect().height||100;
     const bottomSpace=conditions.desktop?18:78;
     const canPin=pinnedPanel.offsetHeight+headerHeight+bottomSpace+20<=window.innerHeight;
     if(conditions.reduce||!canPin){element.dataset.scrollMode='manual';element.style.setProperty('--care-progress','0');updateStage(0);return;}
     element.dataset.scrollMode='pinned';
     const cards=element.querySelectorAll('.journey-tooth');const glints=element.querySelectorAll('.tooth-glint');
     gsap.set(element,{'--care-progress':0});gsap.set(glints,{autoAlpha:0});
     const timeline=gsap.timeline({defaults:{ease:'none'},onUpdate(){updateStage(this.progress())},scrollTrigger:{id:'aral-tooth-care',trigger:element,pin:pinnedPanel,pinSpacing:true,start:()=>`top ${headerHeight+12}px`,end:conditions.desktop?'+=1200':'+=950',scrub:conditions.desktop?.55:.3,anticipatePin:1,invalidateOnRefresh:true}});
     timeline.addLabel('notice',0)
      .fromTo(cards,{y:5},{y:0,duration:.5,stagger:.025},0)
      .addLabel('assessment',.65)
      .to(element,{'--care-progress':1,duration:1.2},.85)
      .to(pinnedPanel,{backgroundColor:'#f8e7ee',duration:1.2},.85)
      .to(glints,{autoAlpha:1,duration:.25,stagger:.025},1.9)
      .addLabel('care',2.2)
      .to({hold:0},{hold:1,duration:1.9});
     return ()=>{element.style.removeProperty('--care-progress');};
    },element);
    cleanup=()=>media.revert();
    requestAnimationFrame(()=>{if(!disposed)ScrollTrigger.refresh()});
   }catch{if(!disposed)element.dataset.scrollMode='manual';}
  }
  const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();void setup()}},{rootMargin:'700px'});observer.observe(element);
  return()=>{disposed=true;observer.disconnect();cleanup?.()};
 },[]);
 return <section id="tooth-care-journey" className="tooth-journey" ref={root} data-scroll-scene data-stage={stage} aria-labelledby="tooth-journey-title"><div className="tooth-journey-panel" ref={panel}>
  <div className="tooth-journey-heading"><div><p className="eyebrow">A closer look</p><h2 id="tooth-journey-title">Small signs. <em>Thoughtful care.</em></h2></div><div className="tooth-journey-instructions"><p>Scroll to explore. Pause on the care illustration, then continue. Scroll back to reverse.</p><a href="#clear-aligner-care">Skip illustration</a></div></div>
  <div className="tooth-journey-art">{teeth.map((tooth,index)=><figure className="journey-tooth" key={tooth.name}><ToothIllustration index={index}/><figcaption><strong>{tooth.name}</strong><span>{stage===2?'Care illustration':tooth.concern}</span></figcaption></figure>)}</div>
  <div className="tooth-journey-footer"><div className="tooth-journey-stages" aria-label="Illustration stages">{stages.map((item,index)=><span key={item.label} className={stage===index?'active':''} aria-current={stage===index?'step':undefined}>{item.label}</span>)}</div><p className="tooth-stage-caption" aria-live="polite">{stages[stage].text}</p><div className="journey-manual-controls"><button type="button" onClick={()=>setManual(false)} aria-pressed={stage===0}>See concerns</button><button type="button" onClick={()=>setManual(true)} aria-pressed={stage===2}>See care illustration</button></div><p className="tooth-journey-note">Educational illustration, not natural healing or a guaranteed result. Cavities may need a filling, root canal treatment or other care after assessment. <Link href="/book-appointment">Talk to a dentist</Link>.</p></div>
 </div></section>;
}

