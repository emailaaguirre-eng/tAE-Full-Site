# WordPress React Bundle Build Guide
## Building React Components for WordPress Plugins

---

## 📋 **Overview**

This guide explains how to build React components with Tailwind CSS for your WordPress plugins, matching the exact appearance of your Netlify/Next.js site.

---

## 🎯 **What Gets Built**

### **ArtKey Editor Bundle**
- **Entry:** `wp-build/artkey-editor/index.js`
- **Output:** `wp-content/plugins/artkey-editor/build/artkey-editor.js` + `.css`
- **Component:** Full ArtKey Editor with all 32 templates, customization, uploads

### **Design Editor Bundle**
- **Entry:** `wp-build/design-editor/index.js`
- **Output:** `wp-content/plugins/artkey-design-editor/build/design-editor.js` + `.css`
- **Component:** Product customization editor

---

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Build for Production**
```bash
npm run build:wordpress
```

This builds both bundles with:
- ✅ Tailwind CSS compiled and included
- ✅ Brand colors and fonts
- ✅ All React components bundled
- ✅ Optimized for production

### **3. Build Individual Bundles**
```bash
# Build only ArtKey Editor
npm run build:wordpress:artkey

# Build only Design Editor
npm run build:wordpress:design
```

### **4. Development Mode (Watch)**
```bash
npm run build:wordpress:dev
```

This watches for changes and rebuilds automatically.

---

## 📁 **File Structure**

```
wp-build/
├── artkey-editor/
│   ├── index.js          # Entry point
│   ├── ArtKeyEditorWP.jsx  # WordPress component
│   └── styles.css        # Tailwind imports
├── design-editor/
│   ├── index.js          # Entry point
│   ├── DesignEditorWP.jsx   # WordPress component
│   └── styles.css        # Tailwind imports
└── tailwind.config.js    # Tailwind config for WordPress

wp-content/plugins/
├── artkey-editor/
│   └── build/
│       ├── artkey-editor.js    # Built bundle
│       └── artkey-editor.css   # Compiled CSS
└── artkey-design-editor/
    └── build/
        ├── design-editor.js    # Built bundle
        └── design-editor.css   # Compiled CSS
```

---

## ⚙️ **Build Configuration**

### **Webpack Config** (`webpack.wordpress.config.js`)

- **Mode:** Production (optimized) or Development (source maps)
- **Entry Points:** Separate for each plugin
- **Output:** Plugin-specific `build/` folders
- **Loaders:**
  - Babel (JSX/TypeScript → JavaScript)
  - PostCSS + Tailwind CSS
  - CSS extraction to separate files
- **Externals:** React and ReactDOM (loaded by WordPress)

---

## 🎨 **Styling**

### **Tailwind CSS**
- ✅ Fully compiled and included in bundles
- ✅ Brand colors (`brand-lightest`, `brand-medium`, etc.)
- ✅ Custom fonts (Playfair Display, Nunito Sans)
- ✅ All utility classes available

### **Custom Styles**
- ✅ Animations (pulse, fade-in, slide-in)
- ✅ Professional shadows and borders
- ✅ Glass effects
- ✅ Responsive design

---

## 📦 **What's Included in Bundles**

### **ArtKey Editor Bundle**
- ✅ All 32 templates
- ✅ Color palettes (solid, gradients)
- ✅ Image/video uploads
- ✅ Custom links
- ✅ Spotify integration
- ✅ Guestbook settings
- ✅ Gallery features
- ✅ Live preview (mobile/desktop)
- ✅ Full customization options

### **Design Editor Bundle**
- ✅ Product customization
- ✅ Size/material options
- ✅ Image uploads
- ✅ Design tools

---

## 🔧 **WordPress Integration**

### **1. Enqueue Scripts in Plugin**

In your WordPress plugin PHP file:

```php
function enqueue_artkey_editor() {
    wp_enqueue_script(
        'react',
        'https://unpkg.com/react@18/umd/react.production.min.js',
        [],
        '18.0.0',
        true
    );
    wp_enqueue_script(
        'react-dom',
        'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
        ['react'],
        '18.0.0',
        true
    );
    
    wp_enqueue_script(
        'artkey-editor',
        plugin_dir_url(__FILE__) . 'build/artkey-editor.js',
        ['react', 'react-dom'],
        '1.0.0',
        true
    );
    
    wp_enqueue_style(
        'artkey-editor',
        plugin_dir_url(__FILE__) . 'build/artkey-editor.css',
        [],
        '1.0.0'
    );
    
    // Localize script with REST API URLs
    wp_localize_script('artkey-editor', 'ArtKeyEditor', [
        'rest' => [
            'save' => rest_url('artkey/v1/save'),
            'get' => rest_url('artkey/v1/get'),
            'upload' => rest_url('artkey/v1/upload'),
        ],
        'nonce' => wp_create_nonce('wp_rest'),
        'siteUrl' => home_url(),
    ]);
}
add_action('wp_enqueue_scripts', 'enqueue_artkey_editor');
```

### **2. Add Root Element**

In your WordPress template or shortcode:

```php
<div id="artkey-editor-root" data-artkey-id="<?php echo esc_attr($artkey_id); ?>"></div>
```

---

## 🎯 **Matching Netlify Appearance**

### **✅ What Matches:**
- ✅ All Tailwind classes
- ✅ Brand colors
- ✅ Fonts (Playfair Display, Nunito Sans)
- ✅ Component structure
- ✅ Animations and transitions
- ✅ Responsive design

### **⚠️ Differences:**
- Uses WordPress REST API instead of Next.js API routes
- React loaded from CDN (not bundled)
- No Next.js routing (uses WordPress URLs)

---

## 🐛 **Troubleshooting**

### **Build Errors**

**Error: Cannot find module**
```bash
npm install
```

**Error: Tailwind not compiling**
- Check `wp-build/tailwind.config.js` exists
- Verify `content` paths include `wp-build/**/*.{js,jsx}`

**Error: React not found**
- React is external (loaded by WordPress)
- Make sure WordPress enqueues React first

### **Runtime Errors**

**Error: ArtKeyEditor is not defined**
- Check script is enqueued correctly
- Verify `wp_localize_script` is called
- Check browser console for errors

**Error: REST API 401/403**
- Check nonce is correct
- Verify user permissions
- Check REST API endpoints exist

---

## 📝 **Next Steps**

1. **Build the bundles:**
   ```bash
   npm run build:wordpress
   ```

2. **Upload to WordPress:**
   - Copy `wp-content/plugins/artkey-editor/build/` to your WordPress plugin
   - Copy `wp-content/plugins/artkey-design-editor/build/` to your WordPress plugin

3. **Enqueue in WordPress:**
   - Add enqueue functions to plugin PHP files
   - Add root elements where needed

4. **Test:**
   - Verify React loads
   - Test REST API endpoints
   - Check styling matches Netlify version

---

## 🎉 **Success!**

Your WordPress plugins now have React bundles that:
- ✅ Look exactly like the Netlify version
- ✅ Include all Tailwind CSS styling
- ✅ Have all the same features
- ✅ Work with WordPress REST API

---

**Need help?** Check the WordPress plugin PHP files for integration examples!

