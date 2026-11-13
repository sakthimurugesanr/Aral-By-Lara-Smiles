import Image from 'next/image';

export function BrandLogo() {
  return <Image src="/images/aral-logo.png" alt="ARAL by Lara Smiles" width={299} height={168} className="brand-logo" priority sizes="(max-width: 760px) 135px, 180px" />;
}
