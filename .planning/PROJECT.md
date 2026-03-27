# Lorenzo Pardell Portfolio

## What This Is

A personal portfolio website for Lorenzo Pardell, a sound professional (sound designer, mixer, boom operator, dialogue editor, re-recording mixer) working in film, TV series, documentaries, and advertisements. Built with Next.js 15, showcasing 19 projects across multiple categories with local TypeScript data.

## Core Value

The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, without external database dependencies.

## Current Milestone: v1.1 Production Readiness & Code Quality

**Goal:** Make the portfolio production-grade — SEO-visible, bug-free, and maintainable.

**Target features:**
- Server Components conversion for SEO and performance
- SEO infrastructure (sitemap, robots.txt, Open Graph metadata)
- Error/404 pages
- Remove production console.logs
- Centralize duplicated code (animations, sorting, contact info)
- Fix known bugs (CTA background, iframe onError, IntersectionObserver)
- Replace `<img>` with `next/image`
- Clean up dead code and deprecated config

## Requirements

### Validated

- ✓ Portfolio grid with category filtering — v1.0
- ✓ Individual project detail pages with slug-based routing — v1.0
- ✓ Multiple detail page layouts (primary/secondary/tertiary design versions) — v1.0
- ✓ Homepage with hero, services preview, featured projects — v1.0
- ✓ About page with bio and social links — v1.0
- ✓ Services page — v1.0
- ✓ Contact page with WhatsApp link — v1.0
- ✓ Framer Motion page transitions and animations — v1.0
- ✓ Dark mode support via next-themes — v1.0
- ✓ Responsive design with Tailwind CSS v4 — v1.0
- ✓ Local TypeScript data file with 19 project records — v1.0
- ✓ Supabase fully removed (client, hooks, env vars, config) — v1.0
- ✓ All routes and interactive features verified working — v1.0
- ✓ Animation variants centralized in shared module — v1.1 Phase 4
- ✓ Project sorting utility extracted to shared function — v1.1 Phase 4
- ✓ Contact information centralized in single source file — v1.1 Phase 4
- ✓ Console.log/warn statements removed from production code — v1.1 Phase 4
- ✓ Dead code and unused variables removed — v1.1 Phase 4
- ✓ iframe onError handler fixed with state-based approach — v1.1 Phase 4
- ✓ IntersectionObserver dead code removed — v1.1 Phase 4
- ✓ All project images use next/image with fill mode and sizes props — v1.1 Phase 5
- ✓ No deprecated images.domains config (confirmed clean) — v1.1 Phase 5

- ✓ All pages converted to Server Components with client wrappers for animations — v1.1 Phase 6
- ✓ Sitemap.xml with all 24 routes (5 static + 19 projects) — v1.1 Phase 6
- ✓ Robots.txt allowing all crawlers — v1.1 Phase 6
- ✓ Open Graph metadata on every page with static placeholder image — v1.1 Phase 6
- ✓ Project detail pages have unique OG title/description per project — v1.1 Phase 6
- ✓ Branded 404 page with navigation back to home — v1.1 Phase 6
- ✓ Error boundary with retry and go-home recovery — v1.1 Phase 6

### Active

None — all v1.1 requirements complete

### Out of Scope

- CMS integration — content lives in code for now
- Image sourcing — user will download and replace placeholders
- Dark mode toggle — CSS vars and dark: classes exist but wiring deferred
- Analytics/visitor tracking — deferred to future milestone

## Context

- **Architecture**: Next.js 15 App Router, Server Components with client wrappers for Framer Motion animations, direct imports from `lib/data/projects.ts`
- **Data**: 19 projects in typed TypeScript array with helper functions (`getProjectBySlug`, `getProjectsByCategory`, `getFeaturedProjects`)
- **Images**: Placeholder SVGs in `public/images/projects/` — user will replace with real images. All project images use next/image with fill mode for automatic optimization and lazy loading
- **Tech stack**: Next.js 15.2.2, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion
- **No external dependencies**: No database, no API, no environment variables needed

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| TypeScript data file over MDX | Content is structured fields (not prose); TS gives type safety with zero tooling | ✓ v1.0 |
| Local images in public/ over CDN | Never depend on external service for core assets again | ✓ v1.0 |
| Direct imports over API layer | No need for fetch/hooks pattern when data is local and static | ✓ v1.0 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-03-27 after v1.1 Phase 6 completion (milestone complete)*
