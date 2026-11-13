import Link from 'next/link';
import { patientReviews, type PatientReview } from '@/lib/reviews';
import { SectionHeading } from './ui';
import { InfiniteRail } from './infinite-rail';

function ReviewCard({ review }: { review: PatientReview }) {
  const initials = review.name.replace(/\([^)]*\)/g,'').trim().split(/\s+/).map(word=>word[0]).slice(0,2).join('').toUpperCase();
  return <figure className="review-card google-review-card"><figcaption className="google-review-header"><span className="google-review-avatar" aria-hidden="true">{initials}</span><span className="google-review-author"><strong>{review.name}</strong><span>Google review</span></span><span className="google-letter" aria-label="Google">G</span></figcaption><blockquote>{review.text}</blockquote><div className="google-review-footer">{review.excerpt?'Excerpt from the supplied review':'Shared on Google'}</div></figure>;
}

export function PatientReviews({ full = false }: { full?: boolean }) {
  return <section id="patient-stories" className="section reviews-section"><div className="container"><div className="section-top"><SectionHeading eyebrow="In their own words" title={<>A little care.<br/><em>A lasting impression.</em></>} text="The moments that mattered, in the words of the people we care for." />{!full && <Link className="text-link" href="/reviews">Read every story</Link>}</div>{full ? <div className="review-grid">{patientReviews.map(review=><ReviewCard review={review} key={review.name}/>)}</div> : <InfiniteRail label="Google reviews" className="review-rail"><div className="review-track"><div className="review-group">{patientReviews.map(review=><ReviewCard review={review} key={review.name}/>)}</div><div className="review-group" aria-hidden="true" inert>{patientReviews.map(review=><ReviewCard review={review} key={review.name}/>)}</div></div></InfiniteRail>}<p className="source-note">Original review wording retained; excerpts are marked. Individual experiences and treatment outcomes vary.</p></div></section>;
}
