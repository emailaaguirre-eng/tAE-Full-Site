# ArtKey Integration Guide
## WordPress to Next.js Migration with Gelato API

This guide explains how to integrate the WordPress ArtKey plugin functionality into the Next.js website with Gelato API.

---

## 🎯 Overview

**ArtKey Flow:**
1. Customer selects product (Cards/Prints)
2. Selects variations (size, material, frame, etc.)
3. Clicks **"Personalize with ArtKey"** button
4. Opens ArtKey Editor where they can:
   - Choose template/theme
   - Add custom title
   - Upload images/videos
   - Customize colors
   - Add text overlays
5. Save & Checkout
6. Design is sent to Gelato for printing
7. Order tracked in WooCommerce

---

## 📁 Current Structure

### Files Created:

1. **`app/artkey/editor/page.tsx`** - ArtKey editor page route
2. **`components/ArtKeyEditor.tsx`** - Main ArtKey editor component
3. **`app/api/artkey/save/route.ts`** - Save ArtKey data API
4. **Integration with `PrintsSection.tsx`** - "Personalize" button added
5. **Integration with `CardsSection.tsx`** - "Personalize" button added

---

## 🔄 WordPress Plugin Analysis

### Key Features from `woo-artkey-suite.php`:

#### 1. **Custom Post Type (CPT)**
- WordPress stores each ArtKey as a custom post
- **Next.js Equivalent:** Store in database table or as JSON in order meta

#### 2. **Editor Fields Structure**
```php
$fields = [
    'title' => 'Your ArtKey',
    'theme' => [
        'template' => 'classic',
        'bg_color' => '#F6F7FB',
        'bg_image_id' => 0,
        'bg_image_url' => '',
        'font' => 'system',
        'text_color' => '#111111',
        'title_color' => '#667eea',
        'button_color' => '#667eea',
        'button_gradient' => '',
    ],
    'links' => [], // Custom buttons
    'spotify' => ['url' => ''], // Spotify embed
    'featured_video' => ['video_id' => 0],
    'features' => [
        'enable_gallery' => true,
        'enable_video' => true,
        'show_guestbook' => true,
    ],
];
```

#### 3. **Templates Available** (16 total)
- classic, paper, dark, bold
- aurora, sunset, ocean, rose_gold
- forest, lavender, cosmic, vintage
- midnight, mint, coral, berry, electric, neon

#### 4. **Media Upload Flow**
- Images uploaded → Go to Gelato `/api/gelato/upload`
- Store Gelato file URL
- Associate with order

#### 5. **Checkout Gating**
- WordPress blocks checkout until ArtKey is complete
- **Next.js:** Check session/cart for ArtKey completion

---

## 🏗️ Implementation Steps

### Phase 1: Database Setup (Required)

You need to store ArtKey data. Choose one:

**Option A: MongoDB/PostgreSQL Table**
```sql
CREATE TABLE artkeys (
  id SERIAL PRIMARY KEY,
  cart_item_id VARCHAR(255),
  product_id INTEGER,
  title VARCHAR(255),
  theme JSONB,
  uploaded_images JSONB,
  uploaded_videos JSONB,
  customizations JSONB,
  gelato_file_urls JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Option B: Store in WooCommerce Order Meta**
- When order is created, attach ArtKey JSON to order item meta
- Query via WooCommerce REST API

### Phase 2: Enhanced ArtKey Editor

Expand `components/ArtKeyEditor.tsx` to include:

1. **All 16 Templates**
2. **Text Overlay Tools**
   - Add text layers
   - Font selection (Google Fonts)
   - Text positioning
   - Text effects (shadow, stroke, etc.)
3. **Image Manipulation**
   - Crop, rotate, resize
   - Filters (brightness, contrast, saturation)
   - Border/frame overlays
4. **Multiple Image Upload**
   - Drag & drop
   - Grid layout
   - Reorder images
5. **Preview Generation**
   - Canvas-based rendering
   - Export as PNG/PDF for Gelato

### Phase 3: Gelato Integration

Update `lib/gelato.ts` to handle ArtKey designs:

```typescript
// Generate composite image from ArtKey design
export async function generateArtKeyImage(artKeyData: ArtKeyData) {
  // Use canvas/sharp to composite:
  // 1. Background (color or image)
  // 2. Uploaded images (positioned)
  // 3. Text overlays
  // 4. Export as high-res PNG
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Render background
  // Render images
  // Render text
  
  const buffer = canvas.toBuffer('image/png');
  
  // Upload to Gelato
  return await uploadImageToGelato(buffer);
}
```

### Phase 4: Order Flow Integration

Update `app/api/orders/create/route.ts`:

```typescript
// Before creating order:
// 1. Get ArtKey data for cart items
// 2. Generate final design images
// 3. Upload to Gelato
// 4. Create Gelato order with generated files
// 5. Create WooCommerce order with ArtKey metadata
```

---

## 🎨 ArtKey Editor Features Priority

### ✅ Phase 1 - MVP (Currently Implemented)
- [x] Template selection (6 templates)
- [x] Custom title
- [x] Image upload to Gelato
- [x] Color customization
- [x] Live preview
- [x] Save & checkout flow

### 🚧 Phase 2 - Essential (Next Steps)
- [ ] All 16 templates
- [ ] Multiple image upload & positioning
- [ ] Text overlay tool
- [ ] Background image upload
- [ ] Font selection (Google Fonts)
- [ ] Generate composite design
- [ ] Session persistence

### 🔮 Phase 3 - Advanced (Future)
- [ ] Video greeting upload
- [ ] Spotify embed
- [ ] Custom buttons/links
- [ ] Guestbook feature
- [ ] Moderation queue (if allowing visitor uploads)
- [ ] Mobile-optimized editor

---

## 🔗 Gelato Product Mapping

### Cards
```typescript
{
  productUid: 'cards_cl_dtc_prt_pt',
  files: [{
    url: gelatoFileUrl, // From ArtKey generation
    type: 'default'
  }]
}
```

### Prints
```typescript
{
  productUid: 'prints_pt_cl', // Or framed_prints_pt_cl
  files: [{
    url: gelatoFileUrl,
    type: 'default'
  }]
}
```

---

## 🛠️ Required Libraries

### For Image Compositing:
```bash
npm install canvas
# or
npm install sharp
```

### For Text Rendering:
```bash
npm install @napi-rs/canvas
# Supports Google Fonts, text effects
```

### For PDF Generation (optional):
```bash
npm install pdfkit
```

---

## 📝 Next Steps

1. **Choose Database:** Decide where to store ArtKey data
   - MongoDB (flexible JSON storage)
   - PostgreSQL (structured + JSONB columns)
   - WooCommerce order meta (simplest)

2. **Implement Image Compositing:**
   - Install canvas/sharp
   - Create service to generate final design
   - Test with sample ArtKey data

3. **Enhanced Editor:**
   - Add text tool
   - Add image positioning
   - Add filters/effects

4. **Test Complete Flow:**
   - Product selection → ArtKey → Checkout → Gelato order

5. **WordPress Plugin Features to Port:**
   - Decide which features you want (guestbook, video, spotify, etc.)
   - Port incrementally

---

## 🎯 Quick Win: Minimal Viable ArtKey

For fastest deployment, start with:

**Simple Flow:**
1. Customer uploads 1 image
2. Chooses template (colors)
3. Adds title text
4. System generates simple composite:
   - Background color
   - Uploaded image (centered)
   - Title text (top)
5. Upload composite to Gelato
6. Create order

**This skips:**
- Advanced positioning
- Multiple images
- Complex text tools
- Video/Spotify

**But gets you:**
- Working ArtKey system
- Gelato integration
- Customer personalization
- Production-ready flow

---

## 🔐 Security Considerations

From WordPress plugin:

1. **File Upload Validation:**
   - Max size: 30MB
   - Allowed types: images, videos
   - Virus scanning (optional)

2. **reCAPTCHA:**
   - Protect upload forms
   - Prevent abuse

3. **Moderation:**
   - If allowing visitor uploads
   - Review before showing

4. **Token-based Editing:**
   - Secure editor access
   - Prevent unauthorized edits

---

## 📊 Pricing Updated

Frame pricing has been updated in `PrintsSection.tsx`:
- **Black Frame:** +$0.00
- **White Frame:** +$5.00
- **Silver Frame:** +$6.00

---

## 🚀 Ready to Build?

The foundation is in place. To proceed:

1. **Let me know which features are highest priority**
2. **Choose your database solution**
3. **I'll build the enhanced editor with image compositing**
4. **We'll test the complete flow end-to-end**

The ArtKey system is modular - we can start simple and add features progressively!

