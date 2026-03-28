# Phase 5: Infrastructure & Image Optimization - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace remaining raw `<img>` tags with `next/image` in 2 component files (3 instances total). Fix deprecated `images.domains` config — already resolved (config is clean). No new features.

</domain>

<decisions>
## Implementation Decisions

### Image sizing strategy
- **D-01:** Use `fill` mode with `sizes` prop for all project images (hero images, navigation thumbnails)
- **D-02:** Containers already use `absolute inset-0` + `object-cover` pattern — `fill` mode is a direct 1:1 replacement
- **D-03:** Add appropriate `sizes` prop based on container context:
  - Hero image in PortfolioDetailSecondary: `sizes="100vw"` (full-width container)
  - Navigation thumbnails in ProjectNavigation: `sizes="(max-width: 768px) 100vw, 50vw"` (single column on mobile, 2-col grid on desktop)

### INFRA-02 status
- **D-04:** `next.config.ts` is already clean — no `images.domains` exists (removed during v1.0 Supabase migration). INFRA-02 is pre-satisfied. Mark as complete without changes.

### Partner logos sizes prop
- **D-05:** Add missing `sizes` prop to partner logos `<Image>` components to fix console warning. Use `sizes="150px"` (fixed-width logo images in marquee).

### Claude's Discretion
- Exact `sizes` values can be adjusted if container analysis reveals different breakpoints
- Priority attribute on hero images (above-the-fold)

</decisions>

<canonical_refs>
## Canonical References

No external specs — requirements fully captured in decisions above.

### Codebase analysis
- `.planning/codebase/CONCERNS.md` — Source of image optimization items
- `.planning/phases/04-code-quality-bug-fixes/04-CONTEXT.md` — Prior phase decisions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `next/image` already imported and used in `HeroSection.tsx`, `SelectedWorks.tsx`, `partner-logos.tsx` — established pattern to follow
- All images are local SVGs in `public/images/projects/` — no remote patterns config needed

### Established Patterns
- Images inside containers with fixed height (`h-[38vh]`, `h-60`) using `absolute inset-0` + `object-cover`
- `next/image` with `fill` already used in `SelectedWorks.tsx` and `HeroSection.tsx`

### Integration Points
- `components/portfolio/PortfolioDetailSecondary.tsx` — 1 hero image (line 38)
- `components/portfolio/ProjectNavigation.tsx` — 2 navigation thumbnails (lines 49, 72)
- `components/home/partner-logos.tsx` — add `sizes` prop to existing `<Image>` components

### Files that DON'T need changes
- `PortfolioDetail.tsx` (primary) — already uses `next/image`
- `PortfolioDetailTertiary.tsx` — already uses `next/image`
- `PortfolioCard.tsx` — already uses `next/image`
- `next.config.ts` — already clean

</code_context>

<specifics>
## Specific Ideas

No specific requirements — follow existing next/image patterns in the codebase.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-infrastructure-image-optimization*
*Context gathered: 2026-03-27*
