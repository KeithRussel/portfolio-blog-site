# Implementation Notes

This document explains key implementation decisions and code patterns used in this project.

## Table of Contents

1. [Payload Local API Pattern](#payload-local-api-pattern)
2. [ISR Implementation](#isr-implementation)
3. [Type Safety with Payload](#type-safety-with-payload)
4. [Rich Text Rendering (TODO)](#rich-text-rendering-todo)
5. [Image Optimization](#image-optimization)
6. [Code Patterns](#code-patterns)

---

## Payload Local API Pattern

### Why Local API?

Instead of using GraphQL or REST endpoints, this project uses Payload's **Local API** for direct database access on the server.

**Benefits**:
- ⚡ No HTTP overhead
- 🔒 Stays on the server (secure)
- 📦 Automatic TypeScript types
- 🎯 Direct Mongoose queries

### Implementation

**Helper Function** (`src/lib/payload.ts`):
```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'

export const getPayloadClient = async () => {
  return await getPayload({ config })
}
```

**Usage in Server Components**:
```typescript
export default async function BlogPage() {
  const payload = await getPayloadClient()

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: { equals: 'published' }
    },
    sort: '-publishedAt',
    depth: 2, // Populates relationships
  })

  return <div>{/* Render posts */}</div>
}
```

### Query Patterns

**Find All**:
```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  limit: 20,
})
```

**Find by Slug**:
```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  where: {
    slug: { equals: 'my-post' }
  },
  limit: 1,
})
const post = docs[0]
```

**With Filters**:
```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  where: {
    status: { equals: 'published' },
    categories: { in: ['web-development'] }
  },
})
```

**With Sorting**:
```typescript
// Sort by newest first
sort: '-publishedAt'

// Sort by featured first, then newest
sort: '-featured,-publishedAt'
```

---

## ISR Implementation

### Static Generation + Revalidation

Pages use **ISR (Incremental Static Regeneration)** for the best of both worlds:
- Static HTML at build time
- Auto-regeneration every 60 seconds

### Implementation Pattern

Every page exports:

```typescript
// Revalidate every 60 seconds
export const revalidate = 60

// Pre-render these paths at build time
export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'blog-posts',
    limit: 100,
  })

  return docs.map(post => ({
    slug: post.slug,
  }))
}

// The page component
export default async function Page({ params }) {
  // Fetch fresh data
  const payload = await getPayloadClient()
  // ...
}
```

### How It Works

1. **Build Time**: `generateStaticParams()` runs, creates static HTML for all posts
2. **First 60 seconds**: Cached HTML served instantly
3. **After 60 seconds**: Next request triggers background regeneration
4. **Subsequent requests**: Fresh HTML served

### Adjusting Revalidation

**Faster Updates** (higher server load):
```typescript
export const revalidate = 30 // 30 seconds
```

**Slower Updates** (lower server load):
```typescript
export const revalidate = 300 // 5 minutes
```

**On-Demand Only**:
```typescript
export const revalidate = false // Never auto-revalidate
```

---

## Type Safety with Payload

### Auto-Generated Types

Payload generates TypeScript types from your schema:

```bash
npm run generate:types
```

Creates `src/payload-types.ts`:

```typescript
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: any
  featuredImage: string | Media
  categories: (string | Category)[]
  // ...
}

export interface Media {
  id: string
  url: string
  filename: string
  alt: string
  caption?: string
  // ...
}
```

### Using Types

**Type Assertions for Relationships**:

```typescript
import type { Media } from '@/payload-types'

// Featured image can be string (ID) or full object
const featuredImage = post.featuredImage as Media | null

if (featuredImage?.url) {
  // TypeScript knows featuredImage is Media, not string
  <Image src={featuredImage.url} alt={featuredImage.alt} />
}
```

**Array Relationships**:

```typescript
const categories = Array.isArray(post.categories) ? post.categories : []

categories.map(cat => {
  const category = typeof cat === 'object' ? cat : null
  return category ? category.name : null
})
```

### When to Regenerate

Run `npm run generate:types` after:
- ✅ Adding a new collection
- ✅ Adding/removing fields
- ✅ Changing field types
- ✅ Modifying collection config

---

## Rich Text Rendering (TODO)

### Current Status

Blog posts and project case studies use **Lexical editor**, but content is not yet rendered.

### Implementation Needed

Install the serializer:

```bash
npm install @payloadcms/richtext-lexical
```

Update blog detail page:

```typescript
import { serializeLexical } from '@payloadcms/richtext-lexical/react'

export default async function BlogPost({ params }) {
  // ...

  return (
    <article>
      <div className="prose prose-lg max-w-none">
        {serializeLexical({ nodes: post.content })}
      </div>
    </article>
  )
}
```

### Lexical Content Structure

Lexical stores content as JSON:

```json
{
  "root": {
    "type": "root",
    "children": [
      {
        "type": "paragraph",
        "children": [
          { "type": "text", "text": "Hello world" }
        ]
      }
    ]
  }
}
```

Use `serializeLexical()` to convert to React components.

---

## Image Optimization

### Next.js Image Component

All images use `next/image` for automatic optimization:

```typescript
<Image
  src={image.url}
  alt={image.alt}
  fill // Fills parent container
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Responsive Sizes

The `sizes` attribute tells Next.js what size to serve:

```typescript
// Mobile: full width
// Tablet: half width
// Desktop: third width
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
```

### Payload Image Sizes

Media collection generates 3 sizes:

```typescript
imageSizes: [
  {
    name: 'thumbnail',
    width: 400,
    height: 300,
  },
  {
    name: 'card',
    width: 768,
    height: 576,
  },
  {
    name: 'featured',
    width: 1200,
    height: 675,
  },
]
```

Access specific sizes:

```typescript
const media = post.featuredImage as Media

// Original
media.url

// Specific size
media.sizes?.card?.url
media.sizes?.thumbnail?.url
```

---

## Code Patterns

### Null Safety for Relationships

```typescript
// Single relationship
const thumbnail = project.thumbnail as Media | null

if (thumbnail?.url) {
  <Image src={thumbnail.url} alt={thumbnail.alt} />
}
```

### Array Safety

```typescript
// Array field
const techStack = Array.isArray(project.techStack)
  ? project.techStack
  : []

techStack.map(item => {
  const tech = typeof item === 'object' && 'technology' in item
    ? item.technology
    : null
  return tech ? <Badge>{tech}</Badge> : null
})
```

### Not Found Handling

```typescript
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
  const { docs } = await payload.find({
    where: { slug: { equals: params.slug } }
  })

  const post = docs[0]

  if (!post) {
    notFound() // Renders 404
  }

  return <div>{/* Render post */}</div>
}
```

### Metadata Generation

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
  })

  const post = docs[0]

  if (!post) {
    return { title: 'Not Found' }
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  }
}
```

### Date Formatting

```typescript
{post.publishedAt && (
  <time dateTime={post.publishedAt}>
    {new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
  </time>
)}
```

### Conditional Rendering

```typescript
// Empty state
{posts.length === 0 ? (
  <div>No posts found</div>
) : (
  <div>
    {posts.map(post => <Card key={post.id} />)}
  </div>
)}
```

### Link Wrapping Cards

```typescript
import Link from 'next/link'

{posts.map(post => (
  <Link key={post.id} href={`/blog/${post.slug}`}>
    <Card className="hover:shadow-lg transition-shadow">
      {/* Card content */}
    </Card>
  </Link>
))}
```

---

## Performance Tips

### Optimize Queries

**List Pages** - Minimal depth:
```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  depth: 1, // Only populate immediate relationships
  limit: 20,
})
```

**Detail Pages** - Full depth:
```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  depth: 2, // Populate nested relationships
  limit: 1,
})
```

### Limit Results

```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  limit: 20, // Don't fetch thousands of posts
})
```

### Select Fields

```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  // Only fetch needed fields
  // (Not shown in examples, but Payload supports field selection)
})
```

---

## Security Notes

### Access Control

Collections use access control functions:

```typescript
access: {
  read: ({ req: { user } }) => {
    // Authenticated users see all
    if (user) return true

    // Public only sees published
    return {
      status: { equals: 'published' }
    }
  }
}
```

### Environment Variables

Never commit sensitive data:

```env
# ✅ GOOD - Example file
DATABASE_URI=mongodb://localhost:27017/portfolio-blog
PAYLOAD_SECRET=your-secret-here

# ❌ BAD - Never commit actual credentials
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/db
PAYLOAD_SECRET=actual-secret-value
```

### Validation

Payload handles:
- ✅ XSS protection (React escaping)
- ✅ Input validation (field types)
- ✅ File upload restrictions (mimeTypes)

---

## Common Gotchas

### 1. Forgot to Generate Types

**Error**: `Cannot find module '@/payload-types'`

**Solution**: `npm run generate:types`

### 2. Relationship Not Populated

**Problem**: `post.featuredImage` is just an ID string

**Solution**: Increase `depth` in query:
```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  depth: 2, // Populates relationships
})
```

### 3. ISR Not Updating

**Problem**: Content changes don't appear

**Solution**:
- Wait for revalidation period (60s)
- Or clear cache: `rm -rf .next`
- Or use on-demand revalidation

### 4. Image 404 Errors

**Problem**: Images not loading

**Solution**:
- Check `media/` directory exists
- Check file permissions
- Check `next.config.ts` has `remotePatterns`

---

## Extension Examples

### Add Pagination

```typescript
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams
  const limit = 10

  const { docs, totalPages } = await payload.find({
    collection: 'blog-posts',
    limit,
    page: parseInt(page),
  })

  return (
    <div>
      {docs.map(post => <Card />)}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}
```

### Add Search

```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  where: {
    or: [
      { title: { contains: searchQuery } },
      { excerpt: { contains: searchQuery } },
    ]
  }
})
```

### Filter by Category

```typescript
const { docs } = await payload.find({
  collection: 'blog-posts',
  where: {
    categories: {
      in: [categoryId]
    }
  }
})
```

---

## Next Steps

1. Implement Lexical content rendering
2. Add pagination to list pages
3. Add search functionality
4. Optimize images with blur placeholders
5. Add related posts feature
6. Implement RSS feed
7. Add sitemap generation

See [README.md](./README.md) for more details.
