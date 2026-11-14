import Image from 'next/image';
import stories from '@/lib/success-stories.json';
import { InfiniteRail } from './infinite-rail';

export function SuccessStories() {
 return <section id="success-stories" className="section success-stories-section" aria-labelledby="success-stories-title"><div className="container">
  <div className="community-section-heading"><div><p className="eyebrow">Our success stories</p><h2 id="success-stories-title">Shared smiles.<br/><em>Moments that matter.</em></h2></div><p>A gallery of moments shared by Lara Smiles. Drag or swipe to explore our team and community.</p></div>
  <InfiniteRail label="Success stories" className="success-stories-rail" manualDrag helpText="Drag or swipe through our shared moments">
   <div className="success-stories-track">{[false, true].map(duplicate => <div className="success-stories-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>{stories.map(story => <figure className="success-story-photo" key={story.slug}><Image src={story.src} alt={duplicate ? '' : story.alt} width={story.width} height={story.height} sizes="(max-width: 760px) 220px, 260px" loading="lazy" decoding="async" draggable={false}/></figure>)}</div>)}</div>
  </InfiniteRail>
  <p className="community-media-note">Clinic-supplied photographs. Shared moments do not establish individual treatment outcomes.</p>
 </div></section>;
}
