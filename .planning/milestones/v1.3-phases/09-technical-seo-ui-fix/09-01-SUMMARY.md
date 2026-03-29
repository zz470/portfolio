---
phase: 09-technical-seo-ui-fix
plan: 01
subsystem: seo
tags: [json-ld, structured-data, schema-org, metadata, seo, twitter-card, open-graph]

# Dependency graph
requires:
  - phase: 08-copy-backup-rewrite
    provides: "Finalized copy in lib/copy.ts used for meta descriptions"
provides:
  - "lib/jsonld.ts with buildPersonSchema, buildLocalBusinessSchema, buildCreativeWorkSchema"
  - "JSON-LD Person + ProfessionalService scripts in root layout"
  - "Keyword-rich page titles on all 5 pages (no double-suffix)"
  - "Twitter card metadata on all 5 pages"
  - "Bilingual keywords array in root layout"
  - "44x44px minimum touch targets on footer social links"
affects: [10-features-content, future-seo-phases]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "JSON-LD schema builders as pure functions in lib/jsonld.ts returning plain objects"
    - "JSON-LD injected via dangerouslySetInnerHTML script tags in root layout (Server Component)"
    - "Page titles use template suffix — never include '| Lorenzo Pardell' in page-level title"

key-files:
  created:
    - lib/jsonld.ts
  modified:
    - app/layout.tsx
    - app/page.tsx
    - app/portfolio/page.tsx
    - app/services/page.tsx
    - app/about/page.tsx
    - app/contact/page.tsx
    - components/navigation/footer.tsx

key-decisions:
  - "Page-level title strings must not include '| Lorenzo Pardell' — root layout template appends it automatically"
  - "JSON-LD scripts placed in body before Header in root layout (Server Component only)"
  - "socialLinks with visible:false excluded from sameAs array in Person schema"

patterns-established:
  - "JSON-LD pattern: pure builder functions in lib/jsonld.ts, injected in layout as script tags"
  - "Metadata pattern: page-level title is the keyword phrase only, template handles suffix"

requirements-completed: [SEO-01, SEO-02, SEO-03, SEO-06, UI-01]

# Metrics
duration: 8min
completed: 2026-03-28
---

# Phase 9 Plan 01: Technical SEO & UI Fix Summary

**JSON-LD Person + ProfessionalService schemas injected in root layout, all 5 pages have keyword-rich titles and Twitter card metadata, footer social links meet 44x44px touch target minimum**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-28T23:18:26Z
- **Completed:** 2026-03-28T23:26:00Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Created `lib/jsonld.ts` with three exported schema builder functions (Person, ProfessionalService, CreativeWork)
- Updated root layout with JSON-LD script injection, Twitter card defaults, updated OG metadata, and bilingual keywords array
- Fixed all 5 page metadata: keyword-rich titles with no double-suffix, updated OG titles/descriptions, Twitter card on every page
- Fixed footer social link touch targets to minimum 44x44px tappable area

## Task Commits

1. **Task 1: Create JSON-LD builder module and update root layout** - `0974d02` (feat)
2. **Task 2: Optimize all page metadata and fix footer touch targets** - `f9753a6` (feat)

## Files Created/Modified

- `lib/jsonld.ts` - JSON-LD schema builder functions: buildPersonSchema, buildLocalBusinessSchema, buildCreativeWorkSchema
- `app/layout.tsx` - JSON-LD script tags, updated default title with location, Twitter card, bilingual keywords, updated OG metadata
- `app/page.tsx` - Updated OG title/description, added Twitter card
- `app/portfolio/page.tsx` - New keyword-rich title, updated descriptions, Twitter card
- `app/services/page.tsx` - Title without "Lorenzo Pardell" suffix, Twitter card
- `app/about/page.tsx` - Title without "Lorenzo Pardell" suffix, Twitter card
- `app/contact/page.tsx` - Title without "Lorenzo Pardell" suffix, Twitter card
- `components/navigation/footer.tsx` - Added min-h-[44px] min-w-[44px] to social link className

## Decisions Made

- Page-level title strings must not include "| Lorenzo Pardell" — root layout template appends it automatically. The copy.ts meta titles (aboutMeta.title, servicesMeta.title, contactMeta.title) all include the suffix and were overridden with inline strings.
- JSON-LD scripts placed in body before Header in root layout. Since root layout is a Server Component (no "use client"), this is the correct location for static structured data.
- `socialLinks` filtered to visible:true only for the sameAs array — YouTube and GitHub are not public profiles for Lorenzo.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All SEO-01, SEO-02, SEO-03, SEO-06, UI-01 requirements completed
- `buildCreativeWorkSchema` is ready but not yet wired into project detail pages — per-project JSON-LD is a Phase 10 task
- Phase 09 Plan 02 (dark mode fix) can proceed immediately

---
*Phase: 09-technical-seo-ui-fix*
*Completed: 2026-03-28*
