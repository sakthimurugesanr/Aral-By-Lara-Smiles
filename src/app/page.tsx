import { SuccessStories } from '@/components/success-stories';
import { SocialVideos } from '@/components/social-videos';
import { DoctorTeam } from '@/components/doctor-team';
import { BrandMilestones } from '@/components/brand-milestones';
import { ClinicalTechnology } from '@/components/clinical-technology';
import { ApproachJourney } from '@/components/approach-journey';
import { HeroBackdrop, HeroExperience, HeroHeadline } from '@/components/hero-backdrop';
import { SmileComparison } from '@/components/smile-comparison';
import { ClinicVideos } from '@/components/clinic-videos';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Check, MessageCircle } from 'lucide-react';
import { Button, SectionHeading } from '@/components/ui';
import { Reveal, Parallax, ScrollImageEntrance } from '@/components/motion';
import { TreatmentGrid } from '@/components/treatments';
import { FAQAccordion } from '@/components/faq';
import { BranchGrid } from '@/components/branches';
import { PatientReviews } from '@/components/reviews';
import { ToothLineArt } from '@/components/treatment-art';
import { ToothJourney } from '@/components/tooth-journey';
import { site } from '@/lib/content';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
 return <>
 <HeroExperience><HeroBackdrop /><div className="hero-dental-overlay" /><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">Personalised dental care in Tiruppur</p><HeroHeadline /><p className="hero-description">Thoughtful care. Beautiful possibilities. Discover personalised dentistry and clear aligners at ARAL by LARA SMILES, Tiruppur.</p><div className="hero-actions"><Button href="/book-appointment">Book an appointment</Button><Link className="underlined-link" href="/treatments">Explore treatments</Link></div><div className="hero-assurance"><div><strong>Your comfort comes first.</strong><span>A conversation, a plan, a little more confidence.</span></div></div></div></div><div className="hero-bottom container"><a href="#care">A little more about us</a><span>PERSONAL CARE. SHARED CONFIDENCE.</span><span className="hero-location"><MapPin size={13} />Tiruppur, Tamil Nadu</span></div></HeroExperience>
 <section className="section treatment-section" id="treatments"><div className="container"><Reveal className="section-top"><SectionHeading eyebrow="Care for every chapter" title={<>Your smile. <em>Your possibilities.</em></>} text="From a routine check-up to a fresh start, find care that meets you where you are." /><Link className="text-link" href="/treatments">All treatments</Link></Reveal><Reveal><TreatmentGrid /></Reveal></div></section>
 <section id="care" className="section welcome-section"><div className="container welcome-grid"><Reveal className="welcome-visual"><ScrollImageEntrance className="welcome-photo"><Image src="/images/infrastructure.webp" alt="ARAL clinic interior supplied by the clinic" fill sizes="(max-width: 760px) 90vw, 45vw" /></ScrollImageEntrance><span className="photo-index">A SPACE FOR YOUR SMILE</span></Reveal><Reveal className="welcome-copy"><SectionHeading eyebrow="Welcome to ARAL" title={<>Dentistry with heart.<br /><em>Care with intention.</em></>} /><p>A dental visit should begin with being heard. At ARAL by LARA SMILES, we believe that understanding your story is the first step towards caring for your smile.</p><p>Part of the Lara Smiles network in Tiruppur, we bring together everyday dental care, restorative options, and smile-focused treatments — with a plan that starts with you.</p><div className="welcome-values"><span><Check size={16} />Time to ask your questions</span><span><Check size={16} />Options explained clearly</span><span><Check size={16} />A plan for your needs</span></div><Link className="text-link" href="/about">Get to know us</Link></Reveal></div></section>
 <ToothJourney />
 <SmileComparison />
 <section id="clear-aligner-care" className="aligner-section"><div className="container aligner-grid"><Reveal className="aligner-copy"><p className="eyebrow">Clear aligners. Clear possibilities.</p><h2>A little change.<br /><em>A lot more confidence.</em></h2><p>A discreet approach to a straighter smile. Explore Invisalign and clear aligner options with a personalised, dentist-supervised treatment plan.</p><ul><li><Check />Clear, removable aligners</li><li><Check />Planning around your individual smile</li><li><Check />Guidance at every stage</li></ul><Button href="/treatments/clear-aligners" light>Explore clear aligners</Button><small>Suitability and available systems are confirmed at consultation.</small></Reveal><div className="aligner-visual"><ToothLineArt /></div></div></section>
 <ClinicalTechnology />
 <ApproachJourney />
 <BrandMilestones />
 <DoctorTeam />
 <SuccessStories />
 <section id="smile-story" className="story-section"><div className="container story-grid"><Parallax className="story-photo"><Image src="/images/services/smile-designing.webp" alt="Illustrative photograph of a dental consultation, not a patient treatment result" fill sizes="(max-width: 760px) 100vw, 45vw" /></Parallax><Reveal className="story-copy"><p className="eyebrow">Real people. Personal journeys.</p><h2>Your smile story.<br /><em>Written with you.</em></h2><p>A question. A conversation. A plan that feels right. Explore real patient feedback and learn how different treatments could fit into your own smile journey.</p><div className="story-links"><Link className="text-link" href="/smile-gallery">Find your smile journey</Link><Link className="text-link" href="/reviews">Patient reviews</Link></div></Reveal></div></section>
 <section className="section branches-section"><div className="container"><Reveal className="section-top"><SectionHeading eyebrow="In your neighbourhood" title={<>A little closer <em>to you.</em></>} text="Explore the Lara Smiles network across Tamil Nadu and Karnataka. Find your branch and its treatments." /><Link className="text-link" href="/branches">Find your clinic</Link></Reveal><BranchGrid /></div></section>
 <section id="start-conversation" className="appointment-banner"><div className="container consultation-grid"><Reveal><p className="eyebrow">Let’s start with a conversation</p><h2>Your next smile chapter<br /><em>starts with hello.</em></h2><p>Have a question? Thinking about treatment?<br />We’re here to help you take the first step.</p><div className="banner-actions"><Button href="/book-appointment">Book an appointment</Button><a href={site.whatsapp} className="underlined-link" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Let’s chat on WhatsApp</a></div></Reveal><Parallax className="consultation-photo"><Image src="/images/close-up-smile.webp" alt="Close-up smile photograph supplied by the clinic" fill sizes="(max-width: 760px) 90vw, 45vw" /></Parallax></div></section>
 <ClinicVideos />
 <SocialVideos />
 <PatientReviews />
 <FAQAccordion />
 {site.approved && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Dentist',name:site.name,url:site.url,telephone:site.phone,address:{'@type':'PostalAddress',streetAddress:'Meena Pharmacy, Rakkiyapalayam Pirivu, RVE Nagar, Valliammai Nagar',addressLocality:'Tiruppur',addressRegion:'Tamil Nadu',postalCode:'641604',addressCountry:'IN'}})}} />}
 </>;
}
