'use client';
import Image from 'next/image';
import { useState, type CSSProperties } from 'react';

export function SmileComparison(){
 const [position,setPosition]=useState(50);
 return <section className="section smile-comparison-section" id="smile-comparison" aria-labelledby="comparison-title"><div className="container smile-comparison-layout">
  <div className="comparison-copy"><p className="eyebrow">Before &amp; after</p><h2 id="comparison-title">A closer look.<br/><em>A different perspective.</em></h2><p>Slide to explore the before and after photographs, at your own pace.</p><div className="comparison-presets" role="group" aria-label="Choose a comparison view"><button type="button" onClick={()=>setPosition(100)} aria-pressed={position===100}>Before</button><button type="button" onClick={()=>setPosition(50)} aria-pressed={position===50}>Compare</button><button type="button" onClick={()=>setPosition(0)} aria-pressed={position===0}>After</button></div><p className="comparison-note">Photographs supplied by the clinic. Each smile and treatment plan is individual; results vary. Images were taken at different moments and may differ in angle and lighting.</p></div>
  <div className="comparison-figure"><div className="comparison-view" style={{'--comparison-position':`${position}%`} as CSSProperties}>
   <Image src="/images/comparison/after.webp" alt="After photograph supplied for this smile comparison" fill sizes="(max-width: 760px) 90vw, 55vw" loading="lazy" className="comparison-photo"/>
   <div className="comparison-before"><Image src="/images/comparison/before.webp" alt="Before photograph supplied for this smile comparison" fill sizes="(max-width: 760px) 90vw, 55vw" loading="lazy" className="comparison-photo"/></div>
   <span className="comparison-label before-label" aria-hidden="true">Before</span><span className="comparison-label after-label" aria-hidden="true">After</span>
   <div className="comparison-divider" aria-hidden="true"><span><i/><i/></span></div>
   <input type="range" min="0" max="100" value={position} onChange={event=>setPosition(Number(event.target.value))} className="comparison-range" aria-label="Before and after photo comparison" aria-valuetext={`${position}% before photograph, ${100-position}% after photograph`}/>
  </div><p className="comparison-hint">Drag or swipe to compare · Use arrow keys when focused</p></div>
 </div></section>;
}
