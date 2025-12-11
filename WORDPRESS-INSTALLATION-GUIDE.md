# WordPress Installation & Setup Guide
## Complete Step-by-Step Guide to Get Your Next.js Site Working with WordPress

This guide will walk you through installing and configuring WordPress to work with your Next.js frontend.

---

## 🎯 Overview

Your setup uses:
- **WordPress** = Backend (Content Management, WooCommerce, ArtKey storage)
- **Next.js** = Frontend (Customer-facing website)
- **REST API** = Communication bridge

---

## 📋 Prerequisites

Before starting, you need:
- [ ] A WordPress installation (hosted or local)
- [ ] WordPress admin access
- [ ] FTP/File Manager access to your WordPress installation
- [ ] WooCommerce plugin installed and activated
- [ ] PHP 8.0 or higher

---

## 🚀 Step 1: Install WordPress Plugins

### Option A: Manual Installation (Recommended)

1. **Access your WordPress installation**
   - Via FTP: Connect to your server
   - Via cPanel: Use File Manager
   - Via SSH: Use command line

2. **Navigate to WordPress plugins directory**
   ```
   /wp-content/plugins/
   ```

3. **Upload the ArtKey Editor plugin**
   - Copy the entire `artkey-editor` folder from this project
   - Upload to: `/wp-content/plugins/artkey-editor/`
   - Ensure these files exist:
     - `artkey-editor.php` (main plugin file)
     - `build/editor.js` (React bundle)

4. **Upload the ArtKey Hover plugin**
   - Copy the entire `artkey-hover` folder from this project
   - Upload to: `/wp-content/plugins/artkey-hover/`
   - Ensure these files exist:
     - `artkey-hover.php` (main plugin file)
     - `build/hover-admin.js` (admin script)
     - `build/hover-frontend.js` (frontend script)

5. **Activate plugins in WordPress**
   - Go to WordPress Admin → Plugins
   - Find "ArtKey Editor" → Click "Activate"
   - Find "ArtKey Hover" → Click "Activate"

### Option B: ZIP Installation

1. **Create ZIP files**
   - Zip the `artkey-editor` folder → `artkey-editor.zip`
   - Zip the `artkey-hover` folder → `artkey-hover.zip`

2. **Install via WordPress Admin**
   - Go to Plugins → Add New → Upload Plugin
   - Upload `artkey-editor.zip`
   - Upload `artkey-hover.zip`
   - Activate both plugins

---

## 🎨 Step 2: Install WordPress Theme

1. **Navigate to WordPress themes directory**
   ```
   /wp-content/themes/
   ```

2. **Upload the theme**
   - Copy the entire `theartful-wp` folder from this project
   - Upload to: `/wp-content/themes/theartful-wp/`
   - Ensure these files exist:
     - `style.css`
     - `functions.php`
     - `index.php`

3. **Activate the theme**
   - Go to WordPress Admin → Appearance → Themes
   - Find "The Artful WP" → Click "Activate"

---

## ⚙️ Step 3: Configure WordPress for Headless/API Access

### A. Enable REST API

1. **Check REST API is working**
   - Visit: `https://your-wordpress-site.com/wp-json`
   - You should see JSON output (not an error)

2. **Set Permalinks**
   - Go to Settings → Permalinks
   - Select "Post name" (NOT "Plain")
   - Click "Save Changes"
   - This is required for REST API to work properly

### B. Configure CORS (Cross-Origin Resource Sharing)

Your Next.js site needs permission to access WordPress from a different domain.

**Add to WordPress `functions.php` or create a plugin:**

Create file: `/wp-content/plugins/artkey-cors/artkey-cors.php`

```php
<?php
/**
 * Plugin Name: ArtKey CORS Headers
 * Description: Allows Next.js frontend to access WordPress REST API
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

// Allow CORS from your Next.js domain
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        // Replace with your Next.js domain
        $allowed_origins = [
            'http://localhost:3000',           // Local development
            'https://your-nextjs-site.vercel.app',  // Production
            'https://www.theartfulexperience.com',   // Your custom domain
        ];
        
        $origin = get_http_origin();
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }
        
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        
        // Handle preflight requests
        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
        
        return $value;
    });
}, 15);
```

**Or add directly to your theme's `functions.php`:**

Add this code to `/wp-content/themes/theartful-wp/functions.php`:

```php
// Allow CORS from Next.js frontend
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $allowed_origins = [
            'http://localhost:3000',
            'https://your-nextjs-site.vercel.app',
            'https://www.theartfulexperience.com',
        ];
        
        $origin = get_http_origin();
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }
        
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        
        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
        
        return $value;
    });
}, 15);
```

**Important:** Replace `https://your-nextjs-site.vercel.app` with your actual Next.js domain.

---

## 🔐 Step 4: Set Up WooCommerce REST API

1. **Create API Keys**
   - Go to WooCommerce → Settings → Advanced → REST API
   - Click "Add Key"
   - Description: "Next.js Frontend"
   - User: Select an administrator account
   - Permissions: "Read/Write"
   - Click "Generate API Key"

2. **Save Your Credentials**
   - **Consumer Key:** `ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Consumer Secret:** `cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ **Keep these secret!** You'll need them for Next.js

3. **Test the API**
   - Visit: `https://your-wordpress-site.com/wp-json/wc/v3/products`
   - You should be prompted for authentication
   - Or test with curl:
   ```bash
   curl -u "ck_key:cs_secret" https://your-wordpress-site.com/wp-json/wc/v3/products
   ```

---

## 📝 Step 5: Configure Next.js Environment Variables

1. **Create `.env.local` file** in your Next.js project root:

```env
# WordPress/WooCommerce Configuration
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-wordpress-site.com

# WooCommerce API Credentials
WOOCOMMERCE_CONSUMER_KEY=ck_your_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_secret_here

# Gelato API (if using)
GELATO_API_KEY=your_gelato_key_here
GELATO_API_URL=https://order.gelatoapis.com/v4
```

2. **Replace placeholders:**
   - `https://your-wordpress-site.com` → Your actual WordPress URL
   - `ck_your_key_here` → Your WooCommerce Consumer Key
   - `cs_your_secret_here` → Your WooCommerce Consumer Secret

3. **Restart Next.js dev server** after adding environment variables:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

## ✅ Step 6: Verify Installation

### Test WordPress REST API

1. **Test WordPress REST API:**
   ```
   https://your-wordpress-site.com/wp-json
   ```
   Should return JSON with available endpoints.

2. **Test ArtKey REST API:**
   ```
   https://your-wordpress-site.com/wp-json/artkey/v1/get/1
   ```
   (Will return 404 if no ArtKey exists yet, but endpoint should be accessible)

3. **Test WooCommerce REST API:**
   ```
   https://your-wordpress-site.com/wp-json/wc/v3/products
   ```
   (Requires authentication - test from Next.js)

### Test from Next.js

1. **Start Next.js dev server:**
   ```bash
   npm run dev
   ```

2. **Test WooCommerce connection:**
   - Visit: `http://localhost:3000/api/woocommerce/test`
   - Should return: `{"success": true, "message": "WooCommerce API connection successful"}`

3. **Test products:**
   - Visit: `http://localhost:3000/api/products`
   - Should return array of products from WordPress

---

## 🔧 Step 7: WordPress Plugin Dependencies

### ArtKey Editor Plugin Requirements

The ArtKey Editor plugin uses `endroid/qr-code` for QR code generation.

**Install via Composer (if available):**

```bash
cd /wp-content/plugins/artkey-editor/
composer require endroid/qr-code
```

**Or manually:**
- Download from: https://github.com/endroid/qr-code
- Place in: `/wp-content/plugins/artkey-editor/vendor/endroid/qr-code/`

**Note:** QR code generation is optional. The plugin will work without it, but QR codes won't be generated.

---

## 🎯 Step 8: WordPress Settings Checklist

- [ ] WordPress REST API enabled (test `/wp-json`)
- [ ] Permalinks set to "Post name"
- [ ] CORS headers configured
- [ ] ArtKey Editor plugin activated
- [ ] ArtKey Hover plugin activated
- [ ] The Artful WP theme activated
- [ ] WooCommerce installed and activated
- [ ] WooCommerce REST API keys created
- [ ] Next.js environment variables configured
- [ ] Test API connection from Next.js

---

## 🐛 Troubleshooting

### "CORS Error" in Browser Console

**Solution:**
- Check CORS headers are added to WordPress
- Verify your Next.js domain is in the allowed origins list
- Clear browser cache
- Check WordPress security plugins aren't blocking API

### "REST API Not Working"

**Solution:**
- Check permalinks are set to "Post name"
- Disable security plugins temporarily to test
- Check `.htaccess` file exists and is writable
- Verify WordPress version is 5.0+

### "WooCommerce API Authentication Failed"

**Solution:**
- Verify Consumer Key and Secret are correct
- Check API keys have "Read/Write" permissions
- Ensure no extra spaces in `.env.local`
- Restart Next.js server after changing env vars

### "ArtKey Plugin Not Found"

**Solution:**
- Verify plugin files are in correct location
- Check file permissions (should be 644 for files, 755 for folders)
- Activate plugin in WordPress admin
- Check PHP error logs

### "Plugin Requires PHP 8.4"

**Solution:**
- Update PHP version on your server
- Or modify plugin to support lower PHP version
- Contact your hosting provider to upgrade PHP

---

## 📦 File Structure After Installation

Your WordPress installation should have:

```
/wp-content/
├── plugins/
│   ├── artkey-editor/
│   │   ├── artkey-editor.php
│   │   └── build/
│   │       └── editor.js
│   ├── artkey-hover/
│   │   ├── artkey-hover.php
│   │   └── build/
│   │       ├── hover-admin.js
│   │       └── hover-frontend.js
│   └── artkey-cors/ (optional)
│       └── artkey-cors.php
└── themes/
    └── theartful-wp/
        ├── style.css
        ├── functions.php
        └── index.php
```

---

## 🚀 Next Steps After Installation

1. **Create test products in WooCommerce**
2. **Test ArtKey editor from Next.js**
3. **Configure ArtKey settings per product**
4. **Test order creation flow**
5. **Deploy Next.js to production**
6. **Update CORS allowed origins for production domain**

---

## 📞 Need Help?

If you encounter issues:

1. Check WordPress error logs: `/wp-content/debug.log`
2. Check browser console for JavaScript errors
3. Check Next.js terminal for API errors
4. Verify all file paths are correct
5. Ensure all plugins are activated

---

## ✅ Installation Complete!

Once all steps are complete, your Next.js site should be able to:
- ✅ Fetch products from WooCommerce
- ✅ Create orders in WooCommerce
- ✅ Save ArtKey designs to WordPress
- ✅ Retrieve ArtKey data from WordPress
- ✅ Display ArtKey previews on products

**Your WordPress backend is now ready to work with your Next.js frontend!** 🎉


