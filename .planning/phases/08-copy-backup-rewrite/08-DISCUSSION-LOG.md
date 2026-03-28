# Phase 8: Copy Backup & Rewrite - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-28
**Phase:** 08-copy-backup-rewrite
**Areas discussed:** Voice & tone, Specificity level, Backup approach, Copy source of truth

---

## Voice & Tone

### Register

| Option | Description | Selected |
|--------|-------------|----------|
| Industry peer | Confident, direct, no fluff — like a seasoned professional talking to another professional | ✓ |
| Premium creative | Polished and aspirational but still specific. More "studio website" feel | |
| Warm professional | Approachable but credible. First-person, conversational but backed by real credentials | |

**User's choice:** Industry peer
**Notes:** None

### Person (First/Third)

| Option | Description | Selected |
|--------|-------------|----------|
| First person | "I" throughout — direct, personal, common for freelancer portfolios | ✓ |
| Third person | "Lorenzo Pardell is..." — more formal/agency-like | |
| Mixed | Third person on About, first person elsewhere | |

**User's choice:** First person
**Notes:** None

### Hero Animation

| Option | Description | Selected |
|--------|-------------|----------|
| Keep rotating words | Animated word swap adds visual interest and shows range of clients | ✓ |
| Static headline | Drop animation, use one clear statement | |
| You decide | Claude picks based on what fits new copy | |

**User's choice:** Keep rotating words
**Notes:** None

### Wordplay

| Option | Description | Selected |
|--------|-------------|----------|
| No wordplay | Straight professional language. Puns can feel gimmicky | ✓ |
| Subtle references OK | Light industry nods fine as long as not puns or cliches | |
| You decide | Claude judges case-by-case | |

**User's choice:** No wordplay
**Notes:** None

### Language

| Option | Description | Selected |
|--------|-------------|----------|
| English only | International audience, English is industry standard | ✓ |
| English with Portuguese About | About page gets Portuguese version for local Brazilian clients | |

**User's choice:** English only
**Notes:** None

---

## Specificity Level

### Credentials

| Option | Description | Selected |
|--------|-------------|----------|
| Concrete numbers | "30+ credits", verifiable, specific, builds trust instantly | ✓ |
| General but professional | "Extensive experience" without specific numbers | |
| Minimal — let the work speak | Almost no credential text, portfolio IS the proof | |

**User's choice:** Concrete numbers
**Notes:** None

### Technical Deliverables

| Option | Description | Selected |
|--------|-------------|----------|
| Name key deliverables | "5.1 and stereo mix for theatrical and streaming" — shows technical credibility | ✓ |
| Format-agnostic | "Professional mixing for all delivery formats" | |
| You decide | Claude picks right level per service | |

**User's choice:** Name key deliverables
**Notes:** None

### About Page Credits

| Option | Description | Selected |
|--------|-------------|----------|
| Mention types only | "Feature films, Netflix series, documentaries" — portfolio grid shows individual projects | ✓ |
| Name 2-3 highlights | Drop recognizable project names in bio | |
| You decide | Claude decides based on recognizable projects | |

**User's choice:** Mention types only
**Notes:** None

### Location Availability

| Option | Description | Selected |
|--------|-------------|----------|
| Both remote and on-location | "Based in Sao Paulo. Available for remote and on-location projects worldwide." | ✓ |
| Remote focus | Emphasize remote capability | |
| Just city, no logistics | Let contact page handle availability | |

**User's choice:** Both
**Notes:** None

### Project Count

| Option | Description | Selected |
|--------|-------------|----------|
| Use 30+ credits | User-specified number, will add more projects later | ✓ |
| Use 28 (site count) | Match what's verifiable on portfolio page | |
| No specific number | Skip count entirely | |

**User's choice:** 30+ credits (custom input)
**Notes:** "use 30+ credits. I'll add more projects later."

### Years of Experience

| Option | Description | Selected |
|--------|-------------|----------|
| 8+ years | User-specified | ✓ |
| 5+ years | | |
| 10+ years | | |
| 15+ years | | |

**User's choice:** 8+ years
**Notes:** None

### Services Naming

| Option | Description | Selected |
|--------|-------------|----------|
| Rename to "Expertise" | User-specified — change "Services" to "Expertise" across the site | ✓ |
| Keep "Services" | Keep current naming | |

**User's choice:** Rename to "Expertise" (custom input)
**Notes:** "Change 'service' for 'expertise'"

---

## Backup Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Single reference file | Create lib/copy-backup.md with all original strings organized by page | ✓ |
| Git-only | No backup file — original copy preserved in git history | |
| Inline comments | Add <!-- Original: ... --> comments next to changed strings | |

**User's choice:** Single reference file
**Notes:** None

---

## Copy Source of Truth

### Architecture

| Option | Description | Selected |
|--------|-------------|----------|
| Centralized copy file | Extract all copy to lib/copy.ts — single file to edit for all text changes | ✓ |
| Keep inline | Copy stays in each component as default props/string literals | |

**User's choice:** Centralize for easy editing
**Notes:** User specifically wanted to update all site text from one place without digging through component files.

### Project Data Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Stay in projects data | Project descriptions and roles stay in lib/data/projects.ts — central file only holds page-level text | ✓ |
| Everything centralized | All text including project descriptions moves to copy file | |

**User's choice:** Stay in projects data
**Notes:** None

### File Format

| Option | Description | Selected |
|--------|-------------|----------|
| TypeScript | lib/copy.ts with `as const` — type-safe, IDE autocomplete | ✓ |
| JSON file | lib/copy.json — no TypeScript needed to edit | |
| You decide | Claude picks best format | |

**User's choice:** TypeScript
**Notes:** None

---

## Claude's Discretion

- Exact wording of all copy (within the voice/tone/specificity constraints)
- Structure of lib/copy.ts (object shape, nesting, key names)

## Deferred Ideas

None — discussion stayed within phase scope.
