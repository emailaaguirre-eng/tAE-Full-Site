# ArtKey Editor Implementation Roadmap

## 📋 Current Status

✅ **Completed:**
- Basic ArtKey Editor structure
- 6 templates (needs to be 16)
- Image upload to Gelato
- Basic color customization
- Save function structure

🔄 **Needs Implementation:**
- All 16 templates with proper styling
- Template carousel (4 pages)
- Full color customization (background, button, title)
- Custom links/buttons
- Spotify embed
- Featured video
- Gallery display
- Guestbook
- WooCommerce integration
- Image compositing for Gelato

---

## 🎯 Phase 1: Core Editor Enhancement (Priority 1)

### 1.1 Update Templates
- [ ] Add all 16 templates with correct color schemes
- [ ] Implement template carousel (4 pages, 4 templates per page)
- [ ] Add template preview thumbnails

### 1.2 Color Customization
- [ ] Background color picker (solid + gradients)
- [ ] Button color picker (solid + gradients)
- [ ] Title color picker (solid + gradients)
- [ ] Text color picker
- [ ] Color carousels (12 colors per page)

### 1.3 Live Preview
- [ ] Real-time preview updates
- [ ] Mobile/desktop view toggle
- [ ] Responsive preview frame

---

## 🎯 Phase 2: Content Features (Priority 2)

### 2.1 Media Management
- [ ] Multiple image upload
- [ ] Image gallery display
- [ ] Video upload
- [ ] Featured video selection

### 2.2 Custom Links
- [ ] Add/remove custom buttons
- [ ] Link label and URL input
- [ ] Button styling options

### 2.3 Advanced Features
- [ ] Spotify embed URL
- [ ] Guestbook toggle
- [ ] Gallery toggle
- [ ] Video toggle

---

## 🎯 Phase 3: WooCommerce Integration (Priority 1)

### 3.1 Save to WordPress
- [ ] Create ArtKey custom post type via REST API
- [ ] Store META_FIELDS structure
- [ ] Generate edit token
- [ ] Attach to cart item

### 3.2 Order Integration
- [ ] Attach ArtKey to order item on checkout
- [ ] Store ArtKey ID in order item meta
- [ ] Link ArtKey to WooCommerce order

### 3.3 Checkout Gating
- [ ] Require ArtKey completion before checkout
- [ ] Session management
- [ ] Redirect to editor if incomplete

---

## 🎯 Phase 4: Gelato Integration (Priority 1)

### 4.1 Design Compositing
- [ ] Generate composite image from ArtKey design
- [ ] Combine: background + images + text overlays
- [ ] Export high-resolution PNG

### 4.2 Upload to Gelato
- [ ] Upload composite to Gelato
- [ ] Get Gelato file URL
- [ ] Store URL with order

### 4.3 Order Creation
- [ ] Include ArtKey composite in Gelato order
- [ ] Map to correct Gelato product UID
- [ ] Handle different product types (cards, prints, etc.)

---

## 📝 Implementation Order

### Week 1: Core Editor
1. Update templates (all 16)
2. Template carousel
3. Enhanced color pickers
4. Live preview improvements

### Week 2: WooCommerce Integration
1. Save to WordPress API
2. Cart item attachment
3. Order integration
4. Checkout gating

### Week 3: Gelato Integration
1. Image compositing service
2. Gelato upload integration
3. Order creation with ArtKey

### Week 4: Advanced Features
1. Custom links
2. Spotify/video embeds
3. Gallery/guestbook
4. Polish & testing

---

## 🔧 Technical Requirements

### Dependencies Needed:
```bash
npm install canvas                    # For image compositing
npm install @napi-rs/canvas          # Alternative canvas library
npm install sharp                    # Image processing
```

### API Routes Needed:
- `POST /api/artkey/woocommerce/create` - Create ArtKey in WordPress
- `POST /api/artkey/woocommerce/update` - Update ArtKey
- `POST /api/artkey/composite` - Generate composite image
- `GET /api/artkey/{id}` - Get ArtKey data

### WordPress REST API:
- Need to enable custom post type in REST API
- Or create custom endpoints in WordPress

---

## 🎨 Template Data Structure

Each template needs:
```typescript
{
  value: string,           // Template ID
  name: string,            // Display name
  bg: string,             // Background (color or gradient)
  button: string,         // Button color
  text: string,           // Text color
  title: string,          // Title color
  gradient?: string       // Optional button gradient
}
```

---

## ✅ Quick Wins (Can Do Now)

1. **Add remaining 10 templates** - Just add to templates array
2. **Template carousel** - Simple pagination component
3. **Better color pickers** - Use HTML5 color input + gradient options
4. **WooCommerce save** - Create API route to save to WordPress

---

## 🚀 Next Immediate Steps

1. Update `ArtKeyEditor.tsx` with all 16 templates
2. Add template carousel component
3. Create WooCommerce save API route
4. Test save → WordPress → Order flow

---

Ready to start implementing! Which phase should we tackle first?

