'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
 // SectionMotion owns entrance effects so nested content is not animated twice.
 return <div className={className}>{children}</div>;
}

export function SectionMotion() {
 const pathname = usePathname();
 const previousPath = useRef(pathname);
 useEffect(()=>{
  if(previousPath.current !== pathname && !window.location.hash) window.scrollTo({top:0,behavior:'instant'});
  previousPath.current = pathname;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const animations=new Set<Animation>();let observer:IntersectionObserver|undefined;
  const configure=()=>{
   observer?.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();
   if(preference.matches)return;
   observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;
    const content=entry.target.querySelector(':scope > .container')||entry.target;
    if(typeof content.animate==='function'){
     const distance=entry.target.id==='care'?0:innerWidth<=760?12:16;
     const animation=content.animate([{opacity:.86,transform:`translateY(${distance}px)`},{opacity:1,transform:'translateY(0)'}],{duration:innerWidth<=760?700:850,easing:'cubic-bezier(.22,1,.36,1)',fill:'none'});
     animations.add(animation);animation.onfinish=()=>animations.delete(animation);animation.oncancel=()=>animations.delete(animation);
    }
    observer?.unobserve(entry.target);
   }},{threshold:0,rootMargin:'0px 0px -36px 0px'});
   document.querySelectorAll('main>section:not(.hero):not([data-scroll-scene]), main>.care-strip, main [data-section-motion]').forEach(section=>observer!.observe(section));
  };
  configure();preference.addEventListener('change',configure);
  return ()=>{observer?.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();preference.removeEventListener('change',configure)};
 },[pathname]);
 return null;
}
export function ScrollImageEntrance({children,className=''}:{children:ReactNode;className?:string}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=root.current;if(!element)return;const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let observer:IntersectionObserver|undefined;let animation:Animation|undefined;
  const configure=()=>{observer?.disconnect();animation?.cancel();if(preference.matches)return;
   observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;
    observer?.disconnect();if(typeof element.animate==='function')animation=element.animate([{opacity:.84,transform:`translateX(${innerWidth<=760?-24:-44}px)`},{opacity:1,transform:'translateX(0)'}],{duration:950,easing:'cubic-bezier(.22,1,.36,1)',fill:'none'});
   },{threshold:.12,rootMargin:'0px 0px -25px 0px'});observer.observe(element);
  };
  configure();preference.addEventListener('change',configure);return()=>{observer?.disconnect();animation?.cancel();preference.removeEventListener('change',configure)};
 },[]);
 return <div ref={root} className={`scroll-image-entrance ${className}`}>{children}</div>;
}
export function Parallax({ children, className = '' }: { children: ReactNode; className?: string }) {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const media = matchMedia('(min-width: 960px) and (prefers-reduced-motion: no-preference)');
  let frame = 0; let visible = false;
  const update = () => { frame = 0; if (ref.current && visible) { const rect = ref.current.getBoundingClientRect(); const offset = Math.max(-36, Math.min(36, (innerHeight / 2 - rect.top - rect.height / 2) * 0.06)); ref.current.style.setProperty('--parallax', `${offset}px`); } };
  const scroll = () => { if (!frame && visible && media.matches && !document.hidden) frame = requestAnimationFrame(update); };
  const reset = () => { cancelAnimationFrame(frame);frame=0;if(!media.matches)ref.current?.style.removeProperty('--parallax');else scroll(); };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) scroll(); });
  if (ref.current) observer.observe(ref.current);
  addEventListener('scroll', scroll, { passive: true });media.addEventListener('change',reset);document.addEventListener('visibilitychange',reset);
  return () => { removeEventListener('scroll', scroll);media.removeEventListener('change',reset);document.removeEventListener('visibilitychange',reset);cancelAnimationFrame(frame);observer.disconnect();ref.current?.style.removeProperty('--parallax'); };
 }, []);
 return <div ref={ref} className={`parallax ${className}`}>{children}</div>;
}
