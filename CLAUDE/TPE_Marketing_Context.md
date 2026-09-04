# Three Ponds Estate — Claude Working Context
*This file is the single source of truth for all AI-assisted **marketing** work. Read it at the start of every session. Update it when facts change.*

> **Truth hierarchy:** repo/code/site state lives in `NEXT_SESSION.md`; repo
> rules in `CLAUDE.md`. This file owns brand, marketing, and business facts.
> If this file and the repo disagree on site state, the repo wins.
> Last fact-check: **17 Aug 2026**.

---

## The Property

**Three Ponds Estate** — boutique architectural sanctuary, Temora NSW
- **Address:** 79 Airport Street, Temora NSW 2666
- **Website:** https://www.threepondsestate.com
- **Phone:** 0403 433 300 | **Email:** info@threepondsestate.com
- **Owner contact:** callum.bett@gmail.com

**Founders:** Gil (Gillian) and Mark Bett
- Purchased land 1993. Family home, horses, children for decades.
- Opened pods to guests 2020. Gil's vision: *"a place where the pace of life slows down the moment you drive through the gates."*
- **Self check-in only.** No reception, no host on-site unless requested. Guests have complete privacy — "invisible care." Gil is warm, responsive, and caring but never intrusive.

**The Three Pods** (all return 200, all Next.js/Vercel):
| Pod | Bedrooms | Style | From | SiteMinder ID |
|---|---|---|---|---|
| The Ophir | 1 bed, 2 guests | Hamptons-minimal (NOTE: should align to Scandinavian — inconsistency to fix) | AU$239 | 109125 |
| The Felix | 2 bed, 4 guests | Modern Scandinavian | AU$299 | 109124 |
| The Uphaz | 2 bed, 4 guests | Modern Scandinavian | AU$299 | 109123 |

**Length-of-stay discounts (Aug 2026, configured in Little Hotelier):**
5% off two-night stays, 10% off three or more nights. Site copy anchors on
the honest one-night "from" rate with one restrained savings line — never
lead with the discounted rate, never use decimals ($215.10) in copy.

- Each pod: private deck, fully equipped kitchen, private parking, reverse-cycle climate control, fast Wi-Fi
- Shared: fire pit by the water, BBQ, wide Riverina horizon
- **No check-out on Saturdays** (a genuine differentiator — guests can stay until midday)

**Review scores (Aug 2026):** Google 5.0 ⭐ (126) · Airbnb 4.97 ⭐ (151) · Booking.com 9.6 (137)
**Guests hosted:** site says "More than 2,000" (a floor claim — last verified
count was 1,894 from Lodgify, June 2026; Little Hotelier can't report this,
so only raise the floor when bookings clearly support it).

---

## Tech Stack

| Layer | Tech |
|---|---|
| Website | Next.js 16 · Vercel (`main` = preview, `production` = live) |
| Booking engine | Little Hotelier (SiteMinder) — widget.siteminder.com. Retained after Lodgify evaluation was reversed (Aug 2026); Lodgify build parked on `lodgify-switchback` branch. Support ticket open: pod filter, mobile iframe drag, two-tap flow. |
| Analytics | GA4 (G-8LCXR9LWH5) · Ahrefs Analytics |
| Codebase | `/Users/callumbett/Documents/three-ponds-estate/` |
| Package manager | pnpm (mandatory — never npm or yarn) |

Key files: `components/Nav.tsx`, `components/Footer.tsx`, `components/CTA.tsx`, `lib/pods.ts`, `app/stay/[slug]/page.tsx`, `app/book/page.tsx`

---

## Brand Voice

**Master tagline:** *"The pace changes at the gate."*

**Tone:** Warm, refined, unhurried. Written as if Gil is speaking — personal, genuine, never salesy.

**Use:** pod, Scandinavian-inspired, refined simplicity, wide skies, sanctuary, the Riverina, unhurried, still, Gil and Mark, the Estate
**Avoid:** vacation home, glamping, desert luxe, stunning (overused), business guests, don't miss out, seamless (clinical), total privacy (also clinical — say "no agenda" or "yours entirely")

**Voice test:** Could Gil have written this? Warm, genuine, specific to the place — publish. Hotel brochure or real estate listing tone — rewrite.

---

## Location & Nearby Attractions

All distances from estate gate:
- **Temora Aviation Museum** — 500m (across the road). Flying warbirds, Spitfires, only flying Hudson, oldest Tiger Moth in Australia. 3 full-motion simulators. Guardhouse Café.
- **Lake Centenary Canola Walk** — walking distance (1.8km north). Dedicated Canola Walk at lake entrance, 2.7km loop, picnic lawns, swimming.
- **Gold Rush Ballooning** — launches directly across the road from the estate during canola season (Aug–Sep). Sunrise lifts over gold fields.
- **Diamonds & Dust Café** — 3 mins, in town. Heritage room, breakfast/lunch.
- **Coolamon Cheese Co** — 63km, 40–45 min drive. Award-winning farmhouse cheeses.
- **Junee Licorice & Chocolate Factory** — 56km, 35–40 min.
- **Bundawarrah Centre** — in town. NSW Ambulance Museum, Bradman's cottage.

---

## Upcoming Events (campaign calendar)

| Event | Date | Distance | Campaign angle |
|---|---|---|---|
| **Canola Trail season** | Mid-Aug – end Sep 2026 | Walking distance (Lake Centenary) | "Wake up to balloons over gold." Base camp for photographers, couples, content creators. |
| **Temora Aviation Museum September Showcase** | Sat 19 Sep 2026, 10am–4pm | 500m (across the road) | "Walk to the warbirds. Come home to quiet." |
| **V8 Super Jetboats Round 2** | Fri 28 Nov 2026 | Lake Centenary (1.8km) | "High energy day. High-end night." |
| **Warbirds Downunder Airshow** | Oct 2026 (biennial) | 500m | Highest-demand weekend — seed now, campaign closer to date. |

**Current priority:** Winter bookings (June–August 2026). Turn cold into a selling point: fire, stillness, warmth, no agenda.

---

## SEO Status (June 2026)

**Organic keywords ranking:** 1 (branded only — "Three Ponds Estate Temora", pos 1)
**GSC (1 day):** 5 clicks · 23 impressions · 21.74% CTR · 6.7 avg position
**Verdict:** Invisible to non-branded search. Zero non-branded rankings. Every fix below directly addresses this.

**PageSpeed mobile score:** 68/100
- LCP: 6.3s 🔴 (target <2.5s) | FCP: 2.9s ⚠️ | TBT: 110ms ✅ | CLS: 0 ✅

**Site health (Ahrefs, June 2026):** Health score 68. 12 active issues.

---

## Completed Technical Fixes

- [x] **Orphan page (/book) fixed** — `<Link href="/book">Book direct</Link>` added to Footer.tsx Visit nav. All pages now link crawlably to /book.
- [x] **CTA image alt text** — DSC01776.jpg now has descriptive alt text in CTA.tsx.
- [x] **Images compressed** — DSC01766, hero-2-reduced, DSC01832, DSC01805 — user compressed externally.
- [x] **Logo sizes reduced** — beige-logo.png and black-logo.png w= reduced.
- [x] **Vercel confirmed** as primary indexed site (not Lodgify).

**Git commit made:** `fix: add /book to footer nav (orphan page) and CTA image alt text`

---

## Outstanding SEO Tasks (priority order)

See `## SEO Ranking Task List` in this file below.

---

## Competitors (summary)

No NSW competitor uses "Scandinavian accommodation" in positioning — entirely uncontested. Own this.

| Competitor | Location | Price | Key threat |
|---|---|---|---|
| Sierra Escape | Mudgee | $450–692 | NSW Tourism Hall of Fame, strong SEO |
| Evamor Valley | Mudgee | Mid-premium | TV media profile |
| Wilderluxe | Lake Keepit | Premium | Govt-backed PR, growing fast |
| Kimo Estate | Gundagai | $150–400+ | Scale, weddings |
| Nashdale Lane | Orange | $325 | Similar quiet tone, vineyard |

**Recommended positioning:** *"Scandinavian-inspired pods in the open NSW Riverina. Three private retreats designed for the slow morning, the wide horizon, and the kind of quiet you forget you needed."*

---

## Active Campaign: "Winter, Unhurried." (June–Aug 2026)

Meta ads: $45/day testing → $90/day at scale. Run 3 ad variants simultaneously for 2 weeks then cut to winner.
Google Ads: $30/day across 3 campaigns (brand / accommodation / couples).
**Most urgent:** Install Meta Pixel on threepondsestate.com.

Email sequences: fully written — see `Marketing/Campaign/03_Email_Sequences.docx`
Social calendar: fully written — see `Marketing/Campaign/05_Social_Content_Plan.docx`

---

## Deliverables (all in `/Users/callumbett/Documents/Three Ponds Estate/Marketing/Campaign/`)

| File | Contents |
|---|---|
| 01_Brand_Voice.docx | Voice guidelines, vocabulary, taglines, copy fixes |
| 02_Campaign_Plan.docx | Winter campaign, 6-week calendar, KPIs |
| 03_Email_Sequences.docx | 8 complete emails (enquiry nurture + re-engagement) |
| 04_SEO_Audit.docx | Full audit, 20 keywords, 10 blog briefs |
| 05_Social_Content_Plan.docx | 4-week calendar, 5 Canva briefs, 3 Reels shot lists |
| 06_Campaign_Execution.docx | Meta/Google ads, OTA strategy, 8-week timeline, budget |
| 07_Competitive_Brief.docx | 5 competitors, positioning gaps, 5 positioning statements |
| PageSpeed_Insights.md | PageSpeed report (68/100 mobile, LCP 6.3s) |

---

## SEO Ranking Task List
*Goal: Rank #1 for "Temora accommodation" and "Temora NSW accommodation" without branded search.*

### Phase 1 — On-page fixes (status as of Aug 2026 — most shipped in `ec0b151`)

- [x] **Homepage title tag** — resolved differently, deliberately: now
  `Three Ponds Estate | Temora NSW` (~31 chars) because Google was rewriting
  the longer promotional title in SERPs. Don't revert to the keyword-stuffed
  version without discussing.
- [x] **Meta descriptions** — every page now has one, within length limits
  (verified in `SITE_REVIEW_2026-07-13.md`). Pricing copy sitewide now says
  From AU$239 with the 5%/10% savings line.
- [ ] **Homepage H1 visibility** — `sr-only` H1 exists in Hero.tsx
  (*"Three Ponds Estate — boutique accommodation in Temora, NSW"*). Open
  design question whether to surface it visibly as the standfirst.
- [ ] **Expand homepage body copy to 400+ words** — still the single biggest
  on-page ranking factor. Still open.
- [x] **LodgingBusiness schema** — live in `app/layout.tsx` `<head>` with
  address, amenities, images. **Note:** no `aggregateRating` block yet —
  adding one (5.0 / current Google count) would enable gold stars in SERPs.
  Still worth doing.
- [x] **OG tags** — per-page OG titles/descriptions in place.
- [x] **OG image URL bug** — fixed via explicit static image object in
  layout metadata (bypasses the query-string mutation).

### Phase 2 — Content (weeks 2–4, highest SEO ROI)

Priority order — these target keywords with zero competition:

- [ ] **Blog article 1:** *"15 things to do in Temora NSW (and where to stay in style)"*
  Target: `things to do Temora NSW`, `Temora attractions`, `Temora NSW weekend`
  ~1,500 words. Cover: Aviation Museum, Lake Centenary, Canola Trail, Coolamon Cheese, Junee, Bundawarrah, Diamonds & Dust. Internal link to /stay and /book.

- [ ] **Blog article 2:** *"Scandinavian accommodation in the NSW Riverina: inside Three Ponds Estate"*
  Target: `Scandinavian accommodation NSW`, `Scandi barn stay Australia`, `minimalist luxury accommodation NSW`
  ~1,200 words. Zero competitors own this keyword. Could rank #1 nationally within 90 days of publishing.

- [ ] **Blog article 3:** *"The Temora Canola Trail: a complete guide (and where to stay)"*
  Target: `Temora canola trail`, `canola season Temora NSW`, `Riverina canola 2026`
  Publish by late July. Link to Gold Rush Ballooning, Lake Centenary Walk. Internal link to /book.

- [ ] **Blog article 4:** *"Temora Aviation Museum: visitor guide + where to stay across the road"*
  Target: `Temora Aviation Museum accommodation`, `warbird Temora NSW`, `Temora Aviation Museum September 2026`
  Publish before September Showcase.

- [ ] **Create /stay/couples or homepage couples section**
  Target: `couples retreat Riverina NSW`, `romantic getaway Riverina`, `couples accommodation Temora`
  Currently zero couples-specific copy on the site despite couples being primary audience.

- [ ] **Create a gift vouchers page**
  Target: `luxury accommodation gift voucher NSW`, `romantic gift stay NSW`
  Separate revenue stream + separate indexable page.

### Phase 3 — Authority & local SEO (ongoing)

- [ ] **Google Business Profile** — Verify profile is complete:
  - Primary category: "Holiday accommodation" (not Hotel)
  - Add secondary categories: Vacation home rental agency
  - Keyword-rich description with "Scandinavian", "luxury pods", pod names
  - 20+ photos with descriptive filenames (`three-ponds-estate-scandinavian-pod-temora-nsw.jpg`)
  - Booking button pointing to threepondsestate.com/book
  - Respond to every new review within 24 hours (include location keywords naturally)
  - Post a GBP update every 2 weeks

- [ ] **Submit to NSW Tourism Awards** — Only credibility gap vs Sierra Escape. Award badge significantly lifts trust signals and click-through from search.

- [ ] **Submit sitemap and request indexation** in Google Search Console for all pages, especially /book (now linked from footer).

- [ ] **PR pitches** (target for backlinks and discovery):
  - Gourmet Traveller: "Romantic getaways NSW 2026" round-up
  - The Urban List Sydney: "Best weekend getaways from Sydney"
  - theriverina.com.au: "Unique stays in the Riverina" feature
  - Australian Traveller: "Scandinavian design stays Australia"

- [ ] **Add preconnect for SiteMinder** in layout.tsx:
  `<link rel="preconnect" href="https://widget.siteminder.com" />`
  (Saves ~150ms on LCP — currently at 6.3s, target <2.5s)

- [ ] **Add noindex** to booking confirmation URL pattern (`/en/threepondsestate/.../confirmation?...`)

- [ ] **Add `Accommodation` schema** to each pod page for rich snippets.

### The single most important thing for ranking #1 on "Temora accommodation":

Write the homepage body copy and publish Blog Article 1 ("15 things to do in Temora NSW"). Together these establish the site as the local authority on Temora travel. Nothing else will move the needle faster.

---

## Ad Copy — Current Campaigns
*(See separate Ad_Copy.md in this CLAUDE folder for full copy)*

---

## Next Session Checklist

Before starting any work:
1. Have the homepage title tag and meta descriptions been updated?
2. Has homepage body copy been expanded?
3. Has schema markup been added?
4. Has Blog Article 1 been written and published?
5. Has the Meta Pixel been installed?
6. What's the current PageSpeed score? (re-run after image compression)
