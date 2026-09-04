# Domain Transfer Runbook — Wix → Vercel

> **STATUS: PARKED (4 Sep 2026).** The owner chose to renew at Wix this
> cycle and leave both registration and DNS where they are. Nothing here
> is scheduled. This document is kept ready for whenever the move is
> picked up — do not start executing it without being asked.
>
> **What was NOT parked:** the SPF / DKIM / DMARC records. Those are
> independent of the registrar and go into the **Wix** DNS panel. See
> `NEXT_SESSION.md` § I — it is the top open item.

> Working document for moving `threepondsestate.com` off Wix and onto
> Vercel as registrar. Written 4 Sep 2026, triggered by the upcoming Wix
> renewal. Tick items off in place as you go.
>
> **Core principle: move DNS first, registration second.** They are
> separate things. Transferring the registration while DNS still lives at
> Wix means Wix drops the zone on the way out and both the site and
> `info@threepondsestate.com` go dark for up to 48 hours. Split in two,
> nothing ever breaks, and everything up to Phase 2 step 7 is reversible.

---

## Three conditions that kill a transfer

1. **The 60-day lock.** ICANN blocks transfer if the domain was
   registered, transferred, or had its *registrant contact details
   edited* within the last 60 days. Do not touch the contact fields in
   Wix now — editing them today means waiting until November.
2. **Expiry too close.** Transfer takes 5–7 days and fails if the domain
   expires mid-flight. If renewal is under 15 days away, renew at Wix
   first. Not wasted money: an inbound transfer adds another year *on top
   of* remaining time.
3. **The EPP code goes to the registrant email on the domain record**,
   which may not be the login address. Identify it first. If it is
   `info@threepondsestate.com`, that is a further reason to fix DNS
   before transferring — a broken mailbox mid-transfer locks you out of
   your own domain.

---

## Current DNS (read from public resolvers, 4 Sep 2026)

| Type | Name | Value |
|---|---|---|
| NS | @ | `ns6.wixdns.net`, `ns7.wixdns.net` |
| A | @ | `216.150.1.1` |
| A | www | `216.150.1.1` |
| MX | @ | `10 aspmx.l.google.com` |
| MX | @ | `20 alt1.aspmx.l.google.com` |
| MX | @ | `30 alt2.aspmx.l.google.com` |
| MX | @ | `40 alt3.aspmx.l.google.com` |
| MX | @ | `50 alt4.aspmx.l.google.com` |
| TXT | @ | `google-site-verification=-KtbBWRxgeedOOCXZWX3Tdum_r1RLPdXbSDPZEZSIrk` |
| TXT | @ | `google-site-verification=rvDsCY92aF5IT31K9paWdfaFXnxAr9SzcTkJWA6PjEI` |

**Those two verification strings are load-bearing.** One holds the Search
Console *Domain property*. Lose it and Search Console un-verifies.

This list cannot prove a negative — only names that were guessed could be
queried. Phase 1 step 3 diffs it against the real Wix zone.

### Missing, and worth fixing during the move

There is **no SPF record, no DKIM key, and no DMARC policy** on this
domain. Google Workspace is sending and receiving with none of the three.
Mail from `info@threepondsestate.com` is therefore more spam-prone and
trivially spoofable — a real risk for a business emailing booking
confirmations. Not caused by the move; fixed as part of it.

---

## Target zone in Vercel

| Type | Name | Value | Priority |
|---|---|---|---|
| MX | @ | `aspmx.l.google.com` | 10 |
| MX | @ | `alt1.aspmx.l.google.com` | 20 |
| MX | @ | `alt2.aspmx.l.google.com` | 30 |
| MX | @ | `alt3.aspmx.l.google.com` | 40 |
| MX | @ | `alt4.aspmx.l.google.com` | 50 |
| TXT | @ | `google-site-verification=-KtbBWRxgeedOOCXZWX3Tdum_r1RLPdXbSDPZEZSIrk` | — |
| TXT | @ | `google-site-verification=rvDsCY92aF5IT31K9paWdfaFXnxAr9SzcTkJWA6PjEI` | — |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` | — **new** |
| TXT | `google._domainkey` | generated in Google Admin — Phase 2 step 4 | — **new** |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@threepondsestate.com; fo=1` | — **new** |

**Do not copy the A records.** On Vercel nameservers, Vercel creates and
maintains apex and `www` itself, including through IP changes on their
side. Hand-adding `216.150.1.1` pins the domain to an address Vercel may
retire.

**Skip CAA.** There is none today and none is wanted. A CAA record naming
the wrong authority silently blocks certificate renewal — the failure
surfaces as a dead site three months later with no obvious cause.

---

## Phase 1 — Establish the facts

*Reversible. Nothing changes.*

- [ ] **1.1** Wix → Domains → `threepondsestate.com`. Note the expiry
      date. Open **Contact Info** and read the registrant email. Write
      both down; change nothing.
- [ ] **1.2** Clear the three stop conditions above.
- [ ] **1.3** Wix → Domains → Advanced → **Edit DNS**. Screenshot every
      section: A, CNAME, MX, TXT, SRV. Diff against the table above.
      Anything at Wix but not in that table must be carried across by
      hand — likely candidates are `_domainconnect`, an `autodiscover`
      CNAME, or a mail-provider CNAME.
- [ ] **1.4** Turn off Private Registration if on — privacy proxies
      swallow transfer emails. This does not trip the 60-day contact
      lock; that is triggered by changing registrant name, email, or
      organisation.
- [ ] **1.5** Vercel → project → Settings → Domains. Confirm both apex
      and `www` are listed and valid.

## Phase 2 — Move DNS to Vercel

*Reversible until step 7.*

The trick to zero downtime: build the new zone completely, verify it
answers correctly, and only then point the world at it. During the 24–48
hours a nameserver change takes to spread, some resolvers ask Wix and
some ask Vercel. If both give identical answers, nobody notices.

- [ ] **2.1** Vercel → Domains → `threepondsestate.com` → **Enable Vercel
      DNS**. Creates an empty zone. No effect on the live site — the
      world is still being told to ask Wix.
- [ ] **2.2** Add the five Google MX records. Easiest route: the **Add
      DNS Preset** dropdown → Google Workspace, which writes all five at
      the correct priorities.
- [ ] **2.3** Add both `google-site-verification` TXT records. Copy
      exactly, including the leading hyphen on the first.
- [ ] **2.4** Generate DKIM. admin.google.com → Apps → Google Workspace →
      Gmail → **Authenticate email** → 2048-bit → **Generate new
      record**. Add the resulting `google._domainkey` TXT to Vercel
      *first*, then return to Google and click **Start authentication**.
- [ ] **2.5** Add SPF and DMARC (values in the target-zone table).
      `p=none` is deliberate: it reports on forgery without rejecting
      anything, so a mistake here cannot bounce a real booking enquiry.
      Tighten to `p=quarantine` after a few clean weeks.
- [ ] **2.6** Verify before switching anything. This is the step that
      makes the move safe:

      dig MX threepondsestate.com +short @ns1.vercel-dns.com
      dig TXT threepondsestate.com +short @ns1.vercel-dns.com
      dig MX threepondsestate.com +short @ns6.wixdns.net
      dig TXT threepondsestate.com +short @ns6.wixdns.net

      Do not continue until the MX lists are identical and every Wix TXT
      string also appears in the Vercel output. Vercel will have three
      extra TXT records (SPF, DKIM, DMARC) — expected.
- [ ] **2.7** **Switch nameservers at Wix.** Domains → Advanced →
      Nameservers → custom: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`.
- [ ] **2.8** Wait 48 hours. Then `dig NS threepondsestate.com +short`
      should return the Vercel pair. Load the site in a private window
      and check the padlock; email `info@` from an outside address **and
      reply to it** — the reply is what proves SPF and DKIM work.

**Rollback:** until the registration moves, Wix is still the registrar
and the nameserver field is still editable. Restoring `ns6`/`ns7.wixdns.net`
reverts everything within the propagation window. Keep the Wix zone
intact — delete nothing there until Phase 4 is done.

## Phase 3 — Transfer the registration

*Point of no return. 5–7 days.*

Only start once Phase 2 has been stable for two full days. DNS already
lives at Vercel by then, so this is pure paperwork and cannot take
anything down.

- [ ] **3.1** Wix → Domains → **Domain Actions** icon → **Transfer away
      from Wix** → **Transfer Domain** → **I Still Want to Transfer**.
      Wix emails the EPP code to the registrant address and unlocks the
      domain.
- [ ] **3.2** vercel.com/dashboard/domains → **Transfer In** → enter the
      domain and paste the code. Vercel charges one year, added to the
      existing expiry rather than replacing it.
- [ ] **3.3** Approve the confirmation email. Ignoring it still works but
      forces the full five-day ICANN wait.
- [ ] **3.4** Leave the Wix account alone until it lands. Cancelling the
      plan, deleting the zone, or editing contacts mid-flight can void
      the transfer and force a 60-day wait.

## Phase 4 — Confirm and close out

- [ ] **4.1** `whois threepondsestate.com | grep -i "registrar:"` —
      should no longer say Wix, and expiry should be a year further out.
- [ ] **4.2** Re-check Search Console (Domain property still verified)
      and Google Business Profile.
- [ ] **4.3** Send from `info@` to a Gmail you control → **Show
      original** → confirm SPF, DKIM and DMARC all read PASS.
- [ ] **4.4** Turn on auto-renew at Vercel. This whole exercise started
      with a renewal date; remove the deadline permanently.
- [ ] **4.5** Only now downgrade or cancel Wix. Wait a further week, and
      screenshot the zone one last time before you do — cancelling loses
      the reference copy.

---

## References

- Vercel — [transferring a domain in](https://vercel.com/kb/guide/how-do-i-transfer-my-domain-to-vercel)
- Vercel — [managing DNS records](https://vercel.com/docs/domains/managing-dns-records)
- Vercel — [working with nameservers](https://vercel.com/docs/domains/working-with-nameservers)
- Wix — [transferring your domain away from Wix](https://support.wix.com/en/article/transferring-your-wix-domain-away-from-wix-2477749)
