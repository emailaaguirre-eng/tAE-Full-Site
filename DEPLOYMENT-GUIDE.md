# 🚀 The Artful Experience - Headless Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR SETUP                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   WordPress (theartfulexperience.com)                           │
│   ├── WooCommerce (Products, Orders, Payments)                  │
│   ├── Content Management (Blog, Pages)                          │
│   └── REST API → Exposes data to Next.js                        │
│                                                                  │
│              ↓ API Calls ↓                                       │
│                                                                  │
│   Next.js Frontend (Vercel)                                     │
│   ├── Homepage with ArtKey Previews                             │
│   ├── Product Customization Flow                                │
│   ├── ArtKey Editor (40 templates)                              │
│   ├── Admin Dashboard                                           │
│   └── Checkout Integration                                      │
│                                                                  │
│              ↓ API Calls ↓                                       │
│                                                                  │
│   Gelato (Print Fulfillment)                                    │
│   └── Receives orders, prints, ships                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Push to GitHub

### 1.1 Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it: `tae-website` (or whatever you prefer)
3. Keep it **Private** (recommended)
4. Don't initialize with README (we have one)

### 1.2 Push Your Code

Open terminal in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - The Artful Experience website"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/tae-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### 2.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account (easiest)

### 2.2 Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Select your `tae-website` repository
3. Vercel will auto-detect it's a Next.js project
4. **IMPORTANT**: Before clicking Deploy, add Environment Variables!

### 2.3 Add Environment Variables

In the Vercel project settings, add these:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_WORDPRESS_URL` | `https://theartfulexperience.com` |
| `NEXT_PUBLIC_WOOCOMMERCE_URL` | `https://theartfulexperience.com` |
| `WOOCOMMERCE_CONSUMER_KEY` | `ck_your_key_here` |
| `WOOCOMMERCE_CONSUMER_SECRET` | `cs_your_secret_here` |
| `GELATO_API_KEY` | `your_gelato_api_key` |

### 2.4 Deploy!

Click **"Deploy"** - Vercel will build and deploy your site.

You'll get a URL like: `tae-website.vercel.app`

---

## Step 3: Connect Your Domain (Optional)

### Option A: Use a Subdomain

Point `shop.theartfulexperience.com` to Vercel:

1. In Vercel: Project Settings → Domains → Add `shop.theartfulexperience.com`
2. In your DNS (where you manage theartfulexperience.com):
   - Add CNAME record: `shop` → `cname.vercel-dns.com`

### Option B: Use a Separate Domain

Buy a new domain and point it entirely to Vercel.

### Option C: Replace Main Site

Point `theartfulexperience.com` to Vercel (WordPress moves to subdomain like `wp.theartfulexperience.com`)

---

## Step 4: Configure WordPress for Headless

### 4.1 Install Required Plugins

In WordPress Admin:

1. **WooCommerce** (already installed ✓)
2. **JWT Authentication for WP REST API** (for secure API calls)
3. **WP REST Cache** (optional, improves performance)

### 4.2 Enable CORS

Add this to your WordPress theme's `functions.php` or use a plugin:

```php
// Enable CORS for your Next.js domain
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = [
            'https://tae-website.vercel.app',
            'https://shop.theartfulexperience.com',
            'http://localhost:3000'
        ];
        
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type');
        }
        return $value;
    });
}, 15);
```

### 4.3 Generate WooCommerce API Keys

1. WordPress Admin → WooCommerce → Settings → Advanced → REST API
2. Click **"Add Key"**
3. Description: `Next.js Website`
4. User: Select your admin user
5. Permissions: **Read/Write**
6. Click **"Generate API Key"**
7. Copy both keys to Vercel environment variables

---

## Step 5: Test Everything

### 5.1 Test WooCommerce Connection

Visit: `https://your-vercel-url.vercel.app/api/woocommerce/test`

Should return your products.

### 5.2 Test Gelato Connection

The Gelato integration will work once you:
1. Add your API key
2. Upload an image through the ArtKey Editor
3. Complete a test order

### 5.3 Test the Full Flow

1. Visit homepage
2. Click a product → Customize
3. Go through ArtKey Editor
4. Check cart functionality

---

## Automatic Deployments

Once connected to GitHub, every time you push changes:

```bash
git add .
git commit -m "Updated something"
git push
```

Vercel automatically rebuilds and deploys! 🎉

---

## Troubleshooting

### Products not loading?
- Check WooCommerce API keys are correct
- Verify CORS is enabled on WordPress
- Check browser console for errors

### Images not showing?
- Verify `next.config.js` allows your WordPress domain
- Check image URLs are accessible

### Build failing?
- Check Vercel build logs
- Ensure all environment variables are set

---

## Support Contacts

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **WooCommerce REST API**: https://woocommerce.github.io/woocommerce-rest-api-docs/
- **Gelato API**: https://dashboard.gelato.com/docs/

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Push to deploy
git add . && git commit -m "Update" && git push
```

---

**You're ready to launch! 🚀**

