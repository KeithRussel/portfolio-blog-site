# Portfolio + Blog Site

A production-ready hybrid Portfolio & Blog web application built with **Next.js 15**, **Payload CMS v3**, and **TypeScript**.

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **lucide-react** icons

### Backend / CMS
- **Payload CMS v3**
- **MongoDB**
- **Payload Local API** (direct database access, no GraphQL)
- **Lexical Editor** for rich text

## Architecture

This project implements a **"Lists with Details"** pattern with Server Components and ISR (Incremental Static Regeneration):

```
/blog → Blog list page (ISR: 60s)
/blog/[slug] → Blog detail page (ISR: 60s, SSG at build time)

/projects → Projects list page (ISR: 60s)
/projects/[slug] → Project detail page (ISR: 60s, SSG at build time)
```

### Key Design Decisions

1. **Server Components by Default** - All pages use Server Components for optimal performance
2. **Payload Local API** - Direct database queries via Payload's Local API (no GraphQL overhead)
3. **ISR with revalidate** - Pages cache for 60 seconds, then regenerate on demand
4. **Static Generation** - All blog posts and projects pre-rendered at build time via `generateStaticParams`
5. **Type Safety** - Full TypeScript integration with Payload's auto-generated types
6. **SEO-First** - Dynamic metadata using Next.js Metadata API

## Project Structure

```
portfolio-blog-site/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog list page
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Blog detail page
│   │   ├── projects/
│   │   │   ├── page.tsx        # Projects list page
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Project detail page
│   │   ├── layout.tsx          # Root layout with navigation
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   │
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       └── breadcrumb.tsx
│   │
│   ├── lib/
│   │   ├── payload.ts          # Payload client helper
│   │   └── utils.ts            # cn() utility
│   │
│   ├── payload/
│   │   └── collections/        # Payload CMS collections
│   │       ├── BlogPosts.ts
│   │       ├── Projects.ts
│   │       ├── Media.ts
│   │       └── Categories.ts
│   │
│   ├── payload.config.ts       # Payload CMS configuration
│   └── payload-types.ts        # Auto-generated TypeScript types
│
├── media/                      # Uploaded media files (gitignored)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Payload CMS Collections

### BlogPosts Collection

```typescript
- title: string
- slug: string (auto-generated, unique)
- excerpt: textarea
- content: richText (Lexical)
- featuredImage: Media relationship
- categories: Categories relationship (many)
- tags: array of strings
- status: 'draft' | 'published'
- publishedAt: date
- seo: group
  - metaTitle: string
  - metaDescription: textarea
```

**Access Control**: Published posts are public, drafts require authentication

### Projects Collection

```typescript
- title: string
- slug: string (auto-generated, unique)
- shortDescription: textarea
- caseStudy: richText (Lexical)
- techStack: array of strings
- thumbnail: Media relationship
- gallery: array of Media relationships
- liveUrl: string
- githubUrl: string
- featured: boolean
- publishedAt: date
```

**Access Control**: All projects are public

### Media Collection

```typescript
- Upload field with image sizes:
  - thumbnail: 400x300
  - card: 768x576
  - featured: 1200x675
- alt: string (required)
- caption: string
```

### Categories Collection

```typescript
- name: string
- slug: string (auto-generated, unique)
- description: textarea
```

## Getting Started

### Prerequisites

- Node.js 18+ (v22.11.0 recommended)
- MongoDB instance (local or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-blog-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
DATABASE_URI=mongodb://localhost:27017/portfolio-blog
PAYLOAD_SECRET=your-random-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Generate a secure secret:**
```bash
openssl rand -base64 32
```

4. Generate Payload types:
```bash
npm run generate:types
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Access Payload Admin

The Payload admin panel will be available at:
```
http://localhost:3000/admin
```

**Note:** You'll need to create an admin user on first run. Payload will prompt you during the first build.

## Development Workflow

### Adding Content

1. Start the dev server: `npm run dev`
2. Navigate to `/admin`
3. Create categories, upload media, and publish blog posts/projects
4. View your content at `/blog` and `/projects`

### Data Fetching Pattern

All data is fetched using **Payload Local API** on the server:

```typescript
import { getPayloadClient } from '@/lib/payload'

export default async function BlogPage() {
  const payload = await getPayloadClient()

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: { equals: 'published' }
    },
    sort: '-publishedAt',
    depth: 2, // Include relationships
  })

  return <div>...</div>
}
```

### Rich Text Rendering

The Lexical editor content needs to be serialized. Update blog/project detail pages:

```typescript
import { serializeLexical } from '@payloadcms/richtext-lexical/react'

// In your component:
<div className="prose">
  {serializeLexical({ nodes: post.content })}
</div>
```

Refer to [@payloadcms/richtext-lexical documentation](https://payloadcms.com/docs/rich-text/lexical) for React serialization.

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push to GitHub
2. Import project to Vercel
3. Set environment variables:
   - `DATABASE_URI`
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SERVER_URL`
4. Deploy

### MongoDB Setup

For production, use **MongoDB Atlas**:
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `DATABASE_URI` in your deployment environment

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run payload      # Payload CLI commands
npm run generate:types  # Generate TypeScript types from Payload schema
```

## Customization

### Adding New Collections

1. Create collection file in `src/payload/collections/YourCollection.ts`
2. Import and add to `payload.config.ts`
3. Run `npm run generate:types`
4. Create corresponding pages in `src/app/`

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Color scheme uses CSS variables (see `globals.css`)

### Adding shadcn/ui Components

```bash
# Example: Add button component
npx shadcn@latest add button
```

## Performance Optimizations

- ✅ Server Components by default
- ✅ ISR with 60-second revalidation
- ✅ Static generation at build time
- ✅ Optimized images with next/image
- ✅ Responsive image sizes configured
- ✅ Direct database access (no GraphQL overhead)

## SEO Features

- ✅ Dynamic metadata API
- ✅ OpenGraph tags (extend in `generateMetadata`)
- ✅ Semantic HTML structure
- ✅ Breadcrumb navigation
- ✅ Alt text for all images
- ✅ Proper heading hierarchy

## Known Limitations / TODOs

1. **Lexical Serialization** - Rich text content rendering needs `serializeLexical()` implementation
2. **Search** - No search functionality (can add with Payload's search plugin)
3. **Pagination** - List pages currently show all items (add pagination for large datasets)
4. **Comments** - No comment system
5. **Dark Mode Toggle** - UI supports dark mode but no toggle component

## Documentation

Additional documentation is available in the `/docs` folder:

- [docs/QUICKSTART.md](docs/QUICKSTART.md) - Quick setup guide
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Detailed architecture overview
- [docs/SEO-GUIDE.md](docs/SEO-GUIDE.md) - SEO configuration and testing
- [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) - Complete folder structure
- [docs/IMPLEMENTATION_NOTES.md](docs/IMPLEMENTATION_NOTES.md) - Implementation details
- [docs/SETUP_CHECKLIST.md](docs/SETUP_CHECKLIST.md) - Setup checklist
- [docs/PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) - Project summary
- [docs/STATUS.md](docs/STATUS.md) - Current project status

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## License

ISC
