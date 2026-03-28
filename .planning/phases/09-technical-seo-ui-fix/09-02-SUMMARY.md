---
phase: 09-technical-seo-ui-fix
plan: 02
subsystem: seo
tags: [json-ld, structured-data, open-graph, twitter-card, alt-text, image-seo]
requirements: [SEO-01, SEO-04, SEO-05, SEO-06]

dependency_graph:
  requires: [09-01]
  provides: [CreativeWork JSON-LD on project pages, per-project OG images, Twitter cards, descriptive alt text]
  affects: [app/portfolio/[slug]/page.tsx, components/home/HeroSection.tsx, components/portfolio/PortfolioCard.tsx, components/home/SelectedWorks.tsx, components/portfolio/PortfolioDetail.tsx, components/portfolio/PortfolioDetailSecondary.tsx, components/portfolio/ProjectNavigation.tsx]

tech_stack:
  added: []
  patterns: [JSON-LD script injection in Server Component, per-project OG image with hero_url fallback, descriptive alt text with role context]

key_files:
  created: []
  modified:
    - app/portfolio/[slug]/page.tsx
    - components/home/HeroSection.tsx
    - components/portfolio/PortfolioCard.tsx
    - components/home/SelectedWorks.tsx
    - components/portfolio/PortfolioDetail.tsx
    - components/portfolio/PortfolioDetailSecondary.tsx
    - components/portfolio/ProjectNavigation.tsx

decisions:
  - Per-project OG image uses hero_url with /og-image.png fallback — hero photos are the most visually compelling social preview for film/TV projects
  - JSON-LD script injected in ProjectPage Server Component, not ProjectSlugClient — Server Components are the correct place for static structured data to ensure it's in initial HTML
  - Alt text pattern for detail pages uses project.roles[0] — surfaces the specific role (e.g. "Re-Recording Mixer") which is the primary SEO keyword for each project

metrics:
  duration: 3min
  completed_date: "2026-03-28T23:23:48Z"
  tasks: 2
  files_modified: 7
---

# Phase 09 Plan 02: JSON-LD, OG Images, Twitter Cards, and Alt Text Summary

**One-liner:** CreativeWork JSON-LD with contributor roles on all project pages, per-project OG images from hero photos, Twitter summary_large_image cards, and 8 descriptive alt text updates across the site.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add CreativeWork JSON-LD, per-project OG images, and Twitter cards | 44e0202 | app/portfolio/[slug]/page.tsx |
| 2 | Update all image alt text to be descriptive and keyword-rich | 56191a5 | 6 component files |

## What Was Built

### Task 1: JSON-LD + OG + Twitter on Project Pages

`app/portfolio/[slug]/page.tsx` now:

- Imports `buildCreativeWorkSchema` from `@/lib/jsonld` (created in Plan 09-01)
- `generateMetadata` returns per-project OG image using `project.hero_url` with fallback to `/og-image.png`
- `generateMetadata` returns `twitter.card = "summary_large_image"` on every project page
- `ProjectPage` Server Component renders `<script type="application/ld+json">` with CreativeWork schema including contributor roles
- JSON-LD is in the Server Component (not ProjectSlugClient) so it's present in the initial HTML response

### Task 2: Descriptive Alt Text

All 8 image elements updated:

| File | Old alt | New alt |
|------|---------|---------|
| HeroSection.tsx | "Hero background" | "Lorenzo Pardell — Re-Recording Mixer and Sound Designer based in Sao Paulo" |
| PortfolioCard.tsx | `project.title` | `${project.title} — sound by Lorenzo Pardell` |
| SelectedWorks.tsx | `project.title` | `${project.title} — sound by Lorenzo Pardell` |
| PortfolioDetail.tsx (hero) | `project.title` | `${project.title} — ${project.roles[0]} by Lorenzo Pardell` |
| PortfolioDetail.tsx (desktop) | `project.title` | `${project.title} — audio production by Lorenzo Pardell` |
| PortfolioDetailSecondary.tsx | `project.title` | `${project.title} — ${project.roles[0]} by Lorenzo Pardell` |
| ProjectNavigation.tsx (prev) | `prevProject.title` | `${prevProject.title} — portfolio thumbnail` |
| ProjectNavigation.tsx (next) | `nextProject.title` | `${nextProject.title} — portfolio thumbnail` |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All data is wired from real project records.

## Self-Check: PASSED

- app/portfolio/[slug]/page.tsx — FOUND
- components/home/HeroSection.tsx — FOUND
- components/portfolio/PortfolioCard.tsx — FOUND
- components/home/SelectedWorks.tsx — FOUND
- components/portfolio/PortfolioDetail.tsx — FOUND
- components/portfolio/PortfolioDetailSecondary.tsx — FOUND
- components/portfolio/ProjectNavigation.tsx — FOUND
- Commit 44e0202 — FOUND
- Commit 56191a5 — FOUND
