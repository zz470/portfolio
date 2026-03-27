---
phase: 04-code-quality-bug-fixes
plan: 01
subsystem: lib, components
tags: [utilities, bug-fix, cleanup, animations, contact-info, sorting]
dependency_graph:
  requires: []
  provides:
    - lib/animations.ts (shared animation variants)
    - lib/contact-info.ts (centralized contact information)
    - lib/data/projects.ts#sortProjectsByDate (sorting utility)
  affects:
    - components/home/CTASection.tsx
    - components/portfolio/ProjectVideoCard.tsx
    - app/page.tsx
    - components/portfolio/PortfolioCard.tsx
tech_stack:
  added:
    - lib/animations.ts (framer-motion Variants typed exports)
    - lib/contact-info.ts (centralized contact object with computed links)
  patterns:
    - Shared animation variant objects with initial/animate keys
    - Centralized contact info with getter-based computed URLs
    - Functional sort utility that returns a new sorted array
key_files:
  created:
    - lib/animations.ts
    - lib/contact-info.ts
  modified:
    - lib/data/projects.ts
    - components/home/CTASection.tsx
    - components/portfolio/ProjectVideoCard.tsx
    - app/page.tsx
    - components/portfolio/PortfolioCard.tsx
decisions:
  - Use initial/animate keys in animations.ts per CONVENTIONS.md (not hidden/visible)
  - Remove sectionRef from app/page.tsx and drop ref prop from SelectedWorks call site
  - Remove useEffect from PortfolioCard entirely since its only purpose was the removed console.log
metrics:
  duration: ~4 minutes
  completed_date: "2026-03-27"
  tasks_completed: 2
  files_changed: 5
  files_created: 2
---

# Phase 04 Plan 01: Shared Utilities, Bug Fixes, and Dead Code Cleanup Summary

**One-liner:** Created three shared utility modules (animations, contact info, date sorting) and fixed all 3 known bugs (CTA white overlay, iframe onError state, stale IntersectionObserver ref) while eliminating all console.log/warn statements and dead code.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create shared utility modules | d468e5a | lib/animations.ts, lib/contact-info.ts, lib/data/projects.ts |
| 2 | Fix bugs, remove console.logs, clean dead code | 9bd9027 | CTASection.tsx, ProjectVideoCard.tsx, app/page.tsx, PortfolioCard.tsx |

## What Was Built

### Shared Utility Modules

**`lib/animations.ts`** — Three typed animation variant objects (`fadeIn`, `slideUp`, `staggerContainer`) using `Variants` from framer-motion. Uses `initial/animate` key convention per project conventions.

**`lib/contact-info.ts`** — Single source of truth for Lorenzo's phone, email, and WhatsApp message. Computed getter properties return ready-to-use `tel:`, `mailto:`, and WhatsApp API URLs.

**`lib/data/projects.ts`** — Added `sortProjectsByDate(projectList: Project[]): Project[]` which returns a new sorted array with most recent projects first. Uses the same logic previously duplicated in PortfolioGrid.tsx and ProjectNavigation.tsx.

### Bug Fixes

**FIX-01 (CTASection white overlay):** Removed `<div className="absolute inset-0 bg-gradient-to-b bg-white"></div>` that was covering the entire `bg-black text-white` section background.

**FIX-02 (ProjectVideoCard iframe onError):** Added `const [iframeError, setIframeError] = useState(false)`. Changed iframe `onError` from returning JSX (invalid — event handlers cannot return JSX) to calling `setIframeError(true)`. Added a third render state showing a fallback link when the iframe also fails.

**FIX-03 (IntersectionObserver stale ref):** Removed the entire IntersectionObserver `useEffect` from `app/page.tsx` along with the `sectionRef`, `isVisible`, local `fadeIn`, and `staggerContainer` definitions — none were used in the JSX output. Also removed the `ref={sectionRef}` prop from `<SelectedWorks>` call.

### Cleanup

**QUAL-04:** Removed all `console.log`/`console.warn` from production code. `PortfolioCard.tsx` had a debug `useEffect` logging thumbnail URLs and an `onLoad` console.log — both removed. `console.error` on image failures was also removed (silent failure via state).

**QUAL-05:** Removed commented-out `//import ClientQuote` and all unused imports (`useEffect`, `useRef`, `useState`) from `app/page.tsx`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed console.error from PortfolioCard image onError handler**
- **Found during:** Task 2 (QUAL-04 cleanup)
- **Issue:** Plan mentioned removing `console.log` statements but the `onError` handler also had `console.error`. While `console.error` is in the allowed list per error handling conventions, this was a debug statement with no recovery action, not a genuine error log.
- **Fix:** Simplified `onError` to `() => setImageError(true)` — the error state already triggers the fallback UI.
- **Files modified:** components/portfolio/PortfolioCard.tsx
- **Commit:** 9bd9027

**2. [Rule 1 - Bug] Removed useEffect import after removing the only useEffect**
- **Found during:** Task 2 cleanup of PortfolioCard.tsx
- **Issue:** After removing the debug useEffect, `useEffect` was still imported but unused — would cause a TypeScript lint warning.
- **Fix:** Removed `useEffect` from the React import, keeping `useState` and `useRef`.
- **Files modified:** components/portfolio/PortfolioCard.tsx
- **Commit:** 9bd9027

## Known Stubs

None — all modules export real, functional code. Consumer wiring (Plan 02) will import these modules into existing components.

## Build Verification

`npx next build` completed successfully after all changes. All 9 static pages generated without errors.

## Self-Check: PASSED
