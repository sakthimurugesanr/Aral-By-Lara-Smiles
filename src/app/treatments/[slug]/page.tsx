import Link from 'next/link';
import { TreatmentCard } from '@/components/treatments';
import { SectionHeading } from '@/components/ui';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { treatments } from '@/lib/content';
import { treatmentProcesses } from '@/lib/treatment-details';
import { TreatmentImage } from '@/components/treatment-image';
import { Button, PageIntro } from '@/components/ui';
import { Reveal } from '@/components/motion';
export function generateStaticParams(){return treatments.map(t=>({slug:t.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const t=treatments.find(t=>t.slug===slug);return {title:t?`${t.name} in Tiruppur`:'Treatment',description:t?.description,alternates:{canonical:`/treatments/${slug}`}}}
export default async function Treatment({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const t=treatments.find(t=>t.slug===slug);if(!t)notFound();
 const others=treatments.filter(item=>item.slug!==slug);
 const companionSlugs:Record<string,string[]>={Restore:['gum-care','emergency-care'],Straighten:['gum-care','pediatric-dentistry'],Enhance:['crowns-bridges-dentures','clear-aligners'],Care:['root-canal','crowns-bridges-dentures']};
 const related=[...others.filter(item=>item.category===t.category),...others.filter(item=>companionSlugs[t.category]?.includes(item.slug)&&item.category!==t.category)].slice(0,3);
 return <><PageIntro eyebrow={`${t.category} · Dental care in Tiruppur`} title={t.name} text={t.description}/><section className="section process-section"><div className="container detail-layout"><div className="prose"><Reveal className="detail-treatment-art"><TreatmentImage slug={slug}/></Reveal><h2>Understand your treatment.</h2><p>{t.detail}</p><h3>What to discuss at your visit</h3><ul>{t.benefits.map(b=><li key={b}>{b}</li>)}</ul><h2>How the treatment works</h2><p>Your exact plan follows an individual examination. Here is what the process may involve.</p><div className="treatment-process">{treatmentProcesses[slug].map(step=><Reveal className="process-step" key={step.title}><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</div><p className="source-note">General educational information, not individual medical advice. Outcomes and treatment schedules vary. Confirm clinician, equipment and service availability with your chosen branch. References: <a href="https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-treatments/" target="_blank" rel="noopener noreferrer">NHS dental treatments</a> and <a href="https://bos.org.uk/clear-aligners/" target="_blank" rel="noopener noreferrer">British Orthodontic Society</a>.</p></div><aside className="detail-aside"><h3>Let’s talk about<br/><em>your smile.</em></h3><p>Understand your options, the likely benefits, risks, alternatives and costs before deciding.</p><Button href="/book-appointment">Enquire about a visit</Button><p>Prefer to call?<br/><a href="tel:+917306565995">+91 73065 65995</a></p></aside></div></section><section className="section related-treatments"><div className="container"><SectionHeading eyebrow="Explore your options" title={<>Related <em>treatments.</em></>} text="Discover other services to discuss with your dentist."/><div className="related-treatment-grid">{related.map(item=><TreatmentCard key={item.slug} treatment={item}/>)}</div><h3 className="other-treatment-heading">All other treatments</h3><nav className="other-treatment-links" aria-label="Other dental treatments">{others.map(item=><Link key={item.slug} href={"/treatments/"+item.slug}>{item.name}</Link>)}</nav></div></section></>;
}
