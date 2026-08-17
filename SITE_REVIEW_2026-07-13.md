# Site Review — 13 July 2026

> **Reversal addendum (Aug 2026):** the owner decided to stay with Little
> Hotelier; the Lodgify switchback is parked at `lodgify-switchback`
> (`b6382fe`) and `main` is the working branch again. Reading guide:
> **B1, B2, I1, I7 are moot** (Lodgify-only). **I2 reverses** — the enquiry
> form lives on `main`, so `contact_submit` should be marked as a GA4 key
> event per the original plan. **I3 reverses** — `main`'s "Little Hotelier"
> meta description is accurate again (optionally still reword; it's jargon
> in a SERP). **I5 and I6 were ported to `main`** (Lightbox focus trap,
> sticky-pill `inert`). **I4 and P1–P7 are engine-neutral and still stand**,
> as does everything under "Verified clean" except pod/booking specifics.
> The Little Hotelier widget bugs (pod filter, iframe drag, two-tap) are
> live issues again — tracked in `NEXT_SESSION.md` § E.

**Target:** `lodgify-switchback` branch (`0ebbc53`) — the future state, per Callum's call.
**Context:** the Fable brief described the SiteMinder era; the repo has since pivoted to
Lodgify (Search Box on `/` and `/book`, per-pod Booking box on `/stay/[slug]`). Thread 1
(SiteMinder room-type filter) is therefore closed as superseded — the filtering problem
disappears entirely because each pod page embeds its own rental-scoped Booking box.

**Branch state:** `production` = `d5dec33` (live, SiteMinder era) ← 2 commits behind
`main` (`ec0b151`, unpromoted SEO fixes) ← 3 commits behind `lodgify-switchback`.

Nothing has been committed or pushed. Four fixes are sitting as uncommitted edits for
your review (marked **FIXED** below). Suggested commit at the end.

---

## Blocking — before `lodgify-switchback` goes anywhere near production

### B1. Booking subdomain not verified live
The Search Box redirects to `https://book.threepondsestate.com/en/all-properties`
after date selection. `lib/lodgify.ts` itself warns this is gated on the `book`
CNAME at Wix plus Lodgify domain-linking. Fetching that URL returns an empty
JS shell — I could not confirm the flow completes.
**Repro:** `/book` → pick dates → Search.
**Expected:** Lodgify all-properties page under our brand. **Actual:** unverified, likely dead redirect.
**Fix:** add the CNAME at Wix (registrar only — MX untouched), link the domain in
Lodgify, then verify the full search → checkout path in a real browser before promoting.

### B2. The promote plan itself
Not a defect, but the known failure mode: when this ships it needs
`lodgify-switchback` → `main` (preview check) → `production`. Production is currently
5 commits behind your local work, including `ec0b151`'s SEO/security-header fixes
that were never promoted.

---

## Important

### I1. `book_now_click` lost on pod pages — **FIXED**
The old pod-page trigger fired GA4's `book_now_click` (the event Google Ads will bid
against). The Lodgify Booking box fired nothing, so every pod-page booking was
invisible to attribution — and no remaining call-site passed a pod filter, so
`pod_filter` was always `"any"`.
**Fix shipped:** `LodgifyBookingBox.tsx` now fires `book_now_click` with
`pod_filter: rentalId` when the widget's Book Now button is clicked (capture-phase
listener, label-matched so calendar cells don't fire it).
**Verify after deploy:** click Book Now in a pod's booking box in Chrome (not Brave)
→ GA4 Realtime shows the event with the rental id.

### I2. `contact_submit` is now a dead GA4 key event
The enquiry form was removed from `/contact` in this branch (replaced with direct
email/phone). Nothing fires `contact_submit` any more; `EnquiryForm.tsx` is orphaned.
**Action (GA4 Admin):** don't mark `contact_submit` as a key event — and unmark it if
already done. The earlier note to unmark `purchase` still stands.
**Decision for you:** if the form was meant to stay, it needs reinstating — it looked
deliberate, so I left it.

### I3. Stale "Little Hotelier" meta description on `/contact` — **FIXED**
The SERP/OG description read "Book … via the Little Hotelier engine" — an engine
retired two pivots ago. Now: "Book Three Ponds Estate directly with live availability…"

### I4. Monster images in `public/`
- `images/amenities/kitchen-bbq/DSC01847.jpg` — **28.2 MB**
- `images/amenities/acreage/DSC01857.jpg` — **23.2 MB**
- `images/pods/the-felix/DSC01677.jpg` — **15.6 MB** (referenced nowhere)

The Amenities section is no longer on the homepage, so nothing renders them — but
they're publicly fetchable, bloat every clone/deploy, and are the exact "23 MB image"
failure mode from the burn list. Also unreferenced: `story/DSC01796.jpg` (2.6 MB),
`hero/hero-2.jpg` (2.5 MB), `pods/the-uphaz/DSC01857.jpg` (2.1 MB),
`pods/the-ophir/DSC01509.jpg` (1.3 MB).
**Fix:** resize (if Amenities may return) or delete via host Terminal. Gallery sources
also run 0.7–1.4 MB against the 150–250 KB house budget — `next/image` limits the
real transfer, so this is batch-tidy, not urgent.

### I5. Lightbox had no focus trap — **FIXED**
`role="dialog"` and Esc were right, but Tab walked out into the page behind, and
closing dropped focus at the top of the document. Now: focus moves into the dialog on
open, Tab cycles within it, and focus returns to the thumbnail on close.

### I6. Hidden sticky Book Now pill stayed keyboard-focusable — **FIXED**
When faded out (`aria-hidden` + `pointer-events-none`) the link inside remained in the
tab order — an invisible focus stop and a WCAG violation. Now `inert` while hidden.

### I7. Lodgify Search button nearly invisible on its card
Widget theming sets the primary button to parchment `#f6f2e8` on Lodgify's white card:
**1.12:1** contrast — a UI control needs 3:1 against its surroundings.
**Options:** make `--ldg-psb-color-primary` corten `#b7410e` (label flips to parchment,
4.97:1 — on brand), or tint the card off-white. Your call on look; corten recommended.

---

## Polish

- **P1. Dark-mode corten small text:** `#b7410e` on `#14110d` = 3.38:1 — passes for
  large text/UI, fails AA for body-size links ("Open in Google Maps" etc.). A lighter
  dark-mode corten override in `globals.css` would clear it.
- **P2. ThemeToggle tap target:** 36×36 px (`h-9 w-9`) — under the 44×44 guideline.
- **P3. ThemeToggle lint errors (pre-existing):** `curtainColorRef.current` read during
  render — 3 `react-hooks/refs` errors. Works today; worth a `useState` refactor.
- **P4. Stale SiteMinder comments:** `app/stay/[slug]/page.tsx:97`, `triggers.tsx`,
  `booking/index.ts` still narrate the retired modal; `BookingFilter.roomTypeId` is a
  SiteMinder-era name (Lodgify thinks in `rentalId`). Docs-only, no behaviour impact.
- **P5. `pnpm.onlyBuiltDependencies` still in `package.json`** — warns on every pnpm
  run; `pnpm-workspace.yaml` already carries the config, so delete the key.
- **P6. Stale local `.next/`** — duplicate `routes.d 2.ts`-style files + the deleted
  `app/cookies` validator make raw `tsc` noisy. `rm -rf .next` from host Terminal.
- **P7. Stale branches:** `claude/gifted-babbage-1405f0`, `claude/jovial-wozniak-825fcb`.

---

## Verified clean (no action)

Source type-checks with zero errors (sandbox can't run full `next build` — Vercel's
preview build is the real gate). Exactly one H1 per page, homepage H1 present
(sr-only, intentional). Meta description + canonical + OG on every page, all within
length limits. Sitemap lists all 12 URLs including `/book`; robots.txt correct and now
also blocks `/_next/`. Every internal link resolves to a real route. Alt text on all
content images; decorative images `alt=""`. `focus-visible` styles on all interactive
elements; mobile nav sheet has proper dialog semantics + Esc. Light-mode palette passes
WCAG AA across every token pairing (corten on parchment 4.97:1, worst case
parchment-deep 4.53:1). `tel:`/`mailto:`/site-map click tracking unaffected. JSON-LD,
GA4, Ahrefs, Vercel Analytics/Speed Insights wiring unchanged. Security headers added
by `ec0b151` are solid. Hero image within budget (481 KB). No duplicate "file 2.tsx"
artefacts in source.

## Couldn't verify from the sandbox (needs a browser)

Lodgify widget rendering/theming in situ, the search→checkout redirect (B1), GA4
Realtime event confirmation, Lighthouse/Core Web Vitals, Facebook OG re-scrape, and
the Rich Results test. Connect the Claude in Chrome extension and I'll run these, or
they're 10 minutes by hand.

---

## Suggested commit (host Terminal, nothing promotes)

```
cd /Users/callumbett/Documents/three-ponds-estate
git add app/contact/page.tsx components/LodgifyBookingBox.tsx components/Lightbox.tsx components/StickyBookNow.tsx
git commit -m "review: pod-page book_now_click, lightbox focus trap, sticky-pill inert, contact meta"
git push origin lodgify-switchback     # → preview only; production untouched
```
