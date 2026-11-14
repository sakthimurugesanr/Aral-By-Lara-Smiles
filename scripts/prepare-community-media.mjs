import { readdir, mkdir, stat, writeFile, unlink } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import ffprobe from 'ffprobe-static';

const run = promisify(execFile);
await mkdir('public/images/success-stories', { recursive: true });
await mkdir('public/images/team', { recursive: true });
await mkdir('public/videos/social', { recursive: true });
const stories = [];
for (const filename of (await readdir('src/Assets/past-success')).sort()) {
 if (!/\.(jpe?g|png|webp)$/i.test(filename)) continue;
 const slug = path.parse(filename).name;
 const input = `src/Assets/past-success/${filename}`;
 const output = `public/images/success-stories/${slug}.webp`;
 const info = await sharp(input).rotate().resize({ width: 640, height: 800, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
 stories.push({ slug, src: `/images/success-stories/${slug}.webp`, width: info.width, height: info.height, bytes: info.size, originalBytes: (await stat(input)).size, alt: 'A clinic-shared moment with the Lara Smiles community' });
}
await sharp('src/Assets/ceo-lara-smiles.jpg').rotate().resize({ width: 600, withoutEnlargement: true }).webp({ quality: 85 }).toFile('public/images/team/abhishikth-suresh.webp');
await writeFile('src/lib/success-stories.json', JSON.stringify(stories, null, 2) + '\n');
console.log(`Prepared ${stories.length} success photographs and the supplied CEO portrait without enlarging originals.`);
const videos = [];
for (const [index, filename] of (await readdir('src/Assets/social-media')).filter(name => /\.mp4$/i.test(name)).sort().entries()) {
 const slug = `community-film-${index + 1}`;
 const input = `src/Assets/social-media/${filename}`;
 const output = `public/videos/social/${slug}.mp4`;
 await run(ffmpeg, ['-hide_banner','-loglevel','error','-y','-i',input,'-map','0:v:0','-an','-sn','-dn','-map_metadata','-1','-vf','scale=w=480:h=854:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24','-c:v','libx264','-preset','fast','-crf','28','-pix_fmt','yuv420p','-g','48','-movflags','+faststart','-threads','2',output]);
 const frame = `public/videos/social/${slug}-frame.png`;
 await run(ffmpeg, ['-hide_banner','-loglevel','error','-y','-ss','1','-i',output,'-frames:v','1',frame]);
 await sharp(frame).resize({ width: 360, withoutEnlargement: true }).webp({ quality: 76 }).toFile(`public/videos/social/${slug}-poster.webp`);
 await unlink(frame);
 const { stdout } = await run(ffprobe.path, ['-v','quiet','-show_streams','-show_format','-of','json',output]);
 const info = JSON.parse(stdout), stream = info.streams.find(item => item.codec_type === 'video');
 if (info.streams.some(item => item.codec_type === 'audio')) throw new Error(`Unexpected audio: ${slug}`);
 const bytes = (await stat(output)).size, originalBytes = (await stat(input)).size;
 videos.push({ slug, title: ['At the clinic','Sharing a smile','An aligner moment','A conversation about care'][index], description: 'A film supplied by Lara Smiles. Play to watch without sound.', src: `/videos/social/${slug}.mp4`, poster: `/videos/social/${slug}-poster.webp`, width: stream.width, height: stream.height, duration: Math.round(Number(info.format.duration)), bytes, originalBytes });
 console.log(`${slug}: ${Math.round(originalBytes/1024)} → ${Math.round(bytes/1024)} KB; no audio track.`);
}
await writeFile('src/lib/social-videos.json', JSON.stringify(videos, null, 2) + '\n');
