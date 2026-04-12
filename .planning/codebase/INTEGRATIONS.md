# External Integrations

**Analysis Date:** 2026-04-10

## Summary

This project is **self-contained**. It has no backend database, no API clients, no server-side third-party SDKs, and no environment variables. All content (projects, copy, contact info, social links, FAQ) ships with the source as static TypeScript modules. External services appear only as outbound links (YouTube thumbnails, IMDB, WhatsApp deep-links).

## Data Layer

**Current state:** Fully static.
- Source of truth: `lib/data/projects.ts` — exports `projects: Project[]` (30 entries, 575 lines) and helpers `getProjectBySlug`, `getProjectsByCategory`, `getFeaturedProjects`, `sortProjectsByDate`, `getAllCategories` (`lib/data/projects.ts:550-575`).
- `Project` interface defined at `lib/data/projects.ts:1-19`.
- Imported directly from Server Components (e.g. `app/page.tsx:2`, `app/portfolio/[slug]/page.tsx:2`, `app/portfolio/category/[category]/page.tsx:2`, `app/sitemap.ts:2`) and from client components (`components/portfolio/PortfolioPageClient.tsx:4`, `components/portfolio/ProjectSlugClient.tsx:3`).

**Supabase removal — verified:**
- Grep for `supabase` across source (excluding `.planning/` history): **zero matches** outside `CLAUDE.md`.
- No `@supabase/supabase-js` in `package.json` dependencies.
- No `lib/supabase.ts` file.
- No `hooks/useProjects.ts` / `hooks/useProject.ts` (the `hooks/` directory no longer exists).
- `next.config.ts` no longer lists the Supabase storage hostname under `images`.
- `CLAUDE.md` is stale on this topic: it still describes the Supabase-based data flow and an `hooks/` directory. Treat this document (and `ARCHITECTURE.md`) as the current state.

## External Services (Outbound Only)

**Video hosts (URLs stored in `Project.video_url`, opened in new tab):**
- YouTube — 33 project links across `lib/data/projects.ts`
- No embedded players, no oEmbed calls, no API keys

**IMDB:**
- Optional `imdb_url` per project (`lib/data/projects.ts:10`), rendered as an outbound link
- Profile link from `lib/social-links.tsx:13` → `https://www.imdb.com/name/nm13638090/`

**Social profiles (`lib/social-links.tsx`):**
- IMDB, LinkedIn, Instagram (visibility toggled via the `visible` flag on each `SocialLink`)
- Icons are inlined SVG `ReactNode`, not fetched

**WhatsApp:**
- Deep link built in `lib/contact-info.ts:14-16` → `https://api.whatsapp.com/send?phone=...&text=...`
- No WhatsApp Business API, no webhook — just a URL
- Widget: `components/ui/WhatsAppLive.tsx`, mounted globally at `app/layout.tsx:115`

**Email / Phone:**
- `mailto:` and `tel:` links generated from `lib/contact-info.ts`
- Values: `lorenzopardell@gmail.com`, `+5511917619699`

## Fonts

- `next/font/google` pulls Geist Sans and Geist Mono at build time (`app/layout.tsx:2,10-18`). Runtime is self-hosted via Next.js font optimization — no runtime request to Google.

## Images / Media

**Storage:**
- Local filesystem under `public/images/projects/{slug}/` — 30 project subdirectories confirmed
- Partner logos under `public/partner_logos/` (HBO, Globoplay, Netflix, etc.)
- OG image at `public/og-image.png`
- No remote image hosts; `next.config.ts` defines no `images.remotePatterns`

**Optimization:**
- `next/image` used throughout (e.g. `components/portfolio/PortfolioCard.tsx:2`); default Next.js image optimizer

## Structured Data (JSON-LD)

Generated server-side at build/render time from static data; **no external call**. Builders in `lib/jsonld.ts`:
- `buildPersonSchema()` — injected in `app/layout.tsx:103`
- `buildLocalBusinessSchema()` — injected in `app/layout.tsx:107`
- `buildCreativeWorkSchema(project)` — injected in `app/portfolio/[slug]/page.tsx:50`
- `buildCollectionSchema(category, projects)` — injected in `app/portfolio/category/[category]/page.tsx:61`
- `buildFAQSchema(entries)` — injected in `app/faq/page.tsx:26`

## SEO Files

- `app/sitemap.ts` — generates sitemap from static routes + `projects` array + categories
- `app/robots.ts` — allows all crawlers, points to `sitemap.xml`
- Canonical URL: `https://lorenzopardell.com` (`app/layout.tsx:72`)

## Authentication & Identity

- None. No login, no session, no auth provider.

## Monitoring & Observability

- None. No Sentry, no Vercel Analytics SDK, no error tracker, no logger.
- `console.log` / `console.error` remain in some client components.

## CI/CD & Deployment

**Hosting:**
- Vercel (confirmed by `.vercel/` directory and deployed URL `https://lorenzopardell.vercel.app`)
- No `vercel.json` — default Next.js build

**CI Pipeline:**
- Not detected. No `.github/workflows/`, no CircleCI, no GitLab CI.
- Only `package.json` scripts: `dev`, `build`, `start`, `lint`

## Environment Configuration

**Required env vars:** none.

**Present `.env*` files:** none at repo root.

**Secrets:** none in source.

## Webhooks & Callbacks

- Incoming: none (no Route Handlers, no `app/api/` directory).
- Outgoing: none.

## API Routes

- None. No `app/api/**/route.ts`, no Server Actions (no `'use server'` directives in source).

---

*Integration audit: 2026-04-10*
