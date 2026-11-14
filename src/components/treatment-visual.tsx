import Image from 'next/image';
import { serviceImages } from '@/lib/service-images';
import { TreatmentArt } from './treatment-art';
import { MilestoneIcon } from './milestone-icon';

const imageAliases: Record<string,string> = {
 'invisalign-go':'clear-aligners', 'braces-adjustment':'braces', 'braces-removal':'braces',
 'dental-crowns':'crowns-bridges-dentures', 'tooth-extractions':'wisdom-teeth',
 'pediatric-cavity-care':'pediatric-dentistry',
};
const illustrations: Record<string,string> = {
 'Orthodontics':'clear-aligners', 'Cosmetic dentistry':'smile-designing',
 'Restorative dentistry':'crowns-bridges-dentures', 'Endodontics':'root-canal',
 'Implant dentistry':'dental-implants', 'Prosthodontics':'crowns-bridges-dentures',
 'Oral surgery':'wisdom-teeth', 'Preventive dentistry':'gum-care',
 'Pediatric dentistry':'pediatric-dentistry', 'Digital dentistry':'smile-designing', 'Other services':'emergency-care',
};

export function TreatmentVisual({slug,name,category,detail=false}:{slug:string;name:string;category:string;detail?:boolean}) {
 const image=serviceImages[slug]||serviceImages[imageAliases[slug]];
 return <div className={`treatment-media ${detail?'treatment-detail-media':''}`} data-media-kind={image?'photo':'illustration'}>
  {image?<Image src={image.src} alt={image.alt} fill sizes={detail?'(max-width:760px) 90vw, 65vw':'(max-width:760px) 85vw, 380px'} loading="lazy" decoding="async"/>:category==='Digital dentistry'?<div className="service-fallback-symbol" role="img" aria-label="Digital dental scanning illustration"><MilestoneIcon kind="digital"/></div>:<TreatmentArt slug={illustrations[category]||'smile-designing'} className="service-placeholder-art"/>}
  {detail&&<span className="treatment-media-note">{image?'Illustrative treatment image':'Treatment illustration'} · {name}</span>}
 </div>;
}
