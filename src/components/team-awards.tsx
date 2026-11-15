import Image from 'next/image';
import photos from '@/lib/team-awards.json';

export function TeamAwards() {
 return <section id="team-awards" className="section team-awards-section" aria-labelledby="team-awards-title"><div className="container">
  <div className="community-section-heading"><div><p className="eyebrow">Our team &amp; awards</p><h2 id="team-awards-title">Together in care.<br/><em>United in every milestone.</em></h2></div><p>A look at the people, professional gatherings and moments of recognition shared by Lara Smiles.</p></div>
  <div className="team-mosaic"><div className="team-mosaic-lead">{photos.slice(0,2).map(photo=><figure className="team-mosaic-item" key={photo.slug}><div className="team-mosaic-image"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width:760px) 90vw, 55vw" loading="lazy" decoding="async"/></div><figcaption>{photo.title}</figcaption></figure>)}</div><div className="team-mosaic-masonry">{photos.slice(2).map(photo=><figure className="team-mosaic-item" key={photo.slug}><div className="team-mosaic-image"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width:760px) 43vw, (max-width:1050px) 30vw, 23vw" loading="lazy" decoding="async"/></div><figcaption>{photo.title}</figcaption></figure>)}</div></div>
  <p className="community-media-note">Photographs supplied by the clinic. Event and award details are shown without implying chain-wide clinical certification.</p>
 </div></section>;
}
