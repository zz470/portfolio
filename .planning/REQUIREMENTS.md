# Requirements: Lorenzo Pardell Portfolio

**Defined:** 2026-03-27
**Core Value:** The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, without external database dependencies.

## v1.1 Requirements

Requirements for production readiness and code quality. Each maps to roadmap phases.

### SEO & Discoverability

- [ ] **SEO-01**: Pages with static content render as Server Components with SEO-indexable HTML
- [ ] **SEO-02**: Site generates sitemap.xml with all routes via `app/sitemap.ts`
- [ ] **SEO-03**: Site serves robots.txt via `app/robots.ts`
- [ ] **SEO-04**: Each page has Open Graph metadata (title, description, image) for social sharing
- [ ] **SEO-05**: Portfolio project pages have unique OG metadata per project

### Error Handling

- [ ] **ERR-01**: Custom 404 page (not-found.tsx) with branding and navigation back to site
- [ ] **ERR-02**: Global error boundary (error.tsx) catches runtime errors with recovery option

### Code Quality

- [x] **QUAL-01**: Animation variants centralized in shared module, imported by all consuming files
- [x] **QUAL-02**: Project sorting logic extracted into single shared utility function
- [x] **QUAL-03**: Contact information (phone, email, WhatsApp) centralized in one source file
- [x] **QUAL-04**: All console.log/warn statements removed from production code
- [x] **QUAL-05**: Unused variables, imports, and dead code removed

### Bug Fixes

- [x] **FIX-01**: CTA section renders with correct dark background (remove white overlay)
- [x] **FIX-02**: ProjectVideoCard iframe error updates component state instead of returning JSX
- [x] **FIX-03**: IntersectionObserver cleanup captures ref in local variable before unmount

### Infrastructure

- [ ] **INFRA-01**: Project images use next/image component with proper width/height or fill
- [ ] **INFRA-02**: next.config.ts uses `images.remotePatterns` instead of deprecated `images.domains`

## Future Requirements

### Visual Polish

- **VIS-01**: Dark mode toggle with ThemeProvider wiring
- **VIS-02**: Replace placeholder images with real project images

### Analytics

- **ANLT-01**: Visitor tracking integration (Vercel Analytics, Plausible, or similar)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Twitter Cards | Not needed — OG tags sufficient for social sharing |
| Dark mode toggle | CSS vars exist but wiring deferred to future milestone |
| Analytics | Deferred to future milestone |
| CMS integration | Content lives in code for now |
| Test suite | Manual testing sufficient for personal portfolio |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SEO-01 | Phase 6 | Pending |
| SEO-02 | Phase 6 | Pending |
| SEO-03 | Phase 6 | Pending |
| SEO-04 | Phase 6 | Pending |
| SEO-05 | Phase 6 | Pending |
| ERR-01 | Phase 6 | Pending |
| ERR-02 | Phase 6 | Pending |
| QUAL-01 | Phase 4 | Complete |
| QUAL-02 | Phase 4 | Complete |
| QUAL-03 | Phase 4 | Complete |
| QUAL-04 | Phase 4 | Complete (04-01) |
| QUAL-05 | Phase 4 | Complete (04-01) |
| FIX-01 | Phase 4 | Complete (04-01) |
| FIX-02 | Phase 4 | Complete (04-01) |
| FIX-03 | Phase 4 | Complete (04-01) |
| INFRA-01 | Phase 5 | Pending |
| INFRA-02 | Phase 5 | Pending |

**Coverage:**
- v1.1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0

---
*Requirements defined: 2026-03-27*
*Last updated: 2026-03-27 after roadmap creation (v1.1 Phases 4-6)*
