# Next Session — Three Ponds Estate

> Living handoff doc. Read this first at the start of any new Cowork thread.
> Last refreshed: **4 Sep 2026** — domain/DNS review (staying at Wix for
> now), email-authentication gap found, pod-filter issue accepted,
> `aggregateRating` plan withdrawn. The 17 Aug layer (booking-engine
> reversal, pricing, reviews, Claude context) and earlier layers
> (analytics / SEO / ads rollout, hosting cutover to Vercel) still
> described below and still true.

---

## Project

Three Ponds Estate — boutique accommodation site for a three-pod property
in Temora, NSW. **Live in production at `https://threepondsestate.com`**
(apex canonical, `www.threepondsestate.com` 308-redirects to it).

The `.com.au` variant was previously considered but the user committed
to `.com` only (matches Google Workspace email host). **Wix is both the registrar and the
DNS host** (nameservers `ns6`/`ns7.wixdns.net`); the zone there points
apex and `www` A records at Vercel. Hosting moved to Vercel; DNS did
not. See § I.

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

## Session log — 4 Sep 2026 (most recent work)

No code changed. Docs only. Three decisions and one finding.

**Decisions made:**

1. **Domain and DNS stay at Wix for now.** A full move to Vercel (both
   registrar and DNS) was scoped and written up, then deferred — the
   owner chose to renew at Wix this cycle. Nothing is broken; the current
   split (Wix = registrar + DNS, Vercel = hosting, Google = email) works
   and needs no change. The runbook is written and parked at
   `CLAUDE/DOMAIN_TRANSFER_RUNBOOK.md` for whenever it is picked up.
   See § I for the standing risk this leaves in place.
2. **Pod-filter issue accepted.** Booking widget continues to show all
   three pods. Closed, not deferred. See § E.
3. **`aggregateRating` withdrawn from the SEO plan.** It was queued on
   17 Aug; it is against Google's guidelines and would not have worked.
   Google: *"If the entity that's being reviewed controls the reviews
   about itself, their pages that use LocalBusiness or any other type of
   Organization structured data are ineligible for star review feature"*,
   and *"Don't aggregate reviews or ratings from other websites."* The
   review counts on the site come from Google, Airbnb and Booking.com, on
   a page we control — both prohibitions apply. Do not re-add it.

**Finding — email authentication is entirely absent.** `threepondsestate.com`
has no SPF record, no DKIM key and no DMARC policy. Google Workspace is
sending and receiving with none of the three. Practical effect: guest
emails are more likely to be filtered as spam, and the domain is
trivially spoofable. Unrelated to the domain question; it has been true
all along. Fix is in § I and is the top open item.

**Also confirmed:** Little Hotelier back end verified showing $239/$299
with the discounts applied, so widget and site copy agree.

**Image triage (§ H):** three files dominate `public/`. Two are live —
`amenities/kitchen-bbq/DSC01847.jpg` (28.2 MB) and
`amenities/acreage/DSC01857.jpg` (23.2 MB), both used by
`AmenitiesSlideshow` on the homepage and pod pages. One,
`pods/the-felix/DSC01677.jpg` (15.6 MB), is referenced nowhere and is
pure dead weight. Not a visitor-facing emergency: the slideshow uses
`next/image`, so visitors receive optimised derivatives, not the
originals. The cost is repo bloat (`public/images/` is 109 MB of a
111 MB `public/`), build time and transformation spend.

**Ahrefs site audit — 4 Sep.** Daily report flagged four items. One was
real: "Open Graph tags incomplete" on 12 URLs — every page on the site.
Diagnosed and fixed the same session; see § C. The other three are
noise and were deliberately closed as won't-fix: "3XX redirect" (3) is
outbound links to external sites that redirect — there are no `http://`
or trailing-slash internal links anywhere in the codebase; "HTTP to
HTTPS redirect" (2) is Ahrefs seeding its crawl with the `http://`
forms of the apex and `www`, which correctly redirect — that is the
setup working; "Redirect chain" (1) is `http://www` → `https://www` →
`https://apex`, inherent to running both a protocol upgrade and a
www→apex canonical. Do not "fix" the last two; doing so would weaken a
correct canonical setup.

**Tooling note:** the Ahrefs MCP integration returns `Insufficient plan`
for every keyword, SERP, Site Explorer and GSC endpoint. Treat Ahrefs as
unavailable for research; Search Console is the data source.

## Session log — 17 Aug 2026

**Branch state at handover:** `production` = `2438fe8` (live). `main` =
`254bd3c`, one commit ahead — docs only, no site impact, promote whenever.
`lodgify-switchback` = `b6382fe`, parked, do not delete.

**What shipped live this session** (promoted `d5dec33` → `2438fe8`, five
commits): `/book` footer link + CTA alt text; SEO/security-header round;
a11y (Lightbox focus trap + restore, StickyBookNow `inert` when hidden);
pricing copy; review counts.

**Decisions made:**

1. **Lodgify switchback reversed.** Owner chose to stay on Little Hotelier
   and fix widget issues as they arise. `main` restored; Lodgify build
   parked on its branch. See § E.
2. **Pricing presentation.** Base rates now Ophir AU$239, Felix/Uphaz
   AU$299 (`lib/pods.ts`). Discounts: 5% off 2 nights, 10% off 3+.
   Rule: anchor copy on the honest one-night "from" rate plus one
   restrained savings line — never lead with the discounted number, no
   decimals in copy. Applied in CTA, /book, /faq, /contact.
3. **21-day advance-purchase promo declined** (owner agreed, removing it
   from the LH back end). Reasons: cannibalises the new 2-night tier,
   risks stacking to ~20% off, three overlapping rules muddies the copy,
   and it would confound measurement of the ladder just launched.
   Revisit after a season if bookings cluster last-minute — run it as an
   LH-only rate plan / promo code, kept off the website.
4. **Guest tally is now a floor claim** — "More than 2,000 guests hosted".
   The old 1,894 figure came from Lodgify (June 2026) and can never be
   refreshed from Little Hotelier. Only raise the floor when bookings
   clearly support it.
5. **Claude context setup.** `CLAUDE.md` rewritten to self-orient every
   session (read this file first, deploy contract, zsh command-block
   rules, sandbox limits). `CLAUDE/TPE_Marketing_Context.md` fact-checked
   to Aug 2026. `CLAUDE/Claude_Project_Instructions.md` holds the setup
   for an app-side Claude Project (marketing/copy only; code and repo
   state stay in Cowork). Truth hierarchy: repo state → this file;
   repo rules → `CLAUDE.md`; brand/business facts → marketing context.

**Full site review:** `SITE_REVIEW_2026-07-13.md` (audited the Lodgify
branch, with a reversal addendum marking which findings still apply).
Engine-neutral items still open: oversized images in `public/`
(28 MB and 23 MB files in `amenities/`, several unreferenced multi-MB
files), dark-mode corten contrast on small text (3.38:1), ThemeToggle
36×36 tap target and its pre-existing `react-hooks/refs` lint errors.

**Next up, in rough priority order:**

1. **Verify SPF and DMARC resolved** — added 4 Sep, not yet visible in
   public DNS at end of session. See § I. DKIM is parked, not forgotten.
2. Google Ads campaign — copy drafted in § A, now updated to $239 with a
   "Stay 3 Nights, Save 10%" headline (list is at 16, trim to 15).
3. GA4 key events — § B (mark `contact_submit`, `tel_click`,
   `email_click`; unmark `purchase`).
4. Facebook OG re-scrape — § C. Then link GA4 to Google Ads — § D.
5. SEO: local-pack strategy, not organic blue links — see § J. Homepage
   body copy to 400+ words is the on-site half.
6. a11y: dark-mode corten contrast + ThemeToggle tap target — § H.
7. Housekeeping: image cleanup, § H list.

---

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
  Direct Rates from AU$239
  Stay 3 Nights, Save 10%
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
  Three Scandi pods on 4.4 ha. 500m from the Aviation Museum. Direct rates from AU$239.
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

### C. Facebook OG preview — CAUSE CORRECTED 4 Sep 2026

**The earlier diagnosis in this section was wrong.** It said the
deployed pages carried a correct `og:image` and Facebook was merely
showing a stale cache, with the fix being a re-scrape. Re-scraping would
have achieved nothing, because **no page on the site was serving an
`og:image` at all.**

Cause: Next.js does not deep-merge metadata. Every page exported its own
`openGraph` object (for a per-page `og:url`), which replaced the root
layout's `openGraph` wholesale — silently discarding `images`, `type`
and `locale`. Ahrefs caught it as "Open Graph tags incomplete" across
all 12 URLs, which is every page on the site.

Fixed 4 Sep 2026 by routing all 12 pages through `buildOpenGraph()` in
`lib/seo.ts`, which supplies the shared image, type, locale and siteName
by construction so a future page cannot omit them. `siteName` was also
missing site-wide and is now set.

**Order matters for the remaining user step.** The re-scrape only works
once the fix is live in production:

1. Promote to `production` and confirm the deploy finished.
2. View source on the live homepage, search `og:image`, confirm it is
   present and points at `/opengraph-image.jpg`.
3. Only then: `https://developers.facebook.com/tools/debug/` → paste
   `https://threepondsestate.com` → **Debug** → **Scrape Again**.
   Repeat for `/stay` and each pod page.

Other platforms (iMessage, WhatsApp, LinkedIn) age their caches out on
their own within 24–72 h once the tags are correct.

**Worth doing later:** the pod pages all share the generic sunset image.
Giving each pod its own `og:image` would make a shared Felix link show
the Felix pod. `buildOpenGraph()` would need an optional image override.
Correctness first; this is a refinement.

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

1. **Pod-specific filter — ACCEPTED AS-IS (4 Sep 2026).** Owner decided
   to continue with the widget showing all three pods. Do not reopen
   this or spend further effort on it without being asked.
   `data-query-room_type` + parent-URL `?room_type=` are both supplied
   correctly; the widget ignores them. Room type IDs in `lib/pods.ts`:
   Ophir 109125, Felix 109124, Uphaz 109123. The `pod_filter` param on
   `book_now_click` still fires correctly and is worth keeping.
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
- **Wix plan downgrade to domain-only — DANGER, read § I first.** The
  live DNS zone (including the Google MX records) is hosted at Wix. Do
  not downgrade or cancel anything at Wix until it is confirmed the DNS
  zone survives it, or email stops arriving with no obvious cause.
- **Delete the `_cf-custom-hostname` TXT record at the same time as
  cancelling Lodgify** — the two are tied. See § I. Do not delete it
  before then: if the engine decision ever flips back to Lodgify, that
  record is part of their domain setup.
- Vercel's Open Graph debugger may also need a `purge` if anyone is
  testing OG previews from inside Vercel.

### I. Domain, DNS and email authentication

**Current shape, stated plainly because it is easy to misremember:**

| Layer | What it does | Who holds it |
|---|---|---|
| Registrar | Who the name is rented from | **Wix** |
| DNS / nameservers | Answers "where does this domain live?" | **Wix** (`ns6`/`ns7.wixdns.net`) |
| Web host | Where the site runs | **Vercel** |
| Email | Mailbox for `info@threepondsestate.com` | **Google Workspace** |

The May 2026 migration changed the **A records inside the Wix zone** to
point at Vercel. It did not move the zone. Wix nameservers are still
asked for every lookup, for the website and for mail routing alike.
Verify any time with `dig NS threepondsestate.com +short`.

**Standing risk:** the Google MX records live in the Wix zone. Anything
that removes that zone takes down email as well as the site, and neither
Vercel nor Google would be involved or able to help. This is why the Wix
plan downgrade in § H is flagged as dangerous.

**Live DNS as read on 4 Sep 2026:**

```
A     @                  216.150.1.1
A     www                216.150.1.1
MX    @                  10 aspmx.l.google.com
MX    @                  20 alt1.aspmx.l.google.com
MX    @                  30 alt2.aspmx.l.google.com
MX    @                  40 alt3.aspmx.l.google.com
MX    @                  50 alt4.aspmx.l.google.com
TXT   @                  google-site-verification=-KtbBWRxgeedOOCXZWX3Tdum_r1RLPdXbSDPZEZSIrk
TXT   @                  google-site-verification=rvDsCY92aF5IT31K9paWdfaFXnxAr9SzcTkJWA6PjEI
```

Both verification strings are load-bearing — one holds the Search
Console **Domain property**. Never drop them from any future zone.

The full Wix panel was read on 4 Sep 2026 and holds one record that
public DNS lookups at the apex did not reveal:

```
TXT   _cf-custom-hostname   2ba410cd-7c3e-46bb-947c-bf44301fe201
```

This is a **Cloudflare for SaaS ownership-verification token** claiming
the apex hostname. Almost certainly a leftover from the Lodgify build
(Jun–Aug 2026) — Lodgify fronts customer domains through Cloudflare, and
the timeline matches. It is **verification only and routes nothing**;
Cloudflare-for-SaaS routing runs through a CNAME, and the CNAME section
is empty, so the token is fully orphaned. No takeover risk, no effect on
site or email. Leave it until Lodgify is cancelled, then remove both
together — see § H.

The A and CNAME sections were also read and are clean: apex and `www`
both A records at `216.150.1.1`, no CNAMEs at all.

**Added 4 Sep 2026 (in the Wix panel):** SPF at the apex and DMARC at
`_dmarc`, values as below. Both were entered and confirmed in the panel;
they had not yet appeared in public DNS at end of session, which is
normal 1-hour TTL caching, not a fault. **Verify them** with the dig
commands below before assuming they are live.

**DKIM — PARKED (4 Sep 2026).** Requires the Google Workspace admin
console, and it is not established who holds super-admin on the domain.
The Workspace subscription appears to have been bought through Wix as a
reseller ("Business Email"), so the console is reachable either at
admin.google.com signed in as `info@threepondsestate.com`, or via Wix
dashboard → Business Email → Manage. **Do not create a new Workspace
account for this domain** — a second one causes real problems.

Not urgent. SPF carries most of the deliverability benefit and is done.
DMARC at `p=none` is monitoring-only, so nothing depends on DKIM to
function. Google already applies its own default DKIM signature to
outgoing mail; it signs as Google's domain rather than ours, which only
becomes limiting if DMARC is later tightened to `p=quarantine`. Revisit
DKIM at that point.

**TOP OPEN ITEM — add these three records in the Wix DNS panel.** Wix →
Domains → Advanced → Edit DNS. Independent of the registrar question:

```
TXT   @                  v=spf1 include:_spf.google.com ~all
TXT   google._domainkey  (generate in Google Admin, see below)
TXT   _dmarc             v=DMARC1; p=none; rua=mailto:info@threepondsestate.com; fo=1
```

DKIM: admin.google.com → Apps → Google Workspace → Gmail → Authenticate
email → 2048-bit → Generate new record. Add the TXT to Wix **first**,
then click Start authentication. `p=none` on DMARC is deliberate —
report-only, so it cannot bounce a real enquiry. Tighten to
`p=quarantine` after a few clean weeks.

Verify from Terminal (read-only):

```
dig TXT threepondsestate.com +short
dig TXT _dmarc.threepondsestate.com +short
```

Then end-to-end: send from `info@` to a Gmail, open the message, **Show
original**, confirm SPF and DMARC PASS. DKIM will show Google's own
signing domain until a custom key is configured — expected, not a fault.

**If the move is ever picked up:** `CLAUDE/DOMAIN_TRANSFER_RUNBOOK.md`
has the full sequence. The governing rule is DNS first, registration
second — transferring the registration while DNS still lives at Wix
means Wix drops the zone on the way out and both site and email go dark.

### J. SEO — the ranking problem, reframed

Owner's report: searching "Temora accommodation" on Google returns no
Three Ponds Estate anywhere in the listings.

**Do not chase organic blue links for that query.** It is owned by
Booking.com, TripAdvisor, Wotif and Stayz, with thousands of referring
domains against our handful. Small-hospitality budget spent there is
wasted.

**Target the local pack instead** — the map results above the organic
list, which is where a Temora searcher actually clicks. It is decided
largely by Google Business Profile completeness, proximity and review
volume/recency, not by site authority. The profile is already claimed,
which is the hard part.

**The site's supporting job**, in priority order:

1. Homepage body copy to 400+ words. Currently roughly 150–200 words of
   indexable prose across Hero / StatsStrip / PodSection / Reviews / CTA,
   much of it review quotes and button labels. Too little for Google to
   understand the page.
2. No page targets how people actually search. `/stay`, `/explore` and
   `/story` exist; nothing is built around "accommodation in Temora",
   the Aviation Museum, or canola season.
3. JSON-LD is missing `geo` coordinates and `hasMap`. Both are legitimate
   and worth adding. `aggregateRating` is NOT — see the 4 Sep log.

**Note on the ChatGPT recommendation.** That an LLM calls us "the best
Temora accommodation" is not evidence of Google ranking — different
retrieval system, different inputs. Pleasant, but it should not be read
as a baseline.

**Blocked on data.** Ahrefs is unusable (see 4 Sep log). Need Search
Console query export — impressions and average position by query — to
know whether the site is invisible or merely on page 3. Those are
different problems with different fixes.

## Recent commits (most recent first)

```
254bd3c docs: self-orienting CLAUDE.md, fact-checked marketing context,
        Claude Project setup                        (main only, not promoted)
2438fe8 reviews: refresh counts (Google 126, Airbnb 151, Booking.com 137)
        + guests-hosted floor claim                 ← production is here
f63a2c1 pricing: from AU$239/$299, add 5%/10% longer-stay savings copy
        (commit message got zsh-mangled to "AU/299" — content is fine)
918b369 a11y: lightbox focus trap + inert sticky pill (ported from the
        parked Lodgify branch); docs: Little Hotelier retained
ec0b151 SEO & site audit fixes: metadata, OG tags, canonicals, security
        headers, image optimisation
```

Parked branch (do not delete, do not treat as current):

```
b6382fe review: pod-page book_now_click, lightbox focus trap, sticky-pill
        inert, contact meta          (tip of lodgify-switchback)
```

Older history:

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

Connect the `three-ponds-estate` folder, then paste:

> *Read `NEXT_SESSION.md` and `CLAUDE.md` in the connected folder, then
> tell me where we left off and what's queued. Give me git command blocks
> to run myself — never push, and flag clearly whether a block is
> preview-only or goes live.*

`CLAUDE.md` is loaded automatically and already carries the standing rules
(orientation, deploy contract, zsh command-block gotchas, sandbox limits),
so the paste above is a nudge rather than a requirement.
