import Image from 'next/image';
import Link from 'next/link';
import video from '@/lib/technology-video.json';
import { AmbientVideo } from './ambient-video';

function DigitalScanArt() {
 return <svg viewBox="0 0 720 350" fill="none" role="img" aria-label="Illustration of a digital intraoral scanner and tooth model"><defs><linearGradient id="scan-surface" x1="0" x2="720"><stop stopColor="var(--theme-surface)"/><stop offset="1" stopColor="var(--theme-sky)"/></linearGradient><linearGradient id="scan-tooth" x1="340" y1="90" x2="440" y2="290" gradientUnits="userSpaceOnUse"><stop stopColor="var(--theme-surface)"/><stop offset="1" stopColor="var(--theme-rose)"/></linearGradient></defs><path fill="url(#scan-surface)" d="M0 0h720v350H0z"/><ellipse cx="455" cy="290" rx="165" ry="17" fill="var(--theme-sky-border)" opacity=".55"/><g stroke="var(--theme-sky-border)" opacity=".7">{[105,145,185,225,265].map(y=><path key={y} d={`M270 ${y}h370`}/>)}{[310,370,430,490,550,610].map(x=><path key={x} d={`M${x} 70v215`}/>)}</g><path d="M405 110c-40-24-72 0-59 42 13 40 9 102 29 111 16 7 17-55 30-76 13 21 14 83 30 76 20-9 16-71 29-111 13-42-19-66-59-42Z" fill="url(#scan-tooth)" stroke="var(--theme-primary)" strokeWidth="2.5"/><path d="M358 143q47 22 94 0m-89 30q42 20 84 0m-75 31q33 14 66 0m-62-89 6 124m49-125-6 125" stroke="var(--theme-primary)" opacity=".2"/><path d="m481 89 64 24-21 72-42-17 10-40-33-12Z" fill="var(--theme-surface)" stroke="var(--theme-blue-ink)" strokeWidth="2.5"/><path d="m517 178-24 71c-4 12 5 19 16 22l19 6c11 3 19-2 23-13l31-99c6-21-8-37-28-44l-17-6" fill="var(--theme-surface)" stroke="var(--theme-blue-ink)" strokeWidth="2.5"/><path d="m520 260 7-21" stroke="var(--theme-primary)" strokeWidth="5" strokeLinecap="round"/><path d="m485 143-38 15m38-5-37 24m42-16-43 35" stroke="var(--theme-primary)" strokeWidth="2" strokeDasharray="4 6" opacity=".7"/><circle cx="575" cy="78" r="20" fill="var(--theme-surface)"/><path d="M566 78h18m-9-9v18" stroke="var(--theme-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

const information = [
 { title:'Invisalign & Invisalign Go', note:'Provider credentials to confirm', text:'Digitally planned, removable aligners are referenced in the supplied brand material, including Invisalign Go and Invisalign First. Confirm current provider status and available systems with your clinic.', kind:'video' },
 { title:'3D iTero digital scanning', note:'Scanner availability varies by branch', text:'Digital intraoral scans can support orthodontic assessment, treatment planning and smile visualization. Ask your chosen clinic whether iTero scanning is currently available.', kind:'scanner' },
 { title:'Precisalign Clear Aligner Partner', note:'Reported partnership · authorization to confirm', text:'The supplied material describes Lara Smiles as an authorized Precisalign provider. Current authorization and participating locations have not been confirmed. Ask your clinic about available aligner options.', kind:'aligner' },
] as const;

export function ClinicalTechnology() {
 return <section id="clinical-technology" className="section clinical-technology-section" aria-labelledby="clinical-technology-title"><div className="container">
  <div className="clinical-technology-heading"><div><p className="eyebrow">Clinical practice</p><h2 id="clinical-technology-title">Clinical credentials<br/><em>&amp; technology.</em></h2></div><p>Explore the systems referenced in the supplied brand material. Current provider credentials and equipment availability need confirmation at each branch.</p></div>
  <div className="clinical-technology-grid">{information.map(item=><article className="clinical-technology-card technology-media-row" key={item.kind}>
   <div className="clinical-technology-copy"><h3>{item.title}</h3><p>{item.text}</p><span className="clinical-technology-note">{item.note}</span></div>
   <div className="clinical-card-media">{item.kind==='video'?<AmbientVideo src={video.src} poster={video.poster}/>:item.kind==='scanner'?<DigitalScanArt/>:<Image src="/images/technology/clear-aligner.webp" alt="Illustrative photograph of a clear aligner" fill sizes="(max-width:760px) 90vw, 50vw" loading="lazy"/>}<span className="clinical-media-caption">{item.kind==='video'?'Illustrative aligner film':item.kind==='scanner'?'Digital-scanning illustration':'Illustrative aligner photograph'}</span></div>
  </article>)}</div>
  <div className="clinical-technology-footer"><p>Confirm current provider credentials, available systems and equipment with your clinic before arranging treatment.</p><Link href="/branches" className="text-link">Ask your clinic</Link></div>
 </div></section>;
}
