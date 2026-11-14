export type MilestoneSymbol = 'origin' | 'network' | 'aligners' | 'digital' | 'feedback' | 'community' | 'identity';

const tooth = 'M21 16c-4-3-10-2-10 4 0 5 3 8 4 14 1 4 3 5 4 0l2-6c1-2 2-2 3 0l2 6c1 5 3 4 4 0 1-6 4-9 4-14 0-6-6-7-10-4';

/** Original line illustrations drawn for the brand milestone cards. */
export function MilestoneIcon({ kind }: { kind: MilestoneSymbol }) {
 return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
  {kind === 'origin' && <><path d="M24 40V22M24 27C11 27 8 19 9 12c10 0 15 5 15 15ZM24 21C24 10 31 6 39 7c0 9-5 15-15 14Z"/><path d="M14 41c4-4 16-4 20 0M15 18l9 9M32 13l-8 8"/></>}
  {kind === 'network' && <><path d="M9 32V22h11v10M6 35h17M29 18V8h11v10M26 21h17M29 38V28h11v10M26 41h17M20 26h4V14h5M24 26v8h5"/><path d="M13 26h3M33 12h3M33 32h3"/></>}
  {kind === 'aligners' && <><path d="M8 22c0-10 32-10 32 0v9c0 11-32 11-32 0v-9Z"/><path d="M8 23c8 7 24 7 32 0M14 19v9M21 17v13M28 17v13M35 19v9M12 35c8 4 16 4 24 0"/></>}
  {kind === 'digital' && <><path d="M6 16V8h8M34 8h8v8M42 32v8h-8M14 40H6v-8"/><path d={tooth} transform="translate(7 5) scale(.72)"/><path d="M11 24h26" strokeDasharray="2 4"/><path d="M10 44h28" opacity=".35"/></>}
  {kind === 'feedback' && <><path d="M11 8h26a5 5 0 0 1 5 5v17a5 5 0 0 1-5 5H23l-10 7v-7h-2a5 5 0 0 1-5-5V13a5 5 0 0 1 5-5Z"/><path d="M16 24c4 6 12 6 16 0M17 17h1M30 17h1"/></>}
  {kind === 'community' && <><circle cx="14" cy="14" r="5"/><circle cx="34" cy="14" r="5"/><path d="M4 34v-5a9 9 0 0 1 15-7M44 34v-5a9 9 0 0 0-15-7M24 39l-8-8c-6-6 3-13 8-6 5-7 14 0 8 6l-8 8Z"/></>}
  {kind === 'identity' && <><path d={tooth} transform="translate(-2 -3) scale(.9)"/><path d={tooth} transform="translate(13 9) scale(.9)"/><path d="M17 22c3-2 7-2 10 0"/></>}
 </svg>;
}
