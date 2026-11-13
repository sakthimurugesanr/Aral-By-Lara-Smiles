'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { treatments } from '@/lib/content';
import { TreatmentImage } from './treatment-image';
export function SmileGallery(){
 const [category,setCategory]=useState('All journeys');
 const categories:Record<string,string[]>={'All journeys':['clear-aligners','braces','smile-designing','teeth-whitening','dental-implants','root-canal'],'Clear aligners':['clear-aligners','braces'],'Cosmetic care':['smile-designing','teeth-whitening','veneers'],'Restorative care':['dental-implants','root-canal','crowns-bridges-dentures']};
 const selected=treatments.filter(t=>categories[category].includes(t.slug));
 return <><div className="journey-feature"><div className="journey-feature-photo"><Image src="/images/smile-banner.webp" alt="Illustrative close-up of a woman’s smile; not a clinical result" fill sizes="(max-width:760px) 90vw, 45vw"/></div><div><p className="eyebrow">Every smile is personal</p><h2>A little understanding.<br/><em>A confident next step.</em></h2><p>Explore different paths to dental care, and hear what people valued about their visit. Your dentist will explain what is suitable for your own smile.</p><blockquote>Doctor is very kind and treatment is also very good.<cite>Selva Kousi · Supplied Google review excerpt</cite></blockquote></div></div><div className="filter-tabs gallery-tabs" role="group" aria-label="Filter smile journeys">{Object.keys(categories).map(c=><button key={c} aria-pressed={category===c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="journey-grid">{selected.map(t=><Link href={'/treatments/'+t.slug} className="journey-card" key={t.slug}><TreatmentImage slug={t.slug}/><div><h3>{t.name}</h3><p>{t.description}</p><span>Explore the care process</span></div></Link>)}</div><p className="source-note">The photographs and illustrations on this page are illustrative. Genuine before-and-after images will only be added with clinic approval and patient consent. <Link href="/reviews">Read the supplied patient reviews.</Link></p></>;
}
