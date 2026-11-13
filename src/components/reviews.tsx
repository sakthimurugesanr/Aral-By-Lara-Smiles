import Link from 'next/link';
import { patientReviews, type PatientReview } from '@/lib/reviews';
import { SectionHeading } from './ui';

function ReviewCard({ review }: { review: PatientReview }) {
  return <figure className="review-card"><p className="review-source">Patient review · Google</p><blockquote>{review.text}</blockquote>{review.excerpt && <span className="review-excerpt">Excerpt from the supplied review</span>}<figcaption>{review.name}</figcaption></figure>;
}

export function PatientReviews({ full = false }: { full?: boolean }) {
  const featured = [patientReviews[0], patientReviews[4], patientReviews[8]];
  return <section className="section reviews-section"><div className="container"><div className="section-top"><SectionHeading eyebrow="In their own words" title={<>Care that makes <em>a difference.</em></>} text="Personal experiences, shared by patients of Lara Smiles." />{!full && <Link className="text-link" href="/reviews">Read patient reviews</Link>}</div><div className="review-grid">{(full ? patientReviews : featured).map(review => <ReviewCard review={review} key={review.name} />)}</div><p className="source-note">Review text supplied from Google, with original wording retained. Excerpts are marked. These are individual experiences; treatment needs and outcomes vary.</p></div></section>;
}
