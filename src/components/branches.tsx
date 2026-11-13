import { MapPin, ArrowUpRight, Phone } from 'lucide-react';
import { branches, mapUrl, type Branch } from '@/lib/content';
import Link from 'next/link';
export function BranchCard({ branch, index }: { branch: Branch; index: number }) {
 return <article className="branch-card" id={branch.slug}><span className="branch-number">0{index+1}</span><div className="branch-title"><MapPin size={19} /><h3>{branch.name}</h3></div><span className="tiny-label">{index===0?'ARAL BY LARA SMILES':'LARA SMILES'}</span><p>{branch.address}</p><a className="branch-phone" href={'tel:'+branch.phone.replace(/\s/g,'')}><Phone size={15} />{branch.phone}</a><div className="branch-actions"><a href={mapUrl(branch)} target="_blank" rel="noopener noreferrer">Get directions<ArrowUpRight size={15} /></a><Link href={'/book-appointment?branch='+branch.slug}>Book a visit<ArrowUpRight size={15} /></Link></div></article>;
}
export function BranchGrid() { return <div className="branch-grid">{branches.map((b,i)=><BranchCard key={b.slug} branch={b} index={i} />)}</div>; }
