# Milestones

## v1.2 Real Project Images (Shipped: 2026-03-28)

**Phases completed:** 1 phase, 1 plan, 2 tasks
**Commits:** 12

**Delivered:** All 19 project records updated with real thumbnail and hero images. Placeholder SVGs removed. Homepage hero image added.

**Key accomplishments:**

- Updated 38 image URLs (19 thumbnails + 19 heroes) in projects.ts from placeholders to real project photos
- Mapped 22 project image directories with mixed naming conventions to correct data records
- Deleted placeholder-thumb.svg and placeholder-hero.svg
- Added real homepage hero image (Lorenzo on-set with boom mic)

**Archives:**

- `.planning/milestones/v1.2-ROADMAP.md`
- `.planning/milestones/v1.2-REQUIREMENTS.md`

---

## v1.1 Production Readiness & Code Quality (Shipped: 2026-03-27)

**Phases completed:** 3 phases, 7 plans, 4 tasks

**Key accomplishments:**

- One-liner:
- One-liner:
- One-liner:
- Replaced 3 remaining raw `<img>` tags with next/image in PortfolioDetail.tsx (mobile + desktop hero) and PortfolioCard.tsx (thumbnail with preserved loading callbacks), closing the INFRA-01 image optimization requirement
- 1. [Rule 1 - Bug] Fixed missing "use client" on SelectedWorks.tsx
- 1. [Rule 3 - Blocking] Homepage and remaining pages still used Supabase hooks

---

## v1.0 Supabase to Local Data Migration (Shipped: 2026-03-27)

**Phases completed:** 3 phases, 6 plans
**Files changed:** 50 | **Lines:** +3,720 / -366 | **Commits:** 33

**Delivered:** Complete migration from Supabase to local TypeScript data. The portfolio now runs with zero external database dependencies.

**Key accomplishments:**

- Migrated all 19 project records from Postgres backup to typed TypeScript data file with helper functions
- Generated 38 placeholder SVG images (thumbnail + hero for each project)
- Rewired 14 consumer files from Supabase hooks to direct local data imports
- Completely removed Supabase (client library, hooks, env vars, image domain config)
- Verified all 6 routes and interactive features (automated script + visual browser testing)

**Archives:**

- `.planning/milestones/v1.0-ROADMAP.md`
- `.planning/milestones/v1.0-REQUIREMENTS.md`

---
