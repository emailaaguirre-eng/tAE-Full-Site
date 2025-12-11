# Image Upload & ArtKey System Guide
## Complete Setup for Image Uploads, QR Codes, and ArtKey Reuse

---

## 🎯 What's Been Created

### 1. **Image Upload System** ✅
- **Endpoint:** `/api/upload/image`
- **Supports:** WordPress Media Library, Cloudinary, or local storage
- **Features:** File validation, size limits, multiple backends

### 2. **QR Code Generation** ✅
- **Endpoint:** `/api/artkey/qr`
- **Features:** Generate QR codes for ArtKey share URLs
- **Automatic:** QR codes generated when ArtKeys are saved

### 3. **ArtKey Storage System** ✅
- **Endpoint:** `/api/artkey/store`
- **Features:** Save, retrieve, update, delete ArtKeys
- **Shareable URLs:** Each ArtKey gets a unique token and shareable URL
- **QR Codes:** Automatically generated for each ArtKey

### 4. **ArtKey Reuse Component** ✅
- **Component:** `ArtKeySelector.tsx`
- **Features:** Browse and select existing ArtKeys to reuse

---

## 📤 Image Upload Setup

### Option 1: Upload to WordPress (Recommended)

**Advantages:**
- Uses your existing WordPress installation
- Images stored in WordPress Media Library
- Accessible via WordPress REST API
- No additional services needed

**Setup:**

1. **Add WordPress Credentials to Netlify:**
   ```
   WORDPRESS_USERNAME = your_wordpress_username
   WORDPRESS_APP_PASSWORD = your_app_password
   ```

2. **Get Application Password:**
   - In WordPress Admin: **Users → Your Profile**
   - Scroll to **Application Passwords**
   - Create new password
   - Copy the password (you'll only see it once!)

3. **Use in Your Code:**
   ```typescript
   const formData = new FormData();
   formData.append('file', imageFile);

   const response = await fetch('/api/upload/image?backend=wordpress', {
     method: 'POST',
     body: formData,
   });

   const data = await response.json();
   const imageUrl = data.url; // WordPress media URL
   ```

### Option 2: Upload to Cloudinary

**Advantages:**
- CDN delivery
- Image transformations
- Automatic optimization

**Setup:**

1. **Sign up for Cloudinary:** [cloudinary.com](https://cloudinary.com)

2. **Get Upload Preset:**
   - Go to Cloudinary Dashboard
   - Settings → Upload → Upload presets
   - Create unsigned preset

3. **Add to Netlify:**
   ```
   CLOUDINARY_UPLOAD_URL = https://api.cloudinary.com/v1_1/your_cloud_name/image/upload
   CLOUDINARY_UPLOAD_PRESET = your_upload_preset
   ```

4. **Use in Your Code:**
   ```typescript
   const response = await fetch('/api/upload/image?backend=cloudinary', {
     method: 'POST',
     body: formData,
   });
   ```

---

## 🎨 Using Image Upload in ArtKey Editor

### Update ArtKeyEditor Component

Add image upload functionality:

```typescript
async function handleImageUpload(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload/image?backend=wordpress', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    
    // Add to ArtKey gallery
    setArtKeyData(prev => ({
      ...prev,
      uploadedImages: [...prev.uploadedImages, data.url],
    }));
  } catch (error) {
    console.error('Upload error:', error);
    alert('Failed to upload image');
  }
}
```

---

## 📱 QR Code Generation

### Automatic QR Codes

QR codes are **automatically generated** when you save an ArtKey:

```typescript
// Save ArtKey
const response = await fetch('/api/artkey/store', {
  method: 'POST',
  body: JSON.stringify({
    artKeyData: yourArtKeyData,
    sessionId: sessionId,
  }),
});

const result = await response.json();
// result.artKey.qrCodeUrl contains the QR code URL
```

### Manual QR Code Generation

Generate QR code for any URL:

```typescript
// GET request
const qrUrl = `/api/artkey/qr?url=${encodeURIComponent(shareUrl)}&size=200`;

// Or POST request
const response = await fetch('/api/artkey/qr', {
  method: 'POST',
  body: JSON.stringify({
    url: shareUrl,
    size: 200,
  }),
});
```

### Display QR Code

```tsx
<img src={qrCodeUrl} alt="QR Code" />
```

---

## 🔄 ArtKey Reuse System

### Save ArtKey

```typescript
const response = await fetch('/api/artkey/store', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId: 'user-session-id', // or userId for logged-in users
    productId: 'product-123',
    cartItemId: 'cart-item-456',
    artKeyData: {
      title: 'My ArtKey',
      theme: { /* theme data */ },
      uploadedImages: [/* image URLs */],
      // ... other ArtKey data
    },
  }),
});

const result = await response.json();
// result.artKey.id - Use this to reuse later
// result.artKey.shareUrl - Shareable URL
// result.artKey.qrCodeUrl - QR code URL
```

### Retrieve User's ArtKeys

```typescript
// Get all ArtKeys for a user/session
const response = await fetch('/api/artkey/store?sessionId=user-session-id');
const data = await response.json();
const artKeys = data.artKeys; // Array of ArtKeys
```

### Reuse Existing ArtKey

**Option 1: Use ArtKeySelector Component**

```tsx
import ArtKeySelector from '@/components/ArtKeySelector';

function YourComponent() {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <>
      <button onClick={() => setShowSelector(true)}>
        Use Existing ArtKey
      </button>

      {showSelector && (
        <ArtKeySelector
          sessionId="user-session-id"
          onSelect={(artKey) => {
            // Load the ArtKey data
            loadArtKey(artKey.id);
            setShowSelector(false);
          }}
          onCancel={() => setShowSelector(false)}
        />
      )}
    </>
  );
}
```

**Option 2: Manual Selection**

```typescript
// 1. Get user's ArtKeys
const response = await fetch('/api/artkey/store?sessionId=user-session-id');
const { artKeys } = await response.json();

// 2. User selects an ArtKey
const selectedArtKey = artKeys[0];

// 3. Load full ArtKey data
const fullResponse = await fetch(`/api/artkey/store?id=${selectedArtKey.id}`);
const { artKey } = await fullResponse.json();

// 4. Use the ArtKey data
setArtKeyData(artKey.artKeyData);
```

### Update Existing ArtKey

```typescript
const response = await fetch('/api/artkey/store', {
  method: 'POST',
  body: JSON.stringify({
    existingId: 'artkey-123', // ID of existing ArtKey
    artKeyData: updatedArtKeyData,
  }),
});
```

---

## 🔗 Shareable ArtKey URLs

Each ArtKey gets a unique shareable URL:

```
https://your-site.com/artkey/{token}
```

**Example:**
```
https://your-site.com/artkey/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Features:**
- ✅ Unique 32-character token
- ✅ Publicly accessible (no login required)
- ✅ QR code automatically generated
- ✅ Can be shared with anyone

---

## 💾 Storage Options

### Current: In-Memory Storage (Development)

The current implementation uses in-memory storage. **This won't persist on Netlify** (data is lost on server restart).

### Production: Database Storage

**Option 1: PostgreSQL (Recommended for Netlify)**

1. **Use Netlify Postgres** or **Supabase**
2. **Create table:**
   ```sql
   CREATE TABLE artkeys (
     id VARCHAR(255) PRIMARY KEY,
     user_id VARCHAR(255),
     session_id VARCHAR(255),
     token VARCHAR(32) UNIQUE,
     share_url TEXT,
     product_id VARCHAR(255),
     cart_item_id VARCHAR(255),
     artkey_data JSONB,
     qr_code_url TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Update `/api/artkey/store/route.ts`** to use database

**Option 2: WordPress Custom Post Type**

Store ArtKeys in WordPress (if using WordPress):

```typescript
// Create ArtKey in WordPress
const response = await fetch(`${WP_URL}/wp-json/wp/v2/artkey`, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: artKeyData.title,
    meta: {
      _artkey_json: JSON.stringify(artKeyData),
      _artkey_token: token,
    },
  }),
});
```

**Option 3: MongoDB**

Use MongoDB Atlas (free tier available):

```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db('artkeys');
const collection = db.collection('artkeys');

// Save ArtKey
await collection.insertOne(artKey);
```

---

## 🎯 Complete Workflow

### 1. Customer Creates ArtKey

```typescript
// In ArtKeyEditor component
const handleSave = async () => {
  // 1. Upload images
  const imageUrls = [];
  for (const file of imageFiles) {
    const uploadResponse = await fetch('/api/upload/image?backend=wordpress', {
      method: 'POST',
      body: createFormData(file),
    });
    const { url } = await uploadResponse.json();
    imageUrls.push(url);
  }

  // 2. Save ArtKey
  const saveResponse = await fetch('/api/artkey/store', {
    method: 'POST',
    body: JSON.stringify({
      sessionId: getSessionId(),
      productId: productId,
      artKeyData: {
        ...artKeyData,
        uploadedImages: imageUrls,
      },
    }),
  });

  const { artKey } = await saveResponse.json();
  
  // 3. ArtKey is saved with:
  // - Unique ID
  // - Shareable URL
  // - QR code URL
};
```

### 2. Customer Reuses ArtKey for Another Product

```typescript
// Show ArtKey selector
<ArtKeySelector
  sessionId={sessionId}
  onSelect={async (selectedArtKey) => {
    // Load full ArtKey data
    const response = await fetch(`/api/artkey/store?id=${selectedArtKey.id}`);
    const { artKey } = await response.json();
    
    // Use for new product
    const newResponse = await fetch('/api/artkey/store', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: sessionId,
        productId: newProductId, // Different product!
        artKeyData: artKey.artKeyData, // Same ArtKey data
      }),
    });
  }}
/>
```

### 3. Customer Shares ArtKey

```typescript
// ArtKey has shareable URL
const shareUrl = artKey.shareUrl; // https://your-site.com/artkey/{token}
const qrCodeUrl = artKey.qrCodeUrl; // QR code image URL

// Display QR code
<img src={qrCodeUrl} alt="Share ArtKey" />
```

---

## 🔧 Environment Variables

Add to Netlify:

```env
# WordPress (for image uploads)
NEXT_PUBLIC_WORDPRESS_URL = https://your-wordpress-site.com
WORDPRESS_USERNAME = your_username
WORDPRESS_APP_PASSWORD = your_app_password

# Cloudinary (alternative to WordPress)
CLOUDINARY_UPLOAD_URL = https://api.cloudinary.com/v1_1/your_cloud_name/image/upload
CLOUDINARY_UPLOAD_PRESET = your_upload_preset

# Site URL (for shareable URLs)
NEXT_PUBLIC_SITE_URL = https://your-netlify-site.netlify.app
```

---

## ✅ Checklist

- [ ] Image upload API configured (WordPress or Cloudinary)
- [ ] QR code generation working
- [ ] ArtKey storage system set up
- [ ] ArtKeySelector component integrated
- [ ] Shareable URLs working
- [ ] Database storage configured (for production)

---

## 🚀 Next Steps

1. **Integrate image upload** into ArtKeyEditor component
2. **Add ArtKeySelector** to customization flow
3. **Set up database** for production storage
4. **Test complete workflow:** Create → Save → Reuse → Share

---

**Everything is ready!** Your customers can now:
- ✅ Upload images
- ✅ Save ArtKeys
- ✅ Reuse ArtKeys for multiple products
- ✅ Share ArtKeys via QR codes

