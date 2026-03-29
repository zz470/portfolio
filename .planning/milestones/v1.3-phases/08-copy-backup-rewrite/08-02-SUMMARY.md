---
phase: 08-copy-backup-rewrite
plan: 02
subsystem: copy-wiring
tags: [copy, navigation, about, contact, services, expertise-rename]
dependency_graph:
  requires: [08-01]
  provides: [centralized-copy-wiring, expertise-rename]
  affects: [components/home, components/navigation, components/about, components/services, app/about, app/contact, app/services]
tech_stack:
  added: []
  patterns: [centralized-copy-import, alias-pattern]
key_files:
  created: []
  modified:
    - components/home/HeroSection.tsx
    - components/home/CTASection.tsx
    - components/home/ServicesSection.tsx
    - components/navigation/header.tsx
    - components/navigation/footer.tsx
    - components/about/AboutPageClient.tsx
    - app/about/page.tsx
    - app/contact/page.tsx
    - app/services/page.tsx
    - components/services/ServicesPageClient.tsx
decisions:
  - "Task 1 files (HeroSection, CTASection, ServicesSection, header, footer) were already wired in a prior commit; confirmed correct and no changes needed"
  - "ServicesPageClient uses const pageContent = copy.servicesPage as a local alias for readability while switching to centralized copy"
  - "Format icons/colors removed from ServicesPageClient since they are only defined in old pageContent and the JSX section that renders FormatTag was not present in the component"
metrics:
  duration: ~8 minutes
  completed: 2026-03-28T22:21:54Z
  tasks_completed: 2
  files_modified: 10
requirements:
  - COPY-02
  - COPY-03
  - COPY-04
  - COPY-05
  - COPY-06
  - COPY-07
---

# Phase 08 Plan 02: Wire Components to lib/copy.ts Summary

All 10 component and page files import text from `lib/copy.ts`. The "Services" to "Expertise" rename is complete across all navigation and section headings. Hero rotating word animation is preserved. Build passes clean.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Wire hero, CTA, expertise section, and navigation to lib/copy.ts | 3fa1c56 (prior) | HeroSection, CTASection, ServicesSection, header, footer |
| 2 | Wire about, contact, and services pages to lib/copy.ts | 3060cc9 | AboutPageClient, about/page, contact/page, services/page, ServicesPageClient |

## What Was Built

- **Task 1 (already complete):** HeroSection, CTASection, ServicesSection, header.tsx, footer.tsx all import `copy` from `lib/copy.ts`. Inline string defaults replaced with `copy.hero.*`, `copy.cta.*`, `copy.expertise.*`, `copy.header.navItems`, `copy.footer.*`. "Services" is "Expertise" in all nav items via `copy.header.navItems` and `copy.footer.navItems`.
- **Task 2:** AboutPageClient imports `copy.about.*` — bio rendered via `.map()` over `copy.about.bio` array, mission text, CTA heading and text all from copy. `app/about/page.tsx` metadata uses `copy.aboutMeta.*`. `app/contact/page.tsx` replaces all inline text with `copy.contact.*`, removes the emoji (`💡`) from the pro tip, drops "friendly chat" cliche. `app/services/page.tsx` metadata uses `copy.servicesMeta.*` (title is now "Expertise | Lorenzo Pardell"). `ServicesPageClient.tsx` replaces the inline `pageContent` object with `const pageContent = copy.servicesPage` alias.

## Acceptance Criteria Verification

- [x] HeroSection.tsx contains `import { copy } from "@/lib/copy"` and `copy.hero` references
- [x] CTASection.tsx contains `import { copy } from "@/lib/copy"` — no inline "Amplify Your Story" default
- [x] ServicesSection.tsx uses `copy.expertise.sectionTitle`, no hardcoded "Services" heading
- [x] header.tsx uses `copy.header.navItems` — "Expertise" in nav
- [x] footer.tsx uses `copy.footer.tagline` and `copy.footer.navItems`
- [x] AboutPageClient.tsx imports copy, bio rendered from `copy.about.bio` array
- [x] app/about/page.tsx metadata uses `copy.aboutMeta.title`
- [x] app/contact/page.tsx imports copy, no emoji, no "friendly chat"
- [x] app/services/page.tsx metadata uses `copy.servicesMeta.title` ("Expertise | Lorenzo Pardell")
- [x] ServicesPageClient.tsx imports copy, references `copy.servicesPage`
- [x] `next build` succeeds with zero errors

## Deviations from Plan

### Auto-detected (pre-completed)

**Task 1 — Already complete before execution**
- Found during: Initial file inspection
- Issue: Task 1 files were already wired to lib/copy.ts in commit `3fa1c56` (prior agent work)
- Action: Confirmed correctness of existing wiring, no changes made, proceeded to Task 2
- Impact: None — acceptance criteria fully met

### Scope Adjustment

**ServicesPageClient format icons removed**
- Found during: Task 2 implementation
- Issue: The old `pageContent.mixing.formats` array contained icon/color JSX, but the ServicesPageClient JSX does not actually render a FormatTag section (the `<FormatTag>` components are defined but unused in the rendered output)
- Action: Removed the unused `formatIconsAndColors` helper and `formats` derived array to keep the code clean and avoid TypeScript unused-variable warnings
- Files modified: `components/services/ServicesPageClient.tsx`
- Commit: 3060cc9

## Known Stubs

None. All text is wired from `lib/copy.ts`. No hardcoded placeholder text remains in the updated files.

## Self-Check: PASSED

All 10 modified files exist and contain `import { copy } from "@/lib/copy"`. Commits `3fa1c56` and `3060cc9` verified in git log. Build succeeds.
