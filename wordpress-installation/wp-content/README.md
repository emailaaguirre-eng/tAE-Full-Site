# WordPress Files for The Artful Experience

This folder contains WordPress plugins and theme files that need to be uploaded to your WordPress installation.

---

## 📦 What's Here

### Plugins (`plugins/`)
- **artkey-editor/** - Main ArtKey editor plugin
- **artkey-hover/** - ArtKey hover preview plugin  
- **artkey-cors/** - CORS headers plugin (allows Next.js API access)

### Theme (`themes/`)
- **theartful-wp/** - Minimal WordPress theme for headless setup

---

## 🚀 Installation

### Step 1: Upload to WordPress

Upload these folders to your WordPress installation:

```
Your WordPress Site/
└── wp-content/
    ├── plugins/
    │   ├── artkey-editor/        ← Upload this
    │   ├── artkey-hover/         ← Upload this
    │   └── artkey-cors/          ← Upload this
    └── themes/
        └── theartful-wp/         ← Upload this
```

### Step 2: Activate in WordPress Admin

1. Go to **Plugins** → Activate:
   - ArtKey Editor
   - ArtKey Hover
   - ArtKey CORS Headers

2. Go to **Appearance → Themes** → Activate:
   - The Artful WP

### Step 3: Configure

1. **Set Permalinks:**
   - Settings → Permalinks → "Post name" → Save

2. **Update CORS Origins:**
   - Edit `plugins/artkey-cors/artkey-cors.php`
   - Replace `https://your-nextjs-site.vercel.app` with your actual Next.js domain

3. **Create WooCommerce API Keys:**
   - WooCommerce → Settings → Advanced → REST API
   - Create new key with "Read/Write" permissions
   - Copy Consumer Key and Secret to Next.js `.env.local`

---

## 📚 Documentation

For complete setup instructions, see:
- `WORDPRESS-INSTALLATION-GUIDE.md` (detailed guide)
- `WORDPRESS-QUICK-START.md` (15-minute setup)
- `WORDPRESS-SETUP-SUMMARY.md` (overview)

---

## ✅ After Installation

Test that everything works:

1. **WordPress REST API:**
   - Visit: `https://your-site.com/wp-json`
   - Should return JSON

2. **ArtKey API:**
   - Visit: `https://your-site.com/wp-json/artkey/v1/get/1`
   - Endpoint should exist (may 404 if no ArtKey exists)

3. **From Next.js:**
   - Test: `http://localhost:3000/api/woocommerce/test`
   - Should return success message

---

## 🐛 Troubleshooting

**Files not showing in WordPress?**
- Check file permissions (644 for files, 755 for folders)
- Verify files are in correct directories
- Refresh WordPress admin page

**Plugins not activating?**
- Check PHP version (requires PHP 8.0+)
- Check WordPress error logs
- Verify all files uploaded correctly

**REST API not working?**
- Set permalinks to "Post name"
- Check CORS plugin is activated
- Verify no security plugins blocking API

---

## 📝 File Structure

```
wp-content/
├── plugins/
│   ├── artkey-editor/
│   │   ├── artkey-editor.php      (Main plugin file)
│   │   └── build/
│   │       └── editor.js           (React bundle)
│   │
│   ├── artkey-hover/
│   │   ├── artkey-hover.php        (Main plugin file)
│   │   └── build/
│   │       ├── hover-admin.js      (Admin script)
│   │       └── hover-frontend.js   (Frontend script)
│   │
│   └── artkey-cors/
│       └── artkey-cors.php         (CORS headers)
│
└── themes/
    └── theartful-wp/
        ├── style.css               (Theme styles)
        ├── functions.php           (Theme functions)
        └── index.php               (Theme template)
```

---

## 🎯 Ready to Install?

1. Upload all folders to WordPress
2. Activate plugins and theme
3. Follow configuration steps
4. Test connections
5. Start using!

---

**Need help?** Check the main documentation files in the project root.

