import Link from 'next/link';
import { patientReviews, type PatientReview } from '@/lib/reviews';
import { SectionHeading } from './ui';
import { ReviewRail } from './review-rail';

function ReviewCard({ review }: { review: PatientReview }) {
  return <figure className="review-card"><p className="review-source">Shared on Google</p><blockquote>{review.text}</blockquote>{review.excerpt && <span className="review-excerpt">Excerpt from the supplied review</span>}<figcaption>{review.name}</figcaption></figure>;
}

export function PatientReviews({ full = false }: { full?: boolean }) {
  return <section id="patient-stories" className="section reviews-section"><div className="container"><div className="section-top"><SectionHeading eyebrow="In their own words" title={<>A little care.<br/><em>A lasting impression.</em></>} text="The moments that mattered, in the words of the people we care for." />{!full && <Link className="text-link" href="/reviews">Read every story</Link>}</div>{full ? <div className="review-grid">{patientReviews.map(review=><ReviewCard review={review} key={review.name}/>)}</div> : <ReviewRail><div className="review-track"><div className="review-group">{patientReviews.map(review=><ReviewCard review={review} key={review.name}/>)}</div><div className="review-group" aria-hidden="true" inert>{patientReviews.map(review=><ReviewCard review={review} key={review.name}/>)}</div></div></ReviewRail>}<p className="source-note">Original review wording retained; excerpts are marked. Individual experiences and treatment outcomes vary.</p></div></section>;
}
