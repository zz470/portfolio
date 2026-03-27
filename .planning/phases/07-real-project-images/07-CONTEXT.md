# Phase 7: Real Project Images - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Update `thumbnail_url` and `hero_url` in `lib/data/projects.ts` to point to real image files from each project's image directory. Remove unused placeholder SVGs. No component changes — just data URL swaps.

</domain>

<decisions>
## Implementation Decisions

### Image selection strategy
- **D-01:** For each project, pick the first available thumbnail (prefer `_thumb_1`, fall back to `_thumb`, then first thumb-like file)
- **D-02:** For each project, pick the first available hero (prefer `_hero_1`, fall back to `_hero`, then first hero-like file)
- **D-03:** Use files as-is regardless of format (jpg, avif, webp, png) — next/image handles optimization
- **D-04:** For `no_corre_s02/` with misnamed `mmsp_thumb_*` files, use whatever is there — don't rename

### Placeholder cleanup
- **D-05:** Remove `placeholder-thumb.svg` and `placeholder-hero.svg` after all URLs are updated

### Claude's Discretion
- Exact file selection for projects with non-standard naming (pick the best available match)

</decisions>

<canonical_refs>
## Canonical References

No external specs — requirements fully captured in decisions above.

### Data file
- `lib/data/projects.ts` — The 19 project records with `thumbnail_url` and `hero_url` fields to update

### Prior phase context
- `.planning/phases/05-infrastructure-image-optimization/05-CONTEXT.md` — next/image fill mode pattern (established, no component changes needed)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `next/image` with `fill` mode already used across all image components — only URL strings change
- All image components already handle local paths from `public/` directory

### Established Patterns
- Image URLs in projects.ts use relative paths from public: `/images/projects/...`
- Components use `thumbnail_url` for portfolio grid, `hero_url` for detail page headers

### Integration Points
- `lib/data/projects.ts` — sole file that needs editing (19 `thumbnail_url` + 19 `hero_url` updates)
- `public/images/projects/placeholder-thumb.svg` and `placeholder-hero.svg` — delete after migration

</code_context>

<specifics>
## Specific Ideas

No specific requirements — straightforward data mapping task.

</specifics>

<deferred>
## Deferred Ideas

- Add jumo_health, natto_pharma, unobravo as new projects (images exist, data entries don't) — separate milestone
- Gallery/carousel support for multiple images per project — future enhancement

</deferred>

---

*Phase: 07-real-project-images*
*Context gathered: 2026-03-27*
