# Changing the Lara Smiles theme

The current theme is **Lara Rose**: berry pink, deep plum, blush and white, with richer pink, blue and mint gradient accents.

Open **`src/lib/brand-theme.ts`** to change the theme. This is the shared configuration for every page, the booking drawer and the MUI appointment form.

| Setting | Current value | What it changes |
| --- | --- | --- |
| `primary` | `#A53479` | Main buttons, links, selected filters and highlights |
| `primaryHover` | `#84255F` | Hover state for primary actions |
| `heading` | `#452539` | Heading text |
| `deep` | `#3F2134` | Top bar, footer and dark feature panels |
| `page` | `#FFF8FC` | Page background |
| `rose` | `#F9E8F1` | Pink section backgrounds |
| `roseStrong` | `#EECFDF` | Stronger pink accents and decorative details |
| `surface` | `#FFFFFF` | Cards and form surfaces |
| `ink`, `muted` | See configuration | Main and supporting text |
| `sky`, `mint` | See configuration | Supporting blue and green surfaces |
| `gradientRose`, `gradientSky`, `gradientMint` | See configuration | Optional stronger accents; current reviews use the lighter rose/sky/mint tokens |
| `controlBorder`, `focus` | See configuration | Input boundaries and keyboard focus |

1. Edit the existing color values using six-digit hex colors. Keep the property names.
2. Save the file. The local development preview updates automatically.
3. Check a light section, a dark section, the booking form and a phone-width layout.
4. Run the production build and publish again to update the hosted website. Saving a local file alone does not change the published site.

For a future full palette change, update the primary, hover, heading, deep, page, rose and text values together. The remaining values are in the same file. Shape settings control shared section, card and button corners.

`src/app/brand-theme.css` assigns these values to UI elements. Existing stylesheets reference generated CSS variables; they no longer need separate color edits. The variables render directly in the initial HTML, so the site needs no additional theme JavaScript or global client-side provider. The MUI form reads the same configuration.

Logo artwork and photographs retain their supplied image colors. The Google letter mark retains its brand colors; the WhatsApp contact button uses the shared whatsapp and whatsappHover colors. The current pairing is Manrope for headings and Comfortaa for supporting text, navigation, controls and the footer. Loading a different family requires updating the font links as well.

Core text/button color pairs were checked at a minimum of 4.5:1. Keyboard focus and input boundaries were checked at a minimum of 3:1. Recheck contrast when choosing a new palette.

Section labels use Comfortaa through `brandTheme.fonts.label` / `--theme-font-label`. Main headings use brandTheme.fonts.heading (Manrope); supporting text uses brandTheme.fonts.body (Comfortaa). Update the Google Fonts URL in `src/app/layout.tsx` alongside any new font-family choice.


Current surface overrides live in src/app/calm-refinements.css. Multicolour backgrounds are limited to light reviews. Neighbourhood and network intros are white; success stories and video moments share sky. The header uses deep like the footer, with white text scoped to the header. Photo fade masks are retained.
