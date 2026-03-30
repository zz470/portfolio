---
task_id: 260330-lkb
type: quick
scope: fix
completed: "2026-03-30"
duration_minutes: 5
tasks_completed: 1
tasks_total: 1
files_modified:
  - lib/contact-info.ts
  - components/about/AboutPageClient.tsx
commits:
  - 9bcbcff
key_decisions:
  - Added phoneFormatted getter to contact-info.ts to provide human-readable phone display format
---

# Quick Task 260330-lkb: Fix AboutPageClient.tsx Hardcoded Contact Info

**One-liner:** Added `phoneFormatted` getter to `contact-info.ts` and replaced four hardcoded email/phone strings in `AboutPageClient.tsx` with `contactInfo` imports, restoring QUAL-03 single-source-of-truth invariant.

## What Was Done

Replaced hardcoded `lorenzopardell@gmail.com` and `+5511917619699` / `+55 11 91761-9699` values in the About page's "Let's Talk" section with imports from the centralized `contactInfo` object in `lib/contact-info.ts`.

### Files Modified

| File | Change |
|------|--------|
| `lib/contact-info.ts` | Added `phoneFormatted` getter returning `"+55 11 91761-9699"` |
| `components/about/AboutPageClient.tsx` | Added `contactInfo` import; replaced 4 hardcoded strings with `contactInfo.emailLink`, `contactInfo.email`, `contactInfo.phoneLink`, `contactInfo.phoneFormatted` |

## Verification Results

- `grep -c "lorenzopardell@gmail.com\|+5511917619699\|91761-9699" components/about/AboutPageClient.tsx` → **0** (no hardcoded strings remain)
- `grep -c "contactInfo" components/about/AboutPageClient.tsx` → **5** (import + 4 usages)
- `grep -c "phoneFormatted" lib/contact-info.ts` → **1**
- `npx next build` → **passed**

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Self-Check: PASSED

- `lib/contact-info.ts` exists and contains `phoneFormatted` getter
- `components/about/AboutPageClient.tsx` imports and uses `contactInfo`
- Commit `9bcbcff` exists in git log
