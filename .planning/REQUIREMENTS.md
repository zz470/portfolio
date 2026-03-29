# Requirements — v1.3 Professional Polish & SEO

## Copy & Content

- [x] **COPY-01**: All original page copy backed up to reference file before any changes
- [x] **COPY-02**: Hero section rewritten with professional, specific messaging
- [x] **COPY-03**: CTA section rewritten without cliches — focus on availability and deliverables
- [x] **COPY-04**: Services section descriptions rewritten to be concrete and deliverable-focused
- [x] **COPY-05**: About page bio rewritten for professional credibility (roles, track record, not feelings)
- [x] **COPY-06**: Contact page copy rewritten for B2B tone (no "friendly chat", no emojis)
- [x] **COPY-07**: Footer tagline rewritten with specificity about what you do and who for

## SEO

- [x] **SEO-01**: JSON-LD structured data added to all pages (Person, CreativeWork, LocalBusiness schemas)
- [x] **SEO-02**: Page titles optimized with keywords ("Sound Design Portfolio" not just "Portfolio")
- [x] **SEO-03**: Meta descriptions optimized with service keywords and location
- [x] **SEO-04**: Image alt text updated with descriptive, keyword-rich text across all components
- [x] **SEO-05**: Per-project OG images using project hero photos instead of generic og-image.png
- [x] **SEO-06**: Twitter card metadata added to all pages
- [x] **SEO-07**: Category archive pages created (/portfolio/documentary, /portfolio/series, etc.)
- [x] **SEO-08**: FAQ section added targeting common search queries about sound design services

## UI Fixes

- [x] **UI-01**: Footer social links have adequate touch targets on mobile (min 44x44px)

## Features

- [x] **FEAT-01**: Reel button confirmed hidden (showWatchReelButton defaults to false, no /reel route needed)

## Dedicated FAQ Page (Phase 11)

- [x] **FAQ-01**: Categorized FAQ content with 4 groups (Getting Started, Audio Post Process, Technical, About Me) in lib/copy.ts
- [x] **FAQ-02**: 20+ total Q&As across all categories with Defacto-level detailed answers
- [x] **FAQ-03**: FAQ answers include specific tools, clients, and deliverables (Pro Tools, HBO, Netflix, 5.1, Dolby Atmos)
- [x] **FAQ-04**: /faq Server Component route with SEO metadata (title, description, OG, Twitter cards)
- [x] **FAQ-05**: FAQPage JSON-LD structured data on /faq page
- [x] **FAQ-06**: FAQPageClient with hero section, categorized accordions (type="single" collapsible), and bottom CTA
- [ ] **FAQ-07**: Expertise page FAQ section replaced with 3-question teaser + "See all FAQs" link to /faq
- [ ] **FAQ-08**: FAQPage JSON-LD removed from /services page (canonical FAQ is /faq only)
- [ ] **FAQ-09**: FAQ link added to header navigation, footer navigation, and sitemap
- [ ] **FAQ-10**: /faq route added to sitemap.ts

## Future Requirements (Deferred)

- [ ] **FEAT-02**: Testimonials section on homepage — deferred per D-10 (no client quotes ready)
- [ ] **FEAT-03**: CV/resume download on About page — deferred per D-11 (no PDF ready)
- Dark mode fix across all components — v1.4
- Breadcrumb navigation on project detail pages
- Keyboard navigation for carousel and category filters
- prefers-reduced-motion respect on animations
- Skip-to-content accessibility link
- Portfolio grid spacing improvement
- Structured contact/inquiry form with project type selection
- Availability indicator
- Case studies (detailed project breakdowns)
- Audio samples / before-after demos
- Equipment/technical specs section

## Out of Scope

- Blog/resources section — content marketing deferred
- Pricing/rate information — too sensitive for public display
- Availability calendar/booking — overkill for current scale
- Interactive audio visualization — nice-to-have, not priority

## Traceability

| Requirement | Phase | Plan | Status |
|-------------|-------|------|--------|
| COPY-01 | Phase 8 | — | pending |
| COPY-02 | Phase 8 | — | pending |
| COPY-03 | Phase 8 | — | pending |
| COPY-04 | Phase 8 | — | pending |
| COPY-05 | Phase 8 | — | pending |
| COPY-06 | Phase 8 | — | pending |
| COPY-07 | Phase 8 | — | pending |
| SEO-01 | Phase 9 | — | pending |
| SEO-02 | Phase 9 | — | pending |
| SEO-03 | Phase 9 | — | pending |
| SEO-04 | Phase 9 | — | pending |
| SEO-05 | Phase 9 | — | pending |
| SEO-06 | Phase 9 | — | pending |
| SEO-07 | Phase 10 | — | pending |
| SEO-08 | Phase 10 | — | pending |
| UI-01 | Phase 9 | — | pending |
| FEAT-01 | Phase 10 | — | satisfied |
| FEAT-02 | Phase 10 | — | deferred (D-10) |
| FEAT-03 | Phase 10 | — | deferred (D-11) |
| FAQ-01 | Phase 11 | 11-01 | pending |
| FAQ-02 | Phase 11 | 11-01 | pending |
| FAQ-03 | Phase 11 | 11-01 | pending |
| FAQ-04 | Phase 11 | 11-01 | pending |
| FAQ-05 | Phase 11 | 11-01 | pending |
| FAQ-06 | Phase 11 | 11-01 | pending |
| FAQ-07 | Phase 11 | 11-02 | pending |
| FAQ-08 | Phase 11 | 11-02 | pending |
| FAQ-09 | Phase 11 | 11-02 | pending |
| FAQ-10 | Phase 11 | 11-02 | pending |
