# Phase 1: Local Data Layer - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Create a TypeScript data file containing all 19 project records with full type safety, plus placeholder SVG images in `public/`. This phase creates the local data layer that Phase 2 will wire into the existing components. No Supabase changes in this phase — just building the new data source alongside the existing one.

</domain>

<decisions>
## Implementation Decisions

### Data File Location & Structure
- **D-01:** Data file lives at `lib/data/projects.ts` — new `data/` subdirectory inside `lib/`, following the existing `lib/` pattern for shared utilities
- **D-02:** File exports both the projects array AND helper functions: `getProjectBySlug()`, `getProjectsByCategory()`, `getFeaturedProjects()`
- **D-03:** Single file for now — no need for a barrel or multiple data files

### Placeholder Image Strategy
- **D-04:** Generate solid color SVG placeholders — dark gray background (#1a1a1a), white project title text, orange accent line
- **D-05:** Two SVGs per project: thumbnail (600x400) and hero (1920x800)
- **D-06:** Files stored in `public/images/projects/` using slug-based naming: `{slug}-thumb.svg`, `{slug}-hero.svg`

### Project Ordering
- **D-07:** Projects ordered by `release_date` descending (NOT by the old Supabase `created_at`)
- **D-08:** Projects without a `release_date` sort to the end of the array

### Type Definition Location
- **D-09:** The `Project` interface moves to `lib/data/projects.ts`, co-located with the data it defines
- **D-10:** Components will import both the type and data from `@/lib/data/projects`

### Claude's Discretion
- Helper function signatures and implementation details
- Exact SVG design within the constraints (dark gray, white text, orange accent)
- How to handle projects with identical release_date (secondary sort)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data Source
- `.planning/REQUIREMENTS.md` — DATA-01, DATA-02, DATA-03, IMG-01, IMG-02 define the acceptance criteria for this phase
- `.planning/ROADMAP.md` §Phase 1 — Success criteria: 4 conditions that must be TRUE

### Existing Code (to understand current data shape)
- `hooks/useProjects.ts` — Current `Project` interface definition and Supabase query (ordered by `created_at` desc)
- `hooks/useProject.ts` — Single project fetch hook (shows how slug lookup works)

### Codebase Patterns
- `.planning/codebase/CONVENTIONS.md` — Naming, export, and import conventions to follow
- `.planning/codebase/STRUCTURE.md` — Directory layout and where to add new code

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Project` interface in `hooks/useProjects.ts` — copy and adapt to `lib/data/projects.ts`
- `public/partner_logos/` — establishes the pattern for static assets in `public/` subdirectories

### Established Patterns
- Types co-located with source code (Project interface in useProjects.ts)
- Named exports for hooks and utilities (`export function`, `export interface`)
- `@/*` path alias for all internal imports
- Constants hardcoded in their source files (navItems, services, socialLinks)

### Integration Points
- Phase 2 will rewire `useProjects`/`useProject` hooks to import from `@/lib/data/projects`
- Components currently import `Project` from `@/hooks/useProjects` — Phase 2 will update to `@/lib/data/projects`
- Image paths in data file must match what `PortfolioCard.tsx` and detail pages expect (`thumbnail_url`, `hero_url` fields)

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-local-data-layer*
*Context gathered: 2026-03-26*
