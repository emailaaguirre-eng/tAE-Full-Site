# QR Code Generation Setup
## Using qrcode Library (Similar to endroid/qr-code)

---

## ✅ What's Installed

The `qrcode` library has been installed and configured to work like your WordPress `endroid/qr-code` setup.

**Package:** `qrcode` (Node.js equivalent of PHP's endroid/qr-code)

---

## 🎯 Features

### Matches WordPress endroid/qr-code Settings:

- ✅ **Size:** 400px (default, configurable)
- ✅ **Margin:** 1 (4 modules, similar to margin 10 in endroid)
- ✅ **Error Correction:** Medium (M level)
- ✅ **Encoding:** UTF-8
- ✅ **Format:** PNG

---

## 📋 Usage

### Option 1: Data URL (Base64) - Default

Returns QR code as base64 data URL (works immediately, no storage needed):

```typescript
const response = await fetch('/api/artkey/qr', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://your-site.com/artkey/abc123',
    size: 400,
    format: 'dataurl', // Default
  }),
});

const { qrCodeUrl } = await response.json();
// qrCodeUrl is a data URL: "data:image/png;base64,..."
// Use directly in <img src={qrCodeUrl} />
```

### Option 2: Upload to WordPress (Like endroid/qr-code)

Uploads QR code to WordPress Media Library and returns URL:

```typescript
const response = await fetch('/api/artkey/qr', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://your-site.com/artkey/abc123',
    size: 400,
    format: 'wordpress', // Upload to WordPress
  }),
});

const { qrCodeUrl } = await response.json();
// qrCodeUrl is WordPress media URL
```

**Requires:**
- `WORDPRESS_USERNAME` environment variable
- `WORDPRESS_APP_PASSWORD` environment variable

---

## 🔧 Configuration

### Environment Variables

Add to Netlify (for WordPress upload):

```env
WORDPRESS_USERNAME = your_username
WORDPRESS_APP_PASSWORD = your_app_password
```

### Default Settings

The API matches your WordPress endroid/qr-code settings:

```typescript
{
  errorCorrectionLevel: 'M', // Medium (matches ErrorCorrectionLevelMedium)
  width: 400,                // Matches setSize(400)
  margin: 1,                 // 4 modules (similar to setMargin(10))
  type: 'image/png',         // PNG format (matches PngWriter)
}
```

---

## 📊 Comparison: endroid/qr-code vs qrcode

| Feature | endroid/qr-code (PHP) | qrcode (Node.js) |
|---------|----------------------|------------------|
| **Size** | `setSize(400)` | `width: 400` |
| **Margin** | `setMargin(10)` | `margin: 1` (4 modules) |
| **Error Correction** | `ErrorCorrectionLevelMedium()` | `errorCorrectionLevel: 'M'` |
| **Encoding** | `Encoding('UTF-8')` | UTF-8 (default) |
| **Format** | `PngWriter()` | `type: 'image/png'` |
| **Output** | File or data URI | Buffer or data URL |

---

## 🎨 Customization

### Change Size

```typescript
// GET request
const qrUrl = `/api/artkey/qr?url=${url}&size=600`;

// POST request
body: JSON.stringify({ url, size: 600 })
```

### Change Format

```typescript
// Data URL (base64) - no storage needed
format: 'dataurl'

// WordPress upload - stored in media library
format: 'wordpress'
```

---

## 🔄 Automatic QR Code Generation

QR codes are **automatically generated** when ArtKeys are saved:

```typescript
// When saving ArtKey
const response = await fetch('/api/artkey/store', {
  method: 'POST',
  body: JSON.stringify({
    artKeyData: yourData,
  }),
});

const { artKey } = await response.json();
// artKey.qrCodeUrl contains the QR code
// Format depends on WordPress credentials:
// - If configured: WordPress media URL
// - If not: Base64 data URL
```

---

## 💡 Best Practices

### For Development:
- Use `format: 'dataurl'` (no WordPress needed)
- QR codes work immediately
- No storage required

### For Production:
- Use `format: 'wordpress'` (if WordPress configured)
- QR codes stored in WordPress Media Library
- Better performance (CDN delivery)
- Matches your WordPress setup

---

## 🐛 Troubleshooting

### Issue: "WordPress credentials not configured"

**Solution:**
- Use `format: 'dataurl'` instead
- Or add WordPress credentials to Netlify environment variables

### Issue: QR code not generating

**Check:**
1. URL is valid and accessible
2. Size is reasonable (100-1000px)
3. Check server logs for errors

### Issue: QR code quality

**Solution:**
- Increase size for better quality
- Error correction is already set to Medium (good balance)

---

## ✅ Summary

Your QR code generation now:
- ✅ Uses `qrcode` library (Node.js equivalent of endroid/qr-code)
- ✅ Matches WordPress settings (size 400, margin, error correction)
- ✅ Supports data URLs (immediate use)
- ✅ Supports WordPress upload (like endroid/qr-code)
- ✅ Automatically generates when ArtKeys are saved

**Everything works like your WordPress setup!** 🎉

