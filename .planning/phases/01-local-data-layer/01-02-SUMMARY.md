---
phase: 01-local-data-layer
plan: "02"
subsystem: assets
tags: [images, svg, placeholders, public-assets]
dependency_graph:
  requires: [lib/data/projects.ts, 19 project slugs and thumbnail_url/hero_url paths]
  provides: [public/images/projects/*.svg, 38 SVG placeholder images]
  affects: [all pages rendering project thumbnails or heroes, portfolio grid, project detail pages]
tech_stack:
  added: []
  patterns: [inline SVG with dark gray background and orange accent line, consistent 600x400 thumb / 1920x800 hero dimensions]
key_files:
  created:
    - public/images/projects/el-caso-asunta-thumb.svg
    - public/images/projects/el-caso-asunta-hero.svg
    - public/images/projects/respira-thumb.svg
    - public/images/projects/respira-hero.svg
    - public/images/projects/la-infiltrada-thumb.svg
    - public/images/projects/la-infiltrada-hero.svg
    - public/images/projects/querer-thumb.svg
    - public/images/projects/querer-hero.svg
    - public/images/projects/la-mesias-thumb.svg
    - public/images/projects/la-mesias-hero.svg
    - public/images/projects/el-cuerpo-en-llamas-thumb.svg
    - public/images/projects/el-cuerpo-en-llamas-hero.svg
    - public/images/projects/nowhere-thumb.svg
    - public/images/projects/nowhere-hero.svg
    - public/images/projects/soy-georgina-thumb.svg
    - public/images/projects/soy-georgina-hero.svg
    - public/images/projects/1920-carcel-de-mujeres-thumb.svg
    - public/images/projects/1920-carcel-de-mujeres-hero.svg
    - public/images/projects/intimidad-thumb.svg
    - public/images/projects/intimidad-hero.svg
    - public/images/projects/la-unidad-kabul-thumb.svg
    - public/images/projects/la-unidad-kabul-hero.svg
    - public/images/projects/el-inconveniente-thumb.svg
    - public/images/projects/el-inconveniente-hero.svg
    - public/images/projects/vida-perfecta-thumb.svg
    - public/images/projects/vida-perfecta-hero.svg
    - public/images/projects/apagon-thumb.svg
    - public/images/projects/apagon-hero.svg
    - public/images/projects/dime-quien-soy-thumb.svg
    - public/images/projects/dime-quien-soy-hero.svg
    - public/images/projects/la-valla-thumb.svg
    - public/images/projects/la-valla-hero.svg
    - public/images/projects/sonido-en-construccion-thumb.svg
    - public/images/projects/sonido-en-construccion-hero.svg
    - public/images/projects/campana-cruzcampo-thumb.svg
    - public/images/projects/campana-cruzcampo-hero.svg
    - public/images/projects/entre-sombras-thumb.svg
    - public/images/projects/entre-sombras-hero.svg
  modified: []
decisions:
  - "SVG placeholders generated directly via Node.js one-liner (no script left in repo)"
  - "XML special characters escaped in titles (e.g., accented chars encoded in SVG text nodes)"
metrics:
  duration: "~3 minutes"
  completed: "2026-03-27"
---

# Phase 1 Plan 2: Generate Placeholder SVG Images Summary

**One-liner:** 38 SVG placeholder images (19 thumbnails at 600x400 and 19 heroes at 1920x800) generated in public/images/projects/, one pair per project slug from the data file.

## What Was Built

38 SVG files in `public/images/projects/` providing placeholder images for all 19 portfolio projects. For each project:

- **Thumbnail** (`{slug}-thumb.svg`): 600x400, dark gray (#1a1a1a) background, white project title, gray dimension label, orange (#f97316) accent line near bottom
- **Hero** (`{slug}-hero.svg`): 1920x800, same design at larger scale with 48px title text

All 38 image paths in `lib/data/projects.ts` (via `thumbnail_url` and `hero_url` fields) now resolve to actual files in `public/`. No broken image references remain.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create placeholder SVG generation script and generate all 38 images | c02c9a2 | 38 SVG files in public/images/projects/ |
| 2 | Verify data-to-image path integrity | c02c9a2 | No new files (verification only — all 38 paths confirmed) |

## Decisions Made

1. **Node.js one-liner used for generation**: SVGs were written directly via a Node.js script executed inline. No script file was left in the repository.

2. **XML special characters escaped**: Project titles containing special characters (e.g., accented characters in Spanish titles) are properly handled in SVG text nodes.

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

All plan verification checks passed:

```
ls public/images/projects/*.svg | wc -l      => 38
ls public/images/projects/*-thumb.svg | wc -l => 19
ls public/images/projects/*-hero.svg | wc -l  => 19
node path-integrity-check                      => All 38 image paths resolve
```

## Known Stubs

All 38 SVG files are intentional placeholders. They display the project title and dimensions on a dark background with an orange accent. The user will replace these with real production images when sourced. This is expected and documented in PROJECT.md constraints.

## Self-Check: PASSED
