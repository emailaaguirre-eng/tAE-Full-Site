# Quick Start: Connect WordPress to Netlify
## 5-Minute Setup Guide

---

## 🚀 Step 1: Test Your WordPress API

### Option A: Browser Test (Fastest)

1. **Open browser**
2. **Visit:** `https://your-wordpress-site.com/wp-json`
3. **See JSON?** ✅ You're good to go!
4. **See error?** ❌ Check troubleshooting below

### Option B: Use Test Page

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open:** `http://localhost:3000/test-wordpress.html`

3. **Enter your WordPress URL** and click "Run Tests"

---

## 🔧 Step 2: Fix Issues (If Needed)

**If `/wp-json` doesn't work:**

1. **In WordPress Admin:**
   - Go to **Settings → Permalinks**
   - Select **"Post name"**
   - Click **"Save Changes"**

2. **Check WordPress version:**
   - Needs WordPress 4.7 or higher

3. **Temporarily disable security plugins:**
   - Some block REST API
   - Test again after disabling

---

## 📝 Step 3: Add to Netlify

1. **Go to Netlify Dashboard:**
   - [app.netlify.com](https://app.netlify.com)
   - Select your site

2. **Add Environment Variables:**
   - **Site Settings** → **Environment Variables**
   - Click **"Add variable"**

   Add these two:
   ```
   NEXT_PUBLIC_WORDPRESS_URL = https://your-wordpress-site.com
   NEXT_PUBLIC_WOOCOMMERCE_URL = https://your-wordpress-site.com
   ```

3. **Save**

---

## 🔄 Step 4: Redeploy

1. **In Netlify:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

2. **Wait 2-3 minutes**

---

## ✅ Step 5: Verify

1. **Visit your Netlify site**
2. **Check Hero section** - Should pull from WordPress (or show fallback)
3. **Check Products** - Should show WooCommerce products (or fallback)

**Done!** 🎉

---

## 🎯 What You Can Access

With just your WordPress URL, you can pull:

- ✅ Blog posts
- ✅ Pages
- ✅ Images/media
- ✅ WooCommerce products
- ✅ Categories
- ✅ Search results

**No API keys needed for reading!**

---

## 📞 Quick Reference

**Test API:**
```
https://your-site.com/wp-json
```

**Netlify Variables:**
```
NEXT_PUBLIC_WORDPRESS_URL = https://your-site.com
NEXT_PUBLIC_WOOCOMMERCE_URL = https://your-site.com
```

**Test Endpoint:**
```
http://localhost:3000/api/test-wordpress?url=https://your-site.com
```

---

## 🆘 Still Having Issues?

1. **Check `SETUP-WORDPRESS-API.md`** - Detailed troubleshooting
2. **Check `WORDPRESS-API-ACCESS-GUIDE.md`** - What you can access
3. **Run test script:** `node test-wordpress-api.js`

---

**That's it!** Your WordPress content will now automatically appear on your Netlify site. 🚀

