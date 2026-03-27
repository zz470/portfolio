# Lorenzo Pardell Portfolio

## What This Is

A personal portfolio website for Lorenzo Pardell, a sound professional (sound designer, mixer, boom operator, dialogue editor, re-recording mixer) working in film, TV series, documentaries, and advertisements. Built with Next.js 15, showcasing 19 projects across multiple categories.

## Core Value

The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, without external database dependencies.

## Requirements

### Validated

- ✓ Portfolio grid with category filtering — existing
- ✓ Individual project detail pages with slug-based routing — existing
- ✓ Multiple detail page layouts (primary/secondary/tertiary design versions) — existing
- ✓ Homepage with hero, services preview, featured projects — existing
- ✓ About page with bio and social links — existing
- ✓ Services page — existing
- ✓ Contact page with WhatsApp link — existing
- ✓ Framer Motion page transitions and animations — existing
- ✓ Dark mode support via next-themes — existing
- ✓ Responsive design with Tailwind CSS v4 — existing

### Active

(None — all milestone v1.0 requirements complete)

### Completed in Phase 3

- ✓ Ensure all existing pages continue working with local data — Phase 3 (automated + visual verification)

### Completed in Phase 2

- ✓ Remove Supabase dependency entirely (client, hooks, env vars, config) — Phase 2
- ✓ Convert client-side data fetching hooks to direct imports — Phase 2

### Completed in Phase 1

- ✓ Migrate project data from Supabase to local TypeScript data files — Phase 1
- ✓ Replace Supabase Storage image URLs with local placeholder images — Phase 1

### Out of Scope

- Redesign or visual changes — this is a data migration only
- CMS integration — content lives in code for now
- Image sourcing — user will download and replace placeholders later
- New features or pages — maintain current functionality

## Context

- **Brownfield migration**: Existing Next.js 15 App Router site with Supabase as sole data source
- **Supabase project paused**: Free tier project paused >90 days, cannot be unpaused. Database backup available but Storage (S3) files are lost
- **Data recovered**: All 19 project records extracted from Postgres backup (titles, descriptions, slugs, categories, roles, video URLs, IMDB links, production companies, release dates, design versions)
- **Images not recoverable**: Thumbnail and hero images were in Supabase Storage (S3), not included in database backup. Using placeholders until user re-downloads originals
- **Current architecture**: All pages are client components using direct imports from `lib/data/projects.ts`. Supabase fully removed. No server components beyond root layout
- **Tech stack**: Next.js 15.2.2, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion

## Constraints

- **No Supabase**: Must completely remove the Supabase dependency — no client, no env vars
- **No breaking changes**: All existing routes and layouts must continue working
- **Placeholder images**: Use generated placeholders; user will replace with real images later
- **Minimal changes**: Only change what's necessary for the migration

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| TypeScript data file over MDX | Content is structured fields (not prose); TS gives type safety with zero tooling | ✓ Phase 1 |
| Local images in public/ over CDN | Never depend on external service for core assets again | ✓ Phase 1 |
| Direct imports over API layer | No need for fetch/hooks pattern when data is local and static | ✓ Phase 2 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-26 after Phase 3 completion — all milestone v1.0 phases complete*
