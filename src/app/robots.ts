import type { MetadataRoute } from 'next';
import {site} from '@/lib/content';
export const dynamic = 'force-static';
export default function robots():MetadataRoute.Robots{return {rules:site.approved?{userAgent:'*',allow:'/',disallow:'/api/'}:{userAgent:'*',disallow:'/'},sitemap:site.url+'/sitemap.xml'}}
