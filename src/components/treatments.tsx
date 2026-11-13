'use client';
import Link from 'next/link';
import { useState } from 'react';
import { treatments, type Treatment } from '@/lib/content';
import { TreatmentImage } from './treatment-image';
import { InfiniteRail } from './infinite-rail';
export function TreatmentCard({ treatment, duplicate = false }: { treatment: Treatment; duplicate?: boolean }) {
 return <Link href={'/treatments/'+treatment.slug} className="treatment-card" tabIndex={duplicate?-1:undefined}><div className="treatment-art-frame"><TreatmentImage slug={treatment.slug}/></div><div className="treatment-card-content"><span className="tiny-label">{treatment.category}</span><h3>{treatment.name}</h3><p>{treatment.description}</p></div><span className="card-learn">See the treatment process</span></Link>;
}
export function TreatmentGrid({ full = false }: { full?: boolean }) {
 const [category, setCategory] = useState('All treatments');
 const items = treatments.filter(t=>category==='All treatments'||t.category===category);
 return <>{full && <div className="filter-tabs" role="group" aria-label="Filter treatments">{['All treatments', 'Straighten', 'Enhance', 'Restore', 'Care'].map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={category===c} className={category===c?'active':''}>{c}</button>)}</div>}{full ? <div className="treatment-grid">{items.map(t=><TreatmentCard key={t.slug} treatment={t}/>)}</div> : <InfiniteRail label="Dental services" className="services-rail"><div className="services-track" key={category}><div className="service-group">{items.map(t=><TreatmentCard key={t.slug} treatment={t}/>)}</div><div className="service-group" aria-hidden="true">{items.map(t=><TreatmentCard key={t.slug} treatment={t} duplicate/>)}</div></div></InfiniteRail>}</>;
}
