<!-- GSD:project-start source:PROJECT.md -->
## Project

**Lorenzo Pardell Portfolio**

A personal portfolio website for Lorenzo Pardell, a sound professional (sound designer, mixer, boom operator, dialogue editor, re-recording mixer) working in film, TV series, documentaries, and advertisements. Built with Next.js 15 App Router, showcasing 30 projects across multiple categories. Deployed at https://lorenzopardell.vercel.app (canonical `https://lorenzopardell.com`).

**Core Value:** The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, as a fully static site with no backend.

### Constraints

- **No backend / no database**: Project data is a static TypeScript module (`lib/data/projects.ts`). Do not reintroduce Supabase or any other data service.
- **Fully SSG**: Every dynamic route must use `generateStaticParams`. No API routes, no Server Actions, no middleware.
- **No breaking changes**: All existing routes and layouts must continue working.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

### Languages
- TypeScript ^5 — all application code (`.ts`, `.tsx`), strict mode
- CSS (Tailwind v4) — styling via `app/globals.css`

### Runtime
- Node.js 18.18+ (required by Next.js 15.5; not pinned via `.nvmrc` or `engines`)
- npm, lockfileVersion 3 (`package-lock.json`)

### Frameworks
- `next` ^15.5.15 — App Router, React Server Components, SSG via `generateStaticParams`
- `react` ^19.0.0 / `react-dom` ^19.0.0
- Turbopack — dev server via `next dev --turbopack`

### Styling / UI
- `tailwindcss` ^4 (devDep) + `@tailwindcss/postcss` ^4 — Tailwind v4 is CSS-first; directives live in `app/globals.css` (`@import "tailwindcss"`, `@plugin "tailwindcss-animate"`). Legacy `tailwind.config.js` exists as a shim.
- `tailwindcss-animate` ^1.0.7
- Dark mode: class-based via `.dark`; design tokens in OKLCH (`app/globals.css`)
- shadcn/ui (new-york style, base color `neutral`) — config at `components.json`
- `class-variance-authority` ^0.7.1, `clsx` ^2.1.1, `tailwind-merge` ^3.0.2 — merged via `cn()` in `lib/utils.ts`
- `lucide-react` ^0.479.0 — icons (mostly used via inline SVG instead)
- Geist Sans + Geist Mono via `next/font/google` in `app/layout.tsx`

### Key Dependencies
- `next` ^15.5.15
- `react` ^19.0.0
- `framer-motion` ^12.5.0 — page transitions, scroll-triggered animations, WhatsApp widget
- Radix primitives: `@radix-ui/react-aspect-ratio`, `react-dropdown-menu`, `react-label`, `react-separator`, `react-slot` (plus `radix-ui` umbrella)
- `react-hook-form` ^7.54.2 + `@hookform/resolvers` ^4.1.3 + `zod` ^3.24.2 — form/validation
- `sonner` ^2.0.1 — toasts, mounted via `components/ui/sonner.tsx`
- `next-themes` ^0.4.6 — installed, not wired into the root layout

### Data Layer
- Static TypeScript module at `lib/data/projects.ts` (~575 lines, 30 project entries)
- Accessor functions: `getFeaturedProjects`, `getProjectBySlug`, `getProjectsByCategory`, `getAllCategories`
- No ORM, no DB client, no fetch-based data source
- **Removed:** `@supabase/supabase-js` — previously the sole data source; fully removed from source. No `hooks/useProjects.ts`, no `lib/supabase.ts`, no Supabase env vars.

### Configuration
- `tsconfig.json` — target ES2017, `strict: true`, `moduleResolution: "bundler"`, path alias `@/*` → `./*`
- `next.config.ts` — **empty** (no custom image remote patterns, no experimental flags)
- `postcss.config.mjs` — single plugin: `@tailwindcss/postcss`
- `components.json` — shadcn aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks` (the `@/hooks` alias is defined but the directory does not exist)
- Environment variables: **none required**. No `.env*` at repo root.

### Testing
- **Not configured.** No test runner, no `*.test.*` / `*.spec.*` files, no jest/vitest/playwright dependency.

### Platform
- Deployed to Vercel at https://lorenzopardell.vercel.app
- `.vercel/` present (linked to `lzo470s-projects/lorenzopardell`)
- GitHub repo: `zz470/portfolio` — Vercel git integration connected
- No `vercel.json`, no `Dockerfile`, no `output: 'standalone'` — default Vercel Next.js build
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

### Naming
- Route files: App Router reserved names (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`)
- Feature components: PascalCase (`HeroSection.tsx`, `PortfolioCard.tsx`, `ProjectSlugClient.tsx`)
- shadcn UI primitives: lowercase kebab-case (`button.tsx`, `card.tsx`, `aspect-ratio.tsx`)
- Custom UI widgets: PascalCase (`WhatsAppLive.tsx`)
- Outliers: `components/navigation/header.tsx`, `components/navigation/footer.tsx`, `components/home/partner-logos.tsx` are lowercase/kebab (historical)
- Functions and variables: camelCase (`getFeaturedProjects`, `featuredProjects`, `isVisible`)
- Types/interfaces: PascalCase with descriptive suffixes (`HeroSectionProps`, `Project`)
- Constants: camelCase (`services`, `navItems`)
- Booleans: prefer `is`/`has` prefix (`isVisible`, `isMobileMenuOpen`)
- The `Project` interface is the primary data model, defined and exported from `lib/data/projects.ts`

### TypeScript
- Strict mode; path alias `@/*` → project root
- Use `interface` for component props (not `type`); declare directly above the component
- Optional fields on `Project` use `?` suffix
- No env var access in source code (none required since Supabase removal)

### Component Patterns
- Functional components only
- Default exports for pages and most feature components
- shadcn primitives use named exports (`export { Button, buttonVariants }`)
- Destructure props in function signature with defaults: `function HeroSection({ title = "...", className = "" })`
- Reusable components accept `className` and merge with `cn()` from `lib/utils.ts`
- `"use client"` only on files that need interactivity, state, browser APIs, or framer-motion. Route files (`app/**/page.tsx`, `layout.tsx`) are Server Components by default; they delegate UI to `components/<feature>/*PageClient.tsx` shells.

### Server vs Client Split
- Every page route is a Server Component that imports `projects` synchronously from `@/lib/data/projects`, computes metadata/JSON-LD, and returns a `*PageClient.tsx` component
- Interactive state (filters, animations, image fallbacks) lives inside the client shells via `useState` / `useRef`
- No global state management; no Context/Redux/Zustand

### Styling
- Tailwind v4 utility classes everywhere, merged via `cn()`
- Container: `max-w-screen-xl mx-auto px-6 md:px-10`
- Mobile-first breakpoints (`md:`, `lg:`)
- Dark mode via `.dark` class on `<html>` (set-up present, no toggle mounted)
- Typography: Geist Sans / Geist Mono via CSS variables `--font-geist-sans`, `--font-geist-mono`
- Brand accent: `orange-500`; hero gradient `bg-gradient-to-r from-orange-400 to-amber-200`
- Icons: mostly inline SVG; `lucide-react` used sparingly (e.g. `ArrowRight` in `SelectedWorks.tsx`)
- Social link icons: inline SVG as `ReactNode` in `lib/social-links.tsx`

### Animation
- `framer-motion` drives all motion
- Shared variants in `lib/animations.ts` (`fadeIn`, `slideUp`, `staggerContainer`)
- Prefer `initial` / `animate` props on `motion.*` elements; `AnimatePresence` for enter/exit
- `useInView` from framer-motion for scroll-triggered reveals (see `PortfolioCard.tsx`)

### Imports
- Always use `@/` prefix for internal imports: `@/components/`, `@/lib/`
- No relative `../` imports across directories

### Error Handling
- `app/error.tsx` is the global error boundary (must be a client component per Next.js contract)
- `notFound()` is called from server pages when a slug or category does not resolve
- `PortfolioCard` handles image load failures via `onError` with a local fallback
- No Sentry, no external error reporting

### Comments
- Keep comments minimal; only explain non-obvious WHY
- Section markers in JSX are acceptable (`{/* Hero Section */}`)
- Do not leave commented-out code

### Module Design
- One component per file
- Types co-located with the code that defines them
- No barrel files (`index.ts`) — imports point at specific files
- UI-level constants are hardcoded in their consuming component (`navItems` in `header.tsx`, `services` in `ServicesSection.tsx`). No centralized constants file.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

### Pattern Overview
- Statically-generated Next.js 15 App Router site with a Server Component shell wrapping interactive client components
- Data is a compiled-in TypeScript module (`lib/data/projects.ts`); there is no backend
- Every dynamic route is prerendered via `generateStaticParams`
- No API routes, no Route Handlers, no Server Actions, no middleware
- Framer Motion drives all animation from the client side
- JSON-LD structured data is injected from Server Components via inline `<script type="application/ld+json">`

### Rendering Strategy
- **Every page is statically generated.** No `dynamic = 'force-dynamic'`, no `revalidate`, no runtime `fetch`
- `app/portfolio/[slug]/page.tsx` `generateStaticParams` returns every `projects[].slug`
- `app/portfolio/category/[category]/page.tsx` `generateStaticParams` returns every unique lowercase category
- `next.config.ts` is empty — default Vercel Next.js build

### Server vs Client Split
**Server Components (no `"use client"`):**
- `app/layout.tsx` — root shell, fonts, global metadata, Person + LocalBusiness JSON-LD
- `app/page.tsx` — homepage; calls `getFeaturedProjects(6)` at render time
- `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`, `app/portfolio/category/[category]/page.tsx`
- `app/about/page.tsx`, `app/services/page.tsx`, `app/faq/page.tsx`
- `app/contact/page.tsx` — the only non-homepage route that renders its body directly (no client shell)
- `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`

**Client Components (`"use client"`):**
- Page-level shells: `PortfolioPageClient`, `CategoryPageClient`, `ProjectSlugClient`, `ProjectLayoutClient`, `AboutPageClient`, `ServicesPageClient`, `FAQPageClient`
- Feature components: `HeroSection`, `SelectedWorks`, `CTASection`, `ServicesSection`, `HomeFAQ`, `ClientQuote`, `PortfolioCard`, `CategoryFilter`, `PortfolioGrid`, the three `PortfolioDetail*` variants, `ProjectAboutCard`, `ProjectDetailsCard`, `ProjectVideoCard`, `ProjectNavigation`
- Navigation chrome: `components/navigation/header.tsx`, `footer.tsx`
- shadcn primitives that use Radix
- `app/error.tsx` (required to be a client component)

**Pattern:** `app/<route>/page.tsx` (Server Component, metadata + SSG plumbing) → `components/<feature>/*PageClient.tsx` (client entry point) → feature components.

### Layers
1. **Route layer — `app/`** — Server Component pages with `metadata`, `generateMetadata`, `generateStaticParams`. Inject JSON-LD. Delegate to client shells.
2. **Feature components — `components/<feature>/`** — client components grouped by feature (`home/`, `portfolio/`, `about/`, `services/`, `faq/`, `navigation/`). Receive data as props or import `projects` directly.
3. **UI primitives — `components/ui/`** — shadcn/ui (new-york) primitives plus the custom `WhatsAppLive.tsx` widget.
4. **Data & utilities — `lib/`** — `lib/data/projects.ts` (project records + accessors), `lib/copy.ts` (page copy), `lib/contact-info.ts`, `lib/social-links.tsx`, `lib/jsonld.ts` (schema.org builders), `lib/animations.ts` (shared framer-motion variants), `lib/utils.ts` (`cn()`).
5. **Static assets — `public/`** — `images/projects/<slug>/`, `partner_logos/`, `og-image.png`, `favicon.ico`.

### Data Flow
**Build time:** `next build` imports `lib/data/projects.ts`, `generateStaticParams` produces one path per slug/category, each prerender resolves its project(s), builds JSON-LD, and passes the data to a client shell.

**Runtime:** Static HTML served with JSON-LD inline → React hydrates the client shells → interactive state lives in `useState`/`useRef` inside the shells. No network requests for data.

### Routing Structure
| Route | File | Type | Notes |
|-------|------|------|-------|
| `/` | `app/page.tsx` | RSC + client sections | Hero, Services, SelectedWorks, CTA, FAQ |
| `/portfolio` | `app/portfolio/page.tsx` | RSC → `PortfolioPageClient` | Grid with category filter |
| `/portfolio/[slug]` | `app/portfolio/[slug]/page.tsx` | SSG, dynamic | Dispatches one of three design variants based on `design_version` |
| `/portfolio/category/[category]` | `app/portfolio/category/[category]/page.tsx` | SSG, dynamic | Filtered grid |
| `/services` | `app/services/page.tsx` | RSC → `ServicesPageClient` | |
| `/about` | `app/about/page.tsx` | RSC → `AboutPageClient` | |
| `/faq` | `app/faq/page.tsx` | RSC → `FAQPageClient` | FAQ JSON-LD injected |
| `/contact` | `app/contact/page.tsx` | RSC (no client shell) | |
| `/sitemap.xml` | `app/sitemap.ts` | Metadata route | |
| `/robots.txt` | `app/robots.ts` | Metadata route | |

**Shared layouts:** `app/layout.tsx` (Header, `<main>`, Footer, `WhatsAppLive`, Sonner Toaster, JSON-LD). `app/portfolio/[slug]/layout.tsx` → `ProjectLayoutClient` adds "Back to Projects" and a gray background.

### Key Abstractions
- **`Project` interface** (`lib/data/projects.ts:1-19`) — fields: `id`, `title`, `slug`, `description`, `thumbnail_url`, `video_url`, `category`, `roles[]`, optional `imdb_url`, `production_company`, `media_platform`, `release_date`, `hero_url`, `design_version`, `featured`, `filmfreeway_url`, `directors[]`
- **Three design variants** for project detail pages — dispatched in `components/portfolio/ProjectSlugClient.tsx:12-18` based on `design_version` (`primary` / `secondary` / `tertiary`). Each variant composes `ProjectAboutCard`, `ProjectDetailsCard`, `ProjectVideoCard`, `ProjectNavigation`.
- **Category-based navigation** — `getAllCategories()` drives filter UI, sitemap, and static params for `/portfolio/category/[category]`
- **Social link visibility toggle** — `lib/social-links.tsx`; consumers call `getVisibleSocialLinks()`

### SEO / Metadata
- Per-page `metadata` or `generateMetadata` (title, description, OpenGraph, Twitter)
- Root metadata in `app/layout.tsx` sets `metadataBase`, template titles, keywords, canonical, default OG image
- JSON-LD injected via `<script dangerouslySetInnerHTML>` from Server Components: Person + LocalBusiness on every page, CreativeWork on project detail, CollectionPage on category, FAQPage on FAQ
- `app/sitemap.ts` regenerates all routes from `projects` + `getAllCategories()`

### Error Handling
- `app/error.tsx` — global error boundary
- `notFound()` called from `app/portfolio/[slug]/page.tsx` and `app/portfolio/category/[category]/page.tsx` when resolution fails
- `PortfolioCard` handles image load failures via `onError` with a local fallback
- No error reporting service
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
