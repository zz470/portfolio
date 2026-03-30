---
type: quick
task_id: 260330-lkb
scope: fix
files_modified:
  - lib/contact-info.ts
  - components/about/AboutPageClient.tsx
---

<objective>
Replace hardcoded contact info in AboutPageClient.tsx with imports from lib/contact-info.ts, restoring QUAL-03 single-source-of-truth invariant.

Purpose: The about page's "Let's Talk" section hardcodes email and phone values at lines 114-124 instead of using the centralized contactInfo object. This regression from Phase 6 means updating contact-info.ts won't propagate to the about page.

Output: AboutPageClient.tsx uses contactInfo for all contact details; no hardcoded email/phone strings remain.
</objective>

<context>
@lib/contact-info.ts
@components/about/AboutPageClient.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add phoneFormatted getter to contact-info.ts and update AboutPageClient.tsx</name>
  <files>lib/contact-info.ts, components/about/AboutPageClient.tsx</files>
  <action>
1. In `lib/contact-info.ts`, add a `phoneFormatted` getter that returns the human-readable format:
   ```ts
   get phoneFormatted() {
     return "+55 11 91761-9699";
   },
   ```
   Place it after the existing `phone` property. This matches the display format used in the about page and provides a reusable formatted phone string.

2. In `components/about/AboutPageClient.tsx`:
   - Add import: `import { contactInfo } from "@/lib/contact-info";` (after the existing `copy` import on line 7)
   - Line 115: Replace `href="mailto:lorenzopardell@gmail.com"` with `href={contactInfo.emailLink}`
   - Line 116: Replace `lorenzopardell@gmail.com` text with `{contactInfo.email}`
   - Line 121: Replace `href="tel:+5511917619699"` with `href={contactInfo.phoneLink}`
   - Line 122: Replace `+55 11 91761-9699` text with `{contactInfo.phoneFormatted}`
  </action>
  <verify>
    <automated>cd /Users/lorenzopardell/Desktop/DEV/NEXTJS/_PORTOFOLIO/next-portfolio && npx next build 2>&1 | tail -5</automated>
  </verify>
  <done>
  - AboutPageClient.tsx imports contactInfo from @/lib/contact-info
  - Zero hardcoded email or phone strings in AboutPageClient.tsx
  - contact-info.ts exports phoneFormatted getter returning "+55 11 91761-9699"
  - Build succeeds with no errors
  </done>
</task>

</tasks>

<verification>
- `grep -c "lorenzopardell@gmail.com\|+5511917619699\|91761-9699" components/about/AboutPageClient.tsx` returns 0
- `grep -c "contactInfo" components/about/AboutPageClient.tsx` returns at least 4 (import + 4 usages)
- `grep -c "phoneFormatted" lib/contact-info.ts` returns at least 1
- `npx next build` completes without errors
</verification>

<success_criteria>
AboutPageClient.tsx uses contactInfo for all contact details. No hardcoded contact strings remain in the file. The QUAL-03 single-source-of-truth invariant is restored. Build passes.
</success_criteria>
