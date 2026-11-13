# ARAL by LARA SMILES

A responsive Next.js App Router website for the clinic in Tiruppur. TypeScript, Tailwind CSS 4, Framer Motion, Lucide, React Hook Form and Zod.

## Run locally

Use Node.js 22.9 or later. From this directory:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. Production: `npm run build`, then `npm run start`. Type checking: `npm run typecheck`.

## Visual system

| Role | Colour |
| --- | --- |
| Navigation, headings and primary actions | Deep navy `#123047` |
| Links, emphasis and small icons | Muted teal `#257D79` |
| Main canvas | Warm ivory `#F8F6F0` |
| Cards | Paper `#FFFEFA` |
| Supporting panels | Soft sage `#E9EFEA` |
| Decorative accents | Champagne `#C5A46D` |
| Body text | Charcoal `#263A3C` |

Georgia gives headings an editorial character without an additional font download. Manrope is self-hosted as a 24 KB variable WOFF2 with font-display swap. Gold is decorative, never small text on white. Most hover transitions run for 250–300 ms. Section reveals use a one-time 650 ms easing. Desktop parallax has a maximum 36 px offset, uses passive scroll events and requestAnimationFrame, and stops processing when off screen. Reduced-motion preferences disable parallax, transitions and smooth scrolling. Mobile parallax is disabled.

## Editable content

`src/lib/content.ts` contains the branch, treatment, FAQ and doctor data. `src/app/globals.css` contains the design tokens, component styling and responsive breakpoints. The homepage is in `src/app/page.tsx`. Reusable components live in `src/components`.

No doctor credentials, ratings, testimonials, patient outcomes, equipment availability or clinic photographs have been fabricated. Review and gallery pages intentionally show polished empty states. Comparison sliders and review carousels should be enabled only when genuine approved content is supplied. The clinic must confirm whether Invisalign, iTero scanning and other listed services are available at each branch.

## Google Sheets integration

The full Next.js build submits to `POST /api/appointments`, validates on the server and forwards to the clinic's private Apps Script integration. An enquiry succeeds only after Apps Script acknowledges a sheet write. It never confirms an appointment automatically. No enquiry data is logged by the endpoint. Without credentials, it returns 503 and the form offers call and WhatsApp alternatives.

1. In the clinic's Google account, create a private Google Sheet. Do not make the sheet public.
2. Open Extensions → Apps Script and paste `scripts/google-sheets.gs`.
3. In Project settings → Script properties, set `SHEET_ID` to the sheet ID and `WEBHOOK_SECRET` to a long random secret.
4. Deploy as a Web app, executing as the clinic account, accessible to Anyone. The secret authenticates server requests; never share it in frontend code. Authorise only from the clinic's account. Copy the HTTPS `/exec` URL.
5. In `.env.local`, set `GOOGLE_SHEETS_WEBHOOK_URL` to that URL and `GOOGLE_SHEETS_WEBHOOK_SECRET` to the same secret. Restart the server. Use the same server-only variables in production.
6. Submit a clinic-controlled test enquiry, check the row in the Enquiries tab and the UI acknowledgement, then remove the test row. Verify the denied-consent, invalid-input and upstream-failure cases before going live.

The script serialises writes, escapes spreadsheet formulas and limits repeat submissions by hashed mobile number for 60 seconds. Add platform-level abuse protection if traffic requires it. This is not a patient-record system. Keep medical records out of the enquiry sheet, restrict access, and establish a clinic-approved retention policy.

## Deploy the full website to Vercel

Import this directory as a Next.js project, select the Node runtime, use `npm run build`, and set the four variables in `.env.example`. `NEXT_PUBLIC_SITE_URL` must be the actual HTTPS origin. After the clinic approves its content and privacy notice, set `NEXT_PUBLIC_CLINIC_APPROVED=true` and rebuild. This enables search indexing and the primary branch's Dentist structured data. The preview remains noindex by default. Next.js serves responsive AVIF/WebP images in the full server build.

## Private Sites design preview

`node scripts/build-preview.mjs` exports the frontend to `out/`. Next.js uses `.next` internally during export, so stop any running server before building a preview and rebuild the server afterwards. The script temporarily disables the server route file and restores it in a `finally` block. Do not run concurrently with another build. The Next.js server build and its `/api/appointments` handler remain the primary deliverable for Vercel. The static Sites preview has no server integration. Its online submit button is disabled, with working phone/WhatsApp links provided as alternatives. Never represent its appointment form as connected to Google Sheets.

## Publication content needed

Confirm all branch details, opening hours, exact Google Maps pins, clinic legal entity and privacy contact. Supply approved team portraits, qualifications, biographies, consented before/after photographs and accurate review text with a verified Google Business Profile URL. Replace stock images before a clinic-branded public launch. Finalise retention practices and approve the privacy policy. Only then enable indexing. No Lighthouse score is claimed without measurement.

## Assets and educational references

Illustrative photographs from Unsplash: `photo-1544005313-94ddf0286df2`, `photo-1629909613654-28e377c37b09`, `photo-1606811971618-4486d14f3f99`. Stock images do not depict the clinic, team or results. Manrope is distributed under the SIL Open Font License; see `public/fonts/OFL.txt`. Icons: Lucide (ISC).

General treatment copy was checked against https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-treatments/ and https://bos.org.uk/clear-aligners/. Clinical content requires review by the treating clinic and is not individual advice.
