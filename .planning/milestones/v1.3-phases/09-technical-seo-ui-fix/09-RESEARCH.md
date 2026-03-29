# Phase 9: Technical SEO & UI Fix - Research

**Researched:** 2026-03-28
**Domain:** Next.js 15 Metadata API, JSON-LD structured data, Open Graph, Twitter Cards, CSS touch targets
**Confidence:** HIGH

## Summary

This phase adds machine-readable signals (JSON-LD), optimizes metadata for search engines and social sharing, fixes descriptive alt text, and resolves a mobile UX defect in the footer. All work is confined to configuration — no new routes, no new dependencies, no database changes.

The project already has a solid metadata foundation: `metadataBase` is set, a title template is active, `generateMetadata()` exists on the project detail page, and `lib/copy.ts` is the centralized source of truth for copy. The phase is primarily an extension and refinement of what already exists rather than a greenfield build.

The only genuinely novel pattern is JSON-LD injection. Next.js 15 handles JSON-LD via a `<script type="application/ld+json">` tag rendered inside the component tree — either in a Server Component layout or page. This is the official recommended approach and requires no additional library.

**Primary recommendation:** Inject JSON-LD as a `<script>` element in Server Components (layout and page files). Use Next.js `metadata` export for all Open Graph and Twitter card fields. Touch-target fix is a one-line Tailwind class addition.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Claude's discretion on homepage schema combination (Person + ProfilePage or Person + LocalBusiness)
- **D-02:** Project detail pages get CreativeWork schema with contributor role data — title, description, contributor (Person with roleName array), production company, release year. Data sourced from `lib/data/projects.ts`.
- **D-03:** Per-project OG images use existing hero photos directly from `public/images/projects/{slug}/`. No image generation or text overlay — just point openGraph.images to the project's hero image.
- **D-04:** Twitter card metadata added to all pages (twitter:card = summary_large_image for project pages, summary for other pages).
- **D-05:** Root layout default title includes location: "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo"
- **D-06:** Each page gets a keyword-rich title (not just the section name). Examples:
  - Expertise: "Sound Design & Mixing Expertise | Lorenzo Pardell"
  - Portfolio: "Sound Design Portfolio | Film, Series & Documentary | Lorenzo Pardell"
  - About: "About | Re-Recording Mixer & Sound Designer | Lorenzo Pardell"
- **D-07:** Keep both English and Portuguese keywords in the keywords array for dual-market SEO.
- **D-08:** Meta descriptions should reference concrete credentials from `lib/copy.ts` (30+ credits, 8+ years, Sao Paulo).
- **D-09:** All image alt text must be descriptive and include project name + context. Not "thumbnail" or "hero" — instead "Behind the scenes of [Project Title]" or "[Project Title] - sound design by Lorenzo Pardell".
- **D-10:** Padding-only fix — add min-h-[44px] min-w-[44px] and padding to footer social link elements. Icons stay the same visual size, tappable area increases to meet 44x44px minimum. No visual design change.

### Claude's Discretion
- Exact JSON-LD schema structure and property selection
- Homepage schema combination (Person+ProfilePage or Person+LocalBusiness)
- Exact wording of meta descriptions per page
- Alt text phrasing for each specific image
- Twitter card type per page (summary vs summary_large_image)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-01 | JSON-LD structured data added to all pages (Person, CreativeWork, LocalBusiness schemas) | JSON-LD via `<script>` in Server Components; Person+LocalBusiness on homepage layout; CreativeWork per project page |
| SEO-02 | Page titles optimized with keywords ("Sound Design Portfolio" not just "Portfolio") | `metadata.title` export on each page; root layout title template updated |
| SEO-03 | Meta descriptions optimized with service keywords and location | `metadata.description` on each page, sourced from `lib/copy.ts` |
| SEO-04 | Image alt text updated with descriptive, keyword-rich text across all components | 8 `alt=` occurrences in components need updating |
| SEO-05 | Per-project OG images using project hero photos instead of generic og-image.png | `openGraph.images` in `generateMetadata()` points to `project.hero_url` |
| SEO-06 | Twitter card metadata added to all pages | `metadata.twitter` field added to root layout and all page exports |
| UI-01 | Footer social links have adequate touch targets on mobile (min 44x44px) | Add `min-h-[44px] min-w-[44px] flex items-center` to `<Link>` in footer social list |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | 15.2.2 (already installed) | Page metadata, OG tags, Twitter cards | Built-in — no extra dependency |
| Schema.org JSON-LD | n/a (plain JSON in `<script>`) | Structured data for Google Rich Results | Official W3C standard, Google recommended |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| No additional libraries needed | — | — | — |

**Installation:** No new packages required. Everything is handled by Next.js built-ins.

## Architecture Patterns

### JSON-LD Injection in Next.js 15 App Router

**What:** Render a `<script type="application/ld+json">` element directly inside a Server Component. Next.js 15 does not hoist script tags added this way; they render inline in the HTML stream, which is correct behavior for JSON-LD.

**When to use:** Any Server Component — root layout for site-level schemas, page components for page-specific schemas.

**Recommended Project Structure (additions only):**
```
lib/
├── jsonld.ts          # JSON-LD builder functions (pure functions, testable)
app/
├── layout.tsx         # Add Person+LocalBusiness JSON-LD <script> + updated metadata
├── page.tsx           # No JSON-LD needed (root layout covers it)
├── portfolio/
│   └── [slug]/
│       └── page.tsx   # Add CreativeWork JSON-LD <script> via generateMetadata or component
├── portfolio/page.tsx  # Update metadata title/description
├── about/page.tsx      # Update metadata title/description
├── services/page.tsx   # Update metadata title/description
├── contact/page.tsx    # Update metadata title/description
components/
├── navigation/
│   └── footer.tsx      # Touch target fix on social link <Link> elements
```

### Pattern 1: JSON-LD in Server Component (Official Next.js approach)

**What:** Inline `<script>` tag with `dangerouslySetInnerHTML` containing `JSON.stringify()` of the schema object.

**When to use:** Root layout for Person/LocalBusiness; project page for CreativeWork.

```typescript
// Source: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
// In app/layout.tsx or a server component page

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lorenzo Pardell",
  jobTitle: "Re-Recording Mixer and Sound Designer",
  url: "https://lorenzopardell.com",
  sameAs: [
    "https://www.imdb.com/name/nm13638090/",
    "https://www.linkedin.com/in/lorenzo-pardell/",
    "https://www.instagram.com/lorenzopardell/",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressCountry: "BR",
  },
};

// Inside the component JSX:
// <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
// />
```

### Pattern 2: CreativeWork Schema for Project Pages

```typescript
// Source: https://schema.org/CreativeWork
// Built from project data in app/portfolio/[slug]/page.tsx

function buildCreativeWorkSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: project.release_date?.toString(),
    productionCompany: project.production_company
      ? { "@type": "Organization", name: project.production_company }
      : undefined,
    contributor: {
      "@type": "Role",
      contributor: {
        "@type": "Person",
        name: "Lorenzo Pardell",
        url: "https://lorenzopardell.com",
      },
      roleName: project.roles,
    },
    url: project.imdb_url,
    image: project.hero_url
      ? `https://lorenzopardell.com${project.hero_url}`
      : undefined,
  };
}
```

### Pattern 3: Per-Project OG Image in generateMetadata()

```typescript
// Extend existing generateMetadata in app/portfolio/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const ogImage = project.hero_url
    ? [{ url: project.hero_url, width: 1200, height: 630, alt: `${project.title} - sound by Lorenzo Pardell` }]
    : [{ url: "/og-image.png", width: 1200, height: 630 }];

  return {
    title: project.title,
    description: project.description || `${project.title} - sound by Lorenzo Pardell`,
    openGraph: {
      title: `${project.title} | Lorenzo Pardell`,
      description: project.description || "Sound work by Lorenzo Pardell",
      images: ogImage,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Lorenzo Pardell`,
      description: project.description || "Sound work by Lorenzo Pardell",
      images: ogImage.map(img => img.url),
    },
  };
}
```

### Pattern 4: Twitter Card in Root Layout Metadata

```typescript
// Add to metadata export in app/layout.tsx
twitter: {
  card: "summary",
  site: "@lorenzopardell", // or omit if no Twitter account
  title: "Lorenzo Pardell | Sound Designer & Re-Recording Mixer | Sao Paulo",
  description: "Re-recording mixer and sound designer with 30+ credits. Based in Sao Paulo, available worldwide.",
  images: ["/og-image.png"],
},
```

### Pattern 5: Footer Touch Target Fix

```typescript
// In components/navigation/footer.tsx
// Existing:
<Link
  href={link.href}
  className="flex items-center text-sm text-gray-600 hover:text-orange-500 transition-colors group"
  target="_blank"
  rel="noopener noreferrer"
>

// Fixed — add min-h-[44px] min-w-[44px]:
<Link
  href={link.href}
  className="flex items-center min-h-[44px] min-w-[44px] text-sm text-gray-600 hover:text-orange-500 transition-colors group"
  target="_blank"
  rel="noopener noreferrer"
>
```

### Anti-Patterns to Avoid

- **JSON-LD via `metadata.other`:** The `metadata.other` field adds arbitrary `<meta>` tags, not `<script>` tags. It cannot inject JSON-LD correctly. Use the `<script>` element pattern.
- **Absolute URLs in OG images when metadataBase is set:** Next.js resolves relative paths against `metadataBase`. If `hero_url` is already a relative path like `/images/projects/...`, it will resolve correctly against `https://lorenzopardell.com`. Do not manually prepend the domain — Next.js handles this.
- **JSON-LD in Client Components:** The `<script>` tag approach requires a Server Component. The root layout (`app/layout.tsx`) is already a Server Component. The project page (`app/portfolio/[slug]/page.tsx`) is also a Server Component. Do not add JSON-LD to components marked `"use client"`.
- **Modifying `copy.ts` for meta titles without checking the template:** The root layout uses `title.template = "%s | Lorenzo Pardell"`. Page titles set in `metadata.title` string will be appended automatically. The title in `copy.ts` currently includes "| Lorenzo Pardell" in `aboutMeta.title` and `servicesMeta.title` — these will produce doubled suffixes like "About | Lorenzo Pardell | Lorenzo Pardell" when the template applies. Verify whether the copy values include or exclude the suffix and reconcile.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD injection | Custom script injection utility | `<script dangerouslySetInnerHTML>` in Server Component | Next.js 15 renders this correctly in HTML stream |
| OG image generation | `@vercel/og` image generation | Direct `hero_url` reference | D-03 locked: existing photos, no generation |
| Twitter card meta tags | Manual `<Head>` manipulation | `metadata.twitter` export | Next.js Metadata API handles all meta tag emission |
| Touch target compliance | Custom click-area components | Tailwind `min-h-[44px] min-w-[44px]` | CSS-only, no DOM changes needed |

**Key insight:** The entire phase is configuration work on top of Next.js built-ins. No new libraries, no new utilities, no custom abstractions beyond a schema builder function.

## Common Pitfalls

### Pitfall 1: Title Template Double-Suffix
**What goes wrong:** Pages that already include " | Lorenzo Pardell" in their `metadata.title` string (e.g., `copy.aboutMeta.title = "About | Lorenzo Pardell"`) will render as "About | Lorenzo Pardell | Lorenzo Pardell" because the root layout template applies.
**Why it happens:** The `title.template` in root layout appends `| Lorenzo Pardell` to any page-level title string. If the string already has the suffix, it doubles.
**How to avoid:** Page-level `metadata.title` should be the page-specific part only — "About | Re-Recording Mixer & Sound Designer" not "About | Re-Recording Mixer & Sound Designer | Lorenzo Pardell". The template adds the suffix automatically.
**Warning signs:** Browser tab shows repeated name. Check `copy.aboutMeta.title`, `copy.servicesMeta.title`, `copy.contactMeta.title` — they currently include "| Lorenzo Pardell" which will need to be stripped from the copy or overridden in the page metadata export.

### Pitfall 2: Hero URL Availability Per Project
**What goes wrong:** Some projects may not have a `hero_url` defined. Passing `undefined` to `openGraph.images` causes Next.js to fall back to nothing — not to the root layout OG image.
**Why it happens:** `project.hero_url` is typed as optional (`hero_url?: string`). Without a guard, the OG image array will contain `undefined`.
**How to avoid:** Always fall back to `/og-image.png` when `hero_url` is absent. The guard pattern in Pattern 3 above handles this.
**Warning signs:** Social share preview shows no image for projects without a hero photo.

### Pitfall 3: JSON-LD in "use client" Components
**What goes wrong:** If JSON-LD script tags are added to components with `"use client"`, they may be hydration-mismatched or not rendered server-side (SSR only matters here for crawler visibility).
**Why it happens:** `app/portfolio/[slug]/page.tsx` is a Server Component — it does not have `"use client"`. The JSON-LD `<script>` can be added here directly. `ProjectSlugClient` (the child) does have `"use client"` and should NOT be the location for JSON-LD.
**How to avoid:** Keep JSON-LD in `app/portfolio/[slug]/page.tsx` (Server Component), not in `ProjectSlugClient`.

### Pitfall 4: OG Images Not Matching Recommended Dimensions
**What goes wrong:** The existing hero images are aspect ratios optimized for editorial use (full-width hero shots), not necessarily 1200x630 (1.91:1 OG ratio). Social platforms will crop them.
**Why it happens:** Hero images are designed for the site layout, not social card dimensions.
**How to avoid:** This is expected behavior per D-03 — the decision locked using existing photos without modification. Document in alt text dimensions and accept that some crops may be imperfect. This is not a blocking issue.

### Pitfall 5: Alt Text on Dynamic vs Static Images
**What goes wrong:** Alt text that uses `project.title` alone (current pattern) is better than "thumbnail" but not as rich as D-09 requires.
**Why it happens:** Components receive `project` as a prop and use `project.title` for alt — this is the easiest default, but misses the role/context.
**How to avoid:** Use template strings: `` `${project.title} — sound design by Lorenzo Pardell` `` for thumbnails, `` `${project.title} — ${project.roles[0]} by Lorenzo Pardell` `` for hero images. For hero in `HeroSection.tsx`, the current alt is `"Hero background"` — update to something descriptive of Lorenzo's work.

### Pitfall 6: LocalBusiness vs Person Schema on Homepage
**What goes wrong:** Choosing the wrong schema type reduces Google's understanding of the entity.
**Why it happens:** A freelancer is both a Person and potentially a LocalBusiness.
**How to avoid:** Use both schemas in an array on the homepage — `@graph` or two separate `<script>` elements. Person schema covers the professional identity; LocalBusiness (type: "ProfessionalService") covers local SEO in Sao Paulo. This is D-01 delegated to Claude's discretion and the recommendation is to use both.

## Code Examples

### JSON-LD Builder Module (lib/jsonld.ts — new file)

```typescript
// Source: https://schema.org, https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
import { type Project } from "@/lib/data/projects";
import { socialLinks } from "@/lib/social-links";
import { contactInfo } from "@/lib/contact-info";

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lorenzo Pardell",
    url: "https://lorenzopardell.com",
    jobTitle: "Re-Recording Mixer and Sound Designer",
    description:
      "Re-recording mixer and sound designer with 30+ credits. Based in Sao Paulo, available worldwide.",
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: socialLinks
      .filter((l) => l.visible)
      .map((l) => l.href),
    knowsAbout: [
      "Sound Design",
      "Re-Recording Mix",
      "Dialogue Editing",
      "ADR Supervision",
      "Foley",
      "Dolby Atmos",
      "Film Audio Post-Production",
    ],
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Lorenzo Pardell",
    url: "https://lorenzopardell.com",
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: ["BR", "ES", "PT", "US"],
    serviceType: [
      "Re-Recording Mix",
      "Sound Design",
      "Dialogue Editing",
      "Audio Post-Production",
    ],
    founder: {
      "@type": "Person",
      name: "Lorenzo Pardell",
    },
  };
}

export function buildCreativeWorkSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: project.release_date?.toString(),
    ...(project.production_company && {
      productionCompany: {
        "@type": "Organization",
        name: project.production_company,
      },
    }),
    contributor: {
      "@type": "Role",
      contributor: {
        "@type": "Person",
        name: "Lorenzo Pardell",
        url: "https://lorenzopardell.com",
      },
      roleName: project.roles,
    },
    ...(project.imdb_url && { url: project.imdb_url }),
    ...(project.hero_url && {
      image: `https://lorenzopardell.com${project.hero_url}`,
    }),
  };
}
```

### Page Metadata Updates (inventory)

All five page files need `metadata` updates:

| File | Current title in copy/metadata | Required title (no suffix — template adds it) |
|------|-------------------------------|-----------------------------------------------|
| `app/page.tsx` | (uses default) | Update default in layout to include location |
| `app/portfolio/page.tsx` | "Portfolio" | "Sound Design Portfolio \| Film, Series & Documentary" |
| `app/services/page.tsx` | `copy.servicesMeta.title` = "Expertise \| Lorenzo Pardell" | Strip suffix → "Sound Design & Mixing Expertise" |
| `app/about/page.tsx` | `copy.aboutMeta.title` = "About \| Lorenzo Pardell" | Strip suffix → "About \| Re-Recording Mixer & Sound Designer" |
| `app/contact/page.tsx` | `copy.contactMeta.title` = "Contact \| Lorenzo Pardell" | Strip suffix → "Contact \| Sound Designer Sao Paulo" |

**Note on `lib/copy.ts`:** The meta titles in `copy.ts` include " | Lorenzo Pardell" suffix. The implementation must either: (a) override the copy values in the metadata export to strip the suffix, or (b) update `copy.ts` to remove the suffix from meta title strings. Option (b) is cleaner but changes `copy.ts`. Option (a) avoids touching `copy.ts`. The planner should pick one approach and apply it consistently.

### Alt Text Map (all occurrences)

| File | Component | Current alt | Required alt |
|------|-----------|-------------|--------------|
| `components/home/HeroSection.tsx:62` | hero bg image | "Hero background" | "Lorenzo Pardell — Re-Recording Mixer and Sound Designer based in Sao Paulo" |
| `components/portfolio/PortfolioCard.tsx:62` | thumbnail | `project.title` | `` `${project.title} — sound by Lorenzo Pardell` `` |
| `components/home/SelectedWorks.tsx:28` | thumbnail | `project.title` | `` `${project.title} — sound by Lorenzo Pardell` `` |
| `components/portfolio/PortfolioDetail.tsx:69` | hero image | `project.title` | `` `${project.title} — ${project.roles[0]} by Lorenzo Pardell` `` |
| `components/portfolio/PortfolioDetail.tsx:100` | secondary image | `project.title` | `` `${project.title} — audio production by Lorenzo Pardell` `` |
| `components/portfolio/PortfolioDetailSecondary.tsx:41` | hero image | `project.title` | `` `${project.title} — ${project.roles[0]} by Lorenzo Pardell` `` |
| `components/portfolio/ProjectNavigation.tsx:52` | prev project | `prevProject.title` | `` `${prevProject.title} — portfolio thumbnail` `` |
| `components/portfolio/ProjectNavigation.tsx:77` | next project | `nextProject.title` | `` `${nextProject.title} — portfolio thumbnail` `` |

`components/home/partner-logos.tsx:72` already has good alt text (`${partner.name} logo`) — no change needed.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/head` for meta tags | Next.js Metadata API (`metadata` export) | Next.js 13 App Router | Server-rendered meta, no client-side timing issues |
| Manual `<Head>` JSON-LD scripts | `<script>` in Server Component body | Next.js 13+ | Simpler, no extra imports |
| `next-seo` library | Native Metadata API | Next.js 13+ | No dependency needed |

**Deprecated/outdated:**
- `next/head` component: Not used in App Router. The project already uses the Metadata API correctly.
- `next-seo` package: Useful pre-App Router; now redundant. Not installed in this project.

## Open Questions

1. **Twitter/X account existence**
   - What we know: `lib/social-links.tsx` does not include a Twitter/X link. The portfolio lists IMDB, LinkedIn, Instagram.
   - What's unclear: Does Lorenzo have a Twitter/X handle to set as `twitter.site` in metadata?
   - Recommendation: Omit `twitter.site` if no account. The `twitter.card` and `twitter.images` fields work without it.

2. **Hero image dimensions for OG use**
   - What we know: Hero images are designed for full-width editorial layout. OG recommended size is 1200x630 (1.91:1).
   - What's unclear: Actual pixel dimensions of the hero images in `public/images/projects/`.
   - Recommendation: Use them as-is per D-03. Social platforms will center-crop. No action needed.

3. **`copy.ts` meta title suffix conflict**
   - What we know: `copy.aboutMeta.title`, `copy.servicesMeta.title`, `copy.contactMeta.title` all include " | Lorenzo Pardell" which the template will duplicate.
   - What's unclear: Whether the planner should update `copy.ts` or override in the page metadata export.
   - Recommendation: Override in the page `metadata` export (inline string), keeping `copy.ts` for page copy only. Meta title strings belong in the metadata export, not in `copy.ts`. This avoids changing copy data that may be used elsewhere.

## Environment Availability

Step 2.6: SKIPPED — this phase is purely code and configuration changes. No external services, CLI tools, databases, or runtimes beyond Node.js and Next.js (already running) are required.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no test files, no jest/vitest config |
| Config file | None |
| Quick run command | Manual browser inspection |
| Full suite command | Manual browser inspection |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | JSON-LD renders in page HTML for homepage and project pages | manual | Google Rich Results Test URL | ❌ Wave 0 — no framework |
| SEO-02 | Page title in `<title>` tag matches keyword-rich spec | manual | View source / browser tab | ❌ Wave 0 |
| SEO-03 | Meta description matches spec per page | manual | View source | ❌ Wave 0 |
| SEO-04 | Image alt text is descriptive on all image components | manual | Chrome DevTools Elements panel | ❌ Wave 0 |
| SEO-05 | Project OG image resolves to hero photo, not og-image.png | manual | `curl -s https://lorenzopardell.com/portfolio/{slug}` and inspect og:image | ❌ Wave 0 |
| SEO-06 | Twitter card meta tags present on all pages | manual | View source / Twitter Card Validator | ❌ Wave 0 |
| UI-01 | Footer social links are min 44x44px tappable | manual | Chrome DevTools mobile emulation | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` — verify no TypeScript errors and no build failures
- **Per wave merge:** `npm run build && npm run start` — smoke-test rendered HTML for JSON-LD presence
- **Phase gate:** Manual checklist review before `/gsd:verify-work`

### Wave 0 Gaps
No automated test framework exists in this project. Given the phase scope (metadata and CSS only), the verification strategy is:

- [ ] `npm run build` must pass with zero TypeScript errors after each wave
- [ ] View-source check on 3 pages (homepage, portfolio index, one project page) to confirm JSON-LD, OG, and Twitter tags
- [ ] Chrome DevTools mobile emulation at 375px to confirm 44x44px touch targets
- [ ] Google Rich Results Test on the deployed URL (post-deployment verification, not blocking)

Installing a test framework (Jest/Vitest) for this phase would be disproportionate overhead for metadata and CSS work. The planner should specify manual verification steps in each plan's verification section.

## Sources

### Primary (HIGH confidence)
- Next.js 15 Metadata API official docs — JSON-LD pattern, `metadata.twitter`, `metadata.openGraph`, `generateMetadata`
- Schema.org — CreativeWork, Person, ProfessionalService type definitions
- Existing codebase (`app/layout.tsx`, `app/portfolio/[slug]/page.tsx`) — verified current state of metadata infrastructure

### Secondary (MEDIUM confidence)
- WCAG 2.5.5 — 44x44px minimum touch target guideline (widely cited, industry standard)
- Google Search Central — JSON-LD structured data best practices

### Tertiary (LOW confidence)
None — all findings are based on official specifications and direct codebase inspection.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Next.js 15 built-ins, no new libraries
- Architecture: HIGH — JSON-LD via `<script>` is the documented Next.js approach; patterns verified against official docs structure
- Pitfalls: HIGH — title template double-suffix and Client Component JSON-LD are concrete, observable issues in the existing codebase

**Research date:** 2026-03-28
**Valid until:** 2026-06-28 (stable Next.js Metadata API; schema.org evolves slowly)
