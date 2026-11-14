import Image from 'next/image';

export function BrandLogo({ priority = false }: { priority?: boolean }) {
 return <span className="brand-logo-frame"><Image src="/images/lara-smiles-logo.png" alt="Lara Smiles — Dental cosmetics" width={150} height={150} className="brand-logo" priority={priority} sizes="(max-width: 760px) 175px, 235px" /></span>;
}
