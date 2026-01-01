# SEO & Social Media Configuration Guide

This guide explains how to configure and optimize your portfolio site for search engines and social media sharing.

## Environment Variables

### Required for Production

Add these to your `.env` file (copy from `.env.example`):

```bash
# Set this to your production domain
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

**Important**: This environment variable is critical for:
- Open Graph image URLs
- Twitter Card previews
- JSON-LD structured data
- Canonical URLs

### Development vs Production

- **Development**: `http://localhost:3000`
- **Production**: Your actual domain (e.g., `https://yourname.com`)

## Metadata Configuration

### Site-Wide Settings

Located in `src/app/layout.tsx`:

1. **Update site name and description**:
```typescript
title: {
  default: 'Your Name - Portfolio & Blog',
  template: '%s | Your Name',
}
description: 'Your custom description here'
```

2. **Set Twitter handle**:
```typescript
twitter: {
  creator: '@yourhandle',
}
```

### Blog Post Metadata

Located in `src/app/(frontend)/blog/[slug]/page.tsx`:

1. **Update author name** (appears in 2 places):
```typescript
authors: ['Your Full Name']

// And in JSON-LD:
author: {
  '@type': 'Person',
  name: 'Your Full Name',
}
```

2. **Add your logo** for JSON-LD:
- Add a logo image to `public/logo.png`
- Or update the path in the JSON-LD schema

## Features Implemented

### ✅ Open Graph Tags
- Automatic OG tags for all blog posts and projects
- Uses featured images when available
- Falls back gracefully when images are missing
- Properly formatted for Facebook, LinkedIn, etc.

### ✅ Twitter Cards
- Summary large image cards for better Twitter previews
- Automatic image selection from featured images
- Custom descriptions for each page

### ✅ JSON-LD Structured Data
- BlogPosting schema for all blog posts
- Includes author, publisher, dates, keywords
- Helps Google show rich snippets in search results

### ✅ SEO Best Practices
- Dynamic meta titles and descriptions
- Canonical URLs
- Proper robots.txt directives
- Image alt tags support
- Semantic HTML structure

## Testing Your SEO

### 1. Open Graph Debugger Tools

Test how your links appear when shared:

**Facebook/Meta**:
- URL: https://developers.facebook.com/tools/debug/
- Paste your blog post or project URL
- Click "Scrape Again" to refresh cache

**Twitter**:
- URL: https://cards-validator.twitter.com/
- Paste your URL and preview the card

**LinkedIn**:
- URL: https://www.linkedin.com/post-inspector/
- Check how posts appear on LinkedIn

### 2. Google Rich Results Test

Test structured data:
- URL: https://search.google.com/test/rich-results
- Paste your blog post URL
- Verify BlogPosting schema is detected

### 3. Local Testing

Before deploying, test locally:

```bash
# Build the production version
npm run build

# Start production server
npm run start

# Test a blog post URL
# http://localhost:3000/blog/your-slug
```

## Customization Checklist

Before going to production, update these items:

- [ ] Set `NEXT_PUBLIC_SERVER_URL` in production environment
- [ ] Update site name in `src/app/layout.tsx`
- [ ] Update site description in `src/app/layout.tsx`
- [ ] Add your Twitter handle in `src/app/layout.tsx`
- [ ] Replace "Your Name" with your actual name in blog post metadata
- [ ] Add `public/logo.png` for JSON-LD publisher logo
- [ ] Test OG images with Facebook debugger
- [ ] Test Twitter cards with Twitter validator
- [ ] Verify structured data with Google Rich Results

## Optional Enhancements

### Add a Robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Add a Sitemap

Next.js can generate sitemaps automatically. Create `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // Fetch your blog posts and projects
  // Return sitemap entries

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    // Add more URLs...
  ]
}
```

## Troubleshooting

### Images not showing in social previews

1. Ensure `NEXT_PUBLIC_SERVER_URL` is set correctly
2. Check that images are publicly accessible
3. Verify image URLs are absolute (not relative)
4. Use Facebook debugger to see actual error messages

### Structured data not detected

1. Verify JSON-LD is in the page source (View Page Source)
2. Check for JSON syntax errors
3. Test with Google Rich Results tool
4. Ensure all required fields are present

### Meta tags not updating

1. Clear social media cache using debugger tools
2. Rebuild your Next.js app (`npm run build`)
3. Check that metadata is being generated server-side

## Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org BlogPosting](https://schema.org/BlogPosting)
