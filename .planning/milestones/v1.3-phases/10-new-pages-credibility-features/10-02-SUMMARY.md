---
phase: 10-new-pages-credibility-features
plan: "02"
subsystem: ui
tags: [faq, seo, jsonld, accordion, shadcn, structured-data, expertise-page]

# Dependency graph
requires:
  - phase: 10-new-pages-credibility-features
    provides: plan 01 category archive pages (same phase, parallel)
  - phase: 08-copy-backup-rewrite
    provides: lib/copy.ts centralized copy pattern
  - phase: 09-technical-seo-ui-fix
    provides: lib/jsonld.ts schema builder pattern, JSON-LD in Server Components decision
provides:
  - FAQ section on Expertise page with 7 Q&A entries in accessible accordion
  - buildFAQSchema() for FAQPage structured data in lib/jsonld.ts
  - faq entries in lib/copy.ts (centralized copy pattern)
  - FAQPage JSON-LD schema injected in app/services/page.tsx
affects: [future-seo-audits, rich-snippets, expertise-page-updates]

# Tech tracking
tech-stack:
  added: ["@radix-ui/react-accordion (via shadcn)", "shadcn accordion component"]
  patterns: ["FAQ copy centralized in lib/copy.ts", "JSON-LD schema in Server Component page file", "Accordion from shadcn/ui for accessible FAQ UI"]

key-files:
  created: ["components/ui/accordion.tsx"]
  modified: ["lib/copy.ts", "lib/jsonld.ts", "components/services/ServicesPageClient.tsx", "app/services/page.tsx"]

key-decisions:
  - "FEAT-02 (testimonials) deferred per D-10 - user has no client quotes ready"
  - "FEAT-03 (CV download) deferred per D-11 - user has no PDF ready"
  - "FAQ accordion uses shadcn/ui Accordion (Radix-based) for keyboard nav and ARIA compliance"

patterns-established:
  - "FAQ copy pattern: faq.entries in lib/copy.ts as readonly array of { question, answer }"
  - "FAQPage schema: buildFAQSchema() in lib/jsonld.ts accepts readonly entries array"

requirements-completed: [SEO-08, FEAT-02, FEAT-03]

# Metrics
duration: 12min
completed: 2026-03-29
---

# Phase 10 Plan 02: FAQ Section & Credibility Features Summary

**FAQPage JSON-LD schema + 7-entry accordion FAQ section on Expertise page using shadcn Radix accordion with centralized copy in lib/copy.ts**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-29T02:15:00Z
- **Completed:** 2026-03-29T02:27:00Z
- **Tasks:** 1
- **Files modified:** 5 (+ accordion.tsx created)

## Accomplishments
- Added 7 FAQ entries to lib/copy.ts targeting common sound design / hiring search queries
- Installed shadcn accordion (Radix-based) for accessible keyboard-navigable FAQ UI
- Built buildFAQSchema() in lib/jsonld.ts for FAQPage structured data
- Wired FAQ section into ServicesPageClient.tsx below Additional Services section
- Injected FAQPage JSON-LD script in app/services/page.tsx Server Component
- FEAT-02 (testimonials) and FEAT-03 (CV download) confirmed deferred per user decisions D-10/D-11

## Task Commits

Each task was committed atomically:

1. **Task 1: Add FAQ copy, install accordion, build FAQ schema, and wire FAQ section into Expertise page** - `8131599` (feat)

**Plan metadata:** (added with state update commit)

## Files Created/Modified
- `lib/copy.ts` - Added faq.sectionTitle and faq.entries (7 Q&A pairs)
- `lib/jsonld.ts` - Added buildFAQSchema() export for FAQPage structured data
- `components/ui/accordion.tsx` - shadcn Radix accordion component (created by shadcn CLI)
- `components/services/ServicesPageClient.tsx` - Added Accordion imports and FAQ section with copy.faq entries
- `app/services/page.tsx` - Added buildFAQSchema import and FAQPage JSON-LD script injection
- `package.json` / `package-lock.json` - Added @radix-ui/react-accordion dependency

## Decisions Made
- FEAT-02 (testimonials) deferred per D-10 — user has no client quotes ready
- FEAT-03 (CV download) deferred per D-11 — user has no PDF ready
- shadcn accordion chosen (Radix-based) for ARIA attributes and keyboard navigation built-in
- JSON-LD placed in Server Component (app/services/page.tsx) per Phase 9 decision — ensures structured data is in initial HTML

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- First `npx next build` run failed with a flaky ENOENT error on `500.html` rename — a known race condition in Next.js build output. Second run completed successfully with no errors.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None — all 7 FAQ entries are real content targeting sound design hiring queries. No placeholder text or TODO items.

## Next Phase Readiness
- Phase 10 complete (plan 02 of 02) — all category archive pages and FAQ section delivered
- FEAT-02 and FEAT-03 remain deferred — no action required unless user provides content
- No blockers

---
*Phase: 10-new-pages-credibility-features*
*Completed: 2026-03-29*
