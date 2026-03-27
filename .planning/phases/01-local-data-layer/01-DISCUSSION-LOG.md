# Phase 1: Local Data Layer - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-26
**Phase:** 01-local-data-layer
**Areas discussed:** Data file location & structure, Placeholder image strategy, Project ordering & created_at, Type definition location

---

## Data File Location & Structure

| Option | Description | Selected |
|--------|-------------|----------|
| lib/data/projects.ts | New data/ subdirectory inside lib/. Follows existing lib/ pattern. | ✓ |
| data/projects.ts | Top-level data/ directory at project root. | |
| lib/projects.ts | Single file directly in lib/. Simplest but could get crowded. | |

**User's choice:** lib/data/projects.ts
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Array + helpers | Export projects array AND utility functions (getProjectBySlug, etc.) | ✓ |
| Array only | Export just the projects array. Components handle own filtering. | |

**User's choice:** Array + helpers
**Notes:** None

---

## Placeholder Image Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Solid color SVGs | Dark gray background, white text, orange accent. ~1KB per file. | ✓ |
| Gradient PNGs | Category-colored gradients. Richer but needs generation tooling. | |
| Next.js blur placeholder | Single shared placeholder with blurDataURL. Minimal. | |

**User's choice:** Solid color SVGs
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Slug-based naming | {slug}-thumb.svg, {slug}-hero.svg in public/images/projects/ | ✓ |
| Nested by slug | public/images/projects/{slug}/thumb.svg | |

**User's choice:** Slug-based naming
**Notes:** None

---

## Project Ordering & created_at

| Option | Description | Selected |
|--------|-------------|----------|
| Array order is the order | Hardcode array in correct order. No extra field needed. | |
| Add created_at field | Add timestamp to each record. More explicit. | |
| Use release_date | Order by release_date descending. Semantically cleaner. | ✓ |

**User's choice:** Use release_date for ordering
**Notes:** Changes sort order from Supabase's created_at to release_date descending

| Option | Description | Selected |
|--------|-------------|----------|
| At the end | Projects without release_date sort to bottom. | ✓ |
| At the beginning | Projects without release_date sort to top. | |
| You decide | Claude's discretion. | |

**User's choice:** At the end
**Notes:** None

---

## Type Definition Location

| Option | Description | Selected |
|--------|-------------|----------|
| In the data file | Move Project interface to lib/data/projects.ts. Co-located with data. | ✓ |
| Shared types file | Create lib/types.ts for all shared interfaces. | |
| Keep in hooks | Leave in hooks/useProjects.ts. Phase 2 will update anyway. | |

**User's choice:** In the data file (lib/data/projects.ts)
**Notes:** None

---

## Claude's Discretion

- Helper function signatures and implementation details
- Exact SVG design within constraints (dark gray, white text, orange accent)
- How to handle projects with identical release_date (secondary sort)

## Deferred Ideas

None — discussion stayed within phase scope
