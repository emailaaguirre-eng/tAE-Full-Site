# WordPress Quick Start Checklist
## Fast Setup Guide - Get Running in 15 Minutes

Use this checklist to quickly set up WordPress integration with your Next.js site.

---

## ✅ Pre-Installation Checklist

- [ ] WordPress is installed and accessible
- [ ] You have WordPress admin access
- [ ] WooCommerce plugin is installed and activated
- [ ] You have FTP/File Manager access to WordPress files

---

## 📦 Step 1: Upload Files (5 minutes)

### Upload Plugins:
1. Upload `wp-content/plugins/artkey-editor/` → WordPress `/wp-content/plugins/artkey-editor/`
2. Upload `wp-content/plugins/artkey-hover/` → WordPress `/wp-content/plugins/artkey-hover/`
3. Upload `wp-content/plugins/artkey-cors/` → WordPress `/wp-content/plugins/artkey-cors/`

### Upload Theme:
4. Upload `wp-content/themes/theartful-wp/` → WordPress `/wp-content/themes/theartful-wp/`

---

## ⚙️ Step 2: Activate in WordPress (2 minutes)

1. Go to WordPress Admin → Plugins
   - [ ] Activate "ArtKey Editor"
   - [ ] Activate "ArtKey Hover"
   - [ ] Activate "ArtKey CORS Headers"

2. Go to WordPress Admin → Appearance → Themes
   - [ ] Activate "The Artful WP"

---

## 🔧 Step 3: Configure WordPress (3 minutes)

1. **Set Permalinks:**
   - Go to Settings → Permalinks
   - Select "Post name"
   - Click "Save Changes"

2. **Test REST API:**
   - Visit: `https://your-wordpress-site.com/wp-json`
   - Should see JSON (not error page)

3. **Update CORS Origins (if needed):**
   - Edit: `/wp-content/plugins/artkey-cors/artkey-cors.php`
   - Replace `https://your-nextjs-site.vercel.app` with your actual Next.js domain
   - Or edit theme: `/wp-content/themes/theartful-wp/functions.php`

---

## 🔐 Step 4: Create WooCommerce API Keys (3 minutes)

1. Go to WooCommerce → Settings → Advanced → REST API
2. Click "Add Key"
3. Fill in:
   - Description: "Next.js Frontend"
   - User: [Select admin user]
   - Permissions: "Read/Write"
4. Click "Generate API Key"
5. **Copy and save:**
   - Consumer Key: `ck_xxxxxxxxxxxxx`
   - Consumer Secret: `cs_xxxxxxxxxxxxx`

---

## 📝 Step 5: Configure Next.js (2 minutes)

1. **Create `.env.local` file** in Next.js project root
2. **Copy from `.env.local.example`** and fill in:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-wordpress-site.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_actual_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_actual_secret_here
```

3. **Restart Next.js server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

## ✅ Step 6: Test Connection (2 minutes)

1. **Test WordPress REST API:**
   - Visit: `https://your-wordpress-site.com/wp-json`
   - ✅ Should return JSON

2. **Test WooCommerce from Next.js:**
   - Visit: `http://localhost:3000/api/woocommerce/test`
   - ✅ Should return: `{"success": true, ...}`

3. **Test Products:**
   - Visit: `http://localhost:3000/api/products`
   - ✅ Should return products array

---

## 🎉 Done!

If all tests pass, your WordPress backend is connected to Next.js!

---

## 🐛 Quick Troubleshooting

**CORS Error?**
- Check CORS plugin is activated
- Verify your Next.js domain is in allowed origins
- Clear browser cache

**API Not Working?**
- Check permalinks are "Post name"
- Verify WooCommerce API keys are correct
- Restart Next.js server

**Plugin Not Found?**
- Check file paths are correct
- Verify plugins are activated
- Check file permissions (644 for files, 755 for folders)

---

## 📞 Next Steps

1. Create test products in WooCommerce
2. Test ArtKey editor from Next.js
3. Configure ArtKey settings
4. Test order creation
5. Deploy to production

---

**Time Estimate:** 15 minutes
**Difficulty:** Easy
**Status:** ✅ Ready to go!


