'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone } from 'lucide-react';
import { LocationOutline } from './location-outline';
import { branches, mapUrl } from '@/lib/branches';

const cities = ['All locations', ...new Set(branches.map(branch => branch.city))];

export function NeighbourhoodClinics() {
 const [city, setCity] = useState('All locations');
 const [selected, setSelected] = useState(branches[0].slug);
 const visible = branches.filter(branch => city === 'All locations' || branch.city === city);
 const branch = branches.find(item => item.slug === selected) || branches[0];
 const chooseCity = (value: string) => {
  setCity(value);
  if (value !== 'All locations' && branch.city !== value) {
   setSelected(branches.find(item => item.city === value)!.slug);
  }
 };

 return <div className="neighbourhood-finder">
  <div className="neighbourhood-filter-bar">
   <div className="neighbourhood-cities" role="group" aria-label="Filter clinic locations by city">
    {cities.map(value => <button type="button" key={value} aria-pressed={city === value} onClick={() => chooseCity(value)}>{value}</button>)}
   </div>
   <span className="neighbourhood-network-note">8 locations · 2 states</span>
  </div>
  <div className="neighbourhood-layout">
   <div className="neighbourhood-picker">
    <div className="neighbourhood-picker-heading"><p>Find your familiar place.</p><span>{visible.length} {visible.length === 1 ? 'clinic' : 'clinics'}</span></div>
    <div className="neighbourhood-options" role="group" aria-label="Choose a neighbourhood clinic">
     {visible.map(item => <button type="button" className="neighbourhood-option" key={item.slug} aria-pressed={selected === item.slug} aria-controls="neighbourhood-clinic-details" onClick={() => setSelected(item.slug)}><span className="neighbourhood-option-city">{item.city}</span><strong>{item.name}</strong><span className="neighbourhood-option-brand">{item.slug === 'rakkiyapalayam' ? 'ARAL by Lara Smiles' : 'Lara Smiles'}</span><span className="neighbourhood-selection-mark" aria-hidden="true"><LocationOutline compact/></span></button>)}
    </div>
    <p className="neighbourhood-swipe-hint">Swipe to explore clinics</p>
   </div>
   <article className="neighbourhood-detail" id="neighbourhood-clinic-details" data-selected-branch={branch.slug}>
    <div className="neighbourhood-detail-decoration" aria-hidden="true"><LocationOutline/></div>
    <p className="neighbourhood-detail-label">Your selected clinic</p>
    <div className="neighbourhood-detail-heading" aria-live="polite" aria-atomic="true"><span>{branch.brand}</span><h3>{branch.name}</h3><p>{branch.city}, {branch.state}</p></div>
    <address>{branch.address}</address>
    {branch.incompleteAddress && <p className="neighbourhood-address-note">Call for the exact street address before travelling.</p>}
    <div className="neighbourhood-phones">{[branch.phone, ...(branch.otherPhones || [])].map(phone => <a key={phone} href={'tel:' + phone.replace(/\s/g, '')} aria-label={`Call ${branch.name} on ${phone}`}><Phone size={15} aria-hidden="true"/>{phone}</a>)}</div>
    <div className="neighbourhood-detail-actions"><button type="button" className="neighbourhood-book" onClick={() => window.dispatchEvent(new CustomEvent('aral:book', { detail: { branch: branch.slug } }))}>Book a visit</button><a className="neighbourhood-directions" href={mapUrl(branch)} target="_blank" rel="noopener noreferrer"><LocationOutline compact/>{branch.incompleteAddress ? 'Search clinic area' : 'Get directions'}</a></div>
    <Link className="neighbourhood-treatments" prefetch={false} href={'/treatments?branch=' + branch.slug}>Explore treatments at this clinic</Link>
   </article>
  </div>
  <p className="neighbourhood-visit-note">A quick call before your visit helps confirm the location, consulting team and appointment availability.</p>
 </div>;
}
