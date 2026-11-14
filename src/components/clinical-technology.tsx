import Image from 'next/image';
import Link from 'next/link';
import video from '@/lib/technology-video.json';
import { AmbientVideo } from './ambient-video';


const information = [
 { title:'Invisalign & Invisalign Go', note:'Provider credentials to confirm', text:'Digitally planned, removable aligners are referenced in the supplied brand material, including Invisalign Go and Invisalign First. Confirm current provider status and available systems with your clinic.', kind:'video' },
 { title:'Precisalign Clear Aligner Partner', note:'Reported partnership · authorization to confirm', text:'The supplied material describes Lara Smiles as an authorized Precisalign provider. Current authorization and participating locations have not been confirmed. Ask your clinic about available aligner options.', kind:'aligner' },
] as const;

export function ClinicalTechnology() {
 return <section id="clinical-technology" className="section clinical-technology-section" aria-labelledby="clinical-technology-title"><div className="container">
  <div className="clinical-technology-heading"><div><p className="eyebrow">Clinical practice</p><h2 id="clinical-technology-title">Clinical credentials<br/><em>&amp; technology.</em></h2></div><p>Explore the systems referenced in the supplied brand material. Current provider credentials and equipment availability need confirmation at each branch.</p></div>
  <div className="clinical-technology-grid">{information.map(item=><article className="clinical-technology-card technology-media-row" key={item.kind}>
   <div className="clinical-technology-copy"><h3>{item.title}</h3><p>{item.text}</p><span className="clinical-technology-note">{item.note}</span></div>
   <div className="clinical-card-media">{item.kind==='video'?<AmbientVideo src={video.src} poster={video.poster}/>:<Image src="/images/technology/clear-aligner.webp" alt="Illustrative photograph of a clear aligner" fill sizes="(max-width:760px) 90vw, 50vw" loading="lazy"/>}<span className="clinical-media-caption">{item.kind==='video'?'Illustrative aligner film':'Illustrative aligner photograph'}</span></div>
  </article>)}</div>
  <div className="clinical-technology-footer"><p>Confirm current provider credentials, available systems and equipment with your clinic before arranging treatment.</p><Link href="/branches" className="text-link">Ask your clinic</Link></div>
 </div></section>;
}
