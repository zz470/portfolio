---
phase: 05-infrastructure-image-optimization
plan: "01"
subsystem: components/portfolio, components/home
tags: [images, next/image, optimization, INFRA-01, INFRA-02]
dependency_graph:
  requires: []
  provides: [INFRA-01, INFRA-02]
  affects: [components/portfolio/PortfolioDetailSecondary.tsx, components/portfolio/ProjectNavigation.tsx, components/home/partner-logos.tsx]
tech_stack:
  added: []
  patterns: [next/image fill mode, responsive sizes prop]
key_files:
  created: []
  modified:
    - components/portfolio/PortfolioDetailSecondary.tsx
    - components/portfolio/ProjectNavigation.tsx
    - components/home/partner-logos.tsx
decisions:
  - "Used fill mode with absolute-positioned parent container for hero and nav thumbnails"
  - "Added priority prop to PortfolioDetailSecondary hero image (above-the-fold LCP optimization)"
  - "Build failure (supabaseUrl is required) is a pre-existing issue in this worktree — not caused by plan changes; TypeScript compiles cleanly"
metrics:
  duration: "~3 minutes"
  completed_date: "2026-03-27"
  tasks_completed: 2
  files_modified: 3
---

# Phase 05 Plan 01: Image Optimization — next/image Migration Summary

**One-liner:** Replace 3 raw `<img>` tags with `next/image` fill mode and add `sizes` prop to partner logos for zero console warnings.

## What Was Done

Replaced the 3 remaining raw `<img>` tags in project-related components with `next/image` components using `fill` mode. Added `sizes` prop to all Image components to eliminate the next/image console warning. Confirmed INFRA-02 pre-satisfied (no deprecated `images.domains` config in next.config.ts).

### Components Updated

**PortfolioDetailSecondary.tsx**
- Added `import Image from "next/image"`
- Replaced hero `<img>` with `<Image fill sizes="100vw" priority className="object-cover object-center" />`
- `priority` added since this is the above-fold LCP element
- Parent `div.absolute.inset-0.bg-gray-100` provides the positioned ancestor for fill mode

**ProjectNavigation.tsx**
- Added `import Image from "next/image"`
- Replaced both prev/next thumbnail `<img>` tags with `<Image fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />`
- Parent `div.relative.w-full.h-60` provides the positioned ancestor for fill mode
- Removed `absolute inset-0 w-full h-full` from className since `fill` handles all positioning

**partner-logos.tsx**
- Added `sizes="150px"` to existing `<Image fill>` component
- Eliminates "Image with src ... missing sizes prop" console warning
- Container is 160x60px; `150px` is the appropriate hint for the browser

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 3094bc6 | Replace raw img tags with next/image in PortfolioDetailSecondary and ProjectNavigation |
| 2 | 10e38cd | Add sizes prop to partner logos Image component |

## Verification Results

- `grep "<img" components/portfolio/PortfolioDetailSecondary.tsx` — no matches (PASS)
- `grep "<img" components/portfolio/ProjectNavigation.tsx` — no matches (PASS)
- `grep "import Image from" PortfolioDetailSecondary.tsx ProjectNavigation.tsx` — both match (PASS)
- `grep 'sizes=' PortfolioDetailSecondary.tsx ProjectNavigation.tsx partner-logos.tsx` — all match (PASS)
- `grep 'fill' PortfolioDetailSecondary.tsx ProjectNavigation.tsx` — both match (PASS)
- `npx tsc --noEmit` — PASS (zero TypeScript errors)

## Deviations from Plan

### Pre-existing Issues Noted (Not Fixed)

**1. [Out of Scope] Build failure in worktree — supabaseUrl is required**
- **Found during:** Task 2 build verification
- **Issue:** `npx next build` fails with "supabaseUrl is required" during static page generation of `/portfolio`. This worktree was created from a state before the Supabase removal work (Phases 03-04). The `hooks/useProjects.ts` and `hooks/useProject.ts` still import from `@/lib/supabase`.
- **Decision:** Per deviation rules, this is a pre-existing issue outside the scope of current task's changes. TypeScript compiles cleanly (`tsc --noEmit` passes). The image changes themselves are correct and complete.
- **Deferred to:** `deferred-items.md` — worktree state sync with main repo needed

### No In-Scope Deviations

Plan executed exactly as written for all 3 target files. All acceptance criteria for the image migration itself are satisfied.

## Requirements Satisfied

- **INFRA-01:** All 3 targeted project image components now use `next/image` with `fill` mode and `sizes` prop
- **INFRA-02:** Pre-satisfied — `next.config.ts` has no deprecated `images.domains` config (confirmed by build compilation stage passing)

## Known Stubs

None. All image components are wired to real `src` props from project data.

## Self-Check: PASSED

- `components/portfolio/PortfolioDetailSecondary.tsx` — FOUND, modified
- `components/portfolio/ProjectNavigation.tsx` — FOUND, modified
- `components/home/partner-logos.tsx` — FOUND, modified
- Commit `3094bc6` — FOUND in git log
- Commit `10e38cd` — FOUND in git log
