'use client';
import { useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function getLoopWidth(element: HTMLElement) {
 const track = element.firstElementChild as HTMLElement | null;
 const group = track?.firstElementChild as HTMLElement | null;
 return group?.getBoundingClientRect().width || (track?.scrollWidth || 0) / 2;
}

export function InfiniteRail({ children, label, className = '', manualDrag = false, helpText = 'Drag or swipe to explore treatments', direction = 'left', navigation = false }: { children: ReactNode; label: string; className?: string; manualDrag?: boolean; helpText?: string; direction?: 'left' | 'right'; navigation?: boolean }) {
 const root = useRef<HTMLDivElement>(null);
 const viewport = useRef<HTMLDivElement>(null);
 const [paused, setPaused] = useState(false);
 const initialized = useRef(false);
 const navigate = (step: number) => {
  const element = viewport.current; if (!element) return;
  setPaused(true);
  const group = element.firstElementChild?.firstElementChild as HTMLElement | null;
  const first = group?.firstElementChild as HTMLElement | null;
  const distance = (first?.getBoundingClientRect().width || 300) + (group ? parseFloat(getComputedStyle(group).columnGap) || 0 : 0);
  const loop = getLoopWidth(element), reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delta = step * distance;
  if (!reduced && loop > element.clientWidth) {
   if (element.scrollLeft + delta < 0) element.scrollLeft += loop;
   else if (element.scrollLeft + delta > element.scrollWidth - element.clientWidth) element.scrollLeft -= loop;
  }
  element.scrollBy({ left: delta, behavior: reduced ? 'auto' : 'smooth' });
 };
 const drag=useRef<{id:number;x:number;y:number;left:number;active:boolean}|null>(null);
 const suppressClick=useRef(false);const clickReset=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(clickReset.current)clearTimeout(clickReset.current)},[]);
 const beginDrag=(event:ReactPointerEvent<HTMLDivElement>)=>{
  if(!manualDrag||event.pointerType==='touch'||event.button!==0)return;
  if((event.target as HTMLElement).closest('video,input,select,textarea'))return;
  if(clickReset.current)clearTimeout(clickReset.current);suppressClick.current=false;
  drag.current={id:event.pointerId,x:event.clientX,y:event.clientY,left:event.currentTarget.scrollLeft,active:false};
 };
 const moveDrag=(event:ReactPointerEvent<HTMLDivElement>)=>{
  const state=drag.current;if(!state||state.id!==event.pointerId)return;
  const dx=event.clientX-state.x;const dy=event.clientY-state.y;
  if(!state.active&&Math.abs(dx)>6&&Math.abs(dx)>Math.abs(dy)){state.active=true;suppressClick.current=true;event.currentTarget.setPointerCapture(event.pointerId);event.currentTarget.dataset.dragging='true';}
  if(!state.active)return;event.preventDefault();
  const loop=getLoopWidth(event.currentTarget);
  const next=state.left-dx;event.currentTarget.scrollLeft=loop>0&&!matchMedia('(prefers-reduced-motion: reduce)').matches?((next%loop)+loop)%loop:next;
 };
 const endDrag=(event:ReactPointerEvent<HTMLDivElement>)=>{
  const state=drag.current;if(!state||state.id!==event.pointerId)return;
  drag.current=null;delete event.currentTarget.dataset.dragging;
  if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  if(event.type==='pointercancel')suppressClick.current=false;
  else if(state.active)clickReset.current=setTimeout(()=>{suppressClick.current=false;clickReset.current=null},0);
 };
 useEffect(()=>{
  const node=root.current;const windowEl=viewport.current;if(!node||!windowEl)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false, hovered=false, disposed=false, frame=0, last=0, position=0, loopWidth=0;
  const measure=()=>{loopWidth=getLoopWidth(windowEl);if(!initialized.current&&loopWidth>0){if(direction==='right'&&!reduced.matches)windowEl.scrollLeft=loopWidth;initialized.current=true}};
  measure();
  const speed=className.includes('services')?22:15;
  const canRun=()=>!disposed&&visible&&!paused&&!hovered&&!document.hidden&&!reduced.matches&&(!node.contains(document.activeElement)||!!document.activeElement?.classList.contains('rail-resume'));
  const stop=()=>{cancelAnimationFrame(frame);frame=0;last=0;node.dataset.motionState='paused';};
  const tick=(time:number)=>{
   frame=0;if(!canRun()){stop();return;}
   const delta=last?Math.min(time-last,50):0;last=time;
   if(loopWidth>0){position+=(direction==='left'?1:-1)*speed*delta/1000;if(position>=loopWidth)position-=loopWidth;if(position<0)position+=loopWidth;windowEl.scrollLeft=position;}
   frame=requestAnimationFrame(tick);
  };
  const update=()=>{if(canRun()){if(!frame){position=windowEl.scrollLeft;node.dataset.motionState='running';frame=requestAnimationFrame(tick);}}else stop();};
  const enter=()=>{hovered=true;update()};const leave=()=>{hovered=false;update()};
  const focus=()=>update();const blur=()=>queueMicrotask(update);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(node);
  const resize=new ResizeObserver(measure);resize.observe(windowEl);if(windowEl.firstElementChild)resize.observe(windowEl.firstElementChild);
  const wheel=(event:WheelEvent)=>{if(Math.abs(event.deltaX)>Math.abs(event.deltaY))setPaused(true)};
  windowEl.addEventListener('wheel',wheel,{passive:true});
  node.addEventListener('pointerenter',enter);node.addEventListener('pointerleave',leave);node.addEventListener('focusin',focus);node.addEventListener('focusout',blur);document.addEventListener('visibilitychange',update);reduced.addEventListener('change',update);
  return()=>{disposed=true;stop();observer.disconnect();resize.disconnect();windowEl.removeEventListener('wheel',wheel);node.removeEventListener('pointerenter',enter);node.removeEventListener('pointerleave',leave);node.removeEventListener('focusin',focus);node.removeEventListener('focusout',blur);document.removeEventListener('visibilitychange',update);reduced.removeEventListener('change',update);};
 },[paused,className,manualDrag,direction]);
 return <div ref={root} data-direction={direction} className={`infinite-rail ${className} ${paused?'is-paused':''} ${manualDrag?'has-manual-drag':''}`} onPointerDown={event=>{if(!(event.target as HTMLElement).closest('.rail-pause,.rail-resume,.rail-nav-button'))setPaused(true)}}>
  {navigation&&<div className="rail-navigation"><button type="button" className="rail-nav-button" onClick={()=>navigate(-1)} aria-label={'Previous '+label.toLowerCase()}><ChevronLeft size={19}/></button><button type="button" className="rail-nav-button" onClick={()=>navigate(1)} aria-label={'Next '+label.toLowerCase()}><ChevronRight size={19}/></button></div>}
  {!manualDrag&&<button type="button" className="rail-pause" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={`${paused?'Resume':'Pause'} ${label.toLowerCase()} scrolling`}>{paused?'Resume':'Pause'} {label.toLowerCase()} scrolling</button>}
  <div ref={viewport} className="infinite-window" tabIndex={0} role="region" aria-label={`${label}. ${manualDrag?'Drag, swipe or use arrow keys':'Scroll horizontally'} to explore. Hover or focus to pause automatic movement.`} onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={event=>{if(drag.current?.id===event.pointerId){drag.current=null;delete event.currentTarget.dataset.dragging}}} onDragStart={event=>{if(manualDrag)event.preventDefault()}} onClickCapture={event=>{if(suppressClick.current){event.preventDefault();event.stopPropagation();suppressClick.current=false}}} onKeyDown={event=>{if(event.target===event.currentTarget&&event.key===' '){event.preventDefault();setPaused(!paused)}else if(manualDrag&&event.target===event.currentTarget&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();setPaused(true);const element=event.currentTarget;const behavior=matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';if(event.key==='Home'||event.key==='End'){const width=getLoopWidth(element);element.scrollTo({left:event.key==='Home'?0:Math.max(0,width-element.clientWidth),behavior})}else element.scrollBy({left:(event.key==='ArrowRight'?1:-1)*Math.min(element.clientWidth*.85,340),behavior})}}}>{children}</div>
  {manualDrag&&<div className="rail-manual-help"><span>{helpText}</span><button type="button" className="rail-resume" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'Resume auto-scroll':'Pause auto-scroll'}</button></div>}
 </div>;
}
