@AGENTS.md

# Package manager

**pnpm is the mandatory package manager for this project.** Do not use `npm` or `yarn` for any operation.

- Installs: `pnpm install`, `pnpm add <pkg>`, `pnpm add -D <pkg>`
- Scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`
- Lockfile: `pnpm-lock.yaml` is the source of truth. Never generate or commit `package-lock.json` or `yarn.lock`.
- Version: pnpm 10.33.2 or later, installed on the host. The Cowork sandbox does not have pnpm with network access — `pnpm install` must be run from the host Terminal, not the sandbox.
