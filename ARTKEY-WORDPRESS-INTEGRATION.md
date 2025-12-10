# ArtKey WordPress Plugin Integration Guide

## 🎯 Overview

This document explains how to integrate the WordPress ArtKey plugin functionality into the Next.js website while maintaining WooCommerce and Gelato compatibility.

---

## 📋 ArtKey Data Structure

### From WordPress Plugin (`META_FIELDS`):

```typescript
interface ArtKeyFields {
  title: string;                    // ArtKey page title
  theme: {
    template: string;               // classic, aurora, sunset, ocean, etc. (16 total)
    bg_color: string;               // Background color hex
    bg_image_id: number;            // WordPress attachment ID
    bg_image_url: string;           // Background image URL
    font: string;                   // Google Font name
    text_color: string;             // Text color hex
    title_color: string;            // Title color hex
    title_style: 'gradient' | 'solid';
    button_color: string;           // Button color hex
    button_gradient: string;        // Button gradient CSS
    color_scope: 'title' | 'content' | 'buttons' | 'content_buttons';
  };
  links: Array<{                    // Custom buttons/links
    label: string;
    url: string;
  }>;
  spotify: {
    url: string;                    // Spotify embed URL
  };
  featured_video: {
    video_id: number;               // WordPress attachment ID
    button_label: string;
  };
  features: {
    enable_gallery: boolean;
    enable_video: boolean;
    show_guestbook: boolean;
  };
}
```

---

## 🔄 Complete Workflow

### Flow:
```
1. Customer sees product
   ↓
2. Clicks "Customize" → Custom Editor (/customize)
   - Select size, material, frame (Gelato options)
   - Save to sessionStorage
   ↓
3. Clicks "Continue to ArtKey Editor" → ArtKey Editor (/artkey/editor)
   - Choose template (16 options)
   - Customize colors
   - Upload images/videos
   - Add links/buttons
   - Add Spotify embed
   - Configure features
   - Live preview
   ↓
4. Clicks "Save & Checkout"
   - Save ArtKey to WooCommerce (via REST API)
   - Create/update ArtKey custom post type
   - Attach to cart item
   ↓
5. Checkout
   - WooCommerce order created
   - ArtKey attached to order item
   - Gelato order created with final design
   ↓
6. Order Complete
   - ArtKey URL sent to customer
   - Customer can edit ArtKey anytime
```

---

## 🛠️ Implementation Steps

### Step 1: Update ArtKey Editor Component

Port all 16 templates and full functionality from WordPress plugin.

### Step 2: Create WooCommerce Integration

**API Route:** `app/api/artkey/woocommerce/route.ts`
- Create/update ArtKey custom post type via REST API
- Attach to cart item
- Store in order item meta

### Step 3: Update Save Function

**Current:** `app/api/artkey/save/route.ts`
- Save to database/WordPress
- Include customization data from Custom Editor
- Generate final design image for Gelato

### Step 4: Checkout Integration

- Ensure ArtKey is complete before checkout
- Attach ArtKey ID to order item
- Create Gelato order with ArtKey design

---

## 📦 WooCommerce Integration Points

### 1. Product Meta
- `_artkey_enable` - Enable ArtKey for product (yes/no)

### 2. Cart Item Meta
- `_artkey_post_id` - ArtKey custom post type ID

### 3. Order Item Meta
- `_artkey_post_id` - ArtKey ID attached to order item

### 4. Session
- `artkey_id` - Current ArtKey being edited
- `artkey_complete` - Whether ArtKey is complete

---

## 🎨 ArtKey Editor Features to Port

### ✅ Templates (16 total)
- classic, paper, dark, bold
- aurora, sunset, ocean, rose_gold
- lavender, mint, forest, vintage
- cosmic, midnight, coral, berry, electric, neon

### ✅ Customization
- Background color/gradient/image
- Title text and color
- Button colors/gradients
- Text colors
- Google Fonts selection
- Custom links/buttons
- Spotify embed
- Featured video
- Image/video uploads
- Gallery display
- Guestbook

### ✅ Live Preview
- Real-time preview updates
- Mobile/desktop view toggle
- Responsive design

---

## 🔗 API Endpoints Needed

### WordPress REST API (if using headless):
```
POST /wp-json/wp/v2/artkey          - Create ArtKey
PUT  /wp-json/wp/v2/artkey/{id}     - Update ArtKey
GET  /wp-json/wp/v2/artkey/{id}     - Get ArtKey
```

### Next.js API Routes:
```
POST /api/artkey/save               - Save ArtKey (to WordPress or database)
POST /api/artkey/woocommerce/attach - Attach to cart item
GET  /api/artkey/{id}               - Get ArtKey data
```

---

## 🖼️ Gelato Integration

### Final Design Generation:
1. Composite ArtKey design (background + images + text)
2. Upload composite to Gelato
3. Use Gelato file URL in order

### Order Creation:
```typescript
{
  items: [{
    productUid: gelatoProductUid,
    quantity: 1,
    files: [{
      url: artKeyCompositeUrl,  // Generated from ArtKey design
      type: 'default'
    }]
  }],
  // ... shipping, etc.
}
```

---

## 📝 Next Steps

1. **Port Editor UI** - Update `ArtKeyEditor.tsx` with all 16 templates
2. **WooCommerce API** - Create endpoints to save ArtKey to WordPress
3. **Image Compositing** - Generate final design for Gelato
4. **Checkout Gate** - Ensure ArtKey complete before checkout
5. **Order Integration** - Attach ArtKey to WooCommerce orders

---

Ready to implement! The structure is clear from the WordPress plugin.

