# Roadmap: Lorenzo Pardell Portfolio

## Milestones

- ✅ **v1.0 Supabase to Local Data Migration** — Phases 1-3 (shipped 2026-03-27)
- 🔄 **v1.1 Production Readiness & Code Quality** — Phases 4-6 (in progress)

## Phases

<details>
<summary>✅ v1.0 Supabase to Local Data Migration (Phases 1-3) — SHIPPED 2026-03-27</summary>

- [x] Phase 1: Local Data Layer (2/2 plans) — completed 2026-03-27
- [x] Phase 2: Supabase Removal (2/2 plans) — completed 2026-03-27
- [x] Phase 3: Continuity Verification (2/2 plans) — completed 2026-03-27

</details>

### v1.1 Production Readiness & Code Quality

- [x] **Phase 4: Code Quality & Bug Fixes** - Clean up duplicated code, remove debug noise, and fix known rendering bugs (completed 2026-03-27)
- [x] **Phase 5: Infrastructure & Image Optimization** - Migrate to next/image and fix deprecated config (completed 2026-03-27)
- [ ] **Phase 6: Server Components, SEO & Error Pages** - Convert to Server Components, add SEO infrastructure, and add error/404 pages

## Phase Details

### Phase 4: Code Quality & Bug Fixes
**Goal**: The codebase is clean, maintainable, and free of known rendering bugs
**Depends on**: Nothing (first phase of v1.1)
**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, FIX-01, FIX-02, FIX-03
**Success Criteria** (what must be TRUE):
  1. Animation variants are defined in one file and imported — no copy-paste variants exist across components
  2. Contact information (phone, email, WhatsApp) has a single source of truth — changing it in one place updates everywhere
  3. The CTA section renders with a visible dark background — no white overlay obscuring the content
  4. ProjectVideoCard iframe error is handled via state update — no JSX returned from an event handler
  5. Browser console shows zero console.log/warn outputs and zero TypeScript/lint warnings on any page
**Plans**: 2 plans
Plans:
- [x] 04-01-PLAN.md — Create shared modules, fix bugs, remove console.logs and dead code
- [x] 04-02-PLAN.md — Rewire all consumers to shared modules and visual verification
**UI hint**: yes

### Phase 5: Infrastructure & Image Optimization
**Goal**: Project images render via next/image and the config uses current Next.js APIs
**Depends on**: Phase 4
**Requirements**: INFRA-01, INFRA-02
**Success Criteria** (what must be TRUE):
  1. All project images (thumbnails, heroes) render via next/image — no raw `<img>` tags remain in project-related components
  2. `next.config.ts` uses `remotePatterns` instead of `domains` — no deprecation warning appears during `next build`
**Plans**: 2 plans
Plans:
- [x] 05-01-PLAN.md — Replace raw img tags with next/image and add missing sizes props
- [x] 05-02-PLAN.md — Gap closure: replace remaining raw img tags in PortfolioDetail.tsx and PortfolioCard.tsx
**UI hint**: no

### Phase 6: Server Components, SEO & Error Pages
**Goal**: Search engines can index all pages, social sharing works, and broken/missing routes show branded error pages
**Depends on**: Phase 4
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, ERR-01, ERR-02
**Success Criteria** (what must be TRUE):
  1. Visiting `/sitemap.xml` returns a valid XML sitemap listing all routes including individual project pages
  2. Visiting `/robots.txt` returns a valid robots file that allows crawlers
  3. Sharing any page URL (home, portfolio, project detail, services, about, contact) on a social platform renders a title, description, and image preview
  4. Each project detail page generates unique Open Graph metadata using that project's title and description
  5. Visiting a non-existent URL renders a branded 404 page with navigation back to the site — not a blank Next.js error
  6. A runtime error in any page renders a recovery UI instead of a white screen
**Plans**: 3 plans
Plans:
- [ ] 06-01-PLAN.md — SEO infrastructure (sitemap, robots, OG image, root metadata) and error pages (404, error boundary)
- [ ] 06-02-PLAN.md — Convert simple pages (home, contact, project detail) to Server Components with metadata
- [ ] 06-03-PLAN.md — Convert complex pages (about, services, portfolio) to Server Components with client wrappers
**UI hint**: yes

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Local Data Layer | v1.0 | 2/2 | Complete | 2026-03-27 |
| 2. Supabase Removal | v1.0 | 2/2 | Complete | 2026-03-27 |
| 3. Continuity Verification | v1.0 | 2/2 | Complete | 2026-03-27 |
| 4. Code Quality & Bug Fixes | v1.1 | 2/2 | Complete   | 2026-03-27 |
| 5. Infrastructure & Image Optimization | v1.1 | 2/2 | Complete   | 2026-03-27 |
| 6. Server Components, SEO & Error Pages | v1.1 | 0/3 | Not started | - |
