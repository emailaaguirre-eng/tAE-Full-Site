# Netlify Deployment Guide
## Deploy Your Complete Website to Netlify with Optional WordPress Integration

This guide will help you deploy your complete working website to Netlify. The site will work standalone, and can optionally pull content from WordPress if you have the API credentials.

---

## 🎯 Overview

**Your Setup:**
- ✅ **Next.js Website** - Complete, working, standalone
- ✅ **Optional WordPress** - Pull content via API (if available)
- ✅ **Fallback Content** - Site works even if WordPress is unavailable
- ✅ **Netlify Hosting** - Fast, free, easy deployment

---

## 🚀 Step 1: Prepare Your Site for Netlify

### A. Create Netlify Configuration File

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

# Redirects for Next.js
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### B. Update Next.js Config for Netlify

Your `next.config.js` should already be set up, but verify it looks like this:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any domain
      },
    ],
  },
  // Output configuration for Netlify
  output: 'standalone', // or 'export' if you want static export
}

module.exports = nextConfig
```

---

## 📝 Step 2: Set Up Environment Variables

### A. Create `.env.local` File (for local development)

Create `.env.local` in your project root:

```env
# WordPress/WooCommerce API (Optional - site works without these)
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-wordpress-site.com

# WooCommerce API Keys (Optional)
WOOCOMMERCE_CONSUMER_KEY=your_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=your_consumer_secret

# Gelato API (Optional)
GELATO_API_KEY=your_gelato_api_key

# Note: The site will work with fallback content if these are not set
```

**Important:** Add `.env.local` to `.gitignore` (it should already be there)

### B. Set Environment Variables in Netlify

1. **Go to Netlify Dashboard**
   - Sign up/login at [netlify.com](https://netlify.com)
   - Create a new site

2. **Add Environment Variables:**
   - Go to **Site Settings → Environment Variables**
   - Add these variables (only if you have WordPress API access):

   ```
   NEXT_PUBLIC_WORDPRESS_URL = https://your-wordpress-site.com
   NEXT_PUBLIC_WOOCOMMERCE_URL = https://your-wordpress-site.com
   WOOCOMMERCE_CONSUMER_KEY = your_consumer_key
   WOOCOMMERCE_CONSUMER_SECRET = your_consumer_secret
   GELATO_API_KEY = your_gelato_api_key
   ```

   **Note:** If you don't have WordPress API access yet, you can skip these. The site will use fallback content.

---

## 🚀 Step 3: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Easiest)

1. **Connect Your Repository:**
   - In Netlify, click **"Add new site" → "Import an existing project"**
   - Connect to GitHub/GitLab/Bitbucket
   - Select your repository

2. **Configure Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (or leave default)
   - **Node version:** 18 (or latest LTS)

3. **Deploy:**
   - Click **"Deploy site"**
   - Netlify will automatically build and deploy

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize Site:**
   ```bash
   netlify init
   ```
   - Follow the prompts
   - Choose "Create & configure a new site"

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Option C: Deploy via Git Push (Automatic)

1. **Connect Repository to Netlify:**
   - Netlify will automatically deploy on every push to your main branch

2. **Push Your Code:**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

---

## ✅ Step 4: Verify Your Site Works

### Check These Features:

1. **Home Page Loads** ✅
   - Hero section displays
   - All sections visible
   - Navigation works

2. **Content Displays** ✅
   - If WordPress API is connected: Content pulls from WordPress
   - If not connected: Fallback content displays (this is fine!)

3. **Products Section** ✅
   - Featured products show (either from WooCommerce or fallback)
   - Product cards display correctly

4. **ArtKey Editor** ✅
   - `/artkey/editor` page works
   - Customization features function

5. **Customize Page** ✅
   - `/customize` page loads
   - Product selection works

---

## 🔧 Step 5: Configure WordPress API (Optional)

If you have WordPress API access and want to pull content:

### A. Get WordPress API URL

1. **Find Your WordPress Site URL:**
   - Example: `https://theartfulexperience.com`
   - Test the API: Visit `https://theartfulexperience.com/wp-json`

2. **Add to Netlify Environment Variables:**
   ```
   NEXT_PUBLIC_WORDPRESS_URL = https://theartfulexperience.com
   NEXT_PUBLIC_WOOCOMMERCE_URL = https://theartfulexperience.com
   ```

### B. Get WooCommerce API Keys (Optional)

1. **In WordPress Admin:**
   - Go to **WooCommerce → Settings → Advanced → REST API**
   - Click **"Add key"**
   - Set permissions to **"Read/Write"**
   - Copy the **Consumer Key** and **Consumer Secret**

2. **Add to Netlify Environment Variables:**
   ```
   WOOCOMMERCE_CONSUMER_KEY = ck_xxxxxxxxxxxxx
   WOOCOMMERCE_CONSUMER_SECRET = cs_xxxxxxxxxxxxx
   ```

3. **Redeploy:**
   - Go to Netlify Dashboard → **Deploys**
   - Click **"Trigger deploy" → "Clear cache and deploy site"**

### C. Test WordPress Integration

1. **Check Hero Content:**
   - Visit your Netlify site
   - Hero section should pull from WordPress (if configured)
   - Or show fallback content (if not configured)

2. **Check Products:**
   - Featured Products section should show WooCommerce products
   - Or show fallback products (if not configured)

---

## 🎨 How Content Works

### Current Setup (Smart Fallbacks):

1. **Hero Section:**
   - ✅ Tries to fetch from `/api/hero-content` (WordPress)
   - ✅ Falls back to hardcoded content if WordPress unavailable

2. **Featured Products:**
   - ✅ Tries to fetch from `/api/products` (WooCommerce)
   - ✅ Falls back to sample products if WooCommerce unavailable

3. **Other Sections:**
   - ✅ AboutUs, CoCreators, ProductCategories use hardcoded content
   - ✅ Can be updated to pull from WordPress later if needed

### This Means:
- ✅ **Your site works immediately** - No WordPress required
- ✅ **Can add WordPress later** - Just add environment variables
- ✅ **No breaking changes** - Everything has fallbacks

---

## 🔄 Updating Content

### Option 1: Update Code Directly (Current Method)

Edit the component files:
- `components/AboutUs.tsx` - About Us content
- `components/CoCreators.tsx` - CoCreators profiles
- `components/ProductCategories.tsx` - Product categories
- `components/Hero.tsx` - Hero content (or use WordPress)

### Option 2: Pull from WordPress (If Configured)

1. **Update Content in WordPress:**
   - Log into WordPress admin
   - Edit pages/posts
   - Content automatically appears on Next.js site

2. **For Hero Content:**
   - Create a WordPress page with slug `home-settings`
   - Add custom fields (or use ACF plugin)
   - Hero will pull from WordPress

---

## 🐛 Troubleshooting

### Issue: Build Fails on Netlify

**Solution:**
- Check build logs in Netlify dashboard
- Ensure `package.json` has all dependencies
- Verify Node version is set to 18 or higher

### Issue: Site Works Locally But Not on Netlify

**Solution:**
- Check environment variables are set in Netlify
- Verify `netlify.toml` is correct
- Check build logs for errors

### Issue: WordPress Content Not Showing

**Solution:**
- Verify WordPress API is accessible: `https://your-site.com/wp-json`
- Check environment variables in Netlify
- Ensure CORS is enabled on WordPress (if needed)
- Site will show fallback content if WordPress unavailable (this is fine!)

### Issue: Images Not Loading

**Solution:**
- Check `next.config.js` has correct `remotePatterns`
- Verify image URLs are absolute (not relative)
- Check WordPress domain is allowed in image config

---

## 📋 Quick Checklist

Before deploying:

- [ ] `netlify.toml` file created
- [ ] `next.config.js` configured correctly
- [ ] `.env.local` created (for local dev)
- [ ] Environment variables set in Netlify (optional)
- [ ] Site builds locally: `npm run build`
- [ ] All components have fallback content
- [ ] Test site works without WordPress API

After deploying:

- [ ] Site loads on Netlify URL
- [ ] All sections display correctly
- [ ] Navigation works
- [ ] Products show (either from WooCommerce or fallback)
- [ ] ArtKey editor works
- [ ] Test WordPress integration (if configured)

---

## 🎉 You're Done!

Your complete website is now:
- ✅ Deployed on Netlify
- ✅ Working standalone (no WordPress required)
- ✅ Ready to optionally pull from WordPress (if configured)
- ✅ Fast and reliable

**Your Netlify URL:** `https://your-site-name.netlify.app`

---

## 💡 Next Steps

1. **Custom Domain (Optional):**
   - In Netlify: **Domain Settings → Add custom domain**
   - Follow DNS setup instructions

2. **Add WordPress Content (Optional):**
   - Set up WordPress API credentials
   - Content will automatically pull from WordPress

3. **Update Content:**
   - Edit components directly, or
   - Use WordPress as CMS (if configured)

---

## 📞 Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Next.js on Netlify:** https://docs.netlify.com/integrations/frameworks/nextjs/
- **Build Logs:** Check in Netlify Dashboard → Deploys

---

**Remember:** Your site works great standalone. WordPress integration is optional and can be added anytime! 🚀

