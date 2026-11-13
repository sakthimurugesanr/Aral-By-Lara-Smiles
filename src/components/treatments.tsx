'use client';
import Link from 'next/link';
import { useState } from 'react';
import { treatments, type Treatment } from '@/lib/content';
export function TreatmentCard({ treatment }: { treatment: Treatment }) {
 return <Link href={'/treatments/'+treatment.slug} className="treatment-card"><div><span className="tiny-label">{treatment.category}</span><h3>{treatment.name}</h3><p>{treatment.description}</p></div><span className="card-learn">Explore treatment</span></Link>;
}
export function TreatmentGrid({ full = false }: { full?: boolean }) {
 const [category, setCategory] = useState('All treatments');
 const items = full ? treatments : treatments.filter(t => ['clear-aligners', 'dental-implants', 'smile-designing', 'root-canal', 'teeth-whitening', 'pediatric-dentistry'].includes(t.slug));
 return <><div className="filter-tabs" role="group" aria-label="Filter treatments">{['All treatments', 'Straighten', 'Enhance', 'Restore', 'Care'].map(c=><button key={c} onClick={()=>setCategory(c)} aria-pressed={category===c} className={category===c?'active':''}>{c}</button>)}</div><div className="treatment-grid">{items.filter(t=>category==='All treatments'||t.category===category).map(t=><TreatmentCard key={t.slug} treatment={t} />)}</div></>;
}
