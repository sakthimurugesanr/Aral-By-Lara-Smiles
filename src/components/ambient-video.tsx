'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AmbientVideo({ src, poster }: { src: string; poster: string }) {
 const root = useRef<HTMLDivElement>(null);
 const player = useRef<HTMLVideoElement>(null);
 const [loaded, setLoaded] = useState(false);
 const [playing, setPlaying] = useState(false);
 const [paused, setPaused] = useState(false);
 const [motionAllowed, setMotionAllowed] = useState(false);
 useEffect(() => {
  const element = root.current;
  if (!element) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  const update = () => {
   setMotionAllowed(!reduced.matches);
   const shouldPlay = visible && !document.hidden && !reduced.matches && !paused;
   if (shouldPlay) { setLoaded(true); if (player.current) { player.current.muted = true; void player.current.play().catch(() => {}); } }
   else { player.current?.pause(); setPlaying(false); }
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .2 });
  observer.observe(element);
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', update);
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', update); player.current?.pause(); };
 }, [loaded, paused]);
 return <div ref={root} className={`ambient-video ${playing ? 'is-playing' : ''}`}>
  <Image src={poster} alt="" fill sizes="(max-width:760px) 90vw, 50vw" loading="lazy"/>
  {loaded && <video data-ambient-video ref={player} src={src} poster={poster} muted loop playsInline preload="none" controls={false} tabIndex={-1} aria-hidden="true" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)}/>}
  {motionAllowed && <button type="button" className="ambient-video-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Resume' : 'Pause'} background video</button>}
 </div>;
}
