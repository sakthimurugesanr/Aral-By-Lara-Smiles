import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { site } from '@/lib/content';
import './globals.css';
export const metadata: Metadata = {
 metadataBase: new URL(site.url), title: { default:'ARAL by LARA SMILES | Thoughtful Dental Care in Tiruppur', template:'%s | ARAL by LARA SMILES' }, description:'Discover personalised dental care, clear aligners, restorative and cosmetic dentistry at ARAL by LARA SMILES in Tiruppur. Enquire about your first visit.',
 openGraph: { type:'website',locale:'en_IN',siteName:site.name,title:'ARAL by LARA SMILES — A little care. A lot more confidence.',description:'Thoughtful dental care, here in Tiruppur.',images:[{url:'/images/clinic.webp',width:1100,height:733,alt:'Illustrative dental care setting'}] },
 robots:site.approved?{index:true,follow:true}:{index:false,follow:false},
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main">{children}</main><Footer /></body></html>;
}
