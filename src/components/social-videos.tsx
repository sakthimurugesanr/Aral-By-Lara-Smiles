import videos from '@/lib/social-videos.json';
import { SilentVideoCard } from './silent-video-card';

export function SocialVideos() {
 return <section id="community-films" className="section social-videos-section" aria-labelledby="community-films-title"><div className="container">
  <div className="community-section-heading"><div><p className="eyebrow">From our social journal</p><h2 id="community-films-title">A glimpse into<br/><em>our world.</em></h2></div><p>Four films shared by Lara Smiles. Tap to play; each film is sound-free. Videos load only when you choose to watch.</p></div>
  <div className="social-video-grid" role="region" aria-label="Four silent community films" tabIndex={0}>{videos.map(video => <SilentVideoCard key={video.slug} video={video}/>)}</div>
 </div></section>;
}
