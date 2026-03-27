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

### Active

- [ ] Server Components conversion for pages with static content
- [ ] Sitemap.xml and robots.txt generation
- [ ] Open Graph and social sharing metadata per page
- [ ] Error boundary (error.tsx) and custom 404 page (not-found.tsx)
- [ ] Remove all console.log/warn statements from production code
- [ ] Centralize animation variants into shared module
- [ ] Extract shared project sorting utility
- [ ] Centralize hardcoded contact information
- [ ] Fix CTA section background overlay bug
- [ ] Fix iframe onError handler in ProjectVideoCard
- [ ] Fix IntersectionObserver cleanup stale ref
- [ ] Replace raw `<img>` tags with next/image
- [ ] Remove unused variables and dead code
- [ ] Fix deprecated images.domains config

### Out of Scope

- CMS integration — content lives in code for now
- Image sourcing — user will download and replace placeholders
- Dark mode toggle — CSS vars and dark: classes exist but wiring deferred
- Analytics/visitor tracking — deferred to future milestone

## Context

- **Architecture**: Next.js 15 App Router, all client components, direct imports from `lib/data/projects.ts`
- **Data**: 19 projects in typed TypeScript array with helper functions (`getProjectBySlug`, `getProjectsByCategory`, `getFeaturedProjects`)
- **Images**: Placeholder SVGs in `public/images/projects/` — user will replace with real images
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
*Last updated: 2026-03-27 after v1.1 milestone start*
