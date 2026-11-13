'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export function ReviewRail({ children }: { children: ReactNode }) {
 const [paused, setPaused] = useState(false);
 const root = useRef<HTMLDivElement>(null);
 useEffect(()=>{const node=root.current;if(!node)return;let visible=false;const update=()=>node.classList.toggle('is-offscreen',!visible||document.hidden);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(node);document.addEventListener('visibilitychange',update);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update)}},[]);
 return <div ref={root} className={`review-rail ${paused ? 'is-paused' : ''}`}><div className="review-controls"><span>Take your time. Read their stories.</span><button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused ? 'Resume scrolling' : 'Pause scrolling'}</button></div><div className="review-window" tabIndex={0} role="region" aria-label="Patient experiences, slowly scrolling horizontally. Pause to read at your own pace.">{children}</div></div>;
}
