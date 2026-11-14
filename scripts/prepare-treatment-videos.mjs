import { readdir, mkdir, stat, writeFile, unlink } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import ffprobe from 'ffprobe-static';

const run = promisify(execFile);
const titles = ['A closer look at care', 'In the treatment room', 'A visit, thoughtfully planned', 'Care in practice', 'Everyday dental care'];
await mkdir('public/videos/treatments', { recursive: true });
const videos = [];
for (const [index, filename] of (await readdir('src/Assets/tratment')).filter(name => /\.mp4$/i.test(name)).sort().entries()) {
 const slug = `treatment-film-${index + 1}`;
 const input = `src/Assets/tratment/${filename}`, output = `public/videos/treatments/${slug}.mp4`;
 await run(ffmpeg, ['-hide_banner','-loglevel','error','-y','-i',input,'-map','0:v:0','-an','-sn','-dn','-map_metadata','-1','-vf','scale=w=480:h=854:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24','-c:v','libx264','-preset','fast','-crf','28','-pix_fmt','yuv420p','-g','48','-movflags','+faststart','-threads','2',output]);
 const frame = `public/videos/treatments/${slug}-frame.png`;
 await run(ffmpeg, ['-hide_banner','-loglevel','error','-y','-ss','1','-i',output,'-frames:v','1',frame]);
 await sharp(frame).resize({ width: 360, withoutEnlargement: true }).webp({ quality: 76 }).toFile(`public/videos/treatments/${slug}-poster.webp`);
 await unlink(frame);
 const { stdout } = await run(ffprobe.path, ['-v','quiet','-show_streams','-show_format','-of','json',output]);
 const info = JSON.parse(stdout), stream = info.streams.find(item => item.codec_type === 'video');
 if (info.streams.some(item => item.codec_type === 'audio')) throw new Error(`Unexpected audio: ${slug}`);
 const bytes = (await stat(output)).size, originalBytes = (await stat(input)).size;
 videos.push({ slug, title: titles[index] || 'A moment of dental care', description: 'Clinic-shared treatment footage. Watch when you feel comfortable.', src: `/videos/treatments/${slug}.mp4`, poster: `/videos/treatments/${slug}-poster.webp`, width: stream.width, height: stream.height, duration: Math.round(Number(info.format.duration)), bytes, originalBytes });
 console.log(`${slug}: ${Math.round(originalBytes / 1024)} → ${Math.round(bytes / 1024)} KB; no audio.`);
}
await writeFile('src/lib/treatment-videos.json', JSON.stringify(videos, null, 2) + '\n');
