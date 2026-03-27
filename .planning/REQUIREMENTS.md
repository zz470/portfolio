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

- [ ] **QUAL-01**: Animation variants centralized in shared module, imported by all consuming files
- [ ] **QUAL-02**: Project sorting logic extracted into single shared utility function
- [ ] **QUAL-03**: Contact information (phone, email, WhatsApp) centralized in one source file
- [ ] **QUAL-04**: All console.log/warn statements removed from production code
- [ ] **QUAL-05**: Unused variables, imports, and dead code removed

### Bug Fixes

- [ ] **FIX-01**: CTA section renders with correct dark background (remove white overlay)
- [ ] **FIX-02**: ProjectVideoCard iframe error updates component state instead of returning JSX
- [ ] **FIX-03**: IntersectionObserver cleanup captures ref in local variable before unmount

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
| SEO-01 | — | Pending |
| SEO-02 | — | Pending |
| SEO-03 | — | Pending |
| SEO-04 | — | Pending |
| SEO-05 | — | Pending |
| ERR-01 | — | Pending |
| ERR-02 | — | Pending |
| QUAL-01 | — | Pending |
| QUAL-02 | — | Pending |
| QUAL-03 | — | Pending |
| QUAL-04 | — | Pending |
| QUAL-05 | — | Pending |
| FIX-01 | — | Pending |
| FIX-02 | — | Pending |
| FIX-03 | — | Pending |
| INFRA-01 | — | Pending |
| INFRA-02 | — | Pending |

**Coverage:**
- v1.1 requirements: 17 total
- Mapped to phases: 0
- Unmapped: 17

---
*Requirements defined: 2026-03-27*
*Last updated: 2026-03-27 after initial definition*
