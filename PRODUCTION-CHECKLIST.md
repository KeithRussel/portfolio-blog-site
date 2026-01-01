# 🚀 Production Deployment Checklist

Your site is deployed but needs a few more steps to work fully. Follow this checklist:

---

## ✅ **Step 1: Enable Vercel Blob Storage**

### Why?
Your images won't work without cloud storage in production.

### How to Enable:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your **portfolio-blog-site** project
3. Click **Storage** tab
4. Click **Create Database**
5. Select **Blob**
6. Click **Create**
7. Click **Connect to Project**
8. Select your project
9. Click **Connect**

✅ This automatically adds `BLOB_READ_WRITE_TOKEN` to your environment variables.

---

## ✅ **Step 2: Verify Environment Variables**

Go to **Settings → Environment Variables** and check:

| Variable | Value | Status |
|----------|-------|--------|
| `DATABASE_URI` | `mongodb+srv://keith123:...` | ✅ Should be set |
| `PAYLOAD_SECRET` | `kTZ%!8Ts@Z` | ✅ Should be set |
| `RESEND_API_KEY` | `re_ZwFpn3fx_...` | ✅ Should be set |
| `NEXT_PUBLIC_SERVER_URL` | `https://portfolio-blog-site-ten.vercel.app` | ⚠️ Must include `https://` |
| `BLOB_READ_WRITE_TOKEN` | (auto-generated) | ⚠️ Added after Step 1 |

---

## ✅ **Step 3: Redeploy**

After setting up Blob storage:

1. Go to **Deployments** tab
2. Click latest deployment
3. Click **⋮** → **Redeploy**
4. Click **Redeploy**

**OR** push a new commit:
```bash
git add .
git commit -m "Update: Enable conditional Vercel Blob storage"
git push
```

---

## ✅ **Step 4: Test Admin Panel**

After redeployment:

1. Go to: `https://portfolio-blog-site-ten.vercel.app/admin`
2. You should see the login page
3. Login with your credentials
4. You should see the admin dashboard

**If still blank:**
- Check browser console (F12) for errors
- Check Vercel deployment logs
- Verify MongoDB allows `0.0.0.0/0` in Network Access

---

## ✅ **Step 5: Re-upload Images**

Once admin works:

1. Go to **Media** collection in admin
2. Delete all old images (they were local files)
3. Re-upload images through admin panel
4. Update blog posts/projects to use new images

**Image URLs will look like:**
- `https://abc123.public.blob.vercel-storage.com/...`

---

## 🔍 **Troubleshooting**

### Admin Still Blank?

**Check Browser Console:**
1. Press `F12`
2. Go to **Console** tab
3. Look for errors

**Check Vercel Logs:**
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Click **Functions** tab
4. Look for `/admin` errors

### Common Issues:

**1. MongoDB Connection Error**
- ✅ Verify MongoDB Atlas allows `0.0.0.0/0`
- Go to: Network Access → Add IP Address → Allow from Anywhere

**2. Blank Admin Page**
- ⚠️ Missing `BLOB_READ_WRITE_TOKEN` - Complete Step 1
- ⚠️ Wrong `NEXT_PUBLIC_SERVER_URL` - Must include `https://`

**3. Images Not Loading**
- ⚠️ Local images don't work in production
- ⚠️ Must re-upload through admin panel after Blob setup

---

## 📊 **Current Status**

- ✅ Site deployed to Vercel
- ✅ Homepage working
- ✅ Blog/Projects pages working
- ✅ Contact form working (sends emails)
- ⚠️ Admin panel - Needs Blob storage setup
- ⚠️ Images - Needs Blob storage + re-upload

---

## 🎯 **Next Steps**

1. **Enable Vercel Blob** (Step 1 above)
2. **Redeploy** (Step 3 above)
3. **Test admin** (Step 4 above)
4. **Re-upload images** (Step 5 above)

After completing these steps, your site will be 100% functional! 🎉
