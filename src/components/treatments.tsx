'use client';
import Link from 'next/link';
import { useState } from 'react';
import { treatments, type Treatment } from '@/lib/content';
import { TreatmentImage } from './treatment-image';
import { InfiniteRail } from './infinite-rail';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
export function TreatmentCard({ treatment, duplicate = false }: { treatment: Treatment; duplicate?: boolean }) {
 return <Link href={'/treatments/'+treatment.slug} className="treatment-card" tabIndex={duplicate?-1:undefined}><div className="treatment-art-frame"><TreatmentImage slug={treatment.slug}/></div><div className="treatment-card-content"><span className="tiny-label">{treatment.category}</span><h3>{treatment.name}</h3><p>{treatment.description}</p></div><span className="card-learn">See the treatment process</span></Link>;
}
export function TreatmentGrid({ full = false }: { full?: boolean }) {
 const [category, setCategory] = useState('All treatments');
 const [query,setQuery]=useState('');
 const aliases:Record<string,string>={'pediatric-dentistry':'kids child children paediatric','clear-aligners':'invisible aligner invisalign','gum-care':'scaling hygiene polish gums cleaning','crowns-bridges-dentures':'cap replacement false teeth','root-canal':'rootcanal rct pain'};
 const terms=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 const items=treatments.filter(t=>(category==='All treatments'||t.category===category)&&terms.every(term=>`${t.name} ${t.category} ${t.description} ${aliases[t.slug]||''}`.toLowerCase().includes(term)));
 return <><div className="treatment-tools"><div className="treatment-search"><Search size={17} aria-hidden="true"/><Input type="search" aria-label="Search dental treatments" placeholder="Search treatments, e.g. aligners or implants" value={query} onChange={event=>setQuery(event.target.value)}/></div>{query&&<span className="search-result-count" role="status">{items.length} {items.length===1?'treatment':'treatments'} found</span>}</div>{full&&<div className="filter-tabs" role="group" aria-label="Filter treatments">{['All treatments','Straighten','Enhance','Restore','Care'].map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={category===c} className={category===c?'active':''}>{c}</button>)}</div>}{items.length===0?<div className="treatment-empty"><h3>No treatments found.</h3><p>Try another name, or let us help you find the right care.</p><button className="text-link" onClick={()=>{setQuery('');setCategory('All treatments')}}>Clear search</button></div>:full||query.trim()?<div className="treatment-grid">{items.map(t=><TreatmentCard key={t.slug} treatment={t}/>)}</div>:<InfiniteRail label="Dental services" className="services-rail"><div className="services-track" key={category}><div className="service-group">{items.map(t=><TreatmentCard key={t.slug} treatment={t}/>)}</div><div className="service-group" aria-hidden="true">{items.map(t=><TreatmentCard key={t.slug} treatment={t} duplicate/>)}</div></div></InfiniteRail>}</>;
}
