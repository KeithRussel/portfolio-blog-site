# Quick Start Guide

Get your Portfolio + Blog site running in 5 minutes.

## Prerequisites

- ✅ Node.js 18+ installed (v22.11.0 recommended)
- ✅ MongoDB running (local or MongoDB Atlas)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create your `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Your MongoDB connection string
DATABASE_URI=mongodb://localhost:27017/portfolio-blog

# Generate with: openssl rand -base64 32
PAYLOAD_SECRET=your-generated-secret-here

# Your local dev URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### MongoDB Setup Options

**Option A: Local MongoDB**
```bash
# Windows (with Chocolatey)
choco install mongodb

# macOS
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Free Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Use in `DATABASE_URI`

## Step 3: Generate Types

```bash
npm run generate:types
```

This creates `src/payload-types.ts` from your Payload schema.

## Step 4: Start Development Server

```bash
npm run dev
```

Your app will be running at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Payload Admin**: [http://localhost:3000/admin](http://localhost:3000/admin)

## Step 5: Create Admin User

On first run, Payload will prompt you to create an admin user. You can also do this manually:

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Follow the setup wizard
3. Create your admin account

## Step 6: Add Content

### Create a Category

1. Go to `/admin/collections/categories`
2. Click "Create New"
3. Add name: "Web Development"
4. Slug auto-generates: "web-development"
5. Save

### Upload Media

1. Go to `/admin/collections/media`
2. Click "Create New"
3. Upload an image
4. Add alt text (required)
5. Save

### Create a Blog Post

1. Go to `/admin/collections/blog-posts`
2. Click "Create New"
3. Fill in:
   - Title: "My First Post"
   - Slug: auto-generates as "my-first-post"
   - Excerpt: "Brief description"
   - Content: Write your post
   - Featured Image: Select from media
   - Categories: Select category
   - Status: "Published"
4. Save

View at: [http://localhost:3000/blog/my-first-post](http://localhost:3000/blog/my-first-post)

### Create a Project

1. Go to `/admin/collections/projects`
2. Click "Create New"
3. Fill in:
   - Title: "My Portfolio Site"
   - Slug: auto-generates
   - Short Description: "Built with Next.js"
   - Tech Stack: ["Next.js", "TypeScript", "Payload CMS"]
   - Thumbnail: Select image
   - Live URL: https://mysite.com
   - GitHub URL: https://github.com/user/repo
   - Featured: ✓ (check to feature on homepage)
4. Save

View at: [http://localhost:3000/projects/my-portfolio-site](http://localhost:3000/projects/my-portfolio-site)

## Verify Everything Works

1. **Home Page**: [http://localhost:3000](http://localhost:3000) - Should show welcome page
2. **Blog List**: [http://localhost:3000/blog](http://localhost:3000/blog) - Should show your posts
3. **Blog Detail**: [http://localhost:3000/blog/my-first-post](http://localhost:3000/blog/my-first-post)
4. **Projects List**: [http://localhost:3000/projects](http://localhost:3000/projects)
5. **Projects Detail**: [http://localhost:3000/projects/my-portfolio-site](http://localhost:3000/projects/my-portfolio-site)

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Start production server

# Payload
npm run payload          # Payload CLI
npm run generate:types   # Regenerate TypeScript types

# Linting
npm run lint            # Run ESLint
```

## File Locations

- **Pages**: `src/app/*/page.tsx`
- **Components**: `src/components/ui/`
- **Collections**: `src/payload/collections/`
- **Uploaded Media**: `media/` (created on first upload)
- **Config**: `src/payload.config.ts`

## Troubleshooting

### "Cannot connect to database"

**Solution**:
- Check MongoDB is running: `mongod` or verify Atlas connection
- Check `DATABASE_URI` in `.env` is correct

### "PAYLOAD_SECRET is required"

**Solution**:
- Generate secret: `openssl rand -base64 32`
- Add to `.env`: `PAYLOAD_SECRET=your-secret-here`

### "Module not found: @/..."

**Solution**:
- Run `npm install`
- Check `tsconfig.json` has `"@/*": ["./src/*"]` in paths

### "payload-types.ts not found"

**Solution**:
- Run `npm run generate:types`
- This file is auto-generated from your Payload schema

### Types are outdated after changing schema

**Solution**:
- Run `npm run generate:types` after any collection changes
- Restart dev server

### Build errors about image optimization

**Solution**:
- Install sharp: `npm install sharp` (should be installed already)
- Check that sharp is compatible with your OS

## Next Steps

1. **Read**: [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions
2. **Customize**: Edit collections in `src/payload/collections/`
3. **Style**: Modify `src/app/globals.css` and Tailwind config
4. **Deploy**: See README.md for deployment instructions

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

## Need Help?

Check the main [README.md](./README.md) for comprehensive documentation.
