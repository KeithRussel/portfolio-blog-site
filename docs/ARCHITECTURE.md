# Architecture Documentation

## Overview

This application implements a hybrid Portfolio + Blog system using Next.js App Router with Payload CMS v3 as the headless CMS.

## Core Architectural Decisions

### 1. Server Components First

**Decision**: All pages use React Server Components by default

**Rationale**:
- Zero JavaScript shipped to client for static content
- Direct database access on the server (no API routes needed)
- Automatic code splitting
- Better SEO and performance

**Implementation**:
```typescript
// All pages are Server Components by default
export default async function BlogPage() {
  const payload = await getPayloadClient()
  // Direct database access on server
  const { docs } = await payload.find({ ... })
  return <div>...</div>
}
```

### 2. Payload Local API (No GraphQL)

**Decision**: Use Payload's Local API instead of REST or GraphQL

**Rationale**:
- **Performance**: Direct database queries, no HTTP overhead
- **Type Safety**: Full TypeScript support with generated types
- **Simplicity**: No API layer to maintain
- **Security**: Database queries stay on the server

**Implementation**:
```typescript
// lib/payload.ts - Single source of truth
import { getPayload } from 'payload'
import config from '@/payload.config'

export const getPayloadClient = async () => {
  return await getPayload({ config })
}
```

**Usage Pattern**:
```typescript
const payload = await getPayloadClient()

// Type-safe queries with full Payload API
const { docs: posts } = await payload.find({
  collection: 'blog-posts',
  where: { status: { equals: 'published' } },
  depth: 2, // Populates relationships
})
```

### 3. ISR (Incremental Static Regeneration)

**Decision**: Use ISR with 60-second revalidation

**Rationale**:
- **Static Performance**: Pages served from cache
- **Fresh Content**: Regenerates every 60 seconds on demand
- **Cost Effective**: Balances build time with freshness

**Implementation**:
```typescript
// Every page exports:
export const revalidate = 60

// Plus generateStaticParams for build-time generation
export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    limit: 100,
  })
  return docs.map(post => ({ slug: post.slug }))
}
```

**Flow**:
1. Build time: All posts/projects rendered statically
2. First request after 60s: Returns cached page
3. Background: Regenerates page with fresh data
4. Subsequent requests: Serve newly regenerated page

### 4. Lists with Details Pattern

**Decision**: Separate list and detail pages

**Routes**:
```
/blog → BlogListPage (shows all posts)
/blog/[slug] → BlogDetailPage (single post)

/projects → ProjectsListPage (shows all projects)
/projects/[slug] → ProjectDetailPage (single project)
```

**List Page Pattern**:
- Fetch all published items
- Show cards with preview data
- Optimized queries (minimal depth)

**Detail Page Pattern**:
- Fetch single item by slug
- Full content with relationships
- Dynamic metadata for SEO

### 5. Type Safety with Generated Types

**Decision**: Use Payload's auto-generated TypeScript types

**Generation**:
```bash
npm run generate:types
```

Creates `src/payload-types.ts` with:
```typescript
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: any // Lexical JSON
  featuredImage: string | Media
  categories: (string | Category)[]
  // ... all fields with proper types
}
```

**Usage**:
```typescript
import type { Media } from '@/payload-types'

const featuredImage = post.featuredImage as Media | null
if (featuredImage?.url) {
  // TypeScript knows featuredImage.url exists
}
```

## Data Flow

### Blog List Page

```
User Request → /blog
    ↓
Next.js checks cache (60s)
    ↓
BlogListPage Server Component
    ↓
getPayloadClient() → MongoDB
    ↓
payload.find({ collection: 'blog-posts', where: {...} })
    ↓
Render JSX with data
    ↓
HTML sent to browser
    ↓
ISR: Cache for 60s
```

### Blog Detail Page

```
User Request → /blog/my-post-slug
    ↓
Next.js checks static cache
    ↓
BlogDetailPage Server Component
    ↓
getPayloadClient() → MongoDB
    ↓
payload.find({ where: { slug: 'my-post-slug' } })
    ↓
generateMetadata() for SEO
    ↓
Render JSX with full content
    ↓
HTML sent to browser
    ↓
ISR: Regenerate after 60s on next request
```

## Payload CMS Schema Design

### Access Control Strategy

**Public Collections** (no auth required):
- `media` - All images public
- `categories` - Public taxonomy
- `projects` - All projects public

**Conditional Access** (published = public, drafts = authenticated):
- `blog-posts` - Uses access control function

```typescript
access: {
  read: ({ req: { user } }) => {
    if (user) return true // Authenticated: see all
    return {
      status: { equals: 'published' } // Public: only published
    }
  }
}
```

### Field Patterns

**Auto-generated Slugs**:
```typescript
{
  name: 'slug',
  type: 'text',
  unique: true,
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (!value && data?.title) {
          return data.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
        }
        return value
      }
    ]
  }
}
```

**Auto-set Published Date**:
```typescript
{
  name: 'publishedAt',
  type: 'date',
  hooks: {
    beforeChange: [
      ({ siblingData, value }) => {
        if (siblingData.status === 'published' && !value) {
          return new Date()
        }
        return value
      }
    ]
  }
}
```

**SEO Metadata Group**:
```typescript
{
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' }
  ]
}
```

### Media Strategy

**Upload Configuration**:
- Local storage in `media/` directory
- Three image sizes: thumbnail, card, featured
- Sharp for image processing
- Alt text required for accessibility

**Relationship Pattern**:
```typescript
// Single image
{
  name: 'thumbnail',
  type: 'upload',
  relationTo: 'media',
}

// Array of images
{
  name: 'gallery',
  type: 'array',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    }
  ]
}
```

## SEO Implementation

### Dynamic Metadata

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
  })

  const post = docs[0]

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    // Add OpenGraph, Twitter cards, etc.
  }
}
```

### Structured Navigation

- Breadcrumbs on all detail pages
- Semantic HTML (`<article>`, `<header>`, `<nav>`)
- Proper heading hierarchy (h1 → h2 → h3)

## Performance Optimizations

### Image Optimization

```typescript
<Image
  src={image.url}
  alt={image.alt}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

**Benefits**:
- Automatic WebP/AVIF conversion
- Responsive srcset generation
- Lazy loading by default
- Blur placeholder support

### Query Optimization

**List Pages** (minimal depth):
```typescript
await payload.find({
  collection: 'blog-posts',
  depth: 2, // Only populate immediate relationships
  limit: 20,
})
```

**Detail Pages** (full depth):
```typescript
await payload.find({
  collection: 'blog-posts',
  depth: 2, // Populate nested relationships
  limit: 1,
})
```

## Scalability Considerations

### Current Setup (Good for ~1000 posts)

- ISR with 60s revalidation
- Full static generation at build
- No pagination

### Scaling Recommendations

**For 1000+ posts**:
1. Add pagination to list pages
2. Increase revalidation time (300s)
3. Use `fallback: 'blocking'` in `generateStaticParams`

**For 10,000+ posts**:
1. On-demand ISR only (remove `generateStaticParams`)
2. Add search with Algolia/Elasticsearch
3. Consider CDN caching

**For high traffic**:
1. Deploy to edge (Vercel Edge, Cloudflare)
2. Add Redis caching layer
3. Implement stale-while-revalidate

## Extension Points

### Adding Search

```typescript
// Install Payload plugin
import { search } from '@payloadcms/plugin-search'

export default buildConfig({
  plugins: [
    search({
      collections: ['blog-posts', 'projects'],
    })
  ]
})
```

### Adding Comments

Create a new collection:
```typescript
// src/payload/collections/Comments.ts
export const Comments: CollectionConfig = {
  slug: 'comments',
  fields: [
    { name: 'content', type: 'textarea' },
    { name: 'author', type: 'text' },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'blog-posts',
    }
  ]
}
```

### Adding Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Security

### Payload Admin

- Protected by authentication
- Role-based access control available
- Separate admin users collection

### Environment Variables

Sensitive data in `.env`:
```env
DATABASE_URI=mongodb+srv://... # Never commit
PAYLOAD_SECRET=random-32-byte-string # Rotate regularly
```

### Content Security

- Input sanitization via Payload validation
- XSS protection via React escaping
- CSRF protection in Payload admin

## Monitoring

### Recommended Setup

1. **Error Tracking**: Sentry
2. **Performance**: Vercel Analytics / Datadog
3. **Uptime**: UptimeRobot
4. **Database**: MongoDB Atlas monitoring

### Key Metrics

- Time to First Byte (TTFB) < 200ms
- Largest Contentful Paint (LCP) < 2.5s
- ISR hit rate > 95%
- Database query time < 50ms

## Future Enhancements

1. **Rich Text Rendering**: Implement `serializeLexical()` for blog content
2. **Image Blur Placeholders**: Add base64 placeholders
3. **Related Posts**: Algorithm for "You might also like"
4. **RSS Feed**: Auto-generate from blog posts
5. **Sitemap**: Dynamic sitemap.xml generation
6. **Newsletter**: Integration with email service
7. **Draft Previews**: Preview drafts before publishing
