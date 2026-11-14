import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const definitions = [
 ['team-1.webp', 'Together, beyond the clinic', 'Group photograph at a professional event shared by Lara Smiles'],
 ['team-2.webp', 'A shared commitment', 'Lara Smiles team members at the clinic'],
 ['team-3.jpg', 'People behind the smiles', 'Clinic team holding presentation materials'],
 ['team-4.jpg', 'Moments of recognition', 'A team photograph with an award plaque'],
 ['SaveInta.com_447458197_18033121114959815_515384076296497457_n.jpg', 'Recognition, remembered', 'An award plaque in a photograph supplied by the clinic'],
 ['team-7.jpg', 'A moment to celebrate', 'An award presentation photograph supplied by Lara Smiles'],
 ['team-5.jpg', 'Connecting with our profession', 'Professional event photograph shared by the clinic'],
 ['team-6.jpg', 'Learning, together', 'A certificate presentation at a professional event'],
 ['team-9.webp', 'Shared professional moments', 'A second clinic-supplied certificate presentation photograph'],
 ['team-larawal.jpg', 'Growing as a team', 'A group photograph at a professional gathering'],
];
await mkdir('public/images/team-awards', { recursive: true });
const gallery = [];
for (const [filename, title, alt] of definitions) {
 const slug = filename.startsWith('SaveInta') ? 'award-plaque' : path.parse(filename).name;
 const input = `src/Assets/team/${filename}`;
 const info = await sharp(input).rotate().resize({ width: 800, height: 850, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/team-awards/${slug}.webp`);
 gallery.push({ slug, title, alt, src: `/images/team-awards/${slug}.webp`, width: info.width, height: info.height, bytes: info.size, originalBytes: (await stat(input)).size });
}
await writeFile('src/lib/team-awards.json', JSON.stringify(gallery, null, 2) + '\n');
const original = gallery.reduce((n, item) => n + item.originalBytes, 0), optimized = gallery.reduce((n, item) => n + item.bytes, 0);
console.log(`${gallery.length} photos: ${Math.round(original / 1024)} → ${Math.round(optimized / 1024)} KB (${Math.round((1 - optimized / original) * 100)}% smaller).`);
