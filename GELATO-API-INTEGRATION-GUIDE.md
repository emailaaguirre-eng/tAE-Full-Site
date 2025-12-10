# Gelato API Integration Guide
## Using Official Gelato Documentation

This guide explains how to use the [Gelato API Documentation](https://dashboard.gelato.com/docs/) to enhance your website's print fulfillment integration.

---

## 📚 Official Gelato Documentation

**Primary Resource:** [https://dashboard.gelato.com/docs/](https://dashboard.gelato.com/docs/)

The Gelato API documentation provides comprehensive information on:
- Authentication
- Product catalog
- File uploads
- Order creation
- Order status tracking
- Shipping methods
- Webhooks

---

## 🔧 Current Integration Status

### ✅ Already Implemented

Your website already has these Gelato integrations:

1. **File Upload** (`lib/gelato.ts` → `uploadImageToGelato()`)
   - Uploads customer images to Gelato
   - Used in ArtKey Editor when customers upload images
   - Endpoint: `/api/gelato/upload`

2. **Order Creation** (`lib/gelato.ts` → `createGelatoOrder()`)
   - Creates print orders in Gelato
   - Called during checkout process
   - Includes shipping address and product details

3. **Order Status** (`lib/gelato.ts` → `getGelatoOrderStatus()`)
   - Fetches order status from Gelato
   - Can be used for order tracking

4. **Product Catalog** (`lib/gelato.ts` → `getGelatoProducts()`)
   - Fetches available Gelato products
   - Used to map your products to Gelato product UIDs

5. **Shipping Methods** (`lib/gelato.ts` → `getShippingMethods()`)
   - Gets available shipping options
   - Used for shipping calculations

6. **Shipping Quotes** (`lib/gelato.ts` → `getShippingQuote()`)
   - Calculates shipping costs
   - Used during checkout

---

## 🚀 How to Enhance Using Official Documentation

### Step 1: Review Gelato API Documentation

Visit [https://dashboard.gelato.com/docs/](https://dashboard.gelato.com/docs/) and review:

1. **Authentication Section**
   - Verify your API key setup matches their requirements
   - Check if you need OAuth or just API keys

2. **Products Section**
   - Review product UIDs for your specific products
   - Check product specifications (sizes, materials, etc.)
   - Verify product availability by country

3. **Orders Section**
   - Review order structure requirements
   - Check required vs optional fields
   - Understand order statuses

4. **Files Section**
   - Review file upload requirements
   - Check supported file formats
   - Understand file size limits

5. **Webhooks Section**
   - Set up webhooks for order status updates
   - Configure webhook endpoints

### Step 2: Verify Your API Configuration

**Current Configuration** (`lib/gelato.ts`):
```typescript
const GELATO_API_KEY = process.env.GELATO_API_KEY;
const GELATO_API_URL = process.env.GELATO_API_URL || 'https://order.gelatoapis.com/v4';
```

**Check in Gelato Docs:**
- ✅ Is the API URL correct? (v4 is current)
- ✅ Is authentication method correct? (X-API-KEY header)
- ✅ Are there any new authentication requirements?

### Step 3: Enhance Based on Documentation

#### A. Product Mapping

**Current Implementation:**
Your `app/customize/page.tsx` has hardcoded Gelato product UIDs:
- `prints_pt_cl` - Photo prints
- `canvas_print_gallery_wrap` - Canvas prints
- `metal_prints` - Metal prints
- `cards_cl_dtc_prt_pt` - Cards

**Enhancement:**
1. Use `getGelatoProducts()` to fetch real product catalog
2. Dynamically map your products to Gelato products
3. Store product UIDs in database or config

**Example Enhancement:**
```typescript
// Fetch real products from Gelato
const gelatoProducts = await getGelatoProducts();

// Map your product types to Gelato products
const productMapping = {
  'print-8x10': gelatoProducts.find(p => p.name.includes('8x10')),
  'canvas-16x20': gelatoProducts.find(p => p.name.includes('Canvas')),
  // etc.
};
```

#### B. Order Structure

**Current Implementation** (`lib/gelato.ts`):
```typescript
interface GelatoOrder {
  orderReferenceId: string;
  customerReferenceId?: string;
  shipmentMethodUid: string;
  shippingAddress: { ... };
  items: GelatoProduct[];
}
```

**Check Gelato Docs For:**
- Are all required fields included?
- Are there new optional fields that improve tracking?
- Do you need to include billing address?
- Are there country-specific requirements?

#### C. File Upload

**Current Implementation:**
- Uploads single files
- Returns file URL

**Potential Enhancements from Docs:**
- Batch file uploads
- File validation before upload
- File format conversion
- Image optimization

#### D. Webhooks

**Not Currently Implemented** - Add this!

**From Gelato Docs:**
1. Set up webhook endpoint: `/api/webhooks/gelato`
2. Listen for order status updates
3. Update WooCommerce order status automatically

**Example Webhook Handler:**
```typescript
// app/api/webhooks/gelato/route.ts
export async function POST(request: Request) {
  const webhook = await request.json();
  
  // Verify webhook signature (from Gelato docs)
  
  if (webhook.event === 'order.status.updated') {
    // Update WooCommerce order status
    await updateWooCommerceOrder(webhook.orderId, webhook.status);
  }
}
```

---

## 🔍 Key Areas to Check in Gelato Docs

### 1. Authentication
- [ ] Verify API key format
- [ ] Check if OAuth is required
- [ ] Review rate limits
- [ ] Check IP whitelisting requirements

### 2. Products
- [ ] Verify product UIDs match your products
- [ ] Check product availability by country
- [ ] Review product specifications
- [ ] Check pricing information

### 3. Orders
- [ ] Review required fields
- [ ] Check order validation rules
- [ ] Understand order statuses
- [ ] Review error handling

### 4. Files
- [ ] Check file format requirements
- [ ] Review file size limits
- [ ] Understand image requirements (DPI, dimensions)
- [ ] Check file validation rules

### 5. Shipping
- [ ] Verify shipping method UIDs
- [ ] Check shipping calculation accuracy
- [ ] Review delivery time estimates
- [ ] Check country-specific shipping

### 6. Webhooks
- [ ] Set up webhook endpoints
- [ ] Configure webhook events
- [ ] Implement webhook verification
- [ ] Handle webhook errors

---

## 📝 Implementation Checklist

### Phase 1: Verification
- [ ] Review Gelato API documentation
- [ ] Verify current API configuration
- [ ] Test API key authentication
- [ ] Verify product UIDs match documentation

### Phase 2: Enhancement
- [ ] Implement dynamic product mapping
- [ ] Add webhook support
- [ ] Enhance error handling
- [ ] Add order validation

### Phase 3: Testing
- [ ] Test file uploads
- [ ] Test order creation
- [ ] Test webhook receiving
- [ ] Test order status updates

### Phase 4: Production
- [ ] Set up production API keys
- [ ] Configure production webhooks
- [ ] Monitor API usage
- [ ] Set up error alerts

---

## 🛠️ Quick Reference: Gelato API Endpoints

Based on your current implementation and Gelato docs:

### Products
```
GET /v4/products
- Get all available products
- Filter by country, category, etc.
```

### Files
```
POST /v4/files
- Upload image files
- Returns file URL for use in orders
```

### Orders
```
POST /v4/orders
- Create new print order
- Requires: shipping address, items, shipment method
```

```
GET /v4/orders/{orderId}
- Get order status
- Track order progress
```

### Shipping
```
GET /v4/shipment-methods?country={code}
- Get available shipping methods
```

```
POST /v4/shipping/quote
- Calculate shipping costs
```

---

## 🔗 Integration Points in Your Website

### 1. ArtKey Editor (`components/ArtKeyEditor.tsx`)
- **Current:** Uploads images to Gelato via `/api/gelato/upload`
- **Enhancement:** Validate images before upload (check Gelato docs for requirements)

### 2. Customize Page (`app/customize/page.tsx`)
- **Current:** Uses hardcoded Gelato product UIDs
- **Enhancement:** Fetch real products from Gelato API

### 3. Checkout (`app/api/orders/create/route.ts`)
- **Current:** Creates Gelato order after WooCommerce order
- **Enhancement:** Add webhook to update order status

### 4. Order Tracking
- **Current:** Can fetch order status manually
- **Enhancement:** Automatic updates via webhooks

---

## 📞 Support Resources

1. **Gelato API Documentation:** [https://dashboard.gelato.com/docs/](https://dashboard.gelato.com/docs/)
2. **Gelato Dashboard:** [https://dashboard.gelato.com/](https://dashboard.gelato.com/)
3. **Gelato Support:** Check dashboard for support contact

---

## ✅ Next Steps

1. **Review Gelato Documentation:**
   - Visit [https://dashboard.gelato.com/docs/](https://dashboard.gelato.com/docs/)
   - Bookmark important sections
   - Note any differences from current implementation

2. **Test Current Integration:**
   - Verify API key works
   - Test file upload
   - Test order creation (test mode)

3. **Enhance Based on Findings:**
   - Update product mappings
   - Add webhook support
   - Improve error handling

4. **Production Deployment:**
   - Use production API keys
   - Set up webhooks
   - Monitor integration

---

**The Gelato API documentation is your best resource for ensuring a robust, production-ready integration!** 🚀

