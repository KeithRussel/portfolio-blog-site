# Project Folder Structure

```
portfolio-blog-site/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog list page (/blog)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Blog detail page (/blog/[slug])
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx              # Projects list page (/projects)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Project detail page (/projects/[slug])
│   │   │
│   │   ├── layout.tsx                # Root layout with nav/footer
│   │   ├── page.tsx                  # Home page (/)
│   │   └── globals.css               # Global styles + Tailwind
│   │
│   ├── components/
│   │   └── ui/                       # shadcn/ui components
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       └── breadcrumb.tsx
│   │
│   ├── lib/
│   │   ├── payload.ts                # Payload client helper (getPayloadClient)
│   │   └── utils.ts                  # cn() utility for Tailwind
│   │
│   ├── payload/
│   │   └── collections/              # Payload CMS collections
│   │       ├── BlogPosts.ts
│   │       ├── Projects.ts
│   │       ├── Media.ts
│   │       └── Categories.ts
│   │
│   ├── payload.config.ts             # Main Payload CMS config
│   └── payload-types.ts              # Auto-generated (DO NOT EDIT)
│
├── media/                            # Uploaded media files (gitignored)
│
├── .env.example                      # Example environment variables
├── .env                              # Your local env (gitignored)
├── .gitignore
│
├── next.config.ts                    # Next.js config with Payload integration
├── tailwind.config.ts                # Tailwind CSS config
├── postcss.config.mjs                # PostCSS config
├── tsconfig.json                     # TypeScript config
│
├── package.json                      # Dependencies & scripts
├── README.md                         # Getting started guide
├── ARCHITECTURE.md                   # Detailed architecture docs
└── FOLDER_STRUCTURE.md               # This file
```

## Key Files Explained

### Next.js Files

- **`src/app/layout.tsx`** - Root layout with navigation, applies to all pages
- **`src/app/page.tsx`** - Home page at `/`
- **`src/app/blog/page.tsx`** - Blog list at `/blog`
- **`src/app/blog/[slug]/page.tsx`** - Blog post detail at `/blog/my-post`
- **`src/app/projects/page.tsx`** - Projects list at `/projects`
- **`src/app/projects/[slug]/page.tsx`** - Project detail at `/projects/my-project`

### Payload CMS Files

- **`src/payload.config.ts`** - Main Payload configuration (database, collections, editor)
- **`src/payload/collections/*.ts`** - Collection schema definitions
- **`src/payload-types.ts`** - Auto-generated TypeScript types (run `npm run generate:types`)

### Utilities

- **`src/lib/payload.ts`** - Helper to get Payload instance for Local API calls
- **`src/lib/utils.ts`** - Contains `cn()` utility for merging Tailwind classes

### Configuration

- **`next.config.ts`** - Next.js config wrapped with `withPayload()`
- **`tailwind.config.ts`** - Tailwind with shadcn/ui color system
- **`.env.example`** - Template for environment variables
- **`.env`** - Your actual environment variables (never commit)

## File Naming Conventions

- **Routes**: Use Next.js App Router conventions
  - `page.tsx` = route page
  - `layout.tsx` = layout wrapper
  - `[slug]/page.tsx` = dynamic route

- **Components**: PascalCase for React components
  - `Card.tsx`, `Badge.tsx`, `Breadcrumb.tsx`

- **Collections**: PascalCase plural
  - `BlogPosts.ts`, `Projects.ts`, `Media.ts`

- **Utilities**: camelCase
  - `utils.ts`, `payload.ts`

## Import Aliases

The project uses `@/*` to import from `src/`:

```typescript
import { getPayloadClient } from '@/lib/payload'
import { Card } from '@/components/ui/card'
import type { Media } from '@/payload-types'
```
