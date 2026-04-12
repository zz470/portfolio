# Technology Stack

**Analysis Date:** 2026-04-10

## Languages

**Primary:**
- TypeScript ^5 — all application code (`.ts`, `.tsx`)
- CSS (Tailwind v4) — styling via `app/globals.css`

**Secondary:**
- JavaScript — legacy `tailwind.config.js` (CommonJS shim; Tailwind v4 config lives in CSS)

## Runtime

**Environment:**
- Node.js — no version pinned (no `.nvmrc`, `.node-version`, or `engines` field in `package.json`). Next.js 15.5 requires Node 18.18+.

**Package Manager:**
- npm — `package-lock.json` (lockfileVersion 3) at `package-lock.json:1`
- No `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb`

## Frameworks

**Core:**
- `next` ^15.5.15 — App Router, React Server Components, file-based routing (`package.json:22`)
- `react` ^19.0.0 / `react-dom` ^19.0.0 — UI layer (`package.json:25-26`)
- Turbopack — dev server via `next dev --turbopack` (`package.json:6`)

**Styling / UI:**
- `tailwindcss` ^4 (devDependency, `package.json:38`)
- `@tailwindcss/postcss` ^4 — PostCSS plugin (`postcss.config.mjs`)
- `tailwindcss-animate` ^1.0.7 — loaded via `@plugin "tailwindcss-animate"` in `app/globals.css`
- shadcn/ui (new-york style, base color `neutral`) — config at `components.json`
- `class-variance-authority` ^0.7.1 — variant helpers for shadcn components
- `clsx` ^2.1.1 + `tailwind-merge` ^3.0.2 — merged via `cn()` in `lib/utils.ts:4`
- `lucide-react` ^0.479.0 — icon library (configured in `components.json:20`)
- `next-themes` ^0.4.6 — installed; no active usage in root layout (`app/layout.tsx` does not wrap with ThemeProvider)

**Animation:**
- `framer-motion` ^12.5.0 — page transitions, scroll-triggered cards, WhatsApp widget (`package.json:20`)

**Forms & Validation:**
- `react-hook-form` ^7.54.2
- `@hookform/resolvers` ^4.1.3
- `zod` ^3.24.2

**Notifications:**
- `sonner` ^2.0.1 — toaster mounted in `app/layout.tsx:116` via `components/ui/sonner.tsx`

**Radix Primitives (shadcn dependencies):**
- `@radix-ui/react-aspect-ratio` ^1.1.2
- `@radix-ui/react-dropdown-menu` ^2.1.6
- `@radix-ui/react-label` ^2.1.2
- `@radix-ui/react-separator` ^1.1.2
- `@radix-ui/react-slot` ^1.1.2
- `radix-ui` ^1.4.3 (umbrella package)

**Build / Dev:**
- `@types/node` ^20, `@types/react` ^19, `@types/react-dom` ^19 (devDependencies)
- TypeScript plugin for Next.js configured in `tsconfig.json:17-19`

**Testing:**
- Not detected. No test runner, no `*.test.*` or `*.spec.*` files, no `jest`/`vitest`/`playwright` dependencies.

## Key Dependencies

**Critical:**
- `next` ^15.5.15 — application framework; SSG via `generateStaticParams`
- `react` ^19 — server + client components
- `framer-motion` — pervasive across client components; removing would break motion across the site
- `tailwindcss` ^4 — all styling; no CSS modules, no styled-components

**Data Layer:**
- None. Project data is a static TypeScript module at `lib/data/projects.ts` (575 lines, 30 project entries). No ORM, no DB client, no fetch-based data source.

**Removed:**
- `@supabase/supabase-js` — previously the sole data source; fully removed from source code. No references remain in `app/`, `components/`, `lib/`, or `hooks/`. Only mentioned in `.planning/` history and `CLAUDE.md` (which is stale on this point).

## Configuration

**TypeScript (`tsconfig.json`):**
- Target: `ES2017`, `lib: ["dom", "dom.iterable", "esnext"]`
- `strict: true`, `moduleResolution: "bundler"`, `jsx: "preserve"`
- Path alias: `@/*` → `./*` (`tsconfig.json:22`)
- Next.js TS plugin enabled

**Next.js (`next.config.ts`):**
- Empty config — no custom image remote patterns, no redirects, no experimental flags. The prior Supabase `images.domains` entry has been removed. All images are served from `public/` and optimized by default `next/image`.

**PostCSS (`postcss.config.mjs`):**
- Single plugin: `@tailwindcss/postcss`

**Tailwind:**
- Legacy `tailwind.config.js` file exists but Tailwind v4 is CSS-first; directives live in `app/globals.css` (`@import "tailwindcss"`, `@plugin "tailwindcss-animate"`)

**Fonts:**
- `next/font/google` — `Geist` and `Geist_Mono` loaded in `app/layout.tsx:10-18`, exposed as `--font-geist-sans` and `--font-geist-mono`

**shadcn (`components.json`):**
- Style: `new-york`, RSC enabled, base color `neutral`, CSS variables on
- Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`

**Environment variables:**
- None required. No `.env*` files present at project root. No `process.env.*` references in source.

## Platform Requirements

**Development:**
- Node.js 18.18+ (implied by Next 15)
- npm

**Production:**
- Vercel — deployed at https://lorenzopardell.vercel.app (canonical `https://lorenzopardell.com` set in `app/layout.tsx:72`)
- `.vercel/` directory present (project linked)
- No `Dockerfile`, no `vercel.json`, no `output: 'standalone'` — default Vercel Next.js build

---

*Stack analysis: 2026-04-10*
