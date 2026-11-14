import Image from 'next/image';
import Link from 'next/link';
import { branches, network } from '@/lib/branches';

export function NetworkOverview(){
 const cities=new Set(branches.map(branch=>branch.city)).size;
 return <section className="network-overview" data-section-motion aria-labelledby="network-overview-title">
  <div className="network-overview-heading"><div><p className="eyebrow">The Lara Smiles network</p><h2 id="network-overview-title">Connected <em>by care.</em></h2></div><span>Tamil Nadu &amp; Karnataka</span></div>
  <div className="network-overview-grid">
   <figure className="network-founder"><div className="network-founder-photo"><Image src="/images/team/abhishikth-suresh.webp" alt="Dr. Abhishikth Suresh, supplied founder portrait" fill sizes="(max-width:760px) 38vw, 200px" loading="lazy"/></div><figcaption><span>People at the heart of it.</span><h3>{network.founder}</h3><p>{network.founderRole}</p><a href={network.founderLinkedIn} target="_blank" rel="noopener noreferrer">Meet the founder on LinkedIn</a></figcaption></figure>
   <div className="network-overview-details"><p className="network-overview-intro">From a beginning in Tiruppur to a connected community of clinics, the Lara Smiles story brings people, places and dental care together.</p><dl><div><dt>Reported beginning</dt><dd>{network.founded}</dd></div><div><dt>Flagship &amp; head office</dt><dd>{network.headquarters}</dd></div><div><dt>Network enquiries</dt><dd><a href={'tel:'+network.phone.replace(/\s/g,'')}>{network.phone}</a></dd></div></dl><div className="network-overview-reach"><span><strong>{branches.length}</strong> listed clinics</span><span><strong>{cities}</strong> cities</span><Link href="/branches">Find your clinic</Link></div></div>
  </div>
 </section>;
}
