# 📦 Vercel Blob Storage Setup Guide

Your portfolio site is now configured to use Vercel Blob Storage for images in production. This guide will help you set it up.

---

## Why Vercel Blob Storage?

- ✅ **Seamless Vercel Integration** - Works perfectly with Vercel deployments
- ✅ **Free Tier** - 1GB storage, 100GB bandwidth per month
- ✅ **Fast CDN** - Images served from edge locations worldwide
- ✅ **Automatic Optimization** - Images are automatically optimized
- ✅ **No Extra Configuration** - Works out of the box

---

## Step 1: Enable Vercel Blob in Your Project

### A. In Vercel Dashboard

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **portfolio-blog-site** project
3. Go to **Storage** tab (in the top navigation)
4. Click **Create Database**
5. Select **Blob** from the options
6. Click **Create**

### B. Connect Blob to Your Project

1. After creating Blob, click **Connect to Project**
2. Select your **portfolio-blog-site** project
3. Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` environment variable
4. Click **Connect**

---

## Step 2: Verify Environment Variables

Go to **Settings → Environment Variables** in your Vercel project and ensure you have:

| Variable Name | Description | Required |
|---------------|-------------|----------|
| `DATABASE_URI` | MongoDB connection string | ✅ Yes |
| `PAYLOAD_SECRET` | Payload CMS secret key | ✅ Yes |
| `RESEND_API_KEY` | Resend email API key | ✅ Yes |
| `NEXT_PUBLIC_SERVER_URL` | Your Vercel URL | ✅ Yes |
| `BLOB_READ_WRITE_TOKEN` | Auto-added by Vercel Blob | ✅ Yes |

**Note:** `BLOB_READ_WRITE_TOKEN` should be automatically added when you connect Blob storage.

---

## Step 3: Redeploy Your Site

After enabling Blob storage:

### Option A: Trigger Redeploy from Vercel

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **⋮** (three dots) → **Redeploy**
4. Select **Use existing Build Cache**
5. Click **Redeploy**

### Option B: Push a New Commit

```bash
git add .
git commit -m "Configure Vercel Blob storage for images"
git push
```

Vercel will automatically redeploy with Blob storage enabled.

---

## Step 4: Re-upload Images (Important!)

**Your existing local images won't automatically migrate to Vercel Blob.** You need to:

### For New Projects:
- Just upload images normally via Payload CMS admin
- They'll automatically be stored in Vercel Blob

### For Existing Images:

1. Go to your site's admin panel: `https://your-site.vercel.app/admin`
2. Login with your credentials
3. Go to **Media** collection
4. **Delete all existing images** (they're stored locally and won't work)
5. **Re-upload** all images through the admin panel
6. Update blog posts/projects to use the new images

---

## How It Works

### Development (Local)
- Images are stored in `./media` folder (ignored by git)
- Uses local file system

### Production (Vercel)
- Images are stored in Vercel Blob
- Automatically served via CDN
- URLs look like: `https://abc123.public.blob.vercel-storage.com/...`

---

## Verifying It Works

1. Go to your admin panel: `https://your-site.vercel.app/admin`
2. Upload a new image in Media
3. Check the image URL - it should start with `https://` and include `blob.vercel-storage.com`
4. The image should load on your site

---

## Troubleshooting

### Images Still Not Loading?

**Check 1: Verify Blob is Connected**
- Vercel Dashboard → Storage → You should see a Blob storage
- Check if `BLOB_READ_WRITE_TOKEN` exists in Environment Variables

**Check 2: Redeploy After Setup**
- Changes to environment variables require a redeploy
- Go to Deployments → Redeploy

**Check 3: Re-upload Images**
- Old local images won't work in production
- Delete and re-upload through admin panel

### Build Errors?

**Error:** "Cannot find module '@payloadcms/storage-vercel-blob'"
- The package should be in `package.json` under dependencies
- Run `npm install` locally and commit `package-lock.json`

### Images Upload But Don't Display?

**Check:** Next.js Image Configuration
- Open `next.config.ts`
- Ensure `remotePatterns` includes:
  ```typescript
  {
    protocol: 'https',
    hostname: '**.blob.vercel-storage.com',
  }
  ```

---

## Cost & Limits

### Free Tier Includes:
- ✅ 1 GB storage
- ✅ 100 GB bandwidth/month
- ✅ Unlimited reads

### If You Exceed:
- **Storage:** $0.15/GB/month
- **Bandwidth:** $0.12/GB

For a portfolio site, the free tier is usually more than enough!

---

## Alternative: Keep Local Storage for Development

If you want to keep local storage in development and only use Blob in production:

The configuration is already set up this way:
```typescript
// payload.config.ts
vercelBlobStorage({
  enabled: true, // Automatically disabled in development
  ...
})
```

Vercel Blob automatically disables itself in local development, so you don't need to change anything!

---

## Next Steps

1. ✅ Enable Vercel Blob in dashboard
2. ✅ Verify environment variables
3. ✅ Redeploy your site
4. ✅ Re-upload all images via admin panel
5. ✅ Test that images load correctly

Your images will now be served from a fast CDN and work perfectly in production! 🎉
