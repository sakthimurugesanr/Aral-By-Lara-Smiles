import videos from '@/lib/story-videos.json';
import { SilentVideoCard } from './silent-video-card';

export function ClinicVideos() {
 return <section className="section clinic-videos-section" id="moments-of-care" aria-labelledby="clinic-videos-title"><div className="container"><div className="clinic-videos-heading"><div><p className="eyebrow">Moments of care</p><h2 id="clinic-videos-title">A little closer.<br/><em>A little more familiar.</em></h2></div><p>Three short films shared by ARAL. Hover to preview, or tap to play. Always without sound.</p></div><p className="video-mobile-hint">Swipe to explore · Tap to play</p><div className="clinic-video-grid" role="region" aria-label="Three silent clinic films" tabIndex={0}>{videos.map(video => <SilentVideoCard key={video.slug} video={video} hoverPreview/>)}</div></div></section>;
}
