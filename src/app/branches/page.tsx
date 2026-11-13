import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { ClinicDirectory } from '@/components/clinic-directory';
export const metadata:Metadata={title:'Our Tiruppur Clinics',description:'Find Lara Smiles clinics in Rakkiyapalayam, Gandhi Nagar, Nallur and K. Chettipalayam. Compare locations, call directly and enquire about a visit.',alternates:{canonical:'/branches'}};
export default function Branches(){return <><PageIntro eyebrow="In your neighbourhood" title={<>Your clinic. <em>Closer to home.</em></>} text="Explore four Lara Smiles network locations in Tiruppur. Choose a clinic, find directions, or let our team help you plan your visit."/><section className="section clinics-page"><div className="container"><ClinicDirectory/></div></section></>}
