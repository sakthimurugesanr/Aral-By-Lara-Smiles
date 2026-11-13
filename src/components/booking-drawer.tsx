'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';

const AppointmentForm=dynamic(()=>import('./appointment-form').then(module=>module.AppointmentForm),{loading:()=> <div className="form-loading" role="status">Preparing your appointment form…</div>});
export function BookingDrawer(){
 const [open,setOpen]=useState(false);const [branch,setBranch]=useState('');
 useEffect(()=>{const show=(event:Event)=>{setBranch((event as CustomEvent<{branch?:string}>).detail?.branch||'');setOpen(true)};window.addEventListener('aral:book',show);return()=>window.removeEventListener('aral:book',show)},[]);
 return <Sheet open={open} onOpenChange={setOpen}><aside className="booking-dock" aria-label="Book or call the clinic"><SheetTrigger asChild><Button className="booking-tab">Book appointment</Button></SheetTrigger><a className="booking-phone" href="tel:+917306565995" aria-label="Call ARAL on +91 73065 65995"><Phone size={16}/><span>Call</span></a></aside><SheetContent><SheetHeader><p className="eyebrow">A visit, at your pace</p><SheetTitle>Let’s plan your visit.</SheetTitle><SheetDescription>Choose your clinic and preferred time. Our team will contact you to confirm availability.</SheetDescription><a className="drawer-call" href="tel:+917306565995"><Phone size={15}/> Prefer to call? +91 73065 65995</a></SheetHeader><div className="drawer-form-wrap">{open&&<AppointmentForm branch={branch} compact/>}</div></SheetContent></Sheet>;
}
