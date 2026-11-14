import Link from 'next/link';
import { network } from '@/lib/branches';

const milestones = [
 { theme: 'A wider community', title: 'From Tiruppur, across South India.', text: 'The supplied directory lists four Tiruppur clinics, alongside locations in Salem, Madurai, Sivakasi and Bengaluru.', link: '/branches', action: 'Explore the listed locations' },
 { theme: 'Aligner-focused care', title: 'More ways to plan a smile.', text: 'Invisalign, Invisalign Go, Invisalign First, Precisalign and digital orthodontic planning are referenced in the supplied material. Current provider credentials and participating clinics need confirmation.' },
 { theme: 'Digital planning', title: 'A closer view of the possibilities.', text: 'The brand is associated in supplied material with iTero scanning, 3D dental assessments and digital smile designing. Equipment availability needs confirmation at each branch.' },
 { theme: 'Reported patient feedback', title: '4.9 / 5, in supplied rating snapshots.', text: 'Gandhi Nagar, Nallur and ARAL each have a supplied rating of 4.9/5. These are historical figures, not live ratings or a rating for the entire network.' },
 { theme: 'Community awareness', title: 'Conversations beyond the clinic.', text: 'Supplied information describes free dental check-up camps, smile assessment events and aligner awareness or promotional activities. Current events and dates have not been confirmed.' },
 { theme: 'A local identity', title: 'ARAL by Lara Smiles.', text: 'ARAL is presented through a localized, co-branded clinic identity. The legal partnership and ownership structure have not been established here.' },
] as const;

export function BrandMilestones() {
 return <section id="brand-milestones" className="section brand-milestones-section" aria-labelledby="brand-milestones-title">
  <div className="container">
   <div className="brand-milestones-heading"><p className="eyebrow">Clinical &amp; brand milestones</p><h2 id="brand-milestones-title">A beginning. A direction.<br/><em>A growing story.</em></h2><p>Key moments and areas of focus described in the supplied brand information.</p></div>
   <div className="brand-milestones-layout">
    <article className="milestone-origin"><span className="milestone-origin-label">The reported beginning</span><p className="milestone-year"><time dateTime="2023">2023</time></p><h3>Rooted in Tiruppur.</h3><p>Lara Smiles was reportedly founded in Tiruppur by {network.founder}.</p><span className="milestone-origin-note">Founding details are reported in supplied material and have not been independently verified.</span></article>
    <ul className="brand-milestone-list">{milestones.map(item => <li key={item.theme}><article className="brand-milestone-entry"><span className="milestone-theme">{item.theme}</span><h3>{item.title}</h3><p>{item.text}</p>{'link' in item && <Link href={item.link}>{item.action}</Link>}</article></li>)}</ul>
   </div>
   <p className="brand-milestones-disclosure">Only the founding year is dated. Other entries describe reported developments and areas of focus; they do not establish a verified chronology or chain-wide certification.</p>
  </div>
 </section>;
}
