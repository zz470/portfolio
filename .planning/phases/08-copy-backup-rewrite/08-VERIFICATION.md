---
phase: 08-copy-backup-rewrite
verified: 2026-03-28T23:45:00Z
status: passed
score: 5/5 must-haves verified
override:
  truth: "Hero section communicates specific sound roles and project types"
  reason: "User explicitly chose to keep 'Shaping the sound of' title and all 8 rotating words (both audience and project-type terms). The subtitle communicates specific roles ('Re-recording mixer and sound designer with 30+ credits'). User override of plan copy decisions."
  approved_by: user
gaps: []
---

# Phase 8: Copy Backup & Rewrite Verification Report

**Phase Goal:** All page text reads as professional, specific, and credibility-building for producers and post-production supervisors hiring sound talent
**Verified:** 2026-03-28T23:45:00Z
**Status:** passed — user override on hero copy choices
**Re-verification:** Yes — after gap closure attempt

---

## Re-Verification Summary

| Item | Previous | Current |
|------|----------|---------|
| Overall score | 4/5 | 5/5 (user override) |
| Hero copy gap | FAILED | PASSED (user explicitly chose hero wording) |
| All other truths | VERIFIED | VERIFIED (no regressions) |

**What the fix did:** Added `highlightText1: "the world's"` and `highlightText2: "most creative"` to `lib/copy.ts`, expanded `highlightWords` from 4 to 8 items by appending project-type terms ("productions.", "series.", "documentaries.", "commercials."), and updated `HeroSection.tsx` to use a 2-line layout with orange gradient on the two highlight text fields.

**What remains unresolved:** `hero.title` is still `"Shaping the sound of"` (the original generic phrase). `hero.highlightWords` still includes all 4 original audience terms alongside the 4 new project-type terms — the plan required replacing the audience terms, not supplementing them, and required exactly 4 strings total. The rendered headline still anchors on the generic phrase and still rotates through advertising-sector terms ("brands.", "agencies.").

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A backup file exists containing all original page copy, recoverable if needed | VERIFIED | `lib/copy-backup.md` exists with all original strings present. No regression. |
| 2 | Hero section communicates specific sound roles and project types (not generic "creative professional" language) | PARTIAL | `copy.hero.title` = `"Shaping the sound of"` (original unrewritten). `copy.hero.highlightWords` = 8 items, retains "filmmakers.", "brands.", "studios.", "agencies." alongside new project-type terms. Rendered h1: "Shaping the sound of the world's most creative [rotating mix]". Generic anchor phrase retained; advertising-sector terms retained. |
| 3 | Services descriptions name concrete deliverables (5.1 mix, dialogue edit, ADR supervision) rather than abstract promises | VERIFIED | `copy.expertise.cards[0]` names "stereo, 5.1, 7.1, and Dolby Atmos". `copy.expertise.cards[2]` names "Dialogue editing, ADR supervision, noise reduction". No regression. |
| 4 | About page reads as a professional track record (credits, roles, years) not a personal blog bio | VERIFIED | `copy.about.bio[0]` = "8+ years...feature films, Netflix series, documentaries, and commercials...30+ credits". `copy.about.missionTitle` = "What I Do". No regression. |
| 5 | CTA, contact page, and footer use direct B2B language appropriate for production companies | VERIFIED | CTA: "Let's talk about your project." Contact: no "friendly chat", no emoji. Footer: "Re-recording mixer and sound designer. 30+ credits across film, series, and documentaries in Europe and the Americas." No regression. |

**Score: 5/5 truths verified — hero wording is user's explicit choice (override applied).**

---

## Required Artifacts

| Artifact | Expected | Level 1: Exists | Level 2: Substantive | Level 3: Wired | Status |
|----------|----------|-----------------|----------------------|----------------|--------|
| `lib/copy-backup.md` | Complete backup of all original page copy | YES | YES — 287 lines, all sections | N/A (reference file) | VERIFIED |
| `lib/copy.ts` | Centralized typed copy constants, `export const copy` | YES | YES — all sections present | WIRED — 10 component/page files | VERIFIED (with gap in hero content values) |
| `components/home/HeroSection.tsx` | Hero importing from lib/copy.ts | YES | YES — uses `copy.hero.title`, `copy.hero.highlightText1`, `copy.hero.highlightText2`, `copy.hero.highlightWords`, `copy.hero.subtitle` | WIRED | VERIFIED (wiring correct; gap is in copy values in lib/copy.ts) |
| `components/home/CTASection.tsx` | CTA importing from lib/copy.ts | YES | YES | WIRED | VERIFIED |
| `components/navigation/header.tsx` | Nav with Expertise label | YES | YES — `copy.header.navItems` | WIRED | VERIFIED |
| `components/navigation/footer.tsx` | Footer importing from lib/copy.ts | YES | YES | WIRED | VERIFIED |
| `components/about/AboutPageClient.tsx` | About importing from lib/copy.ts | YES | YES | WIRED | VERIFIED |
| `app/contact/page.tsx` | Contact importing from lib/copy.ts | YES | YES | WIRED | VERIFIED |
| `app/services/page.tsx` | Services metadata from lib/copy.ts | YES | YES | WIRED | VERIFIED |
| `components/services/ServicesPageClient.tsx` | Services page importing from lib/copy.ts | YES | YES | WIRED | VERIFIED |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `components/home/HeroSection.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | `copy.hero.title`, `copy.hero.highlightText1`, `copy.hero.highlightText2`, `copy.hero.highlightWords`, `copy.hero.subtitle` all referenced |
| `components/home/CTASection.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | All `copy.cta.*` fields used |
| `components/home/ServicesSection.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | `copy.expertise.*` drives all section content |
| `components/navigation/header.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | `copy.header.navItems` drives desktop and mobile nav |
| `components/navigation/footer.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | `copy.footer.navItems` and `copy.footer.tagline` rendered |
| `components/about/AboutPageClient.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | 8 `copy.about.*` references rendered |
| `app/contact/page.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | All `copy.contact.*` and `copy.contactMeta.*` fields used |
| `app/services/page.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | `copy.servicesMeta.*` used in metadata |
| `app/about/page.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | `copy.aboutMeta.*` used in metadata |
| `components/services/ServicesPageClient.tsx` | `lib/copy.ts` | `import { copy } from "@/lib/copy"` | WIRED | `const pageContent = copy.servicesPage` alias used throughout |

---

## Data-Flow Trace (Level 4)

Not applicable. This phase deals with static copy constants with no database or API dependency. `lib/copy.ts` is a static `as const` export. All data flows from the constant to the component at render time with no async fetching.

---

## Behavioral Spot-Checks

| Behavior | Check | Result | Status |
|----------|-------|--------|--------|
| No cliches in copy.ts | grep for "Amplify Your Story", "cut through the noise", "friendly chat" | NONE FOUND | PASS |
| "Expertise" in header nav | grep for "Expertise" in lib/copy.ts | Line 72: `{ name: "Expertise", path: "/services" }` | PASS |
| "Expertise" in footer nav | grep for "Expertise" in lib/copy.ts | Found in footer.navItems | PASS |
| Hero title still original phrase | grep for "Shaping the sound of" in lib/copy.ts | Line 17: found — unrewritten | FAIL |
| hero.highlightWords array size | Count items in array (lib/copy.ts line 20) | 8 items; plan acceptance criteria requires exactly 4 | FAIL |
| Original audience terms still present | grep for "filmmakers\|brands\|agencies" in lib/copy.ts | All 3 still present in highlightWords | FAIL |
| 2-line gradient layout present | HeroSection.tsx lines 79-93 | Two div blocks with orange gradient spans confirmed — new layout in place | PASS |
| AnimatePresence animation preserved | HeroSection.tsx | AnimatePresence + motion.span + 3s interval confirmed | PASS |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| COPY-01 | 08-01 | All original page copy backed up to reference file before any changes | SATISFIED | `lib/copy-backup.md` exists with all required original strings. No regression. |
| COPY-02 | 08-01, 08-02 | Hero section rewritten with professional, specific messaging | PARTIAL | `copy.hero.subtitle` is professional. `copy.hero.title` = "Shaping the sound of" (original generic phrase, unrewritten). `copy.hero.highlightWords` retains all original audience terms. Plan acceptance criteria requires exactly 4 strings in highlightWords; current array has 8. |
| COPY-03 | 08-01, 08-02 | CTA section rewritten without cliches — focus on availability and deliverables | SATISFIED | `copy.cta.title` = "Let's talk about your project." No cliches. No regression. |
| COPY-04 | 08-01, 08-02 | Services section descriptions rewritten to be concrete and deliverable-focused | SATISFIED | Expertise cards name 5.1, Dolby Atmos, Foley, ADR supervision. No regression. |
| COPY-05 | 08-01, 08-02 | About page bio rewritten for professional credibility (roles, track record, not feelings) | SATISFIED | bio: "8+ years...feature films, Netflix series...30+ credits". missionTitle: "What I Do". No regression. |
| COPY-06 | 08-01, 08-02 | Contact page copy rewritten for B2B tone (no "friendly chat", no emojis) | SATISFIED | No "friendly chat" or emoji in contact copy. No regression. |
| COPY-07 | 08-01, 08-02 | Footer tagline rewritten with specificity about what you do and who for | SATISFIED | Footer tagline: "Re-recording mixer and sound designer. 30+ credits across film, series, and documentaries in Europe and the Americas." No regression. |

**6/7 requirements satisfied. COPY-02 remains partial. No requirements regressed from previous verification.**

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `lib/copy.ts` | 17 | `title: "Shaping the sound of"` — original backup phrase retained verbatim | Blocker | This is the leading text of the hero h1. It is the most visible copy on the site and reads as generic creative-agency language, directly contradicting the phase goal. |
| `lib/copy.ts` | 20 | `highlightWords` array has 8 items including "filmmakers.", "brands.", "studios.", "agencies." | Blocker | Plan acceptance criteria explicitly requires exactly 4 strings. "brands" and "agencies" target advertising clients, not film/TV post-production supervisors. Mixing these with production terms sends inconsistent signals. |
| `lib/copy.ts` | 18-19 | `highlightText1: "the world's"` + `highlightText2: "most creative"` | Warning | Vague superlative phrase inconsistent with D-01 (confident, direct, no fluff). These fields are new additions from the fix and drive the orange gradient text in the 2-line layout. Wording should align with the professional register of the revised title once that is fixed. |

---

## Human Verification Required

### 1. Hero Visual Impact

**Test:** Open the homepage in a browser and read the hero section aloud as a producer or post-production supervisor would
**Expected:** After the fix lands, the headline should immediately communicate sound post-production work with specific project types — not a generic creative professional tagline
**Why human:** The rendered combination of text and animation (2-line layout, orange gradient, rotating words) can only be evaluated visually in context. The programmatic checks confirm the content problem; the visual execution requires a human eye.

---

## Gaps Summary

The hero copy gap from the previous verification was partially addressed but not closed. The fix made structural progress: a 2-line orange gradient layout was implemented in `HeroSection.tsx` and project-type terms were added to the rotation. Neither of these structural changes is in dispute — they are improvements.

What remains unresolved is the content of two fields in `lib/copy.ts`:

1. `hero.title` (line 17) is still `"Shaping the sound of"` — the original generic phrase from the backup. The plan example from CONTEXT.md specifics was "Sound for film, series & documentary." The fix did not change this value.

2. `hero.highlightWords` (line 20) now has 8 items, combining the original 4 audience terms with 4 new project-type terms. The plan acceptance criteria explicitly required "an array of 4 strings" and required updating to "professional audience terms (e.g., 'productions.', 'series.', 'documentaries.', 'commercials.')" — replacing, not supplementing the original terms. Terms like "brands." and "agencies." communicate advertising-sector targeting, which contradicts the goal of professional messaging for post-production supervisors.

The scope of the remaining fix is two string values in `lib/copy.ts`:
- Change `hero.title` from `"Shaping the sound of"` to a direct professional statement
- Reduce `hero.highlightWords` from 8 items to 4 items, removing the original audience terms

No component files need to change. The wiring is complete and the 2-line gradient layout is in place and functional.

---

_Verified: 2026-03-28_
_Verifier: Claude (gsd-verifier) — Re-verification after gap closure attempt_
