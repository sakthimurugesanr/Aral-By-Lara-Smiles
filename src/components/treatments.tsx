'use client';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { branches, treatmentCategories, treatmentsForBranch, type Treatment } from '@/lib/content';
import { InfiniteRail } from './infinite-rail';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brandTheme } from '@/lib/brand-theme';
import { TreatmentVisual } from './treatment-visual';
import { Search } from 'lucide-react';

const filterTheme=createTheme({palette:{primary:{main:brandTheme.colors.primary},text:{primary:brandTheme.colors.ink,secondary:brandTheme.colors.muted}},typography:{fontFamily:brandTheme.fonts.body,fontSize:14},shape:{borderRadius:brandTheme.shape.control},components:{MuiOutlinedInput:{styleOverrides:{root:{background:brandTheme.colors.surface,fontSize:14,'& .MuiOutlinedInput-notchedOutline':{borderColor:brandTheme.colors.controlBorder}}}},MuiMenuItem:{styleOverrides:{root:{fontSize:14,minHeight:44}}}}});

const aliases: Record<string, string> = {
 'pediatric-dentistry': 'kids child children paediatric family check-ups',
 'pediatric-cavity-care': 'kids child children paediatric fillings',
 'clear-aligners': 'invisible aligner invisalign',
 'braces': 'traditional metal fixed orthodontic',
 'transparent-braces': 'ceramic clear orthodontic',
 'gum-care': 'scaling hygiene polish gums cleaning bleeding',
 'crowns-bridges-dentures': 'cap replacement false teeth',
 'root-canal': 'rootcanal rct painless anaesthesia comfort',
 'smile-designing': 'makeover cosmetic digital smile designing',
 'itero-scanning': 'intraoral digital 3d scan itero',
};

export function TreatmentCard({ treatment, duplicate = false }: { treatment: Treatment; duplicate?: boolean }) {
 return <Link prefetch={false} href={'/treatments/' + treatment.slug} className="treatment-card treatment-text-card" tabIndex={duplicate ? -1 : undefined}>
  <TreatmentVisual slug={treatment.slug} name={treatment.name} category={treatment.category}/>
  <div className="treatment-card-content"><span className="tiny-label">{treatment.category}</span><h3>{treatment.name}</h3><p>{treatment.description}</p></div>
  <span className="card-learn">See the treatment process</span>
 </Link>;
}

export function TreatmentGrid({ full = false }: { full?: boolean }) {
 const id=useId();
 const [category, setCategory] = useState('All treatments');
 const [query, setQuery] = useState('');
 const [selectedBranch, setSelectedBranch] = useState('');
 useEffect(() => {
  if (!full) return;
  const sync = () => {
   const slug = new URLSearchParams(window.location.search).get('branch') || '';
   setSelectedBranch(branches.some(b => b.slug === slug) ? slug : '');
  };
  sync();
  window.addEventListener('popstate', sync);
  return () => window.removeEventListener('popstate', sync);
 }, [full]);
 const changeBranch = (slug: string) => {
  setSelectedBranch(slug);
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('branch', slug); else url.searchParams.delete('branch');
  window.history.replaceState(window.history.state, '', url);
 };
 const branchTreatments = treatmentsForBranch(selectedBranch);
 const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 const items = branchTreatments.filter(t => (category === 'All treatments' || t.category === category) && terms.every(term => `${t.name} ${t.category} ${t.description} ${aliases[t.slug] || ''}`.toLowerCase().includes(term)));
 const groups = treatmentCategories.map(group => ({ ...group, items: items.filter(t => t.category === group.name) })).filter(group => group.items.length > 0);

 return <div className="treatment-browser" data-treatment-branch={selectedBranch || 'all'}>
  <ThemeProvider theme={filterTheme}><div className="treatment-tools mui-treatment-tools">
   <div className="treatment-search"><TextField id={id+'-search'} fullWidth size="small" type="search" label="Search dental treatments" placeholder="Aligners, implants, cleaning…" value={query} onChange={event => setQuery(event.target.value)} slotProps={{input:{startAdornment:<InputAdornment position="start"><Search size={18} aria-hidden="true"/></InputAdornment>}}}/></div>
   {full && <div className="treatment-branch-filter"><TextField id={id+'-branch'} fullWidth select size="small" label="Filter by branch" value={selectedBranch} onChange={event=>changeBranch(event.target.value)} slotProps={{inputLabel:{shrink:true},select:{displayEmpty:true,MenuProps:{disableScrollLock:true}}}}><MenuItem value="">All network treatments</MenuItem>{branches.map(b=><MenuItem key={b.slug} value={b.slug}>{b.name} · {b.city}</MenuItem>)}</TextField></div>}
   {(query || full) && <span className="search-result-count" role="status">{items.length} {items.length === 1 ? 'treatment' : 'treatments'} found</span>}
  </div></ThemeProvider>
  {full && <>
   <p className="catalog-availability">This catalog brings together services across the network. Every treatment is not offered at every location. Choose a branch to see its listed services; call to confirm availability.</p>
   <div className="filter-tabs catalog-category-filters" role="group" aria-label="Filter treatments by category">
    {['All treatments', ...treatmentCategories.map(c => c.name)].map(name => <button key={name} onClick={() => setCategory(name)} aria-pressed={category === name} className={category === name ? 'active' : ''}>{name}</button>)}
   </div>
  </>}
  {items.length === 0 ? <div className="treatment-empty"><h3>No treatments found.</h3><p>Try another category or search term. You can also select all network treatments.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All treatments'); }}>Clear search & category</button></div>
   : full ? <div className="treatment-category-groups">{groups.map(group => <section className="treatment-category-group" key={group.name} aria-label={group.name}>
    <div className="treatment-category-heading"><h2>{group.name}</h2><p>{selectedBranch ? `Listed ${group.name.toLowerCase()} services at ${branches.find(b => b.slug === selectedBranch)?.name}.` : group.summary}</p></div>
    <div className="treatment-grid">{group.items.map(t => <TreatmentCard key={t.slug} treatment={t}/>)}</div>
   </section>)}</div>
   : query.trim() ? <div className="treatment-grid">{items.map(t => <TreatmentCard key={t.slug} treatment={t}/>)}</div>
   : <div className="service-rows">{[0,1].map(row => <InfiniteRail key={row} label={row===0?'Dental services upper row':'Dental services lower row'} className="services-rail" manualDrag direction={row===0?'left':'right'}><div className="services-track">{[false,true].map(duplicate=><div className="service-group" key={String(duplicate)} aria-hidden={duplicate||undefined}>{items.filter((_,index)=>index%2===row).map(t=><TreatmentCard key={t.slug} treatment={t} duplicate={duplicate}/>)}</div>)}</div></InfiniteRail>)}</div>}
 </div>;
}

