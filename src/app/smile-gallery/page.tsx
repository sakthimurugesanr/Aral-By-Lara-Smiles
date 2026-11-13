import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { SmileGallery } from '@/components/gallery';
export const metadata:Metadata={title:'Smile Stories',description:'Explore our approach to personal smile journeys. Genuine, consented patient transformations will be published after clinic approval.',alternates:{canonical:'/smile-gallery'}};
export default function Gallery(){return <><PageIntro eyebrow="Real people. personal journeys." title={<>Every smile <em>has a story.</em></>} text="A space for real experiences, shared thoughtfully and with permission."/><section className="section"><div className="container"><SmileGallery/></div></section></>}
