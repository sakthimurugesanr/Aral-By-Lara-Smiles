import Link from 'next/link';
import { network } from '@/lib/branches';
import { MilestoneIcon } from './milestone-icon';

const milestones = [
 { icon: 'network', theme: 'A wider community', title: 'From Tiruppur, across South India.', text: 'Four listed Tiruppur clinics, alongside locations in Salem, Madurai, Sivakasi and Bengaluru.', link: '/branches', action: 'Explore our locations' },
 { icon: 'aligners', theme: 'Aligner-focused care', title: 'More ways to plan a smile.', text: 'Invisalign, Invisalign Go, Invisalign First, Precisalign and digital orthodontic planning feature in the supplied brand information. Confirm current credentials and participating clinics.' },
 { icon: 'digital', theme: 'Digital planning', title: 'A closer view of the possibilities.', text: 'iTero scanning, 3D assessments and digital smile designing are referenced in supplied material. Ask your clinic about available equipment and planning options.' },
 { icon: 'feedback', theme: 'Patient perspectives', title: 'Care that people talk about.', text: 'Gandhi Nagar, Nallur and ARAL each have a supplied 4.9/5 rating snapshot. These historical figures are not live ratings or a network-wide score.' },
 { icon: 'community', theme: 'Community awareness', title: 'Conversations beyond the clinic.', text: 'Reported initiatives include free check-up camps, smile assessments and aligner awareness activities. Contact the team for confirmed upcoming events.' },
 { icon: 'identity', theme: 'A local identity', title: 'ARAL by Lara Smiles.', text: 'A local clinic identity connected with the Lara Smiles name. The legal partnership and ownership structure have not been independently established here.' },
] as const;

export function BrandMilestones() {
 return <section id="brand-milestones" className="section brand-milestones-section" aria-labelledby="brand-milestones-title">
  <div className="container">
   <div className="brand-milestones-heading"><div><p className="eyebrow">Clinical &amp; brand milestones</p><h2 id="brand-milestones-title">A beginning. A direction.<br/><em>A growing story.</em></h2></div><p>The people, places and ideas shaping the Lara Smiles story.</p></div>
   <div className="brand-milestones-layout">
    <article className="milestone-origin"><div className="milestone-origin-date"><span className="milestone-origin-label">The reported beginning</span><p className="milestone-year"><time dateTime="2023">2023</time></p></div><div className="milestone-origin-copy"><h3>Rooted in Tiruppur.<br/><span>Growing through care.</span></h3><p>Lara Smiles was reportedly founded in Tiruppur by {network.founder}.</p></div><span className="milestone-origin-art"><MilestoneIcon kind="origin"/></span></article>
    <ul className="brand-milestone-list">{milestones.map(item => <li key={item.theme}><article className="brand-milestone-entry"><span className={'milestone-symbol milestone-symbol-'+item.icon}><MilestoneIcon kind={item.icon}/></span><span className="milestone-theme">{item.theme}</span><h3>{item.title}</h3><p>{item.text}</p>{'link' in item && <Link href={item.link}>{item.action}</Link>}</article></li>)}</ul>
   </div>
   <p className="brand-milestones-disclosure">Based on supplied brand information; founding details have not been independently verified. Only the founding year is dated. Other entries describe reported developments and areas of focus, not a verified chronology or chain-wide certification.</p>
  </div>
 </section>;
}
