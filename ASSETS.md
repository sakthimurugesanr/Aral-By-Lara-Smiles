# Image and illustration sources

Photos are illustrative stock images, not clinic patients, premises or treatment results.

| File | Source | Use |
| --- | --- | --- |
| `smile-banner.webp` | Lesly Juarez, [Unsplash photograph](https://unsplash.com/photos/long-black-haired-woman-smiling-close-up-photography-1AhGNGKuhR0), image `photo-1489278353717-f64c6ee8a4d2` | Smile journey header |
| `hero-woman.webp` | Unsplash image `photo-1517841905240-472988babdf9`, downloaded from images.unsplash.com | Smile story and consultation sections |
| `clinic.webp` | Unsplash image `photo-1629909613654-28e377c37b09` | Illustrative dental room |
| `care.webp` | Unsplash image `photo-1606811971618-4486d14f3f99` | Illustrative dental setting |

The photographs use the [Unsplash License](https://unsplash.com/license), which permits free commercial website use subject to its terms; they are not public-domain images. Source/license checked 13 November 2026. The clinic logo is the exact image supplied by the user and remains their asset.

The service illustrations and tooth line art in `src/components/treatment-art.tsx` are original, code-native SVG drawings created for this project. Those drawings are dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). They are conceptual educational graphics, not anatomical diagrams or treatment outcomes. There is no external raster dependency for any of the twelve service images.

Unused original source JPGs are retained for editing. The website serves compressed WebP versions.

## User-supplied clinic assets

The user supplied `src/Assets` and requested these files be used by service name. Their originals are preserved. `src/lib/service-images.ts` records all twelve filename-to-service mappings. `scripts/prepare-clinic-assets.mjs` creates 960×600 WebP copies under `public/images/services/` and an optimised hero from `geralt-dentist-8729627_1920.jpg`. Supplied photographs retain their source licences; the CC0 dedication above applies only to our original SVG drawings. The previous SVG illustrations have been replaced with these supplied photos in service cards, process pages and smile journeys.

The incisor, canine, premolar and molar drawings in src/components/tooth-journey.tsx are also original SVG artwork dedicated under CC0 1.0. They depict conceptual concerns and restorations for an educational scroll animation; they are not patient images or treatment guarantees.

The conversation banner uses the user-supplied `src/Assets/close-up-smile.jpg`, compressed to `public/images/close-up-smile.webp`. Its source licence remains with the supplied asset.

## Supplied comparison photographs and films

The before/after slider uses the supplied `src/Assets/before.jpg` and `after.jpg`. They are resized to a common 781×540 frame and encoded as WebP; no clinical result or treatment type is inferred. The three films come from `src/Assets/videos`. `scripts/prepare-story-media.mjs` produces 640×1138, 24fps H.264 MP4s with fast-start metadata and physically removes all audio streams. WebP posters are generated from each film. Source rights and permissions remain with the supplied material. Originals stay untouched and untracked.

The hero uses the supplied `src/Assets/bg-image.jpg`, cropped to a 1800×1150 WebP at `public/images/hero-background-fade.webp`, alongside the existing dental hero. The crop focuses on the dental examination and excludes unrelated embroidered text. Original file is preserved; source rights remain with the supplied photograph.

The Welcome image is the supplied `src/Assets/infrasstructure.jpg`, optimized to `public/images/infrastructure.webp`. The additional hero photograph is `src/Assets/bg-image-2.jpg`, identical to the attached clipboard photograph, optimized to `public/images/hero-care.webp`. These photographs retain the source rights of the supplied material.

The three-tooth aligner illustration, including its smiling centre tooth, is original SVG artwork in `src/components/treatment-art.tsx` and is included in that file’s CC0 dedication. It uses no raster images or external requests.

## Lara Smiles logo update

`public/images/lara-smiles-logo.png` is the exact, unmodified 150 × 150 PNG supplied by the user for the header, footer and site icon. The CSS frame hides excess outer black space while preserving all visible lettering. No generated artwork or third-party logo is used.
