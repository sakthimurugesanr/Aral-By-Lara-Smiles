import Image from 'next/image';
import { serviceImages } from '@/lib/service-images';

export function TreatmentImage({ slug, className = '' }: { slug: string; className?: string }) {
 const asset=serviceImages[slug];
 return <Image src={asset.src} alt={asset.alt} width={960} height={600} className={`treatment-art service-photo ${className}`} sizes="(max-width: 760px) 85vw, (max-width: 1100px) 45vw, 32vw" />;
}
