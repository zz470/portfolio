# Roadmap: Lorenzo Pardell Portfolio

## Overview

Three-phase Supabase-to-local migration. Phase 1 creates the local data layer with all 19 project records and placeholder images. Phase 2 removes Supabase entirely and rewires all components to use local imports. Phase 3 verifies every route and interactive feature works end-to-end with local data.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Local Data Layer** - Create TypeScript data file with all 19 project records and placeholder images (completed 2026-03-27)
- [ ] **Phase 2: Supabase Removal** - Remove Supabase entirely and replace hooks with direct imports
- [ ] **Phase 3: Continuity Verification** - Verify all routes, filtering, and navigation work with local data

## Phase Details

### Phase 1: Local Data Layer
**Goal**: All project data lives locally with type safety and placeholder images in place
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, IMG-01, IMG-02
**Success Criteria** (what must be TRUE):
  1. A TypeScript file exports all 19 projects with every required field populated
  2. Projects are ordered by release_date descending (per D-07), with null release_date at end (per D-08)
  3. Placeholder images exist in public/ for every project (thumbnail + hero)
  4. All image paths in the data file resolve to local public/ directory paths
**Plans:** 2/2 plans complete

Plans:
- [x] 01-01-PLAN.md — Create TypeScript data file with Project interface, 19 records, and helper functions
- [x] 01-02-PLAN.md — Generate 38 placeholder SVG images and verify path integrity

### Phase 2: Supabase Removal
**Goal**: Supabase is gone — no client, no hooks, no env vars, no config references
**Depends on**: Phase 1
**Requirements**: SUPA-01, SUPA-02, SUPA-03, SUPA-04
**Success Criteria** (what must be TRUE):
  1. The Supabase package is uninstalled and no imports reference it anywhere in the codebase
  2. useProjects and useProject hooks are replaced with direct imports from the local data file
  3. No Supabase environment variables appear in .env files or next.config.ts
  4. The app builds without errors (next build passes)
**Plans:** 1/2 plans executed

Plans:
- [x] 02-01-PLAN.md — Rewire all page and component imports from Supabase hooks to local data file
- [ ] 02-02-PLAN.md — Remove Supabase artifacts (files, package, config, env vars) and verify build

### Phase 3: Continuity Verification
**Goal**: Every existing route and interactive feature works correctly with local data
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. All routes respond correctly: /, /portfolio, /portfolio/[slug], /services, /about, /contact
  2. Category filter on /portfolio correctly shows and hides projects by category
  3. Primary, secondary, and tertiary detail page layouts all render for the correct project slugs
  4. Prev/next project navigation on detail pages cycles through projects without errors
**Plans:** 2 plans

Plans:
- [ ] 03-01-PLAN.md — Automated verification script testing data layer, filtering, design versions, and navigation
- [ ] 03-02-PLAN.md — Visual browser verification of all routes and interactive features
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Local Data Layer | 2/2 | Complete   | 2026-03-27 |
| 2. Supabase Removal | 1/2 | In Progress|  |
| 3. Continuity Verification | 0/2 | Not started | - |
