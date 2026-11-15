import { MissionVision } from '@/components/mission-vision';
import { TeamAwards } from '@/components/team-awards';
import { SuccessStories } from '@/components/success-stories';
import { DoctorTeam } from '@/components/doctor-team';
import { BrandMilestones } from '@/components/brand-milestones';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro, Button } from '@/components/ui';
import { NetworkOverview } from '@/components/network-overview';
export const metadata: Metadata = {title:'Our Story',description:'Get to know ARAL by LARA SMILES, part of the Lara Smiles dental network in Tiruppur, and our approach to personalised care.',alternates:{canonical:'/about'}};
export default function About(){return <><PageIntro eyebrow="The story behind the smile" title={<>Care begins <em>with listening.</em></>} text="A thoughtful dental experience, built around the person behind the smile."/><section className="section story-page"><div className="container"><div className="about-story-grid"><div className="about-story-copy"><p className="eyebrow">Our approach</p><h2>A little care can change how you feel.</h2><p>ARAL by LARA SMILES is part of the Lara Smiles dental network in Tiruppur. Our approach starts with a simple idea: you should understand your options and feel comfortable asking questions.</p><p>Whether you are thinking about clear aligners, restorative treatment, a cosmetic change or everyday dental health, a consultation is a chance to talk about what matters to you. Treatment recommendations follow an individual examination.</p></div><div className="about-image"><Image src="/images/infrastructure.webp" alt="Clinic interior supplied by ARAL" fill sizes="(max-width:760px) 90vw, 45vw"/></div></div><div className="about-care-summary"><div><h2>Your care, considered.</h2><p>Clear explanations. Thoughtful planning. A welcoming experience. Ask about treatment options, costs, alternatives and aftercare before deciding.</p></div><Button href="/book-appointment">Start a conversation</Button></div><NetworkOverview/></div></section><MissionVision /><BrandMilestones /><DoctorTeam /><TeamAwards /><SuccessStories /></>}


