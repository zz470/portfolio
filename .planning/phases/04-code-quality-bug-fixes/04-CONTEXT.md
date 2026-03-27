# Phase 4: Code Quality & Bug Fixes - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Clean up duplicated code (animations, sorting, contact info), remove debug console statements, eliminate dead code, and fix 3 known rendering bugs (CTA overlay, iframe onError, IntersectionObserver cleanup). No new features — purely hardening existing code.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

All areas delegated to Claude's judgment. User trusts the implementation approach.

**Animation centralization:**
- Create `lib/animations.ts` with shared fadeIn, slideUp, staggerContainer variants
- Standardize timings across the site (resolve minor variations in 7+ files)
- Import from shared module in all consuming components

**Contact info centralization:**
- Create `lib/contact-info.ts` with phone, email, WhatsApp URL as single source of truth
- Update `app/contact/page.tsx`, `app/about/page.tsx`, `components/ui/WhatsAppLive.tsx`, `components/navigation/footer.tsx` to import from centralized file

**Sorting utility:**
- Extract `sortProjectsByDate()` into `lib/data/projects.ts` alongside existing helper functions
- Replace inline sorting in `app/page.tsx`, `components/portfolio/PortfolioGrid.tsx`, `components/portfolio/ProjectNavigation.tsx`

**Console.log removal:**
- Remove all console.log and console.warn statements (19 total)
- Keep console.error in catch blocks only
- Files: `hooks/useProjects.ts`, `hooks/useProject.ts`, `app/portfolio/[slug]/page.tsx`, `components/portfolio/PortfolioCard.tsx`

**Dead code removal:**
- Remove unused `isVisible`/`sectionRef` IntersectionObserver setup from `app/page.tsx`
- Remove unused `fadeIn`/`staggerContainer` animation variants from `app/page.tsx`
- Clean up any remaining stale Supabase references

**CTA section fix:**
- Remove the white overlay div (`bg-gradient-to-b bg-white`) from CTASection.tsx line 30
- Keep the dark background (`bg-black`) as the design intent — text colors (amber-400, gray-400) are designed for dark backgrounds

**iframe onError fix:**
- Add error state (`useState`) to ProjectVideoCard.tsx
- Update onError handler to set state instead of returning JSX
- Render fallback UI conditionally based on error state

**IntersectionObserver fix:**
- Capture `sectionRef.current` in a local variable before the cleanup function
- Use the local variable in the unobserve call

</decisions>

<canonical_refs>
## Canonical References

No external specs — requirements are fully captured in decisions above.

### Codebase analysis
- `.planning/codebase/CONCERNS.md` — Source of all bugs and cleanup items in this phase
- `.planning/codebase/CONVENTIONS.md` — Naming and code patterns to follow

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/utils.ts`: `cn()` utility for class merging — use in any new components
- `lib/social-links.tsx`: Existing social link management — extend or parallel for contact info
- `lib/data/projects.ts`: Existing helper functions (`getProjectBySlug`, `getProjectsByCategory`, `getFeaturedProjects`) — add `sortProjectsByDate()` here

### Established Patterns
- Utility modules in `lib/` use lowercase names
- Animation variants defined as plain objects with `initial`/`animate` keys
- `"use client"` directive on all interactive components

### Integration Points
- Animation module will be imported by 7+ component files
- Contact info module will be imported by 4 files
- Sorting utility integrates into existing `lib/data/projects.ts`

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-code-quality-bug-fixes*
*Context gathered: 2026-03-27*
