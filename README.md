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
| Navigation, headings and primary actions | Deep plum `#442435` |
| Links, emphasis and small icons | Rose `#9C4167` |
| Main canvas | Warm white `#FFF9FB` |
| Cards | White `#FFFFFF` |
| Supporting panels | Blush pink `#F9EAF0` |
| Decorative accents | Champagne `#C5A46D` |
| Body text | Plum charcoal `#412E37` |

Comfortaa is used for headings and Nunito for body text, using the requested Google Fonts stylesheet with preconnect hints and font-display swap. Main sections have 32 px rounded borders on desktop and 24 px on mobile. Section labels use sentence case without decorative dots or tracked capitals. Gold is decorative, never small text on white. Most hover transitions run for 250–300 ms. Section reveals use a one-time 650 ms easing. Desktop parallax has a maximum 36 px offset, uses passive scroll events and requestAnimationFrame, and stops processing when off screen. Reduced-motion preferences disable parallax, transitions and smooth scrolling. Mobile parallax is disabled.

## Editable content

`src/lib/content.ts` contains the branch, treatment, FAQ and doctor data. `src/app/globals.css` contains the design tokens, component styling and responsive breakpoints. The homepage is in `src/app/page.tsx`. Reusable components live in `src/components`.

No doctor credentials, ratings, patient outcomes, equipment availability or clinic photographs have been fabricated. Nine Google reviews supplied by the clinic are stored in `src/lib/reviews.ts`; original wording is retained and incomplete reviews are presented as marked excerpts. The gallery page retains an empty state until consented images are supplied. Comparison sliders and review carousels should be enabled only when genuine approved content is supplied. The clinic must confirm whether Invisalign, iTero scanning and other listed services are available at each branch.

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

Illustrative photographs from Unsplash: `photo-1544005313-94ddf0286df2`, `photo-1629909613654-28e377c37b09`, `photo-1606811971618-4486d14f3f99`. Stock images do not depict the clinic, team or results. Comfortaa and Nunito are loaded using the Google Fonts stylesheet supplied by the user. The supplied ARAL logo is used unchanged in the header, footer and welcome section. Icons: Lucide (ISC).

General treatment copy was checked against https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-treatments/ and https://bos.org.uk/clear-aligners/. Clinical content requires review by the treating clinic and is not individual advice.

## Enhanced visual system

Sky blue `#EAF4FB` and mint `#EDF5EF` complement the rose brand. The footer and top bar share plum `#6D3450` with light, readable text. The original service photographs remain configured in `src/lib/service-images.ts` for later reuse; current treatment lists and detail pages use text. Treatment process copy is in `src/lib/treatment-details.ts`. Run `node scripts/prepare-clinic-assets.mjs` after replacing source files in `src/Assets`. The smile journey directory filters real care pathways rather than showing fabricated before/after results. Image sources and licensing are recorded in `ASSETS.md`.

The homepage services loop horizontally at a gentle 22 pixels per second; all 35 treatment entries are included. The treatment directory retains a filterable grid. Google-style review cards scroll at 15 pixels per second. Both rails pause on hover, keyboard focus, touch interaction, an accessibility pause button, reduced-motion settings, off-screen visibility or a background tab. The accessibility button is hidden until focused, so there is no visible review toolbar. Duplicated cards are hidden from accessibility APIs. Every section has a once-only 1-second entrance; desktop smile photographs have bounded parallax, disabled on mobile and for reduced motion. The hero uses the supplied dental consultation image as a full-width background behind the text, with a responsive contrast overlay and no separate right-hand image panel.

The infinite rails use native scroll positions, so service links remain clickable and keyboard scrolling works normally. Motion pauses while off screen, when the tab is hidden, on hover/focus, on interaction or when reduced motion is requested.

Original files in `src/Assets` remain local and are excluded from Git because of their size. Optimised WebP copies are included in the repository and published site; no original uploads are needed to run the website. Reprocessing source photos requires the local Assets directory.

## Booking drawer and UI components

The desktop/tablet right-side booking tab opens a shadcn-style Radix Sheet with focus trapping, Escape dismissal and focus restoration. MUI TextField, Select, Checkbox and helper text are connected to the existing React Hook Form/Zod schema. The booking page and drawer reuse `AppointmentForm`; the MUI form bundle loads on demand when the drawer is opened. Fields and helper text have per-instance IDs. The drawer and form provide direct phone actions. No appointment is confirmed automatically.

Local shadcn-style component sources live in `src/components/ui` and follow the MIT-licensed Radix composition from shadcn/ui. MUI dropdown menus stay within the drawer to preserve focus handling. Clinic selection can open the same form with a branch preselected.

The treatment search supports titles, categories and common terms including kids, RCT, invisible aligners and dental caps. Search results use a stable grid; clearing the query restores the full service loop. The clinics directory presents selectable locations, a contextual map search, direct phone links and branch-specific booking. Homepage review previews are compact; full review wording remains on the reviews page.

## Reversible tooth-care scene

The homepage tooth-care section uses lazily loaded GSAP ScrollTrigger with a scrubbed, labelled timeline. Viewports with sufficient height pin the fitted panel (1200px of scroll on desktop, 950px on mobile). The transformation finishes around halfway, leaving a visible final-state hold before release. Very short viewports use manual controls. Scrolling back reverses the illustration. Reduced-motion visitors receive two explicit state buttons instead of scroll animation. The scan line and progress bar are intentionally absent; the three labelled stages highlight the current phase. MatchMedia cleanup removes pinning and animations when breakpoints change or the component unmounts. The four original SVGs are educational illustrations, not clinical results. Clinical context: https://www.nhs.uk/conditions/tooth-decay/ .

## Touch controls and story media

All three tooth-care stages are accessible buttons. On fitted pinned layouts they smoothly move to the matching scroll position; reduced-motion and short-screen layouts animate the illustration directly (instantly for reduced motion).

The before/after slider supports dragging, touch, native range keyboard controls and Before/Compare/After presets. Both compressed WebP photographs load lazily. The three video cards initially render only lazy-loaded posters. Video elements and MP4 sources are mounted on explicit Play or mouse hover (fine-pointer devices without reduced motion); controls are native, muted and inline. Offscreen/hidden videos pause, and starting one pauses the others. No video downloads occur before pointer interaction or explicit Play. Hover previews pause on pointer leave, while touch devices retain native tap-to-play controls. Audio tracks are removed from exported files.

To reprocess local media after replacing originals, run `node scripts/prepare-story-media.mjs` (requires the development ffmpeg-static and ffprobe-static packages). The generated JSON records dimensions, duration and file sizes.

## Compact layouts and hero fades

Headings use Manrope, with Nunito for body text. The comparison section sits directly before Clear Aligners. Treatment, clinician, clinic, review and video cards use tighter spacing; films become a horizontally scrollable row on phones. The Our Story narrative uses a responsive text/photo grid, and FAQs use two independent columns of native disclosure cards on desktop. Footer divider borders are removed.

The hero cycles through eight supplied headlines with blur/fade transitions, synchronized to a three-photo background sequence every seven seconds. Backgrounds crossfade over 1.5 seconds. Secondary photos load after initial rendering. A shared pause button controls both text and imagery; rotation stops offscreen, when the tab is hidden, or for reduced-motion preferences. The headline reserves vertical space to keep actions stable between quotes.

The Welcome section now follows the services rail and uses the supplied infrastructure photograph. homepage team image panels are 235px on desktop and 165px on mobile. Desktop film frames are 430px high, while the compact mobile film row remains unchanged. FAQ background is light blue.

## Connected ARAL approach

The four care principles form an alternating left/right desktop path, with bounded horizontal and vertical parallax. A measured SVG curve connects the real dot positions; GSAP draws its normalized stroke continuously and lights the dots in order. Scrolling back reverses the drawing and card movement. Mobile uses a left-hand path beside a single column of cards. Reduced-motion mode shows a complete static path. The SVG is decorative; all four principles remain a semantic list. No images or additional dependencies are required. Setup is deferred until the section approaches the viewport, and matchMedia/ResizeObserver cleanup handles unmounts and breakpoint changes.

The upstream tooth pin has refresh priority so downstream triggers use its final spacing. Opening an anchor below that pin preserves the requested destination after lazy initialization unless the visitor has begun scrolling manually.

## Section transitions and final alignment

Section entrances animate the inner content with a gentle 700ms mobile / 850ms desktop fade and 12–16px rise. Native IntersectionObserver and Web Animations keep the page visible before JavaScript and cancel active animations on navigation or reduced-motion changes. Dedicated GSAP scroll scenes retain their own animation logic. Inner Reveal blocks use opacity only to avoid compounded movement.

The privacy page heading and body share the same left edge. The comparison section is light blue. Team image panels are 285px on desktop and 215px on mobile (195px on the narrowest screens). The aligner illustration is an original, responsive three-tooth SVG with a smiling centre tooth.

## Manual service sliding and contact controls

The treatment rail supports mouse/pen dragging, native touch swiping and keyboard Arrow/Home/End controls. Manual interaction pauses automatic movement; a visible control can resume it. Crossing the mouse drag threshold captures the pointer and suppresses the resulting click, while ordinary treatment clicks still navigate normally. Mouse dragging wraps across the duplicated service groups. The reviews rail keeps its existing behaviour.

Mobile hides the header booking CTA and right-edge booking/contact tabs; bottom contact actions stay available. Desktop and tablet show a separate circular telephone link above WhatsApp. The Welcome photo has no logo/tag overlay and is the only image with square corners. It uses a responsive left-to-right entrance, with a static reduced-motion presentation. Its previous vertical image transform is removed.

## Branch data and service availability

Eight branch records in `src/lib/branches.ts` use the business information supplied for this update. Addresses, telephone links, team notes, source links and branch-specific treatment IDs share one data model. Ratings are labelled supplied snapshots; unconfirmed teams and the incomplete Bengaluru street address remain explicit. The directory changes its service list on branch selection; the treatment directory supports `?branch=slug`, search and category filters. All 35 treatment entries use text without photographs. Existing optimised image assets are retained for future use.

The booking form filters treatment choices by clinic and resets an unsupported choice to consultation when the clinic changes. The shared Zod schema rejects unsupported branch/treatment combinations. All branches allow a general consultation. Supplied treatment lists are not real-time availability; visitors are asked to confirm with the clinic. Maps load only after an explicit request. Brand history is marked reported where supplied and has not been independently verified.
