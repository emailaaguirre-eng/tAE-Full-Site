# WordPress Plugins Installation Guide
## Complete Setup for ArtKey Editor, Design Editor, and QR Generator

---

## 📦 **What You're Installing**

### 1. **ArtKey Editor Plugin** ✅
- Complete ArtKey editor with 16 templates
- Image/video uploads
- Color customization
- Shareable URL generation
- WooCommerce integration

### 2. **ArtKey Design Editor Plugin** ✅ (NEW)
- Product customization (size, material, frame)
- Price calculation
- Gelato integration
- WooCommerce cart integration

### 3. **ArtKey QR Code Generator Plugin** ✅ (NEW)
- Standalone QR code generation
- Works with ArtKey Editor
- REST API endpoints
- Auto-generates QR codes for orders

---

## 🚀 **Installation Steps**

### Step 1: Upload Plugins to WordPress

**Via FTP/cPanel File Manager:**

1. **Navigate to WordPress plugins directory:**
   ```
   /wp-content/plugins/
   ```

2. **Upload these folders:**
   - `wp-content/plugins/artkey-editor/` → WordPress `/wp-content/plugins/artkey-editor/`
   - `wp-content/plugins/artkey-design-editor/` → WordPress `/wp-content/plugins/artkey-design-editor/`
   - `wp-content/plugins/artkey-qr-generator/` → WordPress `/wp-content/plugins/artkey-qr-generator/`
   - `wp-content/plugins/artkey-hover/` → WordPress `/wp-content/plugins/artkey-hover/`
   - `wp-content/plugins/artkey-cors/` → WordPress `/wp-content/plugins/artkey-cors/`

3. **Verify file structure:**
   ```
   wp-content/plugins/
   ├── artkey-editor/
   │   ├── artkey-editor.php
   │   └── build/
   │       └── editor.js
   ├── artkey-design-editor/
   │   ├── artkey-design-editor.php
   │   └── build/
   │       └── design-editor.js
   ├── artkey-qr-generator/
   │   └── artkey-qr-generator.php
   ├── artkey-hover/
   │   └── artkey-hover.php
   └── artkey-cors/
       └── artkey-cors.php
   ```

---

### Step 2: Install QR Code Library

**Option A: Via Composer (Recommended)**

1. **SSH into your server** or use cPanel Terminal

2. **Navigate to QR generator plugin:**
   ```bash
   cd wp-content/plugins/artkey-qr-generator
   ```

3. **Install Composer (if not installed):**
   ```bash
   curl -sS https://getcomposer.org/installer | php
   ```

4. **Install QR code library:**
   ```bash
   php composer.phar require endroid/qr-code
   ```
   Or if composer is global:
   ```bash
   composer require endroid/qr-code
   ```

**Option B: Via cPanel**

1. **Go to cPanel → Terminal** (or SSH)

2. **Navigate to plugin directory:**
   ```bash
   cd public_html/wp-content/plugins/artkey-qr-generator
   ```

3. **Install via Composer:**
   ```bash
   composer require endroid/qr-code
   ```

**Option C: Manual Installation**

If Composer isn't available, you can:
1. Download `endroid/qr-code` from Packagist
2. Extract to `wp-content/plugins/artkey-qr-generator/vendor/`
3. Ensure autoloader is set up

---

### Step 3: Activate Plugins

1. **Go to WordPress Admin:**
   ```
   https://your-site.com/wp-admin
   ```

2. **Navigate to Plugins:**
   - Click **Plugins** → **Installed Plugins**

3. **Activate all plugins:**
   - ✅ **ArtKey Editor**
   - ✅ **ArtKey Design Editor**
   - ✅ **ArtKey QR Code Generator**
   - ✅ **ArtKey Hover**
   - ✅ **ArtKey CORS Headers**

---

### Step 4: Configure Plugins

#### A. Set Permalinks

1. Go to **Settings → Permalinks**
2. Select **"Post name"**
3. Click **"Save Changes"**

#### B. Update CORS Origins

1. Edit: `wp-content/plugins/artkey-cors/artkey-cors.php`
2. Update allowed origins:
   ```php
   $allowed_origins = [
       'https://your-nextjs-site.vercel.app',
       'https://your-wordpress-site.com',
   ];
   ```

#### C. Verify QR Code Generator

1. Go to **Settings → ArtKey QR Generator**
2. Check if library is installed
3. Test QR generation using the test form

---

## ✅ **Verification**

### Test ArtKey Editor

1. **Create a test page:**
   - Pages → Add New
   - Add shortcode: `[artkey_editor]`
   - Publish

2. **Visit the page** - Editor should load

### Test Design Editor

1. **On a WooCommerce product page:**
   - Add shortcode: `[artkey_design_editor product_id="123"]`
   - Or it auto-loads on product pages

2. **Test customization:**
   - Select size, material, frame
   - Price should calculate automatically

### Test QR Generator

1. **Go to Settings → ArtKey QR Generator**
2. **Enter a test URL**
3. **Click "Generate QR Code"**
4. **QR code should appear**

---

## 🔧 **Plugin Features**

### ArtKey Editor Plugin

**Features:**
- ✅ 16 template options
- ✅ Color customization (background, title, buttons)
- ✅ Image/video uploads
- ✅ Custom links/buttons
- ✅ Spotify embed
- ✅ Gallery and guestbook
- ✅ Shareable URL generation
- ✅ WooCommerce integration

**Shortcode:**
```
[artkey_editor id="123"]
```

**REST API:**
- `POST /wp-json/artkey/v1/save` - Save ArtKey
- `GET /wp-json/artkey/v1/get/{id}` - Get ArtKey
- `GET /wp-json/artkey/v1/token/{token}` - Get by token
- `POST /wp-json/artkey/v1/upload` - Upload image

---

### ArtKey Design Editor Plugin

**Features:**
- ✅ Product size selection
- ✅ Material options
- ✅ Frame selection
- ✅ Price calculation
- ✅ Quantity selection
- ✅ Cart integration
- ✅ Order attachment

**Shortcode:**
```
[artkey_design_editor product_id="123" product_type="print"]
```

**REST API:**
- `GET /wp-json/artkey-design/v1/options/{product_id}` - Get options
- `POST /wp-json/artkey-design/v1/save` - Save design
- `POST /wp-json/artkey-design/v1/calculate-price` - Calculate price

---

### ArtKey QR Generator Plugin

**Features:**
- ✅ Generate QR for any URL
- ✅ Generate QR for ArtKey tokens
- ✅ Auto-generate on order creation
- ✅ Admin test interface
- ✅ REST API endpoints

**REST API:**
- `POST /wp-json/artkey-qr/v1/generate` - Generate QR
- `GET /wp-json/artkey-qr/v1/artkey/{token}` - QR for ArtKey
- `GET /wp-json/artkey-qr/v1/url?url=...` - QR for URL

---

## 🔄 **How They Work Together**

### Complete Customer Flow:

```
1. Customer views product
   ↓
2. Clicks "Customize" → Design Editor opens
   ↓
3. Selects size, material, frame → Price calculated
   ↓
4. Clicks "Continue to ArtKey Editor" → ArtKey Editor opens
   ↓
5. Chooses template, customizes, uploads images
   ↓
6. Clicks "Save & Checkout"
   ↓
7. Design + ArtKey saved to WordPress
   ↓
8. QR code auto-generated for ArtKey URL
   ↓
9. Order created in WooCommerce
   ↓
10. Customer receives ArtKey URL + QR code
```

---

## 📋 **Troubleshooting**

### QR Code Not Generating

**Problem:** "QR code library not found"

**Solution:**
1. Install Composer in cPanel
2. Run: `composer require endroid/qr-code` in plugin directory
3. Check `vendor/` folder exists

### Design Editor Not Showing

**Problem:** Editor doesn't appear on product page

**Solution:**
1. Check shortcode is added: `[artkey_design_editor]`
2. Verify plugin is activated
3. Check browser console for errors
4. Ensure `build/design-editor.js` exists

### ArtKey Editor Not Saving

**Problem:** ArtKey doesn't save

**Solution:**
1. Check REST API is accessible: `/wp-json`
2. Verify permalinks are set to "Post name"
3. Check user has `edit_posts` capability
4. Check browser console for errors

---

## 🎯 **Next Steps**

After installation:

1. ✅ Test all three plugins
2. ✅ Configure product pages with shortcodes
3. ✅ Set up WooCommerce products
4. ✅ Test complete customization flow
5. ✅ Verify QR codes generate correctly

---

## 📚 **Documentation**

- **ArtKey Editor:** See plugin admin page for API docs
- **Design Editor:** WooCommerce → Design Editor settings
- **QR Generator:** Settings → ArtKey QR Generator

---

**All plugins are ready to use!** 🚀

