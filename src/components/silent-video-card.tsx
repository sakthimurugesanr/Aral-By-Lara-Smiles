'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type SilentFilm = { title: string; description: string; src: string; poster: string; width: number; height: number; duration: number };

export function SilentVideoCard({ video, hoverPreview = false, duplicate = false }: { video: SilentFilm; hoverPreview?: boolean; duplicate?: boolean }) {
 const [loaded, setLoaded] = useState(false);
 const [failed, setFailed] = useState(false);
 const player = useRef<HTMLVideoElement>(null);
 const wantsPlayback = useRef(false);
 const play = (element:HTMLVideoElement) => { element.muted=true;void element.play().then(()=>{if(!wantsPlayback.current||document.hidden)element.pause()}).catch(()=>{}); };
 const startPlayback = () => { wantsPlayback.current = true; setLoaded(true); if (player.current) play(player.current); };
 useEffect(() => {
  const element = player.current;
  if (!loaded || !element) return;
  element.muted = true;
  if (wantsPlayback.current) play(element);
  const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) {wantsPlayback.current=false;element.pause();} }, { threshold: .15 });
  observer.observe(element);
  const onVisibility = () => { if (document.hidden) {wantsPlayback.current=false;element.pause();} };
  document.addEventListener('visibilitychange', onVisibility);
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); element.pause(); };
 }, [loaded]);
 return <article className="clinic-video-card" onPointerEnter={event => { if (hoverPreview && event.pointerType === 'mouse' && matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) startPlayback(); }} onPointerLeave={event => { if (hoverPreview && event.pointerType === 'mouse') { wantsPlayback.current = false; player.current?.pause(); } }} onClick={duplicate ? () => { if (player.current && !player.current.paused) { wantsPlayback.current = false; player.current.pause(); } else startPlayback(); } : undefined}>
  <div className="clinic-video-frame">{loaded ? <video ref={player} data-clinic-video src={video.src} poster={video.poster} width={video.width} height={video.height} controls={!duplicate} tabIndex={duplicate ? -1 : undefined} controlsList="nodownload" muted playsInline loop preload="none" aria-label={duplicate ? undefined : video.title + ' — silent video'} onError={() => setFailed(true)} onPlay={event => { document.querySelectorAll<HTMLVideoElement>('video[data-clinic-video]').forEach(other => { if (other !== event.currentTarget) other.pause(); }); }}/>
   : <><Image src={video.poster} alt="" fill sizes="(max-width: 760px) 80vw, 360px" loading="lazy"/>{duplicate ? <span className="clinic-video-play"><span className="video-play-symbol"/><span>Tap to play or pause</span></span> : <button className="clinic-video-play" type="button" aria-label={'Play ' + video.title + ' without sound'} onClick={startPlayback}><span aria-hidden="true" className="video-play-symbol"/><span>Play film</span></button>}</>}
   <span className="silent-video-label">Sound-free</span>{failed && <p className="video-error" role={duplicate ? undefined : 'alert'}>This film could not load. {!duplicate && <a href={video.src}>Open video</a>}</p>}
  </div><div className="clinic-video-caption"><h3>{video.title}</h3><p>{video.description}</p><span>{Math.floor(video.duration / 60) > 0 ? `${Math.floor(video.duration / 60)}m ` : ''}{video.duration % 60}s · Silent film</span></div>
 </article>;
}
