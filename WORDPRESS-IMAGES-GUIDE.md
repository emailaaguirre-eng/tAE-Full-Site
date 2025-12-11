# WordPress Images Access Guide
## How to Access and Use Images from Your WordPress Media Library

---

## 🎯 **Quick Overview**

You can access WordPress images in **3 ways**:
1. ✅ **Direct API calls** - Fetch images via WordPress REST API
2. ✅ **Helper functions** - Use functions in `lib/wordpress.ts`
3. ✅ **API routes** - Use Next.js API routes (`/api/wordpress/media`)

**No authentication needed** for reading images! WordPress Media Library is public.

---

## 📋 **Method 1: Using Helper Functions (Recommended)**

### Get All Images

```typescript
import { getAllMedia, getImageUrl, getImageSizes } from '@/lib/wordpress';

// Get all images from WordPress
const images = await getAllMedia(100); // Get up to 100 images

// Each image has:
// - id, title, alt, url, sizes, mimeType, date, etc.
images.forEach((image) => {
  console.log(image.url); // Full-size image URL
  console.log(image.sizes); // All available sizes
});
```

### Get Specific Image by ID

```typescript
import { getMedia, getImageUrl } from '@/lib/wordpress';

// Get image by ID
const image = await getMedia(123); // Replace 123 with your image ID

if (image) {
  // Get full-size URL
  const fullUrl = getImageUrl(image, 'full');
  
  // Get specific size
  const thumbnailUrl = getImageUrl(image, 'thumbnail');
  const mediumUrl = getImageUrl(image, 'medium');
  const largeUrl = getImageUrl(image, 'large');
}
```

### Get Image in Specific Size

```typescript
import { getMedia, getImageUrl, getImageSizes } from '@/lib/wordpress';

const image = await getMedia(123);

// Get all available sizes
const sizes = getImageSizes(image);
// Returns: { thumbnail: {...}, medium: {...}, large: {...}, full: {...} }

// Get specific size URL
const mediumUrl = getImageUrl(image, 'medium');
```

### Filter by Image Type

```typescript
import { getAllMedia } from '@/lib/wordpress';

// Get only JPEG images
const jpegs = await getAllMedia(100, 'image/jpeg');

// Get only PNG images
const pngs = await getAllMedia(100, 'image/png');
```

---

## 🌐 **Method 2: Using API Routes**

### Get All Images

```typescript
// Client-side or Server-side
const response = await fetch('/api/wordpress/media?limit=50');
const data = await response.json();

// data.media is an array of images
data.media.forEach((image) => {
  console.log(image.url); // Full-size URL
  console.log(image.sizes); // All sizes available
});
```

### Get Specific Image by ID

```typescript
const response = await fetch('/api/wordpress/media?id=123');
const image = await response.json();

console.log(image.url); // Full-size URL
console.log(image.sizes); // All available sizes
```

### Get Image in Specific Size

```typescript
// Get medium-sized image URL
const response = await fetch('/api/wordpress/media?id=123&size=medium');
const data = await response.json();

console.log(data.url); // Medium-size URL
console.log(data.sizes); // All sizes still available
```

### Filter by MIME Type

```typescript
// Get only JPEG images
const response = await fetch('/api/wordpress/media?mimeType=image/jpeg&limit=50');
const data = await response.json();
```

---

## 🖼️ **Method 3: Direct WordPress REST API**

### Get All Media

```typescript
const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

const response = await fetch(`${WP_URL}/wp-json/wp/v2/media?per_page=100`);
const images = await response.json();

// Each image has:
// - id, source_url, media_details, title, alt_text, etc.
images.forEach((image) => {
  console.log(image.source_url); // Full-size URL
  console.log(image.media_details.sizes); // Available sizes
});
```

### Get Specific Image

```typescript
const response = await fetch(`${WP_URL}/wp-json/wp/v2/media/123`);
const image = await response.json();

console.log(image.source_url); // Full-size URL
console.log(image.media_details.sizes.medium.source_url); // Medium size
```

---

## 🎨 **Using Images in React Components**

### Server Component (Recommended)

```tsx
import Image from 'next/image';
import { getAllMedia, getImageUrl } from '@/lib/wordpress';

export default async function ImageGallery() {
  const images = await getAllMedia(20);

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <Image
          key={image.id}
          src={getImageUrl(image, 'large') || image.source_url}
          alt={image.alt_text || image.title?.rendered || 'Image'}
          width={800}
          height={600}
          className="rounded-lg"
        />
      ))}
    </div>
  );
}
```

### Client Component

```tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/wordpress/media?limit=20')
      .then((res) => res.json())
      .then((data) => setImages(data.media));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image: any) => (
        <Image
          key={image.id}
          src={image.url}
          alt={image.alt}
          width={800}
          height={600}
          className="rounded-lg"
        />
      ))}
    </div>
  );
}
```

### Using Regular img Tag (Simple Cases)

```tsx
import { getAllMedia, getImageUrl } from '@/lib/wordpress';

export default async function SimpleGallery() {
  const images = await getAllMedia(10);

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <img
          key={image.id}
          src={getImageUrl(image, 'medium') || image.source_url}
          alt={image.alt_text || 'Image'}
          className="w-full h-auto rounded-lg"
        />
      ))}
    </div>
  );
}
```

---

## 📐 **Image Sizes Available**

WordPress typically provides these sizes:

- **`thumbnail`** - 150x150px (cropped)
- **`medium`** - 300x300px (max width/height)
- **`medium_large`** - 768x768px (max width/height)
- **`large`** - 1024x1024px (max width/height)
- **`full`** - Original size

**Custom sizes** may also be available depending on your WordPress theme/plugins.

---

## 🔍 **Finding Image IDs**

### Method 1: WordPress Admin
1. Go to **Media → Library** in WordPress
2. Click on an image
3. Look at the URL: `.../wp-admin/upload.php?item=123`
4. The number `123` is the image ID

### Method 2: API Response
```typescript
const images = await getAllMedia(100);
console.log(images.map(img => ({ id: img.id, title: img.title })));
```

### Method 3: From Post/Page
```typescript
import { getPost, getFeaturedImage } from '@/lib/wordpress';

const post = await getPost('my-post-slug');
const featuredImage = getFeaturedImage(post);

if (featuredImage) {
  console.log(featuredImage.url); // Image URL
  // Image ID is in post.featured_media
}
```

---

## 🎯 **Common Use Cases**

### 1. Display Featured Image from Post

```tsx
import { getPost, getFeaturedImage } from '@/lib/wordpress';
import Image from 'next/image';

export default async function PostPage({ slug }: { slug: string }) {
  const post = await getPost(slug);
  const featuredImage = getFeaturedImage(post);

  return (
    <article>
      {featuredImage && (
        <Image
          src={featuredImage.url}
          alt={featuredImage.alt}
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      )}
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
```

### 2. Image Gallery Component

```tsx
import { getAllMedia, getImageUrl } from '@/lib/wordpress';
import Image from 'next/image';

export default async function Gallery() {
  const images = await getAllMedia(12);

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={getImageUrl(image, 'large') || image.source_url}
            alt={image.alt_text || 'Gallery image'}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
```

### 3. Product Images from WooCommerce

```tsx
import { getWooCommerceProduct } from '@/lib/wordpress';
import Image from 'next/image';

export default async function ProductPage({ id }: { id: number }) {
  const product = await getWooCommerceProduct(id);

  return (
    <div>
      {product.images?.map((img: any, index: number) => (
        <Image
          key={index}
          src={img.src}
          alt={img.alt || product.name}
          width={800}
          height={800}
          className="rounded-lg"
        />
      ))}
    </div>
  );
}
```

---

## ⚙️ **Configuration**

### Next.js Image Configuration

Your `next.config.js` already allows images from any domain:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**', // Allows any domain
    },
  ],
}
```

**For better security**, restrict to your WordPress domain:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'theartfulexperience.com', // Your WordPress domain
    },
  ],
}
```

---

## 🚀 **Performance Tips**

1. **Use Appropriate Sizes**
   - Use `thumbnail` for thumbnails
   - Use `medium` for cards
   - Use `large` for featured images
   - Use `full` only when needed

2. **Cache Images**
   - WordPress API responses are cached (1 hour)
   - Next.js Image component optimizes automatically
   - Use `next: { revalidate }` for server components

3. **Lazy Loading**
   - Next.js Image component lazy loads by default
   - Use `priority` prop for above-the-fold images

---

## 🔧 **Troubleshooting**

### Images Not Loading

**Check:**
1. ✅ WordPress URL is correct in `.env.local`
2. ✅ Image URLs are absolute (not relative)
3. ✅ WordPress domain is allowed in `next.config.js`
4. ✅ Image exists in WordPress Media Library

### CORS Errors

If you see CORS errors:
- WordPress REST API should be public (no CORS issues normally)
- If using authenticated requests, ensure credentials are correct

### Image Sizes Not Available

Some images may not have all sizes if:
- Image is smaller than the requested size
- WordPress hasn't generated that size yet
- Custom sizes aren't configured

**Solution:** Always fallback to `full` size:
```typescript
const url = getImageUrl(image, 'large') || getImageUrl(image, 'full');
```

---

## 📚 **API Reference**

### Helper Functions (`lib/wordpress.ts`)

- `getAllMedia(limit, mimeType?)` - Get all images
- `getMedia(mediaId)` - Get image by ID
- `getImageUrl(media, size)` - Get image URL in specific size
- `getImageSizes(media)` - Get all available sizes
- `getFeaturedImage(post)` - Get featured image from post/page

### API Routes

- `GET /api/wordpress/media` - Get all images
- `GET /api/wordpress/media?id=123` - Get specific image
- `GET /api/wordpress/media?size=medium` - Get image in specific size
- `GET /api/wordpress/media?mimeType=image/jpeg` - Filter by type

---

## ✅ **Quick Start Example**

```tsx
// app/gallery/page.tsx
import { getAllMedia, getImageUrl } from '@/lib/wordpress';
import Image from 'next/image';

export default async function GalleryPage() {
  const images = await getAllMedia(20);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <Image
            key={image.id}
            src={getImageUrl(image, 'large') || image.source_url}
            alt={image.alt_text || 'Gallery image'}
            width={400}
            height={400}
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
```

---

**That's it!** You now have full access to your WordPress Media Library. 🎉

