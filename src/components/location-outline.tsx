/** Original outline marker: a dental clinic pin with a tooth at its centre. */
export function LocationOutline({compact=false}:{compact?:boolean}){
 return <svg viewBox="0 0 64 72" fill="none" stroke="currentColor" strokeWidth={compact?2.8:1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
  <path d="M32 5C20 5 10 14 10 26c0 16 22 33 22 33s22-17 22-33C54 14 44 5 32 5Z"/>
  {compact?<circle cx="32" cy="26" r="7"/>:<><path d="M32 18c-5-4-12-1-11 6 1 6 3 12 6 12 2 0 2-7 5-9 3 2 3 9 5 9 3 0 5-6 6-12 1-7-6-10-11-6Z"/><path d="M20 58c-12 2-16 7-6 10 9 3 26 3 36 0 9-3 5-8-6-10" opacity=".55"/></>}
 </svg>;
}
