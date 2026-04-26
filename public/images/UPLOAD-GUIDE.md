# Image upload guide — Three Ponds Estate

This folder is where you drop your own photography. Every subfolder here
corresponds to a section of the site that currently uses placeholder
(Unsplash) imagery. Once you've added your own photos, tell Claude
**"I've uploaded the [section] images"** and the code will be rewired
to point at your files instead of the placeholders.

---

## Folder map

| Folder | What goes there |
|---|---|
| `hero/` | The homepage hero photo (already wired — `hero-2.jpg`). |
| `logo/` | Brand logos in white & black versions (already wired). |
| `pods/the-ophir/` | Cover + 4 gallery shots for The Ophir. |
| `pods/the-felix/` | Cover + 4 gallery shots for The Felix. |
| `pods/the-uphaz/` | Cover + 4 gallery shots for The Uphaz. |
| `story/` | Landscape / paddock photography for the "Our Story" block (homepage) and the dedicated `/story` page. |
| `cta/` | Ambient image behind the homepage "Book direct" panel. |
| `explore/` | Four region photos for the `/explore` page (Aviation Museum, Lake Centenary, Bundawarrah Centre, Canola Trail). |

Each folder has its own `README.md` with the exact filenames the code
expects.

---

## Recommended specs

- Format: **JPG** preferred (PNG only for logos/transparency).
- Long edge: **2400px** is the sweet spot. Next.js will auto-generate
  smaller responsive variants from this.
- Quality: **80–85%** export quality. Anything higher is wasted bytes.
- Colour profile: **sRGB**.
- Avoid heavy text overlay or watermarks — the design relies on clean
  photographs the typography can sit on top of.

---

## When ready to wire up

Once a folder is filled, tell Claude which one(s) you've completed and
the references will be swapped from Unsplash URLs to local paths in:
- `lib/pods.ts` — for pod imagery
- `components/Story.tsx` & `app/story/page.tsx` — for story imagery
- `components/CTA.tsx` — for the homepage CTA backdrop
- `app/explore/page.tsx` — for the region images
