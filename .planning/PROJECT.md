# Lorenzo Pardell Portfolio

## What This Is

A production-ready personal portfolio website for Lorenzo Pardell, a sound professional (sound designer, mixer, boom operator, dialogue editor, re-recording mixer) working in film, TV series, documentaries, and advertisements. Built with Next.js 15 using Server Components for SEO, showcasing 28 projects across multiple categories with local TypeScript data. Fully indexed by search engines with Open Graph social sharing support.

## Core Value

The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, without external database dependencies.

## Current State

**Shipped:** v1.2 Real Project Images (2026-03-27)

The portfolio is production-grade with real project images:
- All 19 projects display real thumbnail and hero photos
- All pages render as Server Components (SEO-indexable HTML)
- Sitemap with 24 routes, robots.txt, Open Graph metadata on every page
- Branded 404 and error recovery pages
- Clean codebase — no console.logs, no dead code, no deprecated APIs
- All images optimized via next/image
- Framer Motion animations preserved via client wrappers

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
- ✓ Animation variants centralized in shared module — v1.1
- ✓ Project sorting utility extracted to shared function — v1.1
- ✓ Contact information centralized in single source file — v1.1
- ✓ Console.log/warn statements removed from production code — v1.1
- ✓ Dead code and unused variables removed — v1.1
- ✓ Bug fixes (CTA background, iframe onError, IntersectionObserver) — v1.1
- ✓ All project images use next/image with fill mode — v1.1
- ✓ Server Components conversion with client animation wrappers — v1.1
- ✓ Sitemap.xml, robots.txt, Open Graph metadata — v1.1
- ✓ Branded 404 page and error boundary — v1.1
- ✓ Real thumbnail and hero images for all 19 projects — v1.2
- ✓ Placeholder SVGs removed — v1.2
- ✓ Homepage hero image (real on-set photo) — v1.2
- ✓ Selected Works uses hero images with featured project selection — v1.2
- ✓ Auto-scrolling carousel for Selected Works when >3 featured projects — v1.2
- ✓ 28 total projects with real images (9 new projects added, details TBD) — v1.2

### Active

None — planning next milestone

### Out of Scope

- CMS integration — content lives in code for now
- Dark mode toggle — CSS vars and dark: classes exist but wiring deferred
- Analytics/visitor tracking — deferred to future milestone
- Site internationalization — English only for now, translation planned later

## Context

- **Architecture**: Next.js 15 App Router, Server Components with client wrappers for Framer Motion animations, direct imports from `lib/data/projects.ts`
- **Data**: 28 projects in typed TypeScript array with helper functions (`getProjectBySlug`, `getProjectsByCategory`, `getFeaturedProjects`). Projects support `featured` flag for homepage selection. Ordered by release date (2026→2018).
- **SEO**: Sitemap (24 routes), robots.txt, OG metadata per page, unique OG title/description per project
- **Images**: Real project photos in `public/images/projects/{project_dir}/` — thumbnails and heroes for all 19 projects. All use next/image with fill mode
- **Tech stack**: Next.js 15.2.2, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion
- **No external dependencies**: No database, no API, no environment variables needed
- **Deploy target**: Vercel (canonical URL: lorenzopardell.com)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| TypeScript data file over MDX | Content is structured fields (not prose); TS gives type safety with zero tooling | ✓ v1.0 |
| Local images in public/ over CDN | Never depend on external service for core assets again | ✓ v1.0 |
| Direct imports over API layer | No need for fetch/hooks pattern when data is local and static | ✓ v1.0 |
| Hybrid RSC + client wrappers | Preserves all Framer Motion animations while enabling SSR for SEO | ✓ v1.1 |
| Static OG image over dynamic | Simple and reliable; upgrade to per-project images when real images are available | ✓ v1.1 |
| next/image fill mode with sizes | Consistent pattern across all components; proper responsive image optimization | ✓ v1.1 |
| Use mixed image formats as-is | Let next/image handle optimization; avoid manual format conversion | ✓ v1.2 |
| Use misnamed no_corre thumbs as-is | Files work correctly despite wrong naming from download | ✓ v1.2 |
| Featured flag on projects for homepage | Flexible selection without hardcoding IDs; latest 3 featured shown | ✓ v1.2 |
| rAF-based carousel over CSS animation | Supports drag, horizontal scroll, and infinite wrap in both directions | ✓ v1.2 |

## Known Issues

- `AboutPageClient.tsx` hardcodes contact info instead of importing from `lib/contact-info.ts` (QUAL-03 minor regression from Phase 6)

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-03-28 after v1.2 milestone + quick tasks*
