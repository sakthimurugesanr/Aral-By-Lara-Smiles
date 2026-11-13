'use client';
import { useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
 const reduced = useReducedMotion();
 return <LazyMotion features={domAnimation}><m.div className={className} initial={false} whileInView={reduced ? undefined : { y: [16, 0], opacity: [0.7, 1] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</m.div></LazyMotion>;
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
