'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, Phone, MapPin } from 'lucide-react';
const nav = [['Home', '/'], ['Our story', '/about'], ['Treatments', '/treatments'], ['Smile stories', '/smile-gallery'], ['Our clinics', '/branches']];
export function Header() {
 const [open, setOpen] = useState(false); const path = usePathname(); const toggle = useRef<HTMLButtonElement>(null);
 useEffect(() => { if (!open) return; const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [open]);
 return <><div className="topbar"><div className="container"><span><MapPin size={12} />Thoughtful dental care, here in Tiruppur</span><a href="tel:+917306565995"><Phone size={12} />+91 73065 65995</a></div></div><header className="header"><div className="container header-inner"><Link href="/" className="brand" aria-label="ARAL by Lara Smiles home">aral<span>BY LARA SMILES</span></Link><nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</Link>)}</nav><Link href="/book-appointment" className="header-book">Let’s talk smiles<ArrowUpRight size={16} /></Link><button ref={toggle} className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X /> : <Menu />}</button></div>{open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{[...nav, ['Book an appointment', '/book-appointment'], ['Contact us', '/contact']].map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16} /></Link>)}</nav>}</header></>;
}
