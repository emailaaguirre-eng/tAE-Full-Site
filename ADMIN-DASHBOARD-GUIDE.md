# Admin Dashboard Guide
## User-Friendly Product Management for Business Owners

This guide explains how to use the admin dashboard to manage your products and store.

---

## 🚀 Quick Start

### Accessing the Admin Dashboard

1. **Navigate to Admin:**
   - Go to: `http://localhost:3000/admin` (development)
   - Or: `https://yourdomain.com/admin` (production)

2. **No Login Required (Yet):**
   - Currently, the admin is open for development
   - **Important:** Add authentication before going to production!

---

## 📦 Adding Products

### Step-by-Step Guide

1. **From Dashboard:**
   - Click **"➕ Add New Product"** button
   - Or go to **Products** tab → **"➕ Add New Product"**

2. **Follow the 4-Step Wizard:**

   **Step 1: Basic Information**
   - Enter product name (required)
   - Add short description (shown in listings)
   - Add full description (product page)
   - Set SKU (optional, for inventory)
   - Choose product type (Simple, Variable, or Grouped)

   **Step 2: Pricing & Inventory**
   - Set regular price (required)
   - Set sale price (optional, for discounts)
   - Choose stock status (In Stock, Out of Stock, On Backorder)
   - Enable stock management (if you want to track quantities)

   **Step 3: Images**
   - Click **"Choose Images"** to upload
   - Upload multiple images (first image is the main product image)
   - Images are automatically uploaded to Gelato storage
   - Drag to reorder (coming soon)

   **Step 4: Review & Publish**
   - Review all product information
   - Choose to **Save as Draft** or **Publish Now**
   - Click **"✅ Create Product"**

3. **Success!**
   - Product is created in WooCommerce
   - You'll see a success message
   - Product appears in your products list

---

## 📋 Managing Products

### View All Products

1. Go to **Products** tab in admin dashboard
2. Use filters:
   - **All Products** - See everything
   - **Published** - Only live products
   - **Drafts** - Products not yet published

### Edit Product

1. Find product in the list
2. Click **"✏️ Edit"** button
3. Make changes
4. Save updates

### Delete Product

1. Find product in the list
2. Click **"🗑️"** (trash) button
3. Confirm deletion
4. Product is permanently removed

---

## 🎨 Product Best Practices

### Product Names
- ✅ **Good:** "Custom Photo Print - 8x10"
- ✅ **Good:** "Holiday Card Set - Premium"
- ❌ **Bad:** "Product 1" or "New Item"

### Descriptions
- **Short Description:** 1-2 sentences (shown in product listings)
- **Full Description:** Detailed info (shown on product page)
- Include: Size, material, customization options

### Images
- **Main Image:** High quality, shows product clearly
- **Additional Images:** Different angles, use cases
- **Format:** JPG or PNG
- **Size:** Recommended 1000x1000px or larger

### Pricing
- Set realistic prices
- Use sale prices for promotions
- Consider shipping costs

---

## 📊 Dashboard Overview

The dashboard shows:

- **Total Products** - All products in your store
- **Total Orders** - All orders received
- **Total Revenue** - Money earned
- **Pending Orders** - Orders awaiting fulfillment

### Quick Actions

- **➕ Add New Product** - Create a product
- **📦 Manage Products** - Edit/delete products
- **🛒 View Orders** - Check order status

---

## ⚙️ Settings

### API Configuration

Your WooCommerce and Gelato API keys are configured in:
- `.env.local` file (development)
- Environment variables (production)

**See:** `WOOCOMMERCE-REST-API-SETUP.md` for details

---

## 🔒 Security (Important!)

### Before Going to Production:

1. **Add Authentication:**
   - Install NextAuth.js or similar
   - Protect `/admin` routes
   - Require login to access

2. **Environment Variables:**
   - Never commit `.env.local` to Git
   - Use secure API keys
   - Rotate keys regularly

3. **Access Control:**
   - Limit admin access to authorized users
   - Log admin actions
   - Monitor for suspicious activity

---

## 🐛 Troubleshooting

### "WooCommerce API not configured"

**Solution:**
1. Check `.env.local` file exists
2. Verify API keys are correct
3. Restart dev server after adding keys
4. See `WOOCOMMERCE-REST-API-SETUP.md`

### "Failed to create product"

**Solution:**
1. Check all required fields are filled
2. Verify WooCommerce API is working
3. Check browser console for errors
4. Try again with simpler product data

### "Images not uploading"

**Solution:**
1. Check Gelato API key is configured
2. Verify image file size (under 10MB)
3. Check image format (JPG/PNG)
4. Try uploading one image at a time

### Products not showing

**Solution:**
1. Check product status (Published vs Draft)
2. Refresh the page
3. Check WooCommerce connection
4. Verify products exist in WooCommerce

---

## 📱 Mobile-Friendly

The admin dashboard is fully responsive:
- ✅ Works on desktop
- ✅ Works on tablet
- ✅ Works on mobile

---

## 🎯 Tips for Success

1. **Start Simple:**
   - Add a few test products first
   - Get familiar with the interface
   - Then add your full catalog

2. **Use Drafts:**
   - Create products as drafts
   - Review and edit before publishing
   - Publish when ready

3. **Organize with SKUs:**
   - Use consistent SKU format
   - Example: `PRINT-8X10`, `CARD-HOLIDAY`
   - Helps with inventory management

4. **Quality Images:**
   - Good images = more sales
   - Use high-resolution photos
   - Show product from multiple angles

5. **Clear Descriptions:**
   - Help customers understand products
   - Include size, material, options
   - Answer common questions

---

## 🚀 Next Steps

1. **Add Authentication** (Priority 1)
2. **Product Categories** - Organize products
3. **Bulk Import** - Import products from CSV
4. **Order Management** - View and manage orders
5. **Analytics** - Track sales and performance

---

## 📞 Need Help?

- **WooCommerce Setup:** See `WOOCOMMERCE-REST-API-SETUP.md`
- **Gelato Integration:** See `GELATO-API-INTEGRATION-GUIDE.md`
- **Technical Issues:** Check browser console for errors

---

**Your admin dashboard is ready to use! Start adding products and building your store!** 🎉

