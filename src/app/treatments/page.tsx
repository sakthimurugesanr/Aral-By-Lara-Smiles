import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { TreatmentGrid } from '@/components/treatments';
import { FAQAccordion } from '@/components/faq';
export const metadata:Metadata={title:'Dental Treatment Directory',description:'Browse dental services across the supplied Lara Smiles network. Explore 11 treatment categories and filter by branch.',alternates:{canonical:'/treatments'}};
export default function Treatments(){return <><PageIntro eyebrow="Care for every chapter" title={<>Your smile. <em>Your possibilities.</em></>} text="Explore 11 dental care categories, from orthodontics to preventive care. Choose a branch to see its listed services." /><section className="section treatment-section"><div className="container"><TreatmentGrid full /></div></section><FAQAccordion /></>}
