# Codebase Structure

**Analysis Date:** 2026-04-10

## Directory Layout

```
next-portfolio/
├── app/                          # Next.js App Router (routes + metadata)
│   ├── about/
│   │   └── page.tsx              # RSC, delegates to AboutPageClient
│   ├── contact/
│   │   └── page.tsx              # RSC, renders JSX directly (no client shell)
│   ├── faq/
│   │   └── page.tsx              # RSC, injects FAQ JSON-LD
│   ├── portfolio/
│   │   ├── [slug]/
│   │   │   ├── layout.tsx        # Wraps detail pages in ProjectLayoutClient
│   │   │   ├── loading.tsx       # Suspense fallback
│   │   │   └── page.tsx          # SSG detail page, generateStaticParams
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       └── page.tsx      # SSG category page
│   │   ├── loading.tsx           # Grid skeleton
│   │   └── page.tsx              # RSC → PortfolioPageClient
│   ├── services/
│   │   ├── loading.tsx
│   │   └── page.tsx              # RSC → ServicesPageClient
│   ├── error.tsx                 # Global error boundary (client)
│   ├── favicon.ico
│   ├── globals.css               # Tailwind v4 entry, CSS variables, plugin imports
│   ├── layout.tsx                # Root layout: fonts, metadata, Header, Footer, WhatsApp, JSON-LD
│   ├── not-found.tsx             # 404 page
│   ├── page.tsx                  # Homepage
│   ├── robots.ts                 # Metadata route
│   └── sitemap.ts                # Metadata route
│
├── components/                   # All React components (feature-grouped)
│   ├── about/
│   │   └── AboutPageClient.tsx
│   ├── faq/
│   │   └── FAQPageClient.tsx
│   ├── home/                     # Homepage sections
│   │   ├── CTASection.tsx
│   │   ├── ClientQuote.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HomeFAQ.tsx
│   │   ├── SelectedWorks.tsx
│   │   ├── ServicesSection.tsx
│   │   └── partner-logos.tsx     # kebab-case outlier
│   ├── navigation/
│   │   ├── footer.tsx            # lowercase outlier
│   │   └── header.tsx            # lowercase outlier
│   ├── portfolio/                # Portfolio grid, detail, sub-cards
│   │   ├── CategoryFilter.tsx
│   │   ├── CategoryPageClient.tsx
│   │   ├── PortfolioCard.tsx
│   │   ├── PortfolioDetail.tsx           # primary design variant
│   │   ├── PortfolioDetailSecondary.tsx  # secondary design variant
│   │   ├── PortfolioDetailTertiary.tsx   # tertiary design variant
│   │   ├── PortfolioGrid.tsx
│   │   ├── PortfolioPageClient.tsx
│   │   ├── ProjectAboutCard.tsx
│   │   ├── ProjectDetailsCard.tsx
│   │   ├── ProjectLayoutClient.tsx
│   │   ├── ProjectNavigation.tsx
│   │   ├── ProjectSlugClient.tsx         # variant dispatcher
│   │   └── ProjectVideoCard.tsx
│   ├── services/
│   │   └── ServicesPageClient.tsx
│   └── ui/                       # shadcn primitives + custom widget
│       ├── WhatsAppLive.tsx      # custom floating widget (PascalCase)
│       ├── accordion.tsx
│       ├── aspect-ratio.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       └── textarea.tsx
│
├── lib/                          # Data, config, utilities (no hooks/)
│   ├── animations.ts             # Shared framer-motion variants
│   ├── contact-info.ts           # Email, phone, WhatsApp URL builder
│   ├── copy-backup.md            # Historical copy reference
│   ├── copy.ts                   # All user-facing strings
│   ├── data/
│   │   └── projects.ts           # Project[] + accessor functions (575 lines)
│   ├── jsonld.ts                 # schema.org builders
│   ├── social-links.tsx          # SocialLink[] with inline SVG icons
│   └── utils.ts                  # cn() classname helper
│
├── public/                       # Static assets
│   ├── images/
│   │   └── projects/             # One subdir per project slug (30 total)
│   │       ├── escravos_da_fe_arautos_do_evangelho/
│   │       ├── esse_e_o_bicho_s02/
│   │       ├── operacao_transplante_s01/
│   │       └── ...               # snake_case directory names
│   ├── partner_logos/            # White-on-transparent client/platform logos
│   ├── og-image.png
│   ├── favicon.ico
│   ├── whatsapp.png
│   └── *.svg                     # next.svg, vercel.svg, file.svg, etc.
│
├── scripts/
│   └── verify-continuity.ts      # Ad-hoc data validation script
│
├── .planning/                    # GSD planning artifacts (milestones, phases, research)
├── .vercel/                      # Vercel project link
├── .next/                        # Build output (gitignored)
├── CLAUDE.md                     # Project instructions (partially stale re: Supabase)
├── README.md
├── components.json               # shadcn config (new-york, neutral, RSC on)
├── next.config.ts                # Empty config
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs            # @tailwindcss/postcss
├── tailwind.config.js            # Legacy v3 config file (Tailwind v4 uses CSS)
└── tsconfig.json                 # strict, @/* alias to project root
```

## Directory Purposes

**`app/`** — Next.js App Router routes. Route files are Server Components; most delegate to a `*PageClient` in `components/`. Contains metadata routes (`sitemap.ts`, `robots.ts`), global error (`error.tsx`), 404 (`not-found.tsx`), and the root shell (`layout.tsx`, `globals.css`).

**`components/`** — All React components. Subdirectories group components by feature/page. `components/ui/` holds shadcn primitives and the WhatsApp widget.

**`lib/`** — Non-component code: static data, utilities, config objects, and schema.org builders. `lib/data/projects.ts` is the single source of truth for project records. **Note:** There is no `hooks/` directory; `CLAUDE.md` references one that no longer exists.

**`public/`** — Static assets served from the site root. Project images are namespaced by slug under `public/images/projects/`.

**`scripts/`** — Ad-hoc Node/TS scripts. Currently only `verify-continuity.ts` (data integrity check).

**`.planning/`** — GSD workflow artifacts (milestones, phase plans, summaries, research). Not shipped.

## Key File Locations

**Entry Points:**
- `app/layout.tsx` — root layout, metadata, global chrome
- `app/page.tsx` — homepage

**Configuration:**
- `next.config.ts` — empty
- `tsconfig.json` — TS config, `@/*` alias
- `components.json` — shadcn config
- `postcss.config.mjs` — PostCSS plugins
- `tailwind.config.js` — legacy Tailwind v3 shim (superseded by CSS-based v4 config in `app/globals.css`)

**Core Data:**
- `lib/data/projects.ts` — `projects` array, `Project` interface, accessor functions
- `lib/copy.ts` — page copy
- `lib/contact-info.ts` — contact details
- `lib/social-links.tsx` — social profiles

**SEO / Metadata:**
- `lib/jsonld.ts` — schema.org builders
- `app/sitemap.ts`, `app/robots.ts`

**Utilities:**
- `lib/utils.ts` — `cn()`
- `lib/animations.ts` — framer-motion variants

## Naming Conventions

**Files:**
- **Feature components:** PascalCase — `HeroSection.tsx`, `PortfolioCard.tsx`, `AboutPageClient.tsx`
- **shadcn UI primitives:** lowercase — `button.tsx`, `card.tsx`, `accordion.tsx`, `dropdown-menu.tsx`
- **Navigation components:** lowercase — `header.tsx`, `footer.tsx` (inconsistent with the rest of `components/`; legacy)
- **Outliers in `components/home/`:** `partner-logos.tsx` (kebab-case) vs. everything else PascalCase
- **Next.js route files:** lowercase per Next convention — `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`
- **Custom widget:** `WhatsAppLive.tsx` in `components/ui/` (PascalCase, unlike the shadcn primitives around it)

**Directories:**
- `app/` route segments: lowercase, dynamic segments in square brackets (`[slug]`, `[category]`)
- `components/` subdirectories: lowercase feature names (`home`, `portfolio`, `navigation`, `ui`)
- `public/images/projects/<slug>/`: snake_case (e.g., `escravos_da_fe_arautos_do_evangelho/`) — does **not** match the hyphenated slugs in `lib/data/projects.ts` (e.g., `escravos-da-fe`). Image paths reference the snake_case directories directly.

**Code identifiers:**
- Components: PascalCase (`HeroSection`, `PortfolioCard`)
- Functions: camelCase (`getProjectBySlug`, `buildPersonSchema`)
- Interfaces: PascalCase (`Project`, `SocialLink`)
- Constants: camelCase (`projects`, `socialLinks`, `contactInfo`)

## Where to Add New Code

**New page/route:**
- Server Component shell: `app/<route>/page.tsx` with `metadata` export
- Client logic: `components/<route>/<Route>PageClient.tsx`
- Add to `app/sitemap.ts` if it should appear in the sitemap

**New project:**
- Append to the `projects` array in `lib/data/projects.ts` (single source of truth)
- Create `public/images/projects/<snake_case_slug>/` with thumbnail + hero images
- No other files needed — sitemap, static params, category pages, and the portfolio grid regenerate from the array

**New shadcn primitive:**
- Add to `components/ui/` as lowercase file (`components/ui/dialog.tsx`)
- Import in consumers via `@/components/ui/<name>`

**New feature component:**
- Add to `components/<feature>/` using PascalCase (e.g., `components/portfolio/ProjectAwards.tsx`)
- Mark with `"use client"` if it uses hooks, framer-motion, or browser APIs

**New utility / config:**
- Non-component code: `lib/<name>.ts`
- Static content: `lib/copy.ts` (extend the existing `copy` object)

**New animation variant:**
- Add to `lib/animations.ts` and import where needed

**New JSON-LD schema:**
- Add a `build*Schema` function in `lib/jsonld.ts`
- Inject via inline `<script>` in the corresponding Server Component page

## Special Directories

**`.planning/`:**
- Purpose: GSD workflow artifacts (milestones, phase plans, research)
- Generated: Manually, by GSD commands
- Committed: Yes

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes (by `next build`, `next dev`)
- Committed: No (gitignored)

**`.vercel/`:**
- Purpose: Vercel project link
- Generated: By `vercel link`
- Committed: Partial — `project.json` typically gitignored, `README.txt` committed

**`node_modules/`:**
- Purpose: npm dependencies
- Committed: No

---

*Structure analysis: 2026-04-10*
