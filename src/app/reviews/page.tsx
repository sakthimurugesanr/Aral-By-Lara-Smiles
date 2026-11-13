import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { PatientReviews } from '@/components/reviews';

export const metadata: Metadata = { title: 'Patient Reviews', description: 'Read patient experiences shared with ARAL by LARA SMILES, including feedback on dental care, clear explanations and personal attention.', alternates: { canonical: '/reviews' } };

export default function Reviews() {
  return <><PageIntro eyebrow="Patient experiences" title={<>The little things <em>that matter.</em></>} text="Hear from patients about their experience with the Lara Smiles team." /><PatientReviews full /></>;
}
