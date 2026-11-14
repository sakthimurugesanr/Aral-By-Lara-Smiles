import Image from 'next/image';
import photos from '@/lib/team-awards.json';
import { InfiniteRail } from './infinite-rail';

export function TeamAwards() {
 return <section id="team-awards" className="section team-awards-section" aria-labelledby="team-awards-title"><div className="container">
  <div className="community-section-heading"><div><p className="eyebrow">Our team &amp; awards</p><h2 id="team-awards-title">Together in care.<br/><em>United in every milestone.</em></h2></div><p>A look at the people, professional gatherings and moments of recognition shared by Lara Smiles.</p></div>
  <InfiniteRail label="Team and awards" className="team-awards-rail" manualDrag helpText="Drag or swipe through our team and award moments">
   <div className="team-awards-track">{[false, true].map(duplicate => <div className="team-awards-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>{photos.map(photo => <figure className="team-awards-photo" key={photo.slug}><div className="team-awards-image"><Image src={photo.src} alt={duplicate ? '' : photo.alt} width={photo.width} height={photo.height} sizes="(max-width:760px) 280px, 340px" loading="lazy" decoding="async" draggable={false}/></div><figcaption>{photo.title}</figcaption></figure>)}</div>)}</div>
  </InfiniteRail>
  <p className="community-media-note">Photographs supplied by the clinic. Event and award details are shown without implying chain-wide clinical certification.</p>
 </div></section>;
}
