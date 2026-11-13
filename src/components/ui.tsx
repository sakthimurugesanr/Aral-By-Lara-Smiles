import Link from 'next/link';
import type { ReactNode } from 'react';
export function Button({ href, children, light = false, outline = false, className = '' }: { href: string; children: ReactNode; light?: boolean; outline?: boolean; className?: string }) {
 return <Link href={href} className={`button ${light ? 'button-light' : ''} ${outline ? 'button-outline' : ''} ${className}`}>{children}</Link>;
}
export function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: ReactNode; text?: string; light?: boolean }) {
 return <div className={`section-heading ${light ? 'light' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-description">{text}</p>}</div>;
}
export function PageIntro({ eyebrow, title, text, className = '' }: { eyebrow: string; title: ReactNode; text: string; className?: string }) {
 return <section className={`page-intro ${className}`}><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div></section>;
}
