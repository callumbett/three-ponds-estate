@AGENTS.md

# Start here — every session

1. **Read `NEXT_SESSION.md` first.** It is the living handoff: current status,
   open threads, and decisions already made. Do not re-plan anything listed
   under "Cutover already done" or reopen decided questions without asking.
2. Booking engine is **Little Hotelier (SiteMinder)** — retained after a
   Lodgify evaluation was reversed (Aug 2026). The Lodgify build is parked on
   the `lodgify-switchback` branch (`b6382fe`, pushed). Do not delete that
   branch, and do not treat its code as current.
3. Marketing/brand context lives in `CLAUDE/TPE_Marketing_Context.md`.
   House voice: editorial restraint — NYT Travel, never booking.com. No
   exclamation marks, no "stunning/amazing/unforgettable".

# How code reaches production

- `main` = staging. Every push → Vercel preview. **Nothing goes live from `main`.**
- `production` = live site. Promote only by fast-forwarding `main` into it.
- Callum runs all git commands himself in the host Terminal. Claude prepares
  command blocks; Claude does not push.

# Rules for command blocks given to Callum (zsh, macOS)

These have all burned us — follow every one:

- **Verify repo state first** (current branch, status, what a merge will
  contain) before writing the block, and state the expected output.
- **No `#` comment lines** — interactive zsh errors on them. Explanations go
  outside the code block.
- **Quote bracketed paths:** `"app/stay/[slug]/page.tsx"` — zsh globs `[...]`.
- **Single-quote commit messages** — double quotes let zsh eat `$239` → `AU/299`.
- Include `rm -f .git/index.lock` when sandbox git activity may have left a
  stale lock.
- Label clearly whether a block is preview-only or **goes live**.

# Cowork sandbox limitations (discovered the hard way)

- No network to registry.npmjs.org → `next build` / `next dev` cannot run in
  the sandbox (Linux SWC binary can't download). Type-check with
  `node_modules/.bin/tsc --noEmit` against a temp tsconfig excluding `.next/`;
  the Vercel preview build is the real gate.
- The sandbox **cannot unlink/replace files** in the mounted repo — `git
  checkout`/`rm` across branches fails half-way and leaves a stale
  `index.lock`. Any git operation that rewrites working-tree files must run
  from Callum's host Terminal.
- File edits via Claude's file tools work fine; that is the correct path for
  content changes.

# Package manager

**pnpm is the mandatory package manager for this project.** Do not use `npm` or `yarn` for any operation.

- Installs: `pnpm install`, `pnpm add <pkg>`, `pnpm add -D <pkg>`
- Scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`
- Lockfile: `pnpm-lock.yaml` is the source of truth. Never generate or commit `package-lock.json` or `yarn.lock`.
- Version: pinned via `packageManager` in `package.json` (currently pnpm 11.5.1), installed on the host. The Cowork sandbox does not have pnpm with network access — `pnpm install` must be run from the host Terminal, not the sandbox.

# Stack gotchas

- Motion library is `motion/react`, **not** `framer-motion` (not installed).
- All colours via `globals.css` tokens (`text-corten`, `bg-parchment`, …).
  Never raw hex in components — breaks dark mode.
- Tailwind v4 (`@theme` + `@custom-variant`), React 19, Next.js 16 App Router.
- Analytics events via `trackEvent` in `lib/analytics.ts`; `book_now_click`
  is the conversion signal Google Ads bids against — never remove a
  call-site without replacing it.
