# Quick Start: Image Upload & ArtKey System
## Get Started in 5 Minutes

---

## ✅ What's Ready

1. **Image Upload API** - `/api/upload/image`
2. **QR Code Generation** - `/api/artkey/qr`
3. **ArtKey Storage** - `/api/artkey/store`
4. **ArtKey Reuse Component** - `ArtKeySelector.tsx`
5. **Shareable URLs** - `/artkey/{token}`

---

## 🚀 Quick Setup

### Step 1: Configure Image Upload

**For WordPress (Recommended):**

1. In WordPress: **Users → Your Profile → Application Passwords**
2. Create new password
3. Add to Netlify environment variables:
   ```
   WORDPRESS_USERNAME = your_username
   WORDPRESS_APP_PASSWORD = your_app_password
   ```

### Step 2: Test Image Upload

```typescript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/api/upload/image?backend=wordpress', {
  method: 'POST',
  body: formData,
});

const { url } = await response.json();
console.log('Image URL:', url);
```

### Step 3: Save ArtKey with QR Code

```typescript
const response = await fetch('/api/artkey/store', {
  method: 'POST',
  body: JSON.stringify({
    sessionId: 'user-session-id',
    artKeyData: yourArtKeyData,
  }),
});

const { artKey } = await response.json();
console.log('Share URL:', artKey.shareUrl);
console.log('QR Code:', artKey.qrCodeUrl);
```

### Step 4: Reuse ArtKey

```tsx
import ArtKeySelector from '@/components/ArtKeySelector';

<ArtKeySelector
  sessionId="user-session-id"
  onSelect={(artKey) => {
    // Use this ArtKey for new product
    console.log('Selected ArtKey:', artKey.id);
  }}
  onCancel={() => {}}
/>
```

---

## 📋 API Endpoints

### Upload Image
```
POST /api/upload/image?backend=wordpress
Body: FormData with 'file' field
```

### Generate QR Code
```
GET /api/artkey/qr?url=https://your-url.com&size=200
POST /api/artkey/qr
Body: { url, size, artKeyId }
```

### Save ArtKey
```
POST /api/artkey/store
Body: { sessionId, artKeyData, productId, ... }
```

### Get ArtKeys
```
GET /api/artkey/store?sessionId=xxx
GET /api/artkey/store?id=xxx
GET /api/artkey/store?token=xxx
```

---

## 🎯 Common Use Cases

### Upload Image in ArtKey Editor

```typescript
async function handleImageUpload(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload/image?backend=wordpress', {
    method: 'POST',
    body: formData,
  });

  const { url } = await response.json();
  // Add url to ArtKey gallery
}
```

### Save ArtKey After Creation

```typescript
const response = await fetch('/api/artkey/store', {
  method: 'POST',
  body: JSON.stringify({
    sessionId: getSessionId(),
    productId: productId,
    artKeyData: artKeyData,
  }),
});

const { artKey } = await response.json();
// artKey.shareUrl - Share this URL
// artKey.qrCodeUrl - Display QR code
```

### Show "Use Existing ArtKey" Button

```tsx
const [showSelector, setShowSelector] = useState(false);

<button onClick={() => setShowSelector(true)}>
  Use Existing ArtKey
</button>

{showSelector && (
  <ArtKeySelector
    sessionId={sessionId}
    onSelect={(artKey) => {
      loadArtKey(artKey.id);
      setShowSelector(false);
    }}
    onCancel={() => setShowSelector(false)}
  />
)}
```

---

## 🔗 Shareable URLs

Each ArtKey gets a unique URL:
```
https://your-site.com/artkey/{32-char-token}
```

**Features:**
- ✅ Publicly accessible
- ✅ QR code auto-generated
- ✅ Can be shared anywhere

---

## 💡 Tips

1. **Session Management:** Use `sessionStorage` or cookies to track user sessions
2. **Image Optimization:** WordPress/Cloudinary handle optimization automatically
3. **QR Code Size:** Default 200px, adjust with `size` parameter
4. **Storage:** Current setup uses in-memory (dev only). Use database for production.

---

## 📚 Full Documentation

See `IMAGE-UPLOAD-AND-ARTKEY-GUIDE.md` for complete details.

---

**Ready to use!** 🚀

