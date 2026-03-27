---
phase: 02-supabase-removal
plan: 02
subsystem: cleanup
tags: [supabase-removal, cleanup, build-verification]
dependency_graph:
  requires: [02-01]
  provides: [no-supabase-package, no-supabase-env, no-supabase-config, clean-build]
  affects: [package.json, next.config.ts, hooks/, lib/supabase.ts, components/home/HeroSection.tsx]
tech_stack:
  added: []
  patterns: []
key_files:
  created:
    - lib/data/projects.ts
    - public/images/hero-placeholder.svg
    - public/images/projects/placeholder-hero.svg
    - public/images/projects/placeholder-thumb.svg
  modified:
    - next.config.ts
    - package.json
    - app/page.tsx
    - app/portfolio/page.tsx
    - app/portfolio/[slug]/page.tsx
    - components/home/HeroSection.tsx
    - components/home/SelectedWorks.tsx
    - components/portfolio/PortfolioCard.tsx
    - components/portfolio/PortfolioGrid.tsx
    - components/portfolio/PortfolioDetail.tsx
    - components/portfolio/PortfolioDetailSecondary.tsx
    - components/portfolio/PortfolioDetailTertiary.tsx
    - components/portfolio/ProjectDetailsCard.tsx
    - components/portfolio/ProjectAboutCard.tsx
    - components/portfolio/ProjectVideoCard.tsx
    - components/portfolio/ProjectNavigation.tsx
  deleted:
    - hooks/useProjects.ts
    - hooks/useProject.ts
    - lib/supabase.ts
    - .env.local
decisions:
  - "Copied lib/data/projects.ts and consumer rewiring from main repo since parallel worktree did not inherit Plan 01 changes"
  - "Copied placeholder SVG images from main repo to worktree public/images/"
metrics:
  duration: 3m
  completed_date: "2026-03-27"
  tasks_completed: 2
  files_modified: 16
  files_created: 4
  files_deleted: 4
---

# Phase 02 Plan 02: Remove Supabase Artifacts Summary

**One-liner:** Deleted all Supabase source files (hooks, client, env vars), uninstalled the npm package, cleaned next.config.ts image domains, and fixed all consumer imports — resulting in a clean `next build` with zero Supabase references.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Delete Supabase files and clean configuration | fcc7deb | hooks/useProjects.ts (deleted), hooks/useProject.ts (deleted), lib/supabase.ts (deleted), next.config.ts, package.json, package-lock.json |
| 2 | Verify full build passes with no Supabase references | 83001de | lib/data/projects.ts, public/images/, app/page.tsx, app/portfolio/page.tsx, app/portfolio/[slug]/page.tsx, 11 component files |

## What Was Done

### Task 1: Delete Supabase Files and Clean Configuration

- Deleted `hooks/useProjects.ts` and `hooks/useProject.ts` (the async Supabase fetch hooks)
- Deleted `lib/supabase.ts` (the Supabase client initialization file)
- Removed the now-empty `hooks/` directory
- Ran `npm uninstall @supabase/supabase-js` — removed from package.json dependencies and node_modules
- Rewrote `next.config.ts` to remove the `images.domains` block for `crxuhqqswealopkmdpxq.supabase.co`
- Note: `.env.local` was already absent from this worktree (not created)

### Task 2: Verify Full Build and Fix Remaining References

During codebase scan, discovered this parallel worktree had not inherited the consumer rewiring from Plan 01 (Plan 01 ran in a different agent worktree and its commits were not present). Applied Rule 3 (blocking issue) and Rule 1 (bug fix) to resolve:

- **Rule 1 - Bug**: `HeroSection.tsx` still had hardcoded Supabase signed URL as `backgroundImageUrl` default — replaced with `/images/hero-placeholder.svg`
- **Rule 3 - Blocking**: All 3 page files and 11 component files still imported from `@/hooks/useProjects` or `@/hooks/useProject` — which no longer exist after Task 1. Copied rewired versions from the main repo (where Plan 01 had committed changes)
- Copied `lib/data/projects.ts` (19 real project records) and `public/images/` placeholder SVGs from main repo
- Re-ran build verification: `next build` exits with code 0, all 9 routes generate successfully

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed leftover Supabase signed URL in HeroSection.tsx**
- **Found during:** Task 2 (codebase scan)
- **Issue:** `backgroundImageUrl` default parameter still contained the full Supabase Storage signed URL with JWT token
- **Fix:** Replaced with `/images/hero-placeholder.svg`
- **Files modified:** `components/home/HeroSection.tsx`
- **Commit:** 83001de

**2. [Rule 3 - Blocking] Rewired all consumer imports in parallel worktree**
- **Found during:** Task 2 (full codebase scan for `@/hooks` references)
- **Issue:** This agent ran in a parallel worktree (`agent-a4c07170`) that did not contain Plan 01's consumer rewiring commits. After deleting the hook files in Task 1, all 14 consumer files had broken imports pointing to non-existent files — a build-blocking condition
- **Fix:** Copied rewired versions from the main repo: 3 page files, 11 component files, `lib/data/projects.ts`, and `public/images/` placeholder assets
- **Files modified:** 14 files (all consumer files) + 4 new files created
- **Commit:** 83001de

## Requirements Satisfied

- **SUPA-01**: `@supabase/supabase-js` removed from package.json and node_modules
- **SUPA-03**: No Supabase environment variables (`.env.local` absent)
- **SUPA-04**: Supabase image domain removed from `next.config.ts`

## Known Stubs

- `public/images/hero-placeholder.svg` — intentional placeholder; user will replace with real hero image
- `public/images/projects/placeholder-thumb.svg` — intentional placeholder for all 19 project thumbnails
- `public/images/projects/placeholder-hero.svg` — intentional placeholder for all 19 project hero images

These stubs are tracked per project constraint: "Placeholder images: Use generated placeholders; user will replace with real images later." They do not prevent the portfolio from functioning — all pages render correctly with placeholder images.

## Self-Check: PASSED

Files exist:
- lib/data/projects.ts: FOUND
- next.config.ts: FOUND (no supabase references)
- package.json: FOUND (no @supabase/supabase-js)
- public/images/hero-placeholder.svg: FOUND
- public/images/projects/placeholder-thumb.svg: FOUND

Commits exist:
- fcc7deb: FOUND (Task 1)
- 83001de: FOUND (Task 2)

Build: PASSED (exit code 0, 9/9 static pages generated)
