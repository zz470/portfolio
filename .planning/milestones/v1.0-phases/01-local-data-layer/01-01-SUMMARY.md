---
phase: 01-local-data-layer
plan: "01"
subsystem: data
tags: [data-layer, typescript, projects, migration]
dependency_graph:
  requires: []
  provides: [lib/data/projects.ts, Project interface, 19 project records, helper functions]
  affects: [hooks/useProjects.ts, hooks/useProject.ts, all pages consuming project data]
tech_stack:
  added: []
  patterns: [pure data module with named exports, no imports, co-located interface and data]
key_files:
  created:
    - lib/data/projects.ts
  modified: []
decisions:
  - "19 project records created with realistic professional placeholder data (IMDB not reachable in CI)"
  - "design_version distributed as 9 primary, 5 secondary, 5 tertiary across the 19 records"
  - "Projects without release_date sorted to array end per D-07/D-08"
metrics:
  duration: "~5 minutes"
  completed: "2026-03-27"
---

# Phase 1 Plan 1: Create Local TypeScript Data File Summary

**One-liner:** Local TypeScript data module with 19 sound portfolio project records, Project interface, and query helpers — replacing Supabase as data source.

## What Was Built

A single self-contained TypeScript file at `lib/data/projects.ts` that serves as the local data layer for the entire portfolio. The file:

- Exports the `Project` interface with exact field parity to the existing `hooks/useProjects.ts` interface
- Contains 19 project records covering Lorenzo Pardell's work across Film, TV Series, Documentary, Short Film, and Advertisement categories
- Projects are sorted by `release_date` descending (2024 down to 2020), with 3 projects lacking a release date placed at the end
- All image URLs use the local `public/images/projects/` path pattern (`{slug}-thumb.svg`, `{slug}-hero.svg`)
- Exports three helper functions: `getProjectBySlug`, `getProjectsByCategory`, `getFeaturedProjects`
- Has zero imports — a pure data module as specified

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create Project interface and helper functions scaffold | 1bf50e9 | lib/data/projects.ts |

## Decisions Made

1. **Placeholder project data used**: IMDB was not reachable during execution. Created 19 records with realistic professional data representing a Spanish sound professional's work (TV series, films, documentaries, commercials). Project titles correspond to real Spanish productions that a sound professional might work on.

2. **design_version distribution**: 9 primary, 5 secondary, 5 tertiary — satisfying the requirement for all three detail page layouts to be exercised.

3. **Release year range**: 2020-2024 for dated projects, with 3 undated projects (short films and advertisement) at the array end.

## Deviations from Plan

### Auto-fixed Issues

None.

### Plan Deviations

**1. [Rule 2 - Missing data] IMDB not accessible — professional placeholder data used**
- **Found during:** Task 1
- **Issue:** The plan asked to scrape IMDB for real project data, but IMDB was not reachable. The plan explicitly handles this case: "If the executor cannot reach IMDB or gather enough data for 19 projects, create records with realistic professional placeholder data."
- **Fix:** Created 19 records with Spanish film industry project titles and realistic sound roles
- **Files modified:** lib/data/projects.ts
- **Commit:** 1bf50e9

## Verification Results

All plan verification checks passed:

```
grep -c "id: [0-9]" lib/data/projects.ts  => 19
grep "export interface Project"            => matched
grep "export const projects"               => matched
grep "export function getProjectBySlug"    => matched
grep "export function getProjectsByCategory" => matched
grep "export function getFeaturedProjects" => matched
grep design_version | grep -c secondary   => 5
grep design_version | grep -c tertiary    => 5
npx tsc --noEmit                           => 0 errors
```

## Known Stubs

The following stubs are present by design (documented in plan requirements):

1. **`video_url: ""`** — All 19 projects have empty video_url. Plan specifies: "Empty string `""` (no video URLs available without Supabase)". Phase 2/3 will determine if real URLs exist.

2. **`/images/projects/{slug}-thumb.svg`** and **`/images/projects/{slug}-hero.svg`** — Thumbnail and hero image paths reference SVG files that do not yet exist in `public/images/projects/`. These will be created in Plan 01-02 (Generate placeholder SVG images). Pages will show broken images until Plan 01-02 completes.

3. **Project titles/descriptions are placeholder data** — User will need to review and update project records with real data (actual descriptions, production companies, IMDB links) when they have access to their original database backup.

## Self-Check: PASSED

- `lib/data/projects.ts` — FOUND
- Commit `1bf50e9` — FOUND
