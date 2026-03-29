---
phase: 08-copy-backup-rewrite
plan: 01
subsystem: copy
tags: [copy, content, professional-voice, expertise-rename]
dependency_graph:
  requires: []
  provides: [lib/copy-backup.md, lib/copy.ts]
  affects: [components/home/HeroSection.tsx, components/home/CTASection.tsx, components/home/ServicesSection.tsx, components/navigation/footer.tsx, components/navigation/header.tsx, components/about/AboutPageClient.tsx, app/contact/page.tsx, app/services/page.tsx]
tech_stack:
  added: []
  patterns: [as-const typed constants, centralized copy module following lib/contact-info.ts pattern]
key_files:
  created:
    - lib/copy-backup.md
    - lib/copy.ts
  modified: []
decisions:
  - "All Services references renamed to Expertise in copy (nav labels, section titles, meta titles) per D-10"
  - "Copy object structured with top-level keys per page/section, typed as const"
  - "Hero rotating words updated to professional audience terms: productions, series, documentaries, commercials"
  - "ADR supervision added to audio editing description per D-07 deliverable specificity"
metrics:
  duration: "3 minutes"
  completed: "2026-03-28"
  tasks: 2
  files: 2
---

# Phase 8 Plan 1: Copy Backup & Rewrite Summary

**One-liner:** Preserved all original site copy to a markdown reference file, then created a centralized `lib/copy.ts` with professionally rewritten copy in first-person industry peer voice with concrete credentials (30+ credits, 8+ years) and specific deliverables (5.1, stereo, Dolby Atmos, Foley, ADR supervision).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Back up all original page copy | c07c45c | lib/copy-backup.md |
| 2 | Create lib/copy.ts with rewritten professional copy | 706e6b1 | lib/copy.ts |

## What Was Built

### lib/copy-backup.md

A human-readable markdown reference containing every original text string from every page and component that will be rewritten. Organized by page/section with clear headings. Preserves:
- Hero section: title, highlight texts, rotating words
- CTA section: title, subtitle, description, button text, response time strings
- Services section (homepage): heading, subtitle, 3 service card titles and descriptions
- Footer: tagline, nav items
- Header: nav items
- About page client: page heading, name, 2 bio paragraphs, mission heading/text, CTA heading/text/button
- About page metadata: title and description
- Contact page: all headings, intro, card text, WhatsApp card text, pro tip, button text
- Contact page metadata: title and description
- Services page metadata: title and description
- Services page client: intro, mixing section (title, description, benefitsTitle, 4 benefits, 3 formats), soundDesign section (title, description, 4 features), additionalServices (title, description, 6 services)

### lib/copy.ts

A TypeScript file exporting a single `copy` const object (typed `as const`) with all rewritten page copy. Structure mirrors the components that will consume it.

**Voice applied (all sections):**
- First person ("I") throughout
- No cliches: removed "Amplify Your Story", "cut through the noise", "friendly chat"
- Concrete numbers: "30+ credits", "8+ years"
- Specific deliverables: 5.1, 7.1, stereo, Dolby Atmos, Foley, ADR supervision
- Location: "Sao Paulo, Brazil. Available for remote and on-location projects worldwide."
- "Expertise" used in all navigation labels and section titles (not "Services")

**Object keys:**
- `hero` — title, highlightWords (4 items), subtitle
- `cta` — subtitle, title, description, buttonText, responseTimeText, responseTimeDescription
- `expertise` — sectionTitle, sectionSubtitle, cards (3), learnMoreLabel
- `footer` — tagline, navItems (with "Expertise" replacing "Services")
- `header` — navItems (with "Expertise" replacing "Services")
- `about` — pageTitle, name, bio (2 paragraphs), missionTitle, missionText, ctaTitle, ctaText, ctaButtonText
- `aboutMeta` — title, description
- `contact` — pageTitle, intro, contactCardTitle, contactCardText, whatsappCardTitle, whatsappCardText, whatsappButtonText, proTip
- `contactMeta` — title, description
- `servicesMeta` — title ("Expertise | Lorenzo Pardell"), description
- `servicesPage` — intro, mixing (with 4 benefits and 3 formats), soundDesign (with 4 features), additionalServices (with 6 services)

## Deviations from Plan

None — plan executed exactly as written. All acceptance criteria for both tasks met on first attempt.

## Known Stubs

None. `lib/copy.ts` contains real copy strings ready for wiring. No placeholders, no "coming soon" text, no empty values.

## Self-Check: PASSED

- `lib/copy-backup.md` exists: CONFIRMED
- `lib/copy.ts` exists: CONFIRMED
- TypeScript compilation: PASS (no errors)
- Commit c07c45c exists: CONFIRMED
- Commit 706e6b1 exists: CONFIRMED
- No cliches in copy.ts: CONFIRMED
- "Expertise" label present: CONFIRMED
- "30+" present: CONFIRMED
- "8+" present: CONFIRMED
- highlightWords: 4 items CONFIRMED
- expertise.cards: 3 items CONFIRMED
- mixing.benefits: 4 items CONFIRMED
- mixing.formats: 3 items CONFIRMED
- soundDesign.features: 4 items CONFIRMED
- additionalServices.services: 6 items CONFIRMED
