'use client';
import { useEffect, useRef } from 'react';
import { SectionHeading } from './ui';

const principles=[
 {title:'People before procedures',text:'A space to share your concerns, ask questions, and feel heard.'},
 {title:'A thoughtful way forward',text:'Explore modern treatment options, with advice grounded in your needs.'},
 {title:'Clarity at every step',text:'Understand your options, your care plan, and what comes next.'},
 {title:'Closer to your everyday',text:'Eight listed Lara Smiles locations across Tamil Nadu and Karnataka.'},
];

export function ApproachJourney(){
 const root=useRef<HTMLElement>(null);const track=useRef<HTMLOListElement>(null);
 useEffect(()=>{
  const section=root.current;const list=track.current;if(!section||!list)return;
  let disposed=false;let started=false;let cleanup:undefined|(()=>void);
  async function setup(){
   if(started)return;started=true;
   try{
    const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);if(disposed)return;
    gsap.registerPlugin(ScrollTrigger);
    const rows=Array.from(list!.querySelectorAll<HTMLElement>('.approach-row'));
    const paths=section!.querySelectorAll<SVGPathElement>('.approach-path');
    const progressPath=section!.querySelector<SVGPathElement>('.approach-path-progress');
    let points:{x:number;y:number}[]=[];let frame=0;let lastSize='';
    const measure=()=>{
     const bounds=list!.getBoundingClientRect();
     points=rows.map(row=>{const dot=row.querySelector('.approach-dot')!.getBoundingClientRect();return{x:dot.left+dot.width/2-bounds.left,y:dot.top+dot.height/2-bounds.top}});
     const bend=window.innerWidth>760?22:7;
     let path=`M ${points[0].x} ${points[0].y}`;
     points.slice(1).forEach((point,index)=>{const previous=points[index];const direction=index%2===0?1:-1;const third=(point.y-previous.y)/3;path+=` C ${previous.x+bend*direction} ${previous.y+third}, ${point.x+bend*direction} ${point.y-third}, ${point.x} ${point.y}`});
     paths.forEach(item=>item.setAttribute('d',path));section!.dataset.pathReady='true';
    };
    measure();
    const media=gsap.matchMedia();
    media.add({all:'all',desktop:'(min-width: 761px)',reduce:'(prefers-reduced-motion: reduce)'},context=>{
     const conditions=context.conditions as {desktop:boolean;reduce:boolean};measure();
     section!.dataset.motion=conditions.reduce?'reduced':'scroll';
     const mark=(progress:number)=>{const first=points[0].y;const distance=points.at(-1)!.y-first;rows.forEach((row,index)=>{const reached=progress>0&&progress+.002>=(points[index].y-first)/distance;const value=String(reached);if(row.dataset.reached!==value)row.dataset.reached=value})};
     if(conditions.reduce){gsap.set(progressPath,{strokeDashoffset:0});rows.forEach(row=>row.dataset.reached='true');return;}
     rows.forEach(row=>row.dataset.reached='false');
     const connection={progress:0};
     gsap.fromTo(connection,{progress:0},{progress:1,ease:'none',onUpdate(){progressPath!.style.strokeDashoffset=String(1-connection.progress);mark(connection.progress)},scrollTrigger:{trigger:list,start:()=>`top+=${points[0].y} 60%`,end:()=>`top+=${points.at(-1)!.y} 60%`,scrub:.65,invalidateOnRefresh:true}});
     rows.forEach((row,index)=>{
      const card=row.querySelector('.approach-care-card');const direction=index%2===0?-1:1;
      gsap.fromTo(card,{x:conditions.desktop?direction*32:9,y:16},{x:0,y:-12,ease:'none',scrollTrigger:{trigger:row,start:'top 88%',end:'bottom 28%',scrub:.8,invalidateOnRefresh:true}});
     });
     return ()=>{progressPath!.style.removeProperty('stroke-dashoffset');rows.forEach(row=>delete row.dataset.reached)};
    },section!);
    const resize=new ResizeObserver(()=>{const size=`${list!.offsetWidth}:${list!.offsetHeight}`;if(size===lastSize)return;lastSize=size;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(!disposed){measure();ScrollTrigger.refresh()}})});resize.observe(list!);
    void document.fonts.ready.then(()=>{if(!disposed){measure();ScrollTrigger.refresh()}});
    cleanup=()=>{cancelAnimationFrame(frame);resize.disconnect();media.revert()};
    ScrollTrigger.refresh();
   }catch{if(!disposed){section!.dataset.motion='reduced';}}
  }
  const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();void setup()}},{rootMargin:'550px'});observer.observe(section);
  return()=>{disposed=true;observer.disconnect();cleanup?.()};
 },[]);
 return <section id="aral-approach" className="section why-section approach-journey" data-scroll-scene ref={root} aria-labelledby="approach-title"><div className="container"><div className="approach-heading"><SectionHeading eyebrow="The ARAL approach" title={<span id="approach-title">Good care is in <em>the details.</em></span>} text="The things that matter to you are the things we care about."/></div><div className="approach-canvas"><svg className="approach-connection" aria-hidden="true"><path className="approach-path approach-path-base"/><path className="approach-path approach-path-progress" pathLength="1"/></svg><ol className="approach-track" ref={track}>{principles.map((item,index)=><li className={`approach-row ${index%2===0?'approach-left':'approach-right'}`} key={item.title}><span className="approach-dot" aria-hidden="true"><span/></span><div className="approach-care-card"><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div></div></section>;
}
