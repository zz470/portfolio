# Milestones

## v1.3 Professional Polish & SEO (Shipped: 2026-03-29)

**Phases completed:** 4 phases, 8 plans
**Files changed:** 60 | **Lines:** +6,738 / -546

**Delivered:** Complete copy rewrite for professional B2B audience, comprehensive SEO with structured data, category archive pages, and dedicated FAQ page with 23 Q&As.

**Key accomplishments:**

- All page copy rewritten for professional B2B audience, centralized in `lib/copy.ts`; "Services" renamed to "Expertise"
- JSON-LD structured data (Person, ProfessionalService, CreativeWork) on all pages
- SEO metadata optimization: keyword-rich titles, meta descriptions, Twitter cards, per-project OG images, bilingual keywords
- Category archive pages at `/portfolio/category/[category]` with SEO treatment and sitemap
- Dedicated `/faq` page with 23 categorized Q&As across 4 sections, accordion UI, FAQPage JSON-LD
- Footer social links meet 44x44px touch target minimum

**Known Gaps:**
- FEAT-02 (testimonials) deferred — no client quotes available
- FEAT-03 (CV download) deferred — no PDF available

**Archives:**

- `.planning/milestones/v1.3-ROADMAP.md`
- `.planning/milestones/v1.3-REQUIREMENTS.md`

---

## v1.2 Real Project Images (Shipped: 2026-03-28)

**Phases completed:** 1 phase, 1 plan, 2 tasks
**Commits:** 12

**Delivered:** All 19 project records updated with real thumbnail and hero images. Placeholder SVGs removed. Homepage hero image added.

**Key accomplishments:**

- Updated 38 image URLs (19 thumbnails + 19 heroes) in projects.ts from placeholders to real project photos
- Mapped 22 project image directories with mixed naming conventions to correct data records
- Deleted placeholder-thumb.svg and placeholder-hero.svg
- Added real homepage hero image (Lorenzo on-set with boom mic)

**Archives:**

- `.planning/milestones/v1.2-ROADMAP.md`
- `.planning/milestones/v1.2-REQUIREMENTS.md`

---

## v1.1 Production Readiness & Code Quality (Shipped: 2026-03-27)

**Phases completed:** 3 phases, 7 plans, 4 tasks

**Key accomplishments:**

- One-liner:
- One-liner:
- One-liner:
- Replaced 3 remaining raw `<img>` tags with next/image in PortfolioDetail.tsx (mobile + desktop hero) and PortfolioCard.tsx (thumbnail with preserved loading callbacks), closing the INFRA-01 image optimization requirement
- 1. [Rule 1 - Bug] Fixed missing "use client" on SelectedWorks.tsx
- 1. [Rule 3 - Blocking] Homepage and remaining pages still used Supabase hooks

---

## v1.0 Supabase to Local Data Migration (Shipped: 2026-03-27)

**Phases completed:** 3 phases, 6 plans
**Files changed:** 50 | **Lines:** +3,720 / -366 | **Commits:** 33

**Delivered:** Complete migration from Supabase to local TypeScript data. The portfolio now runs with zero external database dependencies.

**Key accomplishments:**

- Migrated all 19 project records from Postgres backup to typed TypeScript data file with helper functions
- Generated 38 placeholder SVG images (thumbnail + hero for each project)
- Rewired 14 consumer files from Supabase hooks to direct local data imports
- Completely removed Supabase (client library, hooks, env vars, image domain config)
- Verified all 6 routes and interactive features (automated script + visual browser testing)

**Archives:**

- `.planning/milestones/v1.0-ROADMAP.md`
- `.planning/milestones/v1.0-REQUIREMENTS.md`

---
