---
phase: 11-dedicated-faq-page-inspired-by-defactosound-com-faq
plan: "02"
subsystem: faq
tags: [faq, navigation, sitemap, seo, jsonld]
dependency_graph:
  requires:
    - phase: 11-01
      provides: faq-page, faq-content, faq-jsonld
  provides:
    - faq-nav-integration
    - faq-sitemap
    - services-faq-teaser
  affects: [components/navigation/header.tsx, components/navigation/footer.tsx, app/sitemap.ts, components/services/ServicesPageClient.tsx]
tech_stack:
  added: []
  patterns: [teaser-with-link-pattern, json-ld-single-source]
key_files:
  created: []
  modified:
    - lib/copy.ts
    - app/services/page.tsx
    - components/services/ServicesPageClient.tsx
    - app/sitemap.ts
key-decisions:
  - "FAQ teaser on /services shows first 3 entries from copy.faq.entries with link to /faq — reuses existing faq data without duplication"
  - "faqTeaser copy object added to lib/copy.ts for consistent label/link sourcing"
  - "FAQPage JSON-LD removed from /services — /faq is now the single canonical source"
patterns-established:
  - "Teaser pattern: show N items from an array with slice(0, N) + link to full page"
requirements-completed: [FAQ-07, FAQ-08, FAQ-09, FAQ-10]
duration: ~2min
completed: "2026-03-29"
---

# Phase 11 Plan 02: FAQ Integration Summary

**FAQ page integrated into header/footer navigation, /services teaser with 3 FAQs linking to /faq, FAQPage JSON-LD removed from /services, /faq added to sitemap.**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-29T04:09:17Z
- **Completed:** 2026-03-29T04:09:43Z
- **Tasks:** 1 auto (+ 1 checkpoint pending verification)
- **Files modified:** 4

## Accomplishments
- Header and footer navItems in lib/copy.ts now include `{ name: "FAQ", path: "/faq" }` — automatically picked up by both navigation components
- /services Expertise page now shows a 3-question teaser (`copy.faq.entries.slice(0, 3)`) with "See all FAQs" link to /faq instead of the full 7-question accordion
- FAQPage JSON-LD removed from app/services/page.tsx — /faq is now the single canonical structured data source
- /faq added to sitemap.ts with `changeFrequency: "monthly"` and `priority: 0.7`

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace Expertise page FAQ section with teaser + migrate JSON-LD + update nav/sitemap** - `53c9ccb` (feat)

**Plan metadata:** (pending final commit after checkpoint)

## Files Created/Modified
- `lib/copy.ts` — Added FAQ to header.navItems and footer.navItems; added faqTeaser object
- `app/services/page.tsx` — Removed buildFAQSchema import, removed JSON-LD block, simplified to direct component return
- `components/services/ServicesPageClient.tsx` — Added Link import; replaced full FAQ accordion with 3-entry teaser + "See all FAQs" link
- `app/sitemap.ts` — Added /faq route entry after /services

## Decisions Made
- Used `copy.faq.entries.slice(0, 3)` to reuse existing faq entries for the teaser rather than duplicating content in faqTeaser
- Added `faqTeaser` object to lib/copy.ts for section title and link text/href — keeps UI labels centralized
- Arrow character (`→`) used inline for the teaser link rather than importing ArrowRight from lucide-react — consistent with codebase pattern of inlined SVG/characters for simple decorative elements

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- FAQ page is fully integrated: discoverable via header, footer, services teaser, and sitemap
- Awaiting checkpoint human verification (Task 2) to confirm visual layout, navigation links, and JSON-LD presence
- After user approves, phase 11 is complete

## Self-Check

- [x] lib/copy.ts contains `{ name: "FAQ", path: "/faq" }` in both header and footer navItems
- [x] lib/copy.ts contains faqTeaser property
- [x] app/services/page.tsx does NOT contain buildFAQSchema
- [x] app/services/page.tsx does NOT contain application/ld+json
- [x] components/services/ServicesPageClient.tsx contains copy.faqTeaser.sectionTitle
- [x] components/services/ServicesPageClient.tsx contains copy.faq.entries.slice(0, 3)
- [x] components/services/ServicesPageClient.tsx contains link to /faq
- [x] app/sitemap.ts contains /faq
- [x] npx next build succeeds without errors
- [x] Commit 53c9ccb exists

## Self-Check: PASSED

---
*Phase: 11-dedicated-faq-page-inspired-by-defactosound-com-faq*
*Completed: 2026-03-29*
