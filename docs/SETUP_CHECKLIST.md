# Setup Checklist

Use this checklist to verify your installation is complete and working.

## ☑️ Installation Steps

### 1. Dependencies

- [ ] Node.js 18+ installed
- [ ] MongoDB running (local or Atlas)
- [ ] `npm install` completed successfully
- [ ] No dependency errors in console

### 2. Environment Configuration

- [ ] `.env` file created from `.env.example`
- [ ] `DATABASE_URI` set to your MongoDB connection string
- [ ] `PAYLOAD_SECRET` generated (32+ characters)
- [ ] `NEXT_PUBLIC_SERVER_URL` set to `http://localhost:3000`

**Generate secret:**
```bash
openssl rand -base64 32
```

### 3. Type Generation

- [ ] `npm run generate:types` ran successfully
- [ ] `src/payload-types.ts` file exists
- [ ] No TypeScript errors

### 4. Development Server

- [ ] `npm run dev` started without errors
- [ ] Server running on http://localhost:3000
- [ ] No console errors
- [ ] Hot reload working

---

## ☑️ Payload Admin Setup

### 5. Admin Access

- [ ] Navigate to http://localhost:3000/admin
- [ ] Admin panel loads
- [ ] Create admin user account
- [ ] Successfully logged in

### 6. Collections Visible

- [ ] Blog Posts collection appears
- [ ] Projects collection appears
- [ ] Media collection appears
- [ ] Categories collection appears

---

## ☑️ Content Creation

### 7. Create Test Category

- [ ] Go to `/admin/collections/categories`
- [ ] Create new category "Web Development"
- [ ] Slug auto-generates as "web-development"
- [ ] Save successfully

### 8. Upload Test Image

- [ ] Go to `/admin/collections/media`
- [ ] Upload an image
- [ ] Add alt text
- [ ] Save successfully
- [ ] Image appears in media library

### 9. Create Test Blog Post

- [ ] Go to `/admin/collections/blog-posts`
- [ ] Create new post:
  - Title: "Hello World"
  - Slug: Auto-generates
  - Excerpt: "My first post"
  - Content: Write some text
  - Featured Image: Select uploaded image
  - Categories: Select category
  - Status: "Published"
- [ ] Save successfully
- [ ] Post appears in list

### 10. Create Test Project

- [ ] Go to `/admin/collections/projects`
- [ ] Create new project:
  - Title: "Portfolio Site"
  - Slug: Auto-generates
  - Short Description: "My portfolio"
  - Tech Stack: ["Next.js", "TypeScript"]
  - Thumbnail: Select image
  - Featured: Check box
- [ ] Save successfully
- [ ] Project appears in list

---

## ☑️ Frontend Verification

### 11. Home Page

- [ ] Navigate to http://localhost:3000
- [ ] Page loads without errors
- [ ] Navigation visible
- [ ] Links work

### 12. Blog List Page

- [ ] Navigate to http://localhost:3000/blog
- [ ] Page loads
- [ ] Test post appears
- [ ] Featured image displays
- [ ] Category badge shows
- [ ] Published date displays

### 13. Blog Detail Page

- [ ] Click on test post
- [ ] Detail page loads
- [ ] URL is `/blog/hello-world`
- [ ] Breadcrumb navigation shows
- [ ] "Back to Blog" link works
- [ ] All post content displays
- [ ] Featured image appears

### 14. Projects List Page

- [ ] Navigate to http://localhost:3000/projects
- [ ] Page loads
- [ ] Test project appears
- [ ] Thumbnail displays
- [ ] Tech stack badges show
- [ ] Featured badge visible

### 15. Projects Detail Page

- [ ] Click on test project
- [ ] Detail page loads
- [ ] URL is `/projects/portfolio-site`
- [ ] Breadcrumb navigation shows
- [ ] "Back to Projects" link works
- [ ] Tech stack displays
- [ ] Links work (if provided)

---

## ☑️ Feature Testing

### 16. Images

- [ ] All images load correctly
- [ ] Images are optimized (check Network tab)
- [ ] No 404 errors for images
- [ ] Responsive images work on mobile

### 17. Navigation

- [ ] Header navigation works
- [ ] Footer appears on all pages
- [ ] All links functional
- [ ] No broken links

### 18. Responsive Design

- [ ] Open DevTools
- [ ] Toggle mobile view
- [ ] All pages responsive
- [ ] No horizontal scroll
- [ ] Touch-friendly tap targets

### 19. SEO

- [ ] View page source (right-click → View Source)
- [ ] `<title>` tag present
- [ ] Meta description present
- [ ] No missing alt tags on images

### 20. TypeScript

- [ ] No TypeScript errors in console
- [ ] Intellisense working in IDE
- [ ] Types auto-complete

---

## ☑️ Production Build

### 21. Build Test

- [ ] Run `npm run build`
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Static pages generated

### 22. Production Server

- [ ] Run `npm start`
- [ ] Server starts
- [ ] Navigate to http://localhost:3000
- [ ] All pages work
- [ ] No console errors

---

## ☑️ Additional Checks

### 23. Git Setup

- [ ] Initialize git: `git init`
- [ ] `.env` is gitignored
- [ ] `node_modules` is gitignored
- [ ] Commit your code

### 24. Documentation

- [ ] Read README.md
- [ ] Understand folder structure
- [ ] Review ARCHITECTURE.md
- [ ] Bookmark IMPLEMENTATION_NOTES.md

### 25. Deployment Prep

- [ ] MongoDB Atlas account created (for production)
- [ ] Environment variables noted
- [ ] Deployment platform chosen (Vercel recommended)

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Symptoms**: "Cannot connect to database"

**Fix**:
```bash
# Check MongoDB is running
mongod

# Or verify Atlas connection string
DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Types Not Found

**Symptoms**: `Cannot find module '@/payload-types'`

**Fix**:
```bash
npm run generate:types
```

### Images Not Loading

**Symptoms**: 404 on images

**Fix**:
- Check `media/` directory exists
- Check file uploaded in admin
- Check `next.config.ts` has `remotePatterns`

### Port Already in Use

**Symptoms**: "Port 3000 is already in use"

**Fix**:
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>

# Or use different port:
PORT=3001 npm run dev
```

### Build Errors

**Symptoms**: Build fails

**Fix**:
```bash
# Clear cache
rm -rf .next

# Regenerate types
npm run generate:types

# Rebuild
npm run build
```

---

## ✅ Success Criteria

You're ready to develop when:

- ✅ Dev server runs without errors
- ✅ Admin panel accessible
- ✅ Can create and view content
- ✅ All pages load correctly
- ✅ Images display properly
- ✅ TypeScript types work
- ✅ Production build succeeds

---

## 📚 Next Steps

After setup is complete:

1. **Customize Design**
   - Edit `src/app/globals.css`
   - Modify `tailwind.config.ts`
   - Update navigation in `layout.tsx`

2. **Add Content**
   - Create more blog posts
   - Add your projects
   - Upload project screenshots

3. **Extend Features**
   - Implement Lexical rendering
   - Add pagination
   - Add search
   - Add RSS feed

4. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Set environment variables
   - Test production build

---

## 📞 Resources

- [README.md](./README.md) - Full documentation
- [QUICKSTART.md](./QUICKSTART.md) - 5-minute setup
- [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) - Code patterns
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Design decisions

---

**Happy building! 🚀**
