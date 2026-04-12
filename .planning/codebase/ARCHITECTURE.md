# Architecture

**Analysis Date:** 2026-04-10

## Pattern Overview

**Overall:** Statically-generated Next.js 15 App Router site with a server-component shell wrapping interactive client components. Data is a compiled-in TypeScript module; there is no backend.

**Key Characteristics:**
- App Router with React 19 + React Server Components
- Route files (`app/**/page.tsx`) are **Server Components**; they import data synchronously from `@/lib/data/projects` and delegate UI to client components named `*PageClient.tsx`
- SSG for every dynamic route via `generateStaticParams`
- No API routes, no Route Handlers, no Server Actions, no middleware
- No client-side data fetching, no loading spinners for data (data is present at render time)
- Framer Motion drives all animation from the client side
- JSON-LD structured data injected from Server Components via inline `<script type="application/ld+json">`

## Rendering Strategy

**All pages are statically generated.** None of the page files use `dynamic = 'force-dynamic'`, `revalidate`, or `fetch(...)`. Dynamic segments pre-render their full set of params:

- `app/portfolio/[slug]/page.tsx:40-42` — `generateStaticParams` returns every `projects[].slug`
- `app/portfolio/category/[category]/page.tsx:39-42` — returns every unique lowercase category

`next.config.ts` is empty, so default build output is Vercel's Next.js adapter (server rendering enabled but unused at runtime since every route is prerendered).

## Server vs Client Split

**Server Components (no `"use client"`):**
- `app/layout.tsx` — root shell, font loading, global metadata, JSON-LD
- `app/page.tsx` — homepage; calls `getFeaturedProjects(6)` at render time (`app/page.tsx:24`)
- `app/portfolio/page.tsx` — thin wrapper returning `<PortfolioPageClient />`
- `app/portfolio/[slug]/page.tsx` — resolves project via `getProjectBySlug`, injects JSON-LD, renders `<ProjectSlugClient />`
- `app/portfolio/[slug]/layout.tsx` — thin wrapper returning `<ProjectLayoutClient />`
- `app/portfolio/category/[category]/page.tsx` — resolves category, injects JSON-LD
- `app/about/page.tsx`, `app/services/page.tsx`, `app/faq/page.tsx` — metadata + client wrapper
- `app/contact/page.tsx` — fully server-rendered page body (the only non-homepage route without a `*PageClient`); imports static config and renders JSX directly
- `app/not-found.tsx` — static 404
- `app/sitemap.ts`, `app/robots.ts` — metadata route handlers

**Client Components (`"use client"`):** 25 files, covering all interactivity:
- All shadcn UI primitives that use Radix (`accordion`, `dropdown-menu`, `form`, `label`, `sonner`, `separator`, `aspect-ratio`)
- All animated surfaces (`HeroSection`, `SelectedWorks`, `CTASection`, `ServicesSection`, `HomeFAQ`, `ClientQuote`, `PortfolioCard`, detail variants, `ProjectLayoutClient`)
- Navigation (`header.tsx`, `footer.tsx`)
- Page-level interactivity shells (`PortfolioPageClient`, `CategoryPageClient`, `ProjectSlugClient`, `AboutPageClient`, `ServicesPageClient`, `FAQPageClient`)
- `app/error.tsx` (error boundary — must be client per Next.js contract)
- `app/portfolio/loading.tsx` (React Suspense fallback — but unused since pages are statically generated and data is synchronous)

**Pattern:** Every interactive page follows `app/foo/page.tsx` (Server Component with metadata + SSG plumbing) → `components/foo/FooPageClient.tsx` (`"use client"` entry point) → feature components. The server file is ~20 lines and exists mainly to satisfy Next.js conventions for metadata and static params.

## Layers

**1. Route layer — `app/`**
- Server Component pages containing `metadata`, `generateMetadata`, `generateStaticParams`
- Delegate rendering to `components/<feature>/` client shells
- Inject JSON-LD for SEO

**2. Feature components — `components/<feature>/`**
- Client components grouped by feature (`home/`, `portfolio/`, `about/`, `services/`, `faq/`, `navigation/`)
- Receive pre-fetched data as props from server pages, or import `projects` directly when they live inside a client shell

**3. UI primitives — `components/ui/`**
- shadcn/ui (new-york) primitives: `button`, `card`, `badge`, `input`, `form`, `accordion`, `dropdown-menu`, `skeleton`, etc.
- `WhatsAppLive.tsx` (custom floating widget) also lives here

**4. Data & utilities — `lib/`**
- `lib/data/projects.ts` — project records + accessor functions (sole data source)
- `lib/copy.ts` — page copy (titles, descriptions, FAQ, meta)
- `lib/contact-info.ts` — email/phone/WhatsApp helpers
- `lib/social-links.tsx` — social profile list with inline SVG icons
- `lib/jsonld.ts` — schema.org builders (Person, LocalBusiness, CreativeWork, CollectionPage, FAQPage)
- `lib/animations.ts` — shared framer-motion variants (`fadeIn`, `slideUp`, `staggerContainer`)
- `lib/utils.ts` — `cn()` className merger

**5. Static assets — `public/`**
- `public/images/projects/<slug>/` — thumbnail + hero images per project
- `public/partner_logos/` — white-on-transparent client/platform logos
- `public/og-image.png`, `public/favicon.ico`

## Data Flow

**Build time:**
1. `next build` imports `lib/data/projects.ts`
2. `app/portfolio/[slug]/page.tsx`'s `generateStaticParams` produces one path per project slug
3. `app/portfolio/category/[category]/page.tsx`'s `generateStaticParams` produces one path per unique category
4. Each prerender resolves its project(s) via `getProjectBySlug` / `getProjectsByCategory`, builds JSON-LD, and passes the data to a client shell

**Runtime (browser):**
1. Static HTML is served with JSON-LD inline
2. React hydrates the client shells
3. Interactive state (category filter, scroll-triggered animations, image error fallbacks) lives in `useState` / `useRef` inside those shells
4. No network requests for data — `projects` is shipped in the JS bundle via the client component imports (`components/portfolio/PortfolioPageClient.tsx:4`, `components/portfolio/ProjectSlugClient.tsx:3`)

**State management:**
- Local `useState` only; no Context, Redux, Zustand, Jotai, or React Query
- Category filter state held in `PortfolioPageClient` (`useState<string | null>`)
- Image load/error state held per `PortfolioCard`

## Routing Structure

| Route | File | Type | Notes |
|-------|------|------|-------|
| `/` | `app/page.tsx` | RSC → client sections | Hero + Services + SelectedWorks + CTA + FAQ |
| `/portfolio` | `app/portfolio/page.tsx` | RSC → `PortfolioPageClient` | Grid with category filter |
| `/portfolio/[slug]` | `app/portfolio/[slug]/page.tsx` | SSG, dynamic | One of three design variants based on `project.design_version` |
| `/portfolio/category/[category]` | `app/portfolio/category/[category]/page.tsx` | SSG, dynamic | Filtered grid |
| `/services` | `app/services/page.tsx` | RSC → `ServicesPageClient` | |
| `/about` | `app/about/page.tsx` | RSC → `AboutPageClient` | |
| `/faq` | `app/faq/page.tsx` | RSC → `FAQPageClient` | FAQ JSON-LD injected |
| `/contact` | `app/contact/page.tsx` | RSC (no client shell) | Directly renders JSX |
| `/sitemap.xml` | `app/sitemap.ts` | Metadata route | |
| `/robots.txt` | `app/robots.ts` | Metadata route | |

**Shared layouts:**
- `app/layout.tsx` — Header, `<main>`, Footer, WhatsAppLive widget, Sonner Toaster, two JSON-LD scripts
- `app/portfolio/[slug]/layout.tsx` → `ProjectLayoutClient` — adds "Back to Projects" button and gray background for the detail pages

**Loading states:**
- `app/portfolio/loading.tsx` — skeleton grid (rarely displayed because pages are prerendered)
- `app/portfolio/[slug]/loading.tsx`, `app/services/loading.tsx` — present but minimal

## Key Abstractions

**`Project` interface (`lib/data/projects.ts:1-19`):**
- Fields: `id`, `title`, `slug`, `description`, `thumbnail_url`, `video_url`, `category`, `roles[]`, optional `imdb_url`, `production_company`, `media_platform`, `release_date` (numeric year), `hero_url`, `design_version` (`"primary"` | `"secondary"` | `"tertiary"`), `featured`, `filmfreeway_url`, `directors[]`
- Exported and re-imported wherever projects are displayed

**Three design variants for project detail pages:**
- Selection logic in `components/portfolio/ProjectSlugClient.tsx:12-18`
- `design_version === "secondary"` → `PortfolioDetailSecondary`
- `design_version === "tertiary"` → `PortfolioDetailTertiary`
- default / `"primary"` → `PortfolioDetail`
- Each variant composes from the same sub-components: `ProjectAboutCard`, `ProjectDetailsCard`, `ProjectVideoCard`, `ProjectNavigation`

**Category-based navigation:**
- `getAllCategories()` (`lib/data/projects.ts:573`) drives the category filter, sitemap, and static params for `/portfolio/category/[category]`

**Social link visibility toggle:**
- `lib/social-links.tsx` — each `SocialLink` has a `visible: boolean`; consumers call `getVisibleSocialLinks()` (used in `footer.tsx`, `app/contact/page.tsx`, `AboutPageClient.tsx`)

## Error Handling

- `app/error.tsx` — global error boundary (client component per Next.js contract); offers "Try Again" and "Return Home"
- `app/not-found.tsx` — 404 page; triggered by `notFound()` calls in `app/portfolio/[slug]/page.tsx:48` and `app/portfolio/category/[category]/page.tsx:52,58`
- `PortfolioCard` handles image load failures via `onError` → `setImageError(true)` with a local fallback
- No error reporting service, no Sentry

## SEO / Metadata Strategy

- Per-page `metadata` (or `generateMetadata` for dynamic routes) supplies title, description, OpenGraph, Twitter
- Root metadata in `app/layout.tsx:20-90` defines `metadataBase`, template-based titles, keywords, canonical, default OG image
- JSON-LD injected via `<script dangerouslySetInnerHTML>` in server components:
  - Person + LocalBusiness at the root (every page)
  - CreativeWork on project detail pages
  - CollectionPage on category pages
  - FAQPage on the FAQ page
- `app/sitemap.ts` regenerates all routes from `projects` + `getAllCategories()`
- `app/robots.ts` allows all

## Cross-Cutting Concerns

**Fonts:** Geist Sans/Mono via `next/font/google` in `app/layout.tsx:10-18`, exposed as CSS variables on `<body>`.

**Styling:** Tailwind v4 via `app/globals.css`; `cn()` helper (`lib/utils.ts:4`) merges classNames. Dark mode via `.dark` class (set-up present but no theme toggle mounted).

**Animation:** `framer-motion` imported in almost every client component; shared variants in `lib/animations.ts`.

**Copy/content:** Centralized in `lib/copy.ts` (consumed by About, Services, Contact, FAQ, metadata).

**Navigation chrome:** `Header` and `Footer` from `components/navigation/` are always mounted via the root layout.

---

*Architecture analysis: 2026-04-10*
