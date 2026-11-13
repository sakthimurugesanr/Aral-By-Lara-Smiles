import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionMotion } from '@/components/motion';
import { BookingDrawer } from '@/components/booking-drawer';
import { site } from '@/lib/content';
import './globals.css';
import './rose-theme.css';
import './rounded-theme.css';
import './enhanced-theme.css';
import './asset-theme.css';
import './refinements.css';
import './tooth-journey.css';
export const metadata: Metadata = {
 icons: { icon: '/images/aral-logo.png', apple: '/images/aral-logo.png' },
 metadataBase: new URL(site.url), title: { default:'ARAL by LARA SMILES | Thoughtful Dental Care in Tiruppur', template:'%s | ARAL by LARA SMILES' }, description:'Discover personalised dental care, clear aligners, restorative and cosmetic dentistry at ARAL by LARA SMILES in Tiruppur. Enquire about your first visit.',
 openGraph: { type:'website',locale:'en_IN',siteName:site.name,title:'ARAL by LARA SMILES — A little care. A lot more confidence.',description:'Thoughtful dental care, here in Tiruppur.',images:[{url:'/images/clinic.webp',width:1100,height:733,alt:'Illustrative dental care setting'}] },
 robots:site.approved?{index:true,follow:true}:{index:false,follow:false},
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" /></head><body><a href="#main" className="skip-link">Skip to content</a><Header /><SectionMotion /><main id="main">{children}</main><Footer /><BookingDrawer /></body></html>;
}
