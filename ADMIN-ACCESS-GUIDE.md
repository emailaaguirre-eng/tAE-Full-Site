# Admin Access Guide
## How to Access Your Backend/Admin Panel

---

## 🔗 Admin URLs

### Main Admin Dashboard
```
http://localhost:3000/admin
```
**Or on Netlify:**
```
https://your-site.netlify.app/admin
```

### ArtKey Configuration (Mini ArtKey Hover Settings)
```
http://localhost:3000/admin/artkey-config
```
**Or on Netlify:**
```
https://your-site.netlify.app/admin/artkey-config
```

### Products Management
```
http://localhost:3000/admin/products
```

### Add New Product
```
http://localhost:3000/admin/products/new
```

---

## 🎯 What Each Admin Page Does

### 1. **Main Admin Dashboard** (`/admin`)
- Overview of your store
- Quick stats (products, orders, revenue)
- Quick actions (add product, manage products)
- Navigation to all admin sections

### 2. **ArtKey Configuration** (`/admin/artkey-config`)
- Configure mini ArtKey hover popups for products
- Set hotspot position (where the halo appears)
- Customize ArtKey content (title, colors, templates)
- Add product information (description, price, category)
- Enable/disable ArtKey for specific products

### 3. **Products Management** (`/admin/products`)
- View all products
- Edit existing products
- Delete products
- Filter products (all, published, drafts)

### 4. **Add New Product** (`/admin/products/new`)
- Step-by-step product creation wizard
- Upload product images
- Set pricing and inventory
- Publish products to WooCommerce

---

## 🚀 Quick Start

### Step 1: Start Your Dev Server

```bash
npm run dev
```

### Step 2: Set Environment Variables

Create `.env.local` file with:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
NEXTAUTH_SECRET=your_random_secret
```

See `ADMIN-AUTHENTICATION-SETUP.md` for details.

### Step 3: Open Admin Dashboard

Visit: **http://localhost:3000/admin**

You'll be redirected to the login page. Enter your credentials.

### Step 4: Configure ArtKey Hover

1. Go to: **http://localhost:3000/admin/artkey-config**
2. Enter Product ID
3. Configure hotspot position
4. Add product information
5. Customize ArtKey content
6. Click "Save Configuration"

---

## 📋 Admin Features

### ArtKey Configuration Page Features:

✅ **Product Selection**
- Enter Product ID to configure
- Load existing configuration
- Enable/disable ArtKey for product

✅ **Hotspot Position**
- Set X position (left/right)
- Set Y position (top/bottom)
- Adjust hotspot size
- Visual preview

✅ **Product Information**
- Product description
- Price
- Category
- Product image URL

✅ **ArtKey Content**
- Title
- Template selection
- Background color
- Title color
- Button color
- Custom links
- Feature toggles (gallery, guestbook, etc.)

---

## 🔒 Authentication (Now Required!)

**✅ Admin pages are now protected with authentication!**

**To access admin:**
1. Navigate to `/admin` or any `/admin/*` route
2. You'll be redirected to `/admin/login`
3. Enter your credentials (set in environment variables)
4. After login, you'll have access to all admin features

**Setup:**
- See `ADMIN-AUTHENTICATION-SETUP.md` for complete setup instructions
- Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`
- Set `NEXTAUTH_SECRET` for secure sessions

**Default Credentials (Development Only):**
- Username: `admin`
- Password: `admin123`

⚠️ **Change these defaults in production!**

---

## 💡 Tips

1. **Product IDs:**
   - Find product ID in WooCommerce admin
   - Or use the product ID from your products list

2. **Hotspot Position:**
   - Use percentages (e.g., "85%") for responsive
   - Use pixels (e.g., "100px") for fixed position
   - Default: bottom-right corner (85%, 85%)

3. **Product Information:**
   - Description appears in mini ArtKey header
   - Price shows in ArtKey preview
   - Category helps organize products

---

## 🎯 Common Tasks

### Configure ArtKey for a Product:

1. Go to `/admin/artkey-config`
2. Enter Product ID
3. Click "Load Configuration" (if exists)
4. Set hotspot position
5. Add product information
6. Customize ArtKey content
7. Click "Save Configuration"

### Add Product Information to Mini ArtKey:

1. Go to `/admin/artkey-config`
2. Enter Product ID
3. Scroll to "Product Information" section
4. Fill in:
   - Description
   - Price
   - Category
   - Image URL (optional)
5. Save configuration

---

## 📞 Quick Reference

**Main Admin:**
- URL: `/admin`
- Features: Dashboard, products, orders, settings

**ArtKey Config:**
- URL: `/admin/artkey-config`
- Features: Configure mini ArtKey hover popups

**Products:**
- URL: `/admin/products`
- Features: Manage all products

**Add Product:**
- URL: `/admin/products/new`
- Features: Create new products

---

**That's it!** Your admin panel is ready to use. 🚀

