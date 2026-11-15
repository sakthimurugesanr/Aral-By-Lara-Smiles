'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Phone, MapPin } from 'lucide-react';
import { branches, mapUrl, branchMapQuery, treatmentsForBranch, network } from '@/lib/content';
import { Button } from './ui/button';

const cities=['All cities',...new Set(branches.map(branch=>branch.city))];

export function ClinicDirectory(){
 const [selected,setSelected]=useState(branches[0].slug);
 const [city,setCity]=useState('All cities');
 const [showMap,setShowMap]=useState(false);
 const detail=useRef<HTMLDivElement>(null);
 useEffect(()=>{const sync=()=>{const slug=window.location.hash.slice(1);if(branches.some(b=>b.slug===slug)){setSelected(slug);setCity('All cities');setShowMap(false)}};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[]);
 const branch=branches.find(b=>b.slug===selected)!;
 const services=treatmentsForBranch(branch.slug);
 const visible=branches.filter(b=>city==='All cities'||b.city===city);
 const choose=(slug:string,move=false)=>{setSelected(slug);setShowMap(false);window.history.replaceState(window.history.state,'',`#${slug}`);if(move&&matchMedia('(max-width:760px)').matches)requestAnimationFrame(()=>detail.current?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}))};
 const chooseCity=(value:string)=>{setCity(value);if(value!=='All cities'&&branch.city!==value)choose(branches.find(b=>b.city===value)!.slug)};
 const book=()=>window.dispatchEvent(new CustomEvent('aral:book',{detail:{branch:branch.slug}}));
 return <div className="clinic-directory network-directory">
  <div className="clinic-picker">
   <div className="clinic-picker-intro"><p className="eyebrow">A place for your care</p><h2>Choose your clinic.</h2><p>Start with a city, then select a location.</p></div>
   <div className="directory-city-filter" role="group" aria-label="Filter directory by city">{cities.map(value=><button type="button" key={value} aria-pressed={city===value} onClick={()=>chooseCity(value)}>{value}</button>)}</div>
   <div className="directory-options-label"><span>{visible.length} {visible.length===1?'clinic':'clinics'}</span><span>Your local team</span></div>
   <div className="clinic-options" role="group" aria-label="Choose a Lara Smiles branch">{visible.map(b=><button type="button" key={b.slug} id={b.slug} className={`clinic-option ${selected===b.slug?'selected':''}`} onClick={event=>choose(b.slug,event.detail>0)} aria-pressed={selected===b.slug} aria-controls="selected-clinic-details"><span className="clinic-option-name"><MapPin size={16}/>{b.name}</span><span className="clinic-option-brand">{b.city} · {b.designation||b.brand}</span></button>)}</div>
   <div className="network-contact-note"><span>Lara Smiles network enquiries</span><a href={'tel:'+network.phone.replace(/\s/g,'')}>{network.phone}</a></div>
  </div>
  <div className="clinic-details network-clinic-details" id="selected-clinic-details" ref={detail} data-selected-branch={branch.slug}>
   <div className="clinic-details-copy">
    <div aria-live="polite" className="clinic-detail-heading"><p className="eyebrow">{branch.brand}{branch.designation?` · ${branch.designation}`:''}</p><h2>{branch.name}</h2><p className="clinic-city">{branch.city}, {branch.state}</p></div>
    <p className="clinic-full-address">{branch.address}</p>{branch.addressNote&&<p className="clinic-address-note">{branch.addressNote}</p>}
    <div className="clinic-phone-list">{[branch.phone,...(branch.otherPhones||[])].map(phone=><a key={phone} href={'tel:'+phone.replace(/\s/g,'')} className="clinic-direct-phone" aria-label={`Call ${branch.name} on ${phone}`}><Phone size={17}/>{phone}</a>)}</div>
    <div className="clinic-detail-actions"><Button onClick={book}>Request an appointment</Button><Button variant="outline" asChild><a href={mapUrl(branch)} target="_blank" rel="noopener noreferrer">{branch.incompleteAddress?'Search clinic area':'Get directions'}</a></Button></div>
    <section className="clinic-branch-services" aria-labelledby="branch-services-title" key={branch.slug}><div className="branch-services-heading"><h3 id="branch-services-title">Care at this clinic</h3><span>{services.length} listed services</span></div><p>Your dentist will confirm current availability and suitability at consultation.</p><ul>{services.map(t=><li key={t.slug}><Link prefetch={false} href={`/treatments/${t.slug}?branch=${branch.slug}`}>{branch.serviceLabels?.[t.slug]||t.name}</Link></li>)}</ul><Link className="clinic-service-directory" href={`/treatments?branch=${branch.slug}`}>Explore this branch’s treatment directory</Link></section>
    <div className="clinic-meta-grid"><div className="clinic-team-note"><h3>Your dental team</h3><p>{branch.teamNote}</p></div>{branch.rating&&<div className="clinic-rating"><strong>{branch.rating.score.toFixed(1)} / 5</strong><span>{branch.rating.count} Google ratings</span><small>Supplied rating snapshot; not a live feed.</small></div>}</div>
    <nav className="clinic-source-links" aria-label="Supplied branch sources">{branch.sources.map(source=><a href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</nav>
    <button type="button" className="clinic-map-toggle" onClick={()=>setShowMap(value=>!value)} aria-expanded={showMap} aria-controls="branch-map">{showMap?'Hide map search':'Show map search'}</button>
   </div>
   {showMap&&<div className="clinic-map" id="branch-map"><iframe key={branch.slug} title={`Map search for ${branch.brand}, ${branch.name}, ${branch.city}`} src={`https://maps.google.com/maps?q=${encodeURIComponent(branchMapQuery(branch))}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>}
   <p className="clinic-visit-note">Branch details and service lists are based on the information supplied for this website. Call before travelling to confirm the location, opening hours and consulting team.</p>
  </div>
 </div>;
}
