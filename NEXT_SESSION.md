# Next Session — Three Ponds Estate

> Living handoff doc. Read this first at the start of any new Cowork thread.
> Update the "Status" and "Open Threads" sections as work progresses; the
> rest of the doc is fairly stable.

---

## Project

Three Ponds Estate — boutique accommodation site for a three-pod property
in Temora, NSW. Live at `three-ponds-estate.vercel.app`; the production
domain `threepondsestate.com.au` is not yet pointed at Vercel.

## Stack & Conventions

- **Next.js 16** (App Router), **React 19**, **Tailwind v4** with `@theme`
  and `@custom-variant`.
- **Motion library:** `motion/react` (NOT `framer-motion`). Don't import
  from `framer-motion` — it's not installed.
- **Package manager:** **pnpm is mandatory.** Never run `npm` or `yarn`.
  See `CLAUDE.md`.
- **Design tokens:** all colours go through `globals.css` tokens
  (`text-corten`, `bg-parchment`, `text-charcoal`, etc.). Never use raw
  hex codes in components — that breaks dark mode. Tailwind `dark:`
  variant works via the `@custom-variant dark` declaration in
  `globals.css`.
- **Booking integration:** SiteMinder / TheBookingButton embed widget
  (`channelcode=threepondsestate`, region APAC). Loaded via JS in
  `app/layout.tsx`. The single modal lives in
  `components/booking/BookingModal.tsx`.
- **Composition pattern:** booking has a Provider, context, and four
  explicit trigger variants (NavTrigger, PrimaryTrigger, QuietTrigger,
  MobileTrigger). All trigger the same modal.

## How code reaches production

All pushes happen from the **host Terminal**, not the Cowork sandbox.
The sandbox has no pnpm network access and may have stale `.git/index.lock`
files. Standard flow:

```
cd /Users/callumbett/Documents/three-ponds-estate
rm -f .git/index.lock              # clear stale lock if needed
git add <files>
git commit -m "..."
git push
```

Vercel auto-deploys from `main`. **zsh treats `[brackets]` as globs** —
always quote paths containing them, e.g. `"app/stay/[slug]/page.tsx"`.

## Current Status (May 2026)

**Live and working:**
- Editorial hero, stats strip, three-pod section, reviews aggregator,
  story, CTA on homepage.
- `/stay`, `/stay/[slug]`, `/explore`, `/story`, `/contact`, `/faq`,
  `/privacy`, `/cookies`.
- Light/dark mode toggle with curtain transition and FOUC prevention.
- SiteMinder embed integration — opens cleanly, books go through.
- Mobile booking modal: no header bar, floating ✕ close button,
  `overscroll-contain` + `touch-pan-y` for jitter prevention.
- Pod-specific booking attribute (`data-query-room_type`) is being
  applied correctly — but see Open Threads for why it doesn't yet
  filter the display.

**Recent commits worth knowing about:**
- `890c03c` Pod-specific booking + rename junee licorice photo
- `9cfe96a` Pod-specific booking: pass room_type filter to SiteMinder embed
- `e81ea68` / `169e333` Four explore page photos added
- `e4bf69c` Update guest review count in reviews.tsx
- `b8349f5` Booking modal: lock horizontal drag on mobile
- `4f00911` Booking modal: mobile header → floating close, overscroll-contain
- `023ab73` Fix triggers: wrap open() to accept optional filter prop
- `c2c4c0e` Dark-mode logo, hero polish, archway stay cards, etc.

## Open Threads

### 1. SiteMinder support — pod-specific filtering not filtering display

**Status:** Awaiting SiteMinder reply. Our wrapper correctly passes
`?room_type=109124` to their iframe (verified in DevTools), but the
widget still shows all three pods. Sent support message asking whether
`room_type` is a display filter or just a deep-link parameter, and
whether there's a different parameter to restrict the displayed rooms.

**Room-type IDs already in `lib/pods.ts`:**
- The Ophir: 109125
- The Felix: 109124
- The Uphaz: 109123

**Reviewed against the SiteMinder integration PDF (May 16 2026):**
The spec confirms our attribute, value type, and embed wiring are all
exactly right per the doc. The doc is explicit that
`data-query-room_type` on an `embed` widget should restrict the
displayed inventory (and surface a "Show all rates" opt-out below the
rates) — so either the embed running for our property doesn't honour
that on this widget type, or there's something specific to our config
we haven't found.

**One additional path tried client-side (May 16 2026):** the doc says
the embed widget *also* reads recognised query parameters from the
**parent page URL** (page 10). We now push `?room_type=<id>` onto the
page URL via `history.replaceState` when the modal opens with a filter,
and restore on close. This is a no-history, no-navigation change that
exercises the second input path the doc calls out.

**Result (May 16 2026):** display still shows all three pods. Both
input paths the integration doc describes — the `data-query-room_type`
attribute on the embed div, and the `room_type` query param on the
parent page URL — are now being supplied, and the widget is ignoring
both for display-filtering purposes. The issue is conclusively on
SiteMinder's side. We've done everything our integration spec asks
of us. **Sit tight for the support reply.** When it lands, it's a
small change either to the attribute name or to the room-type IDs.

**Worth checking ourselves once, in a fresh browser tab:**
`https://book-directonline.com/properties/threepondsestate?room_type=109124`.
If their standalone booking engine also fails to filter at that URL,
the back-office room-type IDs are suspect; that's a quick thing to
mention in the support thread.

**When SiteMinder replies:** if the right parameter is different (e.g.
`data-only_room_type`), it's a one-line change in
`components/booking/BookingModal.tsx` — rename `"data-query-room_type"`
to whatever they say (and update the parent-URL push to match).

### 2. SiteMinder support — mobile horizontal drag

**Status:** Confirmed via DevTools test that the drag happens *inside*
their iframe, not in our wrapper. CSS on our parent can't reach into
cross-origin iframes. Sent support message asking them to fix the
gesture handling (likely an over-eager carousel swipe handler grabbing
horizontal touches outside the carousel area).

### 3. SiteMinder support — Select / Book two-click flow

Their widget requires a "Select" tap and then a "Book" tap on mobile.
Asked support whether this can be one tap. Likely a platform limitation
but worth confirming.

### 4. Domain not yet live

`threepondsestate.com.au` needs DNS pointed at Vercel. User action,
instructions previously provided. Until then, site lives at
`three-ponds-estate.vercel.app`.

### 5. SEO — LodgingBusiness JSON-LD + H1 keyword strengthening

Deferred until the domain is live. Not urgent.

### 5a. Core Web Vitals — CLS work (May 16 2026)

Vercel Speed Insights showed CLS = 0.11 at P75 (just over the 0.10
"good" threshold). Investigated and shipped two surgical changes; we
should re-check Speed Insights in 24–48 h to see the new P75.

- **Fraunces font config** (`app/layout.tsx`): dropped the unused
  `SOFT`, `WONK`, and `opsz` variable-font axes. Nothing in the CSS
  ever referenced them via `font-variation-settings`, so they were
  inflating the preload for zero visual benefit. Smaller file →
  preload more reliably finishes before first paint → fewer
  font-swap reflows. Also added explicit `fallback` chains to both
  Fraunces and Inter so next/font's auto-computed size-adjust
  metrics are tighter — when a swap does happen, the reflow is
  smaller.
- **NavBrand collapse on restored scroll** (`components/nav-parts/Provider.tsx`):
  removed the synchronous `onScroll()` call from the mount effect.
  Previously, back-button navigation or a hard refresh to a deep-
  scrolled position fired `setScrolled(true)` during hydration,
  collapsing the logo from `h-32/h-40` → `h-10` without any recent
  user input. Chrome counted that size animation as a CLS event.
  Now the logo only collapses on actual scroll, which is
  CLS-excluded. Minor visual cost: on back-nav the masthead may
  look full-size briefly until the user scrolls.

### 7. Story page — copy update needed

The image on `/story` has been reduced ~40% (max-w-xl/2xl → max-w-[350px]/[400px])
per the May 16 2026 design adjustment, but the **long-form story text
below the image still needs updating**. Callum to provide replacement
copy at a later session. Until then the original four-paragraph piece
stays in place.

### 8. Content sweep — May 16 2026 (shipped)

Snapshot of the changes made in this batch so future sessions know
which threads are closed.

- **Homepage:** Story section removed (`components/Story.tsx` kept as
  an orphan import). `Booking.PrimaryTrigger` + `Booking.MobileTrigger`
  default labels changed from "Book your stay" → "Book Now" so the
  CTA reads uniformly across the site. `CTA.tsx` now explicitly
  passes `label="Book Now"`.
- **StickyBookNow:** added an `IntersectionObserver` on `<footer>`.
  When the footer enters the viewport, the pill fades out the same
  way it does when the booking modal opens — so the dark-mode toggle
  in the footer is reachable on mobile.
- **Pods (Felix):** "barn" removed from `intro`; "matte stone" and
  "800 gsm Turkish cotton in the bathroom" removed from `detail`.
  `styleNote: "Scandi barn"`, `spec: "Modern Scandinavian barn"`, and
  the FAQ "Scandi-barn-style" mention were left untouched (narrow
  reading of the instruction — broaden if asked).
- **Terms & Conditions:** full replacement with the new 11-section
  document Callum provided. Subsection headings (2.1, 2.2, etc.)
  rendered as `<h3>` for readability.
- **Privacy Policy:** full replacement with the new 10-section
  document. Bulleted lists used where the source content was
  list-shaped.
- **FAQ:** check-in / check-out combined; late-checkout language
  removed; "private" dropped from parking; bathroom Q removed;
  breakfast Q removed; Scandi-barn-style → Scandi-style with the
  couples-can-still-book-the-bigger-pod nuance; "800 gsm" dropped
  from the linen Q for consistency with the Felix copy change;
  Aviation Museum private-flight line added; Sydney drive hyphens
  smoothed; cancellation policy aligned with the new 5-day rule;
  pets reduced to a flat "no"; events reduced to "email us"; canola
  season tightened to August–September; "across multiple weekends
  each year" removed from the Lake Centenary line for consistency
  with the Explore page edit.
- **Stay page:** Materials / The Land closing block removed.
- **Story page:** image footprint reduced ~40% (see open thread #7
  above for the copy follow-up).
- **Explore page:** Aviation Museum site link added; Bundawarrah
  Airbnb link removed; Junee licorice body rewritten + relocated
  ("56 km south · 35–40 min"); Coolamon eyebrow corrected to "63 km
  southwest · 40–45 min"; Canola Trail season tightened to
  August–September; Lake Centenary "across multiple weekends" line
  removed.
- **Contact page:** "Mark or Gillian will reply, usually within the
  hour…" paragraph removed; meta description softened to match.

### 9. Housekeeping — stale `.next/types/` duplicates

`tsc --noEmit` reports duplicate-identifier errors in
`.next/types/cache-life.d 2.ts`, `routes.d 3.ts`, etc. Those filenames
with " 2.ts" / " 3.ts" suffixes look like macOS Finder / cloud-sync
duplicates of the generated `.next/types/` files. They're not in
source and they don't affect the Vercel build (Vercel rebuilds
`.next/` from scratch). Local cleanup is `rm -rf .next` from the
host Terminal next time you're in there.

### 6. Housekeeping

- ~~`coolamon-cheese.jpg` resize~~ — **done** (520 KB, May 2026).
- ~~`bundawarrah-centre.jpg` resize~~ — **done** (240 KB, May 2026).
- ~~`lake-centenary.jpg` resize~~ — **done** (671 KB, May 2026 —
  slightly over the 500 KB hero target, acceptable).
- **Submodule cleanup — in flight (May 16 2026).** `.gitignore`
  updated locally to ignore `/temp_anthropic`, `/temp_bencium`,
  `/temp_vercel`, `/temp_b`. Still needs the following on the host:

  ```
  cd /Users/callumbett/Documents/three-ponds-estate
  git rm --cached temp_anthropic temp_bencium temp_vercel
  git add .gitignore
  git commit -m "Remove orphan submodule pointers; ignore temp_ reference repos"
  git push
  ```

  After this, Vercel's submodule warning should disappear. The folders
  stay on disk — they're just no longer tracked.
- Orphan files in the codebase (e.g. `components/Amenities.tsx` is no
  longer used on the homepage) — kept intentionally for now in case we
  bring them back.

## Image Sizing Rules

For any photo uploaded going forward:

- **Hero / full-bleed:** 2400 px long edge, JPG 80–85%, sRGB,
  target 300–500 KB.
- **Cards / tiles / story / circle:** 1600 px long edge, JPG 80%,
  target 150–250 KB.
- **Logos:** 800 px long edge, PNG with transparency, under 50 KB.
- Resize via macOS Preview → Tools → Adjust Size → File → Export as JPEG
  at quality 80.

## Things That Have Burned Us — Avoid

1. **Pasting code blocks from other AIs (21st.dev, ChatGPT) directly into
   files via VS Code.** They use different libraries (`framer-motion` vs
   `motion/react`), different design tokens (raw hex vs CSS variables),
   fonts that aren't configured (`font-playfair`), and undefined classes
   (`text-outlined`). Always paste to Claude first to port the parts
   worth keeping.
2. **VS Code "Overwrite" button** when the file has changed on disk.
   That wipes Claude's changes. The right answer is almost always
   **Revert** (load disk version, lose buffer).
3. **`git push` with bracketed paths** — quote them: `"app/stay/[slug]/page.tsx"`.
4. **23 MB images.** Resize before committing — git keeps every version
   of every file forever, even after replacement.

## Quick Pointers

- Pod data: `lib/pods.ts`
- Homepage section order: `app/page.tsx`
- Booking modal: `components/booking/BookingModal.tsx`
- Booking context / filter type: `components/booking/context.ts`
- Booking triggers: `components/booking/triggers.tsx`
- Pod detail page: `app/stay/[slug]/page.tsx`
- Theme tokens: `app/globals.css`
- Explore page images: `public/images/explore/`

## Resuming a Session

In a new Cowork thread:

1. Point Claude at this folder (you've already done that).
2. Paste: *"Read `NEXT_SESSION.md` then tell me what we're in the middle
   of and what's next."*
3. Claude reads this file, then `CLAUDE.md`, then `AGENTS.md`, and is
   immediately oriented.
