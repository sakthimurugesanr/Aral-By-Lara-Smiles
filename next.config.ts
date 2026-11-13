import type { NextConfig } from 'next';
const config: NextConfig = {
  ...(process.env.SITES_EXPORT === 'true' ? { output: 'export' as const, distDir: 'out', trailingSlash: true } : {}),
  env: { NEXT_PUBLIC_PREVIEW_ONLY: process.env.SITES_EXPORT === 'true' ? 'true' : 'false' },
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'], unoptimized: process.env.SITES_EXPORT === 'true' },
  async headers() { return [{ source: '/:path*', headers: [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ] }]; },
};
export default config;
