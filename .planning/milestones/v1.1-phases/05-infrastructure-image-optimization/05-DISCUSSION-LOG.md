# Phase 5: Infrastructure & Image Optimization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-27
**Phase:** 05-infrastructure-image-optimization
**Areas discussed:** Image sizing strategy

---

## Image Sizing Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| fill + sizes (Recommended) | Use fill mode with sizes prop. Matches current absolute-positioned layout. | ✓ |
| Explicit width/height | Set fixed pixel dimensions. Simpler but less flexible. | |
| You decide | Claude picks based on container patterns. | |

**User's choice:** fill + sizes (Recommended)
**Notes:** All 3 img tags are inside containers with fixed dimensions and absolute positioning — fill mode is a direct match.

---

## Claude's Discretion

- Exact sizes values based on container analysis
- Priority attribute on hero images

## Deferred Ideas

None.
