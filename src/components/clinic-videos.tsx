'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import videos from '@/lib/story-videos.json';

function VideoCard({video}:{video:typeof videos[number]}){
 const [loaded,setLoaded]=useState(false);const [failed,setFailed]=useState(false);const player=useRef<HTMLVideoElement>(null);const wantsPlayback=useRef(false);
 const startPlayback=()=>{wantsPlayback.current=true;setLoaded(true);if(player.current){player.current.muted=true;void player.current.play().catch(()=>{})}};
 useEffect(()=>{
  const element=player.current;if(!loaded||!element)return;
  element.muted=true;if(wantsPlayback.current)void element.play().catch(()=>{});
  const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)element.pause()},{threshold:.15});observer.observe(element);
  const onVisibility=()=>{if(document.hidden)element.pause()};document.addEventListener('visibilitychange',onVisibility);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);element.pause()};
 },[loaded]);
 return <article className="clinic-video-card" onPointerEnter={event=>{if(event.pointerType==='mouse'&&matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches)startPlayback()}} onPointerLeave={event=>{if(event.pointerType==='mouse'){wantsPlayback.current=false;player.current?.pause()}}}><div className="clinic-video-frame">
  {loaded?<video ref={player} data-clinic-video src={video.src} poster={video.poster} width={video.width} height={video.height} controls controlsList="nodownload" muted playsInline loop preload="none" aria-label={video.title+' — silent video'} onError={()=>setFailed(true)} onPlay={event=>{document.querySelectorAll<HTMLVideoElement>('video[data-clinic-video]').forEach(other=>{if(other!==event.currentTarget)other.pause()})}}/>:<><Image src={video.poster} alt="" fill sizes="(max-width: 760px) 90vw, 30vw" loading="lazy"/><button className="clinic-video-play" type="button" aria-label={'Play '+video.title+' without sound'} onClick={startPlayback}><span aria-hidden="true" className="video-play-symbol"/><span>Play film</span></button></>}
  <span className="silent-video-label">Sound-free</span>{failed&&<p className="video-error" role="alert">This film could not load. <a href={video.src}>Open video</a></p>}
 </div><div className="clinic-video-caption"><h3>{video.title}</h3><p>{video.description}</p><span>{Math.floor(video.duration/60)>0?`${Math.floor(video.duration/60)}m `:''}{video.duration%60}s · Silent film</span></div></article>;
}

export function ClinicVideos(){
 return <section className="section clinic-videos-section" id="moments-of-care" aria-labelledby="clinic-videos-title"><div className="container"><div className="clinic-videos-heading"><div><p className="eyebrow">Moments of care</p><h2 id="clinic-videos-title">A little closer.<br/><em>A little more familiar.</em></h2></div><p>Three short films shared by ARAL. Hover to preview, or tap to play. Always without sound.</p></div><p className="video-mobile-hint">Swipe to explore · Tap to play</p><div className="clinic-video-grid" role="region" aria-label="Three silent clinic films" tabIndex={0}>{videos.map(video=><VideoCard key={video.slug} video={video}/>)}</div></div></section>;
}
