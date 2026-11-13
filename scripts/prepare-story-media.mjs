import { readdir, mkdir, stat, writeFile, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import ffprobe from 'ffprobe-static';

await mkdir('public/images/comparison',{recursive:true});
for(const name of ['before','after']){
 await sharp(`src/Assets/${name}.jpg`).rotate().resize({width:781,height:540,fit:'cover',position:'centre',withoutEnlargement:true}).webp({quality:84}).toFile(`public/images/comparison/${name}.webp`);
}
await mkdir('public/videos',{recursive:true});
const files=await readdir('src/Assets/videos');
const definitions=[
 {prefix:'Every Smile',slug:'gentle-care',title:'Gentle care for little smiles',description:'A glimpse of children’s dental care.'},
 {prefix:'We are not',slug:'shared-smiles',title:'More than a smile',description:'Moments shared by the ARAL team.'},
 {prefix:'CAUTION',slug:'tooth-care',title:'A closer look at tooth extraction',description:'Dental procedure footage. Play when you’re ready.'},
];
const manifest=[];
for(const item of definitions){
 const filename=files.find(name=>name.startsWith(item.prefix));
 if(!filename)throw new Error(`Missing video: ${item.prefix}`);
 const input=`src/Assets/videos/${filename}`;
 const output=`public/videos/${item.slug}.mp4`;
 execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-i',input,'-map','0:v:0','-an','-sn','-dn','-map_metadata','-1','-vf','scale=w=640:h=1140:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24','-c:v','libx264','-preset','medium','-crf','27','-pix_fmt','yuv420p','-g','48','-movflags','+faststart','-threads','2',output],{stdio:'pipe'});
 const frame=`public/videos/${item.slug}-frame.png`;
 execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-ss','1','-i',output,'-frames:v','1',frame]);
 await sharp(frame).resize({width:480,withoutEnlargement:true}).webp({quality:78}).toFile(`public/videos/${item.slug}-poster.webp`);
 await unlink(frame);
 const info=JSON.parse(execFileSync(ffprobe.path,['-v','quiet','-show_streams','-show_format','-of','json',output],{encoding:'utf8'}));
 const video=info.streams.find(stream=>stream.codec_type==='video');
 if(info.streams.some(stream=>stream.codec_type==='audio'))throw new Error('Audio was not removed');
 const originalBytes=(await stat(input)).size;const bytes=(await stat(output)).size;
 manifest.push({slug:item.slug,title:item.title,description:item.description,src:`/videos/${item.slug}.mp4`,poster:`/videos/${item.slug}-poster.webp`,width:video.width,height:video.height,duration:Math.round(Number(info.format.duration)),bytes,originalBytes});
 console.log(`${item.slug}: ${video.width}x${video.height}, ${info.format.duration}s, ${Math.round(originalBytes/1024)} → ${Math.round(bytes/1024)} KB, audio removed`);
}
await writeFile('src/lib/story-videos.json',JSON.stringify(manifest,null,2)+'\n');
