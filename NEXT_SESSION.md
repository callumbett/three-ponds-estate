# Next Session — Three Ponds Estate

> Living handoff doc. Read this first at the start of any new Cowork thread.
> Last refreshed: **2 June 2026** — covers the analytics / SEO / ads
> rollout and the DNS cutover from Wix→Lodgify to Vercel.

---

## Project

Three Ponds Estate — boutique accommodation site for a three-pod property
in Temora, NSW. **Live in production at `https://threepondsestate.com`**
(apex canonical, `www.threepondsestate.com` 308-redirects to it).

The `.com.au` variant was previously considered but the user committed
to `.com` only (matches Google Workspace email host). DNS is at Wix
(domain registrar) pointing the A and CNAME at Vercel.

## Stack & Conventions

- **Next.js 16** (App Router), **React 19**, **Tailwind v4** with `@theme`
  and `@custom-variant`.
- **Motion library:** `motion/react` (NOT `framer-motion`). Don't import
  from `framer-motion` — it's not installed.
- **Package manager:** **pnpm is mandatory.** Currently pinned to
  `pnpm@11.5.1` in `package.json`'s `packageManager` field. Never run
  `npm` or `yarn`. See `CLAUDE.md`.
- **Design tokens:** all colours go through `globals.css` tokens
  (`text-corten`, `bg-parchment`, `text-charcoal`, etc.). Never use raw
  hex codes in components — that breaks dark mode.
- **Booking integration:** SiteMinder / TheBookingButton embed widget
  (`channelcode=threepondsestate`, region APAC). Loaded via `next/script`
  in `app/layout.tsx`. The single modal lives in
  `components/booking/BookingModal.tsx`.
- **Booking composition:** Provider + context + four explicit trigger
  variants (NavTrigger, PrimaryTrigger, QuietTrigger, MobileTrigger). All
  funnel through the same `actions.open()` in `BookingProvider.tsx`.

## How code reaches production

**Branch model (Vercel Pro):**

- `main` is the **staging** branch. Every push to `main` creates a
  Vercel **preview deployment** with its own URL.
- `production` is the **production** branch. Vercel only deploys to
  the live site when commits land on `production`.
- Vercel's "Production Branch" setting (Settings → Environments →
  Production → Branch Tracking) is set to `production`, not `main`.

All pushes happen from the **host Terminal**, not the Cowork sandbox.
The sandbox has no pnpm network access.

**Standard flow — push + promote in one go:**

```
cd /Users/callumbett/Documents/three-ponds-estate
git add <files>
git commit -m "..."
git push origin main                  # → Vercel preview

git checkout production
git pull
git merge --ff-only main
git push origin production             # → Vercel production
git checkout main
```

**zsh gotcha:** `[brackets]` are globs — always quote paths that
contain them, e.g. `"app/stay/[slug]/page.tsx"`.

**Don't forget the promote.** This has been the single most common
failure mode this session — pushing changes to `main`, confirming the
preview works, and then forgetting to promote. The user has hit this
~6 times. If something looks like it's not live, **check that
`production` is at the same commit as `main` before debugging.**

## Current status (2 June 2026)

### Live and humming

- Marketing site fully migrated from Lodgify to Vercel.
- Apex canonical (`threepondsestate.com`), HTTPS via Vercel-managed
  Let's Encrypt cert.
- Google Workspace email on `threepondsestate.com` — DNS at Wix,
  MX records untouched throughout the migration.
- Favicon set: `app/icon.png` (192×192) + `app/apple-icon.png`.
- Open Graph image: `app/opengraph-image.jpg` (945×630, 146 KB sunset
  shot of all three pods).
- LodgingBusiness JSON-LD in `<head>` — passes Google's Rich Results test.
- `app/sitemap.ts` auto-generates `/sitemap.xml` listing 12 URLs.
- `public/robots.txt` allows crawling, disallows `/site-maps/`,
  declares sitemap location.
- All four analytics installed and verified firing:
  - **Google Analytics 4** — property `G-8LCXR9LWH5`. Installed via
    Google's literal manual `gtag.js` snippet in `<head>` of
    `app/layout.tsx` (NOT `@next/third-parties` — that defers the
    script to post-hydration and made the tag invisible to Google
    Ads's verifier).
  - **Vercel Web Analytics** — `<Analytics />` component, Pro plan,
    visible in Vercel project Analytics tab.
  - **Vercel Speed Insights** — `<SpeedInsights />` component.
  - **Ahrefs Web Analytics** — `next/script` in layout, verified
    against the apex canonical (verifier doesn't follow redirects, so
    apex matters).

### GA4 conversion events wired (commits `d5dec33`-era)

`lib/analytics.ts` exports `trackEvent(name, params)`. Wired call-sites:

| Event | Where it fires | Params |
|---|---|---|
| `book_now_click` | `BookingProvider.openModal` — captures every Book Now button site-wide | `pod_filter` (room type id or `"any"`) |
| `contact_submit` | `EnquiryForm.handleSubmit` after success | `pod_choice` |
| `tel_click` | `components/ClickTracker.tsx` document listener | `tel` |
| `email_click` | `ClickTracker` | `email` |
| `site_map_download` | `ClickTracker` for `/site-maps/*.pdf` clicks | `file` |

`ClickTracker` is mounted once in `app/layout.tsx` and covers all
current and future `tel:`, `mailto:`, and `/site-maps/` links
automatically — no per-component instrumentation needed.

### Brand-side admin done

- Google Search Console verified (Domain property, DNS TXT).
- Google Business Profile claimed and pointed at `threepondsestate.com`.
- Vercel canonical flipped from www→apex.
- GA4 web stream URL updated to `https://threepondsestate.com` (no www).

## Open threads — user-side action

### A. Google Ads — first campaign mid-build

User is in the Google Ads campaign creation wizard. Ads account is
created but Google forced them into building a campaign first to
finish the link to GA4. Last step they reached: **adding headlines
and descriptions for a Responsive Search Ad.**

**Ad copy already provided (in the chat that produced this handoff):**

- 15 headlines (max 30 chars each):

  ```
  Boutique Stays in Temora NSW
  Architectural Pods, Riverina
  500m from Aviation Museum
  Three Ponds Estate
  Direct Rates from AU$230
  Sunset Pods, Wide Country
  4.5hr from Sydney
  Scandinavian-style Pods
  Slow Weekends Near Temora
  Book Direct, No Surcharges
  Three Quiet Pods on Acreage
  Canola Season Stays Aug–Sept
  Aviation Museum Stays
  Country Escape, NSW Riverina
  Sunrise to Sunset Decks
  ```

- 4 descriptions (max 90 chars each):

  ```
  Three Scandi pods on 4.4 ha. 500m from the Aviation Museum. Direct rates from AU$230.
  Boutique architectural pods in Temora's Riverina country. Direct, no surcharges.
  Sunrise on the deck, sunset over open country. A slow stay 3 minutes from town.
  4.5 hours from Sydney, 2.5 from Canberra. Quiet pods, dramatic Riverina skies.
  ```

**Remaining wizard guidance (don't let Google upsell):**

- Final URL: `https://threepondsestate.com/`
- Display path: `stay` or `book`
- Networks: **uncheck Display Network and Search Partners** — Search only
- Locations: Australia, presence only (not "presence or interest")
- Bid strategy: **Maximise Clicks** for the first 2 weeks, then switch
  to **Maximise Conversions** once `book_now_click` data accumulates
- Daily budget: **AU$10–20** to start

### B. GA4 — mark remaining events as key events

User has marked `book_now_click` and `form_start` as key events. The
following custom events will appear in **Admin → Events** after a
24-hour delay (they fire to GA4 immediately but the Admin list lags).
When they appear, mark these as key events:

- ✅ `contact_submit`
- ✅ `tel_click`
- ✅ `email_click`
- ❌ skip `site_map_download` (downstream guest signal)

User should also **unmark `purchase`** as a key event — it's a
Lodgify-era artifact, not a real booking signal, and will pollute
ad attribution if left on.

### C. Facebook OG cache shows old white logo

The deployed page has the correct `og:image` meta tag pointing at the
new sunset pods image. Facebook still shows a cached white logo because
it scraped the page before the OG image existed.

**Fix (user):** Open `https://developers.facebook.com/tools/debug/`,
paste `https://threepondsestate.com`, click **Debug**, then
**Scrape Again**. Repeat for `/stay`. Other platforms (iMessage,
WhatsApp) age their caches out automatically within 24–72 h.

### D. Link GA4 ↔ Google Ads

Once the ads campaign is saved (even if paused), do:

`ads.google.com` → **Tools → Linked accounts → Google Analytics 4 →
Link** → pick the `threepondsestate.com` property → enable conversion
import → done. Allows Smart Bidding to optimise against the GA4 key
events above.

## Open threads — code / housekeeping

### E. Booking engine — Little Hotelier RETAINED (decision reversed, Aug 2026)

History, because this has flipped twice: the SiteMinder / Little
Hotelier widget's pod-filter bug prompted a full switch to Lodgify
(built on `lodgify-switchback`, 4 commits, never promoted). The owner
then decided to **stay with Little Hotelier and fix issues as they
arise**. `main` was restored as the working branch; the Lodgify build
is parked at `lodgify-switchback` (`b6382fe`, pushed) in case the
decision flips again. Do NOT delete that branch casually.

**Reopened Little Hotelier issues (support ticket stays open):**

1. **Pod-specific filter** — `data-query-room_type` + parent-URL
   `?room_type=` both supplied correctly; widget still shows all three
   pods. Awaiting SiteMinder's reply with the correct parameter.
   Room type IDs in `lib/pods.ts`: Ophir 109125, Felix 109124,
   Uphaz 109123.
2. **Mobile horizontal drag** inside their cross-origin iframe.
3. **Two-tap Select / Book flow** on mobile.

**Salvaged from the Lodgify branch onto `main`:** Lightbox focus
trap/restore, StickyBookNow `inert` while hidden. Findings in
`SITE_REVIEW_2026-07-13.md` marked engine-neutral (images I4, polish
P1–P7) still apply; see the reversal addendum at the top of that doc.

**GA4 note:** the enquiry form still exists on `main`'s `/contact`, so
the original plan stands — mark `contact_submit` as a key event when it
appears in Admin → Events.

### F. Story page long-form copy

The image was reduced; the four-paragraph body still uses the
placeholder copy from before the May 2026 rewrite. The brief story
from the user has since been pasted in (current `app/story/page.tsx`),
but if the user wants to refine further this is the touchpoint.

### G. pnpm config migration warning

When running `corepack use pnpm@11.5.1`, pnpm 11 warned that
`pnpm.onlyBuiltDependencies` in `package.json` is no longer read by
pnpm and needs to migrate to `pnpm-workspace.yaml`. Non-blocking,
nothing breaks; tidy when convenient.

### H. Housekeeping shortlist

- Stale `.next/dev/types/validator.ts` reference to deleted
  `app/cookies/page.js` — fix with `rm -rf .next` from host Terminal
  to force regen.
- Stale `claude/` branches: `claude/gifted-babbage-1405f0`,
  `claude/jovial-wozniak-825fcb` — both behind by many commits, delete
  with `git branch -D <name>`.
- Lodgify cancellation — wait until 2 weeks of confidence, then cancel.
- Wix plan downgrade to domain-only — same timing.
- Vercel's Open Graph debugger may also need a `purge` if anyone is
  testing OG previews from inside Vercel.

## Recent commits (most recent first)

```
d5dec33 ga4: conversion events + OG image (1200x630 — re-encoded 146kb)
bba9997 chore: bump packageManager to pnpm 11.5.1
0b498b0 analytics: install Google Analytics 4 (@next/third-parties)
        ^ NOTE: this commit was superseded by d5dec33 which switches
          to Google's manual gtag.js snippet. @next/third-parties
          package is still installed but the GoogleAnalytics
          component is no longer imported. Safe to leave or remove.
9387b7c analytics: add Ahrefs tracking script (afterInteractive)
52d33cd analytics: enable Vercel Web Analytics
94af0fa favicon: 192px icon + apple-icon
883d1de content: pod details, story rewrite, explore/FAQ/CTA copy
6e12b71 Add guest pre-arrival site maps (unlisted); robots.txt
```

There is one further commit on `main` since `d5dec33` that includes the
**`metadataBase` apex + sitemap.ts + LodgingBusiness JSON-LD** — verify
with `git log main --oneline -10` if needed.

## Quirks worth knowing

- **Brave blocks GA + Ahrefs by default** (Brave Shields). For testing
  any analytics, use Chrome (mobile or desktop) or Safari in private
  mode. Network filter that's been blocking the user repeatedly:
  uBlock, NextDNS, Brave, Firefox Strict, corporate VPN.
- **Vercel's site URL** previously cached old Lodgify content. If you
  see stale anything, hard-refresh (⌘⇧R) — favicons and OG images are
  cached aggressively.
- **GA4 Admin → Events list** has a 24-hour propagation delay for
  never-before-seen event names. Realtime view shows them within 30s.

## Image sizing rules

- **Hero / full-bleed:** 2400 px long edge, JPG 80–85%, sRGB, 300–500 KB.
- **Cards / tiles / story:** 1600 px long edge, JPG 80%, 150–250 KB.
- **Logos:** 800 px long edge, PNG transparent, under 50 KB.
- **OG image:** 1200×630 ideal, JPG 80–85%, under 300 KB.

Resize via macOS Preview → Tools → Adjust Size → Export as JPEG.

## Things that have burned us — avoid

1. **Forgetting to promote `main` → `production`.** See above.
2. **Pasting code from other AIs.** Different libraries (`framer-motion`
   vs `motion/react`), raw hex codes, undefined fonts/classes. Always
   pass through Claude first.
3. **VS Code "Overwrite"** when the file changed on disk. **Revert.**
4. **`git push` with bracketed paths** — quote them.
5. **23 MB images.** Resize before committing.

## Guest-only PDFs (site maps)

Per-pod site-layout PDFs at `public/site-maps/`, served at:

- `https://threepondsestate.com/site-maps/felix-site-layout.pdf`
- `https://threepondsestate.com/site-maps/ophir-site-layout.pdf`
- `https://threepondsestate.com/site-maps/uphaz-site-layout.pdf`

Linked from the pre-arrival check-in email template only. `robots.txt`
disallows `/site-maps/` so they don't show in search.

## Quick pointers

- Pod data: `lib/pods.ts`
- Homepage order: `app/page.tsx`
- Booking modal: `components/booking/BookingModal.tsx`
- Booking provider (where `book_now_click` fires): `components/booking/BookingProvider.tsx`
- Booking context / filter type: `components/booking/context.ts`
- Booking triggers: `components/booking/triggers.tsx`
- Analytics helper: `lib/analytics.ts`
- Click listener: `components/ClickTracker.tsx`
- Sitemap: `app/sitemap.ts`
- Theme tokens: `app/globals.css`

## Resuming a session

In a new Cowork thread, paste:

> *Read `NEXT_SESSION.md` in `/Users/callumbett/Documents/three-ponds-estate/`,
> then tell me where we left off and what's queued. I'm mid-build on a
> Google Ads campaign (Responsive Search Ad copy already drafted in the
> handover doc).*
