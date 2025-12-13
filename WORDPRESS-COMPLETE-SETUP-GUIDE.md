# Complete WordPress Setup Guide
## Making Everything Functional & Matching Netlify

---

## 🎯 **Goal**
Make WordPress plugins fully functional with the same appearance and features as the Netlify site.

---

## ✅ **What's Already Done**

1. ✅ Build system (webpack, Tailwind CSS)
2. ✅ WordPress color palette integrated
3. ✅ Basic component skeletons
4. ✅ WordPress REST API endpoints
5. ✅ Bundle files created

---

## ⚠️ **What Needs to Be Done**

### **1. Complete ArtKeyEditorWP Component** 
**Status:** Skeleton only (395 lines)  
**Needs:** Full UI from Next.js version (1900 lines)

**Missing Features:**
- Full color pickers (title, button, background - 4 pages each)
- Background tabs (solid, stock photos, upload)
- Feature toggles with drag-and-drop reordering
- Custom links section
- Spotify integration
- Media gallery (image/video uploads)
- Settings panels (guestbook, gallery, video)
- Full preview (mobile/desktop with all buttons)
- ArtKey selector modal
- All 40 templates (currently only 32 in skeleton)

### **2. Add Gelato API Key Support**
**Status:** Not configured  
**Needs:** WordPress option + pass to React component

### **3. Update Design Editor Component**
**Status:** Basic version  
**Needs:** Full size/material/frame options UI

### **4. Rebuild Bundles**
**Status:** Built with skeleton  
**Needs:** Rebuild with complete components

---

## 📋 **Step-by-Step Implementation**

### **Step 1: Complete ArtKeyEditorWP Component**

**File:** `wp-build/artkey-editor/ArtKeyEditorWP.jsx`

**What to Copy from `components/ArtKeyEditor.tsx`:**
1. All 40 templates (including Arizona sports teams)
2. Complete color palettes (4 pages each)
3. Stock background images (24 images, 4 pages)
4. Font list
5. Feature definitions with drag-and-drop
6. All handler functions
7. Complete UI sections (Steps 1-7)
8. Full preview component
9. ArtKey selector integration

**Adaptations Needed:**
- Replace `useSearchParams()` with `URLSearchParams`
- Replace `useRouter()` with `window.location`
- Replace Next.js API calls (`/api/...`) with WordPress REST API
- Remove Next.js-specific imports
- Keep WordPress REST API integration

### **Step 2: Add Gelato API Key**

**File:** `wp-content/plugins/artkey-design-editor/artkey-design-editor.php`

**Add:**
```php
// Admin settings
add_action('admin_init', function() {
    register_setting('artkey_design_settings', 'artkey_gelato_api_key');
});

// Add admin menu
add_action('admin_menu', function() {
    add_options_page(
        'ArtKey Design Settings',
        'ArtKey Design',
        'manage_options',
        'artkey-design-settings',
        'artkey_design_settings_page'
    );
});

function artkey_design_settings_page() {
    ?>
    <div class="wrap">
        <h1>ArtKey Design Editor Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('artkey_design_settings'); ?>
            <table class="form-table">
                <tr>
                    <th><label for="artkey_gelato_api_key">Gelato API Key</label></th>
                    <td>
                        <input type="text" id="artkey_gelato_api_key" 
                               name="artkey_gelato_api_key" 
                               value="<?php echo esc_attr(get_option('artkey_gelato_api_key')); ?>" 
                               class="regular-text" />
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// Pass to React component
wp_localize_script('design-editor', 'DesignEditor', [
    'gelatoApiKey' => get_option('artkey_gelato_api_key', ''),
    // ... other data
]);
```

### **Step 3: Update Design Editor Component**

**File:** `wp-build/design-editor/DesignEditorWP.jsx`

**Add:**
- Size selection UI
- Material selection UI
- Frame options UI
- Gelato SDK integration
- Product preview

### **Step 4: Rebuild Bundles**

```bash
npm run build:wordpress
```

### **Step 5: Test & Verify**

1. Upload bundles to WordPress
2. Test all features
3. Verify colors match
4. Verify all buttons work
5. Test Gelato integration

---

## 🚀 **Quick Implementation Options**

### **Option A: I Complete It For You** (Recommended)
I can:
1. Complete the full ArtKeyEditorWP component
2. Add Gelato API key support
3. Update Design Editor
4. Rebuild bundles
5. Create final documentation

**Time:** ~30 minutes of work

### **Option B: You Do It Step-by-Step**
Follow the guide above, copying sections from Next.js component

**Time:** ~2-3 hours

---

## 📝 **Files That Will Be Updated**

1. `wp-build/artkey-editor/ArtKeyEditorWP.jsx` - Complete rewrite
2. `wp-content/plugins/artkey-design-editor/artkey-design-editor.php` - Add Gelato API key
3. `wp-build/design-editor/DesignEditorWP.jsx` - Enhance with full features
4. Rebuild bundles

---

## ✅ **Final Result**

Once complete, you'll have:
- ✅ Full ArtKey Editor (all 40 templates, all features)
- ✅ Same layout as Netlify
- ✅ All buttons working
- ✅ WordPress color palette
- ✅ Gelato integration
- ✅ Complete functionality

---

**Would you like me to complete this for you?** I can build the full component now!

