# Deployment & WordPress Integration Guide
## How to Deploy Your Next.js Website and Connect to WordPress

This guide explains how to deploy your Next.js website and integrate it with your existing WordPress site.

---

## 🎯 Architecture Overview

Your setup uses **WordPress as a Headless CMS/Backend** and **Next.js as the Frontend**:

```
┌─────────────────┐         ┌──────────────────┐
│   Next.js Site  │ ◄──────► │  WordPress Site  │
│   (Frontend)    │   API    │   (Backend)       │
│                 │          │                   │
│ - UI/UX         │          │ - WooCommerce     │
│ - ArtKey Editor │          │ - Products        │
│ - Admin Panel   │          │ - Orders          │
│ - Customer Site │          │ - Content          │
└─────────────────┘         └──────────────────┘
```

**Benefits:**
- ✅ Fast, modern frontend (Next.js)
- ✅ Easy content management (WordPress)
- ✅ WooCommerce for e-commerce
- ✅ Best of both worlds!

---

## 🚀 Option 1: Deploy Next.js Separately (Recommended)

### Step 1: Choose a Hosting Platform

**Best Options for Next.js:**

1. **Vercel** (Recommended - Made by Next.js creators)
   - Free tier available
   - Automatic deployments
   - Built-in CDN
   - Easy WordPress API integration

2. **Netlify**
   - Free tier available
   - Good for static sites
   - Easy setup

3. **AWS Amplify**
   - Scalable
   - Good for production

4. **DigitalOcean App Platform**
   - Affordable
   - Good performance

### Step 2: Prepare for Deployment

#### A. Build Your Next.js App

```bash
# Install dependencies (if not done)
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

#### B. Create Deployment Configuration

**For Vercel** (create `vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_WOOCOMMERCE_URL": "https://theartfulexperience.com",
    "NEXT_PUBLIC_WORDPRESS_URL": "https://theartfulexperience.com"
  }
}
```

**For Netlify** (create `netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 3: Deploy to Vercel (Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Link to existing project? **No**
   - Project name? **theartfulexperience** (or your choice)
   - Directory? **./**
   - Override settings? **No**

4. **Add Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_WOOCOMMERCE_URL=https://theartfulexperience.com
     NEXT_PUBLIC_WORDPRESS_URL=https://theartfulexperience.com
     WOOCOMMERCE_CONSUMER_KEY=ck_your_key_here
     WOOCOMMERCE_CONSUMER_SECRET=cs_your_secret_here
     GELATO_API_KEY=your_gelato_key_here
     GELATO_API_URL=https://order.gelatoapis.com/v4
     ```

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Step 4: Configure WordPress CORS

Your WordPress site needs to allow requests from your Next.js domain.

**Add to WordPress `functions.php` or a plugin:**

```php
// Allow CORS from your Next.js domain
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://your-nextjs-domain.vercel.app');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        return $value;
    });
}, 15);
```

**Or use a plugin:**
- Install "CORS Headers" plugin
- Add your Next.js domain to allowed origins

### Step 5: Update WordPress Settings

1. **WooCommerce REST API:**
   - Go to WooCommerce → Settings → Advanced → REST API
   - Ensure your API keys are active
   - Test connection from Next.js site

2. **WordPress REST API:**
   - Should be enabled by default
   - Test: `https://theartfulexperience.com/wp-json`

---

## 🔄 Option 2: Use WordPress Subdomain/Directory

### Option 2A: WordPress on Subdomain

```
WordPress:  theartfulexperience.com (or admin.theartfulexperience.com)
Next.js:    www.theartfulexperience.com (or app.theartfulexperience.com)
```

**Setup:**
1. Keep WordPress at main domain
2. Deploy Next.js to subdomain
3. Point subdomain DNS to Vercel/Netlify

### Option 2B: Next.js on Subdomain

```
WordPress:  admin.theartfulexperience.com
Next.js:    theartfulexperience.com (main site)
```

**Setup:**
1. Move WordPress to subdomain
2. Deploy Next.js to main domain
3. Update API URLs in Next.js

---

## 🔧 Option 3: WordPress Plugin Approach

If you want to keep everything in WordPress, you can create a WordPress plugin that loads your Next.js app.

**Create `nextjs-integration.php` in WordPress:**

```php
<?php
/**
 * Plugin Name: Next.js Integration
 * Description: Integrates Next.js frontend with WordPress
 */

// Enqueue Next.js app
function enqueue_nextjs_app() {
    // Option 1: Iframe embed
    // Option 2: API proxy
    // Option 3: Server-side rendering
}
add_action('wp_enqueue_scripts', 'enqueue_nextjs_app');
```

**Note:** This is more complex and not recommended unless you have specific requirements.

---

## 📦 Deployment Checklist

### Pre-Deployment

- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Verify all API connections work
- [ ] Check environment variables
- [ ] Test admin dashboard
- [ ] Test product creation
- [ ] Test checkout flow

### Deployment Steps

- [ ] Choose hosting platform (Vercel recommended)
- [ ] Create account on hosting platform
- [ ] Install hosting CLI (if needed)
- [ ] Deploy Next.js app
- [ ] Add environment variables
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate (automatic on Vercel)
- [ ] Test deployed site

### WordPress Configuration

- [ ] Enable REST API
- [ ] Create WooCommerce API keys
- [ ] Configure CORS headers
- [ ] Test API endpoints
- [ ] Update API URLs in Next.js env vars

### Post-Deployment

- [ ] Test all pages load correctly
- [ ] Test product fetching
- [ ] Test order creation
- [ ] Test admin dashboard
- [ ] Monitor for errors
- [ ] Set up error tracking (optional)

---

## 🔐 Environment Variables Setup

### Development (`.env.local`)

```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://theartfulexperience.com
NEXT_PUBLIC_WORDPRESS_URL=https://theartfulexperience.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_dev_key
WOOCOMMERCE_CONSUMER_SECRET=cs_your_dev_secret
GELATO_API_KEY=your_dev_gelato_key
GELATO_API_URL=https://order.gelatoapis.com/v4
```

### Production (Vercel/Netlify Dashboard)

```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://theartfulexperience.com
NEXT_PUBLIC_WORDPRESS_URL=https://theartfulexperience.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_prod_key
WOOCOMMERCE_CONSUMER_SECRET=cs_your_prod_secret
GELATO_API_KEY=your_prod_gelato_key
GELATO_API_URL=https://order.gelatoapis.com/v4
```

**⚠️ Important:**
- Use different API keys for dev and production
- Never commit `.env.local` to Git
- Rotate keys regularly

---

## 🌐 Domain Configuration

### Option A: Custom Domain on Vercel

1. **In Vercel Dashboard:**
   - Go to Project → Settings → Domains
   - Add your domain: `www.theartfulexperience.com`
   - Follow DNS instructions

2. **Update DNS Records:**
   - Add CNAME record pointing to Vercel
   - Or add A record (if provided)

3. **SSL Certificate:**
   - Automatic on Vercel
   - HTTPS enabled by default

### Option B: Subdomain Setup

```
Main Domain:     theartfulexperience.com (WordPress)
Frontend:        app.theartfulexperience.com (Next.js)
Admin:           admin.theartfulexperience.com (WordPress Admin)
```

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Vercel:**
- Connect GitHub repository
- Auto-deploy on push to main branch
- Preview deployments for pull requests

**Setup:**
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Vercel auto-deploys on every push

### Manual Deployments

```bash
# Deploy to production
vercel --prod

# Or use Vercel dashboard
# Click "Deploy" button
```

---

## 🧪 Testing Integration

### Test WordPress API Connection

```bash
# Test REST API
curl https://theartfulexperience.com/wp-json

# Test WooCommerce API
curl https://theartfulexperience.com/wp-json/wc/v3/products \
  -u "ck_key:cs_secret"
```

### Test from Next.js

1. Visit: `https://your-nextjs-site.vercel.app/api/woocommerce/test`
2. Should return: `{"success": true, "message": "WooCommerce API connection successful"}`

### Test Product Fetching

1. Visit: `https://your-nextjs-site.vercel.app/api/products`
2. Should return array of products from WordPress

---

## 🐛 Troubleshooting

### "CORS Error"

**Solution:**
- Add CORS headers in WordPress (see Step 4 above)
- Or use CORS plugin

### "API Connection Failed"

**Solution:**
- Check API keys are correct
- Verify WordPress URL is correct
- Check WooCommerce is installed
- Test API endpoint directly

### "Environment Variables Not Working"

**Solution:**
- Restart dev server after adding env vars
- In production, add vars in hosting dashboard
- Redeploy after adding env vars

### "Build Fails"

**Solution:**
- Check for TypeScript errors: `npm run build`
- Fix linting errors
- Check all imports are correct
- Verify all dependencies installed

---

## 📊 Recommended Setup

### Production Architecture

```
┌─────────────────────────────────────┐
│  www.theartfulexperience.com       │
│  (Next.js - Vercel)                 │
│  - Customer-facing site             │
│  - ArtKey Editor                    │
│  - Product listings                 │
└──────────────┬──────────────────────┘
               │ API Calls
               ▼
┌─────────────────────────────────────┐
│  theartfulexperience.com            │
│  (WordPress)                        │
│  - WooCommerce backend              │
│  - Product management               │
│  - Order processing                 │
│  - Content management               │
└─────────────────────────────────────┘
```

---

## 🚀 Quick Start Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd "F:\Dre_Programs\tAE Full Website"
   vercel
   ```

4. **Add Environment Variables** (in Vercel Dashboard)

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

6. **Done!** Your site is live at `https://your-project.vercel.app`

---

## 📝 Next Steps After Deployment

1. **Configure Custom Domain**
2. **Set Up Monitoring** (Vercel Analytics)
3. **Enable Error Tracking** (Sentry, etc.)
4. **Set Up Backups** (for WordPress)
5. **Configure CDN** (automatic on Vercel)
6. **Set Up SSL** (automatic on Vercel)

---

## 🎯 Summary

**Best Approach:**
1. ✅ Deploy Next.js to Vercel (free, easy, fast)
2. ✅ Keep WordPress at your current domain
3. ✅ Connect via REST API
4. ✅ Use environment variables for API keys
5. ✅ Configure CORS in WordPress

**Result:**
- Fast, modern frontend (Next.js)
- Easy content management (WordPress)
- WooCommerce for e-commerce
- Professional, scalable setup

---

**Your Next.js website is ready to deploy and integrate with WordPress!** 🚀

Need help with a specific step? Let me know!

