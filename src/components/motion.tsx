'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
 const reduced = useReducedMotion();
 return <LazyMotion features={domAnimation}><m.div className={className} initial={false} whileInView={reduced ? undefined : { opacity: [0.88, 1] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{children}</m.div></LazyMotion>;
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
     const animation=content.animate([{opacity:.86,transform:`translateY(${innerWidth<=760?12:16}px)`},{opacity:1,transform:'translateY(0)'}],{duration:innerWidth<=760?700:850,easing:'cubic-bezier(.22,1,.36,1)',fill:'none'});
     animations.add(animation);animation.onfinish=()=>animations.delete(animation);animation.oncancel=()=>animations.delete(animation);
    }
    observer?.unobserve(entry.target);
   }},{threshold:0,rootMargin:'0px 0px -36px 0px'});
   document.querySelectorAll('main>section:not(.hero):not([data-scroll-scene]), main>.care-strip').forEach(section=>observer!.observe(section));
  };
  configure();preference.addEventListener('change',configure);
  return ()=>{observer?.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();preference.removeEventListener('change',configure)};
 },[pathname]);
 return null;
}
export function Parallax({ children, className = '' }: { children: ReactNode; className?: string }) {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const media = matchMedia('(min-width: 960px) and (prefers-reduced-motion: no-preference)');
  if (!media.matches) return;
  let frame = 0; let visible = true;
  const update = () => { frame = 0; if (ref.current && visible) { const rect = ref.current.getBoundingClientRect(); const offset = Math.max(-36, Math.min(36, (innerHeight / 2 - rect.top - rect.height / 2) * 0.06)); ref.current.style.setProperty('--parallax', `${offset}px`); } };
  const scroll = () => { if (!frame && visible) frame = requestAnimationFrame(update); };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) scroll(); });
  if (ref.current) observer.observe(ref.current);
  addEventListener('scroll', scroll, { passive: true }); update();
  return () => { removeEventListener('scroll', scroll); cancelAnimationFrame(frame); observer.disconnect(); };
 }, []);
 return <div ref={ref} className={`parallax ${className}`}>{children}</div>;
}
