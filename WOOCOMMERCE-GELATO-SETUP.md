# WooCommerce & Gelato Integration Setup Guide
## The Artful Experience

This guide explains how the website integrates with WooCommerce and Gelato API for complete e-commerce and print fulfillment.

---

## 🏗️ Architecture Overview

```
Customer Order Flow:
1. Customer customizes product on website (Next.js)
2. Add to cart → Cart Context manages items
3. Checkout → Creates order in WooCommerce
4. Order sent to Gelato API for print fulfillment
5. Gelato prints and ships directly to customer
6. Order status synced back to WooCommerce
```

---

## 🔑 Environment Variables Setup

### Step 1: Create Your Environment File

A `.env.local.example` file has been created. Copy it to `.env.local`:

```bash
cp .env.local.example .env.local
```

### Step 2: Add Your API Credentials

Edit `.env.local` with your actual credentials:

#### **WooCommerce Settings:**

1. **Get WooCommerce API Keys:**
   - Go to your WordPress admin: `https://theartfulexperience.com/wp-admin`
   - Navigate to: **WooCommerce → Settings → Advanced → REST API**
   - Click "Add Key"
   - Description: "Next.js Website"
   - User: Select admin user
   - Permissions: **Read/Write**
   - Click "Generate API Key"
   - Copy the **Consumer Key** and **Consumer Secret**

2. **Add to .env.local:**
```env
NEXT_PUBLIC_WOOCOMMERCE_URL=https://theartfulexperience.com
WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxx
```

#### **Gelato API Settings:**

1. **Get Gelato API Key:**
   - Log into [Gelato Dashboard](https://dashboard.gelato.com/)
   - Go to **Settings → API Keys**
   - Create new API key or copy existing
   - Select appropriate permissions (Orders, Products, Files)

2. **Add to .env.local:**
```env
GELATO_API_KEY=your_gelato_api_key_here
GELATO_API_URL=https://order.gelatoapis.com/v4
```

---

## 📦 WooCommerce Integration

### What's Integrated:

#### **1. Product Management** (`lib/woocommerce.ts`)
- `getProducts()` - Fetch all products
- `getProduct(id)` - Get single product
- `getCategories()` - Get product categories

#### **2. Order Management**
- `createOrder(orderData)` - Create new order
- `updateOrderStatus(orderId, status)` - Update order status

#### **3. API Routes** (`app/api/`)
- `/api/products` - Get products
- `/api/orders/create` - Create order

### WooCommerce Product Setup:

Create products in WooCommerce that match your offerings:

1. **Photo Prints:**
   - Name: "Custom Photo Print - 8x10"
   - SKU: `print-8x10`
   - Price: $14.99
   - Attributes: Size, Material, Frame
   - Categories: Prints

2. **Cards:**
   - Name: "Custom Photo Card"
   - SKU: `card-standard`
   - Price: $4.99
   - Attributes: Type, Quantity
   - Categories: Cards

3. **Canvas Prints:**
   - Name: "Canvas Print - 16x20"
   - SKU: `canvas-16x20`
   - Price: $49.99
   - Categories: Wall Art

---

## 🖨️ Gelato API Integration

### What's Integrated:

#### **1. Order Fulfillment** (`lib/gelato.ts`)
- `createGelatoOrder()` - Send order for printing
- `getGelatoOrderStatus()` - Check order status
- `uploadImageToGelato()` - Upload customer images

#### **2. Product Catalog**
- `getGelatoProducts()` - Get available print products
- `getShippingMethods()` - Get shipping options
- `getShippingQuote()` - Calculate shipping costs

#### **3. API Routes**
- `/api/gelato/upload` - Upload images

### Gelato Product UIDs:

Map your WooCommerce products to Gelato product UIDs:

**Common Gelato Product UIDs:**
- `cards_cl_dtc_prt_pt` - Premium Cards
- `prints_pt_cl` - Photo Prints
- `canvas_print_gallery_wrap` - Gallery Wrapped Canvas
- `posters_pt_cl` - Posters
- `framed_prints_pt_cl` - Framed Prints

**Find your product UIDs:**
```bash
# Call Gelato API
curl -X GET "https://order.gelatoapis.com/v4/products" \
  -H "X-API-KEY: your_api_key"
```

---

## 🛒 Shopping Cart System

### Cart Context (`contexts/CartContext.tsx`)

**Features:**
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Calculate totals
- Real-time cart count in navbar

**Usage in Components:**
```typescript
import { useCart } from '@/contexts/CartContext';

function YourComponent() {
  const { addToCart, cart, getTotalPrice } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: 'unique-id',
      name: 'Custom Print',
      price: 29.99,
      quantity: 1,
      customization: {
        size: '8x10',
        material: 'Canvas',
        uploadedImage: 'image-url'
      }
    });
  };
}
```

---

## 🔄 Order Flow Integration

### Complete Order Process:

```typescript
// 1. Customer adds items to cart
addToCart({
  id: 'print-001',
  name: 'Custom Photo Print',
  price: 29.99,
  quantity: 1,
  customization: { /* user selections */ }
});

// 2. Customer proceeds to checkout
// 3. Create order in WooCommerce
const wcOrderData = {
  payment_method: 'stripe',
  payment_method_title: 'Credit Card',
  set_paid: false,
  billing: {
    first_name: 'John',
    last_name: 'Doe',
    address_1: '123 Main St',
    city: 'New York',
    state: 'NY',
    postcode: '10001',
    country: 'US',
    email: 'john@example.com',
    phone: '555-1234'
  },
  shipping: { /* same as billing */ },
  line_items: cart.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    meta_data: [
      { key: 'customization', value: JSON.stringify(item.customization) }
    ]
  }))
};

// 4. Send order to both WooCommerce and Gelato
const response = await fetch('/api/orders/create', {
  method: 'POST',
  body: JSON.stringify({
    orderData: wcOrderData,
    gelatoData: {
      shipmentMethodUid: 'standard',
      shippingAddress: { /* customer address */ },
      items: [{
        productUid: 'prints_pt_cl',
        quantity: 1,
        files: [{ url: uploadedImageUrl, type: 'default' }]
      }]
    }
  })
});
```

---

## 🎨 Image Upload Flow

### Upload to Gelato:

```typescript
// 1. Customer uploads image
const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // 2. Send to Gelato via API
  const response = await fetch('/api/gelato/upload', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  // 3. Save Gelato file URL with order
  const imageUrl = result.fileUrl;
};
```

---

## 📊 Product Mapping

### Map Site Products to WooCommerce + Gelato:

| Website Product | WooCommerce SKU | Gelato Product UID | Price |
|----------------|-----------------|-------------------|-------|
| Photo Print 8x10 | `print-8x10` | `prints_pt_cl` | $14.99 |
| Canvas 16x20 | `canvas-16x20` | `canvas_print_gallery_wrap` | $49.99 |
| Holiday Card | `card-holiday` | `cards_cl_dtc_prt_pt` | $19.99 |
| Framed Print (Black) | `print-8x10-framed-black` | `framed_prints_pt_cl` | $34.99 |

---

## 🔧 Installation Steps

### 1. Install Dependencies:
```bash
npm install
```

### 2. Set Up Environment Variables:
- Copy `.env.local.example` to `.env.local`
- Add your WooCommerce API keys
- Add your Gelato API key

### 3. Test WooCommerce Connection:
```bash
# Test in browser
http://localhost:3000/api/products
```

### 4. Test Gelato Connection:
```bash
# Use Gelato dashboard to verify API key works
```

---

## 🧪 Testing

### Test WooCommerce:
1. Create test products in WooCommerce
2. Visit `/api/products` endpoint
3. Verify products load

### Test Gelato:
1. Upload test image
2. Create test order
3. Check Gelato dashboard for order

### Test Complete Flow:
1. Add product to cart
2. Proceed to checkout
3. Complete order
4. Verify order appears in both WooCommerce and Gelato

---

## 🚨 Webhooks (Optional but Recommended)

### WooCommerce Webhooks:
Set up webhooks to receive order updates:

1. **WooCommerce → Settings → Advanced → Webhooks**
2. Create webhooks for:
   - Order created
   - Order updated
   - Order completed

### Gelato Webhooks:
Receive fulfillment status updates:

1. **Gelato Dashboard → Settings → Webhooks**
2. Add webhook URL: `https://yoursite.com/api/webhooks/gelato`
3. Subscribe to events:
   - Order status changed
   - Shipment created
   - Delivery completed

---

## 📝 Next Steps

1. ✅ Add your API credentials to `.env.local`
2. ✅ Create products in WooCommerce
3. ✅ Map products to Gelato UIDs
4. ✅ Test order creation
5. ✅ Set up payment gateway (Stripe, PayPal, etc.)
6. ✅ Configure shipping zones in WooCommerce
7. ✅ Test complete checkout flow
8. ✅ Set up webhooks for automated updates

---

## 🆘 Troubleshooting

### WooCommerce Connection Issues:
- Verify API keys are correct
- Check WooCommerce REST API is enabled
- Ensure HTTPS is configured
- Check WordPress permalinks are set to "Post name"

### Gelato API Issues:
- Verify API key is active
- Check API key permissions
- Ensure file formats are supported
- Verify product UIDs are correct

### CORS Errors:
- Add your domain to WooCommerce allowed origins
- Check Next.js API route configuration

---

## 📚 Documentation Links

- [WooCommerce REST API Docs](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Gelato API Documentation](https://developers.gelato.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

Your integration is ready! Just add your API credentials and you're good to go! 🚀

