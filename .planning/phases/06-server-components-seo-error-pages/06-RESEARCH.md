# Phase 06: Server Components, SEO & Error Pages - Research

**Researched:** 2026-03-27
**Domain:** Next.js 15 App Router — metadata API, sitemap, robots.txt, error boundaries, server component conversion
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Claude's Discretion on conversion approach — hybrid (Server Component pages with client wrappers for animated sections) is the expected pattern, but Claude decides per-page based on complexity.
- **D-02:** All existing Framer Motion animations MUST be preserved. No animations should be dropped during conversion. Extract animated sections into `"use client"` wrapper components as needed.
- **D-03:** Data imports (from `lib/data/projects.ts`) work in both Server and Client Components since the data is local TypeScript — no async fetching needed.
- **D-04:** Use a single static default OG image site-wide. Generate a placeholder SVG with "Lorenzo Pardell" + "Sound Designer" branding (dark background, orange accent). User will replace with real image later.
- **D-05:** Place the OG image at `public/og-image.svg` (or PNG if SVG not supported by social platforms — Claude decides format).
- **D-06:** For project detail pages, use the same static default image (not per-project thumbnails, since those are currently placeholders).
- **D-07:** 404 page (`not-found.tsx`): minimal branded design — clean layout with orange accent, clear "Page not found" message, and navigation button back to home. Match the portfolio's existing clean aesthetic.
- **D-08:** Error boundary (`error.tsx`): Claude's Discretion on recovery UX — at minimum a way to retry and navigate away. Styled to match site branding.
- **D-09:** Claude's Discretion on page title pattern — pick based on SEO best practices for portfolio sites.
- **D-10:** All metadata in English. Site translation is planned for later — structure metadata so it's easy to localize in the future.
- **D-11:** Each project detail page must have unique OG metadata (title, description) derived from the project's `title` and `description` fields.
- **D-12:** Sitemap (`app/sitemap.ts`) must include all static routes plus all 19 project detail pages dynamically.
- **D-13:** Robots.txt (`app/robots.ts`) should allow all crawlers.

### Claude's Discretion
- Server Component conversion strategy per page (D-01)
- Error boundary recovery UX (D-08)
- Page title format pattern (D-09)
- OG image file format — SVG vs PNG (D-05)

### Deferred Ideas (OUT OF SCOPE)
- Site internationalization/translation — mentioned as future plan, not this phase
- Dynamic per-project OG images — can upgrade from static default later when real project images are available
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-01 | Pages with static content render as Server Components with SEO-indexable HTML | Server Component conversion pattern documented — hybrid approach verified |
| SEO-02 | Site generates sitemap.xml with all routes via `app/sitemap.ts` | `MetadataRoute.Sitemap` API verified via official docs |
| SEO-03 | Site serves robots.txt via `app/robots.ts` | `MetadataRoute.Robots` API verified via official docs |
| SEO-04 | Each page has Open Graph metadata (title, description, image) for social sharing | `metadata` export + `openGraph` field verified in Next.js 15 |
| SEO-05 | Portfolio project pages have unique OG metadata per project | `generateMetadata` with `params` (Promise in Next.js 15) verified |
| ERR-01 | Custom 404 page (not-found.tsx) with branding and navigation back to site | `app/not-found.tsx` convention verified — Server Component by default |
| ERR-02 | Global error boundary (error.tsx) catches runtime errors with recovery option | `app/error.tsx` convention verified — MUST be `"use client"` |
</phase_requirements>

---

## Summary

This phase adds SEO infrastructure (sitemap, robots.txt, Open Graph metadata) and error handling pages to the Next.js 15 App Router portfolio. The codebase is currently 100% client-side rendered — every page file starts with `"use client"`. Converting pages to Server Components unlocks the `metadata` and `generateMetadata` exports that Next.js requires for build-time SEO tags.

The conversion strategy is a hybrid: page files become Server Components and export metadata, while animated sections are extracted into separate `"use client"` wrapper components. This is the canonical Next.js pattern for using Framer Motion with Server Components. Since all data comes from `lib/data/projects.ts` (a local TypeScript module), no async data fetching is required during conversion — the data reads are synchronous and work in both Server and Client Components.

The OG image must be PNG, not SVG. Social platforms (Facebook, Twitter/X, LinkedIn) do not reliably support SVG for Open Graph images. A static PNG placeholder at `public/og-image.png` is the correct approach. All metadata APIs (`metadata` object, `generateMetadata`, `sitemap.ts`, `robots.ts`) are Server Component only — this is a hard Next.js constraint, not a preference.

**Primary recommendation:** Convert page files to Server Components by removing `"use client"` from the page file and extracting animated JSX into new `"use client"` client wrapper components. Then add `metadata` exports (static) or `generateMetadata` functions (dynamic, for slug page) to each page file.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.2.2 (already installed) | Sitemap, robots, metadata, error pages | Built-in App Router file conventions — no extra libraries needed |
| React | ^19.0.0 (already installed) | Server/Client Component model | Required for `"use client"` / Server Component distinction |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| framer-motion | ^12.5.0 (already installed) | Animations in client wrapper components | Any component with `motion.*` or `AnimatePresence` — must remain client |

### No New Packages Required
This phase requires zero new npm dependencies. All needed APIs ship with Next.js 15.

**Installation:**
```bash
# Nothing to install — all APIs are built into Next.js 15
```

---

## Architecture Patterns

### Recommended Project Structure

New files this phase creates:

```
app/
├── sitemap.ts              # SEO-02: MetadataRoute.Sitemap — all routes
├── robots.ts               # SEO-03: MetadataRoute.Robots — allow all crawlers
├── not-found.tsx           # ERR-01: Branded 404 page (Server Component)
├── error.tsx               # ERR-02: Global error boundary ("use client" required)
├── page.tsx                # SEO-01/04: Remove "use client", add metadata export
├── about/
│   └── page.tsx            # SEO-04: Remove "use client", add metadata export
├── contact/
│   └── page.tsx            # SEO-04: Remove "use client", add metadata export
├── services/
│   └── page.tsx            # SEO-04: Remove "use client", add metadata export
├── portfolio/
│   ├── page.tsx            # SEO-04: Remove "use client", add metadata export
│   └── [slug]/
│       └── page.tsx        # SEO-05: Remove "use client", add generateMetadata
public/
└── og-image.png            # SEO-04/05: Static OG image placeholder
```

New client wrapper components (one per page that has animations to extract):

```
components/
├── home/
│   └── HomePageClient.tsx       # Wraps HeroSection, ServicesSection, SelectedWorks, CTASection
├── portfolio/
│   └── PortfolioPageClient.tsx  # Wraps CategoryFilter + PortfolioGrid (state + motion)
└── about/
    └── AboutPageClient.tsx      # Wraps animated motion.section blocks
```

Services page and contact page may not need a dedicated client wrapper if all their animation-bearing JSX is already inside child components that are already `"use client"`.

### Pattern 1: Server Component Page with Client Wrapper

**What:** Page file is a Server Component. Animated/interactive content is delegated to a `"use client"` wrapper component.
**When to use:** Any page that currently uses `motion.*` directly in the page file's JSX, or any page that uses `useState`/`useEffect`.

```typescript
// app/about/page.tsx — Server Component (no "use client")
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About",   // template in root layout produces: "About | Lorenzo Pardell"
  description: "Re-recording mixer and sound designer based in São Paulo...",
  openGraph: {
    title: "About — Lorenzo Pardell",
    description: "Re-recording mixer and sound designer...",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
```

```typescript
// components/about/AboutPageClient.tsx — Client Component
"use client";
import { motion } from "framer-motion";
// ... all existing JSX from app/about/page.tsx
export default function AboutPageClient() { ... }
```

### Pattern 2: generateMetadata for Dynamic Routes

**What:** For `app/portfolio/[slug]/page.tsx`, export an async `generateMetadata` function. In Next.js 15, `params` is a `Promise` — must `await` it.
**When to use:** Any route with dynamic segments needing per-page OG metadata.

```typescript
// app/portfolio/[slug]/page.tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/lib/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description || `${project.title} — sound by Lorenzo Pardell`,
    openGraph: {
      title: `${project.title} | Lorenzo Pardell`,
      description: project.description || `Sound work by Lorenzo Pardell`,
      images: ["/og-image.png"],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Server Component — delegates rendering to client wrapper
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  // ... render logic
}
```

**Critical Next.js 15 note:** `params` in `generateMetadata` and page components is now a `Promise<{ slug: string }>`. Accessing `params.slug` directly (without `await`) will throw. The current `app/portfolio/[slug]/page.tsx` uses `useParams()` from `next/navigation` (client hook) — after conversion to a Server Component, read `params` directly from props and `await` it.

### Pattern 3: sitemap.ts

**What:** Export default function returning `MetadataRoute.Sitemap` array.
**When to use:** Required once at `app/sitemap.ts`.

```typescript
// app/sitemap.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";

const baseUrl = "https://lorenzopardell.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
```

### Pattern 4: robots.ts

```typescript
// app/robots.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://lorenzopardell.com/sitemap.xml",
  };
}
```

### Pattern 5: not-found.tsx

**What:** Server Component at `app/not-found.tsx`. No `"use client"` required. Handles all unmatched routes across the app (root placement).

```typescript
// app/not-found.tsx
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/not-found
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
```

**Key fact:** `app/not-found.tsx` at root level is wrapped by `app/layout.tsx` automatically — Header and Footer will appear. No special layout wiring needed. Do NOT use `global-not-found.tsx` (experimental, requires different setup).

### Pattern 6: error.tsx

**What:** MUST be `"use client"`. Wraps its sibling page in a React Error Boundary. In Next.js 15.2+, uses `unstable_retry` (not `reset`) to re-render. Also provide a navigate-away option.

```typescript
// app/error.tsx
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/error
"use client";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        An unexpected error occurred. You can try again or return to the homepage.
      </p>
      <div className="flex gap-4">
        <button onClick={unstable_retry}>Try again</button>
        <a href="/">Return Home</a>
      </div>
    </div>
  );
}
```

**Important:** `app/error.tsx` does NOT wrap the root layout (`app/layout.tsx`) — it wraps only the page content. For errors in the root layout itself, `app/global-error.tsx` is needed (but this phase does not require it — ERR-02 only asks for a global error boundary for runtime page errors, which `app/error.tsx` covers).

### Pattern 7: Root Layout Metadata Template

Add `metadataBase` and `title.template` to `app/layout.tsx` so child pages can set short titles and get the full formatted title automatically:

```typescript
// app/layout.tsx — add to existing metadata export
export const metadata: Metadata = {
  metadataBase: new URL("https://lorenzopardell.com"),
  title: {
    template: "%s | Lorenzo Pardell",
    default: "Lorenzo Pardell | Sound Designer",
  },
  // ... rest of existing fields unchanged
  openGraph: {
    siteName: "Lorenzo Pardell",
    images: ["/og-image.png"],
    locale: "en_US",
    type: "website",
  },
};
```

With `metadataBase` set, all relative image paths (`/og-image.png`) in `openGraph.images` resolve correctly to `https://lorenzopardell.com/og-image.png` without needing absolute URLs in every page.

### Anti-Patterns to Avoid

- **Keeping `"use client"` on page files that export metadata:** `metadata` and `generateMetadata` are silently ignored in Client Components. The page will compile but metadata will not appear in the HTML. No error is thrown.
- **Using `params.slug` without `await` in Next.js 15:** In Next.js 15, `params` is a `Promise`. Accessing `params.slug` directly produces a deprecation warning in dev and may fail in production. Always `const { slug } = await params`.
- **Using `useParams()` in a Server Component:** After converting the slug page to a Server Component, replace `const { slug } = useParams()` with `const { slug } = await params` from the component's props.
- **Using SVG for the OG image:** Social crawlers (Facebook, Twitter/X, LinkedIn) do not reliably render SVG Open Graph images. Use PNG.
- **Placing `error.tsx` without `"use client"`:** Error boundaries are a React class component feature — they require the client runtime. Next.js enforces `"use client"` on `error.tsx`. Omitting it causes a build error.
- **Using `reset` instead of `unstable_retry` in Next.js 15.2+:** The `reset` prop still works but `unstable_retry` re-fetches and re-renders. For this phase, `unstable_retry` is the recommended prop.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap XML generation | Manual XML string template | `app/sitemap.ts` with `MetadataRoute.Sitemap` | Next.js handles encoding, `<urlset>` wrapper, content-type header |
| robots.txt serving | Static file in `public/` | `app/robots.ts` with `MetadataRoute.Robots` | Automatic, typed, co-located with codebase |
| OG meta tags | Manual `<head>` injection | `metadata` export / `generateMetadata` | Next.js merges across layout hierarchy, handles streaming for bots |
| Error catch UI | Custom React Error Boundary class | `app/error.tsx` convention | Next.js wraps automatically at segment level |
| 404 routing | Manual redirect middleware | `app/not-found.tsx` convention | Next.js routes all unmatched URLs to this file at root level |

**Key insight:** Every output of this phase is a built-in Next.js App Router file convention. Zero custom infrastructure required.

---

## Common Pitfalls

### Pitfall 1: Metadata Silently Ignored on Client Components
**What goes wrong:** Page exports `metadata` but the `<title>` tag in the HTML still shows the root layout default.
**Why it happens:** Next.js ignores `metadata` exports on files that have `"use client"`. No build error is thrown.
**How to avoid:** Remove `"use client"` from the page file. Move all hooks, motion, and event handlers to a child component.
**Warning signs:** Check rendered HTML source — if `<title>` shows only the root default title, the page is still a Client Component.

### Pitfall 2: `params` Not Awaited in Next.js 15
**What goes wrong:** `const { slug } = params` — accessing slug works in dev but triggers deprecation warnings; in some Next.js 15 builds it throws at runtime.
**Why it happens:** Next.js 15 changed `params` from a plain object to a `Promise` in Server Components and `generateMetadata`.
**How to avoid:** Always `const { slug } = await params` when `params` comes from props in a Server Component.
**Warning signs:** Console warning: "params should be awaited before using its properties."

### Pitfall 3: OG Image Path Not Resolved Without metadataBase
**What goes wrong:** `openGraph: { images: ["/og-image.png"] }` — social scrapers receive a relative path, not a full URL. Preview shows no image.
**Why it happens:** OG image must be a fully qualified URL. Relative paths only resolve correctly when `metadataBase` is set in the root layout.
**How to avoid:** Add `metadataBase: new URL("https://lorenzopardell.com")` to root layout metadata. Then all child pages can use relative paths.
**Warning signs:** Facebook/LinkedIn debugger shows "og:image not found" or image preview blank.

### Pitfall 4: `not-found.tsx` Shows No Layout (Wrong File Placement)
**What goes wrong:** Custom 404 renders without Header/Footer — bare white page.
**Why it happens:** If `not-found.tsx` is placed inside a route segment (e.g., `app/portfolio/not-found.tsx`), it only triggers for that segment's `notFound()` calls.
**How to avoid:** Place `app/not-found.tsx` at the root app directory. Root-level `not-found.tsx` is automatically wrapped by `app/layout.tsx`.
**Warning signs:** 404 page shows without site navigation.

### Pitfall 5: `error.tsx` Missing `"use client"`
**What goes wrong:** Build fails with "Error boundaries must be Client Components."
**Why it happens:** React error boundaries are implemented using class component lifecycle methods unavailable in Server Components.
**How to avoid:** Always add `"use client"` as the first line of `app/error.tsx`.
**Warning signs:** Next.js build error referencing error boundary + client component requirement.

### Pitfall 6: Project Page Still Using `useParams()` After Server Component Conversion
**What goes wrong:** `useParams` is a React hook — calling it in a Server Component throws "React hooks can only be called inside a client component."
**Why it happens:** The current `app/portfolio/[slug]/page.tsx` reads the slug via `useParams()`. After removing `"use client"`, this hook becomes invalid.
**How to avoid:** Replace `useParams()` with `await params` from the component's props parameter.
**Warning signs:** Build error: "You're importing a component that needs `useParams`. It only works in a Client Component."

### Pitfall 7: Services Page Has Local `"use client"` Sub-components
**What goes wrong:** `app/services/page.tsx` defines `ServiceCard`, `BenefitItem`, `FormatTag`, `FeatureItem`, `ServiceItem` as arrow function components inline — all using `motion.*` and `whileHover`. If the page file becomes a Server Component, these inline components lose access to `motion`.
**Why it happens:** `motion.*` requires the client runtime. Inline components inherit the parent file's directive.
**How to avoid:** Extract the entire services page body to `components/services/ServicesPageClient.tsx` with `"use client"`, keeping all inline components. The page file simply renders `<ServicesPageClient />`.

---

## OG Image Decision (D-05)

**Decision: Use PNG, not SVG.**

SVG is NOT supported as an Open Graph image by major social platforms (Facebook, Twitter/X, LinkedIn, Slack). Sources confirm OG images must be JPEG or PNG; SVG has "limited support" and is not recommended.

**Recommended OG image spec:**
- Format: PNG
- Dimensions: 1200 × 630 pixels (1.91:1 ratio — standard for all platforms)
- Content: Dark background, orange-500 accent, "Lorenzo Pardell" + "Sound Designer" text in white
- Location: `public/og-image.png`
- Reference in metadata as: `/og-image.png` (relative, resolves via `metadataBase`)

The placeholder SVG can be created and then converted to PNG, or a PNG can be generated directly using a canvas/SVG-to-PNG script. For this phase, a minimal inline SVG content rendered as a PNG placeholder is sufficient — the user will replace it with a real image.

---

## Page Title Pattern (D-09)

**Recommended: `%s | Lorenzo Pardell` template in root layout.**

SEO best practice for portfolio sites: `[Page Name] | [Your Name]`
- Homepage: `"Lorenzo Pardell | Sound Designer"` (default, not templated)
- Portfolio: `"Portfolio | Lorenzo Pardell"`
- About: `"About | Lorenzo Pardell"`
- Contact: `"Contact | Lorenzo Pardell"`
- Services: `"Services | Lorenzo Pardell"`
- Project pages: `"[Project Title] | Lorenzo Pardell"`

This keeps titles short enough for Google's 60-character display limit while keeping the brand name visible on every tab/search result.

---

## Server Component Conversion Strategy (D-01)

Analysis of each page file:

| Page File | Current Directive | Has Hooks/State | Has motion.* in page file | Conversion Strategy |
|-----------|------------------|-----------------|--------------------------|---------------------|
| `app/page.tsx` | `"use client"` | No hooks | No — delegates to child components | Remove directive; add metadata export; render child components directly |
| `app/portfolio/page.tsx` | `"use client"` | `useState`, `useMemo` | Yes — `motion.div` wrappers | Extract entire JSX to `PortfolioPageClient.tsx` |
| `app/portfolio/[slug]/page.tsx` | `"use client"` | `useParams()` | No — delegates to PortfolioDetail* | Remove directive; replace `useParams()` with prop `params`; add `generateMetadata` |
| `app/about/page.tsx` | `"use client"` | No hooks | Yes — `motion.section` throughout | Extract entire JSX to `AboutPageClient.tsx` |
| `app/services/page.tsx` | `"use client"` | No hooks | Yes — `motion.div` and inline `motion.*` components | Extract entire JSX (including inline components) to `ServicesPageClient.tsx` |
| `app/contact/page.tsx` | `"use client"` | No hooks | No motion in page JSX | Remove directive; add metadata export; render existing JSX directly (contact page has no motion in page file) |

**`app/page.tsx` (homepage):** This is the simplest case. The page file already delegates all rendering to child components (`HeroSection`, `ServicesSection`, `SelectedWorks`, `CTASection`) — it does not use motion or hooks directly. Removing `"use client"` and adding a `metadata` export is sufficient with no extracted wrapper needed. The child components are already `"use client"` where needed.

**`app/contact/page.tsx`:** No `motion.*` is used in the page file itself. The page just renders layout with `getVisibleSocialLinks()` (pure function) and `contactInfo` (plain import). Remove `"use client"`, add metadata export — no wrapper needed.

---

## Code Examples

### Root Layout Metadata Update
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/layout.tsx — update existing metadata export
export const metadata: Metadata = {
  metadataBase: new URL("https://lorenzopardell.com"),
  title: {
    template: "%s | Lorenzo Pardell",
    default: "Lorenzo Pardell | Sound Designer",
  },
  description: "Sound designer specializing in film, series, and documentaries based in São Paulo, Brazil.",
  keywords: [...existing keywords...],
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://lorenzopardell.com" },
  openGraph: {
    siteName: "Lorenzo Pardell",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};
```

### generateMetadata with Awaited Params (Next.js 15 pattern)
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;  // MUST await in Next.js 15
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description || `${project.title} — sound by Lorenzo Pardell`,
    openGraph: {
      title: `${project.title} | Lorenzo Pardell`,
      description: project.description || "Sound work by Lorenzo Pardell",
      images: ["/og-image.png"],
    },
  };
}
```

### generateStaticParams for pre-rendering
```typescript
// Source: Next.js App Router docs
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
```

This tells Next.js to pre-render all 19 project pages at build time, which is the optimal strategy since all slugs are known at build time.

---

## Environment Availability

Step 2.6: SKIPPED — this phase is code/config changes only. No external tools, services, databases, or CLIs are required beyond the existing Node.js + npm environment already in use.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `params` as plain object | `params` as `Promise<{...}>` | Next.js 15.0 | Must `await params` in server components and `generateMetadata` |
| `reset` prop on error.tsx | `unstable_retry` prop | Next.js 15.2 (16.2 confirms) | `unstable_retry` re-fetches; `reset` just re-renders without fetch |
| `global-not-found.tsx` | Still experimental in Next.js 15.4+ | Next.js 15.4 | Do NOT use — requires `experimental.globalNotFound` flag and returns full HTML doc |

**Deprecated/outdated:**
- `useParams()` in Server Components: Not deprecated but inapplicable — hooks only work in Client Components.
- Placing `metadata` export in `"use client"` files: Silently ignored (no error), but behavior is wrong.

---

## Open Questions

1. **Project 18 ("Ropes For Building Blocks") has an empty `description` field**
   - What we know: `description: ""` in `lib/data/projects.ts`
   - What's unclear: `generateMetadata` will produce an empty `og:description` for this project
   - Recommendation: Use a fallback string in `generateMetadata`: `project.description || `${project.title} — sound work by Lorenzo Pardell``

2. **`app/portfolio/[slug]/layout.tsx` is currently `"use client"`**
   - What we know: It uses `motion.div` for the back-button animation
   - What's unclear: Whether to convert this layout too
   - Recommendation: Convert `app/portfolio/[slug]/layout.tsx` to a Server Component and extract the `motion.div` into a client wrapper component. This is not strictly required for SEO (metadata is on the page, not the layout), but it's consistent with the conversion approach.

---

## Sources

### Primary (HIGH confidence)
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap — `MetadataRoute.Sitemap` API, version history confirmed for Next.js 15
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots — `MetadataRoute.Robots` API
- https://nextjs.org/docs/app/api-reference/file-conventions/not-found — `not-found.tsx` conventions, root-level behavior
- https://nextjs.org/docs/app/api-reference/file-conventions/error — `error.tsx` requirements (must be `"use client"`), `unstable_retry` prop
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata — `generateMetadata` signature with Promise params, `metadata` export, `metadataBase`, `openGraph`, title template pattern

### Secondary (MEDIUM confidence)
- WebSearch result confirming SVG not supported for OG images on Facebook, Twitter/X, LinkedIn — consistent with known social platform behavior; verified by multiple sources in search results

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages, all built-in Next.js 15 APIs verified via official docs
- Architecture: HIGH — patterns verified directly from Next.js docs; code examples are based on official examples adapted to this project
- Pitfalls: HIGH — all pitfalls derived from documented API behavior (params as Promise, "use client" requirement for error.tsx, etc.)
- OG image format: HIGH — SVG rejection by social platforms is consistent across multiple sources and is a well-known limitation

**Research date:** 2026-03-27
**Valid until:** 2026-06-27 (Next.js 15 stable APIs are unlikely to change within 3 months)
