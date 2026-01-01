# 🚀 Deployment Guide - Portfolio Blog Site

This guide will walk you through deploying your Next.js 15 + Payload CMS portfolio to Vercel.

---

## 📋 Prerequisites

- [x] MongoDB Atlas database (already configured)
- [x] Resend email service (already configured)
- [ ] GitHub account
- [ ] Vercel account (free tier)

---

## Step 1: Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Portfolio + Blog with Next.js 15 and Payload CMS"
```

---

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click **"New repository"** (green button)
3. Repository name: `portfolio-blog-site`
4. Description: "Portfolio + Blog built with Next.js 15, Payload CMS, and MongoDB"
5. **Keep it Private** (recommended for now)
6. **DO NOT** initialize with README (we already have files)
7. Click **"Create repository"**

---

## Step 3: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio-blog-site.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 4: Deploy to Vercel

### A. Sign up/Login to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### B. Import Your Repository

1. On Vercel dashboard, click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Find and select `portfolio-blog-site`
4. Click **"Import"**

### C. Configure Project Settings

#### Framework Preset:
- **Framework**: Next.js (auto-detected)
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)

#### Environment Variables:

Click **"Environment Variables"** and add these:

| Name | Value | Source |
|------|-------|--------|
| `DATABASE_URI` | `mongodb+srv://keith123:keith123@portfolioblogcluster.kccbk8j.mongodb.net/` | Your .env file |
| `PAYLOAD_SECRET` | `kTZ%!8Ts@Z` | Your .env file |
| `RESEND_API_KEY` | `re_ZwFpn3fx_BfqwCUSi15icpgBcfR5YYcnM` | Your .env file |
| `NEXT_PUBLIC_SERVER_URL` | `https://your-project-name.vercel.app` | Will be provided by Vercel |

**Important:** After deployment, you'll get a Vercel URL (like `portfolio-blog-site-abc123.vercel.app`). You need to:
1. Note this URL
2. Go back to Vercel project settings → Environment Variables
3. Update `NEXT_PUBLIC_SERVER_URL` to your actual Vercel URL
4. Redeploy

### D. Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Click **"Visit"** to see your live site

---

## Step 5: Post-Deployment Configuration

### A. Update Payload CMS URL

After first deployment:

1. Copy your Vercel URL (e.g., `https://portfolio-blog-site-abc123.vercel.app`)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Update `NEXT_PUBLIC_SERVER_URL` with your actual URL
4. Click **"Redeploy"** (in Deployments tab)

### B. Access Payload Admin

- Admin panel: `https://your-vercel-url.vercel.app/admin`
- Login with your Payload credentials

### C. Configure Resend for Production (Optional)

For production emails to work with any recipient:

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add and verify your custom domain
3. Update the `from` email in `src/app/api/contact/route.ts`:
   ```typescript
   from: 'Portfolio Contact <noreply@yourdomain.com>'
   ```
4. Commit and push the change

---

## Step 6: Custom Domain (Optional)

### Add Your Own Domain

1. In Vercel: Go to Settings → Domains
2. Add your domain (e.g., `russelmaniacop.com`)
3. Follow Vercel's instructions to update DNS records
4. Update `NEXT_PUBLIC_SERVER_URL` to your custom domain
5. Redeploy

---

## 🔧 Troubleshooting

### Build Fails

**Error**: TypeScript errors
```bash
# Test build locally first
npm run build
```

**Error**: Missing environment variables
- Check all environment variables are added in Vercel
- Make sure there are no typos

### MongoDB Connection Issues

**Error**: "Cannot connect to database"
- Check MongoDB Atlas allows connections from `0.0.0.0/0` (all IPs)
- In MongoDB Atlas: Network Access → Add IP Address → "Allow Access from Anywhere"

### Images Not Loading

**Error**: 403 Forbidden on images
- Check `next.config.js` has correct `remotePatterns` for your MongoDB media storage
- Ensure images are uploaded correctly via Payload admin

### Contact Form Not Working

**Error**: Resend validation error
- With free Resend, emails only go to verified email (`keithrussel.018@gmail.com`)
- For production, verify a custom domain in Resend

---

## 🎯 Production Checklist

Before going live:

- [ ] All pages load correctly
- [ ] Admin panel accessible at `/admin`
- [ ] Contact form sends emails
- [ ] Blog posts display correctly
- [ ] Projects page works
- [ ] All images load
- [ ] Mobile responsive
- [ ] Meta tags and SEO configured
- [ ] Custom domain configured (optional)

---

## 📊 Monitoring & Updates

### View Deployment Logs
- Vercel Dashboard → Your Project → Deployments → Click on deployment → View Build Logs

### Update Your Site

```bash
# Make changes locally
# Test locally: npm run dev

# Commit changes
git add .
git commit -m "Your update message"

# Push to GitHub (auto-deploys on Vercel)
git push
```

Vercel automatically redeploys when you push to GitHub!

---

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Payload CMS Deployment](https://payloadcms.com/docs/production/deployment)

---

**Your site is ready to go live! 🎉**
