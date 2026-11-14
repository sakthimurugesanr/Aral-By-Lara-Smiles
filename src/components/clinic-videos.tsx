import existingVideos from '@/lib/story-videos.json';
import treatmentVideos from '@/lib/treatment-videos.json';
import { SilentVideoCard } from './silent-video-card';
import { InfiniteRail } from './infinite-rail';

const videos = [...existingVideos, ...treatmentVideos];

export function ClinicVideos() {
 return <section className="section clinic-videos-section treatment-films-section" id="moments-of-care" aria-labelledby="clinic-videos-title"><div className="container">
  <div className="clinic-videos-heading"><div><p className="eyebrow">Moments of care</p><h2 id="clinic-videos-title">A little closer.<br/><em>A little more familiar.</em></h2></div><p>Clinic-shared films, including dental treatment footage. Hover to preview on desktop, or tap to play on mobile. Always without sound.</p></div>
  <InfiniteRail label="Clinic and treatment films" className="treatment-film-rail" manualDrag navigation helpText="Drag or swipe to explore · Hover or tap to play">
   <div className="treatment-film-track">{[false, true].map(duplicate => <div className="treatment-film-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>{videos.map(video => <SilentVideoCard key={video.slug} video={video} hoverPreview duplicate={duplicate}/>)}</div>)}</div>
  </InfiniteRail>
 </div></section>;
}
