import type { MetadataRoute } from 'next';
import { site,treatments } from '@/lib/content';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['', '/about','/treatments','/smile-gallery','/reviews','/branches','/book-appointment','/contact','/privacy-policy',...treatments.map(t=>'/treatments/'+t.slug)].map(path=>({url:site.url+path,changeFrequency:'monthly',priority:path===''?1:.7}))}
