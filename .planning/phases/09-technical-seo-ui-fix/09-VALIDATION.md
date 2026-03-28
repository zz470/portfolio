# Phase 9: Technical SEO & UI Fix - Validation Architecture

**Created:** 2026-03-28
**Source:** Extracted from 09-RESEARCH.md Validation Architecture section

## Test Framework Decision

| Property | Value |
|----------|-------|
| Framework | None — no test files, no jest/vitest config in project |
| Rationale | This phase is purely metadata and CSS configuration work. Installing a test framework (Jest/Vitest) would be disproportionate overhead for changes that produce no testable business logic. |
| Automated gate | `npm run build` (TypeScript compilation + Next.js build) |
| Manual verification | View-source checks, Chrome DevTools inspection |

### Why No Test Framework

1. **No existing test infrastructure** — The project has zero test files and no test runner configured
2. **Phase scope is metadata-only** — JSON-LD schemas, meta tags, alt text strings, and CSS classes are not unit-testable in a meaningful way without a DOM rendering framework
3. **Build gate catches type errors** — `npm run build` validates TypeScript types, import resolution, and Next.js compilation — the primary failure modes for this phase
4. **Manual verification is more effective** — Checking JSON-LD validity, OG image rendering, and touch target sizing is best done via browser DevTools and external validators (Google Rich Results Test)

## Phase Requirements to Verification Map

| Req ID | Behavior | Automated Command | Manual Verification |
|--------|----------|-------------------|---------------------|
| SEO-01 | JSON-LD renders in page HTML for homepage and project pages | `npm run build` (build succeeds with JSON-LD script tags) | View source: search for `application/ld+json` on homepage and a project page |
| SEO-02 | Page title in `<title>` tag matches keyword-rich spec | `npm run build` (metadata export compiles) | Browser tab shows correct title on each page; no double "Lorenzo Pardell" suffix |
| SEO-03 | Meta description matches spec per page | `npm run build` | View source: inspect `<meta name="description">` on each page |
| SEO-04 | Image alt text is descriptive on all image components | `npm run build` (alt prop compiles) | Chrome DevTools Elements panel: search `alt=` in component HTML |
| SEO-05 | Project OG image resolves to hero photo, not og-image.png | `npm run build` | View source on a project page: inspect `og:image` meta tag |
| SEO-06 | Twitter card meta tags present on all pages | `npm run build` | View source: search for `twitter:card` on each page |
| UI-01 | Footer social links are min 44x44px tappable | `npm run build` | Chrome DevTools mobile emulation (375px): inspect computed size of social link elements |

## Automated Gate

**Command:** `npm run build`

**What it catches:**
- TypeScript type errors (wrong prop types, missing imports, invalid metadata shape)
- Next.js compilation errors (malformed metadata exports, invalid generateMetadata return)
- Import resolution (missing `lib/jsonld.ts`, broken `@/` path aliases)

**What it does NOT catch:**
- JSON-LD schema correctness (valid schema.org types/properties)
- OG image URL resolution (whether the image actually exists at that path)
- Visual touch target sizing (whether 44x44px renders correctly)
- Title template double-suffix (syntactically valid but semantically wrong)

## Manual Verification Checklist

After each wave completes and `npm run build` passes:

### Wave 1 (Plan 01) Checks
- [ ] `npm run build` passes with zero errors
- [ ] View source on homepage (`/`): two `<script type="application/ld+json">` blocks present — one Person, one ProfessionalService
- [ ] Browser tab on homepage shows: "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo"
- [ ] Browser tab on portfolio page shows: "Sound Design Portfolio | Film, Series & Documentary | Lorenzo Pardell"
- [ ] Browser tab on services page shows: "Sound Design & Mixing Expertise | Lorenzo Pardell"
- [ ] Browser tab on about page shows: "About | Re-Recording Mixer & Sound Designer | Lorenzo Pardell"
- [ ] Browser tab on contact page shows: "Contact | Sound Designer Sao Paulo | Lorenzo Pardell"
- [ ] View source: `<meta name="keywords">` contains both English terms ("sound design") and Portuguese terms ("design de som")
- [ ] View source on any page: `twitter:card` meta tag present
- [ ] Chrome DevTools mobile (375px): footer social links computed size >= 44x44px

### Wave 2 (Plan 02) Checks
- [ ] `npm run build` passes with zero errors
- [ ] View source on a project page (e.g., `/portfolio/{any-slug}`): `<script type="application/ld+json">` with CreativeWork schema present
- [ ] View source on a project page: `og:image` points to project hero image path (not `/og-image.png`) for projects with hero photos
- [ ] View source on a project page: `twitter:card` = `summary_large_image`
- [ ] Chrome DevTools Elements panel: all `<img>` alt attributes contain descriptive text (not "Hero background", not bare title)

### Post-Deployment (Optional)
- [ ] Google Rich Results Test on `https://lorenzopardell.com` — validates Person + ProfessionalService schemas
- [ ] Google Rich Results Test on a project URL — validates CreativeWork schema
- [ ] Twitter Card Validator on a project URL — shows project hero image
- [ ] Facebook Sharing Debugger on a project URL — shows project hero image

## Sampling Strategy

- **Per task commit:** `npm run build` — catches type errors immediately
- **Per wave completion:** Full manual checklist for that wave
- **Phase gate:** All checklist items from both waves verified before `/gsd:verify-work`
