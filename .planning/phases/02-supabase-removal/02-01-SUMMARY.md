---
phase: 02-supabase-removal
plan: 01
subsystem: data-layer
tags: [migration, imports, supabase-removal, data-layer]
dependency_graph:
  requires: []
  provides: [local-data-imports, no-supabase-hooks-in-consumers]
  affects: [app/page.tsx, app/portfolio/page.tsx, app/portfolio/[slug]/page.tsx, components/home, components/portfolio]
tech_stack:
  added: []
  patterns: [direct-import, type-import]
key_files:
  created:
    - public/images/hero-placeholder.svg
  modified:
    - app/page.tsx
    - app/portfolio/page.tsx
    - app/portfolio/[slug]/page.tsx
    - components/home/SelectedWorks.tsx
    - components/home/HeroSection.tsx
    - components/portfolio/PortfolioCard.tsx
    - components/portfolio/PortfolioGrid.tsx
    - components/portfolio/PortfolioDetail.tsx
    - components/portfolio/PortfolioDetailSecondary.tsx
    - components/portfolio/PortfolioDetailTertiary.tsx
    - components/portfolio/ProjectDetailsCard.tsx
    - components/portfolio/ProjectAboutCard.tsx
    - components/portfolio/ProjectVideoCard.tsx
    - components/portfolio/ProjectNavigation.tsx
decisions:
  - "Used `import { type Project }` syntax for type-only imports in components, aligning with TypeScript best practices"
  - "Removed loading/error state scaffolding from all pages since local data is synchronous"
metrics:
  duration: 2m
  completed_date: "2026-03-26"
  tasks_completed: 2
  files_modified: 14
  files_created: 1
---

# Phase 02 Plan 01: Rewire Consumer Imports Summary

**One-liner:** Replaced all useProjects/useProject hook imports with direct imports from @/lib/data/projects across 3 page files and 11 component files, eliminating Supabase async loading/error patterns and a hardcoded Supabase storage URL.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Rewire page-level imports and simplify data flow | 7686791 | app/page.tsx, app/portfolio/page.tsx, app/portfolio/[slug]/page.tsx |
| 2 | Update component imports and fix HeroSection Supabase URL | b17b59e | 11 component files + hero-placeholder.svg |

## What Was Done

### Task 1: Page-Level Rewiring

**app/page.tsx**
- Replaced `useProjects` hook with `getFeaturedProjects(3)` direct call
- Removed async state (`projects`, `loading`)
- Replaced computed `featuredProjects` sort/slice logic with single function call
- Passed `isLoading={false}` to SelectedWorks (prop retained for interface compatibility)

**app/portfolio/page.tsx**
- Replaced `useProjects` hook with direct `projects` import
- Removed `loading`, `error` state destructuring
- Removed the error return block entirely
- Simplified `categories` and `filteredProjects` useMemo (removed null guards)

**app/portfolio/[slug]/page.tsx**
- Replaced `useProject` + `useProjects` hooks with `getProjectBySlug` + `projects` direct imports
- Removed combined `loading` and `error` variables
- Removed entire loading state UI block (animated skeleton card)
- Changed error guard from `if (error || !project)` to `if (!project)` — only "not found" case remains
- Removed 6 `console.log` statements
- Changed `projects || []` to `projects` on all three design version renders

### Task 2: Component Import Updates

All 10 components (9 portfolio + 1 home/SelectedWorks) had their `import { Project } from "@/hooks/useProjects"` changed to `import { type Project } from "@/lib/data/projects"`. No logic, props, or JSX was altered.

**HeroSection.tsx**: Replaced hardcoded Supabase signed URL (1-year expiry token) for `backgroundImageUrl` default with `/images/hero-placeholder.svg`. Created the placeholder SVG at `public/images/hero-placeholder.svg` (1920x1080, dark gray #1a1a1a).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- `public/images/hero-placeholder.svg` — intentional placeholder; user will replace with real hero image. Tracked per project constraint: "Placeholder images: Use generated placeholders; user will replace with real images later."

## Self-Check: PASSED

Files exist:
- app/page.tsx: FOUND
- app/portfolio/page.tsx: FOUND
- app/portfolio/[slug]/page.tsx: FOUND
- components/home/HeroSection.tsx: FOUND
- public/images/hero-placeholder.svg: FOUND

Commits exist:
- 7686791: FOUND
- b17b59e: FOUND
