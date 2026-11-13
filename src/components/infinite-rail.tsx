'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export function InfiniteRail({ children, label, className = '' }: { children: ReactNode; label: string; className?: string }) {
 const root = useRef<HTMLDivElement>(null);
 const viewport = useRef<HTMLDivElement>(null);
 const [paused, setPaused] = useState(false);
 useEffect(()=>{
  const node=root.current;const windowEl=viewport.current;if(!node||!windowEl)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false, hovered=false, disposed=false, frame=0, last=0, position=0, loopWidth=0;
  const measure=()=>{const track=windowEl.firstElementChild as HTMLElement|null;loopWidth=track?track.scrollWidth/2:0;};
  measure();
  const speed=className.includes('services')?22:15;
  const canRun=()=>!disposed&&visible&&!paused&&!hovered&&!document.hidden&&!reduced.matches&&!node.contains(document.activeElement);
  const stop=()=>{cancelAnimationFrame(frame);frame=0;last=0;node.dataset.motionState='paused';};
  const tick=(time:number)=>{
   frame=0;if(!canRun()){stop();return;}
   const delta=last?Math.min(time-last,50):0;last=time;
   if(loopWidth>0){position+=speed*delta/1000;if(position>=loopWidth)position-=loopWidth;windowEl.scrollLeft=position;}
   frame=requestAnimationFrame(tick);
  };
  const update=()=>{if(canRun()){if(!frame){position=windowEl.scrollLeft;node.dataset.motionState='running';frame=requestAnimationFrame(tick);}}else stop();};
  const enter=()=>{hovered=true;update()};const leave=()=>{hovered=false;update()};
  const focus=()=>update();const blur=()=>queueMicrotask(update);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(node);
  const resize=new ResizeObserver(measure);resize.observe(windowEl);
  node.addEventListener('pointerenter',enter);node.addEventListener('pointerleave',leave);node.addEventListener('focusin',focus);node.addEventListener('focusout',blur);document.addEventListener('visibilitychange',update);reduced.addEventListener('change',update);
  return()=>{disposed=true;stop();observer.disconnect();resize.disconnect();node.removeEventListener('pointerenter',enter);node.removeEventListener('pointerleave',leave);node.removeEventListener('focusin',focus);node.removeEventListener('focusout',blur);document.removeEventListener('visibilitychange',update);reduced.removeEventListener('change',update);};
 },[paused,className]);
 return <div ref={root} className={`infinite-rail ${className} ${paused?'is-paused':''}`} onPointerDown={event=>{if(!(event.target as HTMLElement).closest('.rail-pause'))setPaused(true)}}>
  <button type="button" className="rail-pause" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={`${paused?'Resume':'Pause'} ${label.toLowerCase()} scrolling`}>{paused?'Resume':'Pause'} {label.toLowerCase()} scrolling</button>
  <div ref={viewport} className="infinite-window" tabIndex={0} role="region" aria-label={`${label}. Scroll horizontally to explore. Hover or focus to pause automatic movement.`} onKeyDown={event=>{if(event.target===event.currentTarget&&event.key===' '){event.preventDefault();setPaused(!paused)}}}>{children}</div>
 </div>;
}
