# Product Customization Workflow

## 🎯 Complete Customer Journey

### Flow Overview:
```
1. Customer sees product → 
2. Clicks "Customize" → 
3. Custom Editor (Gelato API - size, material, frame, etc.) → 
4. ArtKey Editor (WordPress plugin functionality) → 
5. Checkout
```

---

## 📦 Product Types & Customization

### 1. **Greeting Cards**
- **Custom Editor Options:**
  - Card type (Holiday, Birthday, Thank You, etc.)
  - Quantity
  - Paper quality
  - Finish (matte, glossy)
  
- **ArtKey Editor:**
  - Template selection
  - Upload images
  - Add text/messages
  - Customize colors
  - Add QR code/link tree

### 2. **Art Prints**
- **Custom Editor Options:**
  - Size (5x7, 8x10, 11x14, 16x20, 20x24, 24x36)
  - Material (Glossy, Matte, Canvas, Metal)
  - Frame (Unframed, Black, White, Silver)
  - Frame style (if applicable)
  
- **ArtKey Editor:**
  - Image enhancement
  - Filters/effects
  - Text overlays
  - Artistic touches

### 3. **Commissioned Paintings**
- **Custom Editor Options:**
  - Canvas size
  - Style preference
  - Reference image upload
  - Special instructions
  
- **ArtKey Editor:**
  - ArtKey link tree for sharing progress
  - Gallery of work-in-progress photos
  - Client communication portal

---

## 🔄 Implementation Steps

### Step 1: Update Product Components

**FeaturedProducts.tsx** - Update "Customize" button:
```typescript
<button 
  onClick={() => {
    const params = new URLSearchParams({
      product_id: product.id || `product-${index}`,
      product_type: determineProductType(product.name),
      product_name: product.name,
      price: product.price,
    });
    window.location.href = `/customize?${params}`;
  }}
  className="bg-brand-medium text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
>
  Customize
</button>
```

**ProductCategories.tsx** - Update "Shop Now" button:
```typescript
<button 
  onClick={() => {
    window.location.href = `/products/${category.title.toLowerCase().replace(/\s+/g, '-')}`;
  }}
  className="w-full bg-brand-medium text-white py-3 rounded-full font-semibold hover:bg-brand-dark transition-colors"
>
  Shop Now
</button>
```

### Step 2: Create Custom Editor Route

**`app/customize/page.tsx`** - Main customization page
- Reads product type from URL params
- Shows Gelato product options
- Handles size, material, frame selections
- Passes data to ArtKey Editor

### Step 3: Update ArtKey Editor

**`app/artkey/editor/page.tsx`** - Enhanced to:
- Receive customization data from Custom Editor
- Store in session/cart
- Generate final design
- Proceed to checkout

### Step 4: Create API Routes

**`app/api/customize/save/route.ts`** - Save customization choices
**`app/api/customize/gelato-options/route.ts`** - Fetch Gelato product options

---

## 🛠️ Custom Editor Component Structure

```typescript
// app/customize/page.tsx structure:

1. Product Info Display
   - Product name, image, base price
   
2. Gelato Product Options
   - Size selector (for prints)
   - Material selector
   - Frame options (if applicable)
   - Quantity (for cards)
   
3. Live Price Calculator
   - Updates as options change
   
4. Navigation
   - "Continue to ArtKey Editor" button
   - Passes all customization data
```

---

## 🔗 Data Flow

### Custom Editor → ArtKey Editor:
```typescript
// Custom Editor saves to session/cart:
{
  productId: "product-123",
  productType: "print" | "card" | "painting",
  customizations: {
    size: "16x20",
    material: "Canvas",
    frame: "Black",
    framePrice: 0,
    quantity: 1
  },
  gelatoProductUid: "canvas_print_gallery_wrap",
  basePrice: 49.99,
  totalPrice: 49.99
}

// ArtKey Editor receives via URL params or session
// Adds ArtKey design data
// Final order includes both customization + ArtKey
```

---

## 📝 Next Steps

1. **Create Custom Editor Page** (`app/customize/page.tsx`)
2. **Update Product Buttons** to link to `/customize`
3. **Integrate Gelato Product Options** API
4. **Update ArtKey Editor** to receive customization data
5. **Test Complete Flow** end-to-end

---

## 🎨 Product Type Detection

```typescript
function determineProductType(productName: string): string {
  const name = productName.toLowerCase();
  
  if (name.includes('card') || name.includes('stationery')) {
    return 'card';
  }
  if (name.includes('print') || name.includes('canvas') || name.includes('wall art')) {
    return 'print';
  }
  if (name.includes('painting') || name.includes('commission')) {
    return 'painting';
  }
  return 'print'; // default
}
```

---

Ready to implement! Let me know which product types you want to prioritize first.

