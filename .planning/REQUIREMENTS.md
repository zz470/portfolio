# Requirements: Lorenzo Pardell Portfolio

**Defined:** 2026-03-26
**Core Value:** The portfolio must display Lorenzo's professional work with project details, roles, and media links — reliably, without external database dependencies.

## v1 Requirements

### Data Migration

- [ ] **DATA-01**: All 19 project records are stored in a local TypeScript data file with full type safety
- [ ] **DATA-02**: Project data includes all fields: title, slug, description, category, roles, video_url, imdb_url, production_company, media_platform, release_date, design_version
- [ ] **DATA-03**: Projects are ordered by created_at descending (matching current Supabase query)

### Supabase Removal

- [ ] **SUPA-01**: Supabase client library and all imports are removed
- [ ] **SUPA-02**: useProjects and useProject hooks are replaced with direct data imports
- [ ] **SUPA-03**: Environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are removed
- [ ] **SUPA-04**: Supabase image domain removed from next.config.ts

### Image Handling

- [ ] **IMG-01**: Placeholder images are generated for all projects (thumbnail + hero)
- [ ] **IMG-02**: Image URLs in project data point to local public/ directory paths

### Continuity

- [ ] **CONT-01**: All existing routes work unchanged (/, /portfolio, /portfolio/[slug], /services, /about, /contact)
- [ ] **CONT-02**: Category filtering on portfolio page works with local data
- [ ] **CONT-03**: Design version routing (primary/secondary/tertiary layouts) works on detail pages
- [ ] **CONT-04**: Project navigation (prev/next) works on detail pages

## v2 Requirements

### Content Management

- **CMS-01**: Real images replace placeholders for all 19 projects
- **CMS-02**: Easy process to add new projects to the data file

## Out of Scope

| Feature | Reason |
|---------|--------|
| Visual redesign | This is a data migration only |
| CMS integration | Content lives in code for now |
| Image sourcing/downloading | User will handle separately |
| New pages or features | Maintain current functionality only |
| Server components migration | Out of scope for this milestone |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | — | Pending |
| DATA-02 | — | Pending |
| DATA-03 | — | Pending |
| SUPA-01 | — | Pending |
| SUPA-02 | — | Pending |
| SUPA-03 | — | Pending |
| SUPA-04 | — | Pending |
| IMG-01 | — | Pending |
| IMG-02 | — | Pending |
| CONT-01 | — | Pending |
| CONT-02 | — | Pending |
| CONT-03 | — | Pending |
| CONT-04 | — | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 0
- Unmapped: 13 (pending roadmap creation)

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 after initial definition*
