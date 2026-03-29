---
phase: 11-dedicated-faq-page-inspired-by-defactosound-com-faq
plan: "01"
subsystem: faq
tags: [faq, seo, content, jsonld, accordion]
dependency_graph:
  requires: []
  provides: [faq-page, faq-content, faq-jsonld]
  affects: [lib/copy.ts, app/faq/page.tsx, components/faq/FAQPageClient.tsx]
tech_stack:
  added: []
  patterns: [server-component-metadata, client-accordion-wrapper, flatmap-entries-for-jsonld]
key_files:
  created:
    - app/faq/page.tsx
    - components/faq/FAQPageClient.tsx
  modified:
    - lib/copy.ts
decisions:
  - "Used flatMap with explicit property mapping to satisfy TypeScript readonly literal types from as const copy object"
  - "FAQPage JSON-LD injected in Server Component (app/faq/page.tsx) following Phase 9 pattern"
  - "CTA section custom-built in FAQPageClient instead of reusing CTASection (which has black background inappropriate for FAQ bottom)"
metrics:
  duration: "~3 min"
  completed: "2026-03-29"
  tasks: 2
  files: 3
---

# Phase 11 Plan 01: Dedicated FAQ Page Summary

Dedicated `/faq` route with 23 categorized Q&As, FAQPage JSON-LD schema, hero section, collapsible accordion UI, and bottom CTA — moving from 7 generic entries to 23 detailed answers across 4 professional categories.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add categorized FAQ content to lib/copy.ts | 9562e63 | lib/copy.ts |
| 2 | Create /faq route and FAQPageClient | 8da00e5 | app/faq/page.tsx, components/faq/FAQPageClient.tsx |

## What Was Built

### lib/copy.ts
Added `faqPage` object (159 lines) alongside existing `copy.faq` (preserved unchanged). Structure:
- `meta` — SEO title and description
- `hero` — Page heading and subtitle
- `categories` — 4 categories with 23 total Q&As:
  - Getting Started (6 Q&As): how to reach out, what info to provide, remote vs on-location, pricing, turnaround, pipeline integration
  - Audio Post-Production Process (6 Q&As): end-to-end pipeline, dialogue editing, sound design approach, ADR/Foley, re-recording mix, deliverables
  - Technical (6 Q&As): DAW/tools (Pro Tools, iZotope RX), file formats, delivery formats (stereo/5.1/7.1/Dolby Atmos), remote collaboration (Source-Connect), QC process, Dolby Atmos streaming
  - About Me (5 Q&As): background, project types, location/availability, languages, differentiators
- `cta` — Title, description, primary link (/contact), secondary link (WhatsApp)

### app/faq/page.tsx
Server Component with:
- `export const metadata` — title, description, OpenGraph, Twitter Card
- FAQPage JSON-LD injection via `buildFAQSchema()` with all 23 Q&As flattened from categories
- Renders `<FAQPageClient />` for interactive accordion

### components/faq/FAQPageClient.tsx
Client Component (`"use client"`) with:
- Hero section — gray-50 background, animated heading, orange bar divider, subtitle
- Category sections — map over 4 categories, each with h2, orange bar, and `Accordion type="single" collapsible`
- Staggered motion.div animations per category (0.1s delay per category)
- CTA section — gray-50 background, title, orange bar, description, orange primary button (/contact), outline secondary link (WhatsApp)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript literal type incompatibility with flatMap**
- **Found during:** Task 2 (build verification)
- **Issue:** `copy.faqPage.categories.flatMap((cat) => cat.entries)` failed TypeScript type check because `as const` creates deeply heterogeneous literal tuple types that don't unify correctly with the `readonly { question: string; answer: string }[]` signature of `buildFAQSchema`
- **Fix:** Changed to `flatMap((cat) => cat.entries.map((e) => ({ question: e.question, answer: e.answer })))` to create plain objects that satisfy the interface
- **Files modified:** app/faq/page.tsx
- **Commit:** 8da00e5

## Known Stubs

None — all content is real, wired to the copy object, and rendering correctly.

## Self-Check: PASSED

- [x] app/faq/page.tsx exists
- [x] components/faq/FAQPageClient.tsx exists
- [x] lib/copy.ts updated with faqPage
- [x] Commits 9562e63 and 8da00e5 exist
- [x] Build succeeds with `/faq` static page prerendered
