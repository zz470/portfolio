# Roadmap: Lorenzo Pardell Portfolio

## Milestones

- ✅ **v1.0 Supabase to Local Data Migration** - Phases 1-3 (shipped 2026-03-27)
- ✅ **v1.1 Production Readiness & Code Quality** - Phases 4-6 (shipped 2026-03-27)
- ✅ **v1.2 Real Project Images** - Phase 7 (shipped 2026-03-28)
- 🚧 **v1.3 Professional Polish & SEO** - Phases 8-10 (in progress)

## Phases

<details>
<summary>✅ v1.0 Supabase to Local Data Migration (Phases 1-3) - SHIPPED 2026-03-27</summary>

See `.planning/milestones/v1.0-ROADMAP.md`

</details>

<details>
<summary>✅ v1.1 Production Readiness & Code Quality (Phases 4-6) - SHIPPED 2026-03-27</summary>

See `.planning/milestones/v1.1-ROADMAP.md`

</details>

<details>
<summary>✅ v1.2 Real Project Images (Phase 7) - SHIPPED 2026-03-28</summary>

See `.planning/milestones/v1.2-ROADMAP.md`

</details>

### 🚧 v1.3 Professional Polish & SEO (In Progress)

**Milestone Goal:** Rewrite copy for professional audience, implement comprehensive SEO, fix small UI issues, and add missing credibility features (reel, testimonials, CV).

- [ ] **Phase 8: Copy Backup & Rewrite** - Back up original text, then rewrite all page copy for professional B2B audience
- [ ] **Phase 9: Technical SEO & UI Fix** - Add JSON-LD structured data, optimize meta/titles/alt text, per-project OG images, Twitter cards, fix footer touch targets
- [ ] **Phase 10: New Pages & Credibility Features** - Create category archive pages, FAQ section, reel page, testimonials, and CV download

## Phase Details

### Phase 8: Copy Backup & Rewrite
**Goal**: All page text reads as professional, specific, and credibility-building for producers and post-production supervisors hiring sound talent
**Depends on**: Nothing (first phase of v1.3)
**Requirements**: COPY-01, COPY-02, COPY-03, COPY-04, COPY-05, COPY-06, COPY-07
**Success Criteria** (what must be TRUE):
  1. A backup file exists containing all original page copy, recoverable if needed
  2. Hero section communicates specific sound roles and project types (not generic "creative professional" language)
  3. Services descriptions name concrete deliverables (5.1 mix, dialogue edit, ADR supervision) rather than abstract promises
  4. About page reads as a professional track record (credits, roles, years) not a personal blog bio
  5. CTA, contact page, and footer use direct B2B language appropriate for production companies
**Plans:** 1/2 plans executed

Plans:
- [x] 08-01-PLAN.md — Back up original copy + create centralized lib/copy.ts with rewritten professional text
- [x] 08-02-PLAN.md — Wire all components to import from lib/copy.ts + rename Services to Expertise

### Phase 9: Technical SEO & UI Fix
**Goal**: Search engines fully understand site content through structured data and optimized metadata; social shares display rich project-specific previews
**Depends on**: Phase 8 (copy must be finalized before meta descriptions and titles reference it)
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, UI-01
**Success Criteria** (what must be TRUE):
  1. Google Rich Results Test validates JSON-LD on homepage (Person + LocalBusiness) and project pages (CreativeWork)
  2. Every page has a unique, keyword-rich title and meta description visible in browser tab and search results
  3. All images have descriptive alt text that includes project name and context (not "thumbnail" or "hero")
  4. Sharing any project URL on social media shows that project's hero image, title, and description (not a generic fallback)
  5. Footer social links are comfortably tappable on mobile without mis-taps (minimum 44x44px touch target)
**Plans:** 1/2 plans executed

Plans:
- [x] 09-01-PLAN.md — JSON-LD structured data, page metadata optimization, Twitter cards, footer touch targets
- [ ] 09-02-PLAN.md — Per-project OG images, CreativeWork JSON-LD, image alt text updates

### Phase 10: New Pages & Credibility Features
**Goal**: The portfolio has dedicated landing pages for SEO discoverability and credibility features that build trust with potential clients
**Depends on**: Phase 9 (new pages should inherit the SEO patterns established in Phase 9)
**Requirements**: SEO-07, SEO-08, FEAT-01, FEAT-02, FEAT-03
**Success Criteria** (what must be TRUE):
  1. Navigating to /portfolio/documentary (and other categories) shows a filtered portfolio page with category-specific title and meta description
  2. FAQ section is visible on the site with answers to common sound design hiring questions, each answer indexable by search engines
  3. /reel page loads and plays a showreel video (or hero link correctly navigates to a working reel destination)
  4. Homepage displays at least 2 client testimonials with attribution (name, project, or company)
  5. About page offers a downloadable CV/resume file (PDF or similar)
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 10-01: TBD
- [ ] 10-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 8 → 9 → 10

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 8. Copy Backup & Rewrite | v1.3 | 1/2 | In Progress|  |
| 9. Technical SEO & UI Fix | v1.3 | 1/2 | In Progress|  |
| 10. New Pages & Credibility Features | v1.3 | 0/? | Not started | - |
