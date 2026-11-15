'use client';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import stories from '@/lib/success-stories.json';

export function SuccessStories() {
 const root=useRef<HTMLElement>(null), viewport=useRef<HTMLDivElement>(null);
 const trigger=useRef<{start:number;end:number}|null>(null);
 const tween=useRef<{progress:(value:number)=>unknown}|null>(null);
 const manual=useRef(false), idle=useRef<ReturnType<typeof setTimeout>|null>(null);
 const gesture=useRef<{x:number;y:number;left:number;axis:'x'|'y'|null}|null>(null);
 const distance=()=>Math.max(0,(viewport.current?.scrollWidth||0)-(viewport.current?.clientWidth||0));
 const move=(direction:number)=>{
  const element=viewport.current;if(!element)return;
  const first=element.querySelector<HTMLElement>('.success-scroll-photo');
  const track=element.firstElementChild;
  const gap=track?parseFloat(getComputedStyle(track).columnGap)||0:0;
  const step=(first?.getBoundingClientRect().width||element.clientWidth*.85)+gap;
  const target=Math.max(0,Math.min(distance(),element.scrollLeft+direction*step));
  const behavior=matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
  if(trigger.current&&distance()>0){const t=trigger.current;window.scrollTo({top:t.start+(target/distance())*(t.end-t.start),behavior});}
  else element.scrollTo({left:target,behavior});
 };
 const syncManual=()=>{
  if(!manual.current||!viewport.current)return;
  const max=distance(),t=trigger.current;
  if(t&&max>0){const ratio=Math.max(0,Math.min(1,viewport.current.scrollLeft/max));tween.current?.progress(ratio);const target=t.start+ratio*(t.end-t.start);if(Math.abs(scrollY-target)>2)window.scrollTo({top:target,behavior:'instant'});}
  if(idle.current)clearTimeout(idle.current);idle.current=setTimeout(()=>{manual.current=false},160);
 };
 // Revert GSAP's pin wrapper before React removes this section during navigation.
 useLayoutEffect(()=>{
  const section=root.current,element=viewport.current;if(!section||!element)return;
  const desktop=matchMedia('(min-width: 1100px) and (hover: hover) and (pointer: fine)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  section.dataset.galleryMode='manual';
  let nearby=false;
  let disposed=false,started=false,cleanup:(()=>void)|undefined;
  async function setup(){
   if(started)return;started=true;
   try{
    const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);if(disposed)return;
    gsap.registerPlugin(ScrollTrigger);
    let context:ReturnType<typeof gsap.context>|undefined;
    let resizeTimer:ReturnType<typeof setTimeout>|undefined;
    let measuredWidth=0,measuredHeight=0,measuredPanel=0,measuredFits=false;
    const configure=()=>{
     const hadPin=!!trigger.current;
     context?.revert();context=undefined;trigger.current=null;tween.current=null;
     section!.dataset.galleryMode='manual';
     const offset=(document.querySelector('.header')?.getBoundingClientRect().height||82)+12;
     const max=Math.max(0,element!.scrollWidth-element!.clientWidth);
     if(!desktop.matches||reduced.matches||max<=0||section!.offsetHeight>innerHeight-offset-12){if(hadPin)ScrollTrigger.refresh();return;}
     context=gsap.context(()=>{
      const animation=gsap.fromTo(element,{scrollLeft:0},{scrollLeft:()=>Math.max(0,element!.scrollWidth-element!.clientWidth),ease:'none',scrollTrigger:{trigger:section,pin:true,start:()=>`top ${offset}px`,end:()=>`+=${Math.max(900,(element!.scrollWidth-element!.clientWidth)*.9)}`,scrub:.8,anticipatePin:1,invalidateOnRefresh:true}});
      tween.current=animation;trigger.current=animation.scrollTrigger||null;section!.dataset.galleryMode='scroll';
     },section!);
     ScrollTrigger.refresh();
    };
    const measureAndConfigure=(force=false)=>{
     if(disposed)return;
     // Mobile browser chrome changes height while scrolling; do not rebuild the pin for every pixel.
     const fits=section!.offsetHeight<=innerHeight-(document.querySelector('.header')?.getBoundingClientRect().height||82)-24;
     if(!force&&measuredFits===fits&&measuredWidth===innerWidth&&Math.abs(measuredHeight-innerHeight)<80&&measuredPanel===section!.offsetHeight)return;
     measuredFits=fits;measuredWidth=innerWidth;measuredHeight=innerHeight;measuredPanel=section!.offsetHeight;configure();
    };
    const queue=()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>measureAndConfigure(),150)};
    const motionChange=()=>measureAndConfigure(true);
    measureAndConfigure();window.addEventListener('resize',queue);reduced.addEventListener('change',motionChange);desktop.addEventListener('change',motionChange);
    void document.fonts.ready.then(()=>{if(!disposed)queue()});
    cleanup=()=>{clearTimeout(resizeTimer);window.removeEventListener('resize',queue);reduced.removeEventListener('change',motionChange);desktop.removeEventListener('change',motionChange);context?.revert();trigger.current=null;tween.current=null};
   }catch{if(!disposed)section!.dataset.galleryMode='manual';}
  }
  const maybeStart=()=>{if(nearby&&desktop.matches&&!reduced.matches)void setup()};
  desktop.addEventListener('change',maybeStart);reduced.addEventListener('change',maybeStart);
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){nearby=true;observer.disconnect();maybeStart()}},{rootMargin:'700px'});observer.observe(section);
  return()=>{disposed=true;observer.disconnect();desktop.removeEventListener('change',maybeStart);reduced.removeEventListener('change',maybeStart);cleanup?.();if(idle.current)clearTimeout(idle.current)};
 },[]);
 return <section ref={root} id="success-stories" className="section success-stories-section scroll-success-section" data-scroll-scene data-gallery-mode="manual" aria-labelledby="success-stories-title"><div className="container">
  <div className="community-section-heading"><div><p className="eyebrow">Our success stories</p><h2 id="success-stories-title">Shared smiles.<br/><em>Moments that matter.</em></h2></div><p>Clinic-shared moments, at your own pace. Swipe or use the controls to explore.</p></div>
  <div ref={viewport} className="success-scroll-window" role="region" aria-label="Success stories horizontal gallery" tabIndex={0} onScroll={syncManual}
   onPointerDown={event=>{manual.current=false;gesture.current={x:event.clientX,y:event.clientY,left:event.currentTarget.scrollLeft,axis:null}}}
   onPointerMove={event=>{const g=gesture.current;if(!g)return;const dx=event.clientX-g.x,dy=event.clientY-g.y;if(!g.axis&&Math.max(Math.abs(dx),Math.abs(dy))>7)g.axis=Math.abs(dx)>Math.abs(dy)?'x':'y';if(g.axis==='x'){manual.current=true;if(event.pointerType!=='touch'){event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);event.currentTarget.scrollLeft=g.left-dx;}}}}
   onPointerUp={()=>{gesture.current=null}} onPointerCancel={()=>{gesture.current=null}} onDragStart={event=>event.preventDefault()}
   onWheel={event=>{if(Math.abs(event.deltaX)>Math.abs(event.deltaY))manual.current=true}}
   onKeyDown={event=>{if(event.target===event.currentTarget&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();if(event.key==='ArrowLeft'||event.key==='ArrowRight')move(event.key==='ArrowLeft'?-1:1);else{manual.current=true;event.currentTarget.scrollTo({left:event.key==='Home'?0:distance(),behavior:'auto'})}}}}>
   <div className="success-scroll-track">{stories.map(story=><figure className="success-scroll-photo" key={story.slug}><Image src={story.src} alt={story.alt} width={story.width} height={story.height} sizes="(max-width:760px) 78vw, 380px" loading="lazy" decoding="async" draggable={false}/></figure>)}</div>
  </div>
  <div className="success-gallery-controls"><span><span className="success-scroll-hint">Scroll to explore · </span>Swipe to browse</span><div><button type="button" onClick={()=>move(-1)} aria-label="Previous success photograph">Previous</button><button type="button" onClick={()=>move(1)} aria-label="Next success photograph">Next</button><button type="button" className="success-gallery-continue" onClick={()=>{const section=root.current;if(!section)return;const t=trigger.current;window.scrollTo({top:t?t.end+section.offsetHeight:section.getBoundingClientRect().bottom+scrollY,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}}>Continue page</button></div></div>
  <p className="community-media-note">Clinic-supplied photographs. Individual treatment outcomes vary.</p>
 </div></section>;
}
