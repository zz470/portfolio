# Phase 2: Supabase Removal - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Remove Supabase entirely from the codebase and replace all data fetching hooks with direct imports from the local data file created in Phase 1. After this phase: no Supabase client, no hooks, no env vars, no config references. The app builds without errors.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
User chose "You decide on all" — Claude has full discretion on implementation approach for this mechanical migration phase. The following decisions are pre-made based on codebase analysis:

- **D-01:** Replace `useProjects`/`useProject` hooks with direct imports from `@/lib/data/projects` — no thin wrapper hooks needed since data is synchronous
- **D-02:** Keep `"use client"` directives on existing pages — converting to Server Components would be a breaking change outside this phase's scope (ROADMAP constraint: no breaking changes)
- **D-03:** Remove loading/error state patterns where they exist only for Supabase fetching — local data is synchronous, so loading spinners serve no purpose. Keep loading.tsx skeleton files as they're part of Next.js routing conventions
- **D-04:** Delete `hooks/useProjects.ts`, `hooks/useProject.ts`, and `lib/supabase.ts` entirely
- **D-05:** Remove `@supabase/supabase-js` from package.json via npm uninstall
- **D-06:** Remove Supabase image domain from `next.config.ts`
- **D-07:** Remove `.env.local` file (contains only Supabase credentials)
- **D-08:** Update all component imports: `Project` type + data functions come from `@/lib/data/projects`

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — SUPA-01, SUPA-02, SUPA-03, SUPA-04 define acceptance criteria
- `.planning/ROADMAP.md` §Phase 2 — Success criteria: 4 conditions that must be TRUE

### Phase 1 Outputs (data source)
- `lib/data/projects.ts` — Local data file with Project interface, 19 records, and helper functions
- `.planning/phases/01-local-data-layer/01-CONTEXT.md` — Phase 1 decisions (D-09, D-10 on type/data location)

### Files to Remove/Modify
- `hooks/useProjects.ts` — DELETE (exports Project interface + useProjects hook)
- `hooks/useProject.ts` — DELETE (exports useProject hook)
- `lib/supabase.ts` — DELETE (Supabase client singleton)
- `next.config.ts` — MODIFY (remove Supabase image domain)
- `.env.local` — DELETE (Supabase credentials)
- `package.json` — MODIFY (uninstall @supabase/supabase-js)

### Files to Update (17 consumers)
- `app/page.tsx` — Homepage (uses useProjects for featured projects)
- `app/portfolio/page.tsx` — Portfolio grid (uses useProjects for all projects)
- `app/portfolio/[slug]/page.tsx` — Project detail (uses useProject by slug)
- `components/home/SelectedWorks.tsx` — Featured projects component
- `components/home/HeroSection.tsx` — Hero section
- `components/portfolio/PortfolioGrid.tsx` — Grid layout
- `components/portfolio/PortfolioCard.tsx` — Individual card
- `components/portfolio/PortfolioDetail.tsx` — Primary detail layout
- `components/portfolio/PortfolioDetailSecondary.tsx` — Secondary detail layout
- `components/portfolio/PortfolioDetailTertiary.tsx` — Tertiary detail layout
- `components/portfolio/ProjectDetailsCard.tsx` — Project metadata card
- `components/portfolio/ProjectAboutCard.tsx` — Project description card
- `components/portfolio/ProjectVideoCard.tsx` — Video player card
- `components/portfolio/ProjectNavigation.tsx` — Prev/next navigation

### Codebase Patterns
- `.planning/codebase/CONVENTIONS.md` — Import organization, export patterns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/data/projects.ts` — Phase 1 output: `projects` array, `getProjectBySlug()`, `getProjectsByCategory()`, `getFeaturedProjects()`, `Project` interface
- These helper functions map directly to what the hooks were doing

### Established Patterns
- Current hooks return `{ projects, loading, error }` / `{ project, loading, error }` — consumers destructure these
- Pages use `if (loading)` / `if (error)` / `if (!project)` guards before rendering
- With local data, these guards simplify to just `if (!project)` for slug lookups

### Integration Points
- `useProjects()` → replace with `import { projects } from "@/lib/data/projects"`
- `useProject(slug)` → replace with `import { getProjectBySlug } from "@/lib/data/projects"`
- `Project` type → replace with `import { type Project } from "@/lib/data/projects"`
- Loading states → remove or replace with static content
- Error states → remove (local data can't fail to load)

</code_context>

<specifics>
## Specific Ideas

No specific requirements — user deferred all decisions to Claude's discretion for this mechanical migration.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-supabase-removal*
*Context gathered: 2026-03-27*
