---
quick_id: 260329-n4c
description: Add Discoterra project to portfolio
one_liner: Added Discoterra documentary (id 29) to projects.ts with thumbnail/hero images, 3 roles, 2025 release
status: complete
---

# Quick Task Summary: Add Discoterra to Portfolio

## What Was Done

Added Discoterra documentary as project id 29 in `lib/data/projects.ts`:
- Title: Discoterra
- Category: Documentary
- Release: 2025
- Roles: Dialogue Editor, Sound Effects Editor, Re-recording Mixer
- Images: thumbnail and hero from `public/images/projects/discoterra/`
- No video link (empty string)
- No production company or media platform specified

## Build Verification

`npx next build` passes — 29 project paths generated, including `/portfolio/discoterra`.

## Notes

- Directors (Gustavo Aquino dos Reis, Daniel Wierman, Arnaldo Robles) provided by user but no `directors` field exists in the Project interface. Not added to avoid schema changes.
- Commit: f441fd2
