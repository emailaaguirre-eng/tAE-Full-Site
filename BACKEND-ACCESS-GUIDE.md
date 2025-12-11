# Backend Access Guide
## How to Update Photos and Content on Your Website

---

## 🚀 **Quick Access**

### Step 1: Start Your Dev Server (if local)

```bash
npm run dev
```

### Step 2: Go to Admin Login

**Development:**
```
http://localhost:3000/admin
```

**Production (Netlify):**
```
https://your-site.netlify.app/admin
```

### Step 3: Login

You'll be redirected to `/admin/login`. Enter your credentials:

**Default (Development Only):**
- Username: `admin`
- Password: `admin123`

**⚠️ Important:** Set your own credentials in `.env.local`:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
NEXTAUTH_SECRET=your_random_secret
```

---

## 📸 **How to Update Photos**

### Option 1: Via Next.js Admin (Recommended)

**For Product Images:**

1. **Go to Admin Dashboard:**
   - Navigate to: `/admin`
   - Click **"➕ Add New Product"** or go to **Products** tab

2. **Upload Images:**
   - In Step 3 of product creation, click **"Choose Images"**
   - Select images from your computer
   - Images upload automatically to WordPress Media Library
   - First image becomes the main product image

3. **Edit Existing Product Images:**
   - Go to `/admin/products`
   - Find your product
   - Click edit (if available)
   - Update images in the product form

### Option 2: Via WordPress Admin (Direct)

**For All Images (Media Library):**

1. **Access WordPress Admin:**
   ```
   https://theartfulexperience.com/wp-admin
   ```

2. **Upload to Media Library:**
   - Go to **Media → Add New**
   - Drag and drop images or click "Select Files"
   - Images are stored in WordPress Media Library

3. **Use Images:**
   - Copy the image URL from Media Library
   - Use in products, pages, or anywhere on the site
   - Images are accessible via: `/api/wordpress/media`

### Option 3: Via API (For Developers)

**Upload via API Route:**
```typescript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/api/upload/image?backend=wordpress', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
console.log(data.url); // WordPress image URL
```

---

## 📝 **How to Update Content**

### Option 1: Via Next.js Admin

**For Product Content:**

1. **Go to Admin Dashboard:**
   - `/admin` → **Products** tab
   - Click **"➕ Add New Product"** or edit existing

2. **Update Content:**
   - **Step 1:** Name, description, SKU
   - **Step 2:** Price, stock status
   - **Step 3:** Images
   - **Step 4:** Review and publish

**For ArtKey Configuration:**

1. **Go to ArtKey Config:**
   - `/admin/artkey-config`

2. **Update Product Information:**
   - Enter Product ID
   - Click "Load Configuration"
   - Update:
     - Product description
     - Price
     - Category
     - Image URL
     - ArtKey content (title, colors, templates)
   - Click "Save Configuration"

### Option 2: Via WordPress Admin

**For Blog Posts, Pages, and General Content:**

1. **Access WordPress Admin:**
   ```
   https://theartfulexperience.com/wp-admin
   ```

2. **Update Content:**
   - **Posts:** Posts → All Posts → Edit
   - **Pages:** Pages → All Pages → Edit
   - **Products:** Products → All Products → Edit
   - **Media:** Media → Library

3. **Content Types:**
   - **Blog Posts:** `/wp-admin/edit.php`
   - **Pages:** `/wp-admin/edit.php?post_type=page`
   - **Products:** `/wp-admin/edit.php?post_type=product`
   - **Media:** `/wp-admin/upload.php`

### Option 3: Via WordPress REST API

**For Programmatic Updates:**

Your Next.js site automatically pulls content from WordPress via REST API:

- **Posts:** `https://your-site.com/wp-json/wp/v2/posts`
- **Pages:** `https://your-site.com/wp-json/wp/v2/pages`
- **Media:** `https://your-site.com/wp-json/wp/v2/media`
- **Products:** `https://your-site.com/wp-json/wc/store/v1/products`

**No code needed** - content updates automatically when you change it in WordPress!

---

## 🎯 **What You Can Update Where**

### ✅ **Next.js Admin (`/admin`)**

- Product information (name, description, price)
- Product images
- ArtKey configurations
- Product inventory
- ArtKey hover settings

### ✅ **WordPress Admin (`/wp-admin`)**

- Blog posts
- Pages content
- Media library (all images)
- WooCommerce products (full control)
- Categories and tags
- Site settings

### ✅ **Direct File Editing**

- Website design/styling: Edit component files
- Static content: Edit component files directly
- Images: Add to `public/images/` folder

---

## 📋 **Step-by-Step: Common Tasks**

### Task 1: Add a New Product with Images

1. Go to: `/admin`
2. Login (if not already)
3. Click **"➕ Add New Product"**
4. Fill out:
   - **Step 1:** Name, description
   - **Step 2:** Price
   - **Step 3:** Upload images (click "Choose Images")
   - **Step 4:** Review and click "Create Product"
5. Product appears on website immediately!

### Task 2: Update Product Images

**Via Next.js Admin:**
1. Go to: `/admin/products`
2. Find product (or create new one)
3. Update images in product form

**Via WordPress:**
1. Go to: `https://theartfulexperience.com/wp-admin`
2. Products → All Products
3. Click on product
4. Scroll to "Product Image" section
5. Upload new images
6. Update

### Task 3: Update Website Text Content

**For Hero Section:**
- Currently pulls from WordPress page "home-settings"
- Or edit `components/Hero.tsx` directly

**For About Us:**
- Edit `components/AboutUs.tsx` directly
- Or create WordPress page and fetch via API

**For Other Sections:**
- Edit component files directly in `components/` folder
- Or use WordPress and fetch via API

### Task 4: Add Images to Gallery

**Option A: WordPress Media Library**
1. Go to WordPress Admin → Media → Add New
2. Upload images
3. Copy image URLs
4. Use in your components or products

**Option B: Direct Upload**
1. Use `/api/upload/image?backend=wordpress`
2. Get image URL
3. Use in your content

### Task 5: Update ArtKey Hover Information

1. Go to: `/admin/artkey-config`
2. Enter Product ID
3. Click "Load Configuration"
4. Update:
   - Product description
   - Price
   - Category
   - Image URL
   - ArtKey title, colors, template
5. Click "Save Configuration"

---

## 🔑 **Environment Variables Needed**

Create `.env.local` file:

```env
# Admin Authentication
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
NEXTAUTH_SECRET=your_random_secret

# WordPress (for content and images)
NEXT_PUBLIC_WORDPRESS_URL=https://theartfulexperience.com
WORDPRESS_USERNAME=your_wordpress_username
WORDPRESS_APP_PASSWORD=your_wordpress_app_password

# WooCommerce (for products)
NEXT_PUBLIC_WOOCOMMERCE_URL=https://theartfulexperience.com
WOOCOMMERCE_CONSUMER_KEY=your_key
WOOCOMMERCE_CONSUMER_SECRET=your_secret
```

---

## 🖼️ **Image Management Best Practices**

### Where Images Are Stored

1. **WordPress Media Library** (Recommended)
   - Centralized storage
   - Accessible via REST API
   - Easy to manage
   - URL: `https://your-site.com/wp-content/uploads/...`

2. **Gelato Storage** (For Print Products)
   - Used for print-on-demand products
   - Automatic via product upload

3. **Local `public/` Folder** (For Static Assets)
   - Logo, icons, static images
   - Path: `public/images/logo.png`
   - Access: `/images/logo.png`

### Image Upload Workflow

**Recommended:**
1. Upload to WordPress Media Library
2. Copy image URL
3. Use in products/content
4. Images accessible via `/api/wordpress/media`

---

## 📍 **Quick Reference URLs**

### Admin URLs

- **Main Admin:** `/admin`
- **Login:** `/admin/login`
- **Products:** `/admin/products`
- **Add Product:** `/admin/products/new`
- **ArtKey Config:** `/admin/artkey-config`

### WordPress URLs

- **WordPress Admin:** `https://theartfulexperience.com/wp-admin`
- **Media Library:** `https://theartfulexperience.com/wp-admin/upload.php`
- **Products:** `https://theartfulexperience.com/wp-admin/edit.php?post_type=product`
- **Posts:** `https://theartfulexperience.com/wp-admin/edit.php`
- **Pages:** `https://theartfulexperience.com/wp-admin/edit.php?post_type=page`

### API Endpoints

- **WordPress Media:** `/api/wordpress/media`
- **Upload Image:** `/api/upload/image?backend=wordpress`
- **Hero Content:** `/api/hero-content`
- **Products:** `/api/products`

---

## 🆘 **Troubleshooting**

### Can't Access Admin

1. **Check environment variables:**
   - Make sure `.env.local` exists
   - Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
   - Restart dev server after changing `.env.local`

2. **Default credentials:**
   - Username: `admin`
   - Password: `admin123`
   - (Only works if env vars not set)

### Images Not Uploading

1. **Check WordPress credentials:**
   - Verify `WORDPRESS_USERNAME` and `WORDPRESS_APP_PASSWORD` in `.env.local`
   - Get app password from WordPress: Users → Your Profile → Application Passwords

2. **Check file size:**
   - Max size: 10MB
   - Supported: JPG, PNG, GIF, WebP

### Content Not Updating

1. **WordPress content:**
   - Changes appear immediately via REST API
   - No cache clearing needed

2. **Next.js components:**
   - Edit files in `components/` folder
   - Changes appear after page refresh

---

## ✅ **Summary**

**To Update Photos:**
- ✅ Use `/admin` → Add/Edit Products → Upload images
- ✅ Or WordPress Admin → Media → Add New

**To Update Content:**
- ✅ Use `/admin` → Products/ArtKey Config
- ✅ Or WordPress Admin → Posts/Pages/Products
- ✅ Or edit component files directly

**Access:**
- ✅ Admin: `/admin` (requires login)
- ✅ WordPress: `/wp-admin` (WordPress login)

---

**Need help?** Check the other guides:
- `ADMIN-ACCESS-GUIDE.md` - Detailed admin features
- `ADMIN-AUTHENTICATION-SETUP.md` - Login setup
- `WORDPRESS-IMAGES-GUIDE.md` - Image access methods

