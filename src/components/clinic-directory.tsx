'use client';
import { useEffect, useState } from 'react';
import { Phone, MapPin } from 'lucide-react';
import { branches, mapUrl } from '@/lib/content';
import { Button } from './ui/button';

export function ClinicDirectory(){
 const [selected,setSelected]=useState(branches[0].slug);
 useEffect(()=>{const sync=()=>{const slug=window.location.hash.slice(1);if(branches.some(b=>b.slug===slug))setSelected(slug)};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[]);
 const branch=branches.find(b=>b.slug===selected)!;
 const book=()=>window.dispatchEvent(new CustomEvent('aral:book',{detail:{branch:branch.slug}}));
 return <div className="clinic-directory"><div className="clinic-picker"><div className="clinic-picker-intro"><p className="eyebrow">Find your neighbourhood</p><h2>Choose your clinic.</h2><p>Select a location to see its details and plan your visit.</p></div><div className="clinic-options" role="group" aria-label="Choose a Tiruppur clinic">{branches.map((b,i)=><button key={b.slug} id={b.slug} className={`clinic-option ${selected===b.slug?'selected':''}`} onClick={()=>setSelected(b.slug)} aria-pressed={selected===b.slug}><span className="clinic-option-name"><MapPin size={17}/>{b.name}</span><span className="clinic-option-brand">{i===0?'ARAL by LARA SMILES':'Lara Smiles'}</span><span className="clinic-option-address">{b.address}</span><span className="clinic-option-action">{selected===b.slug?'Viewing clinic':'View clinic details'}</span></button>)}</div></div><div className="clinic-details"><div className="clinic-details-copy" aria-live="polite"><p className="eyebrow">Your chosen location</p><h2>{branch.name}</h2><p>{branch.address}</p><a href={'tel:'+branch.phone.replace(/\s/g,'')} className="clinic-direct-phone"><Phone size={17}/>{branch.phone}</a><div className="clinic-detail-actions"><Button onClick={book}>Request an appointment</Button><Button variant="outline" asChild><a href={mapUrl(branch)} target="_blank" rel="noopener noreferrer">Get directions</a></Button></div></div><div className="clinic-map"><iframe key={branch.slug} title={`Map search for ${branch.name} clinic in Tiruppur`} src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div><p className="clinic-visit-note">A quick call before you travel helps confirm the exact location, clinic hours and clinician availability.</p></div></div>;
}
