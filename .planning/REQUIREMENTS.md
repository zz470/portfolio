# Requirements: Lorenzo Pardell Portfolio

**Defined:** 2026-03-27
**Core Value:** The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, without external database dependencies.

## v1.2 Requirements

Requirements for real project images milestone. Each maps to roadmap phases.

### Image Data

- [ ] **IMG-01**: Each of the 19 projects' `thumbnail_url` points to a real image from its directory
- [ ] **IMG-02**: Each of the 19 projects' `hero_url` points to a real image from its directory
- [ ] **IMG-03**: Portfolio grid displays real thumbnails for all projects
- [ ] **IMG-04**: Project detail pages display real hero images for all projects
- [ ] **IMG-05**: Unused placeholder SVGs (`placeholder-thumb.svg`, `placeholder-hero.svg`) removed

## Future Requirements

### New Projects

- **PROJ-01**: Add jumo_health project with full data and images
- **PROJ-02**: Add natto_pharma project with full data and images
- **PROJ-03**: Add unobravo project with full data and images

### Gallery

- **GAL-01**: Support multiple images per project (gallery/carousel)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Adding new projects (jumo_health, natto_pharma, unobravo) | Separate milestone — requires full project data, not just images |
| Gallery/carousel for multiple images | Future enhancement — data model change needed |
| Image format optimization/conversion | Handle later if needed per user preference |
| Image compression or resizing | Let next/image handle optimization at serve time |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| IMG-01 | — | Pending |
| IMG-02 | — | Pending |
| IMG-03 | — | Pending |
| IMG-04 | — | Pending |
| IMG-05 | — | Pending |

**Coverage:**
- v1.2 requirements: 5 total
- Mapped to phases: 0
- Unmapped: 5

---
*Requirements defined: 2026-03-27*
*Last updated: 2026-03-27 after initial definition*
