import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { TreatmentGrid } from '@/components/treatments';
import { FAQAccordion } from '@/components/faq';
export const metadata:Metadata={title:'Dental Treatments in Tiruppur',description:'Explore clear aligners, braces, implants, root canal treatment, cosmetic dentistry and family dental care in Tiruppur.',alternates:{canonical:'/treatments'}};
export default function Treatments(){return <><PageIntro eyebrow="CARE FOR EVERY CHAPTER" title={<>Your smile. <em>Your possibilities.</em></>} text="Explore our care directory. Your consultation will help you understand which options are appropriate for your needs." /><section className="section treatment-section"><div className="container"><TreatmentGrid full /></div></section><FAQAccordion /></>}
