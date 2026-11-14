import { MapPin, Phone } from 'lucide-react';
import { branches, mapUrl, type Branch } from '@/lib/content';
import Link from 'next/link';
export function BranchCard({branch}:{branch:Branch}){
 return <article className="branch-card" id={branch.slug}><div className="branch-title"><MapPin size={19}/><h3>{branch.name}</h3></div><span className="tiny-label">{branch.city} · {branch.brand}</span><p>{branch.address}</p><a className="branch-phone" href={'tel:'+branch.phone.replace(/\s/g,'')}><Phone size={15}/>{branch.phone}</a><div className="branch-actions"><Link href={'/branches#'+branch.slug}>Details &amp; treatments</Link><a href={mapUrl(branch)} target="_blank" rel="noopener noreferrer">{branch.incompleteAddress?'Map search':'Directions'}</a></div></article>;
}
export function BranchGrid(){return <div className="branch-grid">{branches.map(b=><BranchCard key={b.slug} branch={b}/>)}</div>}
