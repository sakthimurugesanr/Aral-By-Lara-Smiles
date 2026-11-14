import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { ClinicDirectory } from '@/components/clinic-directory';
export const metadata:Metadata={title:'Lara Smiles Branches',description:'Explore eight listed Lara Smiles branches across Tiruppur, Salem, Madurai, Sivakasi and Bengaluru. View branch contacts, addresses and treatments.',alternates:{canonical:'/branches'}};
export default function Branches(){return <><PageIntro eyebrow="Your Lara Smiles network" title={<>Your clinic. <em>Closer to home.</em></>} text="Explore eight listed locations across Tamil Nadu and Karnataka. Choose a branch to see its contact details, dental team information and treatment list."/><section className="section clinics-page"><div className="container"><ClinicDirectory/></div></section></>}
