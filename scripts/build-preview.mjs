import { rename, mkdir, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
const root = process.cwd();
const api = path.join(root, 'src/app/api/appointments/route.ts');
const held = path.join(root, 'src/app/api/appointments/route.preview-disabled');
await rename(api, held);
try {
 await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'build'], { stdio:'inherit', env:{...process.env,SITES_EXPORT:'true',NEXT_PUBLIC_CLINIC_APPROVED:'false',NEXT_PUBLIC_SITE_URL:'https://aral-lara-smiles-tiruppur.springynarwhal1.chatgpt.site'} });
  child.on('error', reject); child.on('exit', code => code===0?resolve():reject(new Error(`Preview build exited ${code}`)));
 });
 await access(path.join(root,'out/index.html'));
} finally { await rename(held, api); }
