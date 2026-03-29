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
- [x] **Phase 10: New Pages & Credibility Features** - Create category archive pages, FAQ section, reel page, testimonials, and CV download (completed 2026-03-29)

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
- [x] 09-02-PLAN.md — Per-project OG images, CreativeWork JSON-LD, image alt text updates

### Phase 10: New Pages & Credibility Features
**Goal**: Category archive pages for SEO discoverability and FAQ section targeting sound design hiring queries; FEAT-01 confirmed (reel button hidden), FEAT-02/FEAT-03 deferred
**Depends on**: Phase 9 (new pages should inherit the SEO patterns established in Phase 9)
**Requirements**: SEO-07, SEO-08, FEAT-01, FEAT-02, FEAT-03
**Success Criteria** (what must be TRUE):
  1. Navigating to /portfolio/category/documentary (and other categories) shows a filtered portfolio page with category-specific title and meta description
  2. FAQ section is visible on the Expertise page with answers to common sound design hiring questions, each answer indexable by search engines
  3. Reel button confirmed hidden (showWatchReelButton defaults to false) -- no broken link possible
  4. FEAT-02 (testimonials) deferred -- user has no quotes ready
  5. FEAT-03 (CV download) deferred -- user has no PDF ready
**Plans:** 2/2 plans complete

Plans:
- [x] 10-01-PLAN.md — Category archive pages at /portfolio/category/[category] with SEO metadata, JSON-LD, and sitemap
- [x] 10-02-PLAN.md — FAQ section on Expertise page with accordion UI, centralized copy, and FAQPage JSON-LD

## Progress

**Execution Order:**
Phases execute in numeric order: 8 → 9 → 10

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 8. Copy Backup & Rewrite | v1.3 | 1/2 | In Progress|  |
| 9. Technical SEO & UI Fix | v1.3 | 1/2 | In Progress|  |
| 10. New Pages & Credibility Features | v1.3 | 2/2 | Complete    | 2026-03-29 |

### Phase 11: Dedicated FAQ Page Inspired by defactosound.com/faq

**Goal:** Create a dedicated /faq route with 20+ categorized Q&As across 4 sections, expanded Defacto-level answers, full SEO treatment, and replace the Expertise page FAQ section with a teaser linking to the new page
**Depends on:** Phase 10
**Requirements**: FAQ-01, FAQ-02, FAQ-03, FAQ-04, FAQ-05, FAQ-06, FAQ-07, FAQ-08, FAQ-09, FAQ-10
**Success Criteria** (what must be TRUE):
  1. /faq page renders with hero, 4 categorized accordion sections (Getting Started, Audio Post Process, Technical, About Me), and bottom CTA
  2. 20+ Q&As with detailed, SEO-rich answers mentioning specific tools, clients, and deliverables
  3. FAQPage JSON-LD present on /faq only (removed from /services)
  4. Expertise page shows a 3-question teaser with "See all FAQs" link to /faq
  5. FAQ link appears in header nav, footer nav, and sitemap
**Plans:** 2 plans

Plans:
- [ ] 11-01-PLAN.md — FAQ page content (20+ categorized Q&As in lib/copy.ts), /faq route, FAQPageClient component with hero/accordions/CTA
- [ ] 11-02-PLAN.md — Integration: Expertise page teaser, JSON-LD migration, nav links, sitemap update
