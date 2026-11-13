import { mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';
// Read the same source filenames used by the typed frontend configuration.
const config = await readFile('src/lib/service-images.ts', 'utf8');
const entries = [...config.matchAll(/src:'([^']+)', alt:'[^']+', source:'([^']+)'/g)];
if(entries.length !== 12) throw new Error('Expected image mappings for all 12 treatments.');
await mkdir('public/images/services', { recursive:true });
let total = 0;
for(const [, destination, source] of entries) {
 const result = await sharp('src/Assets/'+source).rotate().resize({width:960,height:600,fit:'cover',position:'attention',withoutEnlargement:true}).webp({quality:82}).toFile('public'+destination);
 total += result.size;
}
const hero = await sharp('src/Assets/geralt-dentist-8729627_1920.jpg').rotate().resize({width:1800,withoutEnlargement:true}).webp({quality:83}).toFile('public/images/dental-hero.webp');
console.log(`Prepared 12 service images (${Math.round(total/1024)} KB total) and dental hero (${Math.round(hero.size/1024)} KB). Original files preserved.`);
