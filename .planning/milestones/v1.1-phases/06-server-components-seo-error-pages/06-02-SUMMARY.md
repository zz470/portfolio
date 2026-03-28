---
phase: 06-server-components-seo-error-pages
plan: 02
subsystem: server-components-seo
tags: [server-components, metadata, og-tags, seo, next15]
dependency_graph:
  requires: [06-01]
  provides: [homepage-server-component, contact-server-component, project-detail-server-component, generateMetadata-per-project, generateStaticParams]
  affects: [app/page.tsx, app/contact/page.tsx, app/portfolio/[slug]/page.tsx, app/portfolio/[slug]/layout.tsx, components/portfolio/ProjectSlugClient.tsx, components/portfolio/ProjectLayoutClient.tsx, components/home/SelectedWorks.tsx]
tech_stack:
  added: []
  patterns: [Next.js generateMetadata async function, generateStaticParams for SSG, Server Component with client child delegation, client wrapper extraction pattern]
key_files:
  created:
    - components/portfolio/ProjectSlugClient.tsx
    - components/portfolio/ProjectLayoutClient.tsx
  modified:
    - app/page.tsx
    - app/contact/page.tsx
    - app/portfolio/[slug]/page.tsx
    - app/portfolio/[slug]/layout.tsx
    - components/home/SelectedWorks.tsx
decisions:
  - Import Project type from lib/data/projects.ts (not hooks/useProjects.ts) since Phase 4 migrated the interface to the data file
  - Added "use client" to SelectedWorks.tsx — uses forwardRef and framer-motion which require client context; plan assumed it already had the directive
metrics:
  duration: 10 min
  completed: "2026-03-27"
  tasks: 2
  files: 7
---

# Phase 06 Plan 02: Server Component Conversion (Homepage, Contact, Project Detail) Summary

Converted homepage, contact, and project detail pages from client to Server Components with metadata exports; project detail gets unique per-project OG title/description via generateMetadata; all 19 project slugs pre-generated via generateStaticParams.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Convert homepage and contact page to Server Components | aa5fed6 | app/page.tsx, app/contact/page.tsx |
| 2 | Convert project detail page and layout to Server Components | de45d8a | app/portfolio/[slug]/page.tsx, app/portfolio/[slug]/layout.tsx, components/portfolio/ProjectSlugClient.tsx, components/portfolio/ProjectLayoutClient.tsx, components/home/SelectedWorks.tsx |

## What Was Built

### app/page.tsx (converted to Server Component)
Removed `"use client"`. Added `export const metadata: Metadata` with `openGraph.images: ["/og-image.png"]`. No title set — root layout default "Lorenzo Pardell | Sound Designer" applies via title template. All child components (HeroSection, ServicesSection, SelectedWorks, CTASection) have `"use client"` so they work as client children of a Server Component.

### app/contact/page.tsx (converted to Server Component)
Removed `"use client"`. Added `export const metadata: Metadata` with `title: "Contact"`, contact-specific description, and `openGraph`. Page calls `getVisibleSocialLinks()` and uses `contactInfo` — both pure functions that work in Server Component context.

### app/portfolio/[slug]/page.tsx (rewritten as async Server Component)
Full rewrite: removed `"use client"`, removed `useParams` hook, added `generateMetadata` using `await params` (Next.js 15 async params pattern), added `generateStaticParams` returning all 19 project slugs, uses `notFound()` from `next/navigation` for missing projects (triggers app/not-found.tsx from Plan 01), delegates rendering to `<ProjectSlugClient project={project} />`.

### components/portfolio/ProjectSlugClient.tsx (new)
Client wrapper component with `"use client"`. Accepts `project: Project` prop. Contains the design_version switch logic (secondary/tertiary/primary), imports `projects` array for `allProjects` prop. Keeps all three PortfolioDetail variants working identically.

### app/portfolio/[slug]/layout.tsx (rewritten as Server Component)
Removed `"use client"`, removed all imports except ProjectLayoutClient. Simple one-liner delegation to `<ProjectLayoutClient>{children}</ProjectLayoutClient>`.

### components/portfolio/ProjectLayoutClient.tsx (new)
Client wrapper with `"use client"`. Contains the `motion.div` animated back button (opacity: 0→1, y: -20→0, duration 0.5s). Preserves exact animation behavior from the original layout. Full structural layout (min-h-screen, gray background, max-w-7xl, flex-grow) moved here.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed missing "use client" on SelectedWorks.tsx**
- **Found during:** Task 2, during `npx next build` verification
- **Issue:** `SelectedWorks.tsx` uses `forwardRef` from React and `motion` from framer-motion — both client-only APIs. The plan stated "all child components are already 'use client'" but SelectedWorks was missing the directive. When the homepage became a Server Component, Next.js attempted to prerender SelectedWorks as a Server Component, resulting in "Element type is invalid: expected a string... but got: undefined" error.
- **Fix:** Added `"use client"` as first line of `components/home/SelectedWorks.tsx`
- **Files modified:** `components/home/SelectedWorks.tsx`
- **Commit:** de45d8a (included in task 2 commit)

**2. [Rule 1 - Bug] Fixed wrong import path for Project type in ProjectSlugClient.tsx**
- **Found during:** Task 2, TypeScript type check during build
- **Issue:** Plan specified `import { Project } from "@/hooks/useProjects"` but Phase 4 migrated the `Project` interface to `lib/data/projects.ts`. The hooks/useProjects.ts module no longer exists (Supabase was removed).
- **Fix:** Used `import { Project, projects } from "@/lib/data/projects"` — single import combining type and data
- **Files modified:** `components/portfolio/ProjectSlugClient.tsx`
- **Commit:** de45d8a

## Known Stubs

None — all data is wired from live TypeScript source (`lib/data/projects.ts`). The `/og-image.png` placeholder is documented in Plan 01's stubs section and remains out of scope here.

## Self-Check: PASSED

- app/page.tsx (no "use client"): FOUND
- app/page.tsx (export const metadata): FOUND
- app/contact/page.tsx (no "use client"): FOUND
- app/contact/page.tsx (export const metadata): FOUND
- app/portfolio/[slug]/page.tsx (generateMetadata): FOUND
- app/portfolio/[slug]/page.tsx (generateStaticParams): FOUND
- components/portfolio/ProjectSlugClient.tsx ("use client"): FOUND
- components/portfolio/ProjectLayoutClient.tsx ("use client"): FOUND
- app/portfolio/[slug]/layout.tsx (no "use client"): FOUND
- Commit aa5fed6: FOUND
- Commit de45d8a: FOUND
- Build: PASSED (30 static pages generated, 19 project slugs pre-built)
