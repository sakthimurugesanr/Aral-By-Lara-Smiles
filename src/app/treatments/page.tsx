import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { TreatmentGrid } from '@/components/treatments';
import { FAQAccordion } from '@/components/faq';
export const metadata:Metadata={title:'Dental Treatment Directory',description:'Browse dental services across the supplied Lara Smiles network. Filter treatments by branch and explore care options.',alternates:{canonical:'/treatments'}};
export default function Treatments(){return <><PageIntro eyebrow="Care for every chapter" title={<>Your smile. <em>Your possibilities.</em></>} text="Browse the treatment list or choose a branch to see its listed services. Your consultation will help determine suitable care." /><section className="section treatment-section"><div className="container"><TreatmentGrid full /></div></section><FAQAccordion /></>}
