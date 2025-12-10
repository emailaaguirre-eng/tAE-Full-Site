# WordPress Headless CMS Setup Guide

## 🎯 What You Currently Have

You're already using **WordPress as a headless backend** for:
- ✅ **WooCommerce** - Products, orders, cart (via REST API)
- ✅ **E-commerce functionality**

## 🔄 What is Headless WordPress?

**Traditional WordPress:**
- WordPress handles both content management AND frontend display
- Theme controls how content looks

**Headless WordPress:**
- WordPress = Content Management System (backend only)
- Next.js = Frontend (displays content)
- WordPress REST API = Bridge between them

---

## 📋 Your Options

### Option 1: WooCommerce Only (Current Setup) ✅
**What it does:** Manages products, orders, cart
**Best for:** E-commerce functionality
**Status:** Already set up!

### Option 2: Full Headless WordPress (Content + E-commerce)
**What it does:** Manages ALL content (pages, posts, products, media)
**Best for:** Complete content management from WordPress admin
**What you'd get:**
- Blog posts from WordPress
- Pages content from WordPress
- Media library from WordPress
- Custom post types (like ArtKey configs)
- WooCommerce products

### Option 3: Hybrid Approach (Recommended)
**What it does:** 
- WordPress for content management (blog, pages, media)
- WooCommerce for e-commerce
- Next.js for frontend display
**Best for:** Best of both worlds

---

## 🚀 Setting Up Full Headless WordPress

### Step 1: Enable WordPress REST API

Your WordPress site already has REST API enabled (you're using it for WooCommerce). But let's make sure it's fully configured:

**In WordPress:**
1. Go to **Settings → Permalinks**
2. Set to **"Post name"** (not "Plain")
3. Save changes

### Step 2: Install WordPress REST API Plugin (Optional)

For advanced features, install:
- **WPGraphQL** (if using GraphQL instead of REST)
- **JWT Authentication** (for secure API access)
- **ACF to REST API** (if using Advanced Custom Fields)

### Step 3: Create WordPress Content Helper

Create a new file: `lib/wordpress.ts`

```typescript
/**
 * WordPress REST API Integration
 * Fetches content from WordPress headless CMS
 */

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;

/**
 * Fetch WordPress posts
 */
export async function getPosts(limit = 10) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=${limit}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Get single post by slug
 */
export async function getPost(slug: string) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Fetch WordPress pages
 */
export async function getPages() {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/pages?_embed`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Get single page by slug
 */
export async function getPage(slug: string) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&_embed`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }

    const pages = await response.json();
    return pages[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

/**
 * Fetch media (images) from WordPress
 */
export async function getMedia(mediaId: number) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/media/${mediaId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

/**
 * Search WordPress content
 */
export async function searchContent(query: string) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/search?search=${encodeURIComponent(query)}&per_page=10`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search content');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}

/**
 * Get WordPress categories
 */
export async function getCategories() {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/categories`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
```

### Step 4: Create API Routes

Create `app/api/wordpress/posts/route.ts`:

```typescript
import { getPosts } from '@/lib/wordpress';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');

  const posts = await getPosts(limit);
  return NextResponse.json(posts);
}
```

Create `app/api/wordpress/pages/route.ts`:

```typescript
import { getPages } from '@/lib/wordpress';
import { NextResponse } from 'next/server';

export async function GET() {
  const pages = await getPages();
  return NextResponse.json(pages);
}
```

### Step 5: Use WordPress Content in Components

**Example: Blog Page**

Create `app/blog/page.tsx`:

```typescript
import { getPosts } from '@/lib/wordpress';
import Image from 'next/image';

export default async function BlogPage() {
  const posts = await getPosts(10);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <Image
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 
                className="text-2xl font-bold mb-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div 
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <a 
                href={`/blog/${post.slug}`}
                className="text-brand-medium hover:text-brand-dark mt-4 inline-block"
              >
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

**Example: Dynamic Blog Post**

Create `app/blog/[slug]/page.tsx`:

```typescript
import { getPost } from '@/lib/wordpress';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {featuredImage && (
        <Image
          src={featuredImage}
          alt={post.title.rendered}
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg mb-8"
        />
      )}
      
      <h1 
        className="text-5xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      
      <div className="text-gray-600 mb-8">
        <time>{new Date(post.date).toLocaleDateString()}</time>
      </div>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
```

---

## 🎨 Using WordPress Media Library

### Fetch Images from WordPress:

```typescript
import { getMedia } from '@/lib/wordpress';

// In your component
const image = await getMedia(123); // WordPress media ID
const imageUrl = image.source_url;
```

### Display WordPress Images:

```tsx
import Image from 'next/image';

<Image
  src={imageUrl}
  alt={image.alt_text}
  width={image.media_details.width}
  height={image.media_details.height}
/>
```

---

## 🔐 Authentication (Optional)

If you need to POST/PUT/DELETE content (not just read):

### Option 1: Application Passwords (WordPress 5.6+)

1. **In WordPress:**
   - Go to **Users → Your Profile**
   - Scroll to **Application Passwords**
   - Create new password
   - Copy the password

2. **In your code:**
```typescript
const authString = Buffer.from(`username:application_password`).toString('base64');

fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
  headers: {
    'Authorization': `Basic ${authString}`,
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({
    title: 'New Post',
    content: 'Post content',
    status: 'publish'
  })
});
```

### Option 2: JWT Authentication Plugin

Install **JWT Authentication for WP REST API** plugin, then use tokens.

---

## 📝 Environment Variables

Add to `.env.local`:

```env
# WordPress URL (same as WooCommerce URL)
NEXT_PUBLIC_WORDPRESS_URL=https://theartfulexperience.com

# Optional: For authenticated requests
WORDPRESS_USERNAME=your_username
WORDPRESS_APP_PASSWORD=your_app_password
```

---

## 🎯 Recommended Setup for Your Site

### What to Use WordPress For:
1. ✅ **Blog posts** - News, updates, tutorials
2. ✅ **Pages content** - About Us, Terms, Privacy Policy
3. ✅ **Media library** - Centralized image management
4. ✅ **Custom post types** - ArtKey configurations, CoCreators profiles
5. ✅ **WooCommerce** - Products, orders (already set up)

### What to Keep in Next.js:
1. ✅ **Frontend design** - All styling, components
2. ✅ **Product customization** - ArtKey editor, print configurator
3. ✅ **Shopping cart** - Client-side cart management
4. ✅ **Checkout flow** - Custom checkout experience

---

## 🔄 Migration Strategy

### If You Have Existing WordPress Content:

1. **Export from WordPress:**
   - Use WordPress REST API to fetch all content
   - Or use WordPress export tool

2. **Import to Next.js:**
   - Create API routes to fetch WordPress content
   - Use ISR (Incremental Static Regeneration) for performance
   - Cache content for fast loading

3. **Keep WordPress Updated:**
   - Content editors use WordPress admin
   - Next.js fetches latest content on build/request

---

## 🚀 Quick Start Checklist

- [ ] Verify WordPress REST API is accessible: `https://yoursite.com/wp-json`
- [ ] Create `lib/wordpress.ts` with helper functions
- [ ] Create API routes in `app/api/wordpress/`
- [ ] Create blog/pages components
- [ ] Add WordPress URL to `.env.local`
- [ ] Test fetching content
- [ ] Set up ISR for performance
- [ ] Configure caching strategy

---

## 📚 WordPress REST API Endpoints

**Common endpoints you can use:**

- `/wp-json/wp/v2/posts` - Blog posts
- `/wp-json/wp/v2/pages` - Pages
- `/wp-json/wp/v2/media` - Media library
- `/wp-json/wp/v2/categories` - Categories
- `/wp-json/wp/v2/tags` - Tags
- `/wp-json/wp/v2/users` - Users/authors
- `/wp-json/wp/v2/comments` - Comments
- `/wp-json/wc/v3/products` - WooCommerce products (already using)

---

## 💡 Pro Tips

1. **Use ISR (Incremental Static Regeneration):**
   ```typescript
   export const revalidate = 3600; // Revalidate every hour
   ```

2. **Cache WordPress responses:**
   - Use Next.js `fetch` with `next: { revalidate }`
   - Or use React Query/SWR for client-side caching

3. **Handle images properly:**
   - WordPress images are external URLs
   - Configure `next.config.js` to allow WordPress domain:
   ```javascript
   images: {
     domains: ['theartfulexperience.com'],
   }
   ```

4. **Error handling:**
   - Always wrap WordPress API calls in try/catch
   - Provide fallback content if WordPress is down

---

## 🆘 Troubleshooting

**REST API not working?**
- Check permalinks are set to "Post name"
- Verify WordPress version (5.0+)
- Check for security plugins blocking API

**CORS errors?**
- Add your Next.js domain to WordPress allowed origins
- Or use Next.js API routes as proxy

**Images not loading?**
- Add WordPress domain to `next.config.js` images config
- Check image URLs are absolute (not relative)

---

You're already using headless WordPress for WooCommerce! Now you can extend it to manage all your content. 🎉

